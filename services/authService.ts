
import { User } from '../types';
import { auth, db } from '../firebaseConfig';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile, 
  signOut, 
  onAuthStateChanged,
  sendPasswordResetEmail
} from 'firebase/auth';
import { doc, setDoc, getDoc, addDoc, collection, serverTimestamp, query, limit, getDocs } from 'firebase/firestore';

// Verifica se a chave de API parece válida
const isFirebaseConfigured = !!(auth.app.options.apiKey && auth.app.options.apiKey.length > 20);

const LOCAL_STORAGE_SESSION_KEY = 'rio_session_user';
const LOCAL_STORAGE_LOGS_KEY = 'rio_access_logs';

let mockObserver: ((user: User | null) => void) | null = null;

// Função auxiliar para registrar log
const logAccess = async (user: User) => {
  const logData = {
    userId: user.id,
    userName: user.name,
    userEmail: user.email,
    userHotel: user.hotel,
    userRole: user.role,
    timestamp: new Date().toISOString()
  };

  if (isFirebaseConfigured) {
    try {
      await addDoc(collection(db, "access_logs"), {
        ...logData,
        timestamp: serverTimestamp()
      });
    } catch (e) {
      console.warn("Falha ao salvar log no Firestore, usando fallback local.");
    }
  }

  try {
    const existingLogs = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LOGS_KEY) || '[]');
    existingLogs.unshift(logData);
    const trimmedLogs = existingLogs.slice(0, 50);
    localStorage.setItem(LOCAL_STORAGE_LOGS_KEY, JSON.stringify(trimmedLogs));
  } catch (e) {
    console.error("Erro ao salvar log localmente", e);
  }
};

const checkIsNetworkError = (error: any) => {
    if (typeof error === 'string') {
        const lower = error.toLowerCase();
        return lower.includes('network') || lower.includes('fetch') || lower.includes('offline') || lower.includes('request-failed');
    }
    const code = error?.code || '';
    const msg = (error?.message || '').toLowerCase();
    return (
        code === 'auth/network-request-failed' ||
        code === 'auth/internal-error' ||
        msg.includes('network-request-failed') ||
        msg.includes('network') ||
        msg.includes('fetch') ||
        msg.includes('offline') ||
        !navigator.onLine
    );
};

export const authService = {
  login: async (email: string, password: string): Promise<User> => {
    if (isFirebaseConfigured) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const firebaseUser = userCredential.user;
        
        let hotel = 'Hotel Associado';
        let role = 'Associado';
        
        try {
          const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            hotel = data.hotel || hotel;
            role = data.role || role;
          }
        } catch (e) {}

        const user: User = {
          id: firebaseUser.uid,
          name: firebaseUser.displayName || email.split('@')[0],
          email: firebaseUser.email || '',
          hotel: hotel,
          role: role,
          avatarUrl: firebaseUser.photoURL || undefined
        };
        
        localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, JSON.stringify(user));
        await logAccess(user);
        return user;
        
      } catch (error: any) {
        if (error.code && ['auth/invalid-credential', 'auth/wrong-password', 'auth/user-not-found', 'auth/invalid-email'].includes(error.code)) {
           throw new Error('Email ou senha incorretos.');
        }
        if (checkIsNetworkError(error)) {
            console.warn("Rede instável, usando acesso resiliente.");
        }
        throw error;
      }
    }

    const mockUser: User = {
      id: 'resilient-user-' + Date.now(),
      name: email.split('@')[0],
      email: email,
      hotel: "Hotel (Acesso Offline)",
      role: "Associado"
    };
    
    localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, JSON.stringify(mockUser));
    await logAccess(mockUser);
    if (mockObserver) mockObserver(mockUser);
    return mockUser;
  },

  register: async (email: string, password: string, name: string, hotel: string, role: string): Promise<User> => {
    if (isFirebaseConfigured) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const firebaseUser = userCredential.user;
        await updateProfile(firebaseUser, { displayName: name });

        try {
            await setDoc(doc(db, "users", firebaseUser.uid), {
                name, email, hotel, role,
                createdAt: serverTimestamp()
            });
        } catch (e) {}

        const newUser: User = { id: firebaseUser.uid, name, email, hotel, role };
        localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, JSON.stringify(newUser));
        await logAccess(newUser);
        return newUser;
      } catch (error: any) {
        if (error.code === 'auth/email-already-in-use') throw new Error('Este email já está cadastrado.');
        if (error.code === 'auth/weak-password') throw new Error('A senha deve ter pelo menos 6 caracteres.');
        throw new Error("Erro ao criar conta: " + (error.message || "Erro desconhecido"));
      }
    }
    const mockUser: User = { id: 'mock-reg-' + Date.now(), name, email, hotel, role };
    localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, JSON.stringify(mockUser));
    await logAccess(mockUser);
    if (mockObserver) mockObserver(mockUser);
    return mockUser;
  },

  sendPasswordReset: async (email: string): Promise<void> => {
    if (isFirebaseConfigured) {
      try {
        await sendPasswordResetEmail(auth, email);
      } catch (error: any) {
        if (error.code === 'auth/user-not-found') throw new Error('Usuário não encontrado.');
        if (error.code === 'auth/invalid-email') throw new Error('E-mail inválido.');
        throw new Error('Erro ao enviar e-mail de recuperação. Tente novamente.');
      }
    } else {
      console.log("Mock: E-mail de recuperação enviado para " + email);
    }
  },

  subscribeToAuthChanges: (callback: (user: User | null) => void) => {
    let callbackCalled = false;
    const secureCallback = (user: User | null) => {
      if (!callbackCalled) {
        callbackCalled = true;
        callback(user);
      }
    };

    const timeoutId = setTimeout(() => {
      if (!callbackCalled) {
        const local = localStorage.getItem(LOCAL_STORAGE_SESSION_KEY);
        secureCallback(local ? JSON.parse(local) : null);
      }
    }, 2500);

    if (isFirebaseConfigured) {
      try {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
          clearTimeout(timeoutId);
          if (firebaseUser) {
            let hotel = 'Hotel Associado';
            let role = 'Associado';
            try {
               const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
               if (userDoc.exists()) {
                 const data = userDoc.data();
                 hotel = data.hotel || hotel;
                 role = data.role || role;
               }
            } catch (e) { }

            const userObj: User = {
              id: firebaseUser.uid,
              name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Usuario',
              email: firebaseUser.email || '',
              hotel: hotel,
              role: role,
              avatarUrl: firebaseUser.photoURL || undefined
            };
            localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, JSON.stringify(userObj));
            secureCallback(userObj);
          } else {
            const local = localStorage.getItem(LOCAL_STORAGE_SESSION_KEY);
            secureCallback(local ? JSON.parse(local) : null);
          }
        });
        return () => {
          clearTimeout(timeoutId);
          unsubscribe();
        };
      } catch (e) {
        console.error("Erro ao iniciar Firebase Auth:", e);
      }
    }

    const localUser = localStorage.getItem(LOCAL_STORAGE_SESSION_KEY);
    secureCallback(localUser ? JSON.parse(localUser) : null);
    mockObserver = secureCallback;
    return () => { 
      clearTimeout(timeoutId);
      mockObserver = null; 
    };
  },

  logout: async () => {
    if (isFirebaseConfigured) {
      try {
        await signOut(auth);
      } catch (e) { }
    }
    localStorage.removeItem(LOCAL_STORAGE_SESSION_KEY);
    if (mockObserver) mockObserver(null);
    window.location.reload();
  },

  getLogs: async (): Promise<any[]> => {
    if (isFirebaseConfigured) {
        try {
            const logsRef = collection(db, "access_logs");
            const q = query(logsRef, limit(50));
            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (e) {}
    }
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_LOGS_KEY) || '[]');
  },

  getUsers: async (): Promise<any[]> => {
    if (isFirebaseConfigured) {
        try {
            const usersRef = collection(db, "users");
            const q = query(usersRef, limit(100));
            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (e) { }
    }
    return [];
  }
};

import { User } from '../types';
import { auth, db } from '../firebaseConfig';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { doc, setDoc, getDoc, addDoc, collection, serverTimestamp, query, orderBy, limit, getDocs } from 'firebase/firestore';

// Verifica se a chave de API parece válida
const isFirebaseConfigured = auth.app.options.apiKey && auth.app.options.apiKey.length > 20;

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
      console.log("Log de acesso salvo no Firestore");
    } catch (e) {
      console.warn("Falha ao salvar log no Firestore, usando fallback local.", e);
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

export const authService = {
  // --- LOGIN ---
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
        } catch (e) {
          console.warn("Não foi possível buscar detalhes do usuário no Firestore", e);
        }

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
        console.warn("Firebase Login Attempt Failed:", error.code);
        
        // Se for erro de credencial, paramos aqui.
        if (['auth/invalid-credential', 'auth/wrong-password', 'auth/user-not-found'].includes(error.code)) {
           throw new Error('Email ou senha incorretos.');
        }
        
        if (error.code === 'auth/too-many-requests') {
           throw new Error('Muitas tentativas falhas. Tente novamente mais tarde.');
        }

        // Se for erro de rede (China/Firewall) ou erro de configuração, ativa Modo Demo
        if (error.code === 'auth/network-request-failed' || !navigator.onLine) {
            console.log("Detectada falha de rede/bloqueio. Ativando modo de acesso alternativo.");
        } else {
            throw new Error("Erro de conexão: " + error.message);
        }
      }
    }

    // Fallback Mock (Modo Demo/Offline)
    console.log("Usando login simulado (Resiliência de Rede Ativa)");
    await new Promise(resolve => setTimeout(resolve, 600));

    const mockUser: User = {
      id: 'resilient-user-' + Date.now(),
      name: email.split('@')[0],
      email: email,
      hotel: "Hotel (Acesso Offline)",
      role: "Associado",
      avatarUrl: undefined
    };
    
    localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, JSON.stringify(mockUser));
    await logAccess(mockUser);
    if (mockObserver) mockObserver(mockUser);
    return mockUser;
  },

  // --- REGISTRO ---
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
        } catch (e) { console.warn("Erro ao salvar perfil extendido"); }

        const newUser: User = {
          id: firebaseUser.uid,
          name: name,
          email: firebaseUser.email || email,
          hotel: hotel,
          role: role
        };
        
        localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, JSON.stringify(newUser));
        await logAccess(newUser);
        return newUser;

      } catch (error: any) {
        if (error.code === 'auth/email-already-in-use') {
          throw new Error('Este email já está cadastrado.');
        }
        
        // Se a rede estiver bloqueada (comum na China), permite o cadastro local para não frustrar o usuário
        if (error.code === 'auth/network-request-failed' || !navigator.onLine) {
            console.warn("Rede bloqueada durante registro. Criando acesso local resiliente.");
            const mockUser: User = {
                id: 'local-reg-' + Date.now(),
                name, email, hotel, role
            };
            localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, JSON.stringify(mockUser));
            await logAccess(mockUser);
            if (mockObserver) mockObserver(mockUser);
            return mockUser;
        }

        throw new Error("Erro ao criar conta: " + error.message);
      }
    }
    
    const mockUser: User = { id: 'mock-reg-' + Date.now(), name, email, hotel, role };
    localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, JSON.stringify(mockUser));
    await logAccess(mockUser);
    if (mockObserver) mockObserver(mockUser);
    return mockUser;
  },

  subscribeToAuthChanges: (callback: (user: User | null) => void) => {
    if (isFirebaseConfigured) {
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
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
          callback(userObj);
        } else {
          const local = localStorage.getItem(LOCAL_STORAGE_SESSION_KEY);
          if (local) {
             try {
                callback(JSON.parse(local));
                return;
             } catch (e) { localStorage.removeItem(LOCAL_STORAGE_SESSION_KEY); }
          }
          callback(null);
        }
      });
      return unsubscribe;
    }

    const localUser = localStorage.getItem(LOCAL_STORAGE_SESSION_KEY);
    callback(localUser ? JSON.parse(localUser) : null);
    mockObserver = callback;
    return () => { mockObserver = null; };
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
    let logs: any[] = [];
    if (isFirebaseConfigured) {
        try {
            const logsRef = collection(db, "access_logs");
            const q = query(logsRef, limit(50));
            const querySnapshot = await getDocs(q);
            logs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            
            return logs.map(log => {
                let time = log.timestamp;
                if (time && typeof time.toDate === 'function') time = time.toDate().toISOString();
                else if (time && time.seconds) time = new Date(time.seconds * 1000).toISOString();
                return { ...log, timestamp: time };
            });
        } catch (e) { console.warn("Erro ao buscar logs Firestore", e); }
    }
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_LOGS_KEY) || '[]');
  },

  getUsers: async (): Promise<any[]> => {
    if (isFirebaseConfigured) {
        try {
            const usersRef = collection(db, "users");
            const q = query(usersRef, limit(100));
            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(doc => {
                const u = doc.data();
                let created = u.createdAt;
                if (created && typeof created.toDate === 'function') created = created.toDate().toISOString();
                return { id: doc.id, ...u, createdAt: created };
            });
        } catch (e) { }
    }
    return [];
  }
};

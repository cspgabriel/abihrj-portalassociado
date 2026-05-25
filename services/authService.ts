
import { User } from '../types';
import { auth, db } from '../firebaseConfig';
import { analyticsService } from './analyticsService';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { doc, setDoc, getDoc, addDoc, collection, serverTimestamp, query, limit, getDocs } from 'firebase/firestore';

// Verifica se a chave de API parece válida
const isFirebaseConfigured = !!(auth.app.options.apiKey && auth.app.options.apiKey.length > 20);

const LOCAL_STORAGE_SESSION_KEY = 'rio_session_user';
const LOCAL_STORAGE_LOGS_KEY = 'rio_access_logs';

let mockObserver: ((user: User | null) => void) | null = null;

const getStoredSessionUser = (): User | null => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as User;
  } catch (e) {
    // Sessao invalida/corrompida nao pode quebrar o bootstrap.
    localStorage.removeItem(LOCAL_STORAGE_SESSION_KEY);
    return null;
  }
};

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
  // também gravar evento genérico para painel analítico
  analyticsService.logEvent({
    userId: logData.userId,
    userEmail: logData.userEmail,
    type: 'ACCESS',
    details: { role: logData.userRole, hotel: logData.userHotel }
  }).catch(()=>{});

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
        
        let cargo = '';
        let whatsapp = '';
        try {
          const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            hotel = data.hotel || hotel;
            role = data.role || role;
            cargo = data.cargo || cargo;
            whatsapp = data.whatsapp || whatsapp;
          }
        } catch (e) {}

        const user: User = {
          id: firebaseUser.uid,
          name: firebaseUser.displayName || email.split('@')[0],
          email: firebaseUser.email || '',
          hotel: hotel,
          role: role,
          cargo: cargo,
          whatsapp: whatsapp,
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

  loginWithGoogle: async (): Promise<{ user: User; needsOnboarding: boolean }> => {
    if (!isFirebaseConfigured) {
      throw new Error('Login com Google requer Firebase configurado.');
    }
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    try {
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;

      let hotel = '';
      let role = 'Associado';
      let cargo = '';
      let whatsapp = '';
      let needsOnboarding = false;

      try {
        const userRef = doc(db, 'users', firebaseUser.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const data = userDoc.data();
          hotel = data.hotel || '';
          role = data.role || role;
          cargo = data.cargo || '';
          whatsapp = data.whatsapp || '';
          // Se o documento existe mas falta o hotel, ainda precisa completar
          needsOnboarding = !hotel;
        } else {
          // Primeira vez logando via Google — usuário precisa completar perfil
          needsOnboarding = true;
        }
      } catch (e) {
        // Erro lendo Firestore — assume que precisa onboarding pra coletar dados
        needsOnboarding = true;
      }

      const user: User = {
        id: firebaseUser.uid,
        name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Usuario',
        email: firebaseUser.email || '',
        hotel,
        role,
        cargo,
        whatsapp,
        avatarUrl: firebaseUser.photoURL || undefined
      };

      localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, JSON.stringify(user));
      if (!needsOnboarding) await logAccess(user);
      return { user, needsOnboarding };
    } catch (error: any) {
      const code = error?.code || '';
      if (code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request') {
        throw new Error('Login cancelado.');
      }
      if (code === 'auth/popup-blocked') {
        throw new Error('O navegador bloqueou o popup. Permita popups para este site e tente novamente.');
      }
      if (code === 'auth/unauthorized-domain') {
        throw new Error('Domínio não autorizado no Firebase. Adicione em Authentication → Settings → Authorized domains.');
      }
      if (code === 'auth/account-exists-with-different-credential') {
        throw new Error('Este e-mail já está cadastrado com outro método de login.');
      }
      throw new Error('Falha ao entrar com Google: ' + (error?.message || code || 'erro desconhecido'));
    }
  },

  completeGoogleOnboarding: async (
    uid: string,
    data: { hotel: string; cargo?: string; whatsapp?: string; role?: string }
  ): Promise<User> => {
    if (!isFirebaseConfigured) {
      throw new Error('Firebase não configurado.');
    }
    const firebaseUser = auth.currentUser;
    if (!firebaseUser || firebaseUser.uid !== uid) {
      throw new Error('Sessão inválida. Faça login novamente.');
    }

    const hotel = data.hotel.trim();
    const cargo = (data.cargo || '').trim();
    const whatsapp = (data.whatsapp || '').trim();
    const role = data.role || 'Associado';

    if (!hotel) throw new Error('Nome do hotel é obrigatório.');

    const userRef = doc(db, 'users', uid);
    const existing = await getDoc(userRef).catch(() => null);

    const payload: any = {
      name: firebaseUser.displayName || '',
      email: firebaseUser.email || '',
      hotel,
      role,
      cargo,
      whatsapp,
      provider: 'google',
      updatedAt: serverTimestamp(),
    };
    if (!existing?.exists()) payload.createdAt = serverTimestamp();

    await setDoc(userRef, payload, { merge: true });

    const user: User = {
      id: uid,
      name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Usuario',
      email: firebaseUser.email || '',
      hotel,
      role,
      cargo,
      whatsapp,
      avatarUrl: firebaseUser.photoURL || undefined,
    };

    localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, JSON.stringify(user));
    await logAccess(user);
    return user;
  },

  register: async (email: string, password: string, name: string, hotel: string, role: string, cargo: string = '', whatsapp: string = ''): Promise<User> => {
    if (isFirebaseConfigured) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const firebaseUser = userCredential.user;
        await updateProfile(firebaseUser, { displayName: name });

        try {
            await setDoc(doc(db, "users", firebaseUser.uid), {
                name, email, hotel, role, cargo, whatsapp,
                createdAt: serverTimestamp()
            });
        } catch (e) {}

        const newUser: User = { id: firebaseUser.uid, name, email, hotel, role, cargo, whatsapp };
        localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, JSON.stringify(newUser));
        await logAccess(newUser);
        return newUser;
      } catch (error: any) {
        if (error.code === 'auth/email-already-in-use') throw new Error('Este email já está cadastrado.');
        if (error.code === 'auth/weak-password') throw new Error('A senha deve ter pelo menos 6 caracteres.');
        throw new Error("Erro ao criar conta: " + (error.message || "Erro desconhecido"));
      }
    }
    const mockUser: User = { id: 'mock-reg-' + Date.now(), name, email, hotel, role, cargo, whatsapp };
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
        if (error.code === 'auth/invalid-email') throw new Error('E-mail inválido.');
        // Não revelar se o e-mail está ou não cadastrado (enumeração de usuários)
        throw new Error('Se este e-mail estiver cadastrado, você receberá o link em breve.');
      }
    } else {
      console.log("Mock: E-mail de recuperação enviado para " + email);
    }
  },

  subscribeToAuthChanges: (callback: (user: User | null) => void) => {
    const timeoutId = setTimeout(() => {
      callback(getStoredSessionUser());
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
            callback(userObj);
          } else {
            // Firebase confirmou que não há sessão ativa — limpa localStorage e desloga
            localStorage.removeItem(LOCAL_STORAGE_SESSION_KEY);
            callback(null);
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

    callback(getStoredSessionUser());
    mockObserver = callback;
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

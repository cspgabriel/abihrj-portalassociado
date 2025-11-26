import { User } from '../types';
import { auth, db } from '../firebaseConfig';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

// Verifica se a chave de API parece válida
const isFirebaseConfigured = auth.app.options.apiKey && auth.app.options.apiKey.length > 20;

const LOCAL_STORAGE_SESSION_KEY = 'rio_session_user';

let mockObserver: ((user: User | null) => void) | null = null;

export const authService = {
  // --- LOGIN ---
  login: async (email: string, password: string): Promise<User> => {
    if (isFirebaseConfigured) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const firebaseUser = userCredential.user;
        
        // Tenta buscar dados extras do Firestore (Hotel, Cargo)
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

        return {
          id: firebaseUser.uid,
          name: firebaseUser.displayName || email.split('@')[0],
          email: firebaseUser.email || '',
          hotel: hotel,
          role: role,
          avatarUrl: firebaseUser.photoURL || undefined
        };
      } catch (error: any) {
        const isConfigError = error.code === 'auth/api-key-not-valid.-please-pass-a-valid-api-key.' || error.code === 'auth/invalid-api-key';
        
        if (!isConfigError) {
          if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
             throw new Error('Email ou senha incorretos.');
          }
          throw error;
        }
        console.warn("Chave do Firebase inválida. Tentando modo local.");
      }
    }

    // Fallback Mock
    console.log("Usando login simulado (Demo Mode)");
    const mockUser: User = {
      id: 'mock-user-id',
      name: email.split('@')[0] || "Carlos Silva",
      email: email,
      hotel: "Copacabana Palace View (Demo)",
      role: "Gerente Geral",
      avatarUrl: undefined
    };
    localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, JSON.stringify(mockUser));
    if (mockObserver) mockObserver(mockUser);
    return mockUser;
  },

  // --- REGISTRO (CRIAR CONTA) ---
  register: async (email: string, password: string, name: string, hotel: string, role: string): Promise<User> => {
    if (!isFirebaseConfigured) {
      throw new Error("O registro requer conexão ativa com o Firebase.");
    }

    try {
      // 1. Criar usuário na Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      // 2. Atualizar Nome no Perfil Auth
      await updateProfile(firebaseUser, { displayName: name });

      // 3. Salvar dados extras (Hotel, Cargo) no Firestore
      await setDoc(doc(db, "users", firebaseUser.uid), {
        name,
        email,
        hotel,
        role,
        createdAt: new Date()
      });

      return {
        id: firebaseUser.uid,
        name: name,
        email: firebaseUser.email || email,
        hotel: hotel,
        role: role
      };
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        throw new Error('Este email já está cadastrado.');
      }
      if (error.code === 'auth/weak-password') {
        throw new Error('A senha deve ter pelo menos 6 caracteres.');
      }
      throw error;
    }
  },

  // --- LISTENER DE SESSÃO ---
  subscribeToAuthChanges: (callback: (user: User | null) => void) => {
    if (isFirebaseConfigured) {
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
          // Busca dados complementares
          let hotel = 'Hotel Associado';
          let role = 'Associado';
          
          try {
             const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
             if (userDoc.exists()) {
               const data = userDoc.data();
               hotel = data.hotel || hotel;
               role = data.role || role;
             }
          } catch (e) { console.log("Erro ao carregar perfil extendido"); }

          callback({
            id: firebaseUser.uid,
            name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Usuario',
            email: firebaseUser.email || '',
            hotel: hotel,
            role: role,
            avatarUrl: firebaseUser.photoURL || undefined
          });
        } else {
          // Checa fallback local apenas se não houver auth real
          const local = localStorage.getItem(LOCAL_STORAGE_SESSION_KEY);
          if (local) {
             const parsed = JSON.parse(local);
             if (parsed.hotel.includes("(Demo)")) {
               callback(parsed);
               return;
             }
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
      await signOut(auth);
    }
    localStorage.removeItem(LOCAL_STORAGE_SESSION_KEY);
    if (mockObserver) mockObserver(null);
  }
};
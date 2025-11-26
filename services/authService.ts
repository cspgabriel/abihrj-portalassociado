import { User } from '../types';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

// Verifica se a chave de API parece válida (não é vazia e tem tamanho razoável)
const isFirebaseConfigured = auth.app.options.apiKey && auth.app.options.apiKey.length > 20;

const LOCAL_STORAGE_SESSION_KEY = 'rio_session_user';

// Observer para o modo Offline/Demo (caso necessário)
let mockObserver: ((user: User | null) => void) | null = null;

export const authService = {
  login: async (email: string, password: string): Promise<User> => {
    // 1. Tentar Login Real (Se configurado)
    if (isFirebaseConfigured) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const firebaseUser = userCredential.user;
        return {
          id: firebaseUser.uid,
          name: firebaseUser.displayName || email.split('@')[0],
          email: firebaseUser.email || '',
          hotel: 'Hotel Associado (Online)',
          role: 'Associado',
          avatarUrl: firebaseUser.photoURL || undefined
        };
      } catch (error: any) {
        // Se a chave for inválida por algum motivo, loga o erro e tenta o fallback
        const isConfigError = error.code === 'auth/api-key-not-valid.-please-pass-a-valid-api-key.' || error.code === 'auth/invalid-api-key';
        
        if (!isConfigError) {
          // Erros reais de negócio (senha errada, usuário não existe)
          if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
             throw new Error('Email ou senha incorretos. Verifique se o usuário existe no Firebase Console.');
          }
          throw error;
        }
        console.warn("Chave do Firebase parece inválida no servidor. Tentando modo local.");
      }
    }

    // 2. Fallback: Modo Demo (Apenas se Firebase falhar ou não estiver configurado)
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

  subscribeToAuthChanges: (callback: (user: User | null) => void) => {
    if (isFirebaseConfigured) {
      try {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
          if (firebaseUser) {
            callback({
              id: firebaseUser.uid,
              name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Usuario',
              email: firebaseUser.email || '',
              hotel: 'Hotel Associado',
              role: 'Associado',
              avatarUrl: firebaseUser.photoURL || undefined
            });
          } else {
            // Se não tem user no Firebase, checa se tem sessão local (fallback)
            const local = localStorage.getItem(LOCAL_STORAGE_SESSION_KEY);
            // Só usa o local se o usuário explicitamente fez login no modo demo antes
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
      } catch (e) {
        console.warn("Erro ao conectar listener Firebase.");
      }
    }

    // Modo Mock
    const localUser = localStorage.getItem(LOCAL_STORAGE_SESSION_KEY);
    callback(localUser ? JSON.parse(localUser) : null);

    mockObserver = callback;
    return () => { mockObserver = null; };
  },

  logout: async () => {
    if (isFirebaseConfigured) {
      try {
        await signOut(auth);
      } catch (e) {
        console.warn("Erro no logout Firebase", e);
      }
    }
    localStorage.removeItem(LOCAL_STORAGE_SESSION_KEY);
    if (mockObserver) mockObserver(null);
  }
};
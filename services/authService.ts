
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
    // Tenta Firebase primeiro
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

        const user: User = {
          id: firebaseUser.uid,
          name: firebaseUser.displayName || email.split('@')[0],
          email: firebaseUser.email || '',
          hotel: hotel,
          role: role,
          avatarUrl: firebaseUser.photoURL || undefined
        };
        
        // Persistir sessão localmente para evitar flash de logout
        localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, JSON.stringify(user));
        return user;
        
      } catch (error: any) {
        console.warn("Firebase Login Failed.", error.code);
        
        // CORREÇÃO: Tratamento explícito de senha incorreta para não cair no Mock
        if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
           throw new Error('Email ou senha incorretos.');
        }
        
        if (error.code === 'auth/too-many-requests') {
           throw new Error('Muitas tentativas falhas. Tente novamente mais tarde.');
        }

        // Se for outro erro (ex: network), tentamos o fallback apenas se não for erro de credencial
        console.log("Falling back to demo mode due to network/config error.");
      }
    }

    // Fallback Mock (Modo Demo) - Apenas se não for erro de senha
    // Permite login "fake" se o Firebase falhar ou não estiver configurado
    console.log("Usando login simulado (Demo Mode)");
    
    // Simula um delay de rede
    await new Promise(resolve => setTimeout(resolve, 800));

    const mockUser: User = {
      id: 'mock-user-id-' + Date.now(),
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
    // Tenta registrar no Firebase
    if (isFirebaseConfigured) {
      try {
        // 1. Criar usuário na Auth
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const firebaseUser = userCredential.user;

        // 2. Atualizar Nome no Perfil Auth
        await updateProfile(firebaseUser, { displayName: name });

        // 3. Salvar dados extras (Hotel, Cargo) no Firestore
        try {
            await setDoc(doc(db, "users", firebaseUser.uid), {
                name,
                email,
                hotel,
                role,
                createdAt: new Date()
            });
        } catch (e) {
            console.warn("Erro ao salvar no Firestore (pode ser permissão), seguindo com Auth apenas.");
        }

        const newUser: User = {
          id: firebaseUser.uid,
          name: name,
          email: firebaseUser.email || email,
          hotel: hotel,
          role: role
        };
        
        localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, JSON.stringify(newUser));
        return newUser;

      } catch (error: any) {
        if (error.code === 'auth/email-already-in-use') {
          throw new Error('Este email já está cadastrado.');
        }
        if (error.code === 'auth/weak-password') {
          throw new Error('A senha deve ter pelo menos 6 caracteres.');
        }
        // Se o erro for de configuração/network no registro, jogamos erro (não fazemos mock de registro persistente complexo)
        console.error("Erro no registro Firebase:", error);
        
        // Fallback simples para demo em caso de erro de API Key
        if (error.code === 'auth/operation-not-allowed' || error.code === 'auth/admin-restricted-operation' || error.code === 'auth/api-key-not-valid.-please-pass-a-valid-api-key.') {
            // Permitir "registrar" localmente para a sessão
            const mockUser: User = {
                id: 'mock-new-' + Date.now(),
                name,
                email,
                hotel,
                role
            };
            localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, JSON.stringify(mockUser));
            if (mockObserver) mockObserver(mockUser);
            return mockUser;
        }

        // Para outros erros reais, lançamos a exceção
        throw new Error("Erro ao criar conta: " + error.message);
      }
    }
    
    // Fallback Local Register (sem firebase configurado)
    const mockUser: User = {
        id: 'mock-new-' + Date.now(),
        name,
        email,
        hotel,
        role
    };
    localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, JSON.stringify(mockUser));
    if (mockObserver) mockObserver(mockUser);
    return mockUser;
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

          const userObj: User = {
            id: firebaseUser.uid,
            name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Usuario',
            email: firebaseUser.email || '',
            hotel: hotel,
            role: role,
            avatarUrl: firebaseUser.photoURL || undefined
          };
          
          // Atualiza cache local
          localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, JSON.stringify(userObj));
          callback(userObj);
        } else {
          // Checa fallback local apenas se não houver auth real do firebase
          // Isso mantém a sessão "demo" ativa mesmo se o Firebase falhar
          const local = localStorage.getItem(LOCAL_STORAGE_SESSION_KEY);
          if (local) {
             try {
                const parsed = JSON.parse(local);
                callback(parsed);
                return;
             } catch (e) { localStorage.removeItem(LOCAL_STORAGE_SESSION_KEY); }
          }
          callback(null);
        }
      });
      return unsubscribe;
    }

    // Modo totalmente offline/mock
    const localUser = localStorage.getItem(LOCAL_STORAGE_SESSION_KEY);
    callback(localUser ? JSON.parse(localUser) : null);
    mockObserver = callback;
    return () => { mockObserver = null; };
  },

  logout: async () => {
    if (isFirebaseConfigured) {
      try {
        await signOut(auth);
      } catch (e) { console.warn("Erro ao deslogar Firebase", e); }
    }
    localStorage.removeItem(LOCAL_STORAGE_SESSION_KEY);
    if (mockObserver) mockObserver(null);
  }
};

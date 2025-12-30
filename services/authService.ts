
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
    timestamp: new Date().toISOString() // String ISO para compatibilidade geral e fallback
  };

  // 1. Tentar salvar no Firestore
  if (isFirebaseConfigured) {
    try {
      await addDoc(collection(db, "access_logs"), {
        ...logData,
        timestamp: serverTimestamp() // Timestamp do servidor para Firestore
      });
      console.log("Log de acesso salvo no Firestore");
    } catch (e) {
      console.warn("Falha ao salvar log no Firestore, usando fallback local.");
    }
  }

  // 2. Salvar no LocalStorage (Fallback/Demo)
  try {
    const existingLogs = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LOGS_KEY) || '[]');
    // Adiciona no início
    existingLogs.unshift(logData);
    // Mantém apenas os últimos 50 logs para não estourar o storage
    const trimmedLogs = existingLogs.slice(0, 50);
    localStorage.setItem(LOCAL_STORAGE_LOGS_KEY, JSON.stringify(trimmedLogs));
  } catch (e) {
    console.error("Erro ao salvar log localmente", e);
  }
};

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
        
        // REGISTRAR LOG
        await logAccess(user);

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
    
    // REGISTRAR LOG MOCK
    await logAccess(mockUser);

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
                createdAt: serverTimestamp()
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
        await logAccess(newUser); // Logar acesso no registro
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
            await logAccess(mockUser);
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
    await logAccess(mockUser);
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
    
    // Force reload to clear any lingering React state or context
    window.location.reload();
  },

  // --- ADMIN: BUSCAR LOGS ---
  getLogs: async (): Promise<any[]> => {
    let logs: any[] = [];
    
    // 1. Tentar Firestore
    if (isFirebaseConfigured) {
        try {
            const logsRef = collection(db, "access_logs");
            const q = query(logsRef, orderBy("timestamp", "desc"), limit(50));
            const querySnapshot = await getDocs(q);
            
            logs = querySnapshot.docs.map(doc => {
                const data = doc.data();
                // Converte Timestamp do Firestore para string ISO
                let time = data.timestamp;
                if (time && typeof time.toDate === 'function') {
                    time = time.toDate().toISOString();
                }
                return { ...data, timestamp: time };
            });
            
            return logs; // Retorna se sucesso
        } catch (e) { 
            console.warn("Erro ao buscar logs no Firestore, usando local storage.", e); 
        }
    }

    // 2. Fallback LocalStorage
    try {
        const localLogs = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LOGS_KEY) || '[]');
        logs = localLogs;
    } catch (e) { console.error(e); }

    return logs;
  },

  // --- ADMIN: BUSCAR USUÁRIOS ---
  getUsers: async (): Promise<any[]> => {
    let usersList: any[] = [];

    // 1. Tentar Firestore
    if (isFirebaseConfigured) {
        try {
            const usersRef = collection(db, "users");
            const q = query(usersRef, orderBy("createdAt", "desc"), limit(100)); // Limite de segurança
            const querySnapshot = await getDocs(q);

            usersList = querySnapshot.docs.map(doc => {
                const data = doc.data();
                let created = data.createdAt;
                if (created && typeof created.toDate === 'function') {
                    created = created.toDate().toISOString();
                }
                return { id: doc.id, ...data, createdAt: created };
            });
            return usersList;
        } catch (e) {
            console.warn("Erro ao buscar usuários no Firestore.", e);
        }
    }

    // 2. Fallback Mock (para não mostrar tela vazia se offline)
    usersList = [
        { id: '1', name: 'Carlos Silva', email: 'gerencia@copapalaceview.com', hotel: 'Copacabana Palace View', role: 'Gerente Geral', createdAt: new Date().toISOString() },
        { id: '2', name: 'Mariana Costa', email: 'rh@hotelatlantico.com.br', hotel: 'Hotel Atlântico Rio', role: 'Diretora de RH', createdAt: new Date(Date.now() - 86400000).toISOString() },
        { id: '3', name: 'Roberto Almeida', email: 'financeiro@riodesign.com', hotel: 'Rio Design Hotel', role: 'Controller', createdAt: new Date(Date.now() - 172800000).toISOString() }
    ];

    return usersList;
  }
};

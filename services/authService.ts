
import { User } from '../types';
import { auth, db } from '../firebaseConfig';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, addDoc, collection, serverTimestamp, query, orderBy, limit, getDocs } from 'firebase/firestore';

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
    timestamp: new Date().toISOString() // Fallback string para local storage
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
      console.warn("Falha ao salvar log no Firestore, usando fallback local.", e);
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
        
        // Tenta buscar dados extras do Firestore (Hotel, Cargo e STATUS)
        let hotel = 'Hotel Associado';
        let role = 'Associado';
        let status = 'APPROVED'; // Default para usuários antigos sem status
        
        try {
          const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            hotel = data.hotel || hotel;
            role = data.role || role;
            status = data.status || status;
          }
        } catch (e) {
          console.warn("Não foi possível buscar detalhes do usuário no Firestore", e);
        }

        // VERIFICAÇÃO DE STATUS
        if (status === 'PENDING') {
            await signOut(auth); // Desloga imediatamente
            throw new Error('Seu cadastro está em análise. Aguarde a aprovação do administrador.');
        }
        if (status === 'REJECTED') {
            await signOut(auth);
            throw new Error('Seu cadastro foi recusado. Entre em contato com o suporte.');
        }

        const user: User = {
          id: firebaseUser.uid,
          name: firebaseUser.displayName || email.split('@')[0],
          email: firebaseUser.email || '',
          hotel: hotel,
          role: role,
          status: status as any,
          avatarUrl: firebaseUser.photoURL || undefined
        };
        
        // Persistir sessão localmente para evitar flash de logout
        localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, JSON.stringify(user));
        
        // REGISTRAR LOG
        await logAccess(user);

        return user;
        
      } catch (error: any) {
        console.warn("Firebase Login Failed.", error.code);
        
        if (error.message.includes('análise') || error.message.includes('recusado')) {
            throw error; // Repassa erro de status
        }
        
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
      status: 'APPROVED',
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

        // 3. Salvar dados extras (Hotel, Cargo, STATUS) no Firestore
        // ATENÇÃO: Novos registros agora são PENDING por padrão
        const initialStatus = 'PENDING';
        
        try {
            await setDoc(doc(db, "users", firebaseUser.uid), {
                name,
                email,
                hotel,
                role,
                status: initialStatus,
                createdAt: serverTimestamp()
            });
        } catch (e) {
            console.warn("Erro ao salvar no Firestore (pode ser permissão), seguindo com Auth apenas.");
        }

        // Não retorna o usuário logado, lança aviso de pendência
        await signOut(auth); // Garante que não loga automático
        throw new Error('Cadastro realizado com sucesso! Aguarde a aprovação do administrador para acessar.');

      } catch (error: any) {
        // Se foi o nosso erro de sucesso/pendência, repassa
        if (error.message.includes('Aguarde a aprovação')) {
            throw error;
        }

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
                role,
                status: 'APPROVED' // No modo demo offline, aprovamos direto
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
        role,
        status: 'APPROVED'
    };
    localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, JSON.stringify(mockUser));
    await logAccess(mockUser);
    if (mockObserver) mockObserver(mockUser);
    return mockUser;
  },

  // --- ADMIN: ATUALIZAR STATUS ---
  updateUserStatus: async (userId: string, newStatus: 'APPROVED' | 'REJECTED' | 'PENDING') => {
    if (isFirebaseConfigured) {
        try {
            await updateDoc(doc(db, "users", userId), {
                status: newStatus
            });
            return true;
        } catch (e) {
            console.error("Erro ao atualizar status", e);
            throw e;
        }
    } else {
        // Mock update (não persiste de verdade além da sessão, mas simula UI)
        return true;
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
          let status = 'APPROVED';
          
          try {
             const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
             if (userDoc.exists()) {
               const data = userDoc.data();
               hotel = data.hotel || hotel;
               role = data.role || role;
               status = data.status || status;
             }
          } catch (e) { console.log("Erro ao carregar perfil extendido"); }

          // Se status mudou para REJECTED/PENDING durante a sessão, desloga
          if (status !== 'APPROVED') {
              await signOut(auth);
              localStorage.removeItem(LOCAL_STORAGE_SESSION_KEY);
              callback(null);
              return;
          }

          const userObj: User = {
            id: firebaseUser.uid,
            name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Usuario',
            email: firebaseUser.email || '',
            hotel: hotel,
            role: role,
            status: status as any,
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
            
            try {
                // Tenta query ordenada (Requer índice no Firestore)
                const q = query(logsRef, orderBy("timestamp", "desc"), limit(50));
                const querySnapshot = await getDocs(q);
                logs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            } catch (queryError) {
                // Fallback: Query sem ordenação (se índice faltar) + Ordenação no Client
                console.warn("Ordenação Firestore falhou (índice pendente?), buscando sem ordem...", queryError);
                const q = query(logsRef, limit(50));
                const querySnapshot = await getDocs(q);
                logs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                
                // Ordenar localmente
                logs.sort((a, b) => {
                    const tA = a.timestamp?.seconds || 0;
                    const tB = b.timestamp?.seconds || 0;
                    return tB - tA;
                });
            }
            
            // Normalizar datas
            return logs.map(log => {
                let time = log.timestamp;
                if (time && typeof time.toDate === 'function') {
                    time = time.toDate().toISOString();
                } else if (time && time.seconds) {
                    time = new Date(time.seconds * 1000).toISOString();
                }
                return { ...log, timestamp: time };
            });

        } catch (e) { 
            console.warn("Erro crítico ao buscar logs no Firestore.", e); 
        }
    }

    // 2. Fallback LocalStorage (Se Firestore falhar ou retornar vazio)
    if (logs.length === 0) {
        try {
            const localLogs = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LOGS_KEY) || '[]');
            logs = localLogs;
        } catch (e) { console.error(e); }
    }

    return logs;
  },

  // --- ADMIN: BUSCAR USUÁRIOS ---
  getUsers: async (): Promise<any[]> => {
    let usersList: any[] = [];

    // 1. Tentar Firestore
    if (isFirebaseConfigured) {
        try {
            const usersRef = collection(db, "users");
            
            try {
                const q = query(usersRef, orderBy("createdAt", "desc"), limit(100));
                const querySnapshot = await getDocs(q);
                usersList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            } catch (queryError) {
                console.warn("Ordenação Users falhou, buscando raw...");
                const q = query(usersRef, limit(100));
                const querySnapshot = await getDocs(q);
                usersList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                
                usersList.sort((a, b) => {
                    const tA = a.createdAt?.seconds || 0;
                    const tB = b.createdAt?.seconds || 0;
                    return tB - tA;
                });
            }

            // Normalizar datas e garantir status default
            return usersList.map(u => {
                let created = u.createdAt;
                if (created && typeof created.toDate === 'function') {
                    created = created.toDate().toISOString();
                } else if (created && created.seconds) {
                    created = new Date(created.seconds * 1000).toISOString();
                }
                return { 
                    ...u, 
                    createdAt: created,
                    status: u.status || 'APPROVED' // Assumir aprovado se não tiver campo (legado)
                };
            });

        } catch (e) {
            console.warn("Erro ao buscar usuários no Firestore.", e);
        }
    }

    // 2. Fallback Mock (apenas se a lista estiver vazia para evitar tela em branco em testes)
    if (usersList.length === 0) {
        usersList = [
            { id: '1', name: 'Carlos Silva', email: 'gerencia@copapalaceview.com', hotel: 'Copacabana Palace View', role: 'Gerente Geral', status: 'APPROVED', createdAt: new Date().toISOString() },
            { id: '2', name: 'Mariana Costa', email: 'rh@hotelatlantico.com.br', hotel: 'Hotel Atlântico Rio', role: 'Diretora de RH', status: 'APPROVED', createdAt: new Date(Date.now() - 86400000).toISOString() },
            { id: '3', name: 'Novo Usuário', email: 'contato@novohotel.com', hotel: 'Hotel Novo Rio', role: 'Gerente', status: 'PENDING', createdAt: new Date(Date.now() - 172800000).toISOString() }
        ];
    }

    return usersList;
  }
};

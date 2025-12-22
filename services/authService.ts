
// Autor: Gabriel Salles
// Suporte do SO: Windows11
// Descrição: Serviço de autenticação

import { auth } from '../firebaseConfig';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut, 
  sendPasswordResetEmail,
  updateProfile,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, getDoc, setDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { User } from '../types';
import { MOCK_USER } from '../constants';

const isFirebaseConfigured = auth.app.options.apiKey && auth.app.options.apiKey.length > 20;

export const authService = {
  // --- LOGIN ---
  login: async (email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> => {
    if (isFirebaseConfigured) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const fbUser = userCredential.user;
        
        // Fetch extra data from Firestore
        let userRole = 'Associado';
        let userHotel = 'Hotel Rio';
        let userName = fbUser.displayName || email.split('@')[0];
        
        try {
            const docRef = doc(db, "users", fbUser.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                userRole = data.role || userRole;
                userHotel = data.hotel || userHotel;
                userName = data.name || userName;
            }

            // --- NOVO: REGISTRAR LOG DE ACESSO ---
            await addDoc(collection(db, "access_logs"), {
                userId: fbUser.uid,
                userName: userName,
                hotel: userHotel,
                email: email,
                timestamp: serverTimestamp(),
                action: 'LOGIN'
            });

        } catch (e) {
            console.warn("Firestore log error:", e);
        }

        const appUser: User = {
          id: fbUser.uid,
          name: userName,
          email: fbUser.email || '',
          hotel: userHotel,
          role: userRole,
          gamification: {
             xp: 450,
             level: 'GOLD',
             streak: 12,
             lastLoginDate: new Date().toISOString(),
             badges: ['badge-first-login', 'badge-explorer'],
             completedActions: []
          }
        };
        return { success: true, user: appUser };
      } catch (error: any) {
        console.error("Firebase Login Error:", error);
        let errorMsg = "Credenciais inválidas.";
        if (error.code === 'auth/too-many-requests') errorMsg = "Muitas tentativas. Tente mais tarde.";
        return { success: false, error: errorMsg };
      }
    }

    // Mock Login Logic
    if (email === 'marketing@hoteisrio.com.br' && password === 'admin') {
         return { 
            success: true, 
            user: { ...MOCK_USER, id: 'admin-01', email, role: 'Admin', gamification: { xp: 9999, level: 'MASTER', streak: 100, lastLoginDate: '', badges: [], completedActions: [] } as any } 
         };
    }
    
    // Default Mock
    return {
        success: true,
        user: {
            ...MOCK_USER,
            id: 'mock-user-01',
            email,
            gamification: {
                xp: 340,
                level: 'GOLD',
                streak: 5,
                lastLoginDate: new Date().toISOString(),
                badges: ['badge-first-login'],
                completedActions: []
            }
        }
    };
  },

  // --- REGISTER (NEW) ---
  register: async (email: string, password: string, name: string, hotel: string): Promise<{ success: boolean; user?: User; error?: string }> => {
    if (isFirebaseConfigured) {
        try {
            // 1. Create Auth User
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const fbUser = userCredential.user;

            // 2. Update Display Name
            await updateProfile(fbUser, { displayName: name });

            // 3. Save details to Firestore
            await setDoc(doc(db, "users", fbUser.uid), {
                name,
                email,
                hotel,
                role: 'Associado',
                createdAt: new Date()
            });

            const appUser: User = {
                id: fbUser.uid,
                name: name,
                email: email,
                hotel: hotel,
                role: 'Associado',
                gamification: { xp: 0, level: 'BRONZE', streak: 1, lastLoginDate: new Date().toISOString(), badges: [], completedActions: [] }
            };

            return { success: true, user: appUser };

        } catch (error: any) {
            console.error("Firebase Register Error:", error);
            let msg = "Erro ao criar conta.";
            if (error.code === 'auth/email-already-in-use') msg = "Este e-mail já está em uso.";
            if (error.code === 'auth/weak-password') msg = "A senha deve ter pelo menos 6 caracteres.";
            return { success: false, error: msg };
        }
    }

    // Mock Register
    return {
        success: true,
        user: {
            id: 'mock-new-' + Date.now(),
            name,
            email,
            hotel,
            role: 'Associado',
            gamification: { xp: 0, level: 'BRONZE', streak: 1, lastLoginDate: new Date().toISOString(), badges: [], completedActions: [] }
        }
    };
  },

  // --- LOGOUT ---
  logout: async () => {
    if (isFirebaseConfigured) {
      await signOut(auth);
    }
  },

  // --- RESET PASSWORD ---
  sendPasswordReset: async (email: string) => {
    if (isFirebaseConfigured) {
        try {
            console.log(`[Auth] Tentando enviar reset de senha para: ${email}`);
            await sendPasswordResetEmail(auth, email);
            console.log('[Auth] Firebase reportou sucesso no envio.');
            return { success: true };
        } catch (error: any) {
            console.error("[Auth] Erro no sendPasswordReset:", error);
            let msg = 'Erro ao enviar e-mail.';
            if (error.code === 'auth/user-not-found') msg = 'E-mail não encontrado na base de dados.';
            if (error.code === 'auth/invalid-email') msg = 'Formato de e-mail inválido.';
            return { success: false, error: msg };
        }
    }
    // Mock success
    console.warn("[Auth] Modo Demo: Simulando envio de reset para", email);
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true };
  }
};

// --- Fim de services/authService.ts ---

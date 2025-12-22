// Autor: Gabriel Salles
// Suporte do SO: Windows11
// Descrição: Serviço de autenticação

import { auth } from '../firebaseConfig';
import { 
  signInWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { User } from '../types';
import { MOCK_USER } from '../constants';

const isFirebaseConfigured = auth.app.options.apiKey && auth.app.options.apiKey.length > 20;

export const authService = {
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
        } catch (e) {
            console.warn("Firestore fetch error:", e);
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
        return { success: false, error: "Credenciais inválidas." };
      }
    }

    // Mock Login
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

  logout: async () => {
    if (isFirebaseConfigured) {
      await signOut(auth);
    }
  },

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
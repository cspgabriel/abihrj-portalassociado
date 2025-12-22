
import { db, auth, firebaseConfig } from '../firebaseConfig';
import { collection, getDocs, query, orderBy, setDoc, doc } from 'firebase/firestore';
import { sendPasswordResetEmail, createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth';
import { initializeApp, getApp, getApps } from 'firebase/app';
import { User } from '../types';

// Helper to check if string is valid email
const isValidEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const adminService = {
  // Fetch all users from Firestore 'users' collection
  getAllUsers: async (): Promise<User[]> => {
    try {
      const usersRef = collection(db, 'users');
      // Tenta ordenar, se falhar (falta de index), pega sem ordem e ordena no front
      const q = query(usersRef, orderBy('name')); 
      
      const querySnapshot = await getDocs(q);
      const users: User[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        users.push({
          id: doc.id,
          name: data.name || 'Sem Nome',
          email: data.email || '',
          hotel: data.hotel || 'N/A',
          role: data.role || 'Associado',
          // Gamification data might be stored here or separate, simple fetch for listing
        });
      });
      
      return users;
    } catch (error) {
      console.warn("Erro ao buscar usuários (pode ser falta de permissão ou index):", error);
      // Fallback para mock se não tiver permissão/dados
      return []; 
    }
  },

  // Register a single user without logging out the admin
  // Uses a secondary Firebase App instance
  registerUserWithoutLogout: async (userData: { name: string, email: string, hotel: string, role: string }) => {
    let secondaryApp;
    try {
        // Check if secondary app already exists, if not initialize it
        // We use a unique name 'SecondaryApp' to avoid conflict with default
        if (getApps().length > 1) {
            secondaryApp = getApps().find(app => app.name === 'SecondaryApp') || initializeApp(firebaseConfig, 'SecondaryApp');
        } else {
            secondaryApp = initializeApp(firebaseConfig, 'SecondaryApp');
        }

        const secondaryAuth = getAuth(secondaryApp);
        const defaultPassword = "hoteisrio2025"; // Senha padrão para importação

        // 1. Create User in Auth
        const userCredential = await createUserWithEmailAndPassword(secondaryAuth, userData.email, defaultPassword);
        const user = userCredential.user;

        // 2. Update Profile Name
        await updateProfile(user, { displayName: userData.name });

        // 3. Save to Firestore (using the MAIN app's db instance which admin has access to write)
        await setDoc(doc(db, "users", user.uid), {
            name: userData.name,
            email: userData.email,
            hotel: userData.hotel,
            role: userData.role,
            createdAt: new Date(),
            importedByAdmin: true
        });

        // 4. Logout the secondary user immediately so the instance stays clean
        await secondaryAuth.signOut();

        return { success: true, uid: user.uid };

    } catch (error: any) {
        console.error("Erro ao criar usuário via secundário:", error);
        return { success: false, error: error.message };
    }
  },

  // Send Password Reset Email (The secure way to "change" users passwords)
  sendUserPasswordReset: async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true, message: `E-mail de redefinição enviado para ${email}` };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  },

  // Export to CSV
  exportUsersToCSV: (users: User[]) => {
    const headers = ['Nome', 'Email', 'Hotel', 'Cargo', 'ID'];
    const csvContent = [
      headers.join(','),
      ...users.map(u => 
        `"${u.name}","${u.email}","${u.hotel}","${u.role}","${u.id}"`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `usuarios_hoteisrio_${new Date().toISOString().slice(0,10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  // Template Download for Import
  downloadImportTemplate: () => {
    const headers = ['Nome Completo', 'Email', 'Nome do Hotel', 'Cargo'];
    const examples = [
        '"João Silva","joao@exemplo.com","Hotel Atlântico","Gerente"',
        '"Maria Santos","maria@exemplo.com","Hotel Copacabana","Recepcionista"'
    ];
    const csvContent = [headers.join(','), ...examples].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `template_importacao_hoteisrio.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

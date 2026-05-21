import { db } from '../firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { auth } from '../firebaseConfig';

export interface ServiceRequestData {
  userId: string;
  userEmail: string;
  type: 'JURIDICO' | 'ORDEM_PUBLICA';
  category?: string;
  subject: string;
  description: string;
  status: 'PENDENTE' | 'EM_ANALISE' | 'CONCLUIDO';
  createdAt?: any;
}

const isFirebaseConfigured = auth.app.options.apiKey && auth.app.options.apiKey.length > 20;

export const requestService = {
  createRequest: async (data: ServiceRequestData) => {
    // Tentar salvar no Firebase se configurado
    if (isFirebaseConfigured) {
      try {
        const docRef = await addDoc(collection(db, "chamados"), {
          ...data,
          createdAt: serverTimestamp()
        });
        return docRef.id;
      } catch (e: any) {
        // Fallback para localStorage se Firebase indisponível
        // Se der erro (ex: permissão negada no Firestore), cai pro fallback
      }
    }

    // Fallback: Salvar no LocalStorage
    try {
      const existingRequests = JSON.parse(localStorage.getItem('rio_mock_requests') || '[]');
      const newRequest = {
        ...data,
        id: 'local-' + Date.now(),
        createdAt: new Date().toISOString(),
        mock: true
      };
      
      existingRequests.push(newRequest);
      localStorage.setItem('rio_mock_requests', JSON.stringify(existingRequests));
      
      await new Promise(resolve => setTimeout(resolve, 800));
      
      return newRequest.id;
    } catch (e) {
      throw new Error("Não foi possível salvar a solicitação.");
    }
  }
};
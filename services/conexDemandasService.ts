
import { db } from '../firebaseConfig';
import { collection, addDoc, getDocs, serverTimestamp, query, orderBy, limit } from 'firebase/firestore';

export interface ConexDemanda {
  id?: string;
  nome: string;
  email: string;
  hotel: string;
  telefone?: string;
  tipoDemanda: string;
  assunto: string;
  descricao: string;
  status: 'PENDENTE' | 'EM_ANALISE' | 'CONCLUIDO';
  createdAt?: any;
}

export const conexDemandasService = {
  save: async (data: Omit<ConexDemanda, 'id' | 'status' | 'createdAt'>): Promise<string> => {
    const docRef = await addDoc(collection(db, 'CONEX_DEMANDAS'), {
      ...data,
      status: 'PENDENTE',
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  },

  getAll: async (): Promise<ConexDemanda[]> => {
    const q = query(
      collection(db, 'CONEX_DEMANDAS'),
      orderBy('createdAt', 'desc'),
      limit(200)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as ConexDemanda[];
  },
};

import { db } from '../firebaseConfig';
import { collection, addDoc, serverTimestamp, query, limit, getDocs } from 'firebase/firestore';

export interface EventLog {
  userId?: string;
  userEmail?: string;
  type: string;
  details?: any;
  timestamp: string;
}

const LOCAL_STORAGE_EVENTS_KEY = 'rio_event_logs';
const isFirebaseConfigured = !!(db && db.app && (db.app.options.apiKey || '').length > 20);

async function saveToFirestore(evt: EventLog) {
  if (!isFirebaseConfigured) return;
  try {
    await addDoc(collection(db, 'analytics_logs'), {
      ...evt,
      timestamp: serverTimestamp()
    });
  } catch (e) {
    console.warn('Falha ao salvar evento no Firestore', e);
  }
}

async function saveToLocal(evt: EventLog) {
  try {
    const existing = JSON.parse(localStorage.getItem(LOCAL_STORAGE_EVENTS_KEY) || '[]');
    existing.unshift(evt);
    const trimmed = existing.slice(0, 200);
    localStorage.setItem(LOCAL_STORAGE_EVENTS_KEY, JSON.stringify(trimmed));
  } catch (e) {
    console.error('Erro ao salvar evento localmente', e);
  }
}

export const analyticsService = {
  logEvent: async (evt: EventLog) => {
    const enriched: EventLog = {
      ...evt,
      timestamp: new Date().toISOString()
    };
    await Promise.all([saveToFirestore(enriched), saveToLocal(enriched)]);
  },

  getEvents: async (): Promise<EventLog[]> => {
    if (isFirebaseConfigured) {
      try {
        const ref = collection(db, 'analytics_logs');
        const q = query(ref, limit(200));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as EventLog[];
      } catch (e) {
        console.warn('Erro ao buscar eventos do Firestore', e);
      }
    }
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_EVENTS_KEY) || '[]');
  }
};

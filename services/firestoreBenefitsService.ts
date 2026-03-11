import { db } from '../firebaseConfig';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { Benefit } from '../types';

const isFirebaseConfigured = !!(db && db.app && (db.app.options.apiKey || '').length > 20);

export const firestoreBenefitsService = {
  upsert: async (benefit: Benefit) => {
    if (!isFirebaseConfigured) {
      console.warn('Firebase não configurado — pulando sincronização de benefício');
      return;
    }

    try {
      const ref = doc(db, 'benefits', benefit.id);
      await setDoc(ref, {
        ...benefit,
        _syncedAt: serverTimestamp()
      }, { merge: true });
    } catch (e) {
      console.warn('Falha ao salvar benefício no Firestore', e);
    }
  }
};

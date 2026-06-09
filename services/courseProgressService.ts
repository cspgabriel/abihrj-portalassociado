
// Autor: Gabriel Salles
// Suporte do SO: Windows11
// Descrição: Progresso e avaliações de cursos por usuário (Firestore + fallback local)

import { auth, db } from '../firebaseConfig';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { CourseProgress } from '../types';

const isFirebaseConfigured = !!(auth.app.options.apiKey && auth.app.options.apiKey.length > 20);

const LS_KEY = 'rio_course_progress';
const keyOf = (userId: string, courseId: string) => `${userId}_${courseId}`;

const readLocal = (): Record<string, CourseProgress> => {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) || '{}');
  } catch {
    return {};
  }
};

const writeLocal = (all: Record<string, CourseProgress>) => {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(all));
  } catch {
    // ignore
  }
};

export const courseProgressService = {
  // Lê o progresso de um curso (Firestore quando disponível; senão, localStorage)
  get: async (userId: string, courseId: string): Promise<CourseProgress | null> => {
    if (!userId) return null;
    const id = keyOf(userId, courseId);

    if (isFirebaseConfigured) {
      try {
        const snap = await getDoc(doc(db, 'course_progress', id));
        if (snap.exists()) return snap.data() as CourseProgress;
      } catch (e) {
        // cai no fallback local
      }
    }
    return readLocal()[id] || null;
  },

  // Salva (merge) o progresso. Mantém cópia local para resiliência offline.
  save: async (
    userId: string,
    courseId: string,
    data: Partial<CourseProgress>
  ): Promise<CourseProgress> => {
    const id = keyOf(userId, courseId);
    const local = readLocal();
    const merged: CourseProgress = {
      ...(local[id] || { userId, courseId }),
      ...data,
      userId,
      courseId,
      updatedAt: new Date().toISOString(),
    };
    local[id] = merged;
    writeLocal(local);

    if (isFirebaseConfigured) {
      try {
        await setDoc(
          doc(db, 'course_progress', id),
          { ...merged, _syncedAt: serverTimestamp() },
          { merge: true }
        );
      } catch (e) {
        console.warn('Falha ao salvar progresso no Firestore (mantido localmente).');
      }
    }
    return merged;
  },
};

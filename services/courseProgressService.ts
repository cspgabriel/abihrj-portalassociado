
// Autor: Gabriel Salles
// Suporte do SO: Windows11
// Descrição: Progresso e avaliações de cursos por usuário (Firestore + fallback local)

import { auth, db } from '../firebaseConfig';
import { doc, getDoc, setDoc, serverTimestamp, collection, query, where, getDocs } from 'firebase/firestore';
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

  // Lista todo o progresso do usuário (para a página "Meu Progresso")
  list: async (userId: string): Promise<CourseProgress[]> => {
    if (!userId) return [];
    let remote: CourseProgress[] = [];
    if (isFirebaseConfigured) {
      try {
        const q = query(collection(db, 'course_progress'), where('userId', '==', userId));
        const snap = await getDocs(q);
        remote = snap.docs.map(d => d.data() as CourseProgress);
      } catch (e) {
        // cai no fallback local
      }
    }
    const local = Object.values(readLocal()).filter(p => p.userId === userId);
    // Mescla: remoto tem prioridade; completa com itens só-locais
    const byCourse: Record<string, CourseProgress> = {};
    [...local, ...remote].forEach(p => { byCourse[p.courseId] = { ...byCourse[p.courseId], ...p }; });
    return Object.values(byCourse);
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

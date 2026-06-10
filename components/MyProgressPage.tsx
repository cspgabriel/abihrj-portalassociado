
// Autor: Gabriel Salles
// Suporte do SO: Windows11
// Descrição: Página "Meu Progresso" — cursos iniciados pelo usuário e progresso atual

import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, GraduationCap, Clock, CheckCircle2, ChevronRight, Award } from 'lucide-react';
import { COURSES_DATA, COURSE_QUIZZES } from '../constants';
import { CourseProgress } from '../types';
import { courseProgressService } from '../services/courseProgressService';

interface MyProgressPageProps {
  onBack: () => void;
  userId?: string;
  onOpenCourse: (courseId: string) => void;
}

const computePct = (p: CourseProgress): number => {
  const hasQuiz = !!COURSE_QUIZZES[p.courseId];
  const watched = Math.min((p.lessonsWatched || []).length, 1);
  const total = 1 + (hasQuiz ? 1 : 0);
  const done = watched + (p.quizPassed ? 1 : 0);
  return total ? Math.round((done / total) * 100) : 0;
};

const MyProgressPage: React.FC<MyProgressPageProps> = ({ onBack, userId, onOpenCourse }) => {
  const [items, setItems] = useState<CourseProgress[] | null>(null);

  useEffect(() => {
    let active = true;
    if (userId) {
      courseProgressService.list(userId)
        .then(list => { if (active) setItems(list); })
        .catch(() => { if (active) setItems([]); });
    } else {
      setItems([]);
    }
    return () => { active = false; };
  }, [userId]);

  // Apenas cursos efetivamente iniciados, ordenados por mais recentes
  const rows = useMemo(() => {
    return (items || [])
      .filter(p => p.started || (p.lessonsWatched && p.lessonsWatched.length) || p.quizScore != null)
      .map(p => {
        const course = COURSES_DATA.find(c => c.id === p.courseId);
        return { p, course, pct: computePct(p) };
      })
      .filter(r => r.course)
      .sort((a, b) => (b.p.updatedAt || '').localeCompare(a.p.updatedAt || ''));
  }, [items]);

  const concluded = rows.filter(r => r.pct >= 100).length;

  return (
    <div className="min-h-screen bg-slate-50 animate-fade-in pb-24 md:pb-0">
      <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800 text-white">
        <div className="max-w-5xl mx-auto px-4 md:px-8 pt-3 md:pt-4 pb-6 md:pb-8">
          <button onClick={onBack} className="text-blue-200 hover:text-white inline-flex items-center gap-1 text-sm mb-3 md:mb-4">
            <ArrowLeft className="w-4 h-4" /> Voltar ao Painel
          </button>
          <h1 className="text-2xl md:text-3xl font-black leading-tight flex items-center gap-2">
            <GraduationCap className="w-7 h-7 text-amber-300" /> Meu Progresso
          </h1>
          <p className="text-blue-100/90 text-sm mt-2">Acompanhe os cursos que você iniciou e continue de onde parou.</p>
          <div className="grid grid-cols-2 gap-2 md:gap-3 mt-5 max-w-xs">
            <div className="bg-white/10 backdrop-blur rounded-lg p-3 border border-white/15">
              <p className="text-xl md:text-2xl font-black">{rows.length}</p>
              <p className="text-[11px] text-blue-100 mt-1">Em andamento</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-3 border border-white/15">
              <p className="text-xl md:text-2xl font-black">{concluded}</p>
              <p className="text-[11px] text-blue-100 mt-1">Concluídos</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 py-8 md:py-10">
        {items === null ? (
          <div className="bg-white border border-slate-200 rounded-xl p-10 text-center text-slate-500 text-sm">Carregando seu progresso...</div>
        ) : rows.length === 0 ? (
          <div className="bg-white border border-dashed border-slate-300 rounded-xl p-10 text-center">
            <GraduationCap className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-600 font-bold">Você ainda não iniciou nenhum curso.</p>
            <p className="text-slate-400 text-sm mt-1">Acesse "Cursos &amp; Treinamentos" e comece agora — seu progresso aparece aqui.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {rows.map(({ p, course, pct }) => (
              <button
                key={p.courseId}
                onClick={() => onOpenCourse(p.courseId)}
                className="group w-full flex items-center gap-4 bg-white border border-slate-200 rounded-xl p-4 text-left shadow-sm hover:border-blue-300 hover:shadow-md transition-all"
              >
                <img
                  src={`https://img.youtube.com/vi/${course!.youtubeId}/hqdefault.jpg`}
                  alt={course!.title}
                  loading="lazy"
                  className="w-28 h-16 object-cover rounded-lg shrink-0 ring-1 ring-slate-200"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-blue-700">{course!.category}</p>
                  <h3 className="text-sm font-black text-slate-900 leading-4 line-clamp-1 mt-0.5 group-hover:text-blue-700">{course!.title}</h3>
                  <div className="mt-2 flex items-center gap-3">
                    <div className="h-2 flex-1 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${pct >= 100 ? 'bg-emerald-500' : 'bg-blue-600'}`} style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-xs font-bold text-slate-600 shrink-0">{pct}%</span>
                  </div>
                  <div className="mt-1.5 flex items-center gap-3 text-[11px] text-slate-500">
                    <span className="inline-flex items-center gap-1"><Clock className="w-3 h-3" /> {course!.duration}</span>
                    {pct >= 100 ? (
                      <span className="inline-flex items-center gap-1 text-emerald-600 font-bold"><Award className="w-3 h-3" /> Certificado liberado</span>
                    ) : p.quizScore != null ? (
                      <span className="inline-flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Avaliação: {p.quizScore}/{p.quizTotal}</span>
                    ) : (
                      <span>Continuar curso</span>
                    )}
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400 shrink-0 group-hover:text-blue-600" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProgressPage;

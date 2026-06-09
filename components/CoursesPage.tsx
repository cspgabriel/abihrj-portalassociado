
import React, { useState, useEffect, useMemo } from 'react';
import {
  ArrowLeft, Play, Clock, CheckCircle2, Search, Share2, GraduationCap,
  BookOpen, Users, Award, Sparkles, ChevronRight, Tag, Calendar,
} from 'lucide-react';
import { COURSES_DATA } from '../constants';
import { Course } from '../types';

interface CoursesPageProps {
  onBack: () => void;
}

const formatDuration = (durations: string[]): string => {
  let totalMinutes = 0;
  durations.forEach(d => {
    const hours = /(\d+)\s*h/.exec(d);
    const minutes = /(\d+)\s*m/.exec(d);
    if (hours) totalMinutes += parseInt(hours[1], 10) * 60;
    if (minutes) totalMinutes += parseInt(minutes[1], 10);
  });
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  return h > 0 ? `${h}h${m ? ` ${m}m` : ''}` : `${m}m`;
};

const CoursesPage: React.FC<CoursesPageProps> = ({ onBack }) => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get('courseId');
    if (courseId) {
      const course = COURSES_DATA.find(c => c.id === courseId);
      if (course) setSelectedCourse(course);
    }
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [selectedCourse]);

  const categories = useMemo(() => {
    const set = new Set<string>(COURSES_DATA.map(c => c.category));
    return ['Todos', ...Array.from(set)];
  }, []);

  const totalDuration = useMemo(
    () => formatDuration(COURSES_DATA.map(c => c.duration)),
    []
  );

  const filteredCourses = useMemo(() => {
    return COURSES_DATA.filter(c => {
      const matchCategory = activeCategory === 'Todos' || c.category === activeCategory;
      const term = searchTerm.trim().toLowerCase();
      const matchSearch = !term ||
        c.title.toLowerCase().includes(term) ||
        c.description.toLowerCase().includes(term) ||
        c.category.toLowerCase().includes(term);
      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchTerm]);

  const featuredCourse = useMemo(() => COURSES_DATA.find(c => c.isNew) ?? COURSES_DATA[0], []);

  const openCourse = (course: Course) => {
    setSelectedCourse(course);
    const url = new URL(window.location.href);
    url.searchParams.set('view', 'courses-v2');
    url.searchParams.set('courseId', course.id);
    window.history.pushState({}, '', url);
  };

  const closeCourse = () => {
    setSelectedCourse(null);
    const url = new URL(window.location.href);
    url.searchParams.delete('courseId');
    window.history.pushState({}, '', url);
  };

  const shareLink = (course: Course) => {
    const url = new URL(window.location.href);
    url.searchParams.set('view', 'courses-v2');
    url.searchParams.set('courseId', course.id);
    navigator.clipboard.writeText(url.toString());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (selectedCourse) {
    const related = COURSES_DATA.filter(c => c.category === selectedCourse.category && c.id !== selectedCourse.id).slice(0, 4);

    return (
      <div className="min-h-screen bg-slate-50 animate-fade-in">
        <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800 text-white">
          <div className="max-w-6xl mx-auto px-4 md:px-8 pt-6 pb-10">
            <div className="flex items-center gap-3 text-sm mb-6">
              <button onClick={onBack} className="text-blue-200 hover:text-white inline-flex items-center gap-1">
                <ArrowLeft className="w-4 h-4" /> Voltar ao Dashboard
              </button>
              <span className="text-blue-300">/</span>
              <button onClick={closeCourse} className="text-blue-200 hover:text-white">HoteisRio Academy</button>
              <span className="text-blue-300">/</span>
              <span className="text-white/80 truncate">{selectedCourse.title}</span>
            </div>

            <div className="grid lg:grid-cols-[1fr_320px] gap-8 items-start">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-amber-300 flex items-center gap-1.5">
                    <Tag className="w-3 h-3" /> {selectedCourse.category}
                  </span>
                  {selectedCourse.isNew && (
                    <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">NOVO</span>
                  )}
                </div>
                <h1 className="text-3xl md:text-4xl font-black leading-tight mb-3">{selectedCourse.title}</h1>
                <p className="text-blue-100/90 text-sm md:text-base leading-relaxed max-w-2xl">{selectedCourse.description}</p>
                <div className="flex flex-wrap items-center gap-5 mt-5 text-sm text-blue-100">
                  <span className="inline-flex items-center gap-1.5"><Clock className="w-4 h-4" /> {selectedCourse.duration}</span>
                  <span className="inline-flex items-center gap-1.5"><Calendar className="w-4 h-4" /> 2026</span>
                  <span className="inline-flex items-center gap-1.5"><GraduationCap className="w-4 h-4" /> Certificado de participação</span>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-5 border border-white/15 w-full">
                <p className="text-xs uppercase tracking-widest text-blue-200 font-bold mb-3">Acoes</p>
                <button
                  onClick={() => shareLink(selectedCourse)}
                  className="w-full flex items-center justify-center gap-2 bg-white text-blue-900 font-bold rounded-lg py-2.5 text-sm hover:bg-blue-50 transition-colors"
                >
                  {copied ? <CheckCircle2 className="w-4 h-4 text-green-600" /> : <Share2 className="w-4 h-4" />}
                  {copied ? 'Link copiado' : 'Compartilhar curso'}
                </button>
                <a
                  href={`https://youtu.be/${selectedCourse.youtubeId}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 w-full flex items-center justify-center gap-2 bg-white/10 text-white font-bold rounded-lg py-2.5 text-sm hover:bg-white/20 transition-colors border border-white/15"
                >
                  Abrir no YouTube
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 md:px-8 -mt-6 pb-16">
          <div className="bg-black rounded-xl overflow-hidden shadow-2xl ring-1 ring-slate-200">
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${selectedCourse.youtubeId}?rel=0&modestbranding=1`}
                title={selectedCourse.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          <div className="grid lg:grid-cols-[1fr_320px] gap-8 mt-10">
            <div className="space-y-8">
              <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                <h2 className="text-lg font-black text-slate-900 mb-3 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-700" /> Sobre este curso
                </h2>
                <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">{selectedCourse.description}</p>
              </section>

              <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                <h2 className="text-lg font-black text-slate-900 mb-3 flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-700" /> Indicado para
                </h2>
                <ul className="text-sm text-slate-700 grid sm:grid-cols-2 gap-2">
                  {['Gestores e diretores hoteleiros', 'Profissionais de RH e DP', 'Liderancas operacionais', 'Equipes de governanca e recepcao'].map(item => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <aside className="space-y-4">
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                <h3 className="text-sm font-black text-slate-900 mb-3">Cursos relacionados</h3>
                {related.length === 0 ? (
                  <p className="text-xs text-slate-500">Sem cursos relacionados no momento.</p>
                ) : (
                  <ul className="space-y-3">
                    {related.map(c => (
                      <li key={c.id}>
                        <button onClick={() => openCourse(c)} className="w-full flex gap-3 text-left group">
                          <img src={c.thumbnailUrl} alt="" className="w-20 h-12 object-cover rounded-md shrink-0 ring-1 ring-slate-200" />
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-slate-900 leading-4 line-clamp-2 group-hover:text-blue-700">{c.title}</p>
                            <p className="text-[11px] text-slate-500 mt-1 inline-flex items-center gap-1"><Clock className="w-3 h-3" /> {c.duration}</p>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </aside>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 animate-fade-in">
      <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800 text-white">
        <div className="max-w-6xl mx-auto px-4 md:px-8 pt-6 pb-12">
          <button onClick={onBack} className="text-blue-200 hover:text-white inline-flex items-center gap-1 text-sm mb-8">
            <ArrowLeft className="w-4 h-4" /> Voltar ao Dashboard
          </button>

          <div className="grid lg:grid-cols-[1fr_360px] gap-8 items-start">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-300 mb-3">
                <Sparkles className="w-4 h-4" /> HoteisRio Academy
              </span>
              <h1 className="text-3xl md:text-5xl font-black leading-tight mb-4">
                Capacitacao continua para a hotelaria carioca.
              </h1>
              <p className="text-blue-100/90 text-sm md:text-base leading-relaxed max-w-2xl">
                Cursos, palestras e treinamentos com especialistas do setor.
                Aprenda no seu ritmo, com conteudos selecionados para gestores, RH, operacao e atendimento.
              </p>

              <div className="grid grid-cols-3 gap-3 mt-8 max-w-md">
                <div className="bg-white/10 backdrop-blur rounded-lg p-3 border border-white/15">
                  <p className="text-2xl font-black">{COURSES_DATA.length}</p>
                  <p className="text-xs text-blue-100 mt-1">Cursos</p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-3 border border-white/15">
                  <p className="text-2xl font-black">{categories.length - 1}</p>
                  <p className="text-xs text-blue-100 mt-1">Categorias</p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-3 border border-white/15">
                  <p className="text-2xl font-black">{totalDuration}</p>
                  <p className="text-xs text-blue-100 mt-1">de conteudo</p>
                </div>
              </div>
            </div>

            {featuredCourse && (
              <button
                onClick={() => openCourse(featuredCourse)}
                className="group relative w-full overflow-hidden rounded-xl text-left ring-1 ring-white/15 shadow-2xl"
              >
                <img src={featuredCourse.thumbnailUrl} alt={featuredCourse.title} className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950/95 via-blue-950/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-amber-300 mb-2">
                    <Award className="w-3 h-3" /> Destaque
                  </span>
                  <h3 className="text-base font-black leading-5 mb-2 line-clamp-2">{featuredCourse.title}</h3>
                  <div className="flex items-center gap-3 text-xs text-blue-100">
                    <span className="inline-flex items-center gap-1"><Clock className="w-3 h-3" /> {featuredCourse.duration}</span>
                    <span className="inline-flex items-center gap-1.5 text-white font-bold"><Play className="w-3 h-3 fill-white" /> Assistir</span>
                  </div>
                </div>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-black text-slate-900">Catalogo de cursos</h2>
            <p className="text-sm text-slate-500 mt-1">Explore por categoria ou busque por tema, instrutor ou palavra-chave.</p>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Buscar cursos..."
              className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-slate-200 bg-white text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors border ${
                activeCategory === cat
                  ? 'bg-blue-900 text-white border-blue-900'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {filteredCourses.length === 0 ? (
          <div className="bg-white border border-dashed border-slate-300 rounded-xl p-10 text-center text-slate-500 text-sm">
            Nenhum curso encontrado para a busca atual.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCourses.map(course => (
              <button
                key={course.id}
                onClick={() => openCourse(course)}
                className="group bg-white rounded-xl border border-slate-200 overflow-hidden text-left shadow-sm hover:shadow-lg hover:border-blue-300 transition-all flex flex-col"
              >
                <div className="aspect-video relative overflow-hidden bg-slate-100">
                  <img
                    src={course.thumbnailUrl}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-white">
                      <Play className="w-4 h-4 fill-white" /> Assistir curso
                    </span>
                  </div>
                  {course.isNew && (
                    <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">NOVO</span>
                  )}
                  <span className="absolute bottom-3 right-3 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-sm inline-flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {course.duration}
                  </span>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-blue-700 mb-2">{course.category}</span>
                  <h3 className="text-sm font-black text-slate-900 leading-5 line-clamp-2 mb-2">{course.title}</h3>
                  <p className="text-xs text-slate-500 leading-5 line-clamp-3 flex-1">{course.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-blue-700 group-hover:text-blue-900">
                    Ver curso <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;

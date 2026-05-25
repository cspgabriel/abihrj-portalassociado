
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Play, Info, Clock, CheckCircle2, X, Share2, Link as LinkIcon } from 'lucide-react';
import { COURSES_DATA } from '../constants';
import { Course } from '../types';

interface CoursesPageProps {
  onBack: () => void;
}

const CoursesPage: React.FC<CoursesPageProps> = ({ onBack }) => {
  // heroCourse tracks what is shown in the big background slider
  const [heroCourse, setHeroCourse] = useState<Course>(COURSES_DATA[0]);
  
  // selectedCourse tracks which video is playing in the modal
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Initialize from URL params if present
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get('courseId');
    
    if (courseId) {
      const course = COURSES_DATA.find(c => c.id === courseId);
      if (course) {
        setHeroCourse(course);
        setSelectedCourse(course);
        setIsPlaying(true);
      }
    }
  }, []);

  const updateUrl = (courseId: string | null) => {
    const url = new URL(window.location.href);
    if (courseId) {
      url.searchParams.set('view', 'courses-v2');
      url.searchParams.set('courseId', courseId);
    } else {
      url.searchParams.delete('courseId');
      // Keep view=courses-v2 so we don't drop back to dashboard when closing modal
    }
    window.history.pushState({}, '', url);
  };

  const handlePlay = (course: Course) => {
    setSelectedCourse(course);
    setIsPlaying(true);
    updateUrl(course.id);
  };

  const closeModal = () => {
    setIsPlaying(false);
    setSelectedCourse(null);
    updateUrl(null);
  };

  const handleMouseEnter = (course: Course) => {
    setHeroCourse(course);
  };

  const copyLink = (e: React.MouseEvent, course: Course) => {
    e.stopPropagation();
    const url = new URL(window.location.href);
    url.searchParams.set('view', 'courses-v2');
    url.searchParams.set('courseId', course.id);
    navigator.clipboard.writeText(url.toString());
    
    setCopiedId(course.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-[#020617] min-h-screen text-white font-sans animate-fade-in relative overflow-x-hidden">
      
      {/* Navbar Overlay - High Z-Index to stay on top */}
      <div className="absolute top-0 left-0 w-full z-50 p-6 flex justify-between items-center bg-gradient-to-b from-[#020617]/90 via-[#020617]/60 to-transparent pointer-events-none">
         <div className="pointer-events-auto">
            <button onClick={onBack} className="flex items-center gap-2 text-blue-200 hover:text-white transition-colors bg-slate-900/40 hover:bg-slate-900/60 px-4 py-2 rounded-full backdrop-blur-md border border-white/10">
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Voltar ao Dashboard</span>
            </button>
         </div>
         <div className="flex items-center gap-3 pointer-events-auto">
            <span className="text-rio-blue font-bold tracking-wider uppercase text-[10px] border border-rio-blue px-2 py-0.5 rounded bg-rio-blue/10 backdrop-blur-sm">BETA</span>
            <div className="flex flex-col items-end leading-none">
                <span className="font-bold text-lg tracking-tight">ABIH-RJ</span>
                <span className="text-rio-gold text-xs font-bold tracking-widest uppercase">Academy</span>
            </div>
         </div>
      </div>

      {/* Dynamic Hero Section */}
      <div className="relative h-[80vh] md:h-[90vh] w-full overflow-hidden">
         {/* Background Image with Transition */}
         <div 
            className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out transform scale-105" 
            style={{ 
                backgroundImage: `url(${heroCourse.thumbnailUrl.replace('maxresdefault', 'maxresdefault')})`,
            }}
         >
            {/* Blue-tinted Overlay for Brand Consistency */}
            <div className="absolute inset-0 bg-blue-950/30 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-black/20"></div>
         </div>
         
         {/* Gradients for smooth blending to the blue background */}
         <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent z-10"></div>
         <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-[#020617]/80 to-transparent z-10 sm:w-3/4"></div>

         {/* Content - Adjusted padding to push text higher up */}
         <div className="absolute bottom-0 left-0 w-full p-6 md:p-16 z-30 flex flex-col justify-end h-full pb-48 md:pb-60 pointer-events-none">
             <div className="max-w-3xl pointer-events-auto">
                 <div className="flex items-center gap-3 mb-4 animate-fade-in-up">
                    {heroCourse.isNew && (
                        <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm tracking-wider">NOVO LANÇAMENTO</span>
                    )}
                    <span className="text-blue-200 text-xs font-bold uppercase tracking-widest flex items-center gap-2 border-l-2 border-rio-gold pl-3">
                        {heroCourse.category}
                    </span>
                 </div>
                 
                 <h1 className="text-3xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight text-white drop-shadow-2xl animate-fade-in-up delay-100">
                    {heroCourse.title}
                 </h1>
                 
                 <div className="flex items-center gap-4 mb-6 text-sm font-medium text-gray-300 animate-fade-in-up delay-200">
                    <span className="flex items-center gap-1 text-green-400 font-bold">98% Relevante</span>
                    <span className="text-gray-400">2025</span>
                    <span className="border border-gray-500 px-1.5 py-0.5 rounded text-[10px] text-gray-400">HD</span>
                    <span className="flex items-center gap-1 text-white"><Clock className="w-3 h-3" /> {heroCourse.duration}</span>
                 </div>

                 <p className="text-blue-100/80 text-sm md:text-base lg:text-lg mb-8 line-clamp-3 leading-relaxed drop-shadow-lg animate-fade-in-up delay-300 hidden md:block max-w-2xl">
                    {heroCourse.description}
                 </p>
                 
                 <div className="flex flex-wrap gap-4 animate-fade-in-up delay-500">
                    <button 
                      onClick={() => handlePlay(heroCourse)}
                      className="bg-white text-rio-blue px-8 py-3 rounded-md font-bold flex items-center gap-3 hover:bg-white/90 transition-all transform hover:scale-105 shadow-xl shadow-blue-900/20"
                    >
                       <Play className="w-6 h-6 fill-rio-blue" />
                       Assistir Agora
                    </button>
                    <button 
                        onClick={(e) => copyLink(e, heroCourse)}
                        className="bg-slate-800/50 text-white px-6 py-3 rounded-md font-bold flex items-center gap-2 hover:bg-slate-800/70 transition-colors backdrop-blur-sm border border-white/10"
                    >
                       {copiedId === heroCourse.id ? <CheckCircle2 className="w-5 h-5 text-green-400" /> : <Share2 className="w-5 h-5" />}
                       {copiedId === heroCourse.id ? 'Copiado' : 'Compartilhar'}
                    </button>
                 </div>
             </div>
         </div>
      </div>

      {/* Content Rows - Adjusted negative margin */}
      <div className="px-6 md:px-16 pb-20 -mt-32 md:-mt-48 relative z-40 space-y-12">
         
         {/* Row 1: Catalog */}
         <div>
            <h2 className="text-lg md:text-xl font-bold mb-4 flex items-center gap-2 text-white drop-shadow-md">
               Catálogo de Treinamentos
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
               {COURSES_DATA.map(course => (
                  <div 
                     key={course.id} 
                     className={`group relative bg-slate-900 rounded-md overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:z-50 hover:shadow-2xl hover:ring-2 hover:ring-rio-blue/50
                        ${heroCourse.id === course.id ? 'ring-2 ring-rio-gold/70 bg-slate-800' : ''}
                     `}
                     onMouseEnter={() => handleMouseEnter(course)}
                     onClick={() => handlePlay(course)}
                  >
                     {/* Thumbnail */}
                     <div className="aspect-video w-full overflow-hidden relative">
                        <img 
                           src={course.thumbnailUrl} 
                           alt={course.title} 
                           className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                        />
                        
                        {/* Play Icon Overlay */}
                        <div className="absolute inset-0 bg-blue-900/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/50 pl-1 shadow-lg">
                                <Play className="w-5 h-5 text-white fill-white" />
                            </div>
                        </div>

                        {/* Duration Badge */}
                        <div className="absolute bottom-2 right-2 bg-black/70 px-1.5 py-0.5 rounded text-[10px] font-bold text-gray-200 flex items-center gap-1 backdrop-blur-sm border border-white/10">
                           {course.duration}
                        </div>
                        
                        {/* New Badge */}
                        {course.isNew && (
                           <div className="absolute top-2 left-2 bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-sm shadow-sm">
                              NOVO
                           </div>
                        )}
                     </div>

                     {/* Meta Info */}
                     <div className="p-4">
                        <h3 className={`font-bold text-sm mb-1 transition-colors line-clamp-1 ${heroCourse.id === course.id ? 'text-rio-gold' : 'text-white group-hover:text-rio-blue'}`}>
                            {course.title}
                        </h3>
                        
                        <div className="flex justify-between items-center mt-2">
                            <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">{course.category}</p>
                            
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="p-1 hover:bg-white/20 rounded-full transition-colors" title="Mais info">
                                    <Info className="w-4 h-4 text-white" />
                                </button>
                            </div>
                        </div>
                        
                        <p className="text-[11px] text-gray-500 mt-2 line-clamp-2 leading-tight opacity-0 group-hover:opacity-100 transition-opacity h-0 group-hover:h-auto">
                            {course.description}
                        </p>
                     </div>
                  </div>
               ))}
            </div>
         </div>

      </div>

      {/* Video Player Modal */}
      {isPlaying && selectedCourse && (
         <div className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4 animate-fade-in backdrop-blur-sm">
             <div 
               className="absolute inset-0"
               onClick={closeModal}
             ></div>
             <button 
               onClick={closeModal}
               className="absolute top-6 right-6 text-gray-400 hover:text-white p-2 z-50 bg-black/50 rounded-full transition-colors"
             >
                <X className="w-8 h-8" />
             </button>

             <div className="w-full max-w-6xl flex flex-col max-h-[95vh] shadow-2xl rounded-xl overflow-hidden bg-slate-900 relative z-10 border border-slate-800">
                 <div className="aspect-video bg-black relative w-full border-b border-gray-800">
                    <iframe 
                    width="100%" 
                    height="100%" 
                    src={`https://www.youtube.com/embed/${selectedCourse.youtubeId}?autoplay=1&rel=0&modestbranding=1`} 
                    title={selectedCourse.title}
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                    ></iframe>
                 </div>
                 
                 <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 justify-between items-start">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <h2 className="text-2xl font-bold text-white">{selectedCourse.title}</h2>
                            <span className="bg-blue-800 text-white text-[10px] px-2 py-0.5 rounded font-bold uppercase border border-blue-700">{selectedCourse.category}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                            <span className="text-green-500 font-bold">98% Relevante</span>
                            <span>2025</span>
                            <span>{selectedCourse.duration}</span>
                        </div>
                        <p className="text-blue-100/80 text-sm leading-relaxed max-w-3xl">{selectedCourse.description}</p>
                    </div>
                    
                    <button 
                        onClick={(e) => copyLink(e, selectedCourse)}
                        className="shrink-0 flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-5 py-3 rounded-md text-sm font-bold transition-colors"
                    >
                        {copiedId === selectedCourse.id ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <Share2 className="w-4 h-4" />}
                        {copiedId === selectedCourse.id ? 'Link Copiado' : 'Compartilhar'}
                    </button>
                 </div>
             </div>
         </div>
      )}

    </div>
  );
};

export default CoursesPage;

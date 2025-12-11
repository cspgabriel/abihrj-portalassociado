
import React, { useState } from 'react';
import { ArrowLeft, Play, Info, Clock, CheckCircle2, X } from 'lucide-react';
import { COURSES_DATA } from '../constants';
import { Course } from '../types';

interface CoursesPageProps {
  onBack: () => void;
}

const CoursesPage: React.FC<CoursesPageProps> = ({ onBack }) => {
  const [featuredCourse] = useState<Course>(COURSES_DATA[0]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Group by category if we had more videos, for now just one row
  const allCourses = COURSES_DATA;

  const handlePlay = (course: Course) => {
    setSelectedCourse(course);
    setIsPlaying(true);
  };

  const closeModal = () => {
    setIsPlaying(false);
    setSelectedCourse(null);
  };

  return (
    <div className="bg-slate-900 min-h-screen text-white font-sans animate-fade-in relative overflow-x-hidden">
      
      {/* Navbar Overlay */}
      <div className="absolute top-0 left-0 w-full z-20 p-6 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent">
         <button onClick={onBack} className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Voltar para o Dashboard
         </button>
         <div className="flex items-center gap-2">
            <span className="text-rio-blue font-bold tracking-wider uppercase text-sm border border-rio-blue px-2 py-0.5 rounded">BETA</span>
            <span className="font-bold text-lg">Cursos<span className="text-rio-gold">Play</span></span>
         </div>
      </div>

      {/* Hero Section */}
      <div className="relative h-[80vh] w-full overflow-hidden">
         <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] hover:scale-105" 
              style={{ backgroundImage: `url(${featuredCourse.thumbnailUrl.replace('maxresdefault', 'maxresdefault')})` }}>
         </div>
         <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
         <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent"></div>

         <div className="absolute bottom-0 left-0 p-8 md:p-16 max-w-3xl z-10 flex flex-col justify-end h-full pb-24">
             <span className="text-rio-gold font-bold tracking-widest uppercase mb-2 text-sm flex items-center gap-2">
                <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
                Destaque da Semana
             </span>
             <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight shadow-lg">{featuredCourse.title}</h1>
             <p className="text-gray-300 text-lg mb-6 line-clamp-3 md:line-clamp-none max-w-2xl">
                {featuredCourse.description}
             </p>
             <div className="flex gap-4">
                <button 
                  onClick={() => handlePlay(featuredCourse)}
                  className="bg-white text-black px-8 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-gray-200 transition-colors"
                >
                   <Play className="w-5 h-5 fill-black" />
                   Assistir Agora
                </button>
                <button className="bg-gray-600/60 text-white px-8 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-gray-600/80 transition-colors backdrop-blur-sm">
                   <Info className="w-5 h-5" />
                   Mais Informações
                </button>
             </div>
         </div>
      </div>

      {/* Content Rows */}
      <div className="px-8 md:px-16 pb-20 -mt-20 relative z-10 space-y-12">
         
         {/* Row 1: All Courses */}
         <div>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
               Novos Lançamentos
               <span className="text-xs bg-rio-blue text-white px-2 py-0.5 rounded ml-2">4 cursos</span>
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
               {allCourses.map(course => (
                  <div 
                     key={course.id} 
                     className="group relative bg-slate-800 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:z-10 shadow-lg"
                     onClick={() => handlePlay(course)}
                  >
                     {/* Thumbnail */}
                     <div className="aspect-video w-full overflow-hidden relative">
                        <img 
                           src={course.thumbnailUrl} 
                           alt={course.title} 
                           className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <div className="w-12 h-12 rounded-full bg-rio-blue/90 flex items-center justify-center pl-1 shadow-xl transform scale-75 group-hover:scale-100 transition-transform">
                                <Play className="w-6 h-6 fill-white text-white" />
                            </div>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-xs font-bold text-gray-300 flex items-center gap-1">
                           <Clock className="w-3 h-3" /> {course.duration}
                        </div>
                        {course.isNew && (
                           <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                              NOVO
                           </div>
                        )}
                     </div>

                     {/* Meta Info */}
                     <div className="p-4">
                        <h3 className="font-bold text-sm mb-1 text-white group-hover:text-rio-gold transition-colors line-clamp-1">{course.title}</h3>
                        <p className="text-xs text-gray-400 mb-3">{course.category}</p>
                        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
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
         <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
             <button 
               onClick={closeModal}
               className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 z-50"
             >
                <X className="w-8 h-8" />
             </button>

             <div className="w-full max-w-5xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl relative">
                <iframe 
                   width="100%" 
                   height="100%" 
                   src={`https://www.youtube.com/embed/${selectedCourse.youtubeId}?autoplay=1`} 
                   title={selectedCourse.title}
                   frameBorder="0" 
                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                   allowFullScreen
                ></iframe>
             </div>
             
             <div className="absolute bottom-10 left-10 text-white max-w-xl pointer-events-none">
                <h2 className="text-2xl font-bold mb-2 shadow-black drop-shadow-md">{selectedCourse.title}</h2>
                <p className="text-gray-300 drop-shadow-md">{selectedCourse.description}</p>
             </div>
         </div>
      )}

    </div>
  );
};

export default CoursesPage;

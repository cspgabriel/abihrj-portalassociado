
import React, { useState, useEffect } from 'react';
import { Benefit } from '../types';
import { BENEFITS_DATA } from '../constants';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import * as Icons from 'lucide-react';

interface HighlightsSliderProps {
  onUseBenefit: (benefit: Benefit) => void;
}

const HighlightsSlider: React.FC<HighlightsSliderProps> = ({ onUseBenefit }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  const highlightIds = [
      'calendar-2026',
      'highlight-top-hotel-25',
      'natal-2025', 
      'highlight-drinks', 
      'highlight-rir', 
      'highlight-job-fair', 
      'highlight-events-reg',
      'portal-fornecedores-new',
      'leis-decretos-app'
  ];
  
  const highlightSlides = highlightIds
    .map(id => BENEFITS_DATA.find(b => b.id === id))
    .filter(Boolean) as Benefit[];

  // Responsive items per page
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };

    handleResize(); // Init
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-play
  useEffect(() => {
    if (highlightSlides.length <= itemsPerPage) return;
    const interval = setInterval(() => {
        nextSlide();
    }, 6000); 
    return () => clearInterval(interval);
  }, [currentIndex, itemsPerPage, highlightSlides.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % highlightSlides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + highlightSlides.length) % highlightSlides.length);
  };

  const getSlideGradient = (id: string) => {
      switch (id) {
          case 'calendar-2026': return 'from-indigo-600 to-purple-800';
          case 'highlight-top-hotel-25': return 'from-yellow-500 to-amber-600';
          case 'natal-2025': return 'from-red-700 to-red-900';
          case 'highlight-drinks': return 'from-blue-700 to-slate-800';
          case 'highlight-rir': return 'from-purple-900 to-black';
          case 'highlight-job-fair': return 'from-green-700 to-teal-900';
          case 'portal-fornecedores-new': return 'from-orange-600 to-amber-700';
          case 'leis-decretos-app': return 'from-slate-700 to-slate-900';
          default: return 'from-gray-700 to-gray-900';
      }
  };

  if (highlightSlides.length === 0) return null;

  // Calculate visible slides (Circular logic)
  const visibleSlides = [];
  for (let i = 0; i < itemsPerPage; i++) {
    const index = (currentIndex + i) % highlightSlides.length;
    visibleSlides.push(highlightSlides[index]);
  }

  return (
      <div className="relative group">
         
         <div className={`grid gap-4 ${itemsPerPage === 1 ? 'grid-cols-1' : itemsPerPage === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
             {visibleSlides.map((slide, idx) => {
                 const IconComponent = (Icons as any)[slide.iconName] || Icons.HelpCircle;
                 const gradientClass = getSlideGradient(slide.id);

                 return (
                    <div 
                        key={`${slide.id}-${idx}`}
                        className={`
                            relative overflow-hidden rounded-2xl p-6 h-64 cursor-pointer transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl
                            bg-gradient-to-br ${gradientClass} text-white flex flex-col justify-between
                        `}
                        onClick={() => onUseBenefit(slide)}
                    >
                       {/* Background decoration */}
                       <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 pointer-events-none" />
                       
                       <div>
                           <div className="flex items-start justify-between mb-4 relative z-10">
                                <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                                    <IconComponent className="w-6 h-6 text-white" />
                                </div>
                                {slide.isNew && (
                                    <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm">
                                        Novo
                                    </span>
                                )}
                           </div>

                           <h3 className="text-xl font-bold mb-2 leading-tight line-clamp-2 relative z-10">
                               {slide.title}
                           </h3>
                           <p className="text-sm text-white/80 line-clamp-2 relative z-10">
                               {slide.description}
                           </p>
                       </div>

                       <div className="mt-4 flex items-center text-sm font-bold gap-2 group/btn relative z-10">
                           {slide.customCta || "Acessar"}
                           <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                       </div>
                    </div>
                 )
             })}
         </div>
         
         {/* Navigation Arrows (Outside) */}
         <button 
            onClick={(e) => { e.stopPropagation(); prevSlide(); }} 
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm -translate-x-full group-hover:translate-x-0"
         >
            <ChevronLeft className="w-6 h-6" />
         </button>
         <button 
            onClick={(e) => { e.stopPropagation(); nextSlide(); }} 
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm translate-x-full group-hover:translate-x-0"
         >
            <ChevronRight className="w-6 h-6" />
         </button>

         {/* Dots Indicator */}
         <div className="flex justify-center gap-1.5 mt-6">
            {highlightSlides.map((_, idx) => (
                <button 
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? 'bg-rio-blue w-6' : 'bg-gray-300 hover:bg-gray-400'}`}
                />
            ))}
         </div>
      </div>
  );
};

export default HighlightsSlider;

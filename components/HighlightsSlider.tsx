
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
      'highlight-top-hotel-25',
      'rio-international-press',
      'influencers-hub',
      'highlight-rir',
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
          case 'calendar-2026': return 'from-blue-950/95 via-blue-900/75 to-blue-700/35';
          case 'highlight-top-hotel-25': return 'from-slate-950/95 via-slate-900/75 to-amber-700/30';
          case 'rio-international-press': return 'from-slate-950/95 via-blue-950/75 to-cyan-700/30';
          case 'influencers-hub': return 'from-slate-950/95 via-slate-900/70 to-pink-700/30';
          case 'highlight-rir': return 'from-slate-950/95 via-purple-950/70 to-blue-700/25';
          case 'highlight-job-fair': return 'from-slate-950/95 via-emerald-900/70 to-teal-700/30';
          case 'portal-fornecedores-new': return 'from-slate-950/95 via-slate-900/75 to-orange-700/35';
          case 'leis-decretos-app': return 'from-slate-950/95 via-slate-900/80 to-slate-600/35';
          default: return 'from-slate-950/95 via-slate-900/75 to-blue-700/25';
      }
  };

  const getSlideImage = (id: string, imageUrl?: string) => {
      if (imageUrl) return imageUrl;

      switch (id) {
          case 'calendar-2026':
            return 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=900&q=85';
          case 'highlight-top-hotel-25':
            return 'https://images.unsplash.com/photo-1567427018141-0584cfcbf1b8?auto=format&fit=crop&w=900&q=85';
          case 'rio-international-press':
            return 'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=900&q=85';
          case 'influencers-hub':
            return 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=85';
          case 'highlight-rir':
            return 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=85';
          case 'portal-fornecedores-new':
            return 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=85';
          default:
            return 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=900&q=85';
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
                            relative overflow-hidden rounded-2xl h-56 cursor-pointer transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl
                            bg-slate-950 text-white flex flex-col justify-between
                        `}
                        onClick={() => onUseBenefit(slide)}
                    >
                       <img
                          src={getSlideImage(slide.id, slide.imageUrl)}
                          alt=""
                          className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                       />
                       <div className={`absolute inset-0 bg-gradient-to-r ${gradientClass}`} />
                       <div className="absolute inset-y-0 right-0 w-1/3 border-l border-amber-300/30 opacity-70">
                         <div className="absolute right-8 top-8 h-24 w-24 rounded-full border border-amber-300/50" />
                       </div>
                       
                       <div className="relative z-10 p-5">
                           <div className="flex items-start justify-between mb-4 relative z-10">
                                <div className="bg-white/15 p-3 rounded-xl backdrop-blur-md ring-1 ring-white/20">
                                    <IconComponent className="w-5 h-5 text-white" />
                                </div>
                                {slide.isNew && (
                                    <span className="bg-white/15 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm ring-1 ring-white/20">
                                        Novo
                                    </span>
                                )}
                           </div>

                           <h3 className="text-xl font-black mb-2 leading-tight line-clamp-2 relative z-10">
                               {slide.title}
                           </h3>
                           <p className="text-sm text-white/80 line-clamp-2 relative z-10">
                               {slide.description}
                           </p>
                       </div>

                       <div className="relative z-10 m-5 mt-0 flex items-center text-sm font-black gap-2 group/btn">
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

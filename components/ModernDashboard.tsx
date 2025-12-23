
// Autor: Gabriel Salles
// Suporte do SO: Windows11
// Descrição: Painel de controle moderno com feed de eventos e benefícios

import React, { useState, useEffect } from 'react';
import { User, Benefit, BenefitCategory } from '../types';
import { BENEFITS_DATA, SUPER_CATEGORIES, CALCULATOR_TOOLS, RIO_EVENTS } from '../constants';
import BenefitCard from './BenefitCard';
import { 
  Search, LayoutGrid, Zap, ArrowRight, Star, 
  List, Grid, ArrowDownAZ, ArrowUpAZ, ChevronLeft, ChevronRight, Filter,
  Building2, Calculator, Calendar
} from 'lucide-react';
import * as Icons from 'lucide-react';

interface ModernDashboardProps {
  user: User;
  onUseBenefit: (benefit: Benefit) => void;
  onViewDetails: (benefit: Benefit) => void;
}

const ModernDashboard: React.FC<ModernDashboardProps> = ({ user, onUseBenefit, onViewDetails }) => {
  const [highlightIndex, setHighlightIndex] = useState(0);

  // --- DATA PREPARATION ---
  const highlightIds = [
      'calendar-2026',
      'highlight-top-hotel-25',
      'natal-2025', 
      'highlight-drinks', 
      'highlight-rir', 
      'highlight-job-fair', 
      'highlight-events-reg',
      'portal-fornecedores-new'
  ];
  
  const highlights = highlightIds
    .map(id => BENEFITS_DATA.find(b => b.id === id))
    .filter(Boolean) as Benefit[];

  const mainBenefitIds = [
      'comercial-planner-2026',
      'highlight-rir',
      'calendar-2-0',
      'courses-v2',
      'public-order-01',
      'portal-fornecedores-new',
      'whatsapp-groups',
      'planejador-feriados-2026',
      'shuttle-service'
  ];

  const mainBenefits = mainBenefitIds
    .map(id => BENEFITS_DATA.find(b => b.id === id))
    .filter(Boolean) as Benefit[];

  // --- SLIDER LOGIC ---
  const itemsPerSlide = 1; 
  const maxIndex = Math.max(0, highlights.length - itemsPerSlide);

  const nextSlide = () => {
    setHighlightIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setHighlightIndex(prev => (prev === 0 ? maxIndex : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
        nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [highlightIndex, maxIndex]); 

  const visibleHighlights = highlights.slice(highlightIndex, highlightIndex + itemsPerSlide);
  const displayHighlights = visibleHighlights.length < itemsPerSlide 
    ? [...visibleHighlights, ...highlights.slice(0, itemsPerSlide - visibleHighlights.length)]
    : visibleHighlights;

  const getBannerStyle = (id: string) => {
      switch (id) {
          case 'calendar-2026': return 'from-indigo-600 to-purple-800';
          case 'highlight-top-hotel-25': return 'from-yellow-500 to-amber-600';
          case 'natal-2025': return 'from-red-700 to-red-900';
          case 'highlight-drinks': return 'from-blue-700 to-slate-800';
          case 'highlight-rir': return 'from-purple-900 to-black';
          case 'highlight-job-fair': return 'from-green-700 to-teal-900';
          case 'portal-fornecedores-new': return 'from-orange-600 to-amber-700';
          default: return 'from-blue-600 to-blue-800';
      }
  };

  return (
    <div className="animate-fade-in pb-20 md:pb-12">
      <div className="bg-white rounded-2xl p-8 mb-8 shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Olá, {user.name}</h1>
          <p className="text-gray-500">Bem-vindo à sua Central do Associado. O que você precisa hoje?</p>
        </div>
        <div className="hidden md:block">
            <div className="bg-blue-50/50 border border-blue-100 p-2 pr-4 rounded-xl flex items-center gap-3">
                <div className="bg-white p-2 rounded-lg shadow-sm text-rio-blue">
                    <Building2 className="w-5 h-5" />
                </div>
                <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider leading-tight">Hotel Associado</p>
                    <p className="text-gray-800 font-bold text-sm leading-tight">{user.hotel}</p>
                </div>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-10">
              
              {/* Highlights Slider */}
              <section>
                 <div className="flex justify-between items-end mb-4">
                    <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 uppercase tracking-wide text-xs">
                        <Star className="w-4 h-4 text-rio-gold fill-rio-gold" />
                        Novidades & Destaques
                    </h2>
                    <div className="flex gap-2">
                        <button onClick={prevSlide} className="p-2 rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition-colors text-gray-600 shadow-sm"><ChevronLeft className="w-4 h-4" /></button>
                        <button onClick={nextSlide} className="p-2 rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition-colors text-gray-600 shadow-sm"><ChevronRight className="w-4 h-4" /></button>
                    </div>
                 </div>
                 
                 <div className="grid grid-cols-1 gap-6">
                    {displayHighlights.map((benefit, idx) => {
                       const IconComponent = (Icons as any)[benefit.iconName] || Icons.HelpCircle;
                       const gradient = getBannerStyle(benefit.id);
                       
                       return (
                         <div 
                           key={`${benefit.id}-${idx}`}
                           onClick={() => onUseBenefit(benefit)}
                           className={`
                             relative overflow-hidden rounded-2xl p-6 md:p-8 
                             min-h-[220px] h-auto aspect-[16/9] md:h-80 md:aspect-auto
                             flex flex-col justify-between
                             bg-gradient-to-br ${gradient} text-white shadow-lg cursor-pointer
                             transform transition-all duration-300 hover:scale-[1.01] hover:shadow-xl group
                           `}
                         >
                            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-32 -mt-32 pointer-events-none group-hover:scale-125 transition-transform duration-500" />
                            <div className="relative z-10 flex flex-col h-full justify-center">
                               <div className="bg-white/20 p-2 md:p-3 rounded-xl w-fit backdrop-blur-sm mb-3 md:mb-4 shadow-sm">
                                  <IconComponent className="w-8 h-8 md:w-12 md:h-12 text-white" />
                               </div>
                               <div className="inline-block bg-white/20 backdrop-blur-md text-[10px] md:text-xs font-bold px-2 md:px-3 py-1 rounded mb-2 md:mb-3 uppercase tracking-wide w-fit">Destaque</div>
                               <h3 className="text-xl md:text-3xl font-bold leading-tight mb-2 md:mb-4 max-w-3xl">{benefit.title}</h3>
                               <p className="text-sm md:text-lg text-white/90 leading-relaxed max-w-2xl line-clamp-2">{benefit.description}</p>
                            </div>
                            <div className="absolute bottom-6 md:bottom-8 right-6 md:right-8 z-10 hidden sm:flex items-center text-xs md:text-sm font-bold opacity-90 group-hover:opacity-100 group-hover:translate-x-1 transition-all bg-white/20 hover:bg-white/30 px-4 py-2 md:px-6 md:py-3 rounded-xl backdrop-blur-sm">
                               {benefit.customCta || "Acessar Agora"} <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
                            </div>
                         </div>
                       );
                    })}
                 </div>
              </section>

              {/* Main Benefits */}
              <section>
                 <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2 uppercase tracking-wide text-xs">
                    <Zap className="w-4 h-4 text-rio-blue" />
                    Principais Benefícios
                 </h2>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {mainBenefits.map(benefit => (
                        <BenefitCard key={benefit.id} benefit={benefit} onUse={onUseBenefit} onDetails={onViewDetails} layout="grid" />
                    ))}
                 </div>
              </section>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-8">
             
             {/* Upcoming Events Mini Feed */}
             <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                   <Calendar className="w-5 h-5 text-rio-blue" />
                   Próximos Eventos
                </h3>
                <div className="space-y-4">
                   {RIO_EVENTS.slice(0, 3).map(ev => {
                      // Lógica de segurança para parsing de data
                      let day = '01';
                      let month = 'JAN';
                      
                      if (ev.date && ev.date.includes('-')) {
                          const parts = ev.date.split('-');
                          if (parts.length >= 2) {
                              day = parts[0];
                              const monthIdx = parseInt(parts[1]) - 1;
                              const months = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
                              if (monthIdx >= 0 && monthIdx < 12) month = months[monthIdx];
                          }
                      } else if (ev.date && ev.date.includes(' ')) {
                          const parts = ev.date.split(' ');
                          if (parts.length > 0) day = parts[0];
                          if (parts.length > 2) {
                              month = parts[2].substring(0, 3).toUpperCase();
                          } else if (parts.length > 1) {
                              month = parts[1].substring(0, 3).toUpperCase();
                          }
                      }

                      return (
                      <div key={ev.id} className="flex gap-3 items-center group cursor-pointer hover:bg-gray-50 p-2 rounded-xl transition">
                         <div className="bg-gray-100 text-gray-600 font-bold rounded-xl w-12 h-12 flex flex-col items-center justify-center shrink-0 group-hover:bg-rio-blue group-hover:text-white transition">
                            <span className="text-xs">{month}</span>
                            <span className="text-lg leading-none">{day}</span>
                         </div>
                         <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-gray-800 text-sm truncate">{ev.title}</h4>
                            <p className="text-xs text-gray-500 truncate">{ev.location}</p>
                         </div>
                      </div>
                   )})}
                </div>
             </div>

             {/* Categories */}
             <section>
                <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2 uppercase tracking-wide text-xs">
                  <LayoutGrid className="w-4 h-4 text-rio-blue" />
                  Navegar
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  {SUPER_CATEGORIES.map(cat => {
                    const IconComponent = (Icons as any)[cat.iconName] || Icons.LayoutGrid;
                    return (
                      <div 
                        key={cat.id}
                        onClick={() => {
                            // Example nav logic - in a real app this would navigate to category page
                            onUseBenefit(BENEFITS_DATA.find(b => b.category === cat.categories[0]) || BENEFITS_DATA[0]);
                        }}
                        className={`relative overflow-hidden rounded-2xl p-4 cursor-pointer transition-all duration-300 group hover:-translate-y-1 hover:shadow-xl bg-gradient-to-br ${cat.gradient} text-white shadow-lg`}
                      >
                        <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-150" />
                        <div className="flex items-center gap-4 relative z-10">
                            <IconComponent className="w-8 h-8 text-white/90" strokeWidth={1.5} />
                            <div>
                                <h3 className="font-bold">{cat.title}</h3>
                                <p className="text-xs text-white/70 line-clamp-1">{cat.description}</p>
                            </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
             </section>

             {/* Calculators */}
             <section className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm">
                 <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-4">
                     <Calculator className="w-5 h-5 text-green-600" />
                     Calculadoras
                 </h2>
                 <div className="grid grid-cols-1 gap-3">
                    {CALCULATOR_TOOLS.slice(0, 2).map(calc => (
                        <div key={calc.id} onClick={() => onUseBenefit(calc)} className="p-3 rounded-xl border border-gray-100 hover:border-green-200 hover:bg-green-50 cursor-pointer flex items-center gap-3 transition-colors">
                            <div className="bg-green-100 text-green-600 p-2 rounded-lg">
                                <Calculator className="w-4 h-4" />
                            </div>
                            <span className="text-sm font-bold text-gray-700">{calc.title}</span>
                        </div>
                    ))}
                 </div>
             </section>
          </div>
      </div>
    </div>
  );
};

export default ModernDashboard;
// --- Fim de ModernDashboard.tsx ---

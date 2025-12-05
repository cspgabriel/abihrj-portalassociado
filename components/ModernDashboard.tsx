
import React, { useState, useEffect } from 'react';
import { User, Benefit, BenefitCategory } from '../types';
import { BENEFITS_DATA, RIO_EVENTS, COMMUNITY_ITEMS_DATA } from '../constants';
import BenefitCard from './BenefitCard';
import WeatherWidget from './WeatherWidget';
import GamificationWidget from './GamificationWidget';
import { Sparkles, Calendar, ArrowRight, Zap, Target, LayoutGrid, Users, List, Grid, ChevronLeft, ChevronRight, ArrowDownAZ, ArrowUpAZ, Wrench, Calculator } from 'lucide-react';
import * as Icons from 'lucide-react';

interface ModernDashboardProps {
  user: User;
  onUseBenefit: (benefit: Benefit) => void;
  onViewDetails: (benefit: Benefit) => void;
}

type TabType = 'HOME' | 'SERVICES' | 'BENEFITS' | 'COMMUNITY';

const ModernDashboard: React.FC<ModernDashboardProps> = ({ user, onUseBenefit, onViewDetails }) => {
  const [activeTab, setActiveTab] = useState<TabType>('HOME');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [sortOrder, setSortOrder] = useState<'az' | 'za'>('az'); // New State for Sorting
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // --- FILTERS ---
  const services = BENEFITS_DATA.filter(b => b.isService);
  const benefitsCatalog = BENEFITS_DATA.filter(b => !b.isService); // Only non-direct services

  const filteredServices = services.filter(b => selectedCategory === 'Todos' || b.category === selectedCategory);
  const filteredBenefits = benefitsCatalog.filter(b => selectedCategory === 'Todos' || b.category === selectedCategory);

  const categories = ['Todos', ...Object.values(BenefitCategory)];

  // --- SORTING HELPER ---
  const sortData = (data: Benefit[]) => {
    return [...data].sort((a, b) => {
        if (sortOrder === 'az') return a.title.localeCompare(b.title);
        return b.title.localeCompare(a.title);
    });
  };

  const sortedServices = sortData(filteredServices);
  const sortedBenefits = sortData(filteredBenefits);
  
  // Specific list for Tools
  const toolsBenefits = BENEFITS_DATA.filter(b => b.category === BenefitCategory.TOOLS && !b.id.startsWith('calc-'));
  const calculatorBenefits = BENEFITS_DATA.filter(b => b.category === BenefitCategory.TOOLS && b.id.startsWith('calc-'));

  // --- HOME DATA ---
  const suggestedActions = BENEFITS_DATA.filter(b => b.isNew || b.id === 'calendar-01').slice(0, 3);
  const quickTools = services.filter(b => !['highlight-top-hotel-25', 'natal-2025', 'highlight-drinks', 'highlight-rir', 'highlight-job-fair'].includes(b.id) && b.category !== BenefitCategory.TOOLS).slice(0, 6);

  // --- SLIDER LOGIC ---
  const highlightIds = [
      'highlight-top-hotel-25',
      'natal-2025', 
      'highlight-drinks', 
      'highlight-rir', 
      'highlight-job-fair', 
      'highlight-events-reg',
      'portal-fornecedores-new'
  ];
  
  const highlightSlides = highlightIds
    .map(id => BENEFITS_DATA.find(b => b.id === id))
    .filter(Boolean) as Benefit[];

  useEffect(() => {
    if (highlightSlides.length <= 1) return;
    const interval = setInterval(() => {
        setCurrentSlideIndex((prev) => (prev + 1) % highlightSlides.length);
    }, 5000); // 5 seconds rotation
    return () => clearInterval(interval);
  }, [highlightSlides.length]);

  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlideIndex((prev) => (prev + 1) % highlightSlides.length);
  };

  const prevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlideIndex((prev) => (prev - 1 + highlightSlides.length) % highlightSlides.length);
  };

  const getSlideGradient = (id: string) => {
      switch (id) {
          case 'highlight-top-hotel-25': return 'from-yellow-500 to-amber-600 border-yellow-600/50';
          case 'natal-2025': return 'from-red-700 to-red-900 border-red-800/50';
          case 'highlight-drinks': return 'from-blue-700 to-slate-800 border-blue-800/50';
          case 'highlight-rir': return 'from-purple-900 to-black border-purple-800/50';
          case 'highlight-job-fair': return 'from-green-700 to-teal-900 border-green-800/50';
          case 'portal-fornecedores-new': return 'from-orange-600 to-amber-700 border-orange-600/50';
          default: return 'from-gray-700 to-gray-900 border-gray-600/50';
      }
  };

  const getSlideAccentColor = (id: string) => {
      switch (id) {
          case 'highlight-top-hotel-25': return 'text-yellow-900 bg-white text-yellow-900';
          case 'natal-2025': return 'text-yellow-300 bg-yellow-400 text-red-900';
          case 'highlight-drinks': return 'text-cyan-300 bg-cyan-400 text-blue-900';
          case 'highlight-rir': return 'text-pink-400 bg-pink-500 text-white';
          case 'highlight-job-fair': return 'text-green-300 bg-green-400 text-green-900';
          case 'portal-fornecedores-new': return 'text-orange-900 bg-white text-orange-900';
          default: return 'text-white bg-gray-500 text-white';
      }
  };

  return (
    <div className="animate-fade-in pb-12">
       {/* Top Header - RIO BLUE IDENTITY */}
       <div className="bg-gradient-to-r from-rio-blue to-blue-900 text-white p-8 rounded-[2.5rem] mb-8 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white opacity-10 rounded-full blur-3xl -mr-20 -mt-40 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-rio-gold opacity-10 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
             {/* Welcome Area */}
             <div className="lg:col-span-2 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full w-fit mb-4 border border-white/5 backdrop-blur-sm">
                   <Sparkles className="w-4 h-4 text-rio-gold" />
                   <span className="text-xs font-bold uppercase tracking-wider">Painel Executivo</span>
                </div>
                <h1 className="text-4xl font-bold mb-3">Olá, {user.name.split(' ')[0]}</h1>
                <p className="text-blue-100 text-lg max-w-xl">
                   Bem-vindo à Central do Associado. Você tem <span className="text-rio-gold font-bold">3 novas oportunidades</span> de economia hoje.
                </p>
             </div>
             
             {/* Weather Widget Integrated */}
             <div className="lg:col-span-1">
                <WeatherWidget />
             </div>
          </div>
       </div>

       {/* Internal Tabs Navigation */}
       <div className="flex overflow-x-auto gap-3 mb-8 pb-2 scrollbar-hide px-1">
          <button 
            onClick={() => setActiveTab('HOME')}
            className={`px-6 py-3 rounded-full font-bold text-sm whitespace-nowrap transition-all ${activeTab === 'HOME' ? 'bg-rio-blue text-white shadow-lg ring-2 ring-blue-200 ring-offset-2' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-100 shadow-sm'}`}
          >
            Visão Geral
          </button>
          <button 
            onClick={() => setActiveTab('SERVICES')}
            className={`px-6 py-3 rounded-full font-bold text-sm whitespace-nowrap transition-all ${activeTab === 'SERVICES' ? 'bg-rio-blue text-white shadow-lg ring-2 ring-blue-200 ring-offset-2' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-100 shadow-sm'}`}
          >
            Todos os Serviços
          </button>
          <button 
            onClick={() => setActiveTab('BENEFITS')}
            className={`px-6 py-3 rounded-full font-bold text-sm whitespace-nowrap transition-all ${activeTab === 'BENEFITS' ? 'bg-rio-blue text-white shadow-lg ring-2 ring-blue-200 ring-offset-2' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-100 shadow-sm'}`}
          >
            Catálogo de Benefícios
          </button>
          <button 
            onClick={() => setActiveTab('COMMUNITY')}
            className={`px-6 py-3 rounded-full font-bold text-sm whitespace-nowrap transition-all ${activeTab === 'COMMUNITY' ? 'bg-rio-blue text-white shadow-lg ring-2 ring-blue-200 ring-offset-2' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-100 shadow-sm'}`}
          >
            Comunidade
          </button>
       </div>

       {/* CONTENT AREA */}
       <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Gamification & Primary Actions (ALWAYS VISIBLE) */}
          <div className="lg:col-span-4 space-y-8">
             {/* Gamification Status */}
             {user.gamification && <GamificationWidget profile={user.gamification} />}

             {/* Daily Challenge */}
             <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
                <div className="flex items-center gap-2 mb-3">
                   <Target className="w-5 h-5 text-yellow-300" />
                   <h3 className="font-bold text-sm uppercase">Missão do Dia</h3>
                </div>
                <p className="font-medium text-lg mb-4">Acesse o Calendário de Eventos para planejar o próximo feriado.</p>
                <div className="w-full bg-white/20 h-2 rounded-full mb-2">
                   <div className="w-0 h-full bg-yellow-400 rounded-full" />
                </div>
                <p className="text-xs text-purple-200">+50 XP ao completar</p>
             </div>

             {/* Upcoming Events Mini Feed */}
             <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                   <Calendar className="w-5 h-5 text-rio-blue" />
                   Próximos Eventos
                </h3>
                <div className="space-y-4">
                   {RIO_EVENTS.slice(0, 3).map(ev => (
                      <div key={ev.id} className="flex gap-3 items-center group cursor-pointer hover:bg-gray-50 p-2 rounded-xl transition">
                         <div className="bg-gray-100 text-gray-600 font-bold rounded-xl w-12 h-12 flex flex-col items-center justify-center shrink-0 group-hover:bg-rio-blue group-hover:text-white transition">
                            <span className="text-xs">{ev.date.split(' ')[1].substring(0,3)}</span>
                            <span className="text-lg leading-none">{ev.date.split(' ')[0].split('-')[0]}</span>
                         </div>
                         <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-gray-800 text-sm truncate">{ev.title}</h4>
                            <p className="text-xs text-gray-500 truncate">{ev.location}</p>
                         </div>
                      </div>
                   ))}
                </div>
             </div>
          </div>

          {/* Center/Right Column: Dynamic Content based on Tab */}
          <div className="lg:col-span-8">
             
             {/* --- TAB: HOME --- */}
             {activeTab === 'HOME' && (
               <div className="space-y-8 animate-fade-in">
                  
                  {/* HIGHLIGHT SLIDER (MODERN VIEW) */}
                  {highlightSlides.length > 0 && (
                      <div className="relative group overflow-hidden rounded-[2rem] shadow-xl">
                         {highlightSlides.map((slide, index) => {
                             if (index !== currentSlideIndex) return null;
                             const IconComponent = (Icons as any)[slide.iconName] || Icons.HelpCircle;
                             const gradientClass = getSlideGradient(slide.id);
                             const accentClass = getSlideAccentColor(slide.id).split(' ');

                             return (
                                <div 
                                    key={slide.id}
                                    className={`bg-gradient-to-r ${gradientClass} p-8 flex flex-col md:flex-row items-center gap-6 cursor-pointer hover:scale-[1.01] transition-transform duration-500`}
                                    onClick={() => onUseBenefit(slide)}
                                >
                                   {/* Decorations */}
                                   <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 pointer-events-none animate-pulse" />
                                   
                                   <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm shrink-0 shadow-lg">
                                      <IconComponent className={`w-10 h-10 ${accentClass[0]}`} />
                                   </div>

                                   <div className="flex-1 text-center md:text-left relative z-10">
                                      <div className={`inline-block ${accentClass[1]} ${accentClass[2]} text-xs font-bold px-3 py-1 rounded-full mb-2 uppercase tracking-wide`}>
                                          Em Destaque
                                      </div>
                                      <h2 className="text-2xl md:text-3xl font-bold mb-2 text-white">{slide.title}</h2>
                                      <p className="text-white/90 mb-0">{slide.description}</p>
                                   </div>

                                   <button className="bg-white text-gray-800 font-bold py-3 px-6 rounded-full shadow-lg hover:bg-gray-50 transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 z-10">
                                      {slide.customCta || "Inscreva-se"}
                                      <ArrowRight className="w-4 h-4" />
                                   </button>
                                </div>
                             )
                         })}
                         
                         {/* Slider Arrows */}
                         <button 
                            onClick={prevSlide} 
                            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full backdrop-blur-sm transition-all"
                         >
                            <ChevronLeft className="w-6 h-6" />
                         </button>
                         <button 
                            onClick={nextSlide} 
                            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full backdrop-blur-sm transition-all"
                         >
                            <ChevronRight className="w-6 h-6" />
                         </button>

                         {/* Slider Dots */}
                         <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
                            {highlightSlides.map((_, idx) => (
                                <button 
                                    key={idx}
                                    onClick={(e) => { e.stopPropagation(); setCurrentSlideIndex(idx); }}
                                    className={`w-2 h-2 rounded-full transition-all shadow-sm ${idx === currentSlideIndex ? 'bg-white w-6' : 'bg-white/40 hover:bg-white/60'}`}
                                />
                            ))}
                         </div>
                      </div>
                  )}

                  {/* Calculadoras Section */}
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2 px-2">
                        <Calculator className="w-6 h-6 text-green-600" />
                        Calculadoras Hoteleiras
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {calculatorBenefits.map(calc => {
                           const IconComponent = (Icons as any)[calc.iconName] || Icons.Calculator;
                           const isHighlight = calc.id === 'calc-all-in-one';
                           return (
                             <button 
                               key={calc.id}
                               onClick={() => onUseBenefit(calc)}
                               className={`flex flex-col items-center justify-center p-4 rounded-2xl border shadow-sm hover:shadow-md transition-all group
                                    ${isHighlight ? 'bg-white border-rio-gold/50 ring-1 ring-rio-gold/20' : 'bg-white border-gray-100 hover:border-rio-blue'}
                               `}
                             >
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-2 transition-colors
                                     ${isHighlight ? 'bg-rio-gold text-blue-900' : 'bg-green-50 text-green-600 group-hover:bg-green-600 group-hover:text-white'}
                                `}>
                                   <IconComponent className="w-5 h-5" />
                                </div>
                                <span className="text-xs font-bold text-gray-700 text-center">{calc.title}</span>
                                {isHighlight && <span className="text-[10px] bg-rio-gold/20 text-blue-900 px-2 py-0.5 rounded mt-1 font-bold">Completa</span>}
                             </button>
                           )
                        })}
                    </div>
                  </div>
                  
                  {/* Tools / Ferramentas Online (Quick Access Row) */}
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2 px-2">
                        <Wrench className="w-6 h-6 text-slate-500" />
                        Ferramentas Online
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {toolsBenefits.slice(0, 5).map(tool => {
                           const IconComponent = (Icons as any)[tool.iconName] || Icons.HelpCircle;
                           return (
                             <button 
                               key={tool.id}
                               onClick={() => onUseBenefit(tool)}
                               className="flex flex-col items-center justify-center bg-white p-4 rounded-2xl border border-gray-100 hover:border-rio-blue hover:shadow-md transition-all group"
                             >
                                <div className="w-10 h-10 bg-slate-50 text-slate-600 rounded-lg flex items-center justify-center mb-2 group-hover:bg-rio-blue group-hover:text-white transition-colors">
                                   <IconComponent className="w-5 h-5" />
                                </div>
                                <span className="text-xs font-bold text-gray-700 text-center">{tool.title}</span>
                             </button>
                           )
                        })}
                    </div>
                  </div>

                  {/* Suggested Actions */}
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2 px-2">
                        <Zap className="w-6 h-6 text-rio-gold fill-rio-gold" />
                        Destaques para você
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {suggestedActions.filter(b => !highlightIds.includes(b.id)).map(benefit => (
                            <BenefitCard 
                                key={benefit.id} 
                                benefit={benefit} 
                                onUse={onUseBenefit} 
                                onDetails={onViewDetails}
                                layout="grid"
                            />
                        ))}
                    </div>
                  </div>

                  {/* Quick Access Grid */}
                  <div>
                    <div className="flex justify-between items-end mb-4 px-2">
                        <h2 className="text-xl font-bold text-gray-800">Serviços Rápidos</h2>
                        <button 
                           onClick={() => setActiveTab('SERVICES')}
                           className="text-sm text-rio-blue font-medium hover:underline flex items-center gap-1"
                        >
                            Ver todos <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {quickTools.map(benefit => (
                            <BenefitCard 
                                key={benefit.id} 
                                benefit={benefit} 
                                onUse={onUseBenefit} 
                                onDetails={onViewDetails}
                                layout="list"
                            />
                        ))}
                    </div>
                  </div>
               </div>
             )}

             {/* --- TAB: SERVICES (FULL LIST) --- */}
             {activeTab === 'SERVICES' && (
               <div className="space-y-6 animate-fade-in">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm">
                      <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 pl-2">
                        <Zap className="w-6 h-6 text-rio-blue" />
                        Todos os Serviços
                      </h2>
                      <div className="flex flex-wrap items-center gap-3">
                         {/* Category Filter */}
                         <select 
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="bg-gray-50 border border-gray-200 rounded-full text-sm px-4 py-2.5 outline-none focus:ring-2 focus:ring-rio-blue cursor-pointer"
                         >
                            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                         </select>

                         {/* Sort Button (A-Z) - Round */}
                         <button 
                            onClick={() => setSortOrder(prev => prev === 'az' ? 'za' : 'az')}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-gray-50 border border-gray-200 text-gray-600 hover:bg-gray-100 transition-colors"
                            title="Ordenar por Nome"
                         >
                             {sortOrder === 'az' ? <ArrowDownAZ className="w-5 h-5" /> : <ArrowUpAZ className="w-5 h-5" />}
                             <span className="text-sm font-medium hidden sm:inline">{sortOrder === 'az' ? 'A-Z' : 'Z-A'}</span>
                         </button>
                         
                         {/* View Toggle - Round */}
                         <button 
                            onClick={() => setViewMode(v => v === 'grid' ? 'list' : 'grid')} 
                            className="p-2.5 bg-gray-50 rounded-full border border-gray-200 hover:bg-gray-100 text-gray-600"
                            title="Alterar Visualização"
                         >
                            {viewMode === 'grid' ? <List className="w-5 h-5" /> : <Grid className="w-5 h-5" />}
                         </button>
                      </div>
                  </div>

                  <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
                     {sortedServices.map(benefit => (
                        <BenefitCard 
                            key={benefit.id} 
                            benefit={benefit} 
                            onUse={onUseBenefit} 
                            onDetails={onViewDetails}
                            layout={viewMode}
                        />
                     ))}
                  </div>
               </div>
             )}

             {/* --- TAB: BENEFITS (CATALOG) --- */}
             {activeTab === 'BENEFITS' && (
               <div className="space-y-6 animate-fade-in">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm">
                      <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 pl-2">
                        <LayoutGrid className="w-6 h-6 text-purple-600" />
                        Catálogo de Benefícios
                      </h2>
                      <div className="flex flex-wrap items-center gap-3">
                         <select 
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="bg-gray-50 border border-gray-200 rounded-full text-sm px-4 py-2.5 outline-none focus:ring-2 focus:ring-rio-blue cursor-pointer"
                         >
                            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                         </select>

                         {/* Sort Button (A-Z) - Round */}
                         <button 
                            onClick={() => setSortOrder(prev => prev === 'az' ? 'za' : 'az')}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-gray-50 border border-gray-200 text-gray-600 hover:bg-gray-100 transition-colors"
                            title="Ordenar por Nome"
                         >
                             {sortOrder === 'az' ? <ArrowDownAZ className="w-5 h-5" /> : <ArrowUpAZ className="w-5 h-5" />}
                             <span className="text-sm font-medium hidden sm:inline">{sortOrder === 'az' ? 'A-Z' : 'Z-A'}</span>
                         </button>
                      </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     {sortedBenefits.map(benefit => (
                        <BenefitCard 
                            key={benefit.id} 
                            benefit={benefit} 
                            onUse={onUseBenefit} 
                            onDetails={onViewDetails}
                            layout="grid"
                        />
                     ))}
                  </div>
               </div>
             )}

             {/* --- TAB: COMMUNITY --- */}
             {activeTab === 'COMMUNITY' && (
               <div className="space-y-6 animate-fade-in">
                  <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                     <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <Users className="w-6 h-6 text-green-600" />
                        Conecte-se com o Setor
                     </h2>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {COMMUNITY_ITEMS_DATA.map(item => {
                           const IconComponent = (Icons as any)[item.iconName] || Icons.HelpCircle;
                           return (
                             <div key={item.id} className="bg-gray-50 rounded-2xl p-6 border border-gray-200 hover:border-rio-blue transition-colors cursor-pointer group">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${item.bgClass} ${item.colorClass}`}>
                                   <IconComponent className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-gray-800 text-lg mb-1">{item.title}</h3>
                                <p className="text-sm text-gray-500">{item.description}</p>
                             </div>
                           )
                        })}
                     </div>
                  </div>
               </div>
             )}

          </div>
       </div>
    </div>
  );
};

export default ModernDashboard;

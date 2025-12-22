
import React, { useState } from 'react';
import { User, Benefit, BenefitCategory } from '../types';
import { BENEFITS_DATA, SUPER_CATEGORIES } from '../constants';
import BenefitCard from './BenefitCard';
import { 
  Search, LayoutGrid, Zap, ArrowRight, Star, 
  List, Grid, ArrowDownAZ, ArrowUpAZ, ChevronLeft, ChevronRight, Filter
} from 'lucide-react';
import * as Icons from 'lucide-react';

interface DashboardProps {
  user: User;
  onUseBenefit: (benefit: Benefit) => void;
  onViewDetails: (benefit: Benefit) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onUseBenefit, onViewDetails }) => {
  // States for Filters & View
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [sortOrder, setSortOrder] = useState<'az' | 'za'>('az');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // State for Highlights Slider
  const [highlightIndex, setHighlightIndex] = useState(0);

  // --- DATA PREPARATION ---

  // 1. Specific Highlight IDs (Banners) - Manually selected for visual impact
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
  
  // 2. Main Catalog Data (Everything)
  const categories = ['Todas', ...Object.values(BenefitCategory)];
  
  const filteredBenefits = BENEFITS_DATA.filter(benefit => {
    const matchesSearch = 
      benefit.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      benefit.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'Todas' || benefit.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const sortedBenefits = [...filteredBenefits].sort((a, b) => {
    if (sortOrder === 'az') return a.title.localeCompare(b.title);
    return b.title.localeCompare(a.title);
  });

  // --- SLIDER LOGIC ---
  const itemsPerSlide = 3;
  const maxIndex = Math.max(0, highlights.length - itemsPerSlide);

  const nextSlide = () => {
    setHighlightIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setHighlightIndex(prev => Math.max(prev - 1, 0));
  };

  const visibleHighlights = highlights.slice(highlightIndex, highlightIndex + itemsPerSlide);

  // --- BANNER STYLING HELPERS ---
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
    <div className="animate-fade-in pb-12">
      
      {/* Header Clássico */}
      <div className="bg-white rounded-2xl p-8 mb-8 shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Olá, {user.name}</h1>
          <p className="text-gray-500">Bem-vindo à sua Central do Associado. O que você precisa hoje?</p>
        </div>
        <div className="hidden md:block text-right">
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Status</p>
            <p className="text-rio-blue font-bold">{user.hotel}</p>
        </div>
      </div>

      <div className="space-y-10">
          
          {/* 1. Destaques (Banners Coloridos em Slider de 3 Colunas) - MOVIDO PARA O TOPO */}
          <section>
             <div className="flex justify-between items-end mb-4">
                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 uppercase tracking-wide text-xs">
                    <Star className="w-4 h-4 text-rio-gold fill-rio-gold" />
                    Novidades & Destaques
                </h2>
                
                {/* Slider Controls */}
                <div className="flex gap-2">
                    <button 
                        onClick={prevSlide}
                        disabled={highlightIndex === 0}
                        className="p-2 rounded-full bg-white border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-gray-600 shadow-sm"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button 
                        onClick={nextSlide}
                        disabled={highlightIndex >= maxIndex}
                        className="p-2 rounded-full bg-white border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-gray-600 shadow-sm"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {visibleHighlights.map(benefit => {
                   const IconComponent = (Icons as any)[benefit.iconName] || Icons.HelpCircle;
                   const gradient = getBannerStyle(benefit.id);
                   
                   return (
                     <div 
                       key={benefit.id}
                       onClick={() => onUseBenefit(benefit)}
                       className={`
                         relative overflow-hidden rounded-2xl p-6 h-64 flex flex-col justify-between
                         bg-gradient-to-br ${gradient} text-white shadow-lg cursor-pointer
                         transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl group
                       `}
                     >
                        {/* Background Decoration */}
                        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-16 -mt-16 pointer-events-none group-hover:scale-125 transition-transform duration-500" />
                        
                        <div className="relative z-10">
                           <div className="bg-white/20 p-3 rounded-xl w-fit backdrop-blur-sm mb-4 shadow-sm">
                              <IconComponent className="w-8 h-8 text-white" />
                           </div>
                           
                           <div className="inline-block bg-white/20 backdrop-blur-md text-[10px] font-bold px-2 py-1 rounded mb-2 uppercase tracking-wide">
                              Destaque
                           </div>
                           
                           <h3 className="text-xl font-bold leading-tight mb-2 line-clamp-2">
                             {benefit.title}
                           </h3>
                           <p className="text-sm text-white/80 line-clamp-2 leading-relaxed">
                             {benefit.description}
                           </p>
                        </div>

                        <div className="relative z-10 mt-4 flex items-center text-sm font-bold opacity-90 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                           {benefit.customCta || "Acessar Agora"} <ArrowRight className="w-4 h-4 ml-1" />
                        </div>
                     </div>
                   );
                })}
             </div>
          </section>

          {/* 2. Catálogo Completo (Com Filtros e Ordenação) - MEIO DA PÁGINA */}
          <section id="catalog-section" className="bg-gray-50/50 rounded-3xl border border-gray-100 p-6">
            
            <div className="flex flex-col gap-6 mb-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-rio-blue" />
                        Todos os Benefícios
                    </h2>
                    <span className="text-xs font-medium text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200">
                        {sortedBenefits.length} encontrados
                    </span>
                </div>

                {/* Toolbar */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row gap-4 items-center justify-between">
                    
                    {/* Search */}
                    <div className="relative w-full md:w-80">
                        <input 
                            type="text" 
                            placeholder="Buscar serviço..." 
                            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rio-blue focus:outline-none transition-all text-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                    </div>

                    {/* Filters & Actions */}
                    <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                        
                        {/* Category Dropdown */}
                        <div className="relative flex-1 md:flex-none">
                            <select 
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full md:w-48 appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-2 pl-3 pr-8 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-rio-blue cursor-pointer"
                            >
                                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                            <Filter className="w-3 h-3 text-gray-400 absolute right-3 top-3 pointer-events-none" />
                        </div>

                        <div className="h-6 w-px bg-gray-200 hidden md:block"></div>

                        {/* Sort Button */}
                        <button 
                            onClick={() => setSortOrder(prev => prev === 'az' ? 'za' : 'az')}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-600 hover:bg-gray-100 transition-colors text-sm font-medium"
                            title="Ordenar"
                        >
                            {sortOrder === 'az' ? <ArrowDownAZ className="w-4 h-4" /> : <ArrowUpAZ className="w-4 h-4" />}
                            <span className="hidden sm:inline">A-Z</span>
                        </button>

                        {/* View Toggle */}
                        <button 
                            onClick={() => setViewMode(v => v === 'grid' ? 'list' : 'grid')}
                            className="p-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                            title={viewMode === 'grid' ? "Ver em Lista" : "Ver em Grade"}
                        >
                            {viewMode === 'grid' ? <List className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Results Grid/List */}
            <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'grid-cols-1 gap-4'}`}>
              {sortedBenefits.length > 0 ? (
                  sortedBenefits.map(benefit => (
                    <BenefitCard 
                        key={benefit.id} 
                        benefit={benefit} 
                        onUse={onUseBenefit} 
                        onDetails={onViewDetails}
                        layout={viewMode}
                    />
                  ))
              ) : (
                  <div className="col-span-full py-16 text-center text-gray-500 bg-white rounded-xl border border-dashed border-gray-300">
                      Nenhum benefício encontrado com os filtros atuais.
                  </div>
              )}
            </div>
          </section>

          {/* 3. Blocos de Categorias (Acesso Rápido) - MOVIDO PARA O FINAL */}
          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2 uppercase tracking-wide text-xs">
              <LayoutGrid className="w-4 h-4 text-rio-blue" />
              Navegar por Categorias
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {SUPER_CATEGORIES.map(cat => {
                const IconComponent = (Icons as any)[cat.iconName] || Icons.LayoutGrid;
                return (
                  <div 
                    key={cat.id}
                    onClick={() => {
                        setSelectedCategory(cat.categories[0]);
                        document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`
                      relative overflow-hidden rounded-2xl p-6 cursor-pointer transition-all duration-300 group hover:-translate-y-1 hover:shadow-xl
                      bg-gradient-to-br ${cat.gradient} text-white shadow-lg
                    `}
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 transition-transform group-hover:scale-150" />
                    <IconComponent className="w-10 h-10 mb-4 text-white/90" strokeWidth={1.5} />
                    <h3 className="text-xl font-bold mb-1">{cat.title}</h3>
                    <p className="text-xs text-white/70 line-clamp-2">{cat.description}</p>
                    
                    <div className="mt-4 flex items-center text-xs font-bold text-white/90 group-hover:text-white">
                      Filtrar <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

      </div>
    </div>
  );
};

export default Dashboard;

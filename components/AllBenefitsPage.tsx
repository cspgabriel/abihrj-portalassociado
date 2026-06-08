
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, LayoutGrid, Filter, ArrowDownAZ, ArrowUpAZ, List, Grid } from 'lucide-react';
import { BENEFITS_DATA } from '../constants';
import { Benefit, BenefitCategory } from '../types';
import { benefitsService } from '../services/benefitsService';
import BenefitCard from './BenefitCard';
import HighlightsSlider from './HighlightsSlider';

interface AllBenefitsPageProps {
  onBack: () => void;
  onUse: (benefit: Benefit) => void;
  onDetails: (benefit: Benefit) => void;
  initialSearchTerm?: string;
}

const AllBenefitsPage: React.FC<AllBenefitsPageProps> = ({ onBack, onUse, onDetails, initialSearchTerm = '' }) => {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortOrder, setSortOrder] = useState<'az' | 'za'>('az');

  // dynamic list fetched from external projects
  const [benefits, setBenefits] = useState<Benefit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const hiddenBenefitIds = new Set(['highlight-drinks', 'sustainability-raiox', 'news-portal']);
  const hiddenTitlePattern = /documentos?\s+e\s+modelos?|modelos?\s+e\s+documentos?|galeria\s+de\s+fotos?/i;


  useEffect(() => {
    if (initialSearchTerm) {
      setSearchTerm(initialSearchTerm);
    }
  }, [initialSearchTerm]);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    // fallback para constantes se o serviço falhar
    benefitsService.getAll().then(data => {
      if (mounted) {
        setBenefits(data.length ? data : BENEFITS_DATA);
        setLoading(false);
      }
    }).catch(() => {
      if (mounted) {
        setBenefits(BENEFITS_DATA);
        setLoading(false);
      }
    });
    return () => { mounted = false; };
  }, []);


  const visibleBenefits = benefits.filter(b => !hiddenBenefitIds.has(b.id) && !hiddenTitlePattern.test(b.title));
  const categories = ['Todos', ...Array.from(new Set(visibleBenefits.map(b => b.category)))];

  const filteredBenefits = visibleBenefits.filter(b => {
    const matchesSearch = b.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          b.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || b.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedBenefits = [...filteredBenefits].sort((a, b) => {
    if (sortOrder === 'az') return a.title.localeCompare(b.title);
    return b.title.localeCompare(a.title);
  });

  return (
    <div className="bg-[#f6f8fc] min-h-screen pb-12 animate-fade-in">
      {/* Header */}
      <div className="relative overflow-hidden bg-blue-950 text-white pt-8 pb-24 px-6">
        <img
          src="https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1800&q=85"
          alt="Vista aérea do Rio de Janeiro"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#022b66] via-[#073b86]/92 to-[#073b86]/45" />
        <div className="absolute inset-y-0 right-0 hidden w-1/3 border-l border-amber-300/30 md:block">
          <div className="absolute right-12 top-12 h-44 w-44 rounded-full border border-amber-300/60" />
          <div className="absolute right-24 top-24 h-24 w-24 rounded-full border border-white/30" />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-blue-100 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar para Dashboard
          </button>

          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 shadow-xl">
              <LayoutGrid className="w-14 h-14 text-rio-gold" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.25em] text-amber-300 mb-3">Portal do Associado</p>
              <h1 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">Todos os Benefícios</h1>
              <p className="text-blue-50 text-base md:text-xl max-w-3xl leading-relaxed">
                Um catálogo executivo de serviços, ferramentas e canais estratégicos para operação, comercial, comunicação e gestão hoteleira.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-10 relative z-20">
        
        {/* Slider */}
        <div className="mb-8">
            <HighlightsSlider onUseBenefit={onUse} />
        </div>

        {/* Filters Bar */}
        <div className="bg-white/95 backdrop-blur rounded-2xl shadow-[0_18px_45px_-30px_rgba(15,23,42,0.45)] border border-slate-200 p-4 mb-8">
           <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
              
              {/* Search */}
              <div className="relative w-full lg:w-96">
                 <input 
                   type="text" 
                   placeholder="Buscar benefício..." 
                   className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rio-blue outline-none"
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                 />
                 <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                 <div className="relative flex-1 lg:flex-none">
                    <select 
                       value={selectedCategory}
                       onChange={(e) => setSelectedCategory(e.target.value)}
                       className="w-full lg:w-auto appearance-none bg-slate-50 border border-slate-200 text-slate-700 py-2.5 pl-4 pr-10 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-rio-blue cursor-pointer"
                    >
                       {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                    <Filter className="w-4 h-4 text-gray-400 absolute right-3 top-3 pointer-events-none" />
                 </div>

                 <button 
                    onClick={() => setSortOrder(prev => prev === 'az' ? 'za' : 'az')}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors"
                 >
                     {sortOrder === 'az' ? <ArrowDownAZ className="w-5 h-5" /> : <ArrowUpAZ className="w-5 h-5" />}
                 </button>

                 <button 
                    onClick={() => setViewMode(v => v === 'grid' ? 'list' : 'grid')} 
                    className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600"
                 >
                    {viewMode === 'grid' ? <List className="w-5 h-5" /> : <Grid className="w-5 h-5" />}
                 </button>
              </div>
           </div>
        </div>

        {/* Grid/List */}
        {loading ? (
          <div className="col-span-full py-16 text-center">
            Carregando benefícios...
          </div>
        ) : null}
        <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'} gap-6`}>
            {sortedBenefits.length > 0 ? (
                sortedBenefits.map(benefit => (
                    <BenefitCard 
                        key={benefit.id}
                        benefit={benefit}
                        onUse={onUse}
                        onDetails={onDetails}
                        layout={viewMode}
                    />
                ))
            ) : (
                <div className="col-span-full py-16 text-center bg-white rounded-xl shadow-sm border border-gray-100">
                    <p className="text-gray-500">Nenhum benefício encontrado com os filtros atuais.</p>
                </div>
            )}
        </div>

      </div>
    </div>
  );
};

export default AllBenefitsPage;

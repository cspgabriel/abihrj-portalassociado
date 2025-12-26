
import React, { useState } from 'react';
import { ArrowLeft, Search, Filter, LayoutGrid, List, Sparkles } from 'lucide-react';
import { BENEFITS_DATA } from '../constants';
import { Benefit, BenefitCategory } from '../types';
import BenefitCard from './BenefitCard';

interface AllBenefitsPageProps {
  onBack: () => void;
  onUse: (benefit: Benefit) => void;
  onDetails: (benefit: Benefit) => void;
}

const AllBenefitsPage: React.FC<AllBenefitsPageProps> = ({ onBack, onUse, onDetails }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = ['Todas', ...Object.values(BenefitCategory)];

  const filteredBenefits = BENEFITS_DATA.filter(benefit => {
    const matchesSearch = 
      benefit.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      benefit.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'Todas' || benefit.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Sort alphabetically by default
  filteredBenefits.sort((a, b) => a.title.localeCompare(b.title));

  return (
    <div className="bg-gray-50 min-h-screen pb-12 animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white pt-8 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -mr-20 -mt-20 blur-2xl" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar para Dashboard
          </button>

          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-xl">
              <LayoutGrid className="w-16 h-16 text-rio-gold" strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Todos os Benefícios</h1>
              <p className="text-white/80 text-lg md:text-xl max-w-2xl leading-relaxed">
                Explore o catálogo completo de vantagens, serviços e ferramentas exclusivas para associados HoteisRio.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-10 relative z-20">
        
        {/* Filters Bar */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 mb-8">
           <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              
              {/* Search */}
              <div className="relative w-full md:w-96">
                <input 
                  type="text" 
                  placeholder="O que você procura?" 
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rio-blue focus:outline-none transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              </div>

              {/* Controls */}
              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                 <div className="relative flex-1 md:flex-none">
                    <select 
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full md:w-48 appearance-none bg-gray-50 border border-gray-300 text-gray-700 py-2.5 pl-3 pr-8 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-rio-blue cursor-pointer"
                    >
                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                    <Filter className="w-4 h-4 text-gray-400 absolute right-2.5 top-3 pointer-events-none" />
                 </div>

                 <div className="w-px h-8 bg-gray-200 hidden md:block"></div>

                 <button 
                    onClick={() => setViewMode(v => v === 'grid' ? 'list' : 'grid')}
                    className="p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                    title={viewMode === 'grid' ? "Ver em Lista" : "Ver em Grade"}
                 >
                    {viewMode === 'grid' ? <List className="w-5 h-5" /> : <LayoutGrid className="w-5 h-5" />}
                 </button>
              </div>
           </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500 font-medium">
                    Mostrando {filteredBenefits.length} resultado(s)
                </p>
                {searchTerm && (
                    <button 
                        onClick={() => { setSearchTerm(''); setSelectedCategory('Todas'); }}
                        className="text-sm text-rio-blue hover:underline"
                    >
                        Limpar filtros
                    </button>
                )}
            </div>

            <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'grid-cols-1 gap-4'}`}>
                {filteredBenefits.length > 0 ? (
                    filteredBenefits.map(benefit => (
                        <BenefitCard 
                            key={benefit.id}
                            benefit={benefit}
                            onUse={onUse}
                            onDetails={onDetails}
                            layout={viewMode}
                        />
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center bg-white rounded-xl shadow-sm border border-gray-100">
                        <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 mb-1">Nenhum benefício encontrado</h3>
                        <p className="text-gray-500">Tente ajustar sua busca ou filtros.</p>
                    </div>
                )}
            </div>
        </div>

      </div>
    </div>
  );
};

export default AllBenefitsPage;

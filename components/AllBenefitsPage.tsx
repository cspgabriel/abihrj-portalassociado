
import React, { useState } from 'react';
import { ArrowLeft, Search, LayoutGrid, Filter, ArrowDownAZ, ArrowUpAZ, List, Grid } from 'lucide-react';
import { BENEFITS_DATA } from '../constants';
import { Benefit, BenefitCategory } from '../types';
import BenefitCard from './BenefitCard';
import HighlightsSlider from './HighlightsSlider';

interface AllBenefitsPageProps {
  onBack: () => void;
  onUse: (benefit: Benefit) => void;
  onDetails: (benefit: Benefit) => void;
}

const AllBenefitsPage: React.FC<AllBenefitsPageProps> = ({ onBack, onUse, onDetails }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortOrder, setSortOrder] = useState<'az' | 'za'>('az');

  const categories = ['Todos', ...Object.values(BenefitCategory)];

  const filteredBenefits = BENEFITS_DATA.filter(b => {
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
    <div className="bg-gray-50 min-h-screen pb-12 animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-rio-blue to-blue-800 text-white pt-8 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -mr-20 -mt-20 blur-2xl" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-blue-200 hover:text-white transition-colors mb-8"
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
              <p className="text-blue-100 text-lg md:text-xl max-w-2xl leading-relaxed">
                Explore o catálogo completo de vantagens, serviços e ferramentas exclusivas para associados HoteisRio.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-10 relative z-20">
        
        {/* Slider */}
        <div className="mb-10">
            <HighlightsSlider onUseBenefit={onUse} />
        </div>

        {/* Filters Bar */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 mb-8">
           <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
              
              {/* Search */}
              <div className="relative w-full lg:w-96">
                 <input 
                   type="text" 
                   placeholder="Buscar benefício..." 
                   className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rio-blue outline-none"
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
                       className="w-full lg:w-auto appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-2.5 pl-4 pr-10 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-rio-blue cursor-pointer"
                    >
                       {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                    <Filter className="w-4 h-4 text-gray-400 absolute right-3 top-3 pointer-events-none" />
                 </div>

                 <button 
                    onClick={() => setSortOrder(prev => prev === 'az' ? 'za' : 'az')}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-600 hover:bg-gray-100 transition-colors"
                 >
                     {sortOrder === 'az' ? <ArrowDownAZ className="w-5 h-5" /> : <ArrowUpAZ className="w-5 h-5" />}
                 </button>

                 <button 
                    onClick={() => setViewMode(v => v === 'grid' ? 'list' : 'grid')} 
                    className="p-2.5 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 text-gray-600"
                 >
                    {viewMode === 'grid' ? <List className="w-5 h-5" /> : <Grid className="w-5 h-5" />}
                 </button>
              </div>
           </div>
        </div>

        {/* Grid/List */}
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

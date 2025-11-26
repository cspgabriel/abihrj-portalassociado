
import React, { useState } from 'react';
import { ArrowLeft, Gavel, Search, ExternalLink, FileText, AlertCircle } from 'lucide-react';
import { RJ_LAWS_DATA } from '../constants';

interface LawsRegulationPageProps {
  onBack: () => void;
}

const LawsRegulationPage: React.FC<LawsRegulationPageProps> = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');

  // Categorias únicas
  const categories = ['Todos', ...Array.from(new Set(RJ_LAWS_DATA.map(l => l.category)))];

  const filteredLaws = RJ_LAWS_DATA.filter(law => {
    const matchesSearch = 
      law.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
      law.number.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || law.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="animate-fade-in bg-gray-50 min-h-screen pb-12">
      {/* Header */}
      <div className="bg-slate-900 text-white pt-8 pb-16 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-2xl" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar para Dashboard
          </button>

          <div className="flex items-center gap-4 mb-4">
             <div className="bg-slate-700 p-3 rounded-xl">
               <Gavel className="w-8 h-8 text-rio-gold" />
             </div>
             <div>
                <h1 className="text-3xl font-bold">Decretos e Leis RJ</h1>
                <p className="text-slate-400">Consulta à legislação vigente que impacta a hotelaria carioca.</p>
             </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-8 relative z-20">
        
        {/* Filters Card */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8">
           <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              
              {/* Search */}
              <div className="relative w-full md:w-96">
                <input 
                  type="text" 
                  placeholder="Buscar por número ou assunto..." 
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rio-blue focus:outline-none transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              </div>

              {/* Categories */}
              <div className="flex gap-2 overflow-x-auto pb-1 w-full md:w-auto scrollbar-hide">
                 {categories.map(cat => (
                   <button 
                     key={cat}
                     onClick={() => setSelectedCategory(cat)}
                     className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors
                       ${selectedCategory === cat 
                         ? 'bg-slate-800 text-white' 
                         : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
                     `}
                   >
                     {cat}
                   </button>
                 ))}
              </div>
           </div>
        </div>

        {/* Laws List */}
        <div className="space-y-4">
           {filteredLaws.length === 0 ? (
             <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                <AlertCircle className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 font-medium">Nenhum resultado encontrado para sua busca.</p>
             </div>
           ) : (
             filteredLaws.map(law => (
               <div key={law.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow group flex flex-col md:flex-row gap-6">
                 
                 {/* Icon/Category Box */}
                 <div className="shrink-0">
                    <div className="w-14 h-14 rounded-lg bg-blue-50 text-rio-blue flex items-center justify-center border border-blue-100">
                       <FileText className="w-6 h-6" />
                    </div>
                 </div>

                 {/* Content */}
                 <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                       <span className="text-xs font-bold px-2 py-1 bg-gray-100 text-gray-600 rounded uppercase tracking-wide">
                          {law.category}
                       </span>
                       <span className="text-xs text-gray-400 font-mono">
                          {law.date}
                       </span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-rio-blue transition-colors">
                      {law.number}
                    </h3>
                    
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {law.description}
                    </p>
                    
                    {law.link && law.link !== '#' ? (
                      <a 
                        href={law.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-rio-blue hover:text-blue-800 transition-colors"
                      >
                        Ler documento na íntegra
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <span className="text-xs text-gray-400 italic">Link externo indisponível</span>
                    )}
                 </div>
               </div>
             ))
           )}
        </div>

      </div>
    </div>
  );
};

export default LawsRegulationPage;

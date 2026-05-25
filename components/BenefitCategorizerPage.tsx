
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Download, Printer, Save, CheckSquare, Square, Building2, FileText, CheckCircle2 } from 'lucide-react';
import { BENEFITS_DATA, HOTEL_SECTORS } from '../constants';
import { Benefit, HotelSector } from '../types';

interface BenefitCategorizerPageProps {
  onBack: () => void;
}

const BenefitCategorizerPage: React.FC<BenefitCategorizerPageProps> = ({ onBack }) => {
  const [activeSector, setActiveSector] = useState<string>(HOTEL_SECTORS[0].id);
  
  // State to store which benefits are active for which sector
  // Structure: { 'MANAGEMENT': ['id1', 'id2'], 'SALES': ['id1'] }
  const [matrix, setMatrix] = useState<Record<string, string[]>>({});
  const [isGenerated, setIsGenerated] = useState(false);

  // Initialize matrix based on existing data
  useEffect(() => {
    const initialMatrix: Record<string, string[]> = {};
    
    HOTEL_SECTORS.forEach(sector => {
      // Find benefits that currently target this sector
      const sectorBenefits = BENEFITS_DATA
        .filter(b => b.targetSectors?.includes(sector.id as HotelSector))
        .map(b => b.id);
      
      initialMatrix[sector.id] = sectorBenefits;
    });

    setMatrix(initialMatrix);
  }, []);

  const toggleBenefit = (benefitId: string) => {
    setMatrix(prev => {
      const currentList = prev[activeSector] || [];
      const exists = currentList.includes(benefitId);
      
      let newList;
      if (exists) {
        newList = currentList.filter(id => id !== benefitId);
      } else {
        newList = [...currentList, benefitId];
      }
      
      return { ...prev, [activeSector]: newList };
    });
  };

  const toggleAll = () => {
    const currentList = matrix[activeSector] || [];
    const allIds = BENEFITS_DATA.map(b => b.id);
    
    if (currentList.length === allIds.length) {
      // Uncheck all
      setMatrix(prev => ({ ...prev, [activeSector]: [] }));
    } else {
      // Check all
      setMatrix(prev => ({ ...prev, [activeSector]: allIds }));
    }
  };

  const generateTxt = () => {
    let content = "RELATÓRIO DE BENEFÍCIOS POR SETOR - HOTEISRIO\n";
    content += `Gerado em: ${new Date().toLocaleDateString()} às ${new Date().toLocaleTimeString()}\n`;
    content += "=================================================\n\n";

    HOTEL_SECTORS.forEach(sector => {
      const benefitIds = matrix[sector.id] || [];
      if (benefitIds.length > 0) {
        content += `[ SETOR: ${sector.label.toUpperCase()} ]\n`;
        content += `Total de Benefícios: ${benefitIds.length}\n`;
        content += "-------------------------------------------------\n";
        
        benefitIds.forEach(id => {
          const benefit = BENEFITS_DATA.find(b => b.id === id);
          if (benefit) {
            content += `[x] ${benefit.title}\n`;
            content += `    Link/Ação: ${benefit.externalLink || benefit.embedUrl || 'Interno'}\n`;
            content += `    Resumo: ${benefit.description}\n\n`;
          }
        });
        content += "\n";
      }
    });

    const element = document.createElement("a");
    const file = new Blob([content], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "relatorio_beneficios_hoteisrio.txt";
    document.body.appendChild(element);
    element.click();
  };

  const handlePrint = () => {
    window.print();
  };

  const currentSectorLabel = HOTEL_SECTORS.find(s => s.id === activeSector)?.label;
  const activeCount = (matrix[activeSector] || []).length;

  return (
    <div className="min-h-screen bg-gray-50 pb-12 animate-fade-in print:bg-white print:p-0">
      
      {/* HEADER (Hidden on Print) */}
      <div className="bg-slate-900 text-white pt-8 pb-20 px-6 relative overflow-hidden print:hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <button onClick={onBack} className="flex items-center gap-2 text-blue-200 hover:text-white transition-colors mb-6">
            <ArrowLeft className="w-5 h-5" /> Voltar ao Dashboard
          </button>
          <div className="flex items-center gap-4">
            <div className="bg-white/10 p-3 rounded-xl border border-white/20">
              <FileText className="w-10 h-10 text-rio-gold" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Categorizador de Benefícios</h1>
              <p className="text-gray-400 mt-1">Ferramenta administrativa para gerar relatórios setorizados.</p>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-20 print:mt-0 print:px-0 print:max-w-none">
        
        {/* Controls Card (Hidden on Print) */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8 print:hidden">
           <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex-1 w-full overflow-x-auto pb-2">
                 <div className="flex gap-2">
                    {HOTEL_SECTORS.map(sector => {
                       const count = (matrix[sector.id] || []).length;
                       return (
                        <button
                          key={sector.id}
                          onClick={() => setActiveSector(sector.id)}
                          className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2
                            ${activeSector === sector.id 
                              ? 'bg-rio-blue text-white shadow-md' 
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
                          `}
                        >
                          {sector.label}
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeSector === sector.id ? 'bg-white/20' : 'bg-gray-300 text-gray-700'}`}>
                            {count}
                          </span>
                        </button>
                       )
                    })}
                 </div>
              </div>
              <div className="flex gap-3 shrink-0">
                 <button 
                   onClick={generateTxt}
                   className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition shadow-sm"
                 >
                   <Download className="w-4 h-4" /> Baixar TXT
                 </button>
                 <button 
                   onClick={handlePrint}
                   className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg font-bold hover:bg-gray-900 transition shadow-sm"
                 >
                   <Printer className="w-4 h-4" /> Imprimir PDF
                 </button>
              </div>
           </div>
        </div>

        {/* PRINTABLE AREA */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 min-h-[500px] print:shadow-none print:border-0">
           {/* Print Header (Only shows on print) */}
           <div className="hidden print:block p-8 border-b border-gray-200">
              <h1 className="text-2xl font-bold text-gray-900">Relatório de Benefícios - ABIH-RJ</h1>
              <p className="text-sm text-gray-500">Documento gerado em {new Date().toLocaleDateString()}</p>
           </div>

           {/* Interactive Interface (Hidden on Print, replaced by static list below) */}
           <div className="p-6 print:hidden">
              <div className="flex justify-between items-center mb-6">
                 <div>
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-rio-blue" />
                      {currentSectorLabel}
                    </h2>
                    <p className="text-sm text-gray-500">Selecione os benefícios relevantes para este departamento.</p>
                 </div>
                 <button 
                   onClick={toggleAll}
                   className="text-sm font-bold text-rio-blue hover:underline"
                 >
                   {activeCount === BENEFITS_DATA.length ? 'Desmarcar Todos' : 'Marcar Todos'}
                 </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                 {BENEFITS_DATA.map(benefit => {
                    const isChecked = (matrix[activeSector] || []).includes(benefit.id);
                    return (
                       <div 
                         key={benefit.id}
                         onClick={() => toggleBenefit(benefit.id)}
                         className={`
                           p-4 rounded-lg border cursor-pointer transition-all flex gap-3 items-start select-none
                           ${isChecked ? 'bg-blue-50 border-rio-blue ring-1 ring-rio-blue' : 'bg-white border-gray-200 hover:border-gray-300'}
                         `}
                       >
                          <div className={`mt-1 ${isChecked ? 'text-rio-blue' : 'text-gray-300'}`}>
                             {isChecked ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5" />}
                          </div>
                          <div>
                             <h4 className={`text-sm font-bold leading-tight mb-1 ${isChecked ? 'text-gray-900' : 'text-gray-500'}`}>
                               {benefit.title}
                             </h4>
                             <p className="text-xs text-gray-400 line-clamp-2">{benefit.description}</p>
                          </div>
                       </div>
                    )
                 })}
              </div>
           </div>

           {/* Static List for Printing (Loops through all sectors) */}
           <div className="hidden print:block p-8">
              {HOTEL_SECTORS.map(sector => {
                 const ids = matrix[sector.id] || [];
                 if (ids.length === 0) return null;

                 return (
                    <div key={sector.id} className="mb-8 break-inside-avoid">
                       <h3 className="text-lg font-bold text-gray-900 border-b-2 border-gray-800 pb-2 mb-4 uppercase">
                          {sector.label}
                       </h3>
                       <div className="grid grid-cols-2 gap-4">
                          {ids.map(id => {
                             const benefit = BENEFITS_DATA.find(b => b.id === id);
                             if (!benefit) return null;
                             return (
                                <div key={id} className="flex gap-2 items-start mb-2">
                                   <CheckCircle2 className="w-4 h-4 text-black shrink-0 mt-1" />
                                   <div>
                                      <span className="font-bold text-sm block">{benefit.title}</span>
                                      <span className="text-xs text-gray-600 block">{benefit.description}</span>
                                   </div>
                                </div>
                             )
                          })}
                       </div>
                    </div>
                 )
              })}
              
              <div className="mt-12 text-center text-xs text-gray-400 border-t pt-4">
                 <p>Gerado pela Central do Associado ABIH-RJ</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default BenefitCategorizerPage;

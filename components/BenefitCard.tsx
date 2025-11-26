import React from 'react';
import { Benefit } from '../types';
import * as Icons from 'lucide-react';
import { Sparkles, ArrowRight, CheckCircle2, Download } from 'lucide-react';

interface BenefitCardProps {
  benefit: Benefit;
  onDetails: (benefit: Benefit) => void;
  onUse: (benefit: Benefit) => void;
}

const BenefitCard: React.FC<BenefitCardProps> = ({ benefit, onDetails, onUse }) => {
  // Dynamically resolve icon
  const IconComponent = (Icons as any)[benefit.iconName] || Icons.HelpCircle;

  return (
    <div className="bg-white rounded-xl p-5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.08)] hover:shadow-[0_10px_30px_-4px_rgba(0,74,173,0.15)] border border-gray-100 flex flex-col h-full relative transition-all duration-300 group">
      
      {/* Header: Icon & Status */}
      <div className="flex justify-between items-start mb-4">
        <div className="w-12 h-12 rounded-lg bg-blue-50 text-rio-blue flex items-center justify-center group-hover:bg-rio-blue group-hover:text-white transition-colors duration-300">
          <IconComponent className="w-6 h-6" strokeWidth={1.5} />
        </div>
        
        <div className="flex flex-col items-end gap-2">
          {/* Status Badge */}
          <div className="bg-green-50 text-green-700 text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1 border border-green-100">
            <CheckCircle2 className="w-3 h-3" />
            Ativo
          </div>
          
          {/* New Badge */}
          {benefit.isNew && (
            <div className="bg-rio-gold text-blue-900 text-[10px] font-bold px-2 py-1 rounded-md shadow-sm">
              NOVO
            </div>
          )}
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-1 mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-2 leading-tight group-hover:text-rio-blue transition-colors">
          {benefit.title}
        </h3>
        <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">
          {benefit.description}
        </p>
      </div>
      
      {/* Actions Footer - 2 Buttons */}
      <div className="mt-auto grid grid-cols-2 gap-3">
        {/* Button 1: Detalhes (IA) */}
        <button 
          onClick={(e) => { e.stopPropagation(); onDetails(benefit); }}
          className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 text-gray-600 text-xs font-semibold hover:bg-gray-50 hover:text-rio-blue hover:border-rio-blue transition-colors group/btn1"
          title="Ver resumo inteligente"
        >
          <Sparkles className="w-3.5 h-3.5 text-rio-gold" />
          Detalhes
        </button>

        {/* Button 2: Utilizar or Download */}
        {benefit.downloadUrl ? (
          <button 
            onClick={(e) => { e.stopPropagation(); onUse(benefit); }}
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-blue-50 text-rio-blue border border-transparent text-xs font-bold hover:bg-rio-blue hover:text-white transition-all shadow-sm group/btn2"
          >
            Baixar
            <Download className="w-3.5 h-3.5 group-hover/btn2:translate-y-0.5 transition-transform" />
          </button>
        ) : (
          <button 
            onClick={(e) => { e.stopPropagation(); onUse(benefit); }}
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-blue-50 text-rio-blue border border-transparent text-xs font-bold hover:bg-rio-blue hover:text-white transition-all shadow-sm group/btn2"
          >
            Utilizar
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn2:translate-x-0.5 transition-transform" />
          </button>
        )}
      </div>
    </div>
  );
};

export default BenefitCard;
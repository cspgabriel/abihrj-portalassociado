

import React from 'react';
import { Benefit } from '../types';
import * as Icons from 'lucide-react';
import { Sparkles, ArrowRight, CheckCircle2, Download, LayoutDashboard, ExternalLink } from 'lucide-react';

interface BenefitCardProps {
  benefit: Benefit;
  onDetails: (benefit: Benefit) => void;
  onUse: (benefit: Benefit) => void;
  layout?: 'grid' | 'list';
}

const BenefitCard: React.FC<BenefitCardProps> = ({ benefit, onDetails, onUse, layout = 'grid' }) => {
  // Dynamically resolve icon
  const IconComponent = (Icons as any)[benefit.iconName] || Icons.HelpCircle;

  const handleDashboardClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (benefit.dashboardUrl) {
      window.open(benefit.dashboardUrl, '_blank');
    }
  };

  const isList = layout === 'list';

  return (
    <div 
      className={`
        bg-white rounded-xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.08)] hover:shadow-[0_10px_30px_-4px_rgba(0,74,173,0.15)] 
        border border-gray-100 relative transition-all duration-300 group
        ${isList ? 'flex flex-row items-center p-4 gap-4 h-auto' : 'flex flex-col h-full p-5'}
      `}
    >
      
      {/* Icon Section */}
      <div className={`${isList ? 'shrink-0' : 'flex justify-between items-start mb-4'}`}>
        <div className="w-12 h-12 rounded-lg bg-blue-50 text-rio-blue flex items-center justify-center group-hover:bg-rio-blue group-hover:text-white transition-colors duration-300">
          <IconComponent className="w-6 h-6" strokeWidth={1.5} />
        </div>
        
        {!isList && (
          <div className="flex flex-col items-end gap-2">
            <div className="bg-green-50 text-green-700 text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1 border border-green-100">
              <CheckCircle2 className="w-3 h-3" />
              Ativo
            </div>
            {benefit.isNew && (
              <div className="bg-rio-gold text-blue-900 text-[10px] font-bold px-2 py-1 rounded-md shadow-sm">
                NOVO
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Content Section */}
      <div className={`flex-1 ${isList ? 'flex flex-col justify-center' : 'mb-6'}`}>
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-lg font-bold text-gray-800 leading-tight group-hover:text-rio-blue transition-colors">
            {benefit.title}
          </h3>
          {isList && benefit.isNew && (
             <span className="bg-rio-gold text-blue-900 text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm">NOVO</span>
          )}
        </div>
        <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">
          {benefit.description}
        </p>
      </div>
      
      {/* Actions Section */}
      <div className={`${isList ? 'shrink-0 min-w-[200px]' : 'mt-auto'}`}>
        {benefit.dashboardUrl ? (
          // Dashboard Buttons
          <div className="grid grid-cols-2 gap-2">
            <button 
              onClick={(e) => { e.stopPropagation(); onUse(benefit); }}
              className="flex items-center justify-center gap-1 px-2 py-2 rounded-lg bg-blue-50 text-rio-blue border border-transparent text-xs font-bold hover:bg-rio-blue hover:text-white transition-all shadow-sm"
              title={benefit.externalLink ? "Abrir Link Externo" : "Utilizar Serviço"}
            >
              {benefit.externalLink ? 'Acessar' : 'Utilizar'}
              <ArrowRight className="w-3 h-3" />
            </button>
            <button 
              onClick={handleDashboardClick}
              className="flex items-center justify-center gap-1 px-2 py-2 rounded-lg bg-indigo-50 text-indigo-700 border border-transparent text-xs font-bold hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
              title="Ver Dashboard de Dados"
            >
              Dashboard
              <LayoutDashboard className="w-3 h-3" />
            </button>
          </div>
        ) : (
          // Standard Buttons
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={(e) => { e.stopPropagation(); onDetails(benefit); }}
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 text-gray-600 text-xs font-semibold hover:bg-gray-50 hover:text-rio-blue hover:border-rio-blue transition-colors group/btn1"
              title="Ver resumo inteligente"
            >
              <Sparkles className="w-3.5 h-3.5 text-rio-gold" />
              Detalhes
            </button>

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
                {benefit.externalLink ? 'Acessar' : 'Utilizar'}
                {benefit.externalLink ? (
                    <ExternalLink className="w-3.5 h-3.5 group-hover/btn2:translate-x-0.5 transition-transform" />
                ) : (
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn2:translate-x-0.5 transition-transform" />
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BenefitCard;
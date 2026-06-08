
import React from 'react';
import { Benefit } from '../types';
import * as Icons from 'lucide-react';
import { CheckCircle2, ExternalLink, ArrowRight } from 'lucide-react';

interface BenefitCardProps {
  benefit: Benefit;
  onDetails: (benefit: Benefit) => void;
  onUse: (benefit: Benefit) => void;
  layout?: 'grid' | 'list';
}

const BenefitCard: React.FC<BenefitCardProps> = ({ benefit, onUse, layout = 'grid' }) => {
  const IconComponent = (Icons as any)[benefit.iconName] || Icons.HelpCircle;
  const isList = layout === 'list';

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (benefit.downloadUrl) {
      window.open(benefit.downloadUrl, '_blank');
      return;
    }

    onUse(benefit);
  };

  return (
    <div 
      className={`
        bg-white rounded-2xl shadow-[0_14px_45px_-34px_rgba(15,23,42,0.55)] hover:shadow-[0_24px_55px_-34px_rgba(0,74,173,0.5)] 
        border border-slate-200/80 relative transition-all duration-300 group cursor-default overflow-hidden
        ${isList 
          ? 'flex flex-col sm:flex-row sm:items-center p-4 gap-4 h-auto' 
          : 'flex flex-col h-full p-5 min-h-[220px]'}
      `}
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-rio-blue via-blue-500 to-rio-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      
      {isList ? (
        <div className="flex items-center gap-4 w-full flex-1">
            <div className="w-12 h-12 rounded-xl bg-slate-50 text-rio-blue flex items-center justify-center ring-1 ring-slate-200 group-hover:bg-rio-blue group-hover:text-white group-hover:ring-rio-blue transition-all">
                <IconComponent className="w-6 h-6" />
            </div>
            <div className="flex-1">
                <h3 className="text-sm font-black text-slate-900 group-hover:text-rio-blue">
                    {benefit.title}
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed">
                    {benefit.description}
                </p>
            </div>
        </div>
      ) : (
        <>
            <div className="flex justify-between mb-5">
                <div className="w-12 h-12 rounded-xl bg-slate-50 text-rio-blue flex items-center justify-center ring-1 ring-slate-200 group-hover:bg-rio-blue group-hover:text-white group-hover:ring-rio-blue transition-all">
                    <IconComponent className="w-6 h-6" />
                </div>
                <div className="bg-emerald-50 text-emerald-700 text-[10px] px-2.5 py-1 rounded-full flex items-center gap-1 font-bold ring-1 ring-emerald-100">
                    <CheckCircle2 className="w-3 h-3" /> Ativo
                </div>
            </div>
            <div className="mb-6 flex-1">
                <p className="text-[10px] uppercase tracking-[0.16em] font-black text-slate-400 mb-2">{benefit.category}</p>
                <h3 className="text-lg font-black text-slate-900 group-hover:text-rio-blue leading-tight">
                    {benefit.title}
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed mt-2">
                    {benefit.description}
                </p>
            </div>
        </>
      )}

      <div className={`${isList ? 'w-full' : 'mt-auto'}`}>
        <button
          onClick={handleClick}
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-slate-100 text-rio-blue font-black text-xs hover:bg-rio-blue hover:text-white transition-colors"
        >
          {benefit.customCta || 'Acessar'}
          {(benefit.externalLink || benefit.downloadUrl) ? (
            <ExternalLink className="w-3.5 h-3.5" />
          ) : (
            <ArrowRight className="w-3.5 h-3.5" />
          )}
        </button>
      </div>
    </div>
  );
};

export default BenefitCard;

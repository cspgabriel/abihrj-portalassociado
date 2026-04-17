
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
        bg-white rounded-xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.08)] hover:shadow-[0_10px_30px_-4px_rgba(0,74,173,0.15)] 
        border border-gray-100 relative transition-all duration-300 group cursor-default
        ${isList 
          ? 'flex flex-col sm:flex-row sm:items-center p-4 gap-4 h-auto' 
          : 'flex flex-col h-full p-5'}
      `}
    >
      
      {isList ? (
        <div className="flex items-center gap-4 w-full flex-1">
            <div className="w-12 h-12 rounded-lg bg-blue-50 text-rio-blue flex items-center justify-center group-hover:bg-rio-blue group-hover:text-white">
                <IconComponent className="w-6 h-6" />
            </div>
            <div className="flex-1">
                <h3 className="text-sm font-bold text-gray-800 group-hover:text-rio-blue">
                    {benefit.title}
                </h3>
                <p className="text-gray-500 text-xs">
                    {benefit.description}
                </p>
            </div>
        </div>
      ) : (
        <>
            <div className="flex justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-blue-50 text-rio-blue flex items-center justify-center group-hover:bg-rio-blue group-hover:text-white">
                    <IconComponent className="w-6 h-6" />
                </div>
                <div className="bg-green-50 text-green-700 text-[10px] px-2 py-1 rounded-md flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Ativo
                </div>
            </div>
            <div className="mb-6 flex-1">
                <h3 className="text-lg font-bold text-gray-800 group-hover:text-rio-blue">
                    {benefit.title}
                </h3>
                <p className="text-gray-500 text-xs">
                    {benefit.description}
                </p>
            </div>
        </>
      )}

      <div className={`${isList ? 'w-full' : 'mt-auto'}`}>
        <button
          onClick={handleClick}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-blue-50 text-rio-blue font-bold text-xs hover:bg-rio-blue hover:text-white"
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

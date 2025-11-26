import React from 'react';
import { Benefit } from '../types';
import * as Icons from 'lucide-react';

interface BenefitCardProps {
  benefit: Benefit;
  onClick: (benefit: Benefit) => void;
}

const BenefitCard: React.FC<BenefitCardProps> = ({ benefit, onClick }) => {
  // Dynamically resolve icon
  const IconComponent = (Icons as any)[benefit.iconName] || Icons.HelpCircle;

  return (
    <div 
      onClick={() => onClick(benefit)}
      className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100 group flex flex-col h-full"
    >
      {/* Icon Header Area instead of Photo */}
      <div className="h-32 bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-rio-blue/5 rounded-full -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-700" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-rio-gold/10 rounded-full -ml-8 -mb-8" />
        
        <IconComponent className="w-16 h-16 text-rio-blue group-hover:scale-110 transition-transform duration-300 z-10 drop-shadow-sm" strokeWidth={1.5} />
      </div>
      
      <div className="p-6 flex-1 flex flex-col">
        <span className="text-xs font-semibold text-rio-gold uppercase tracking-wider mb-2">
          {benefit.category}
        </span>
        <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-rio-blue transition-colors">
          {benefit.title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-1">
          {benefit.description}
        </p>
        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center text-rio-blue font-medium text-sm">
          <span>Acessar Benefício</span>
          <Icons.ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
};

export default BenefitCard;
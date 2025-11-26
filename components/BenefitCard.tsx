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
      <div className="h-32 overflow-hidden relative">
        <div className="absolute inset-0 bg-rio-blue/20 group-hover:bg-rio-blue/0 transition-colors z-10" />
        <img 
          src={benefit.imageUrl} 
          alt={benefit.title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md z-20">
          <IconComponent className="w-5 h-5 text-rio-blue" />
        </div>
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
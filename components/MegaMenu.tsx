import React from 'react';
import { Benefit, BenefitCategory } from '../types';
import { BENEFITS_DATA } from '../constants';
import * as Icons from 'lucide-react';
import { ChevronRight } from 'lucide-react';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onBenefitClick: (benefit: Benefit) => void;
}

const MegaMenu: React.FC<MegaMenuProps> = ({ isOpen, onClose, onBenefitClick }) => {
  if (!isOpen) return null;

  // Group benefits by category
  const categoriesToDisplay = [
    BenefitCategory.LEGAL,
    BenefitCategory.COMMERCIAL,
    BenefitCategory.OPERATIONAL,
    BenefitCategory.EVENTS,
    BenefitCategory.PARTNERS,
    BenefitCategory.HR
  ];

  return (
    <div 
      className="absolute top-full left-0 w-full bg-white shadow-2xl border-t border-gray-100 z-50 animate-fade-in-down"
      onMouseLeave={onClose}
    >
      <div className="max-w-7xl mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categoriesToDisplay.map((category) => {
            const benefits = BENEFITS_DATA.filter(b => b.category === category).slice(0, 5);
            
            return (
              <div key={category} className="space-y-4">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 pb-2">
                  {category}
                </h3>
                <ul className="space-y-3">
                  {benefits.map((benefit) => {
                    const IconComponent = (Icons as any)[benefit.iconName] || Icons.HelpCircle;
                    return (
                      <li key={benefit.id}>
                        <button
                          onClick={() => {
                            onBenefitClick(benefit);
                            onClose();
                          }}
                          className="flex items-start gap-2 group w-full text-left"
                        >
                          <IconComponent className="w-4 h-4 text-rio-blue mt-0.5 opacity-70 group-hover:opacity-100" />
                          <div className="flex-1">
                             <span className="block text-gray-700 font-medium text-sm group-hover:text-rio-blue transition-colors">
                               {benefit.title}
                             </span>
                             {benefit.isNew && (
                               <span className="text-[10px] text-rio-gold font-bold">Novo</span>
                             )}
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        </button>
                      </li>
                    );
                  })}
                  {BENEFITS_DATA.filter(b => b.category === category).length > 5 && (
                    <li>
                      <span className="text-xs text-blue-500 hover:underline cursor-pointer">Ver todos de {category}</span>
                    </li>
                  )}
                </ul>
              </div>
            );
          })}
        </div>
        
        {/* Footer Promocional do Menu */}
        <div className="mt-8 pt-6 border-t border-gray-100 bg-gray-50 -mx-8 -mb-8 px-8 pb-8 rounded-b-xl flex justify-between items-center">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-rio-blue rounded-lg flex items-center justify-center text-white">
                 <Icons.Star className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800">Clube de Benefícios HoteisRio</h4>
                <p className="text-sm text-gray-500">Mais de 20 serviços exclusivos para associados.</p>
              </div>
           </div>
           <button onClick={onClose} className="text-sm text-rio-blue font-semibold hover:underline">
             Fechar Menu
           </button>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;
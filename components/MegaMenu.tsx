import React from 'react';
import { Benefit, BenefitCategory, Forum } from '../types';
import { BENEFITS_DATA, FORUMS_DATA } from '../constants';
import * as Icons from 'lucide-react';
import { ChevronRight, Star, Users } from 'lucide-react';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onBenefitClick: (benefit: Benefit) => void;
  onForumClick?: (forum: Forum) => void; // Optional if passed, though standard nav might be used
}

const MegaMenu: React.FC<MegaMenuProps> = ({ isOpen, onClose, onBenefitClick, onForumClick }) => {
  if (!isOpen) return null;

  // Group benefits by category
  const categoriesToDisplay = [
    BenefitCategory.LEGAL,
    BenefitCategory.COMMERCIAL,
    BenefitCategory.OPERATIONAL,
    BenefitCategory.EVENTS,
  ];

  return (
    <div 
      className="fixed top-16 left-0 w-full bg-white shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] border-t border-gray-100 z-50 animate-fade-in-down"
      style={{ height: 'auto', maxHeight: '80vh', overflowY: 'auto' }}
      onMouseEnter={() => {}} // Keep open when hovering the menu itself
      onMouseLeave={onClose}
    >
      <div className="max-w-7xl mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Forums Column (Dedicated) */}
          <div className="space-y-4 bg-blue-50/50 p-4 rounded-xl -mt-4 -mb-4">
             <h3 className="text-sm font-bold text-rio-blue uppercase tracking-wider border-b border-blue-100 pb-2 flex items-center gap-2">
               <Users className="w-4 h-4" />
               Fóruns HoteisRio
             </h3>
             <ul className="space-y-3">
               {FORUMS_DATA.map((forum) => {
                 const IconComponent = (Icons as any)[forum.iconName] || Icons.Users;
                 return (
                    <li key={forum.id}>
                      <button
                        onClick={() => {
                          if (onForumClick) onForumClick(forum);
                          onClose();
                        }}
                        className="flex items-center gap-2 group w-full text-left p-1 rounded-lg hover:bg-white transition-colors"
                      >
                         <IconComponent className="w-4 h-4 text-gray-500 group-hover:text-rio-blue" />
                         <span className="text-gray-700 font-medium text-sm group-hover:text-rio-blue transition-colors">{forum.title}</span>
                      </button>
                    </li>
                 );
               })}
             </ul>
          </div>

          {/* Standard Benefit Categories */}
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
                          className="flex items-start gap-2 group w-full text-left p-1 rounded-lg hover:bg-gray-50 transition-colors"
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
                      <span className="text-xs text-blue-500 hover:underline cursor-pointer ml-1">Ver todos de {category}</span>
                    </li>
                  )}
                </ul>
              </div>
            );
          })}
        </div>
        
        {/* Footer Promocional do Menu */}
        <div className="mt-8 pt-6 border-t border-gray-100 bg-gray-50 -mx-8 -mb-8 px-8 pb-8 flex justify-between items-center">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-rio-blue rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-200">
                 <Star className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800">Clube de Benefícios HoteisRio</h4>
                <p className="text-sm text-gray-500">Mais de 20 serviços exclusivos para associados.</p>
              </div>
           </div>
           <button onClick={onClose} className="text-sm text-rio-blue font-semibold hover:underline bg-white px-4 py-2 rounded-lg border border-blue-100 shadow-sm">
             Fechar Menu
           </button>
        </div>
      </div>
      
      {/* Backdrop for outside click simulation if needed, though mouseleave handles desktop */}
      <div className="absolute inset-0 -z-10 bg-white" />
    </div>
  );
};

export default MegaMenu;
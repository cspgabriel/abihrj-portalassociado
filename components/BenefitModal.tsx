import React from 'react';
import { Benefit } from '../types';
import { X, ArrowRight } from 'lucide-react';
import * as Icons from 'lucide-react';

interface BenefitModalProps {
  benefit: Benefit | null;
  onClose: () => void;
}

const BenefitModal: React.FC<BenefitModalProps> = ({ benefit, onClose }) => {
  if (!benefit) return null;

  const IconComponent = (Icons as any)[benefit.iconName] || Icons.HelpCircle;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto flex flex-col animate-scale-in">
        
        {/* Header Icon Area */}
        <div className="relative h-40 bg-rio-blue shrink-0 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-rio-blue to-blue-900 opacity-90" />
          
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-10 -mb-10" />

          <IconComponent className="w-20 h-20 text-white/90 relative z-10 drop-shadow-lg" strokeWidth={1.5} />

          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full backdrop-blur-md transition z-20"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="flex items-center gap-3 mb-6">
             <span className="bg-rio-gold text-blue-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
               {benefit.category}
             </span>
             <h2 className="text-2xl font-bold text-gray-800">{benefit.title}</h2>
          </div>

          <div className="mb-8">
             <h3 className="text-sm font-bold text-gray-400 uppercase mb-2 tracking-wider">Sobre o Benefício</h3>
             <p className="text-gray-700 text-lg leading-relaxed">{benefit.description}</p>
          </div>

          <div className="mt-8 flex justify-end gap-3 pt-6 border-t border-gray-100">
            <button 
              onClick={onClose}
              className="px-5 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 font-medium transition"
            >
              Fechar
            </button>
            <button className="px-5 py-2.5 rounded-lg bg-rio-blue hover:bg-blue-700 text-white font-medium shadow-lg shadow-blue-200 transition flex items-center gap-2">
              Solicitar Uso
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenefitModal;

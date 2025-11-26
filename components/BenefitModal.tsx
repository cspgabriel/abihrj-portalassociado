import React, { useEffect, useState } from 'react';
import { Benefit } from '../types';
import { X, Sparkles, Loader2, ArrowRight } from 'lucide-react';
import { generateBenefitDetails } from '../services/geminiService';

interface BenefitModalProps {
  benefit: Benefit | null;
  onClose: () => void;
}

const BenefitModal: React.FC<BenefitModalProps> = ({ benefit, onClose }) => {
  const [aiDescription, setAiDescription] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (benefit) {
      setLoading(true);
      // Call Gemini to generate a tailored description
      generateBenefitDetails(benefit.title)
        .then(text => setAiDescription(text))
        .finally(() => setLoading(false));
    } else {
      setAiDescription('');
    }
  }, [benefit]);

  if (!benefit) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto flex flex-col animate-scale-in">
        
        {/* Header Image */}
        <div className="relative h-48 sm:h-64 shrink-0">
          <img 
            src={benefit.imageUrl} 
            alt={benefit.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full backdrop-blur-md transition"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-6 left-6 text-white">
            <span className="bg-rio-gold text-blue-900 text-xs font-bold px-2 py-1 rounded mb-2 inline-block">
              {benefit.category}
            </span>
            <h2 className="text-3xl font-bold">{benefit.title}</h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="mb-6">
             <h3 className="text-lg font-semibold text-gray-900 mb-2">Descrição Rápida</h3>
             <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
          </div>

          {/* AI Section */}
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-100 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
                <Sparkles className="w-24 h-24 text-rio-blue" />
             </div>
             
             <div className="flex items-center gap-2 mb-4">
               <Sparkles className="w-5 h-5 text-rio-blue" />
               <h3 className="text-lg font-bold text-rio-blue">Detalhes Inteligentes</h3>
             </div>

             {loading ? (
               <div className="flex flex-col items-center justify-center py-8 text-blue-400">
                 <Loader2 className="w-8 h-8 animate-spin mb-2" />
                 <p className="text-sm">Gerando explicação personalizada...</p>
               </div>
             ) : (
               <div className="prose prose-blue text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                 {aiDescription}
               </div>
             )}
          </div>

          <div className="mt-8 flex justify-end gap-3">
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
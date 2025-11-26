import React, { useEffect, useState } from 'react';
import { Benefit } from '../types';
import { ArrowLeft, Sparkles, CheckCircle2, FileText, Info, Loader2, ExternalLink } from 'lucide-react';
import * as Icons from 'lucide-react';
import { generateBenefitDetails } from '../services/geminiService';

interface BenefitPageProps {
  benefit: Benefit;
  onBack: () => void;
  onUse: (benefit: Benefit) => void;
}

const BenefitPage: React.FC<BenefitPageProps> = ({ benefit, onBack, onUse }) => {
  const [aiAnalysis, setAiAnalysis] = useState('');
  const [loadingAi, setLoadingAi] = useState(false);
  const IconComponent = (Icons as any)[benefit.iconName] || Icons.HelpCircle;

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    // Load AI insight
    setLoadingAi(true);
    generateBenefitDetails(benefit.title)
      .then(text => setAiAnalysis(text))
      .catch(() => setAiAnalysis("Não foi possível carregar a análise inteligente no momento."))
      .finally(() => setLoadingAi(false));
  }, [benefit]);

  return (
    <div className="bg-white min-h-screen pb-12 animate-fade-in">
      {/* Hero Header */}
      <div className="bg-rio-blue text-white py-12 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full -ml-10 -mb-10 blur-2xl" />
        
        <div className="max-w-5xl mx-auto relative z-10">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-blue-200 hover:text-white transition-colors mb-8 group"
          >
            <div className="p-1 rounded-full bg-blue-800/50 group-hover:bg-blue-700 transition">
               <ArrowLeft className="w-5 h-5" />
            </div>
            <span className="font-medium">Voltar para o Dashboard</span>
          </button>

          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-xl">
              <IconComponent className="w-16 h-16 text-rio-gold" strokeWidth={1.5} />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-rio-gold text-blue-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  {benefit.category}
                </span>
                {benefit.isService && (
                   <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide flex items-center gap-1">
                     <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                     Serviço Online
                   </span>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{benefit.title}</h1>
              <p className="text-blue-100 text-lg md:text-xl max-w-2xl leading-relaxed">
                {benefit.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (Content) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Section: How it works */}
          <div className="bg-white border border-gray-100 rounded-xl p-6 md:p-8 shadow-sm">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-6">
              <Info className="w-5 h-5 text-rio-blue" />
              Como Funciona
            </h2>
            <div className="prose prose-blue text-gray-600 leading-relaxed">
              <p>
                O benefício <strong>{benefit.title}</strong> é uma das iniciativas da HoteisRio para fortalecer 
                a hotelaria carioca. Este serviço foi desenhado para atender às necessidades específicas 
                da categoria {benefit.category.toLowerCase()}, oferecendo suporte prático e estratégico.
              </p>
              <p className="mt-4">
                Ao utilizar este recurso, seu hotel ganha agilidade nos processos e acesso a informações 
                privilegiadas do setor, garantindo maior competitividade no mercado do Rio de Janeiro.
              </p>
            </div>
          </div>

          {/* Section: Usage Steps */}
          {benefit.usageSteps && benefit.usageSteps.length > 0 && (
            <div className="bg-white border border-gray-100 rounded-xl p-6 md:p-8 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-6">
                <FileText className="w-5 h-5 text-rio-blue" />
                Como Utilizar: Passo a Passo
              </h2>
              <div className="space-y-6">
                {benefit.usageSteps.map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-rio-blue text-white flex items-center justify-center font-bold text-sm shadow-md">
                      {index + 1}
                    </div>
                    <div className="pt-1">
                      <p className="text-gray-700 leading-relaxed">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

           {/* Section: AI Insight (Moved to Bottom) */}
           <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-xl p-6 md:p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 opacity-10">
              <Sparkles className="w-32 h-32 text-rio-blue" />
            </div>
            
            <div className="flex items-center gap-3 mb-4 relative z-10">
              <div className="bg-white p-2 rounded-lg shadow-sm">
                <Sparkles className="w-5 h-5 text-rio-gold" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Vantagens & Insights</h2>
            </div>

            {loadingAi ? (
              <div className="flex items-center gap-3 text-gray-500 py-4">
                <Loader2 className="w-5 h-5 animate-spin text-rio-blue" />
                <span className="text-sm">Gerando análise de vantagens via IA...</span>
              </div>
            ) : (
              <div className="text-gray-700 leading-relaxed whitespace-pre-line relative z-10 text-sm md:text-base bg-white/60 p-4 rounded-lg border border-white/50">
                {aiAnalysis}
              </div>
            )}
            <p className="text-[10px] text-gray-400 mt-4 text-right">Powered by Gemini AI</p>
          </div>

        </div>

        {/* Right Column (Actions & Info) */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] border border-gray-100 p-6 sticky top-24">
            <h3 className="font-bold text-gray-800 mb-4 text-lg">Ações Disponíveis</h3>
            
            <button 
              onClick={() => onUse(benefit)}
              className="w-full bg-rio-blue hover:bg-blue-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-blue-200 transition-all transform active:scale-95 flex items-center justify-center gap-2 mb-4"
            >
              {benefit.isService ? 'Acessar Serviço Agora' : 'Solicitar Benefício'}
              <ExternalLink className="w-4 h-4" />
            </button>

            <div className="text-xs text-gray-500 text-center px-4 leading-relaxed">
              {benefit.isService 
                ? "Este botão abrirá a ferramenta oficial ou formulário de solicitação em uma nova janela ou modal." 
                : "Ao solicitar, nossa equipe entrará em contato com você para dar prosseguimento."}
            </div>

            <hr className="my-6 border-gray-100" />

            <h4 className="font-semibold text-gray-700 text-sm mb-3">Dúvidas?</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>Atendimento 24/7 via Portal</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>Suporte Jurídico incluso</span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BenefitPage;
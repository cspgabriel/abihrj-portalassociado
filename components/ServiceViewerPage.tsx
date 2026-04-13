import React, { useState } from 'react';
import { ArrowLeft, ExternalLink, Play, XCircle } from 'lucide-react';
import { Benefit } from '../types';

interface ServiceViewerPageProps {
  benefit: Benefit;
  onBack: () => void;
}

const ServiceViewerPage: React.FC<ServiceViewerPageProps> = ({ benefit, onBack }) => {
  const [showIframe, setShowIframe] = useState(false);

  // URL fallback logic
  const url = benefit.embedUrl || benefit.dashboardUrl || benefit.externalLink;
  const imagePath = `/screenshots/${benefit.id}.png`;

  if (!url && !benefit.downloadUrl) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-gray-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg">
           <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
           <h2 className="text-xl font-bold text-gray-800 mb-2">Serviço não disponível</h2>
           <p className="text-gray-600 mb-6">Este benefício não possui um link válido configurado.</p>
           <button onClick={onBack} className="bg-rio-blue text-white px-6 py-2 rounded-lg">Voltar</button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full bg-gray-50 overflow-y-auto animate-fade-in custom-scrollbar">
      {/* Header bar */}
      <div className="bg-white border-b px-6 py-4 flex items-center justify-between shadow-sm shrink-0 sticky top-0 z-20">
         <button onClick={onBack} className="flex items-center gap-2 text-gray-600 hover:text-rio-blue transition-colors font-medium">
            <ArrowLeft className="w-5 h-5" />
            Voltar
         </button>
         {showIframe && (
             <button onClick={() => setShowIframe(false)} className="text-sm font-bold text-rio-blue hover:text-blue-800">
               Ver Detalhes do Benefício
             </button>
         )}
      </div>

      {!showIframe ? (
        <div className="flex-1 flex flex-col items-center">
            {/* Top Blue Hero Section */}
            <div className="w-full bg-gradient-to-br from-rio-blue to-blue-900 text-white pt-16 pb-32 px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">{benefit.title}</h1>
                    <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
                        {benefit.fullDetails || benefit.description}
                    </p>
                    
                    <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                        {url && (
                          <button 
                            onClick={() => setShowIframe(true)}
                            className="bg-white text-rio-blue px-8 py-3.5 rounded-full font-bold shadow-xl hover:scale-105 transition-transform flex items-center gap-2"
                          >
                            <Play className="w-5 h-5" fill="currentColor" />
                            Acessar Ferramenta
                          </button>
                        )}
                        {benefit.externalLink && url !== benefit.externalLink && (
                          <a 
                            href={benefit.externalLink} target="_blank" rel="noopener noreferrer"
                            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-8 py-3.5 rounded-full font-bold transition-colors flex items-center gap-2 border border-white/30"
                          >
                            Abrir em Nova Aba
                            <ExternalLink className="w-5 h-5" />
                          </a>
                        )}
                        {benefit.downloadUrl && (
                          <a 
                            href={benefit.downloadUrl} target="_blank" rel="noopener noreferrer"
                            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-8 py-3.5 rounded-full font-bold transition-colors flex items-center gap-2 border border-white/30"
                          >
                            Baixar Arquivos
                            <ExternalLink className="w-5 h-5" />
                          </a>
                        )}
                    </div>
                </div>
            </div>

            {/* Print/Screenshot Display over negative margin */}
            <div className="max-w-5xl mx-auto w-full px-6 -mt-20 relative z-10 mb-16">
                <div className="bg-white rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.3)] p-2 md:p-4 border border-gray-100 aspect-video relative flex items-center justify-center bg-gray-50 overflow-hidden">
                   <img 
                      src={imagePath} 
                      alt={`Print do sistema: ${benefit.title}`}
                      className="w-full h-full object-cover object-top rounded-xl border border-gray-200"
                      onError={(e) => {
                          e.currentTarget.src = benefit.imageUrl || 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200';
                      }}
                   />
                </div>
            </div>

            {/* Additional details */}
            <div className="max-w-4xl mx-auto px-6 mb-24 text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Por que utilizar este benefício?</h3>
                <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto">
                    A Hotelaria do Rio de Janeiro se fortalece com o uso contínuo de ferramentas integradas. Este sistema foi desenvolvido e curado especificamente para otimizar a sua rotina, melhorar seus resultados comerciais e garantir a máxima conformidade legal e gerencial para o seu empreendimento.
                </p>
            </div>
        </div>
      ) : (
        <div className="flex-1 w-full h-full bg-gray-100 relative">
            <iframe 
                src={url}
                className="w-full h-full border-none bg-white"
                allowFullScreen
            />
        </div>
      )}
    </div>
  );
};

export default ServiceViewerPage;


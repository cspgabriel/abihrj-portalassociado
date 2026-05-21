
import React, { useState, useEffect } from 'react';
import { ArrowLeft, ExternalLink, RefreshCw, XCircle, Rocket, Users, Info, X } from 'lucide-react';
import { Benefit } from '../types';

interface ServiceViewerPageProps {
  benefit: Benefit;
  onBack: () => void;
}

const ServiceViewerPage: React.FC<ServiceViewerPageProps> = ({ benefit, onBack }) => {
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);

  useEffect(() => {
    // Force scroll main content to top instantly
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
        mainContent.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [benefit]);

  // Determine URL: Prefer embedUrl, then dashboardUrl, then externalLink
  const url = benefit.embedUrl || benefit.dashboardUrl || benefit.externalLink;

  if (benefit.id === 'portal-rh-future') {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-gray-50 min-h-[60vh]">
         <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md mx-auto">
         <div className="bg-purple-50 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <Users className="w-10 h-10 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Em Breve!</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
            Estamos finalizando o novo Portal de RH, onde você terá acesso direto a milhares de curriculos filtrados por cargo e regiao.
            </p>
            <button 
                onClick={onBack} 
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-8 py-3 rounded-xl transition-all shadow-md"
            >
                Voltar
            </button>
         </div>
      </div>
    )
  }

  if (!url) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-gray-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg">
           <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
           <h2 className="text-xl font-bold text-gray-800 mb-2">Link não disponível</h2>
           <p className="text-gray-600 mb-6">Este serviço não possui uma URL válida configurada.</p>
           <button onClick={onBack} className="bg-rio-blue text-white px-6 py-2 rounded-lg">Voltar</button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full bg-gray-100 animate-fade-in">
      {/* Header Bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm shrink-0">
         <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-full text-gray-600 transition-colors"
              title="Voltar"
            >
               <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex flex-col">
               <h1 className="font-bold text-gray-800 text-sm md:text-base leading-tight">{benefit.title}</h1>
               <span className="text-xs text-gray-500 hidden md:block">Navegador Seguro HoteisRio</span>
            </div>
         </div>

         <div className="flex items-center gap-3">
            <button 
               onClick={() => { setLoading(true); const iframe = document.getElementById('service-frame') as HTMLIFrameElement; if(iframe) iframe.src = iframe.src; }}
               className="p-2 hover:bg-gray-100 rounded-full text-gray-500 hidden md:block"
               title="Recarregar"
            >
               <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            
            {benefit.fullDetails && (
              <button
                onClick={() => setShowInfoModal(true)}
                className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-bold hover:bg-indigo-100 transition-colors"
              >
                <Info className="w-3 h-3" />
                Mais Informações
              </button>
            )}

            <a 
               href={url} 
               target="_blank" 
               rel="noopener noreferrer"
               className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-rio-blue rounded-lg text-xs font-bold hover:bg-blue-100 transition-colors"
            >
               Abrir em Nova Janela
               <ExternalLink className="w-3 h-3" />
            </a>
         </div>
      </div>

      {/* Info Modal */}
      {showInfoModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in" onClick={() => setShowInfoModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Info className="w-5 h-5 text-rio-blue" />
                <h2 className="text-lg font-bold text-gray-800">{benefit.title}</h2>
              </div>
              <button onClick={() => setShowInfoModal(false)} className="p-1.5 hover:bg-gray-100 rounded-full text-gray-500 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line text-sm text-justify">
                {benefit.fullDetails}
              </p>
            </div>
            <div className="p-4 border-t border-gray-100 flex justify-end">
              <button onClick={() => setShowInfoModal(false)} className="px-5 py-2 bg-rio-blue text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors">
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Iframe Container */}
      <div className="flex-1 relative bg-white overflow-hidden">
         {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
               <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 border-4 border-rio-blue border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-sm text-gray-500 font-medium">Carregando serviço...</p>
               </div>
            </div>
         )}
         
         <iframe
            id="service-frame"
            src={url}
            title={benefit.title}
            className="w-full h-full border-0 block"
            onLoad={() => setLoading(false)}
            onError={() => setLoadError(true)}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-presentation"
            allowFullScreen
         />
      </div>
    </div>
  );
};

export default ServiceViewerPage;

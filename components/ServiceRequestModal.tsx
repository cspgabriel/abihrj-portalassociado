import React from 'react';
import { X, AlertTriangle, ShieldCheck, LayoutDashboard } from 'lucide-react';
import { Benefit } from '../types';

interface ServiceRequestModalProps {
  benefit: Benefit;
  onClose: () => void;
}

const ServiceRequestModal: React.FC<ServiceRequestModalProps> = ({ benefit, onClose }) => {
  const isLegal = benefit.id === 'juridico-01';
  
  // URLs dos Formulários Zoho
  const PUBLIC_ORDER_FORM_URL = "https://forms.zohopublic.com/hoteisrio/form/FORMULRIODEDEMANDASORDEMPBLICA/formperma/w7kNge34KkPE0pW9ocbnDA94ax7dElQK84wqpNtKIo8";
  const LEGAL_FORM_URL = "https://forms.zohopublic.com/hoteisrio/form/AssessoriaJuridicaHotisRIO/formperma/fu39bcu4m02hW1cSina-onTXjx9GomFvznNKYqkP0j8";

  const currentUrl = isLegal ? LEGAL_FORM_URL : PUBLIC_ORDER_FORM_URL;

  const handleDashboardClick = () => {
    if (benefit.dashboardUrl) {
      window.open(benefit.dashboardUrl, '_blank');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full flex flex-col animate-scale-in max-h-[90vh] max-w-4xl h-[85vh]">
        
        {/* Header */}
        <div className={`p-4 sm:p-6 rounded-t-2xl flex justify-between items-center text-white shrink-0 ${isLegal ? 'bg-slate-800' : 'bg-red-700'}`}>
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              {isLegal ? <ShieldCheck className="w-6 h-6" /> : <AlertTriangle className="w-6 h-6" />}
            </div>
            <div>
              <h2 className="text-xl font-bold">{isLegal ? 'Assessoria Jurídica' : 'Reportar Ordem Pública'}</h2>
              <p className="text-xs opacity-80">
                {isLegal ? 'Formulário Oficial Jurídico' : 'Formulário Oficial de Demandas'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
             {benefit.dashboardUrl && (
               <button 
                 onClick={handleDashboardClick}
                 className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors"
               >
                 <LayoutDashboard className="w-4 h-4" />
                 Acessar Dashboard
               </button>
             )}
             <button onClick={onClose} className="text-white/80 hover:text-white transition">
               <X className="w-6 h-6" />
             </button>
          </div>
        </div>

        {/* Content Body - Iframe */}
        <div className="flex-1 overflow-hidden bg-gray-50 rounded-b-2xl">
            <iframe 
              src={currentUrl}
              title={isLegal ? "Formulário Jurídico" : "Formulário Ordem Pública"}
              className="w-full h-full border-0"
              allowFullScreen
            />
        </div>
      </div>
    </div>
  );
};

export default ServiceRequestModal;
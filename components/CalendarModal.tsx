import React from 'react';
import { X, Calendar, MapPin, ExternalLink, FileSpreadsheet, BarChart3 } from 'lucide-react';

interface CalendarModalProps {
  onClose: () => void;
}

const CalendarModal: React.FC<CalendarModalProps> = ({ onClose }) => {
  const POWER_BI_URL = "https://app.powerbi.com/view?r=eyJrIjoiYTg4NGM2ODEtNDI2NC00NTY2LWFmNGQtOGQ2NDEwMmQyYWVhIiwidCI6IjlhOTczNzc1LWViMzQtNDhkOS05MjYzLWY3Mjg4ZGY5OTlmZSJ9";
  const SHAREPOINT_URL = "https://hoteisrio01.sharepoint.com/:l:/s/eventos/FEDGU6znFLlAt_o0YN9i0wkBFGidC57rPNgttk5mcr669A?e=N2tROv";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col animate-scale-in overflow-hidden">
        
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4 sm:p-5 flex justify-between items-center shrink-0">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2 text-gray-800">
              <Calendar className="w-6 h-6 text-rio-blue" />
              Calendário de Eventos Rio
            </h2>
            <p className="text-gray-500 text-sm mt-1 hidden sm:block">
              Visualização interativa de inteligência de mercado e grandes eventos.
            </p>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content - Power BI Iframe */}
        <div className="flex-1 bg-gray-100 relative">
          <iframe 
            title="Rio Events Power BI"
            src={POWER_BI_URL}
            className="absolute inset-0 w-full h-full border-0"
            allowFullScreen={true}
          />
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-white border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4 shrink-0">
           <div className="flex items-center gap-2 text-sm text-gray-500">
              <BarChart3 className="w-4 h-4 text-rio-gold" />
              <span className="hidden sm:inline">Painel interativo atualizado em tempo real.</span>
           </div>

           <div className="flex gap-3 w-full sm:w-auto">
             <button 
               onClick={onClose}
               className="hidden sm:block px-5 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 font-medium transition"
             >
               Fechar
             </button>
             
             <a 
               href={SHAREPOINT_URL}
               target="_blank"
               rel="noopener noreferrer"
               className="flex-1 sm:flex-none justify-center px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow-md transition flex items-center gap-2"
             >
               <FileSpreadsheet className="w-4 h-4" />
               Lista Excel / SharePoint
               <ExternalLink className="w-3 h-3 opacity-70" />
             </a>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarModal;
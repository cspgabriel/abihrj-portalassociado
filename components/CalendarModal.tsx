import React from 'react';
import { X, Calendar, MapPin, Tag } from 'lucide-react';
import { RIO_EVENTS } from '../constants';

interface CalendarModalProps {
  onClose: () => void;
}

const CalendarModal: React.FC<CalendarModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col animate-scale-in">
        
        {/* Header */}
        <div className="bg-rio-blue text-white p-6 flex justify-between items-start shrink-0">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Calendar className="w-6 h-6 text-rio-gold" />
              Calendário de Eventos Rio
            </h2>
            <p className="text-blue-200 mt-1">Planeje sua tarifa e ocupação com base nos grandes eventos da cidade.</p>
          </div>
          <button 
            onClick={onClose}
            className="text-blue-200 hover:text-white hover:bg-white/10 p-2 rounded-full transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* List */}
        <div className="overflow-y-auto p-6 bg-gray-50 flex-1">
          <div className="grid gap-4">
            {RIO_EVENTS.map((event) => (
              <div key={event.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4 hover:shadow-md transition">
                <div className="w-full sm:w-48 h-32 shrink-0 rounded-lg overflow-hidden">
                  <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                   <div className="flex items-center gap-2 mb-2">
                     <span className="bg-blue-50 text-rio-blue text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wide">
                        {event.type}
                     </span>
                   </div>
                   <h3 className="text-lg font-bold text-gray-800 mb-1">{event.title}</h3>
                   
                   <div className="space-y-1 mt-2">
                     <div className="flex items-center gap-2 text-sm text-gray-600">
                       <Calendar className="w-4 h-4 text-rio-gold" />
                       <span>{event.date}</span>
                     </div>
                     <div className="flex items-center gap-2 text-sm text-gray-600">
                       <MapPin className="w-4 h-4 text-gray-400" />
                       <span>{event.location}</span>
                     </div>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-gray-200 flex justify-end">
           <button 
             onClick={onClose}
             className="px-6 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition"
           >
             Fechar
           </button>
        </div>
      </div>
    </div>
  );
};

export default CalendarModal;
import React, { useState } from 'react';
import { ArrowLeft, Calendar, MapPin, Clock, Users, CalendarPlus, ChevronDown } from 'lucide-react';
import { ASSOCIATION_EVENTS } from '../constants';

interface AssociationEventsPageProps {
  onBack: () => void;
}

const AssociationEventsPage: React.FC<AssociationEventsPageProps> = ({ onBack }) => {
  const [openCalendarId, setOpenCalendarId] = useState<string | null>(null);

  const toggleCalendarDropdown = (id: string) => {
    setOpenCalendarId(openCalendarId === id ? null : id);
  };

  const getEventDateObject = (dateStr: string) => {
    // Basic parser for "15 de Maio, 09:00" assuming current year
    const parts = dateStr.split(', ');
    const dayMonth = parts[0].split(' de ');
    const time = parts[1];
    const day = parseInt(dayMonth[0]);
    const monthName = dayMonth[1].toLowerCase();
    
    const months: {[key: string]: number} = {
        'janeiro': 0, 'fevereiro': 1, 'março': 2, 'abril': 3, 'maio': 4, 'junho': 5,
        'julho': 6, 'agosto': 7, 'setembro': 8, 'outubro': 9, 'novembro': 10, 'dezembro': 11
    };
    
    const date = new Date();
    date.setDate(day);
    date.setMonth(months[monthName] || 0);
    const [hours, minutes] = time.split(':');
    date.setHours(parseInt(hours), parseInt(minutes), 0);
    
    return date;
  };

  const generateCalendarLinks = (event: any) => {
    const start = getEventDateObject(event.date);
    const end = new Date(start.getTime() + 2 * 60 * 60 * 1000); // Assume 2 hours duration
    
    const formatTime = (date: Date) => date.toISOString().replace(/-|:|\.\d+/g, '');

    const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${formatTime(start)}/${formatTime(end)}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;
    
    const outlookUrl = `https://outlook.live.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent&startdt=${start.toISOString()}&enddt=${end.toISOString()}&subject=${encodeURIComponent(event.title)}&body=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;

    return { googleUrl, outlookUrl };
  };

  return (
    <div className="animate-fade-in">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-gray-500 hover:text-rio-blue transition mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        Voltar para o Dashboard
      </button>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-8 overflow-hidden">
        <div className="bg-rio-blue p-8 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-3xl font-bold mb-2">Agenda ABIH-RJ</h1>
            <p className="text-blue-100">Fóruns, reuniões setoriais e workshops exclusivos para associados.</p>
          </div>
          <Calendar className="absolute right-8 top-1/2 -translate-y-1/2 w-32 h-32 text-white/10" />
        </div>

        <div className="p-6 md:p-8">
          <div className="space-y-6">
            {ASSOCIATION_EVENTS.map((event) => {
              const links = generateCalendarLinks(event);
              
              return (
              <div key={event.id} className="flex flex-col md:flex-row gap-6 border-b border-gray-100 pb-6 last:border-0 last:pb-0 group relative">
                {/* Date Block */}
                <div className="shrink-0 flex md:flex-col items-center justify-center md:w-24 bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
                  <span className="text-2xl font-bold text-rio-blue block">
                    {event.date.split(' ')[0]}
                  </span>
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                    {event.date.split(' ')[2]?.replace(',', '') || 'MAI'}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-rio-blue transition-colors">
                      {event.title}
                    </h3>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                      event.status === 'Confirmado' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-rio-blue'
                    }`}>
                      {event.status}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {event.description}
                  </p>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-rio-gold" />
                      {event.date.split(', ')[1]}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-rio-gold" />
                      {event.location}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-rio-gold" />
                      Exclusivo Associados
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 items-end">
                  <button className="w-full md:w-auto px-6 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:border-rio-blue hover:text-rio-blue hover:bg-blue-50 transition-colors text-sm">
                    Confirmar Presença
                  </button>
                  
                  <div className="relative">
                    <button 
                      onClick={() => toggleCalendarDropdown(event.id)}
                      className="flex items-center gap-2 text-xs font-bold text-rio-blue hover:text-blue-700 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition"
                    >
                      <CalendarPlus className="w-4 h-4" />
                      Adicionar à Agenda
                      <ChevronDown className="w-3 h-3" />
                    </button>
                    
                    {openCalendarId === event.id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 z-50 animate-fade-in-down">
                        <a 
                          href={links.googleUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-rio-blue"
                        >
                          Google Calendar
                        </a>
                        <a 
                          href={links.outlookUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-rio-blue"
                        >
                          Outlook / Office 365
                        </a>
                        <button 
                          onClick={() => alert('Arquivo .ics gerado (simulação)')}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-rio-blue"
                        >
                          Apple Calendar (.ics)
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )})}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssociationEventsPage;
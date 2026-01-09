
import React, { useState } from 'react';
import { ArrowLeft, Search, Image as ImageIcon, ExternalLink, Calendar, X, Clock, Maximize2, RefreshCw } from 'lucide-react';
import { GALLERY_EVENTS } from '../constants';

interface PhotoGalleryPageProps {
  onBack: () => void;
}

const PhotoGalleryPage: React.FC<PhotoGalleryPageProps> = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  
  // Estado para controlar o evento selecionado para visualização interna
  const [selectedEvent, setSelectedEvent] = useState<typeof GALLERY_EVENTS[0] | null>(null);
  const [isLoadingIframe, setIsLoadingIframe] = useState(true);

  const filteredEvents = GALLERY_EVENTS.filter(event => 
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEventClick = (event: typeof GALLERY_EVENTS[0]) => {
    if (event.driveLink) {
      setSelectedEvent(event);
      setIsLoadingIframe(true);
    } else {
      setShowPopup(true);
    }
  };

  const closeViewer = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-12 animate-fade-in relative">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white pt-8 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -mr-20 -mt-20 blur-2xl" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-blue-200 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar para Dashboard
          </button>

          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-xl">
              <ImageIcon className="w-16 h-16 text-rio-gold" strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Galeria de Fotos</h1>
              <p className="text-blue-100 text-lg md:text-xl max-w-2xl leading-relaxed">
                Reviva os melhores momentos dos eventos, fóruns e celebrações do HoteisRio. Baixe fotos oficiais em alta qualidade.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-10 relative z-20">
        
        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
           <div className="relative w-full">
              <input 
                type="text"
                placeholder="Buscar evento por nome..."
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rio-blue outline-none transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
           </div>
           <div className="text-sm text-gray-500 font-medium whitespace-nowrap hidden md:block">
              {filteredEvents.length} álbuns encontrados
           </div>
        </div>

        {/* Gallery Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredEvents.map((event) => (
              <div 
                key={event.id}
                onClick={() => handleEventClick(event)}
                className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer group hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Cover Image */}
                <div className="h-48 overflow-hidden relative bg-gray-100">
                   {event.coverUrl ? (
                        <>
                            <div className="absolute inset-0 bg-gray-200 animate-pulse" /> {/* Placeholder */}
                            <img 
                                src={event.coverUrl} 
                                alt={event.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 relative z-10"
                                loading="lazy"
                            />
                        </>
                   ) : (
                        <div className="w-full h-full flex items-center justify-center relative z-10 bg-gray-50 group-hover:scale-110 transition-transform duration-700">
                            <ImageIcon className="w-12 h-12 text-gray-300" />
                        </div>
                   )}
                   
                   <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors z-20 flex items-center justify-center">
                      <Maximize2 className="text-white w-8 h-8 opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300 drop-shadow-lg" />
                   </div>
                   
                   {/* Date Badge */}
                   <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-gray-700 z-30 flex items-center gap-1 shadow-sm">
                      <Calendar className="w-3 h-3 text-rio-blue" />
                      {event.date}
                   </div>
                </div>

                {/* Info */}
                <div className="p-5">
                   <h3 className="font-bold text-gray-800 text-lg mb-2 line-clamp-2 group-hover:text-rio-blue transition-colors">
                     {event.title}
                   </h3>
                   <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                      <ImageIcon className="w-4 h-4" />
                      {event.photosCount} fotos disponíveis
                   </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
             <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
             <h3 className="text-lg font-bold text-gray-600 mb-1">Nenhum evento encontrado</h3>
             <p className="text-gray-400 text-sm">Tente buscar por outro nome ou data.</p>
          </div>
        )}

      </div>

      {/* Internal Viewer Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex flex-col bg-gray-100 animate-fade-in">
           {/* Viewer Header */}
           <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm shrink-0 z-50">
              <div className="flex items-center gap-4">
                 <button 
                   onClick={closeViewer}
                   className="p-2 hover:bg-gray-100 rounded-full text-gray-600 transition-colors"
                   title="Fechar Galeria"
                 >
                    <ArrowLeft className="w-5 h-5" />
                 </button>
                 <div className="flex flex-col">
                    <h1 className="font-bold text-gray-800 text-sm md:text-base leading-tight line-clamp-1">{selectedEvent.title}</h1>
                    <span className="text-xs text-gray-500 hidden md:block">Visualizador de Fotos HoteisRio</span>
                 </div>
              </div>

              <div className="flex items-center gap-3">
                 <button 
                    onClick={() => { setIsLoadingIframe(true); const iframe = document.getElementById('gallery-frame') as HTMLIFrameElement; if(iframe) iframe.src = iframe.src; }}
                    className="p-2 hover:bg-gray-100 rounded-full text-gray-500 hidden md:block"
                    title="Recarregar"
                 >
                    <RefreshCw className={`w-4 h-4 ${isLoadingIframe ? 'animate-spin' : ''}`} />
                 </button>
                 
                 <a 
                    href={selectedEvent.driveLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-rio-blue text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition-colors shadow-sm"
                 >
                    Abrir em Nova Aba
                    <ExternalLink className="w-3 h-3" />
                 </a>
              </div>
           </div>

           {/* Iframe Content */}
           <div className="flex-1 relative bg-white overflow-hidden">
              {isLoadingIframe && (
                 <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
                    <div className="flex flex-col items-center gap-3">
                       <div className="w-8 h-8 border-4 border-rio-blue border-t-transparent rounded-full animate-spin"></div>
                       <p className="text-sm text-gray-500 font-medium">Carregando galeria...</p>
                    </div>
                 </div>
              )}
              
              <iframe 
                 id="gallery-frame"
                 src={selectedEvent.driveLink}
                 title={selectedEvent.title}
                 className="w-full h-full border-0 block"
                 onLoad={() => setIsLoadingIframe(false)}
                 allowFullScreen
              />
              
              {/* Fallback Message for X-Frame-Options blocking */}
              {!isLoadingIframe && (
                 <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white text-xs px-4 py-2 rounded-full backdrop-blur-sm pointer-events-none opacity-50 hover:opacity-100 transition-opacity">
                    Se a galeria não carregar, use o botão "Abrir em Nova Aba".
                 </div>
              )}
           </div>
        </div>
      )}

      {/* Coming Soon Popup */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center animate-scale-in relative">
              <button 
                onClick={() => setShowPopup(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                 <Clock className="w-8 h-8" />
              </div>
              
              <h3 className="text-xl font-bold text-gray-800 mb-2">Em breve!</h3>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                 As fotos deste evento ainda estão sendo tratadas e selecionadas pela nossa equipe. O link estará disponível em breve.
              </p>

              <button 
                onClick={() => setShowPopup(false)}
                className="w-full bg-rio-blue hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all"
              >
                Entendi
              </button>
           </div>
        </div>
      )}

    </div>
  );
};

export default PhotoGalleryPage;

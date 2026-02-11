
import React from 'react';
import { LayoutDashboard, LayoutGrid, ArrowRight, Briefcase, Truck, Wifi, ExternalLink, Megaphone } from 'lucide-react';
import HighlightsSlider from './HighlightsSlider';
import { Benefit } from '../types';

interface LandingPageProps {
  onNavigate: (view: any) => void;
  userName: string;
  onBenefitClick?: (benefit: Benefit) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate, userName, onBenefitClick }) => {
  
  // Mock data for Partner Ads
  const PARTNERS = [
    { 
      id: 1, 
      name: 'TechHotel Systems', 
      description: 'Gestão hoteleira integrada com 20% de desconto na implantação.', 
      category: 'Tecnologia',
      icon: Wifi,
      color: 'bg-indigo-50',
      textColor: 'text-indigo-700',
      borderColor: 'border-indigo-100'
    },
    { 
      id: 2, 
      name: 'CleanRio Pro', 
      description: 'Soluções de higienização profissional. Condições especiais para Zona Sul.', 
      category: 'Serviços',
      icon: Briefcase,
      color: 'bg-emerald-50',
      textColor: 'text-emerald-700',
      borderColor: 'border-emerald-100'
    },
    { 
      id: 3, 
      name: 'Gourmet Supply', 
      description: 'O melhor fornecedor de A&B do Rio. Entrega expressa em até 24h.', 
      category: 'Alimentos',
      icon: Truck,
      color: 'bg-orange-50',
      textColor: 'text-orange-700',
      borderColor: 'border-orange-100'
    }
  ];

  return (
    <div className="min-h-full bg-white animate-fade-in">
      {/* Hero Section */}
      <div id="header-welcome" className="relative bg-rio-blue overflow-hidden rounded-b-[3rem] shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-rio-gold/20 rounded-full -ml-10 -mb-10 blur-2xl" />
        
        <div className="max-w-7xl mx-auto px-6 pt-16 pb-24 relative z-10 text-center">
          <img 
             src="https://sindhoteisrj.com.br/wp-content/uploads/2023/04/Logo-HoteisRIO-Branca-Fundo-Transparente.png" 
             alt="HoteisRio" 
             className="h-16 mx-auto mb-8 opacity-90"
          />
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
            Bem-vindo, {userName.split(' ')[0]}
          </h1>
          <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Sua central exclusiva de inteligência, benefícios e gestão hoteleira.
            Tudo o que você precisa para fortalecer seu negócio em um só lugar.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              id="explore-benefits-btn"
              onClick={() => onNavigate('ALL_BENEFITS')}
              className="px-8 py-4 bg-rio-gold text-blue-900 rounded-xl font-bold text-lg shadow-lg hover:bg-yellow-400 transition-transform transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <LayoutGrid className="w-5 h-5" />
              Explorar Benefícios
            </button>
          </div>
        </div>
      </div>

      {/* Highlights Slider */}
      <div id="highlights-section" className="max-w-6xl mx-auto px-6 -mt-16 relative z-20 pb-10">
         {onBenefitClick && <HighlightsSlider onUseBenefit={onBenefitClick} />}
      </div>

      {/* Partners / Advertising Section */}
      <div id="partners-section" className="max-w-6xl mx-auto px-6 relative z-20 pb-20">
        <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
                <div className="h-8 w-1.5 bg-rio-gold rounded-full"></div>
                <h2 className="text-2xl font-bold text-gray-800">Parceiros em Destaque</h2>
            </div>
            <button className="text-xs font-bold text-gray-400 hover:text-rio-blue flex items-center gap-1 uppercase tracking-wide transition-colors">
                <Megaphone className="w-3 h-3" />
                Anuncie Aqui
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {PARTNERS.map((partner) => (
               <div 
                 key={partner.id} 
                 className={`group relative bg-white rounded-2xl p-6 border ${partner.borderColor} shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden`}
               >
                  {/* Decorative Background */}
                  <div className={`absolute top-0 right-0 w-24 h-24 ${partner.color} rounded-bl-[4rem] -mr-4 -mt-4 transition-transform group-hover:scale-110`} />
                  
                  <div className="relative z-10 flex flex-col h-full">
                      <div className={`w-12 h-12 rounded-xl ${partner.color} ${partner.textColor} flex items-center justify-center mb-4`}>
                          <partner.icon className="w-6 h-6" />
                      </div>
                      
                      <div className="mb-1">
                          <span className={`text-[10px] font-bold uppercase tracking-wider ${partner.textColor} bg-white px-2 py-0.5 rounded border ${partner.borderColor}`}>
                              {partner.category}
                          </span>
                      </div>

                      <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-rio-blue transition-colors">
                          {partner.name}
                      </h3>
                      
                      <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">
                          {partner.description}
                      </p>

                      <div className="flex items-center gap-2 text-sm font-bold text-gray-400 group-hover:text-rio-blue transition-colors">
                          Ver Oferta
                          <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </div>
                  </div>
               </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

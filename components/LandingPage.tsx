
import React from 'react';
import { LayoutDashboard, LayoutGrid, ArrowRight, Instagram, Linkedin } from 'lucide-react';
import HighlightsSlider from './HighlightsSlider';
import { Benefit } from '../types';

interface LandingPageProps {
  onNavigate: (view: any) => void;
  userName: string;
  onBenefitClick?: (benefit: Benefit) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate, userName, onBenefitClick }) => {
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

      {/* Social Media Widget */}
      <div id="quick-access-section" className="max-w-6xl mx-auto px-6 relative z-20 pb-20">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden relative group">
           {/* Background decorative elements */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -mr-20 -mt-20 z-0 transition-transform group-hover:scale-110" />
           <div className="absolute bottom-0 left-0 w-40 h-40 bg-rio-gold/10 rounded-full -ml-10 -mb-10 z-0" />

           <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left max-w-xl">
                 <h2 className="text-3xl font-bold text-gray-800 mb-3">Fique por dentro de tudo!</h2>
                 <p className="text-gray-600 text-lg leading-relaxed">
                   Siga nossas redes sociais e acompanhe as novidades, tendências e os bastidores do turismo carioca em tempo real.
                 </p>
              </div>

              <div className="flex gap-4">
                 {/* Instagram */}
                 <a 
                   href="https://instagram.com/hoteisrio" 
                   target="_blank" 
                   rel="noreferrer"
                   className="w-16 h-16 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 rounded-2xl flex items-center justify-center text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all group/icon"
                   title="Instagram"
                 >
                   <Instagram className="w-8 h-8 group-hover/icon:rotate-6 transition-transform" />
                 </a>

                 {/* LinkedIn */}
                 <a 
                   href="https://linkedin.com/company/hoteisrio" 
                   target="_blank" 
                   rel="noreferrer"
                   className="w-16 h-16 bg-[#0077b5] rounded-2xl flex items-center justify-center text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all group/icon"
                   title="LinkedIn"
                 >
                   <Linkedin className="w-8 h-8 group-hover/icon:-rotate-6 transition-transform" />
                 </a>

                 {/* TikTok */}
                 <a 
                   href="https://tiktok.com/@hoteisrio" 
                   target="_blank" 
                   rel="noreferrer"
                   className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all group/icon"
                   title="TikTok"
                 >
                   {/* TikTok Icon SVG */}
                   <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 group-hover/icon:rotate-6 transition-transform">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                   </svg>
                 </a>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

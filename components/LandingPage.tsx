
import React from 'react';
import { LayoutDashboard, LayoutGrid, ArrowRight, Sparkles } from 'lucide-react';
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

      {/* Destaques de Benefícios */}
      <div id="highlights-section" className="max-w-6xl mx-auto px-6 -mt-16 relative z-20 pb-12">
         {onBenefitClick && <HighlightsSlider onUseBenefit={onBenefitClick} />}
      </div>

      {/* Fornecedores em Destaque - carrossel via iframe */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                Fornecedores em Destaque
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Banners dos parceiros oficiais com condições especiais para associados HoteisRio.
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <iframe 
              src="https://sistema-divulgacao-fornecedores.vercel.app/#/embed?theme=light&color=0284c7&speed=3000&desc=true" 
              width="340" 
              height="450" 
              frameBorder="0" 
              scrolling="no" 
              style={{ border: 'none', overflow: 'hidden', maxWidth: '100%', borderRadius: 8, display: 'block', margin: '0 auto' }}
              title="Parceiros" 
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;

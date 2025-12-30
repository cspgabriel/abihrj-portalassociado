
import React from 'react';
import { LayoutDashboard, LayoutGrid, ArrowRight, Star, Shield, Calendar } from 'lucide-react';

interface LandingPageProps {
  onNavigate: (view: any) => void;
  userName: string;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate, userName }) => {
  return (
    <div className="min-h-full bg-white animate-fade-in">
      {/* Hero Section */}
      <div className="relative bg-rio-blue overflow-hidden rounded-b-[3rem] shadow-xl">
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
              onClick={() => onNavigate('DASHBOARD')}
              className="px-8 py-4 bg-white text-rio-blue rounded-xl font-bold text-lg shadow-lg hover:bg-gray-50 transition-transform transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <LayoutDashboard className="w-5 h-5" />
              Acessar Dashboard
            </button>
            <button 
              onClick={() => onNavigate('ALL_BENEFITS')}
              className="px-8 py-4 bg-rio-gold text-blue-900 rounded-xl font-bold text-lg shadow-lg hover:bg-yellow-400 transition-transform transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <LayoutGrid className="w-5 h-5" />
              Explorar Benefícios
            </button>
          </div>
        </div>
      </div>

      {/* Quick Access Cards */}
      <div className="max-w-6xl mx-auto px-6 -mt-16 relative z-20 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div 
            onClick={() => onNavigate('ASSOCIATION_EVENTS')}
            className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 cursor-pointer hover:border-rio-blue transition-all group"
          >
            <div className="w-12 h-12 bg-blue-50 text-rio-blue rounded-xl flex items-center justify-center mb-4 group-hover:bg-rio-blue group-hover:text-white transition-colors">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Agenda Oficial</h3>
            <p className="text-gray-500 text-sm mb-4">Confira os próximos fóruns, reuniões e eventos do setor.</p>
            <span className="text-rio-blue font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
              Ver Agenda <ArrowRight className="w-4 h-4" />
            </span>
          </div>

          <div 
            onClick={() => onNavigate('SECURITY_PAGE')}
            className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 cursor-pointer hover:border-rio-blue transition-all group"
          >
            <div className="w-12 h-12 bg-blue-50 text-rio-blue rounded-xl flex items-center justify-center mb-4 group-hover:bg-rio-blue group-hover:text-white transition-colors">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Segurança</h3>
            <p className="text-gray-500 text-sm mb-4">Alertas em tempo real e canal direto com autoridades.</p>
            <span className="text-rio-blue font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
              Acessar Central <ArrowRight className="w-4 h-4" />
            </span>
          </div>

          <div 
            onClick={() => onNavigate('ROCK_IN_RIO')}
            className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 cursor-pointer hover:border-rio-blue transition-all group"
          >
            <div className="w-12 h-12 bg-blue-50 text-rio-blue rounded-xl flex items-center justify-center mb-4 group-hover:bg-rio-blue group-hover:text-white transition-colors">
              <Star className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Rock in Rio 2026</h3>
            <p className="text-gray-500 text-sm mb-4">Cadastre seu hotel no hub oficial de benefícios do festival.</p>
            <span className="text-rio-blue font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
              Participar <ArrowRight className="w-4 h-4" />
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LandingPage;

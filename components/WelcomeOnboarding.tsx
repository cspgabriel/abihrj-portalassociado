
import React from 'react';
import { ArrowRight, CheckCircle2, Zap, Shield, Users, LayoutDashboard, Rocket } from 'lucide-react';

interface WelcomeOnboardingProps {
  onStartTutorial: () => void;
  onSkip: () => void;
}

const WelcomeOnboarding: React.FC<WelcomeOnboardingProps> = ({ onStartTutorial, onSkip }) => {
  return (
    <div className="min-h-screen bg-white animate-fade-in flex flex-col">
      {/* Hero Section */}
      <div className="bg-rio-blue relative overflow-hidden flex-1 flex flex-col justify-center py-16 px-6">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-rio-gold/20 rounded-full -ml-10 -mb-10 blur-2xl" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 text-rio-gold text-sm font-bold mb-6">
             <Rocket className="w-4 h-4" />
             Novo Portal do Associado
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
            Sua Central de Inteligência e <br/>
            <span className="text-rio-gold">Gestão Hoteleira</span>
          </h1>
          
          <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Bem-vindo à evolução. Reunimos todos os benefícios, ferramentas e conexões que você precisa para fortalecer seu hotel em uma única plataforma intuitiva.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={onStartTutorial}
              className="px-8 py-4 bg-rio-gold text-blue-900 rounded-xl font-bold text-lg shadow-lg hover:bg-yellow-400 transition-transform transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <Zap className="w-5 h-5" />
              Fazer Tour Interativo
            </button>
            <button 
              onClick={onSkip}
              className="px-8 py-4 bg-white/10 text-white border border-white/30 rounded-xl font-bold text-lg hover:bg-white/20 transition-colors"
            >
              Ir para o Dashboard
            </button>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="bg-gray-50 py-16 px-6">
         <div className="max-w-6xl mx-auto">
            <h2 className="text-center text-2xl font-bold text-gray-800 mb-12">Como Funciona o Portal?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {/* Feature 1 */}
               <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
                  <div className="w-12 h-12 bg-blue-50 text-rio-blue rounded-xl flex items-center justify-center mb-6">
                     <LayoutDashboard className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Dashboard Integrado</h3>
                  <p className="text-gray-600 leading-relaxed">
                     Acesso rápido a indicadores de mercado, previsão do tempo e atalhos para os serviços que você mais usa no dia a dia.
                  </p>
               </div>

               {/* Feature 2 */}
               <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
                  <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mb-6">
                     <Shield className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Serviços Online</h3>
                  <p className="text-gray-600 leading-relaxed">
                     Abra chamados jurídicos, reporte demandas de ordem pública e consulte legislações sem sair da plataforma.
                  </p>
               </div>

               {/* Feature 3 */}
               <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
                  <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-6">
                     <Users className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Comunidade & Eventos</h3>
                  <p className="text-gray-600 leading-relaxed">
                     Fique por dentro da agenda de fóruns, entre nos grupos oficiais de WhatsApp e conecte-se com o setor.
                  </p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default WelcomeOnboarding;

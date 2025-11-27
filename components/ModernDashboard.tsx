import React from 'react';
import { User, Benefit, BenefitCategory } from '../types';
import { BENEFITS_DATA, RIO_EVENTS } from '../constants';
import BenefitCard from './BenefitCard';
import WeatherWidget from './WeatherWidget';
import GamificationWidget from './GamificationWidget';
import { Sparkles, Calendar, ArrowRight, Zap, Target } from 'lucide-react';

interface ModernDashboardProps {
  user: User;
  onUseBenefit: (benefit: Benefit) => void;
  onViewDetails: (benefit: Benefit) => void;
}

const ModernDashboard: React.FC<ModernDashboardProps> = ({ user, onUseBenefit, onViewDetails }) => {
  // 1. Filtrar Ações Sugeridas (Ex: Novos ou Mais Usados)
  const suggestedActions = BENEFITS_DATA.filter(b => b.isNew || b.id === 'calendar-01').slice(0, 3);
  
  // 2. Filtrar Serviços Rápidos (Tools)
  const quickTools = BENEFITS_DATA.filter(b => b.isService).slice(0, 6);

  return (
    <div className="animate-fade-in pb-12">
       {/* Top Header Dark Mode Style */}
       <div className="bg-gray-900 text-white p-8 rounded-3xl mb-8 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rio-blue opacity-20 rounded-full blur-3xl -mr-20 -mt-40 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-rio-gold opacity-10 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
             {/* Welcome Area */}
             <div className="lg:col-span-2 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full w-fit mb-4 border border-white/5 backdrop-blur-sm">
                   <Sparkles className="w-4 h-4 text-rio-gold" />
                   <span className="text-xs font-bold uppercase tracking-wider">Painel Executivo</span>
                </div>
                <h1 className="text-4xl font-bold mb-3">Olá, {user.name.split(' ')[0]}</h1>
                <p className="text-gray-300 text-lg max-w-xl">
                   Aqui está o resumo da sua operação hoje. Você tem <span className="text-rio-gold font-bold">3 novas oportunidades</span> de economia.
                </p>
             </div>
             
             {/* Weather Widget Integrated */}
             <div className="lg:col-span-1">
                <WeatherWidget />
             </div>
          </div>
       </div>

       {/* Main Grid Layout */}
       <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Gamification & Primary Actions */}
          <div className="lg:col-span-4 space-y-8">
             {/* Gamification Status */}
             {user.gamification && <GamificationWidget profile={user.gamification} />}

             {/* Daily Challenge Mock */}
             <div className="bg-gradient-to-br from-rio-blue to-blue-800 rounded-xl p-6 text-white shadow-lg relative overflow-hidden">
                <div className="flex items-center gap-2 mb-3">
                   <Target className="w-5 h-5 text-rio-gold" />
                   <h3 className="font-bold text-sm uppercase">Missão do Dia</h3>
                </div>
                <p className="font-medium text-lg mb-4">Acesse o Calendário de Eventos para planejar o próximo feriado.</p>
                <div className="w-full bg-white/20 h-2 rounded-full mb-2">
                   <div className="w-0 h-full bg-rio-gold rounded-full" />
                </div>
                <p className="text-xs text-blue-200">+50 XP ao completar</p>
             </div>

             {/* Upcoming Events Mini Feed */}
             <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                   <Calendar className="w-5 h-5 text-rio-blue" />
                   Próximos Eventos
                </h3>
                <div className="space-y-4">
                   {RIO_EVENTS.slice(0, 3).map(ev => (
                      <div key={ev.id} className="flex gap-3 items-center group cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition">
                         <div className="bg-gray-100 text-gray-600 font-bold rounded-lg w-12 h-12 flex flex-col items-center justify-center shrink-0 group-hover:bg-rio-blue group-hover:text-white transition">
                            <span className="text-xs">{ev.date.split(' ')[1].substring(0,3)}</span>
                            <span className="text-lg leading-none">{ev.date.split(' ')[0].split('-')[0]}</span>
                         </div>
                         <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-gray-800 text-sm truncate">{ev.title}</h4>
                            <p className="text-xs text-gray-500 truncate">{ev.location}</p>
                         </div>
                      </div>
                   ))}
                </div>
             </div>
          </div>

          {/* Center/Right Column: Services & Recommendations */}
          <div className="lg:col-span-8 space-y-8">
             
             {/* Suggested Actions (Cards) */}
             <div>
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                   <Zap className="w-6 h-6 text-rio-gold fill-rio-gold" />
                   Ações Recomendadas
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                   {suggestedActions.map(benefit => (
                      <BenefitCard 
                         key={benefit.id} 
                         benefit={benefit} 
                         onUse={onUseBenefit} 
                         onDetails={onViewDetails}
                         layout="grid"
                      />
                   ))}
                </div>
             </div>

             {/* Quick Access Tools Grid */}
             <div>
                <div className="flex justify-between items-end mb-4">
                   <h2 className="text-xl font-bold text-gray-800">Ferramentas de Gestão</h2>
                   <button className="text-sm text-rio-blue font-medium hover:underline flex items-center gap-1">
                      Ver catálogo completo <ArrowRight className="w-4 h-4" />
                   </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   {quickTools.map(benefit => (
                      <BenefitCard 
                         key={benefit.id} 
                         benefit={benefit} 
                         onUse={onUseBenefit} 
                         onDetails={onViewDetails}
                         layout="list"
                      />
                   ))}
                </div>
             </div>

          </div>
       </div>
    </div>
  );
};

export default ModernDashboard;
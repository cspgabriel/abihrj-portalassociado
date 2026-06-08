// Autor: Gabriel Salles
// Suporte do SO: Windows11
// Descrição: Painel moderno com widgets, gamificação e acesso rápido aos serviços

import React, { useState } from 'react';
import { User, Benefit } from '../types';
import { BENEFITS_DATA, SUPER_CATEGORIES } from '../constants';
import BenefitCard from './BenefitCard';
import GamificationWidget from './GamificationWidget';
import WeatherWidget from './WeatherWidget';
import { ArrowRight, Zap } from 'lucide-react';
import * as Icons from 'lucide-react';

interface ModernDashboardProps {
  user: User;
  onUseBenefit: (benefit: Benefit) => void;
  onViewDetails: (benefit: Benefit) => void;
}

const ModernDashboard: React.FC<ModernDashboardProps> = ({ user, onUseBenefit, onViewDetails }) => {
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'SERVICES'>('OVERVIEW');

  // Filter some quick tools for the dashboard
  const quickTools = BENEFITS_DATA.filter(b => 
    ['juridico-01', 'planejador-feriados-2026'].includes(b.id)
  );
  
  // Default gamification profile if missing
  const profile = user.gamification || {
      xp: 1250,
      level: 'SILVER',
      streak: 12,
      lastLoginDate: new Date().toISOString(),
      badges: ['pioneiro'],
      completedActions: []
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-12 animate-fade-in">
        {/* Welcome Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-8">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Olá, {user.name.split(' ')[0]} 👋</h1>
                    <p className="text-gray-500">Bem-vindo ao seu painel exclusivo HoteisRio.</p>
                </div>
                <div className="flex gap-2">
                    <button 
                       onClick={() => setActiveTab('OVERVIEW')}
                       className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${activeTab === 'OVERVIEW' ? 'bg-rio-blue text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                        Visão Geral
                    </button>
                    <button 
                       onClick={() => setActiveTab('SERVICES')}
                       className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${activeTab === 'SERVICES' ? 'bg-rio-blue text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                        Meus Serviços
                    </button>
                </div>
            </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 mt-8">
            {activeTab === 'OVERVIEW' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-8">
                         {/* Weather Widget */}
                         <WeatherWidget />

                         {/* Quick Access Grid */}
                         <div>
                            <div className="flex justify-between items-end mb-4 px-2">
                                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                   <Zap className="w-5 h-5 text-yellow-500" />
                                   Acesso Rápido
                                </h2>
                                <button 
                                   onClick={() => setActiveTab('SERVICES')}
                                   className="text-sm text-rio-blue font-medium hover:underline flex items-center gap-1"
                                >
                                    Ver todos <ArrowRight className="w-4 h-4" />
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
                         
                         {/* Categories Preview */}
                         <div>
                            <h2 className="text-xl font-bold text-gray-800 mb-4 px-2">Navegar por Categorias</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                               {SUPER_CATEGORIES.map(cat => {
                                  const Icon = (Icons as any)[cat.iconName] || Icons.HelpCircle;
                                  return (
                                    <div key={cat.id} className={`p-4 rounded-xl bg-gradient-to-br ${cat.gradient} text-white cursor-pointer hover:shadow-lg transition-transform hover:scale-105`}>
                                        <Icon className="w-8 h-8 mb-2 opacity-80" />
                                        <h3 className="font-bold text-sm">{cat.title}</h3>
                                    </div>
                                  )
                               })}
                            </div>
                         </div>
                    </div>

                    {/* Right Column (Gamification & Stats) */}
                    <div className="space-y-8">
                        <GamificationWidget profile={profile as any} />
                        
                        {/* Fornecedores em Destaque - Carrossel via iframe */}
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                            <h3 className="text-sm font-bold text-gray-800 mb-3">
                              Fornecedores em Destaque
                            </h3>
                            <p className="text-xs text-gray-500 mb-4">
                              Ofertas e condições especiais dos parceiros oficiais HoteisRio.
                            </p>
                            <div className="flex justify-center">
                              <iframe
                                src="https://sistema-divulgacao-fornecedores.vercel.app/#/embed?theme=light&color=0284c7&speed=3000&desc=true"
                                width="340"
                                height="450"
                                frameBorder="0"
                                scrolling="no"
                                style={{ border: 'none', overflow: 'hidden', maxWidth: '100%', borderRadius: 8, display: 'block', margin: '0 auto' }}
                                title="Fornecedores HoteisRio"
                                loading="lazy"
                              />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'SERVICES' && (
                 <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Todos os Serviços Online</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {BENEFITS_DATA.filter(b => b.isService).map(benefit => (
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
            )}
        </div>
    </div>
  );
};

export default ModernDashboard;
// --- Fim de components/ModernDashboard.tsx ---
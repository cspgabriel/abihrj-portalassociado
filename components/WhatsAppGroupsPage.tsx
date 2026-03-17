
import React from 'react';
import { ArrowLeft, MessageCircle, ExternalLink, ShieldCheck, Users, Briefcase, Wrench, Bed, TrendingUp, Bell, Utensils, ShoppingCart, DollarSign } from 'lucide-react';
import { WHATSAPP_GROUPS } from '../constants';

interface WhatsAppGroupsPageProps {
  onBack: () => void;
}

const WhatsAppGroupsPage: React.FC<WhatsAppGroupsPageProps> = ({ onBack }) => {
  const getIcon = (id: string) => {
      if (id.includes('seg')) return <ShieldCheck className="w-6 h-6" />;
      if (id.includes('comercial')) return <TrendingUp className="w-6 h-6" />;
      if (id.includes('rh')) return <Users className="w-6 h-6" />;
      if (id.includes('manutencao')) return <Wrench className="w-6 h-6" />;
      if (id.includes('gov')) return <Bed className="w-6 h-6" />;
      if (id.includes('gms')) return <Briefcase className="w-6 h-6" />;
      if (id.includes('recepcao')) return <Bell className="w-6 h-6" />;
      if (id.includes('ab')) return <Utensils className="w-6 h-6" />;
      if (id.includes('compras')) return <ShoppingCart className="w-6 h-6" />;
      if (id.includes('controller')) return <DollarSign className="w-6 h-6" />;
      return <Users className="w-6 h-6" />;
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

      <div className="text-center mb-10">
        <div className="inline-block p-4 bg-green-100 rounded-full text-green-600 mb-4">
          <MessageCircle className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Comunidade HoteisRio</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Conecte-se com outros profissionais do setor. Participe dos grupos oficiais e receba informações, alertas de segurança e oportunidades em tempo real.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {WHATSAPP_GROUPS.map((group) => (
          <div key={group.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all border border-green-100 overflow-hidden flex flex-col">
            <div className="p-6 flex-1">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                  {getIcon(group.id)}
                </div>
                <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-full">Oficial</span>
              </div>
              
              <h3 className="text-lg font-bold text-gray-800 mb-2">{group.name}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{group.description}</p>
            </div>

            <div className="p-4 bg-gray-50 border-t border-gray-100">
              <a 
                href={group.link}
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 rounded-lg transition-colors"
              >
                Entrar no Grupo
                <ExternalLink className="w-4 h-4" />
              </a>
              <p className="text-[10px] text-gray-400 text-center mt-2">
                Sujeito à aprovação do administrador
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhatsAppGroupsPage;

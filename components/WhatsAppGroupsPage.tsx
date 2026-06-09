import React from 'react';
import { ArrowLeft, MessageCircle, ExternalLink } from 'lucide-react';
import { WHATSAPP_GROUPS } from '../constants';

interface WhatsAppGroupsPageProps {
  onBack: () => void;
}

const WhatsAppGroupsPage: React.FC<WhatsAppGroupsPageProps> = ({ onBack }) => {
  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto animate-fade-in">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-bold text-rio-blue hover:underline mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> Voltar
      </button>

      <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-6 md:p-8 text-white shadow-lg mb-8">
        <div className="flex items-center gap-4 mb-3">
          <div className="bg-white/15 p-3 rounded-xl backdrop-blur">
            <MessageCircle className="w-7 h-7" />
          </div>
          <h1 className="text-3xl font-bold">Grupos WhatsApp</h1>
        </div>
        <p className="text-white/90 max-w-2xl text-sm md:text-base">
          Conecte-se aos grupos oficiais da HoteisRio. Networking, alertas e debate entre associados.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {WHATSAPP_GROUPS.map((group) => (
          <a
            key={group.id}
            href={group.link}
            target="_blank"
            rel="noreferrer"
            className="group bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-lg hover:border-emerald-300 transition-all flex flex-col"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                <MessageCircle className="w-5 h-5" />
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
            </div>
            <h2 className="text-base font-bold text-slate-900 mb-1">{group.name}</h2>
            <p className="text-xs text-slate-500 leading-5">{group.description}</p>
            <span className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-emerald-700">
              Entrar no grupo
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default WhatsAppGroupsPage;

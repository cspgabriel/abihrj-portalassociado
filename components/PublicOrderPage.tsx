import React from 'react';
import { ArrowLeft, ClipboardList, ExternalLink, Megaphone, Send } from 'lucide-react';

interface PublicOrderPageProps {
  onBack: () => void;
}

const cards = [
  {
    title: 'Cadastro e Envio de Demanda',
    description: 'Registre uma nova demanda de ordem publica com os detalhes necessarios para o encaminhamento.',
    href: 'https://ordempublica.sindhoteisrj.com.br/enviar',
    cta: 'Cadastrar Demanda',
    icon: Send,
    accent: 'bg-emerald-600',
    iconWrap: 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white',
    button: 'border-2 border-emerald-600 text-emerald-600 bg-white group-hover:bg-emerald-600 group-hover:text-white'
  },
  {
    title: 'Consulta de Demanda',
    description: 'Acompanhe o status de uma solicitacao ja enviada e consulte os registros de forma rapida.',
    href: 'https://ordempublica.sindhoteisrj.com.br/consultar',
    cta: 'Consultar Agora',
    icon: ClipboardList,
    accent: 'bg-rio-blue',
    iconWrap: 'bg-blue-50 text-rio-blue group-hover:bg-rio-blue group-hover:text-white',
    button: 'bg-rio-blue text-white group-hover:bg-blue-700'
  }
];

const PublicOrderPage: React.FC<PublicOrderPageProps> = ({ onBack }) => {
  return (
    <div className="bg-gray-50 min-h-screen pb-12 animate-fade-in">
      <div className="bg-gradient-to-r from-slate-900 to-rio-blue text-white pt-8 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -mr-20 -mt-20 blur-2xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-400/20 rounded-full -ml-10 -mb-10 blur-2xl" />

        <div className="max-w-7xl mx-auto relative z-10">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-blue-100 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar para Dashboard
          </button>

          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-xl">
              <Megaphone className="w-16 h-16 text-rio-gold" strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Demandas de Ordem Pública</h1>
              <p className="text-blue-50 text-lg md:text-xl max-w-2xl leading-relaxed">
                Escolha entre consultar uma demanda existente ou cadastrar uma nova solicitacao para encaminhamento.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <a
                key={card.title}
                href={card.href}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`h-2 w-full ${card.accent}`}></div>
                <div className="p-8 flex flex-col items-center text-center h-full">
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-colors ${card.iconWrap}`}>
                    <Icon className="w-10 h-10" />
                  </div>

                  <h3 className="text-2xl font-bold text-gray-800 mb-3">{card.title}</h3>
                  <p className="text-gray-500 mb-8 leading-relaxed">
                    {card.description}
                  </p>

                  <div className="mt-auto w-full">
                    <span className={`w-full block py-4 px-6 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${card.button}`}>
                      {card.cta}
                      <ExternalLink className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>Os links abrem em nova aba para manter o portal principal estavel e sem impacto no fluxo atual do deploy.</p>
        </div>
      </div>
    </div>
  );
};

export default PublicOrderPage;
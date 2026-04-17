import React from 'react';
import { ArrowLeft, ExternalLink, Gavel, Send } from 'lucide-react';

interface LegalAdvisoryPageProps {
  onBack: () => void;
}

const LegalAdvisoryPage: React.FC<LegalAdvisoryPageProps> = ({ onBack }) => {
  return (
    <div className="bg-gray-50 min-h-screen pb-12 animate-fade-in">
      <div className="bg-gradient-to-r from-slate-900 to-slate-700 text-white pt-8 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -mr-20 -mt-20 blur-2xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-400/20 rounded-full -ml-10 -mb-10 blur-2xl" />

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
              <Gavel className="w-16 h-16 text-rio-gold" strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Assessoria Jurídica</h1>
              <p className="text-blue-50 text-lg md:text-xl max-w-2xl leading-relaxed">
                Encaminhe sua demanda jurídica à nossa assessoria para um atendimento ágil, organizado e eficiente.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-10 relative z-20">
        <a
          href="https://assessoriajuridica.sindhoteisrj.com.br/enviar"
          className="block bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
        >
          <div className="h-2 w-full bg-emerald-600"></div>
          <div className="p-10 flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full bg-emerald-50 flex items-center justify-center mb-8 transition-colors group-hover:bg-emerald-600 group-hover:text-white text-emerald-600">
              <Send className="w-12 h-12" />
            </div>

            <h3 className="text-3xl font-bold text-gray-800 mb-4 group-hover:text-emerald-700 transition-colors">
              Envio de Nova Assessoria
            </h3>
            <p className="text-gray-500 mb-10 leading-relaxed max-w-lg text-lg">
              Encaminhe uma nova demanda jurídica à assessoria com os detalhes necessários para o atendimento.
            </p>

            <span className="inline-flex items-center gap-2 border-2 border-emerald-600 text-emerald-600 bg-white group-hover:bg-emerald-600 group-hover:text-white font-bold px-8 py-4 rounded-xl transition-all text-lg">
              Solicitar Atendimento
              <ExternalLink className="w-5 h-5" />
            </span>
          </div>
        </a>

        <div className="mt-10 text-center text-gray-500 text-sm">
          <p>O atendimento será aberto na mesma aba, preservando a navegação do portal dentro da iframe.</p>
        </div>
      </div>
    </div>
  );
};

export default LegalAdvisoryPage;

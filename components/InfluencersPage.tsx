import React from 'react';
import { ArrowLeft, Camera } from 'lucide-react';

interface InfluencersPageProps {
  onBack: () => void;
}

const InfluencersPage: React.FC<InfluencersPageProps> = ({ onBack }) => {
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
              <Camera className="w-16 h-16 text-rio-gold" strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Influenciadores / UGC</h1>
              <p className="text-blue-50 text-lg md:text-xl max-w-2xl leading-relaxed">
                Conecte seu hotel com influenciadores digitais e criadores de conteúdo para ampliar sua visibilidade e atrair novos hóspedes.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-10 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="h-2 w-full bg-pink-600"></div>
          <iframe
            src="https://influenciadoresdigitais.abihrj.com.br/#/influenciadores"
            title="Influenciadores Digitais"
            className="w-full border-0"
            style={{ minHeight: '80vh' }}
            allow="clipboard-read; clipboard-write"
          />
        </div>
      </div>
    </div>
  );
};

export default InfluencersPage;

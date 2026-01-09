
import React, { useState } from 'react';
import { ArrowLeft, ExternalLink, Send, Lightbulb, CheckCircle2 } from 'lucide-react';
import { COMMERCIAL_SUB_ACTIONS } from '../constants';
import * as Icons from 'lucide-react';

interface CommercialActionsPageProps {
  onBack: () => void;
}

const CommercialActionsPage: React.FC<CommercialActionsPageProps> = ({ onBack }) => {
  const [suggestion, setSuggestion] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!suggestion.trim()) return;
    setSent(true);
    setTimeout(() => {
        setSent(false);
        setSuggestion('');
    }, 3000);
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-12 animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-800 text-white pt-8 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/20 rounded-full -ml-10 -mb-10 blur-2xl" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-indigo-200 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar para Dashboard
          </button>

          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-xl">
              <Icons.ShoppingBag className="w-16 h-16 text-rio-gold" strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Ações Comerciais</h1>
              <p className="text-indigo-100 text-lg md:text-xl max-w-2xl leading-relaxed">
                Central unificada para inscrições em Feiras, programas de capacitação PROCAP e eventos de experiência.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {COMMERCIAL_SUB_ACTIONS.map((action) => {
                const IconComponent = (Icons as any)[action.iconName] || Icons.HelpCircle;
                
                return (
                    <div key={action.id} className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden flex flex-col hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                        <div className={`h-2 ${action.color} w-full`}></div>
                        <div className="p-8 flex-1 flex flex-col items-center text-center">
                            <div className={`w-20 h-20 rounded-full ${action.color} bg-opacity-10 flex items-center justify-center mb-6`}>
                                {/* Using safer text class logic from constants */}
                                <IconComponent className={`w-10 h-10 ${action.textClass || 'text-gray-600'}`} /> 
                            </div>
                            
                            <h3 className="text-2xl font-bold text-gray-800 mb-3">{action.title}</h3>
                            <p className="text-gray-500 mb-8 leading-relaxed">
                                {action.description}
                            </p>
                            
                            <div className="mt-auto w-full">
                                <a 
                                    href={action.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`w-full block py-4 px-6 rounded-xl text-white font-bold shadow-md transition-all hover:opacity-90 flex items-center justify-center gap-2 ${action.color}`}
                                >
                                    {action.buttonText}
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>

        {/* Suggestion Form */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
                <div className="bg-yellow-50 p-3 rounded-full text-yellow-600">
                    <Lightbulb className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-gray-800">Sugerir Nova Ação Comercial</h3>
                    <p className="text-gray-500 text-sm">Tem interesse em alguma feira ou evento específico? Conte para nós.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <textarea
                        value={suggestion}
                        onChange={(e) => setSuggestion(e.target.value)}
                        placeholder="Descreva sua sugestão de feira, roadshow ou capacitação..."
                        className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none h-32 text-gray-700 bg-gray-50"
                    />
                </div>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={sent || !suggestion.trim()}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white transition-all
                            ${sent ? 'bg-green-600' : 'bg-rio-blue hover:bg-blue-700'}
                        `}
                    >
                        {sent ? (
                            <>
                                <CheckCircle2 className="w-5 h-5" />
                                Sugestão Enviada!
                            </>
                        ) : (
                            <>
                                <Send className="w-5 h-5" />
                                Enviar Sugestão
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
        
        <div className="mt-12 text-center text-gray-500 text-sm">
            <p>Dúvidas sobre as inscrições? Entre em contato com o departamento comercial.</p>
        </div>
      </div>
    </div>
  );
};

export default CommercialActionsPage;

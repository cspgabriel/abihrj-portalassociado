import React, { useState } from 'react';
import { ArrowLeft, MapPin, Calendar, Clock, UserCog, Send, FileText, CheckCircle2 } from 'lucide-react';
import { Forum } from '../types';
import * as Icons from 'lucide-react';

interface ForumPageProps {
  forum: Forum;
  onBack: () => void;
  onRegisterUpdate: () => void;
}

const ForumPage: React.FC<ForumPageProps> = ({ forum, onBack, onRegisterUpdate }) => {
  const IconComponent = (Icons as any)[forum.iconName] || Icons.Users;
  const [topicSuggestion, setTopicSuggestion] = useState('');
  const [suggestionSent, setSuggestionSent] = useState(false);

  const handleSuggestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topicSuggestion.trim()) return;
    setSuggestionSent(true);
    setTimeout(() => {
        setSuggestionSent(false);
        setTopicSuggestion('');
    }, 3000);
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-12 animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-rio-blue to-blue-900 text-white pt-8 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -mr-20 -mt-20 blur-2xl" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-blue-200 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar para Dashboard
          </button>

          <div className="flex items-center gap-6">
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
              <IconComponent className="w-10 h-10 text-rio-gold" />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">{forum.title}</h1>
              <p className="text-blue-100 text-lg">{forum.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* LEFT COL: Next Edition & Actions */}
            <div className="lg:col-span-2 space-y-8">
                
                {/* Next Edition Card */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                    <div className="bg-rio-gold/10 p-6 border-b border-rio-gold/20 flex justify-between items-center">
                        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-rio-blue" />
                            Próxima Edição
                        </h2>
                        <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full uppercase">
                            Inscrições Abertas
                        </span>
                    </div>
                    <div className="p-8">
                        <h3 className="text-2xl font-bold text-rio-blue mb-4">{forum.nextEdition.topic}</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                            <div className="flex items-center gap-3 text-gray-600 bg-gray-50 p-3 rounded-lg">
                                <Clock className="w-5 h-5 text-rio-gold" />
                                <span className="font-medium">{forum.nextEdition.date}</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-600 bg-gray-50 p-3 rounded-lg">
                                <MapPin className="w-5 h-5 text-rio-gold" />
                                <span className="font-medium">{forum.nextEdition.location}</span>
                            </div>
                        </div>

                        <button className="w-full bg-rio-blue hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-md transition-transform hover:scale-[1.01] flex items-center justify-center gap-2">
                            Inscrever-se Agora
                            <ArrowLeft className="w-4 h-4 rotate-180" />
                        </button>
                    </div>
                </div>

                {/* Last Editions */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                    <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-gray-400" />
                        Últimas Edições
                    </h3>
                    <div className="space-y-4">
                        {forum.lastEditions.map((edition, idx) => (
                            <div key={idx} className="flex gap-4 border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                                <div className="w-24 text-sm font-bold text-gray-400 pt-1">{edition.date}</div>
                                <div>
                                    <p className="text-gray-700 font-medium">{edition.summary}</p>
                                    <button className="text-xs text-rio-blue hover:underline mt-1 font-semibold">
                                        Ler Resumo Completo
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* RIGHT COL: Side Actions */}
            <div className="space-y-6">
                
                {/* Registration Update */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-blue-50 p-2 rounded-lg text-rio-blue">
                            <UserCog className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-gray-800">Mailing do Fórum</h3>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">
                        Garanta que você e sua equipe recebam os convites deste fórum específico.
                    </p>
                    <button 
                        onClick={onRegisterUpdate}
                        className="w-full border border-rio-blue text-rio-blue hover:bg-blue-50 font-bold py-2.5 rounded-lg transition-colors text-sm"
                    >
                        Atualizar Cadastro
                    </button>
                </div>

                {/* Suggest Topic */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-wide">Sugerir Pauta</h3>
                    <form onSubmit={handleSuggestionSubmit}>
                        <textarea 
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-rio-blue outline-none resize-none mb-3"
                            rows={4}
                            placeholder={`Gostaria que o ${forum.title} discutisse sobre...`}
                            value={topicSuggestion}
                            onChange={(e) => setTopicSuggestion(e.target.value)}
                        />
                        <button 
                            type="submit"
                            disabled={!topicSuggestion.trim()}
                            className="w-full bg-gray-800 hover:bg-gray-900 text-white font-bold py-2.5 rounded-lg transition-colors text-sm flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {suggestionSent ? <CheckCircle2 className="w-4 h-4" /> : <Send className="w-4 h-4" />}
                            {suggestionSent ? 'Enviado!' : 'Enviar Sugestão'}
                        </button>
                    </form>
                </div>

            </div>
        </div>
      </div>
    </div>
  );
};

export default ForumPage;
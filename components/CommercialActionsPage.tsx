
import React, { useState } from 'react';
import { ArrowLeft, ExternalLink, Send, Lightbulb, CheckCircle2, MapPin, AlertTriangle, FileText } from 'lucide-react';
import { COMMERCIAL_SUB_ACTIONS } from '../constants';
import * as Icons from 'lucide-react';

const ROADSHOW_SCHEDULE = [
  {
    month: 'Março',
    cities: [{ city: 'Rio de Janeiro/RJ', date: '31/03', full: true }]
  },
  {
    month: 'Abril',
    cities: [
      { city: 'Belo Horizonte/MG', date: '07/04' },
      { city: 'Brasília/DF', date: '08/04' },
      { city: 'Goiânia/GO', date: '09/04' }
    ]
  },
  {
    month: 'Maio',
    cities: [
      { city: 'Florianópolis/SC', date: '04/05' },
      { city: 'Curitiba/PR', date: '06/05' },
      { city: 'Maringá/PR', date: '07/05' }
    ]
  },
  {
    month: 'Junho',
    cities: [
      { city: 'Cuiabá/MT', date: '16/06' },
      { city: 'Campo Grande/MS', date: '18/06' }
    ]
  },
  {
    month: 'Agosto',
    cities: [
      { city: 'Ribeirão Preto/SP', date: '17/08' },
      { city: 'Campinas/SP', date: '18/08' },
      { city: 'São José dos Campos/SP', date: '19/08' },
      { city: 'São Paulo/SP', date: '20/08' },
      { city: 'ABC Paulista/SP', date: '21/08' }
    ]
  },
  {
    month: 'Outubro',
    cities: [
      { city: 'Salvador/BA', date: '19/10' },
      { city: 'Recife/PE', date: '20/10' }
    ]
  }
];

interface CommercialActionsPageProps {
  onBack: () => void;
}

const CommercialActionsPage: React.FC<CommercialActionsPageProps> = ({ onBack }) => {
  const [suggestion, setSuggestion] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!suggestion.trim()) return;

    // Construct mailto link
    const recipient = "julie.souza@hoteisrio.com.br";
    const subject = encodeURIComponent("Sugestão de Nova Ação Comercial - Portal do Associado");
    const body = encodeURIComponent(`Olá,\n\nGostaria de sugerir a seguinte ação comercial:\n\n${suggestion}\n\nAtenciosamente,\nAssociado HoteisRio`);

    // Open email client
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;

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

        {/* Roadshow Experiência Rio Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-pink-100 overflow-hidden mb-12">
          <div className="bg-gradient-to-r from-pink-600 to-rose-500 px-8 py-6">
            <div className="flex items-center gap-3">
              <Icons.Sparkles className="w-8 h-8 text-white" />
              <h2 className="text-2xl font-bold text-white">Roadshow Experiência Rio</h2>
            </div>
            <p className="text-pink-100 mt-2 text-sm">Promoção da hotelaria e dos atrativos do Rio de Janeiro nos principais polos emissores do Brasil</p>
          </div>

          <div className="p-8">
            {/* Announcement */}
            <p className="text-gray-700 leading-relaxed mb-8">
              É com grande satisfação que anunciamos a abertura oficial do formulário de manifestação de interesse para o <strong>Roadshow Experiência Rio</strong>. Esta é uma iniciativa estratégica dedicada a promover a nossa hotelaria e os atrativos do Rio de Janeiro junto aos principais polos emissores de turismo do Brasil.
            </p>

            {/* Schedule */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-pink-600" />
                <h3 className="text-lg font-bold text-gray-800">Cronograma Planejado</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {ROADSHOW_SCHEDULE.map((item) => (
                  <div key={item.month} className="border border-gray-100 rounded-xl p-4 bg-gray-50">
                    <div className="text-sm font-bold text-pink-600 uppercase tracking-wide mb-3">{item.month}</div>
                    <ul className="space-y-2">
                      {item.cities.map((c) => (
                        <li key={c.city} className="flex items-start gap-2 text-sm text-gray-700">
                          <span className="mt-0.5 w-2 h-2 rounded-full bg-pink-400 shrink-0" />
                          <span className="flex-1">
                            {c.city} <span className="text-gray-400">({c.date})</span>
                            {c.full && (
                              <span className="ml-1 inline-block bg-red-100 text-red-600 text-xs font-semibold px-1.5 py-0.5 rounded">
                                VAGAS ESGOTADAS
                              </span>
                            )}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Important Notice */}
            <div className="flex gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8">
              <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div className="text-sm text-amber-800 leading-relaxed">
                <strong>Aviso Importante:</strong> O cronograma acima reflete o planejamento estratégico atual. As datas e os destinos poderão passar por adequações logísticas. A formatação definitiva do calendário e da rota dependerá do número de adesões dos coexpositores, garantindo a viabilidade operacional e o melhor retorno comercial para todos os participantes.
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-center gap-4 bg-pink-50 rounded-xl p-6 border border-pink-100">
              <div className="flex items-start gap-3 flex-1">
                <FileText className="w-5 h-5 text-pink-600 shrink-0 mt-0.5" />
                <p className="text-gray-700 text-sm leading-relaxed">
                  Para garantir a presença do seu hotel e receber as próximas atualizações e propostas, preencha o formulário de manifestação de interesse.
                </p>
              </div>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSdL-Z_o-2TV6mRXquFiUM55wLXgWQfm3CxbIkQtlOuKnmOn_w/viewform?authuser=1"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white font-bold px-6 py-3 rounded-xl shadow-md transition-all"
              >
                Acessar Formulário
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
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
                                Abrindo E-mail...
                            </>
                        ) : (
                            <>
                                <Send className="w-5 h-5" />
                                Enviar por E-mail
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

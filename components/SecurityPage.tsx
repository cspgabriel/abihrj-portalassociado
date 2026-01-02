
import React from 'react';
import { ArrowLeft, Shield, Phone, AlertTriangle, FileText, ExternalLink, Siren, Radio, Users, CheckCircle2, Clock, MapPin } from 'lucide-react';

interface SecurityPageProps {
  onBack: () => void;
  onReport: () => void;
}

const SecurityPage: React.FC<SecurityPageProps> = ({ onBack, onReport }) => {
  const alerts = [
    { type: 'Manifestação', status: 'Ativo', location: 'Avenida Rio Branco', time: '30 Out 2024 - 14:00', impact: 'Médio', color: 'yellow' },
    { type: 'Evento', status: 'Planejado', location: 'Copacabana', time: '02 Nov 2024 - 20:00', impact: 'Baixo', color: 'blue' },
    { type: 'Blitz', status: 'Concluído', location: 'Túnel Rebouças', time: '28 Out 2024 - 07:00', impact: 'Alto', color: 'green' }
  ];

  const downloads = [
    "Manual de Prevenção e Combate a Incêndio",
    "Protocolo de Evacuação de Emergência",
    "Guia de Prevenção contra Furtos",
    "Procedimentos em Caso de Ameaça",
    "Checklist de Segurança Diária"
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-12 animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-rio-blue to-blue-800 text-white pt-8 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-blue-200 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar para Dashboard
          </button>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
               <div className="flex items-center gap-3 mb-3">
                 <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                   <Shield className="w-6 h-6 text-white" />
                 </div>
                 <span className="text-rio-gold font-bold tracking-wider text-sm uppercase">Segurança HoteisRio</span>
               </div>
               <h1 className="text-3xl md:text-4xl font-bold mb-2">Órgãos de Segurança</h1>
               <p className="text-blue-100 max-w-2xl text-lg">
                 Monitoramento em tempo real e canal direto com as autoridades para garantir a proteção das áreas turísticas.
               </p>
            </div>
            
            <button 
              onClick={onReport}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-red-900/20 flex items-center gap-2 transition-transform hover:scale-105"
            >
              <AlertTriangle className="w-5 h-5" />
              Reportar Incidente
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-10 relative z-20 space-y-8">
        
        {/* Emergency Contacts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: 'Polícia Civil - DEAT', sub: 'Del. Esp. Apoio ao Turismo', phone: '(21) 2332-2924', icon: Siren, color: 'bg-blue-600' },
            { name: 'BPTur', sub: 'Batalhão de Turismo', phone: '(21) 2334-8155', icon: Shield, color: 'bg-slate-700' },
            { name: 'Guarda Municipal', sub: 'Ordem Pública', phone: '153', icon: Users, color: 'bg-blue-500' },
            { name: 'Programa Presente', sub: 'Policiamento de Proximidade', phone: '(21) 2334-7000', icon: Radio, color: 'bg-green-600' },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex flex-col justify-between h-full hover:shadow-lg transition-shadow">
               <div className="flex justify-between items-start mb-4">
                 <div className={`${item.color} p-3 rounded-lg text-white shadow-sm`}>
                   <item.icon className="w-6 h-6" />
                 </div>
                 <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded">24h</span>
               </div>
               <div>
                 <h3 className="font-bold text-gray-800 leading-tight">{item.name}</h3>
                 <p className="text-xs text-gray-500 mb-3">{item.sub}</p>
                 <p className="text-lg font-mono font-bold text-slate-700">{item.phone}</p>
               </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Live Alerts Section */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <Radio className="w-5 h-5 text-red-500 animate-pulse" />
                Alertas Recentes e Eventos
              </h2>
              <button className="text-sm text-blue-600 font-medium hover:underline">Ver Todos</button>
            </div>
            
            <div className="divide-y divide-gray-100">
              {alerts.map((alert, idx) => (
                <div key={idx} className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-gray-50 transition-colors">
                   <div className="flex items-start gap-4">
                      <div className={`
                        w-12 h-12 rounded-full flex items-center justify-center shrink-0
                        ${alert.color === 'yellow' ? 'bg-yellow-100 text-yellow-600' : 
                          alert.color === 'blue' ? 'bg-blue-100 text-blue-600' : 
                          'bg-green-100 text-green-600'}
                      `}>
                        <AlertTriangle className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-gray-800">{alert.type}</h3>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase border ${
                            alert.status === 'Ativo' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-gray-100 text-gray-500 border-gray-200'
                          }`}>
                            {alert.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                           <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {alert.location}</span>
                           <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {alert.time}</span>
                        </div>
                      </div>
                   </div>
                   
                   <div className="flex flex-col items-end">
                      <span className="text-xs text-gray-400 uppercase tracking-wide font-bold">Impacto</span>
                      <span className={`font-bold ${
                        alert.impact === 'Alto' ? 'text-red-600' : 
                        alert.impact === 'Médio' ? 'text-yellow-600' : 'text-green-600'
                      }`}>
                        {alert.impact}
                      </span>
                   </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: WhatsApp & Downloads */}
          <div className="space-y-6">
            
            {/* WhatsApp Group */}
            <div className="bg-green-600 rounded-xl p-6 text-white shadow-lg relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10" />
               <h3 className="font-bold text-lg mb-2 relative z-10">Grupo Segurança HotéisRIO</h3>
               <p className="text-green-100 text-sm mb-4 relative z-10">
                 Canal exclusivo para comunicação rápida sobre questões de segurança.
               </p>
               <div className="flex items-center gap-2 mb-4 text-xs bg-green-700/50 w-fit px-2 py-1 rounded">
                 <Users className="w-3 h-3" />
                 145 membros ativos
               </div>
               <button className="w-full bg-white text-green-700 font-bold py-2.5 rounded-lg text-sm hover:bg-green-50 transition-colors relative z-10">
                 Participar do Grupo
               </button>
            </div>

            {/* Quick Contacts List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
               <h3 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-wide">Outros Telefones</h3>
               <ul className="space-y-3 text-sm">
                 <li className="flex justify-between border-b border-gray-50 pb-2">
                   <span className="text-gray-600">Polícia Militar</span>
                   <span className="font-bold text-gray-900">190</span>
                 </li>
                 <li className="flex justify-between border-b border-gray-50 pb-2">
                   <span className="text-gray-600">Corpo de Bombeiros</span>
                   <span className="font-bold text-gray-900">193</span>
                 </li>
                 <li className="flex justify-between border-b border-gray-50 pb-2">
                   <span className="text-gray-600">SAMU</span>
                   <span className="font-bold text-gray-900">192</span>
                 </li>
                 <li className="flex justify-between border-b border-gray-50 pb-2">
                   <span className="text-gray-600">Defesa Civil</span>
                   <span className="font-bold text-gray-900">199</span>
                 </li>
               </ul>
            </div>

          </div>
        </div>

        {/* Protocols Downloads */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
           <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
             <FileText className="w-5 h-5 text-rio-blue" />
             Protocolos e Manuais de Segurança
           </h2>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {downloads.map((doc, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-rio-blue hover:bg-blue-50 transition-all group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="bg-gray-100 p-2 rounded text-gray-500 group-hover:text-rio-blue group-hover:bg-white transition-colors">
                      <FileText className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-medium text-gray-700 group-hover:text-rio-blue">{doc}</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-rio-blue" />
                </div>
              ))}
           </div>
        </div>
        
        {/* Footer Note */}
        <div className="text-center text-gray-400 text-sm pb-8">
           <p className="flex items-center justify-center gap-2">
             <Shield className="w-4 h-4" />
             O HotéisRIO trabalha constantemente com as autoridades para garantir um ambiente seguro.
           </p>
        </div>

      </div>
    </div>
  );
};

export default SecurityPage;

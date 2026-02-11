
import React from 'react';
import { ArrowLeft, Shield, Phone, AlertTriangle, FileText, ExternalLink, Siren, Users, Link as LinkIcon, FileCheck } from 'lucide-react';

interface SecurityPageProps {
  onBack: () => void;
  onReport: () => void;
}

const SecurityPage: React.FC<SecurityPageProps> = ({ onBack, onReport }) => {
  
  const downloads = [
    "Guia Oficial: Operação Verão (Parceria SETUR/DEAT)"
  ];

  const whatsappGroups = [
    { name: 'F. Hoteis - Segurança Barra', link: 'https://chat.whatsapp.com/IP2MxB4ljuGCwyjwefy1qk' },
    { name: 'F. Segurança - Hoteis', link: 'https://chat.whatsapp.com/Fo8LZwLyFka0uAlQNlta33' }
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
                 Canal direto com as autoridades, cartilhas de prevenção e ferramentas oficiais.
               </p>
            </div>
            
            <button 
              onClick={onReport}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-red-900/20 flex items-center gap-2 transition-transform hover:scale-105"
            >
              <AlertTriangle className="w-5 h-5" />
              Reportar Incidente (Interno)
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
            { name: 'Central 1746', sub: 'Prefeitura do Rio', phone: '1746', icon: Phone, color: 'bg-orange-500' },
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
          
          {/* Left Column: Cartilhas */}
          <div className="lg:col-span-2 space-y-6">
             
             {/* Protocols Downloads */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
              <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5 text-rio-blue" />
                Cartilhas e Manuais Operacionais
              </h2>
              <p className="text-gray-500 text-sm mb-6">
                  Material oficial desenvolvido em parceria com as forças de segurança para orientação das equipes hoteleiras.
              </p>
              <div className="grid grid-cols-1 gap-4">
                  {downloads.map((doc, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-rio-blue hover:bg-blue-50 transition-all group cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="bg-gray-100 p-2 rounded text-gray-500 group-hover:text-rio-blue group-hover:bg-white transition-colors">
                          <FileCheck className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-medium text-gray-700 group-hover:text-rio-blue">{doc}</span>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-rio-blue" />
                    </div>
                  ))}
              </div>
            </div>

          </div>

          {/* Right Column: External Services & WhatsApp */}
          <div className="space-y-6">
            
            {/* Delegacia Online */}
            <div className="bg-slate-800 rounded-xl p-6 text-white shadow-lg relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 group-hover:bg-white/10 transition-colors" />
               <h3 className="font-bold text-lg mb-2 relative z-10 flex items-center gap-2">
                   <FileText className="w-5 h-5" /> RO Online
               </h3>
               <p className="text-slate-300 text-sm mb-6 relative z-10">
                 Registre ocorrências (furtos, perdas, etc.) diretamente pelo site oficial da Polícia Civil.
               </p>
               <a 
                 href="https://www.rj.gov.br/servico/fazer-registro-online-de-crime72" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="block w-full bg-white text-slate-900 font-bold py-3 rounded-lg text-sm hover:bg-slate-100 transition-colors text-center relative z-10"
               >
                 Acessar Delegacia Online
               </a>
            </div>

            {/* WhatsApp Groups */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
               <h3 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-wide flex items-center gap-2">
                   <Users className="w-4 h-4 text-green-600" />
                   Fóruns de Segurança
               </h3>
               <p className="text-xs text-gray-500 mb-4">
                   Grupos exclusivos para comunicação imediata entre gestores de segurança e hotéis.
               </p>
               
               <div className="space-y-3">
                   {whatsappGroups.map((group, idx) => (
                       <a 
                         key={idx}
                         href={group.link}
                         target="_blank"
                         rel="noopener noreferrer"
                         className="flex items-center justify-between p-3 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 border border-green-200 transition-colors group"
                       >
                           <span className="font-bold text-xs">{group.name}</span>
                           <LinkIcon className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                       </a>
                   ))}
               </div>
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

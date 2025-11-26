

import React, { useState } from 'react';
import { ArrowLeft, Mail, UserCog, Send, CheckCircle2, Copy, Users, ExternalLink, MessageSquare } from 'lucide-react';
import { CRM_LINK } from '../constants';

interface RegistrationUpdatePageProps {
  onBack: () => void;
}

const RegistrationUpdatePage: React.FC<RegistrationUpdatePageProps> = ({ onBack }) => {
  const [email, setEmail] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isWhatsappCopied, setIsWhatsappCopied] = useState(false);
  const [inviteSent, setInviteSent] = useState(false);

  const whatsappMessage = `Olá! 👋\n\nEstou atualizando o cadastro da nossa equipe junto ao HoteisRio.\n\nÉ super importante que todos se cadastrem para receber o Informativo Mensal, convites para eventos exclusivos e alertas de segurança. 🛡️\n\nCadastre-se rapidinho aqui: ${CRM_LINK}\n\nAssim ninguém perde nada importante do setor! 🚀`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(CRM_LINK);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleCopyWhatsapp = () => {
    navigator.clipboard.writeText(whatsappMessage);
    setIsWhatsappCopied(true);
    setTimeout(() => setIsWhatsappCopied(false), 2000);
  };

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail) return;
    
    // Simulate sending invitation
    setInviteSent(true);
    setTimeout(() => {
        setInviteSent(false);
        setInviteEmail('');
    }, 3000);
  };

  const openMailClient = () => {
    const subject = encodeURIComponent("Convite Oficial: Acesso ao Informativo e Benefícios HoteisRio");
    const body = encodeURIComponent(`Olá equipe,\n\nEstou atualizando os contatos do nosso hotel junto à Associação HoteisRio.\n\nPara garantir que todos tenham acesso aos benefícios, alertas de segurança e ao calendário de eventos e treinamentos, é fundamental que cada um realize seu cadastro no link abaixo:\n\n${CRM_LINK}\n\nO cadastro é rápido e garante o recebimento do Informativo Mensal com todas as novidades do setor.\n\nConto com a colaboração de todos.\n\nAtenciosamente,`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-12 animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-rio-blue to-blue-900 text-white pt-8 pb-16 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-2xl" />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-blue-200 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar para Dashboard
          </button>

          <div className="flex items-center gap-4 mb-4">
             <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
               <UserCog className="w-10 h-10 text-rio-gold" />
             </div>
             <div>
                <h1 className="text-3xl font-bold">Atualização Cadastral</h1>
                <p className="text-blue-100 mt-1 max-w-xl">
                  Garanta que você e sua equipe recebam o Informativo Mensal, alertas jurídicos e convites para eventos.
                </p>
             </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 -mt-8 relative z-20 space-y-6">
        
        {/* Card 1: Atualização Pessoal */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-8 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-4">
              <span className="w-2 h-8 bg-rio-gold rounded-full"></span>
              Atualize seus dados
            </h2>
            <div className="flex flex-col md:flex-row gap-8 items-start">
               <div className="flex-1 text-gray-600 leading-relaxed">
                 <p className="mb-4">
                   É fundamental manter seu e-mail atualizado em nosso sistema para não perder informações críticas sobre:
                 </p>
                 <ul className="space-y-2 mb-6">
                   {['Alterações na Legislação (Civil e Trabalhista)', 'Informativo Mensal de Notícias', 'Alertas de Segurança Pública', 'Convites para Fóruns, Treinamentos e Eventos'].map((item, i) => (
                     <li key={i} className="flex items-center gap-2 text-sm">
                       <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                       {item}
                     </li>
                   ))}
                 </ul>
                 
                 <a 
                   href={CRM_LINK} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="inline-flex items-center gap-2 bg-rio-blue hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-md hover:shadow-lg"
                 >
                   Acessar Formulário de Atualização
                   <ExternalLink className="w-4 h-4" />
                 </a>
               </div>
               
               <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 md:w-72 shrink-0">
                  <Mail className="w-8 h-8 text-rio-blue mb-3" />
                  <h3 className="font-bold text-gray-800 text-sm mb-1">Informativo HoteisRio</h3>
                  <p className="text-xs text-gray-500">
                    Ao atualizar seu cadastro, você garante o recebimento do nosso informativo oficial com todas as novidades do setor.
                  </p>
               </div>
            </div>
          </div>
        </div>

        {/* Card 2: Compartilhar com a Equipe */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-8">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-2">
              <span className="w-2 h-8 bg-green-500 rounded-full"></span>
              Convide sua Equipe
            </h2>
            <p className="text-gray-500 mb-8">
              Utilize as ferramentas abaixo para engajar seus gestores e garantir que todos estejam informados.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               
               {/* Option A: WhatsApp Alta Conversão */}
               <div className="space-y-4">
                  <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-green-600" />
                    Mensagem para WhatsApp
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-sm text-gray-600 whitespace-pre-wrap font-medium h-48 overflow-y-auto">
                    {whatsappMessage}
                  </div>
                  <button 
                    onClick={handleCopyWhatsapp}
                    className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-bold shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    {isWhatsappCopied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {isWhatsappCopied ? 'Copiado!' : 'Copiar Mensagem Pronta'}
                  </button>
               </div>

               {/* Option B: Official Email */}
               <div className="flex flex-col h-full">
                  <h3 className="font-semibold text-gray-700 flex items-center gap-2 mb-4">
                    <Mail className="w-4 h-4 text-rio-blue" />
                    E-mail Corporativo
                  </h3>
                  <div className="flex-1 flex flex-col justify-between space-y-4">
                    <p className="text-sm text-gray-500 leading-relaxed">
                      Envie um convite formal para toda a sua lista de distribuição interna. O modelo já vem com assunto e corpo de texto profissional focado na importância do cadastro.
                    </p>
                    
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-xs text-gray-500 italic mb-2">
                      "Assunto: Convite Oficial: Acesso ao Informativo e Benefícios HoteisRio..."
                    </div>

                    <button 
                      onClick={openMailClient}
                      className="w-full flex items-center justify-center gap-2 border-2 border-rio-blue text-rio-blue hover:bg-blue-50 px-4 py-2.5 rounded-lg transition-colors font-bold"
                    >
                      Abrir no Outlook / Gmail
                      <ExternalLink className="w-4 h-4" />
                    </button>
                    
                    <div className="pt-4 border-t border-gray-100">
                      <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Ou copie apenas o link:</h4>
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          value={CRM_LINK} 
                          readOnly 
                          className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-500 outline-none"
                        />
                        <button 
                          onClick={handleCopyLink}
                          className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg font-medium transition-colors flex items-center gap-1 text-xs"
                        >
                          {isCopied ? <CheckCircle2 className="w-3 h-3 text-green-600" /> : <Copy className="w-3 h-3" />}
                          {isCopied ? 'Copiado' : 'Copiar'}
                        </button>
                      </div>
                    </div>
                  </div>
               </div>
            </div>

            {/* Direct Invite Simulation */}
            <div className="mt-10 pt-8 border-t border-gray-100">
               <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  Envio Rápido por E-mail
               </h3>
               <form onSubmit={handleSendInvite} className="flex gap-2">
                 <input 
                   type="email" 
                   required
                   placeholder="Digite o e-mail do colaborador..." 
                   className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-rio-blue outline-none"
                   value={inviteEmail}
                   onChange={(e) => setInviteEmail(e.target.value)}
                 />
                 <button 
                   type="submit"
                   className="bg-rio-blue hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold shadow-md transition flex items-center gap-2"
                 >
                   <Send className="w-4 h-4" />
                   Enviar
                 </button>
               </form>
               {inviteSent && (
                 <p className="text-green-600 text-sm mt-2 flex items-center gap-1 animate-fade-in">
                   <CheckCircle2 className="w-4 h-4" />
                   Convite enviado com sucesso!
                 </p>
               )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default RegistrationUpdatePage;
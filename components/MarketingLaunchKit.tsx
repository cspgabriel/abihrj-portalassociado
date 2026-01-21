
import React, { useState } from 'react';
import { ArrowLeft, Mail, MessageCircle, Copy, CheckCircle2, Rocket, Download, LayoutTemplate } from 'lucide-react';

interface MarketingLaunchKitProps {
  onBack: () => void;
}

const MarketingLaunchKit: React.FC<MarketingLaunchKitProps> = ({ onBack }) => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const emailSubject = "🚀 Chegou! O Novo Portal do Associado HoteisRio está no ar";
  const emailBody = `Prezado(a) Associado(a),

É com grande satisfação que apresentamos a sua nova central de inteligência e gestão: o **Novo Portal do Associado HoteisRio**.

Desenvolvemos uma plataforma moderna, rápida e integrada para facilitar o seu dia a dia. Agora, em um único lugar, você tem acesso a:

✅ **Painel de Gestão:** Indicadores de mercado e previsão do tempo em tempo real.
✅ **Serviços Online:** Solicitações jurídicas e demandas de ordem pública com um clique.
✅ **Calendário Integrado:** Todos os eventos da cidade e do setor hoteleiro.
✅ **Comunidade:** Acesso direto aos grupos de WhatsApp oficiais.
✅ **HoteisRio Academy:** Treinamentos e cursos exclusivos para sua equipe.

**Acesse agora mesmo:**
[Link do Portal Aqui]

Dúvidas? Nossa nova Inteligência Artificial está pronta para te ajudar no canto da tela!

Atenciosamente,
Equipe HoteisRio`;

  const whatsappText = `Olá! 👋

Grandes novidades para a hotelaria carioca! 🏨🚀

Acabamos de lançar o **Novo Portal do Associado HoteisRio**. Tudo o que você precisa para gerir seu hotel e se conectar com o setor, agora em um só lugar.

🔹 Jurídico e Ordem Pública
🔹 Calendário de Eventos 2026
🔹 Clube de Benefícios
🔹 Assistente Virtual Inteligente 🤖

Acesse agora e confira: [Link do Portal Aqui]

Contamos com você!`;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans animate-fade-in">
      {/* Top Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50 px-6 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
                <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex flex-col">
                <span className="font-bold text-rio-blue text-lg leading-none">Marketing Kit</span>
                <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Uso Interno & Divulgação</span>
            </div>
        </div>
        <div className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold border border-yellow-200 flex items-center gap-1">
            <Rocket className="w-3 h-3" />
            Lançamento Oficial
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">
        
        {/* Hero Presentation */}
        <div className="bg-gradient-to-r from-rio-blue to-blue-800 rounded-3xl p-10 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
            <div className="relative z-10 max-w-2xl">
                <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                    Apresentando o <br/>
                    <span className="text-rio-gold">Novo Portal do Associado</span>
                </h1>
                <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                    Esta página contém todos os materiais necessários para a campanha de lançamento. 
                    Utilize os textos abaixo para comunicar a novidade via E-mail Marketing e Listas de Transmissão.
                </p>
                <div className="flex flex-wrap gap-4">
                    <button onClick={() => document.getElementById('email-section')?.scrollIntoView({ behavior: 'smooth' })} className="bg-white text-rio-blue px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition shadow-md flex items-center gap-2">
                        <Mail className="w-4 h-4" /> Ir para E-mail
                    </button>
                    <button onClick={() => document.getElementById('whatsapp-section')?.scrollIntoView({ behavior: 'smooth' })} className="bg-green-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-600 transition shadow-md flex items-center gap-2">
                        <MessageCircle className="w-4 h-4" /> Ir para WhatsApp
                    </button>
                </div>
            </div>
        </div>

        {/* Assets Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Email Marketing Asset */}
            <div id="email-section" className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="font-bold text-gray-800 flex items-center gap-2">
                        <div className="bg-blue-100 p-2 rounded-lg text-rio-blue"><Mail className="w-5 h-5" /></div>
                        Template de E-mail
                    </h3>
                    <span className="text-xs font-medium text-gray-500 bg-white px-2 py-1 rounded border border-gray-200">Formal</span>
                </div>
                
                <div className="p-6 flex-1 space-y-4">
                    <div>
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 block">Assunto Sugerido</label>
                        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-gray-700 font-medium text-sm flex justify-between items-center group">
                            {emailSubject}
                            <button onClick={() => copyToClipboard(emailSubject, 'subject')} className="text-gray-400 hover:text-rio-blue transition">
                                {copiedSection === 'subject' ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 block">Corpo do E-mail</label>
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-gray-600 text-sm whitespace-pre-line leading-relaxed font-mono relative group h-96 overflow-y-auto">
                            {emailBody}
                            <button 
                                onClick={() => copyToClipboard(emailBody, 'body')}
                                className="absolute top-4 right-4 bg-white p-2 rounded-lg shadow-sm border border-gray-200 text-gray-500 hover:text-rio-blue hover:border-rio-blue transition-all"
                                title="Copiar texto"
                            >
                                {copiedSection === 'body' ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-50 p-4 border-t border-gray-200 text-center">
                    <button onClick={() => copyToClipboard(emailBody, 'body-full')} className="text-rio-blue font-bold text-sm hover:underline">Copiar Conteúdo Completo</button>
                </div>
            </div>

            {/* WhatsApp Marketing Asset */}
            <div id="whatsapp-section" className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
                <div className="bg-green-50 px-6 py-4 border-b border-green-100 flex justify-between items-center">
                    <h3 className="font-bold text-green-800 flex items-center gap-2">
                        <div className="bg-green-200 p-2 rounded-lg text-green-700"><MessageCircle className="w-5 h-5" /></div>
                        Template WhatsApp
                    </h3>
                    <span className="text-xs font-medium text-green-700 bg-white px-2 py-1 rounded border border-green-200">Alta Conversão</span>
                </div>
                
                <div className="p-6 flex-1 flex flex-col justify-center">
                    <div className="bg-[#e5ddd5] p-6 rounded-2xl border border-gray-200 relative shadow-inner">
                        <div className="bg-white p-4 rounded-lg rounded-tl-none shadow-sm text-gray-800 text-sm whitespace-pre-line leading-relaxed relative">
                            {whatsappText}
                            <div className="absolute -bottom-2 right-2 text-[10px] text-gray-400 flex items-center gap-1">
                                10:42 <span className="text-blue-400">✓✓</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-6 pt-0">
                     <button 
                        onClick={() => copyToClipboard(whatsappText, 'whatsapp')}
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                     >
                        {copiedSection === 'whatsapp' ? <CheckCircle2 className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                        {copiedSection === 'whatsapp' ? 'Copiado!' : 'Copiar Mensagem'}
                     </button>
                </div>
            </div>

        </div>

        {/* Additional Instructions */}
        <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-6 flex items-start gap-4">
            <div className="bg-yellow-200 p-2 rounded-full text-yellow-800 shrink-0">
                <LayoutTemplate className="w-6 h-6" />
            </div>
            <div>
                <h3 className="font-bold text-yellow-900 text-lg mb-1">Próximos Passos</h3>
                <p className="text-yellow-800 text-sm leading-relaxed">
                    Certifique-se de substituir os campos <strong>[Link do Portal Aqui]</strong> pela URL oficial da aplicação antes do envio. 
                    Recomendamos realizar o disparo em ondas (lotes) para monitorar o tráfego no servidor.
                </p>
            </div>
        </div>

      </div>
    </div>
  );
};

export default MarketingLaunchKit;

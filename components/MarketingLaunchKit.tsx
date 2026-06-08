
import React, { useState } from 'react';
import { ArrowLeft, Mail, MessageCircle, Copy, CheckCircle2, Rocket, Download, Monitor, Star, Share2, Eye, FileText, ExternalLink } from 'lucide-react';

interface MarketingLaunchKitProps {
  onBack: () => void;
}

const MarketingLaunchKit: React.FC<MarketingLaunchKitProps> = ({ onBack }) => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [emailViewMode, setEmailViewMode] = useState<'PREVIEW' | 'CODE'>('PREVIEW');

  const emailSubject = "🚀 Chegou! O Novo Portal do Associado HoteisRio está no ar";
  
  // Texto puro para cópia
  const emailBodyText = `Prezado(a) Associado(a),

É com grande satisfação que apresentamos a sua nova central de inteligência e gestão: o **Novo Portal do Associado HoteisRio**.

Desenvolvemos uma plataforma moderna, rápida e integrada para facilitar o seu dia a dia. Agora, em um único lugar, você tem acesso a:

✅ Painel de Gestão: Indicadores de mercado e previsão do tempo em tempo real.
✅ Serviços Online: Solicitações jurídicas e demandas de ordem pública com um clique.
✅ Calendário Integrado: Todos os eventos da cidade e do setor hoteleiro.
✅ Comunidade: Acesso direto aos grupos de WhatsApp oficiais.
✅ HoteisRio Academy: Treinamentos e cursos exclusivos para sua equipe.

Acesse agora mesmo:
https://portal.hoteisrio.com.br

Dúvidas? Nossa nova Inteligência Artificial está pronta para te ajudar no canto da tela!

Atenciosamente,
Equipe HoteisRio`;

  const whatsappText = `Olá! 👋

Grandes novidades para a hotelaria carioca! 🏨🚀

Acabamos de lançar o *Novo Portal do Associado HoteisRio*. Tudo o que você precisa para gerir seu hotel e se conectar com o setor, agora em um só lugar.

🔹 Jurídico e Ordem Pública
🔹 Calendário de Eventos 2026
🔹 Clube de Benefícios
🔹 Assistente Virtual Inteligente 🤖

Acesse agora e confira: https://portal.hoteisrio.com.br

Contamos com você!`;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans animate-fade-in">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50 px-6 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
                <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex flex-col">
                <span className="font-bold text-rio-blue text-lg leading-none">Kit de Lançamento</span>
                <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Uso Interno & Divulgação</span>
            </div>
        </div>
        <div className="flex items-center gap-2">
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
                Versão 1.0
            </span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10 space-y-12">
        
        {/* SECTION 1: APRESENTAÇÃO */}
        <section className="space-y-6">
            <div className="flex items-center gap-2 text-rio-blue font-bold uppercase tracking-wider text-sm">
                <Monitor className="w-4 h-4" />
                Visão Geral
            </div>
            
            <div className="bg-gradient-to-br from-slate-900 via-rio-blue to-blue-900 rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full -mr-40 -mt-40 blur-3xl" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-rio-gold/10 rounded-full -ml-20 -mb-20 blur-3xl" />

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-xs font-bold text-rio-gold mb-6">
                            <Rocket className="w-3 h-3" /> Lançamento Oficial
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                            Novo Portal do <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rio-gold to-yellow-200">
                                Associado HoteisRio
                            </span>
                        </h1>
                        <p className="text-blue-100 text-lg mb-8 leading-relaxed max-w-lg">
                            Uma plataforma redesenhada do zero. Mais rápida, inteligente e conectada. 
                            Centralizamos benefícios, serviços públicos e networking em uma única interface.
                        </p>
                        
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 bg-black/20 px-4 py-2 rounded-lg border border-white/10">
                                <Star className="w-4 h-4 text-rio-gold" />
                                <span className="text-sm font-medium">IA Integrada</span>
                            </div>
                            <div className="flex items-center gap-2 bg-black/20 px-4 py-2 rounded-lg border border-white/10">
                                <Monitor className="w-4 h-4 text-rio-gold" />
                                <span className="text-sm font-medium">100% Web App</span>
                            </div>
                        </div>
                    </div>

                    <div className="relative hidden lg:block">
                        <div className="bg-white rounded-xl shadow-2xl overflow-hidden border-4 border-slate-800/50 transform rotate-2 hover:rotate-0 transition-all duration-500 max-w-sm mx-auto">
                            <div className="bg-slate-100 border-b border-gray-200 p-3 flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-400" />
                                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                                <div className="w-3 h-3 rounded-full bg-green-400" />
                            </div>
                            <div className="bg-gray-50 p-6 space-y-4">
                                <div className="h-20 bg-rio-blue rounded-xl w-full opacity-90 flex items-center justify-center">
                                    <span className="text-white font-bold text-xs opacity-50">DASHBOARD</span>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="h-16 bg-white rounded-xl shadow-sm" />
                                    <div className="h-16 bg-white rounded-xl shadow-sm" />
                                </div>
                                <div className="h-32 bg-white rounded-xl shadow-sm" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* SECTION 2: MARKETING ASSETS */}
        <section className="space-y-6">
            <div className="flex items-center gap-2 text-rio-blue font-bold uppercase tracking-wider text-sm">
                <Share2 className="w-4 h-4" />
                Canais de Divulgação
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Email Card Template */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-full">
                    <div className="bg-blue-50 px-6 py-4 border-b border-blue-100 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="bg-blue-200 p-2 rounded-lg text-blue-700"><Mail className="w-5 h-5" /></div>
                            <h3 className="font-bold text-blue-900">Template de E-mail</h3>
                        </div>
                        <div className="flex bg-white rounded-lg p-1 border border-blue-200">
                            <button 
                                onClick={() => setEmailViewMode('PREVIEW')}
                                className={`p-1.5 rounded-md transition-all ${emailViewMode === 'PREVIEW' ? 'bg-blue-100 text-blue-700' : 'text-gray-400 hover:text-gray-600'}`}
                                title="Visualizar Layout"
                            >
                                <Eye className="w-4 h-4" />
                            </button>
                            <button 
                                onClick={() => setEmailViewMode('CODE')}
                                className={`p-1.5 rounded-md transition-all ${emailViewMode === 'CODE' ? 'bg-blue-100 text-blue-700' : 'text-gray-400 hover:text-gray-600'}`}
                                title="Ver Texto"
                            >
                                <FileText className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                    
                    <div className="flex-1 bg-gray-100 p-6 overflow-y-auto max-h-[600px]">
                        {emailViewMode === 'PREVIEW' ? (
                            // HTML EMAIL PREVIEW SIMULATION
                            <div className="max-w-md mx-auto bg-white shadow-xl rounded-none border-t-4 border-rio-blue">
                                <div className="p-6 text-center border-b border-gray-100 bg-gray-50">
                                    <img src="https://abihrj.com.br/wp-content/uploads/2026/03/Logo-ABIH-RJ-azul-fundo-transparente-5.webp" alt="ABIH-RJ" className="h-8 mx-auto" />
                                </div>
                                <div className="p-8 text-gray-700 font-sans text-sm leading-relaxed">
                                    <p className="mb-4">Prezado(a) Associado(a),</p>
                                    <p className="mb-6">É com grande satisfação que apresentamos a sua nova central de inteligência e gestão: o <strong>Novo Portal do Associado HoteisRio</strong>.</p>
                                    
                                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-6 text-left">
                                        <ul className="space-y-2">
                                            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" /> <span><strong>Painel de Gestão:</strong> Indicadores e clima em tempo real.</span></li>
                                            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" /> <span><strong>Serviços Online:</strong> Jurídico e Ordem Pública num clique.</span></li>
                                            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" /> <span><strong>Comunidade:</strong> Acesso direto aos grupos oficiais.</span></li>
                                        </ul>
                                    </div>

                                    <div className="text-center mb-8">
                                        <button className="bg-rio-blue text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-blue-800 transition-colors inline-block">
                                            Acessar Portal Agora
                                        </button>
                                    </div>

                                    <p className="text-xs text-gray-500 text-center border-t border-gray-100 pt-4">
                                        Dúvidas? Nossa IA está pronta para ajudar no canto da tela!<br/>
                                        Equipe HoteisRio
                                    </p>
                                </div>
                            </div>
                        ) : (
                            // PLAIN TEXT MODE
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between mb-1">
                                        <label className="text-xs font-bold text-gray-400 uppercase">Assunto</label>
                                        <button onClick={() => copyToClipboard(emailSubject, 'subject')} className="text-rio-blue hover:underline text-xs font-bold">Copiar</button>
                                    </div>
                                    <div className="bg-white p-3 rounded-lg border border-gray-200 text-gray-800 text-sm font-medium">
                                        {emailSubject}
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between mb-1">
                                        <label className="text-xs font-bold text-gray-400 uppercase">Corpo do E-mail</label>
                                        <button onClick={() => copyToClipboard(emailBodyText, 'body')} className="text-rio-blue hover:underline text-xs font-bold">Copiar</button>
                                    </div>
                                    <textarea 
                                        readOnly 
                                        className="w-full bg-white p-4 rounded-xl border border-gray-200 text-gray-600 text-sm h-64 focus:outline-none resize-none font-mono"
                                        value={emailBodyText}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="bg-white p-4 border-t border-gray-200">
                        <button onClick={() => copyToClipboard(emailBodyText, 'email-full')} className="w-full bg-white border border-gray-300 hover:border-rio-blue text-gray-700 hover:text-rio-blue font-bold py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
                            {copiedSection === 'email-full' ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                            {copiedSection === 'email-full' ? 'Copiado!' : 'Copiar Texto Completo'}
                        </button>
                    </div>
                </div>

                {/* WhatsApp Card */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
                    <div className="bg-green-50 px-6 py-4 border-b border-green-100 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="bg-green-200 p-2 rounded-lg text-green-700"><MessageCircle className="w-5 h-5" /></div>
                            <h3 className="font-bold text-green-900">WhatsApp / Listas</h3>
                        </div>
                        <span className="text-xs font-bold text-green-600 bg-white px-2 py-1 rounded border border-green-200">Viral</span>
                    </div>
                    
                    <div className="p-6 flex-1 bg-[#e5ddd5] relative">
                        <div className="bg-white p-4 rounded-lg rounded-tl-none shadow-sm text-gray-800 text-sm whitespace-pre-line leading-relaxed relative max-w-sm">
                            {whatsappText}
                            <div className="absolute -bottom-2 right-2 text-[10px] text-gray-400 flex items-center gap-1">
                                10:42 <span className="text-blue-400">✓✓</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 border-t border-gray-200">
                         <button 
                            onClick={() => copyToClipboard(whatsappText, 'whatsapp')}
                            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                         >
                            {copiedSection === 'whatsapp' ? <CheckCircle2 className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                            {copiedSection === 'whatsapp' ? 'Mensagem Copiada!' : 'Copiar Mensagem'}
                         </button>
                    </div>
                </div>

            </div>
        </section>

        {/* SECTION 3: DOWNLOADS */}
        <section className="bg-yellow-50 border border-yellow-100 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
                <div className="bg-yellow-200 p-3 rounded-full text-yellow-800 shrink-0">
                    <Download className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="font-bold text-yellow-900 text-lg">Mídia Kit Gráfico</h3>
                    <p className="text-yellow-800 text-sm leading-relaxed max-w-xl">
                        Baixe o pacote completo com banners para redes sociais (Stories e Feed), logo do novo portal e assinaturas de e-mail.
                    </p>
                </div>
            </div>
            <button className="whitespace-nowrap px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-xl font-bold shadow-md transition-colors flex items-center gap-2">
                Baixar .ZIP (12MB)
                <Download className="w-4 h-4" />
            </button>
        </section>

      </div>
    </div>
  );
};

export default MarketingLaunchKit;

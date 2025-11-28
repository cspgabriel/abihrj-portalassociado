
import React from 'react';
import { ArrowLeft, Music, Calendar, CheckCircle2, ExternalLink, Ticket, Mail, MapPin } from 'lucide-react';

interface RockInRioPageProps {
  onBack: () => void;
}

const RockInRioPage: React.FC<RockInRioPageProps> = ({ onBack }) => {
  const REGISTRATION_LINK = "https://forms.gle/Ce6bPNEvsrMXPYEa7";

  return (
    <div className="bg-white min-h-screen pb-12 animate-fade-in">
      {/* Header Temático */}
      <div className="bg-gradient-to-r from-purple-900 via-purple-800 to-pink-700 text-white pt-8 pb-24 px-6 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-500/20 rounded-full -ml-10 -mb-10 blur-2xl" />
        
        <div className="max-w-5xl mx-auto relative z-10">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-purple-200 hover:text-white transition-colors mb-8 group"
          >
            <div className="p-1 rounded-full bg-black/20 group-hover:bg-black/40 transition">
               <ArrowLeft className="w-5 h-5" />
            </div>
            <span className="font-medium">Voltar para o Dashboard</span>
          </button>

          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-2xl rotate-3 transform hover:rotate-0 transition-all duration-500">
              <Music className="w-20 h-20 text-pink-400" strokeWidth={1.5} />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-3 shadow-lg">
                 <Ticket className="w-3 h-3" />
                 Parceria Exclusiva 2026
              </div>
              <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight leading-tight">
                Viva o Rio com o <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-yellow-200">
                  Rock in Rio
                </span>
              </h1>
              <p className="text-purple-100 text-lg md:text-xl max-w-2xl leading-relaxed font-light">
                Cadastre seu hotel no hub oficial de benefícios do maior festival de música e entretenimento do mundo.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 -mt-16 relative z-20">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Coluna Esquerda: Informações */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Intro Card */}
            <div className="bg-white rounded-2xl shadow-xl border border-purple-50 p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Music className="w-6 h-6 text-purple-600" />
                O Hub de Benefícios
              </h2>
              <div className="prose prose-purple text-gray-600 leading-relaxed space-y-4">
                <p>
                  O <strong>Viva o Rio com o Rock in Rio</strong> é um hub que reúne vantagens exclusivas em atrativos turísticos, programações e hotéis por todo o estado do Rio de Janeiro.
                </p>
                <p>
                  A iniciativa reforça o compromisso do festival em valorizar e movimentar a cidade ao longo de todo o ano, não apenas durante os dias de show. Em edições anteriores, ações semelhantes alcançaram <strong>20 milhões de pessoas</strong>.
                </p>
                <div className="bg-purple-50 p-4 rounded-xl border border-purple-100 flex gap-3 mt-4">
                   <Calendar className="w-6 h-6 text-purple-600 shrink-0" />
                   <div>
                     <h4 className="font-bold text-gray-800 text-sm">Período de Vigência</h4>
                     <p className="text-sm text-gray-600">De Dezembro de 2025 até Outubro de 2026.</p>
                   </div>
                </div>
              </div>
            </div>

            {/* Como Funciona */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Como seu hotel participa?</h2>
              
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center font-bold shrink-0">1</div>
                  <div>
                    <h3 className="font-bold text-gray-800">Autonomia Total</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      O hotel define as vantagens, condições e períodos. Você pode entrar e sair da campanha quando quiser dentro do prazo (Dez/25 a Out/26).
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center font-bold shrink-0">2</div>
                  <div>
                    <h3 className="font-bold text-gray-800">Mecânica de Uso</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      As ofertas serão resgatadas pelos usuários no site do seu hotel utilizando o <strong>ID do Ingresso do Rock in Rio</strong>. 
                      <span className="block mt-1 text-xs bg-gray-100 p-2 rounded text-gray-500 italic">
                        Nota: A organização solicita o uso exclusivo do ID do ingresso, evitando outros códigos promocionais complexos.
                      </span>
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center font-bold shrink-0">3</div>
                  <div>
                    <h3 className="font-bold text-gray-800">Visibilidade Mensal</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Divulgação contínua nos canais proprietários do Rock in Rio e e-mail marketing oficial.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

          </div>

          {/* Coluna Direita: CTA e Prazos */}
          <div className="space-y-6">
            
            {/* Card de Ação */}
            <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 p-6 sticky top-24">
              <h3 className="font-bold text-gray-800 text-lg mb-2">Participe Agora</h3>
              <p className="text-sm text-gray-500 mb-6">
                A adesão é totalmente gratuita. Não deixe seu hotel fora desta vitrine global.
              </p>

              <a 
                href={REGISTRATION_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg transform transition-all hover:scale-105 flex items-center justify-center gap-2 mb-4"
              >
                Preencher Formulário
                <ExternalLink className="w-5 h-5" />
              </a>

              <div className="bg-gray-50 rounded-lg p-4 space-y-3 border border-gray-100">
                <h4 className="font-bold text-xs text-gray-400 uppercase tracking-wide">Prazos Importantes</h4>
                
                <div className="flex items-start gap-3">
                   <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                   <p className="text-xs text-gray-600">
                     Envios até <strong className="text-gray-800">01/Dez/2025</strong> entram no lançamento do hub.
                   </p>
                </div>
                <div className="flex items-start gap-3">
                   <CheckCircle2 className="w-4 h-4 text-orange-500 mt-0.5" />
                   <p className="text-xs text-gray-600">
                     Envios após essa data entram na atualização de Fev/2026.
                   </p>
                </div>
              </div>

              <hr className="my-6 border-gray-100" />

              <div className="text-center">
                <p className="text-xs text-gray-500 mb-2">Dúvidas? Fale com a equipe Rock World</p>
                <a href="mailto:jessicamarins@rockinrio.com" className="flex items-center justify-center gap-2 text-sm font-medium text-purple-600 hover:text-purple-800 transition">
                  <Mail className="w-4 h-4" />
                  jessicamarins@rockinrio.com
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default RockInRioPage;

import React from 'react';
import { ArrowLeft, LayoutDashboard, Search, MessageSquare, MousePointerClick, UserCircle } from 'lucide-react';

interface PlatformTutorialProps {
  onBack: () => void;
}

const PlatformTutorial: React.FC<PlatformTutorialProps> = ({ onBack }) => {
  const steps = [
    {
      title: "O Dashboard",
      description: "Sua tela inicial é dividida em duas partes principais: Serviços Online (no topo) para ferramentas de uso diário e Catálogo de Benefícios (abaixo) para consultar tudo que a associação oferece.",
      icon: LayoutDashboard,
      color: "bg-blue-100 text-rio-blue"
    },
    {
      title: "Acessando Serviços",
      description: "Para usar ferramentas como o Canal Ordem Pública ou Jurídico, clique no botão 'Utilizar' nos cards superiores. Alguns serviços abrem formulários diretos, outros abrem painéis de dados (BI).",
      icon: MousePointerClick,
      color: "bg-green-100 text-green-600"
    },
    {
      title: "Consultando Benefícios",
      description: "No catálogo inferior, use as abas (Jurídico, Eventos, etc.) para filtrar. Clique em 'Detalhes' para ver uma página completa explicando como funciona e como solicitar cada item.",
      icon: Search,
      color: "bg-purple-100 text-purple-600"
    },
    {
      title: "Assistente Virtual (IA)",
      description: "No canto inferior direito, o ícone de chat abre nossa Inteligência Artificial. Você pode perguntar coisas como 'Como funciona o desconto de IPTU?' e ela responderá na hora.",
      icon: MessageSquare,
      color: "bg-orange-100 text-orange-600"
    },
    {
      title: "Seu Perfil",
      description: "No canto superior direito, você vê seu nome e hotel. Ali você também pode fazer logout com segurança quando terminar de usar a plataforma.",
      icon: UserCircle,
      color: "bg-gray-100 text-gray-600"
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen animate-fade-in">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-500 hover:text-rio-blue transition mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Voltar para o Dashboard
        </button>

        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-3">Como usar a Central do Associado</h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Um guia rápido para você extrair o máximo das ferramentas e benefícios exclusivos do HoteisRio.
          </p>
        </div>

        <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
          {steps.map((step, index) => (
            <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              
              {/* Icon Marker */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-slate-300 group-[.is-active]:bg-rio-blue text-slate-500 group-[.is-active]:text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-colors">
                <span className="font-bold text-xs">{index + 1}</span>
              </div>
              
              {/* Content Card */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 rounded-lg ${step.color}`}>
                    <step.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-gray-800 text-lg">{step.title}</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>

            </div>
          ))}
        </div>

        <div className="mt-12 bg-rio-blue text-white rounded-2xl p-8 text-center shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Pronto para começar?</h2>
          <p className="text-blue-100 mb-6">Agora que você já conhece a plataforma, explore os serviços disponíveis para o seu hotel.</p>
          <button 
            onClick={onBack}
            className="bg-white text-rio-blue px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition shadow-md"
          >
            Ir para o Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlatformTutorial;
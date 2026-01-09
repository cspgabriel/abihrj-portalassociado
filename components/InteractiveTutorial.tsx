
import React, { useState, useEffect } from 'react';
import { X, ChevronRight, ChevronLeft, MousePointer2, Zap, BookOpen, CheckCircle } from 'lucide-react';

interface Step {
  targetId: string;
  title: string;
  description: string;
  position: 'top' | 'bottom' | 'left' | 'right';
}

interface InteractiveTutorialProps {
  onClose: () => void;
}

const QUICK_STEPS: Step[] = [
  {
    targetId: 'header-welcome',
    title: 'Seu Painel Principal',
    description: 'Este é o seu centro de comando. Aqui você encontra as informações mais importantes e acesso rápido aos serviços.',
    position: 'bottom'
  },
  {
    targetId: 'highlights-section',
    title: 'Destaques',
    description: 'Fique por dentro das últimas notícias, eventos importantes e benefícios recém-lançados.',
    position: 'bottom'
  },
  {
    targetId: 'quick-access-section',
    title: 'Acesso Rápido',
    description: 'Atalhos diretos para as ferramentas essenciais: Agenda, Segurança e Campanhas.',
    position: 'top'
  },
  {
    targetId: 'explore-benefits-btn',
    title: 'Todos os Benefícios',
    description: 'Explore o catálogo completo de serviços, parcerias e descontos exclusivos para associados.',
    position: 'top'
  },
  {
    targetId: 'ai-assistant-btn',
    title: 'Assistente Inteligente',
    description: 'Dúvidas? Clique neste ícone flutuante a qualquer momento para falar com nossa IA.',
    position: 'left'
  }
];

const ADVANCED_STEPS: Step[] = [
  {
    targetId: 'header-welcome',
    title: 'Bem-vindo ao Portal',
    description: 'Vamos fazer um tour completo por todas as funcionalidades da sua nova plataforma.',
    position: 'bottom'
  },
  {
    targetId: 'sidebar-home',
    title: 'Menu Lateral',
    description: 'Sua navegação principal. Acesse qualquer área do sistema rapidamente por aqui.',
    position: 'right'
  },
  {
    targetId: 'sidebar-all-benefits',
    title: 'Catálogo de Benefícios',
    description: 'A lista completa de serviços filtráveis por categoria (Jurídico, RH, Comercial, etc).',
    position: 'right'
  },
  {
    targetId: 'sidebar-juridico',
    title: 'Acesso Rápido Jurídico',
    description: 'Link direto para abrir chamados e consultar a assessoria jurídica.',
    position: 'right'
  },
  {
    targetId: 'sidebar-forums',
    title: 'Fóruns da Hotelaria',
    description: 'Participe dos comitês estratégicos e inscreva-se nas próximas reuniões.',
    position: 'right'
  },
  {
    targetId: 'sidebar-community',
    title: 'Comunidade & WhatsApp',
    description: 'Entre nos grupos oficiais do HoteisRio para networking e alertas em tempo real.',
    position: 'right'
  },
  {
    targetId: 'highlights-section',
    title: 'Novidades',
    description: 'O carrossel de destaques traz sempre o que é mais urgente ou novo no setor.',
    position: 'bottom'
  },
  {
    targetId: 'quick-access-section',
    title: 'Ferramentas do Dia a Dia',
    description: 'Cards de acesso rápido para as funções mais críticas da operação hoteleira.',
    position: 'top'
  },
  {
    targetId: 'ai-assistant-btn',
    title: 'Suporte Inteligente',
    description: 'Nossa IA foi treinada para responder dúvidas sobre leis, contatos e benefícios 24/7.',
    position: 'left'
  }
];

const InteractiveTutorial: React.FC<InteractiveTutorialProps> = ({ onClose }) => {
  const [isSelecting, setIsSelecting] = useState(true);
  const [activeSteps, setActiveSteps] = useState<Step[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  
  const startTour = (type: 'QUICK' | 'ADVANCED') => {
    setActiveSteps(type === 'QUICK' ? QUICK_STEPS : ADVANCED_STEPS);
    setIsSelecting(false);
    setCurrentStep(0);
  };

  // Update target position
  useEffect(() => {
    if (isSelecting) return;

    let timeoutId: any;
    let attempts = 0;

    const updatePosition = () => {
      const step = activeSteps[currentStep];
      if (!step) return;

      const element = document.getElementById(step.targetId);
      
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        timeoutId = setTimeout(() => {
            const rect = element.getBoundingClientRect();
            if (rect.width > 0 && rect.height > 0) {
                setTargetRect(rect);
            } else {
                if(attempts < 3) {
                    attempts++;
                    requestAnimationFrame(updatePosition);
                }
            }
        }, 400); // Increased delay for smoother scroll catch-up
      } else {
        // Fallback if element not found (e.g. mobile sidebar hidden)
        console.warn(`Target ${step.targetId} not found`);
        if (currentStep < activeSteps.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            onClose();
        }
      }
    };

    updatePosition();
    
    const handleResize = () => {
        if (isSelecting || !activeSteps[currentStep]) return;
        const element = document.getElementById(activeSteps[currentStep].targetId);
        if (element) setTargetRect(element.getBoundingClientRect());
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleResize, { passive: true });
    
    return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', handleResize);
        clearTimeout(timeoutId);
    };
  }, [currentStep, isSelecting, activeSteps, onClose]);

  const handleNext = () => {
    if (currentStep < activeSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  // SELECTION SCREEN
  if (isSelecting) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
         <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden">
            <div className="bg-rio-blue p-6 text-center">
               <h2 className="text-2xl font-bold text-white mb-2">Como você quer aprender?</h2>
               <p className="text-blue-100">Escolha o nível de detalhes do seu tour.</p>
            </div>
            
            <div className="p-6 grid gap-4">
               <button 
                 onClick={() => startTour('QUICK')}
                 className="flex items-center gap-4 p-4 rounded-xl border-2 border-gray-100 hover:border-rio-gold hover:bg-yellow-50 transition-all group text-left"
               >
                  <div className="w-12 h-12 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                     <Zap className="w-6 h-6" />
                  </div>
                  <div>
                     <h3 className="font-bold text-gray-800 text-lg">Tour Rápido</h3>
                     <p className="text-sm text-gray-500">5 passos essenciais. Ideal para começar agora.</p>
                  </div>
               </button>

               <button 
                 onClick={() => startTour('ADVANCED')}
                 className="flex items-center gap-4 p-4 rounded-xl border-2 border-gray-100 hover:border-rio-blue hover:bg-blue-50 transition-all group text-left"
               >
                  <div className="w-12 h-12 rounded-full bg-blue-100 text-rio-blue flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                     <BookOpen className="w-6 h-6" />
                  </div>
                  <div>
                     <h3 className="font-bold text-gray-800 text-lg">Tour Completo</h3>
                     <p className="text-sm text-gray-500">Exploração detalhada de menus e recursos.</p>
                  </div>
               </button>
            </div>

            <div className="bg-gray-50 p-4 text-center border-t border-gray-100">
               <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-sm font-medium">
                  Pular Tutorial
               </button>
            </div>
         </div>
      </div>
    );
  }

  // TOUR INTERFACE
  const step = activeSteps[currentStep];
  if (!targetRect || !step) return null;

  const getTooltipStyle = () => {
    const spacing = 20;
    const tooltipWidth = 320; 
    const windowWidth = window.innerWidth;
    
    let top = 0;
    let left = 0;

    switch (step.position) {
      case 'bottom':
        top = targetRect.bottom + spacing;
        left = targetRect.left + (targetRect.width / 2) - (tooltipWidth / 2);
        break;
      case 'top':
        top = targetRect.top - spacing - 200; 
        left = targetRect.left + (targetRect.width / 2) - (tooltipWidth / 2);
        break;
      case 'left':
        top = targetRect.top + (targetRect.height / 2) - 100;
        left = targetRect.left - tooltipWidth - spacing;
        break;
      case 'right':
        top = targetRect.top;
        left = targetRect.right + spacing;
        break;
    }

    // Safety bounds
    if (left < 10) left = 10;
    if (left + tooltipWidth > windowWidth - 10) left = windowWidth - tooltipWidth - 10;
    if (top < 10) top = 10;
    
    if (top + 200 > window.innerHeight) {
        top = targetRect.top - 220; 
    }

    return { top, left, opacity: 1 };
  };

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      {/* Background Mask */}
      <div 
        className="absolute transition-all duration-500 ease-in-out border-[2px] border-rio-gold rounded-xl shadow-[0_0_0_9999px_rgba(0,0,0,0.75)] pointer-events-none z-[101]"
        style={{
          top: targetRect.top - 5,
          left: targetRect.left - 5,
          width: targetRect.width + 10,
          height: targetRect.height + 10,
        }}
      />

      {/* Pointer */}
      <div 
        className="absolute transition-all duration-500 ease-in-out z-[102] pointer-events-none hidden md:block"
        style={{
            top: step.position === 'top' ? targetRect.top - 40 : targetRect.bottom + 10,
            left: targetRect.left + (targetRect.width / 2),
        }}
      >
      </div>

      {/* Card */}
      <div 
        className="absolute z-[103] w-80 bg-white rounded-2xl shadow-2xl p-6 border-t-4 border-rio-blue transition-all duration-500 ease-in-out"
        style={getTooltipStyle() as any}
      >
        <div className="flex justify-between items-start mb-3">
          <span className="bg-blue-100 text-rio-blue text-xs font-bold px-2 py-1 rounded-full uppercase">
            Passo {currentStep + 1} de {activeSteps.length}
          </span>
          <button onClick={onClose} className="text-gray-400 hover:text-red-500 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-2">{step.title}</h3>
        <p className="text-gray-600 text-sm mb-6 leading-relaxed">
          {step.description}
        </p>

        <div className="flex justify-between items-center gap-2">
          <button 
            onClick={handlePrev}
            disabled={currentStep === 0}
            className={`flex items-center text-sm font-medium px-2 py-1 rounded hover:bg-gray-100 ${currentStep === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:text-rio-blue'}`}
          >
            <ChevronLeft className="w-4 h-4" /> Anterior
          </button>

          <div className="flex gap-2">
             <button 
                onClick={handleNext}
                className="bg-rio-blue hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-bold text-sm shadow-md flex items-center gap-1 transition-all"
             >
                {currentStep === activeSteps.length - 1 ? 'Concluir' : 'Próximo'}
                {currentStep !== activeSteps.length - 1 && <ChevronRight className="w-4 h-4" />}
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveTutorial;

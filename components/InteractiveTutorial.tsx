
import React, { useState, useEffect } from 'react';
import { X, ChevronRight, ChevronLeft, MousePointer2, SkipForward } from 'lucide-react';

interface Step {
  targetId: string;
  title: string;
  description: string;
  position: 'top' | 'bottom' | 'left' | 'right';
}

interface InteractiveTutorialProps {
  onClose: () => void;
}

const steps: Step[] = [
  {
    targetId: 'header-welcome',
    title: 'Seu Painel Principal',
    description: 'Bem-vindo! Este é o seu novo centro de comando. Aqui você encontra as informações mais importantes e acesso rápido aos serviços.',
    position: 'bottom'
  },
  {
    targetId: 'highlights-section',
    title: 'Destaques e Novidades',
    description: 'Fique por dentro das últimas notícias, eventos importantes e benefícios recém-lançados pelo HoteisRio.',
    position: 'bottom'
  },
  {
    targetId: 'quick-access-section',
    title: 'Acesso Rápido',
    description: 'Atalhos diretos para as ferramentas mais utilizadas: Agenda Oficial, Central de Segurança e Campanhas Especiais.',
    position: 'top'
  },
  {
    targetId: 'explore-benefits-btn',
    title: 'Todos os Benefícios',
    description: 'Clique neste botão para explorar o catálogo completo de serviços, parcerias e descontos exclusivos para associados.',
    position: 'top'
  },
  {
    targetId: 'ai-assistant-btn',
    title: 'Assistente Inteligente',
    description: 'Dúvidas sobre legislação ou benefícios? Clique neste ícone flutuante a qualquer momento para falar com nossa IA.',
    position: 'left'
  }
];

const InteractiveTutorial: React.FC<InteractiveTutorialProps> = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  
  // Update target position on step change or resize
  useEffect(() => {
    let timeoutId: any;
    let attempts = 0;

    const updatePosition = () => {
      const step = steps[currentStep];
      const element = document.getElementById(step.targetId);
      
      if (element) {
        // Smooth scroll to element
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Wait slightly for scroll to settle
        timeoutId = setTimeout(() => {
            const rect = element.getBoundingClientRect();
            // Check if element is actually visible/has dimensions
            if (rect.width > 0 && rect.height > 0) {
                setTargetRect(rect);
            } else {
                // Retry if element found but hidden (unlikely but safe)
                if(attempts < 3) {
                    attempts++;
                    requestAnimationFrame(updatePosition);
                }
            }
        }, 300);
      } else {
        // Element not found - skip step automatically or wait
        console.warn(`Tutorial target ${step.targetId} not found.`);
        if (attempts < 5) {
            // Element might be mounting
            attempts++;
            timeoutId = setTimeout(updatePosition, 500);
        } else {
            // Give up and go next if possible, or close if last
            if (currentStep < steps.length - 1) {
                setCurrentStep(prev => prev + 1);
            } else {
                onClose();
            }
        }
      }
    };

    // Initial call
    updatePosition();
    
    const handleResize = () => {
        const step = steps[currentStep];
        const element = document.getElementById(step.targetId);
        if (element) setTargetRect(element.getBoundingClientRect());
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleResize, { passive: true });
    
    return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', handleResize);
        clearTimeout(timeoutId);
    };
  }, [currentStep, onClose]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
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

  const step = steps[currentStep];

  // Calculate Tooltip Position
  const getTooltipStyle = () => {
    if (!targetRect) return { display: 'none' };
    
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
        top = targetRect.top - spacing - 200; // Approximate height of card
        left = targetRect.left + (targetRect.width / 2) - (tooltipWidth / 2);
        break;
      case 'left':
        top = targetRect.top + (targetRect.height / 2) - 100;
        left = targetRect.left - tooltipWidth - spacing;
        break;
      case 'right':
        top = targetRect.top + (targetRect.height / 2) - 100;
        left = targetRect.right + spacing;
        break;
    }

    // Boundary checks to keep tooltip on screen
    if (left < 10) left = 10;
    if (left + tooltipWidth > windowWidth - 10) left = windowWidth - tooltipWidth - 10;
    if (top < 10) top = 10;
    
    // Check vertical overflow (very rough)
    if (top + 200 > window.innerHeight) {
        top = targetRect.top - 220; // Flip to top if bottom overflows
    }

    return { top, left, opacity: 1 };
  };

  if (!targetRect) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      {/* Background Mask - "Spotlight" effect */}
      <div 
        className="absolute transition-all duration-500 ease-in-out border-[2px] border-rio-gold rounded-xl shadow-[0_0_0_9999px_rgba(0,0,0,0.75)] pointer-events-none z-[101]"
        style={{
          top: targetRect.top - 5,
          left: targetRect.left - 5,
          width: targetRect.width + 10,
          height: targetRect.height + 10,
        }}
      />

      {/* Animated Pointer */}
      <div 
        className="absolute transition-all duration-500 ease-in-out z-[102] pointer-events-none hidden md:block"
        style={{
            top: targetRect.bottom - 10,
            left: targetRect.right - 20,
        }}
      >
        <div className="relative">
            <MousePointer2 className="w-12 h-12 text-white drop-shadow-lg animate-bounce fill-rio-blue" />
        </div>
      </div>

      {/* Tooltip Card */}
      <div 
        className="absolute z-[103] w-80 bg-white rounded-2xl shadow-2xl p-6 border-t-4 border-rio-blue transition-all duration-500 ease-in-out"
        style={getTooltipStyle() as any}
      >
        <div className="flex justify-between items-start mb-3">
          <span className="bg-blue-100 text-rio-blue text-xs font-bold px-2 py-1 rounded-full uppercase">
            Passo {currentStep + 1} de {steps.length}
          </span>
          <button onClick={onClose} className="text-gray-400 hover:text-red-500 transition-colors" title="Sair do Tutorial">
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
             {currentStep < steps.length - 1 && (
                 <button 
                   onClick={onClose}
                   className="text-xs font-bold text-gray-400 hover:text-gray-600 px-3 py-2"
                 >
                   Pular
                 </button>
             )}
             <button 
                onClick={handleNext}
                className="bg-rio-blue hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-bold text-sm shadow-md flex items-center gap-1 transition-all"
             >
                {currentStep === steps.length - 1 ? 'Concluir' : 'Próximo'}
                {currentStep !== steps.length - 1 && <ChevronRight className="w-4 h-4" />}
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveTutorial;

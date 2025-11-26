
import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronRight, ChevronLeft, MousePointer2 } from 'lucide-react';

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
    title: 'Bem-vindo à Central!',
    description: 'Este é o seu novo painel de controle. Aqui você encontra todas as ferramentas para gerenciar seu relacionamento com a HoteisRio.',
    position: 'bottom'
  },
  {
    targetId: 'quick-access-section',
    title: 'Serviços Online',
    description: 'Nesta área superior, circundada aqui, estão as ferramentas de uso diário. Clique em "Utilizar" para abrir chamados jurídicos, acessar o calendário ou reportar ocorrências.',
    position: 'bottom'
  },
  {
    targetId: 'community-section',
    title: 'Comunidade & Conexão',
    description: 'Acesse rapidamente os contatos da equipe, entre nos grupos de WhatsApp oficiais e veja a agenda de reuniões.',
    position: 'top'
  },
  {
    targetId: 'catalog-section',
    title: 'Catálogo de Benefícios',
    description: 'Logo abaixo, você encontra a lista completa de benefícios. Use os filtros (Jurídico, Comercial, etc.) para encontrar o que precisa.',
    position: 'top'
  },
  {
    targetId: 'ai-assistant-btn',
    title: 'Assistente Inteligente',
    description: 'Dúvidas? Clique neste ícone flutuante a qualquer momento. Nossa IA responde perguntas sobre legislação, turismo e uso do portal.',
    position: 'left'
  }
];

const InteractiveTutorial: React.FC<InteractiveTutorialProps> = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  // Update target position on step change or resize
  useEffect(() => {
    const updatePosition = () => {
      const step = steps[currentStep];
      const element = document.getElementById(step.targetId);
      
      if (element) {
        // Smooth scroll to element
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Wait for scroll to finish a bit or just grab rect immediately
        setTimeout(() => {
            const rect = element.getBoundingClientRect();
            setTargetRect(rect);
        }, 100); // Small delay to allow scroll adjustment
      }
    };

    updatePosition();
    window.addEventListener('resize', () => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        updatePosition();
    });
    
    return () => window.removeEventListener('resize', updatePosition);
  }, [currentStep, windowSize]);

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
    if (!targetRect) return {};
    
    const spacing = 20;
    const tooltipWidth = 320; // approximate width from w-80 class
    
    let top = 0;
    let left = 0;

    switch (step.position) {
      case 'bottom':
        top = targetRect.bottom + spacing;
        left = targetRect.left + (targetRect.width / 2) - (tooltipWidth / 2);
        break;
      case 'top':
        top = targetRect.top - spacing - 200; // approximate height
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
    if (left + tooltipWidth > window.innerWidth - 10) left = window.innerWidth - tooltipWidth - 10;

    return { top, left };
  };

  if (!targetRect) return null;

  return (
    <div className="fixed inset-0 z-[60] overflow-hidden">
      {/* Background Mask - Using a massive box-shadow on the highlight element to create the "hole" effect */}
      <div 
        className="absolute transition-all duration-500 ease-in-out border-2 border-rio-gold rounded-xl animate-pulse shadow-[0_0_0_9999px_rgba(0,0,0,0.75)] pointer-events-none"
        style={{
          top: targetRect.top - 5,
          left: targetRect.left - 5,
          width: targetRect.width + 10,
          height: targetRect.height + 10,
        }}
      />

      {/* Animated Pointer/Hand */}
      <div 
        className="absolute transition-all duration-500 ease-in-out z-[70] pointer-events-none"
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
        className="absolute z-[70] w-80 bg-white rounded-2xl shadow-2xl p-6 border-t-4 border-rio-blue animate-scale-in transition-all duration-500"
        style={getTooltipStyle()}
      >
        <div className="flex justify-between items-start mb-3">
          <span className="bg-blue-100 text-rio-blue text-xs font-bold px-2 py-1 rounded-full uppercase">
            Passo {currentStep + 1} de {steps.length}
          </span>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-2">{step.title}</h3>
        <p className="text-gray-600 text-sm mb-6 leading-relaxed">
          {step.description}
        </p>

        <div className="flex justify-between items-center">
          <button 
            onClick={handlePrev}
            disabled={currentStep === 0}
            className={`flex items-center text-sm font-medium ${currentStep === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:text-rio-blue'}`}
          >
            <ChevronLeft className="w-4 h-4" /> Anterior
          </button>

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
  );
};

export default InteractiveTutorial;

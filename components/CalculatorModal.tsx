
import React, { useState, useEffect } from 'react';
import { X, Calculator, RefreshCw, DollarSign, Percent, TrendingUp } from 'lucide-react';

type CalculatorType = 'calc-adr' | 'calc-revpar' | 'calc-goppar' | 'calc-trevpar' | 'calc-trevpab' | 'calc-occupancy';

interface CalculatorModalProps {
  type: string; // We use string to match the benefit ID
  onClose: () => void;
}

const CALCULATOR_CONFIG: Record<string, {
  title: string;
  description: string;
  inputs: { label: string; placeholder: string; prefix?: string }[];
  formula: (v1: number, v2: number) => { result: number; unit: string; explanation: string };
  icon: any;
}> = {
  'calc-adr': {
    title: 'Calculadora de ADR',
    description: 'Average Daily Rate (Diária Média)',
    inputs: [
      { label: 'Receita Total de Diárias', placeholder: '0.00', prefix: 'R$' },
      { label: 'Número de Quartos Vendidos', placeholder: '0', prefix: '#' }
    ],
    formula: (revenue, roomsSold) => ({
      result: roomsSold > 0 ? revenue / roomsSold : 0,
      unit: 'R$',
      explanation: 'Este valor representa o preço médio pago por quarto ocupado.'
    }),
    icon: DollarSign
  },
  'calc-revpar': {
    title: 'Calculadora de RevPAR',
    description: 'Revenue Per Available Room',
    inputs: [
      { label: 'Receita Total de Diárias', placeholder: '0.00', prefix: 'R$' },
      { label: 'Total de Quartos Disponíveis (Inventário)', placeholder: '0', prefix: '#' }
    ],
    formula: (revenue, roomsAvailable) => ({
      result: roomsAvailable > 0 ? revenue / roomsAvailable : 0,
      unit: 'R$',
      explanation: 'Indica a performance financeira considerando todo o inventário do hotel.'
    }),
    icon: TrendingUp
  },
  'calc-goppar': {
    title: 'Calculadora de GOPPAR',
    description: 'Gross Operating Profit Per Available Room',
    inputs: [
      { label: 'Lucro Operacional Bruto (GOP)', placeholder: '0.00', prefix: 'R$' },
      { label: 'Total de Quartos Disponíveis', placeholder: '0', prefix: '#' }
    ],
    formula: (gop, roomsAvailable) => ({
      result: roomsAvailable > 0 ? gop / roomsAvailable : 0,
      unit: 'R$',
      explanation: 'Mede o lucro operacional por quarto, uma das métricas mais completas de eficiência.'
    }),
    icon: Calculator
  },
  'calc-trevpar': {
    title: 'Calculadora de TRevPAR',
    description: 'Total Revenue Per Available Room',
    inputs: [
      { label: 'Receita Total (Diárias + A&B + Outros)', placeholder: '0.00', prefix: 'R$' },
      { label: 'Total de Quartos Disponíveis', placeholder: '0', prefix: '#' }
    ],
    formula: (totalRevenue, roomsAvailable) => ({
      result: roomsAvailable > 0 ? totalRevenue / roomsAvailable : 0,
      unit: 'R$',
      explanation: 'Considera todas as fontes de receita do hotel divididas pelo inventário.'
    }),
    icon: TrendingUp
  },
  'calc-trevpab': {
    title: 'Calculadora de TRevPAB',
    description: 'Total Revenue Per Available Bed (Hostels) ou Business (Eventos)',
    inputs: [
      { label: 'Receita Total do Setor', placeholder: '0.00', prefix: 'R$' },
      { label: 'Lugares/Camas Disponíveis', placeholder: '0', prefix: '#' }
    ],
    formula: (totalRevenue, availableUnits) => ({
      result: availableUnits > 0 ? totalRevenue / availableUnits : 0,
      unit: 'R$',
      explanation: 'Métrica de rentabilidade por unidade disponível (cama ou lugar).'
    }),
    icon: DollarSign
  },
  'calc-occupancy': {
    title: 'Taxa de Ocupação',
    description: 'Percentual de quartos ocupados em relação ao total.',
    inputs: [
      { label: 'Quartos Vendidos/Ocupados', placeholder: '0', prefix: '#' },
      { label: 'Total de Quartos Disponíveis', placeholder: '0', prefix: '#' }
    ],
    formula: (sold, available) => ({
      result: available > 0 ? (sold / available) * 100 : 0,
      unit: '%',
      explanation: 'Indica a utilização física do seu hotel no período.'
    }),
    icon: Percent
  }
};

const CalculatorModal: React.FC<CalculatorModalProps> = ({ type, onClose }) => {
  const config = CALCULATOR_CONFIG[type];
  const [val1, setVal1] = useState('');
  const [val2, setVal2] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [explanation, setExplanation] = useState('');
  const [unit, setUnit] = useState('');

  useEffect(() => {
    setVal1('');
    setVal2('');
    setResult(null);
  }, [type]);

  if (!config) return null;

  const handleCalculate = () => {
    const v1 = parseFloat(val1.replace(',', '.'));
    const v2 = parseFloat(val2.replace(',', '.'));

    if (isNaN(v1) || isNaN(v2)) return;

    const res = config.formula(v1, v2);
    setResult(res.result);
    setUnit(res.unit);
    setExplanation(res.explanation);
  };

  const Icon = config.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md animate-scale-in overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-rio-blue to-blue-900 p-6 text-white relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-blue-200 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
              <Icon className="w-6 h-6 text-rio-gold" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-200">Ferramenta Financeira</span>
          </div>
          <h2 className="text-2xl font-bold">{config.title}</h2>
          <p className="text-blue-100 text-sm opacity-90">{config.description}</p>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">{config.inputs[0].label}</label>
              <div className="relative">
                {config.inputs[0].prefix && (
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">
                    {config.inputs[0].prefix}
                  </span>
                )}
                <input 
                  type="number" 
                  value={val1}
                  onChange={(e) => setVal1(e.target.value)}
                  placeholder={config.inputs[0].placeholder}
                  className={`w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pr-4 ${config.inputs[0].prefix ? 'pl-10' : 'pl-4'} focus:ring-2 focus:ring-rio-blue focus:border-rio-blue outline-none transition-all font-mono text-lg`}
                />
              </div>
            </div>

            <div className="flex justify-center -my-2 relative z-10">
               <div className="bg-gray-100 rounded-full p-1.5 border border-white shadow-sm">
                  <span className="text-gray-400 font-bold text-xs">÷ DIVIDIDO POR</span>
               </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">{config.inputs[1].label}</label>
              <div className="relative">
                {config.inputs[1].prefix && (
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">
                    {config.inputs[1].prefix}
                  </span>
                )}
                <input 
                  type="number" 
                  value={val2}
                  onChange={(e) => setVal2(e.target.value)}
                  placeholder={config.inputs[1].placeholder}
                  className={`w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pr-4 ${config.inputs[1].prefix ? 'pl-10' : 'pl-4'} focus:ring-2 focus:ring-rio-blue focus:border-rio-blue outline-none transition-all font-mono text-lg`}
                />
              </div>
            </div>
          </div>

          {/* Action */}
          <button 
            onClick={handleCalculate}
            disabled={!val1 || !val2}
            className="w-full bg-rio-blue hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-200/50 transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <Calculator className="w-5 h-5" />
            Calcular Agora
          </button>

          {/* Result */}
          {result !== null && (
            <div className="bg-green-50 rounded-xl p-5 border border-green-100 animate-fade-in text-center">
              <span className="text-xs font-bold text-green-600 uppercase tracking-wide">Resultado Calculado</span>
              <div className="text-3xl font-black text-gray-800 my-1">
                {unit === 'R$' 
                  ? result.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) 
                  : `${result.toFixed(2)}%`
                }
              </div>
              <p className="text-xs text-gray-500 mt-2">{explanation}</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default CalculatorModal;

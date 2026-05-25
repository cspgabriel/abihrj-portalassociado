
import React from 'react';
import { ArrowLeft, Calculator, TrendingUp, PieChart, BarChart3 } from 'lucide-react';
import { Benefit, BenefitCategory } from '../types';
import { CALCULATOR_TOOLS } from '../constants';
import BenefitCard from './BenefitCard';

interface CalculatorsPageProps {
  onBack: () => void;
  onOpenCalculator: (benefit: Benefit) => void;
}

const CalculatorsPage: React.FC<CalculatorsPageProps> = ({ onBack, onOpenCalculator }) => {
  // Use the separated constant list
  const calculators = CALCULATOR_TOOLS;

  return (
    <div className="bg-gray-50 min-h-screen pb-12 animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-800 text-white pt-8 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -mr-20 -mt-20 blur-2xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-400/20 rounded-full -ml-10 -mb-10 blur-2xl" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-emerald-100 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar para Dashboard
          </button>

          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-xl">
              <Calculator className="w-16 h-16 text-yellow-300" strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Calculadoras ABIH-RJ</h1>
              <p className="text-emerald-50 text-lg md:text-xl max-w-2xl leading-relaxed">
                Ferramentas essenciais para Revenue Management. Calcule ADR, RevPAR, GOPPAR e analise a saúde financeira do seu hotel em segundos.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-10 relative z-20">
        
        {/* Intro Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="bg-blue-50 p-3 rounded-full text-blue-600">
                    <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="font-bold text-gray-800">Performance</h3>
                    <p className="text-xs text-gray-500">Monitore seus KPIs</p>
                </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="bg-purple-50 p-3 rounded-full text-purple-600">
                    <PieChart className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="font-bold text-gray-800">Lucratividade</h3>
                    <p className="text-xs text-gray-500">Análise de GOPPAR</p>
                </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="bg-orange-50 p-3 rounded-full text-orange-600">
                    <BarChart3 className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="font-bold text-gray-800">Mercado</h3>
                    <p className="text-xs text-gray-500">Comparativo RGI/MPI</p>
                </div>
            </div>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {calculators.map(calc => (
                <BenefitCard 
                    key={calc.id}
                    benefit={calc}
                    onUse={onOpenCalculator}
                    onDetails={onOpenCalculator} // Both actions open the calculator modal
                    layout="grid"
                />
            ))}
        </div>
      </div>
    </div>
  );
};

export default CalculatorsPage;
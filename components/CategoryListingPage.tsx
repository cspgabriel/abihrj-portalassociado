

import React from 'react';
import { ArrowLeft, ArrowRight, LayoutGrid } from 'lucide-react';
import { SUPER_CATEGORIES, BENEFITS_DATA } from '../constants';
import { Benefit } from '../types';
import BenefitCard from './BenefitCard';
import * as Icons from 'lucide-react';

interface CategoryListingPageProps {
  categoryId: string;
  onBack: () => void;
  onUse: (benefit: Benefit) => void;
  onDetails: (benefit: Benefit) => void;
}

const CategoryListingPage: React.FC<CategoryListingPageProps> = ({ categoryId, onBack, onUse, onDetails }) => {
  const superCategory = SUPER_CATEGORIES.find(c => c.id === categoryId);

  if (!superCategory) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p>Categoria não encontrada.</p>
        <button onClick={onBack} className="text-rio-blue underline mt-4">Voltar</button>
      </div>
    );
  }

  const IconComponent = (Icons as any)[superCategory.iconName] || Icons.LayoutGrid;

  // Filter benefits that belong to any of the sub-categories defined in this Super Category
  const benefits = BENEFITS_DATA.filter(b => superCategory.categories.includes(b.category));

  return (
    <div className="bg-gray-50 min-h-screen pb-12 animate-fade-in">
      {/* Header */}
      <div className={`bg-gradient-to-r ${superCategory.gradient} text-white pt-8 pb-20 px-6 relative overflow-hidden`}>
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -mr-20 -mt-20 blur-2xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full -ml-10 -mb-10 blur-2xl" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar para Dashboard
          </button>

          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-xl">
              <IconComponent className="w-16 h-16 text-white" strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{superCategory.title}</h1>
              <p className="text-white/80 text-lg md:text-xl max-w-2xl leading-relaxed">
                {superCategory.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {benefits.length > 0 ? (
                benefits.map(benefit => (
                    <BenefitCard 
                        key={benefit.id}
                        benefit={benefit}
                        onUse={onUse}
                        onDetails={onDetails}
                        layout="grid"
                    />
                ))
            ) : (
                <div className="col-span-full py-16 text-center bg-white rounded-xl shadow-sm border border-gray-100">
                    <p className="text-gray-500">Nenhum benefício encontrado nesta categoria no momento.</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default CategoryListingPage;

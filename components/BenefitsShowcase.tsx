
import React from 'react';
import { ArrowLeft, CheckCircle2, Star, Shield, TrendingUp, Users, Zap, LayoutGrid, ArrowRight } from 'lucide-react';
import { BENEFITS_DATA, SUPER_CATEGORIES } from '../constants';
import * as Icons from 'lucide-react';

interface BenefitsShowcaseProps {
  onBack: () => void;
}

const BenefitsShowcase: React.FC<BenefitsShowcaseProps> = ({ onBack }) => {
  
  // Organizar benefícios por super categorias para exibição
  const categorizedBenefits = SUPER_CATEGORIES.map(superCat => {
      return {
          ...superCat,
          benefits: BENEFITS_DATA.filter(b => superCat.categories.includes(b.category))
      };
  });

  // Adicionar categorias "Outros" para o que não cair nas Super Categorias principais (simplificado para demo)
  const mainCategories = ['Jurídico', 'Comercial', 'Operacional', 'Comunicação & Marketing', 'Recursos Humanos', 'Eventos'];
  const groupedBenefits = mainCategories.map(cat => ({
      title: cat,
      benefits: BENEFITS_DATA.filter(b => b.category === cat)
  })).filter(g => g.benefits.length > 0);

  return (
    <div className="min-h-screen bg-white animate-fade-in font-sans">
      
      {/* Navbar Minimalista */}
      <nav className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md border-b border-gray-100 z-50 px-6 py-4 flex justify-between items-center">
         <img 
            src="https://sindhoteisrj.com.br/wp-content/uploads/2023/04/Logo-HoteisRIO-Branca-Fundo-Transparente.png" 
            alt="HoteisRio" 
            className="h-8 filter invert brightness-0" 
            style={{ filter: 'brightness(0) saturate(100%) invert(18%) sepia(87%) saturate(2227%) hue-rotate(205deg) brightness(91%) contrast(105%)' }}
         />
         <button 
            onClick={onBack}
            className="text-sm font-bold text-gray-600 hover:text-rio-blue flex items-center gap-2 transition-colors"
         >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Login
         </button>
      </nav>

      {/* Hero Section */}
      <header className="pt-32 pb-20 px-6 bg-gradient-to-b from-slate-50 to-white text-center relative overflow-hidden">
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-rio-blue/5 rounded-full blur-3xl -z-10" />
         
         <div className="max-w-4xl mx-auto">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-rio-blue text-xs font-bold uppercase tracking-wider mb-6">
                Clube de Vantagens
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 leading-tight">
                O Poder da Hotelaria Carioca <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rio-blue to-blue-600">em suas mãos.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                Descubra todas as ferramentas, parcerias e serviços exclusivos que o HoteisRio oferece para fortalecer o seu negócio.
            </p>
            <button 
                onClick={onBack}
                className="bg-rio-blue text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-blue-800 transition-transform hover:scale-105 flex items-center gap-2 mx-auto"
            >
                Acessar Portal do Associado
                <ArrowRight className="w-5 h-5" />
            </button>
         </div>
      </header>

      {/* Benefits Grid Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
         
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
             {/* Feature 1 */}
             <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:shadow-xl transition-all group">
                 <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                     <Shield className="w-8 h-8 text-rio-blue" />
                 </div>
                 <h3 className="text-xl font-bold text-slate-900 mb-3">Segurança Jurídica</h3>
                 <p className="text-gray-600 leading-relaxed">
                     Suporte integral em questões trabalhistas, cíveis e tributárias, além de monitoramento legislativo constante.
                 </p>
             </div>
             {/* Feature 2 */}
             <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:shadow-xl transition-all group">
                 <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                     <TrendingUp className="w-8 h-8 text-green-600" />
                 </div>
                 <h3 className="text-xl font-bold text-slate-900 mb-3">Inteligência Comercial</h3>
                 <p className="text-gray-600 leading-relaxed">
                     Acesso a dados de ocupação, calculadora de diárias e participação em feiras nacionais e internacionais.
                 </p>
             </div>
             {/* Feature 3 */}
             <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:shadow-xl transition-all group">
                 <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                     <Users className="w-8 h-8 text-purple-600" />
                 </div>
                 <h3 className="text-xl font-bold text-slate-900 mb-3">Networking & Eventos</h3>
                 <p className="text-gray-600 leading-relaxed">
                     Fóruns mensais com os principais players do mercado e grupos exclusivos de WhatsApp para gestores.
                 </p>
             </div>
         </div>

         {/* Full List by Category */}
         <div className="space-y-16">
             <div className="text-center mb-12">
                 <h2 className="text-3xl font-bold text-slate-900">Catálogo Completo</h2>
                 <p className="text-gray-500 mt-2">Explore tudo o que está incluído na sua associação.</p>
             </div>

             {groupedBenefits.map((group, idx) => (
                 <div key={idx} className="relative">
                     <h3 className="text-2xl font-bold text-rio-blue mb-8 flex items-center gap-3 border-b border-gray-100 pb-4">
                         {group.title}
                         <span className="text-sm font-normal text-gray-400 bg-gray-50 px-2 py-1 rounded-full">{group.benefits.length} itens</span>
                     </h3>
                     
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                         {group.benefits.map(benefit => {
                             const IconComponent = (Icons as any)[benefit.iconName] || Icons.CheckCircle2;
                             return (
                                 <div key={benefit.id} className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                                     <div className="shrink-0 mt-1 text-rio-gold">
                                         <IconComponent className="w-6 h-6" />
                                     </div>
                                     <div>
                                         <h4 className="font-bold text-gray-900 text-sm mb-1">{benefit.title}</h4>
                                         <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{benefit.description}</p>
                                     </div>
                                 </div>
                             );
                         })}
                     </div>
                 </div>
             ))}
         </div>

      </section>

      {/* CTA Footer */}
      <section className="bg-rio-blue py-20 px-6 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="max-w-3xl mx-auto relative z-10">
              <h2 className="text-3xl font-bold mb-6">Pronto para aproveitar esses benefícios?</h2>
              <p className="text-blue-100 mb-8 text-lg">
                  Junte-se aos hotéis mais prestigiados do Rio de Janeiro e eleve o nível da sua gestão.
              </p>
              <button 
                onClick={onBack}
                className="bg-white text-rio-blue px-10 py-4 rounded-xl font-bold text-lg shadow-xl hover:bg-gray-100 transition-all transform hover:-translate-y-1"
              >
                  Fazer Login no Portal
              </button>
          </div>
      </section>

    </div>
  );
};

export default BenefitsShowcase;

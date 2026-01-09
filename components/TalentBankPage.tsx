
import React from 'react';
import { ArrowLeft, Megaphone, Users, Search, FileText, Rocket, ExternalLink } from 'lucide-react';
import { Benefit, BenefitCategory } from '../types';

interface TalentBankPageProps {
  onBack: () => void;
  onUse: (benefit: Benefit) => void;
}

const TalentBankPage: React.FC<TalentBankPageProps> = ({ onBack, onUse }) => {

  const handleJobPost = () => {
    // Cria um objeto de benefício temporário para abrir no visualizador de serviço
    const tempBenefit: Benefit = {
      id: 'job-post-zoho',
      title: 'Divulgar Vaga',
      description: 'Cadastre sua vaga e receba currículos.',
      category: BenefitCategory.HR,
      iconName: 'Megaphone',
      imageUrl: '',
      isService: true,
      embedUrl: 'https://zfrmz.com/NkRiJhzKLeAhITMcWGdn' // URL do Zoho Form
    };
    onUse(tempBenefit);
  };

  const handleHrPortal = () => {
    // Cria um objeto temporário para o Portal RH (Futuro)
    const tempBenefit: Benefit = {
      id: 'portal-rh-future',
      title: 'Portal RH Completo',
      description: 'Acesso completo à base de candidatos.',
      category: BenefitCategory.HR,
      iconName: 'Users',
      imageUrl: '',
      isService: true
      // Sem embedUrl/externalLink para cair na tela "Em Breve" do ServiceViewer
    };
    onUse(tempBenefit);
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-12 animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-cyan-800 text-white pt-8 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -mr-20 -mt-20 blur-2xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/20 rounded-full -ml-10 -mb-10 blur-2xl" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-cyan-100 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar para Dashboard
          </button>

          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-xl">
              <Users className="w-16 h-16 text-rio-gold" strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Banco de Talentos</h1>
              <p className="text-cyan-50 text-lg md:text-xl max-w-2xl leading-relaxed">
                A solução completa para o recrutamento do seu hotel. Divulgue oportunidades ou busque ativamente os melhores profissionais.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Card 1: Divulgar Vaga */}
            <div 
                onClick={handleJobPost}
                className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden cursor-pointer group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
                <div className="h-2 bg-rio-blue w-full"></div>
                <div className="p-8 flex flex-col items-center text-center h-full">
                    <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mb-6 group-hover:bg-rio-blue group-hover:text-white transition-colors text-rio-blue">
                        <Megaphone className="w-10 h-10" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-rio-blue transition-colors">Divulgue sua Vaga</h3>
                    <p className="text-gray-500 mb-8 leading-relaxed">
                        Preencha o formulário oficial, divulgue sua oportunidade e receba currículos qualificados já cadastrados em nossa base de dados.
                    </p>
                    
                    <div className="mt-auto w-full">
                        <span className="w-full block py-4 px-6 rounded-xl bg-rio-blue text-white font-bold shadow-md transition-all group-hover:bg-blue-700 flex items-center justify-center gap-2">
                            Divulgar Agora
                            <FileText className="w-4 h-4" />
                        </span>
                    </div>
                </div>
            </div>

            {/* Card 2: Portal RH Completo */}
            <div 
                onClick={handleHrPortal}
                className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden cursor-pointer group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative"
            >
                <div className="h-2 bg-purple-600 w-full"></div>
                
                {/* Badge de Novidade/Em Breve */}
                <div className="absolute top-4 right-4 bg-purple-100 text-purple-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                   Em Breve
                </div>

                <div className="p-8 flex flex-col items-center text-center h-full">
                    <div className="w-20 h-20 rounded-full bg-purple-50 flex items-center justify-center mb-6 group-hover:bg-purple-600 group-hover:text-white transition-colors text-purple-600">
                        <Search className="w-10 h-10" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors">Portal RH Completo</h3>
                    <p className="text-gray-500 mb-8 leading-relaxed">
                        Acesso direto e ilimitado à nossa base de candidatos. Filtre por cargo, experiência e região para encontrar o talento ideal.
                    </p>
                    
                    <div className="mt-auto w-full">
                        <span className="w-full block py-4 px-6 rounded-xl bg-white border-2 border-purple-600 text-purple-600 font-bold transition-all group-hover:bg-purple-600 group-hover:text-white flex items-center justify-center gap-2">
                            Acessar Base
                            <Rocket className="w-4 h-4" />
                        </span>
                    </div>
                </div>
            </div>

        </div>
        
        <div className="mt-12 text-center text-gray-500 text-sm">
            <p>Precisa de ajuda com o recrutamento? Entre em contato com nossa equipe de RH.</p>
        </div>
      </div>
    </div>
  );
};

export default TalentBankPage;

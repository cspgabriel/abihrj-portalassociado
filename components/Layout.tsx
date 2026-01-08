
// Autor: Gabriel Salles
// Suporte do SO: Windows11
// Descrição: Layout principal com Sidebar e Topbar

import React, { useState, useEffect } from 'react';
import { User, Benefit } from '../types';
import { 
  Menu, X, LogOut, User as UserIcon, Bell, 
  Home, LayoutGrid, Gavel, FileText, Sparkles, Calendar, 
  MonitorPlay, Megaphone, Briefcase, BarChart3, Music,
  MessageCircle, Phone, Shield, UserCog, Camera, FileSearch, ArrowLeft,
  Users, Search, MessageSquarePlus, Globe, Presentation
} from 'lucide-react';
import { BENEFITS_DATA } from '../constants';

interface LayoutProps {
  user: User;
  onLogout: () => void;
  onNavigate: (view: string) => void;
  onBenefitClick: (benefit: Benefit) => void;
  currentView: string;
  isFullPage?: boolean;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ 
  user, 
  onLogout, 
  onNavigate, 
  onBenefitClick, 
  currentView, 
  isFullPage = false, 
  children 
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Lógica de Correção de Scroll
  useEffect(() => {
    // Busca o elemento principal de conteúdo
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      // Força o scroll para o topo (0)
      mainContent.scrollTop = 0;
    }
  }, [currentView]); // Executa sempre que a visualização (currentView) mudar

  const handleOpenBenefit = (benefitId: string) => {
    const benefit = BENEFITS_DATA.find(b => b.id === benefitId);
    if (benefit) {
      onBenefitClick(benefit);
      setIsMobileMenuOpen(false);
    }
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6 flex justify-center">
        <img 
           src="https://sindhoteisrj.com.br/wp-content/uploads/2023/04/Logo-HoteisRIO-Branca-Fundo-Transparente.png" 
           alt="HoteisRio" 
           className="h-16 w-auto object-contain brightness-0 invert"
        />
      </div>

      <nav className="flex-1 overflow-y-auto px-4 space-y-4">
            {/* PRINCIPAL SECTION */}
            <div className="mb-2 px-1">
                <button 
                onClick={() => onNavigate('LANDING_PAGE')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group mb-1
                    ${currentView === 'LANDING_PAGE'
                    ? 'bg-white text-rio-blue font-bold shadow-lg' 
                    : 'text-white/80 hover:bg-white/10 hover:text-white'}
                `}
                >
                <Home className="w-5 h-5 shrink-0" />
                Início
                </button>

                <button 
                onClick={() => onNavigate('ALL_BENEFITS')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group
                    ${currentView === 'ALL_BENEFITS' 
                    ? 'bg-white text-rio-blue font-bold shadow-lg' 
                    : 'text-white/80 hover:bg-white/10 hover:text-white'}
                `}
                >
                <LayoutGrid className="w-5 h-5 shrink-0" />
                Todos os Benefícios
                </button>
            </div>

            <div className="w-full h-px bg-white/10 my-4 mx-2 w-[calc(100%-16px)]" />

            {/* PRINCIPAIS BENEFÍCIOS (Ordered A-Z) */}
            <div className="px-1 space-y-1">
                <div className="text-[10px] font-bold text-blue-200 uppercase tracking-widest px-3 mb-2 mt-2">
                    Principais Benefícios
                </div>

                <button onClick={() => handleOpenBenefit('commercial-actions')} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-yellow-300 hover:bg-white/10 hover:text-white transition-all overflow-hidden font-bold">
                    <Briefcase className="w-4 h-4 shrink-0" /> <span className="truncate">Ações Comerciais</span>
                </button>

                <button onClick={() => handleOpenBenefit('juridico-01')} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/70 hover:bg-white/10 hover:text-white transition-all overflow-hidden">
                    <Gavel className="w-4 h-4 shrink-0" /> <span className="truncate">Assessoria Jurídica</span>
                </button>
                
                <button onClick={() => handleOpenBenefit('banco-talentos')} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/70 hover:bg-white/10 hover:text-white transition-all overflow-hidden">
                    <Users className="w-4 h-4 shrink-0" /> <span className="truncate">Banco de Talentos</span>
                </button>

                <button onClick={() => handleOpenBenefit('highlight-events-reg')} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/70 hover:bg-white/10 hover:text-white transition-all overflow-hidden">
                    <FileText className="w-4 h-4 shrink-0" /> <span className="truncate">Cadastro de Grandes Eventos</span>
                </button>

                <button onClick={() => handleOpenBenefit('calendar-2026')} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/70 hover:bg-white/10 hover:text-white transition-all overflow-hidden">
                    <Sparkles className="w-4 h-4 shrink-0" /> <span className="truncate">Calendário de Eventos</span>
                </button>

                <button onClick={() => handleOpenBenefit('planejador-feriados-2026')} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/70 hover:bg-white/10 hover:text-white transition-all overflow-hidden">
                    <Calendar className="w-4 h-4 shrink-0" /> <span className="truncate">Calendário de Feriados 2026</span>
                </button>
                
                <button onClick={() => handleOpenBenefit('clipping-service')} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/70 hover:bg-white/10 hover:text-white transition-all overflow-hidden">
                    <FileSearch className="w-4 h-4 shrink-0" /> <span className="truncate">Clipping Diário</span>
                </button>

                <button onClick={() => onNavigate('COURSES_V2')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all overflow-hidden ${currentView === 'COURSES_V2' ? 'bg-white/10 text-white font-bold' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}>
                    <MonitorPlay className="w-4 h-4 shrink-0" /> <span className="truncate">Cursos & Treinamentos</span>
                </button>
                
                <button onClick={() => handleOpenBenefit('sugestao-pauta')} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/70 hover:bg-white/10 hover:text-white transition-all overflow-hidden">
                    <MessageSquarePlus className="w-4 h-4 shrink-0" /> <span className="truncate">Enviar Sugestão de Pauta</span>
                </button>

                <button onClick={() => handleOpenBenefit('portal-fornecedores-new')} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/70 hover:bg-white/10 hover:text-white transition-all overflow-hidden">
                    <Briefcase className="w-4 h-4 shrink-0" /> <span className="truncate">Fornecedores Hotelaria</span>
                </button>

                <button onClick={() => onNavigate('FORUMS_OVERVIEW')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all overflow-hidden ${currentView === 'FORUMS_OVERVIEW' ? 'bg-white/10 text-white font-bold' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}>
                    <Users className="w-4 h-4 shrink-0" /> <span className="truncate">Fóruns da Hotelaria</span>
                </button>

                <button onClick={() => handleOpenBenefit('influencers-hub')} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/70 hover:bg-white/10 hover:text-white transition-all overflow-hidden">
                    <Camera className="w-4 h-4 shrink-0" /> <span className="truncate">Influenciadores & Creators</span>
                </button>

                <button onClick={() => handleOpenBenefit('leis-decretos-app')} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/70 hover:bg-white/10 hover:text-white transition-all overflow-hidden">
                    <Gavel className="w-4 h-4 shrink-0" /> <span className="truncate">Leis e Decretos RJ</span>
                </button>

                <button onClick={() => onNavigate('SECURITY_PAGE')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all overflow-hidden ${currentView === 'SECURITY_PAGE' ? 'bg-white/10 text-white font-bold' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}>
                    <Shield className="w-4 h-4 shrink-0" /> <span className="truncate">Órgãos de Segurança</span>
                </button>

                <button onClick={() => handleOpenBenefit('occupancy-reports')} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/70 hover:bg-white/10 hover:text-white transition-all overflow-hidden">
                    <BarChart3 className="w-4 h-4 shrink-0" /> <span className="truncate">Relatórios de Ocupação</span>
                </button>

                <button onClick={() => onNavigate('ROCK_IN_RIO')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all overflow-hidden ${currentView === 'ROCK_IN_RIO' ? 'bg-white/10 text-white font-bold' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}>
                    <Music className="w-4 h-4 shrink-0" /> <span className="truncate">Rock in Rio 2026</span>
                </button>
            </div>

            <div className="w-full h-px bg-white/10 my-4 mx-2 w-[calc(100%-16px)]" />

            {/* CONEXÃO */}
            <div className="px-1 space-y-1">
                <div className="text-[10px] font-bold text-blue-200 uppercase tracking-widest px-3 mb-2 mt-2">
                    CONEXÃO
                </div>
                
                <button onClick={() => onNavigate('WHATSAPP_GROUPS')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all overflow-hidden ${currentView === 'WHATSAPP_GROUPS' ? 'bg-white/10 text-white font-bold' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}>
                    <MessageCircle className="w-4 h-4 shrink-0" /> <span className="truncate">Grupos WhatsApp</span>
                </button>

                <button onClick={() => onNavigate('CONTACTS')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all overflow-hidden ${currentView === 'CONTACTS' ? 'bg-white/10 text-white font-bold' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}>
                    <Phone className="w-4 h-4 shrink-0" /> <span className="truncate">Equipe & Contatos</span>
                </button>

                <button onClick={() => onNavigate('REGISTRATION_UPDATE')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all overflow-hidden ${currentView === 'REGISTRATION_UPDATE' ? 'bg-white/10 text-white font-bold' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}>
                    <UserCog className="w-4 h-4 shrink-0" /> <span className="truncate">Atualização Cadastral</span>
                </button>
            </div>
      </nav>

      <div className="p-4 mt-auto">
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-300 hover:bg-white/10 hover:text-white transition-all"
        >
          <LogOut className="w-5 h-5 shrink-0" />
          Sair
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-72 bg-rio-blue text-white shadow-xl transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <SidebarContent />
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center justify-between px-4 lg:px-8 shrink-0 relative z-30">
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden text-gray-600 hover:text-rio-blue p-2 -ml-2"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-4 ml-auto">
             <div className="hidden md:flex flex-col items-end mr-2">
               <span className="text-sm font-bold text-gray-800">{user.name}</span>
               <span className="text-xs text-gray-500">{user.hotel}</span>
             </div>
             
             {user.avatarUrl ? (
               <img src={user.avatarUrl} alt="Profile" className="w-10 h-10 rounded-full border-2 border-gray-100" />
             ) : (
               <div className="w-10 h-10 rounded-full bg-blue-100 text-rio-blue flex items-center justify-center font-bold border border-blue-200">
                 <UserIcon className="w-5 h-5" />
               </div>
             )}
          </div>
        </header>

        {/* Main Scrollable Area */}
        <main 
          id="main-content" 
          className={`flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 scroll-smooth ${isFullPage ? 'p-0' : ''}`}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;

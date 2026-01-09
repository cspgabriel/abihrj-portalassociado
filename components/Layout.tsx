
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
  Users, Search, MessageSquarePlus, ShoppingBag
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

  useEffect(() => {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.scrollTop = 0;
    }
  }, [currentView]);

  const handleOpenBenefit = (benefitId: string) => {
    const benefit = BENEFITS_DATA.find(b => b.id === benefitId);
    if (benefit) {
      onBenefitClick(benefit);
      setIsMobileMenuOpen(false);
    }
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-rio-blue text-white">
      <div className="p-6 flex justify-center shrink-0">
        <img 
           src="https://sindhoteisrj.com.br/wp-content/uploads/2023/04/Logo-HoteisRIO-Branca-Fundo-Transparente.png" 
           alt="HoteisRio" 
           className="h-16 w-auto object-contain brightness-0 invert"
        />
      </div>

      <nav className="flex-1 overflow-y-auto px-4 space-y-4 custom-scrollbar">
            {/* PRINCIPAL SECTION */}
            <div className="mb-2 px-1">
                <button 
                onClick={() => { onNavigate('LANDING_PAGE'); setIsMobileMenuOpen(false); }}
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
                onClick={() => { onNavigate('ALL_BENEFITS'); setIsMobileMenuOpen(false); }}
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

                <button onClick={() => handleOpenBenefit('commercial-actions-hub')} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-yellow-300 font-bold hover:bg-white/10 hover:text-white transition-all overflow-hidden">
                    <ShoppingBag className="w-4 h-4 shrink-0" /> <span className="truncate">Ações Comerciais</span>
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

                <button onClick={() => handleOpenBenefit('calendar-2026')} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-yellow-300 hover:bg-white/10 hover:text-white transition-all overflow-hidden">
                    <Sparkles className="w-4 h-4 shrink-0" /> <span className="truncate">Calendário de Eventos</span>
                </button>

                <button onClick={() => handleOpenBenefit('planejador-feriados-2026')} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/70 hover:bg-white/10 hover:text-white transition-all overflow-hidden">
                    <Calendar className="w-4 h-4 shrink-0" /> <span className="truncate">Calendário de Feriados 2026</span>
                </button>
                
                <button onClick={() => handleOpenBenefit('clipping-service')} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/70 hover:bg-white/10 hover:text-white transition-all overflow-hidden">
                    <FileSearch className="w-4 h-4 shrink-0" /> <span className="truncate">Clipping Diário</span>
                </button>

                <button onClick={() => { onNavigate('COURSES_V2'); setIsMobileMenuOpen(false); }} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all overflow-hidden ${currentView === 'COURSES_V2' ? 'bg-white/10 text-white font-bold' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}>
                    <MonitorPlay className="w-4 h-4 shrink-0" /> <span className="truncate">Cursos & Treinamentos</span>
                </button>
                
                <button onClick={() => handleOpenBenefit('sugestao-pauta')} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/70 hover:bg-white/10 hover:text-white transition-all overflow-hidden">
                    <MessageSquarePlus className="w-4 h-4 shrink-0" /> <span className="truncate">Enviar Sugestão de Pauta</span>
                </button>

                <button onClick={() => handleOpenBenefit('portal-fornecedores-new')} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/70 hover:bg-white/10 hover:text-white transition-all overflow-hidden">
                    <Briefcase className="w-4 h-4 shrink-0" /> <span className="truncate">Fornecedores Hotelaria</span>
                </button>

                <button onClick={() => { onNavigate('FORUMS_OVERVIEW'); setIsMobileMenuOpen(false); }} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all overflow-hidden ${currentView === 'FORUMS_OVERVIEW' ? 'bg-white/10 text-white font-bold' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}>
                    <Users className="w-4 h-4 shrink-0" /> <span className="truncate">Fóruns da Hotelaria</span>
                </button>

                <button onClick={() => handleOpenBenefit('influencers-hub')} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/70 hover:bg-white/10 hover:text-white transition-all overflow-hidden">
                    <Camera className="w-4 h-4 shrink-0" /> <span className="truncate">Influenciadores & Creators</span>
                </button>

                <button onClick={() => handleOpenBenefit('leis-decretos-app')} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/70 hover:bg-white/10 hover:text-white transition-all overflow-hidden">
                    <Gavel className="w-4 h-4 shrink-0" /> <span className="truncate">Leis e Decretos RJ</span>
                </button>

                <button onClick={() => { onNavigate('SECURITY_PAGE'); setIsMobileMenuOpen(false); }} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all overflow-hidden ${currentView === 'SECURITY_PAGE' ? 'bg-white/10 text-white font-bold' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}>
                    <Shield className="w-4 h-4 shrink-0" /> <span className="truncate">Órgãos de Segurança</span>
                </button>

                <button onClick={() => handleOpenBenefit('occupancy-reports')} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/70 hover:bg-white/10 hover:text-white transition-all overflow-hidden">
                    <BarChart3 className="w-4 h-4 shrink-0" /> <span className="truncate">Relatórios de Ocupação</span>
                </button>

                <button onClick={() => { onNavigate('ROCK_IN_RIO'); setIsMobileMenuOpen(false); }} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all overflow-hidden ${currentView === 'ROCK_IN_RIO' ? 'bg-white/10 text-white font-bold' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}>
                    <Music className="w-4 h-4 shrink-0" /> <span className="truncate">Rock in Rio 2026</span>
                </button>
            </div>

            <div className="w-full h-px bg-white/10 my-4 mx-2 w-[calc(100%-16px)]" />

            {/* CONEXÃO */}
            <div className="px-1 space-y-1">
                <div className="text-[10px] font-bold text-blue-200 uppercase tracking-widest px-3 mb-2 mt-2">
                    CONEXÃO
                </div>
                
                <button onClick={() => { onNavigate('WHATSAPP_GROUPS'); setIsMobileMenuOpen(false); }} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all overflow-hidden ${currentView === 'WHATSAPP_GROUPS' ? 'bg-white/10 text-white font-bold' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}>
                    <MessageCircle className="w-4 h-4 shrink-0" /> <span className="truncate">Grupos WhatsApp</span>
                </button>

                <button onClick={() => { onNavigate('CONTACTS'); setIsMobileMenuOpen(false); }} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all overflow-hidden ${currentView === 'CONTACTS' ? 'bg-white/10 text-white font-bold' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}>
                    <Phone className="w-4 h-4 shrink-0" /> <span className="truncate">Equipe & Contatos</span>
                </button>

                <button onClick={() => { onNavigate('REGISTRATION_UPDATE'); setIsMobileMenuOpen(false); }} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all overflow-hidden ${currentView === 'REGISTRATION_UPDATE' ? 'bg-white/10 text-white font-bold' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}>
                    <UserCog className="w-4 h-4 shrink-0" /> <span className="truncate">Atualização Cadastral</span>
                </button>
            </div>
      </nav>

      <div className="p-4 mt-auto shrink-0">
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
        {/* Mobile Overlay */}
        {isMobileMenuOpen && (
            <div 
                className="fixed inset-0 bg-black/60 z-40 md:hidden transition-opacity" 
                onClick={() => setIsMobileMenuOpen(false)} 
            />
        )}

        {/* Sidebar Mobile & Desktop */}
        <aside className={`
            fixed inset-y-0 left-0 z-50 w-72 bg-rio-blue transform transition-transform duration-300 ease-in-out shadow-2xl
            md:translate-x-0 md:static md:inset-auto md:shadow-none
            ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
            <SidebarContent />
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative" id="main-content">
            
            {/* Mobile Top Bar */}
            <div className="md:hidden bg-rio-blue p-4 flex items-center justify-between text-white shadow-md z-30 shrink-0">
                <button onClick={() => setIsMobileMenuOpen(true)}>
                    <Menu className="w-6 h-6" />
                </button>
                <div className="flex items-center gap-2">
                    <img 
                        src="https://sindhoteisrj.com.br/wp-content/uploads/2023/04/Logo-HoteisRIO-Branca-Fundo-Transparente.png" 
                        alt="HoteisRio" 
                        className="h-8 w-auto brightness-0 invert"
                    />
                </div>
                <div className="w-6" /> {/* Spacer */}
            </div>

            {/* Desktop Header - Only show if not a "Full Page" view */}
            {!isFullPage && (
                <header className="hidden md:flex bg-white h-16 border-b border-gray-200 justify-between items-center px-8 shrink-0 z-20">
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <Home className="w-4 h-4" />
                        <span>/</span>
                        <span className="font-medium text-gray-600">
                            {currentView === 'LANDING_PAGE' ? 'Início' : 
                             currentView === 'MODERN_DASHBOARD' ? 'Dashboard' : 
                             currentView.replace(/_/g, ' ').toLowerCase()}
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="p-2 text-gray-400 hover:text-rio-blue transition-colors relative">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                        </button>
                        <div className="h-8 w-px bg-gray-200 mx-2"></div>
                        <div className="flex items-center gap-3">
                            <div className="text-right">
                                <p className="text-sm font-bold text-gray-800 leading-none">{user.name.split(' ')[0]}</p>
                                <p className="text-xs text-gray-500 mt-0.5 truncate max-w-[150px]">{user.hotel}</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-rio-blue font-bold shadow-inner border border-blue-200">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                        </div>
                    </div>
                </header>
            )}

            {/* Scrollable Main Content */}
            <main className="flex-1 overflow-y-auto bg-gray-50 relative scroll-smooth w-full">
                {children}
            </main>
        </div>
    </div>
  );
};

export default Layout;

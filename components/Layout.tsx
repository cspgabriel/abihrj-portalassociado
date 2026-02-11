
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
  Users, Search, MessageSquarePlus, ShoppingBag, HelpCircle, Image, BookOpen,
  LayoutDashboard, Book
} from 'lucide-react';
import { BENEFITS_DATA } from '../constants';

interface LayoutProps {
  user: User;
  onLogout: () => void;
  onNavigate: (view: string) => void;
  onBenefitClick: (benefit: Benefit) => void;
  onSearch?: (term: string) => void;
  currentView: string;
  isFullPage?: boolean;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ 
  user, 
  onLogout, 
  onNavigate, 
  onBenefitClick, 
  onSearch,
  currentView, 
  isFullPage = false, 
  children 
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState('');

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

  const handleSearchSubmit = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && onSearch && localSearch.trim()) {
      onSearch(localSearch);
      setLocalSearch(''); // Optional: clear after search or keep it
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

      <nav className="flex-1 overflow-y-auto px-4 space-y-4 custom-scrollbar pb-24 md:pb-4">
            {/* PRINCIPAL SECTION */}
            <div className="mb-2 px-1">
                <button 
                id="sidebar-home"
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

                {/* SUBSTITUÍDO: Dashboard -> Como Funciona */}
                <button 
                id="sidebar-tutorial"
                onClick={() => { onNavigate('PLATFORM_TUTORIAL'); setIsMobileMenuOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group mb-1
                    ${currentView === 'PLATFORM_TUTORIAL'
                    ? 'bg-white text-rio-blue font-bold shadow-lg' 
                    : 'text-white/80 hover:bg-white/10 hover:text-white'}
                `}
                >
                <BookOpen className="w-5 h-5 shrink-0" />
                Como Funciona
                </button>

                <button 
                id="sidebar-all-benefits"
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

                <button id="sidebar-commercial" onClick={() => handleOpenBenefit('commercial-actions-hub')} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-yellow-300 font-bold hover:bg-white/10 hover:text-white transition-all overflow-hidden">
                    <ShoppingBag className="w-4 h-4 shrink-0" /> <span className="truncate">Ações Comerciais</span>
                </button>

                <button id="sidebar-juridico" onClick={() => handleOpenBenefit('juridico-01')} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/70 hover:bg-white/10 hover:text-white transition-all overflow-hidden">
                    <Gavel className="w-4 h-4 shrink-0" /> <span className="truncate">Assessoria Jurídica</span>
                </button>
                
                <button id="sidebar-talentos" onClick={() => handleOpenBenefit('banco-talentos')} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/70 hover:bg-white/10 hover:text-white transition-all overflow-hidden">
                    <Users className="w-4 h-4 shrink-0" /> <span className="truncate">Banco de Talentos</span>
                </button>

                <button id="sidebar-events-reg" onClick={() => handleOpenBenefit('highlight-events-reg')} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/70 hover:bg-white/10 hover:text-white transition-all overflow-hidden">
                    <FileText className="w-4 h-4 shrink-0" /> <span className="truncate">Cadastro de Grandes Eventos</span>
                </button>

                <button id="sidebar-calendar" onClick={() => handleOpenBenefit('calendar-2026')} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-yellow-300 hover:bg-white/10 hover:text-white transition-all overflow-hidden">
                    <Sparkles className="w-4 h-4 shrink-0" /> <span className="truncate">Calendário de Eventos</span>
                </button>

                <button id="sidebar-holidays" onClick={() => handleOpenBenefit('planejador-feriados-2026')} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/70 hover:bg-white/10 hover:text-white transition-all overflow-hidden">
                    <Calendar className="w-4 h-4 shrink-0" /> <span className="truncate">Calendário de Feriados 2026</span>
                </button>
                
                <button id="sidebar-clipping" onClick={() => handleOpenBenefit('clipping-service')} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/70 hover:bg-white/10 hover:text-white transition-all overflow-hidden">
                    <FileSearch className="w-4 h-4 shrink-0" /> <span className="truncate">Clipping Diário</span>
                </button>

                <button id="sidebar-courses" onClick={() => { onNavigate('COURSES_V2'); setIsMobileMenuOpen(false); }} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all overflow-hidden ${currentView === 'COURSES_V2' ? 'bg-white/10 text-white font-bold' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}>
                    <MonitorPlay className="w-4 h-4 shrink-0" /> <span className="truncate">Cursos & Treinamentos</span>
                </button>

                <button id="sidebar-public-order" onClick={() => handleOpenBenefit('public-order-01')} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/70 hover:bg-white/10 hover:text-white transition-all overflow-hidden">
                    <Megaphone className="w-4 h-4 shrink-0" /> <span className="truncate">Demandas de Ordem Pública</span>
                </button>
                
                <button id="sidebar-suggestion" onClick={() => handleOpenBenefit('sugestao-pauta')} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/70 hover:bg-white/10 hover:text-white transition-all overflow-hidden">
                    <MessageSquarePlus className="w-4 h-4 shrink-0" /> <span className="truncate">Enviar Sugestão de Pauta</span>
                </button>

                <button id="sidebar-suppliers" onClick={() => handleOpenBenefit('portal-fornecedores-new')} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/70 hover:bg-white/10 hover:text-white transition-all overflow-hidden">
                    <Briefcase className="w-4 h-4 shrink-0" /> <span className="truncate">Fornecedores Hotelaria</span>
                </button>

                <button id="sidebar-forums" onClick={() => { onNavigate('FORUMS_OVERVIEW'); setIsMobileMenuOpen(false); }} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all overflow-hidden ${currentView === 'FORUMS_OVERVIEW' ? 'bg-white/10 text-white font-bold' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}>
                    <Users className="w-4 h-4 shrink-0" /> <span className="truncate">Fóruns da Hotelaria</span>
                </button>

                <button id="sidebar-influencers" onClick={() => handleOpenBenefit('influencers-hub')} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/70 hover:bg-white/10 hover:text-white transition-all overflow-hidden">
                    <Camera className="w-4 h-4 shrink-0" /> <span className="truncate">Parceiros Influenciadores</span>
                </button>

                <button id="sidebar-laws" onClick={() => handleOpenBenefit('leis-decretos-app')} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/70 hover:bg-white/10 hover:text-white transition-all overflow-hidden">
                    <Gavel className="w-4 h-4 shrink-0" /> <span className="truncate">Leis e Decretos RJ</span>
                </button>

                <button id="sidebar-security" onClick={() => { onNavigate('SECURITY_PAGE'); setIsMobileMenuOpen(false); }} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all overflow-hidden ${currentView === 'SECURITY_PAGE' ? 'bg-white/10 text-white font-bold' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}>
                    <Shield className="w-4 h-4 shrink-0" /> <span className="truncate">Órgãos de Segurança</span>
                </button>

                <button id="sidebar-stats" onClick={() => handleOpenBenefit('occupancy-reports')} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/70 hover:bg-white/10 hover:text-white transition-all overflow-hidden">
                    <BarChart3 className="w-4 h-4 shrink-0" /> <span className="truncate">Relatórios de Ocupação</span>
                </button>

                <button id="sidebar-rir" onClick={() => { onNavigate('ROCK_IN_RIO'); setIsMobileMenuOpen(false); }} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all overflow-hidden ${currentView === 'ROCK_IN_RIO' ? 'bg-white/10 text-white font-bold' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}>
                    <Music className="w-4 h-4 shrink-0" /> <span className="truncate">Rock in Rio 2026</span>
                </button>
            </div>

            <div className="w-full h-px bg-white/10 my-4 mx-2 w-[calc(100%-16px)]" />

            {/* CONEXÃO */}
            <div className="px-1 space-y-1">
                <div className="text-[10px] font-bold text-blue-200 uppercase tracking-widest px-3 mb-2 mt-2">
                    CONEXÃO
                </div>
                
                <button id="sidebar-community" onClick={() => { onNavigate('WHATSAPP_GROUPS'); setIsMobileMenuOpen(false); }} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all overflow-hidden ${currentView === 'WHATSAPP_GROUPS' ? 'bg-white/10 text-white font-bold' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}>
                    <MessageCircle className="w-4 h-4 shrink-0" /> <span className="truncate">Grupos WhatsApp</span>
                </button>

                <button id="sidebar-contacts" onClick={() => { onNavigate('CONTACTS'); setIsMobileMenuOpen(false); }} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all overflow-hidden ${currentView === 'CONTACTS' ? 'bg-white/10 text-white font-bold' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}>
                    <Phone className="w-4 h-4 shrink-0" /> <span className="truncate">Equipe & Contatos</span>
                </button>

                <button id="sidebar-registration" onClick={() => { onNavigate('REGISTRATION_UPDATE'); setIsMobileMenuOpen(false); }} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all overflow-hidden ${currentView === 'REGISTRATION_UPDATE' ? 'bg-white/10 text-white font-bold' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}>
                    <UserCog className="w-4 h-4 shrink-0" /> <span className="truncate">Atualização Cadastral</span>
                </button>
            </div>
      </nav>

      <div className="p-4 mt-auto shrink-0 space-y-2 hidden md:block">
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
        {/* Mobile Overlay for Sidebar */}
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
            {/* Close button inside drawer for easier mobile exit */}
            {isMobileMenuOpen && (
                <button 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="absolute top-4 right-4 text-white/70 hover:text-white md:hidden"
                >
                    <X className="w-6 h-6" />
                </button>
            )}
            <SidebarContent />
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative" id="main-content">
            
            {/* Mobile Top Bar (Simplified) */}
            <div className="md:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between text-rio-blue shadow-sm z-30 shrink-0 h-16">
                <div className="flex items-center gap-2">
                    <img 
                        src="https://sindhoteisrj.com.br/wp-content/uploads/2023/04/Logo-HoteisRIO-Branca-Fundo-Transparente.png" 
                        alt="HoteisRio" 
                        className="h-8 w-auto filter invert brightness-0" // Using black version for white header or blue version if available
                        style={{ filter: 'brightness(0) saturate(100%) invert(18%) sepia(87%) saturate(2227%) hue-rotate(205deg) brightness(91%) contrast(105%)' }} // Rio Blue Filter
                    />
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-rio-blue font-bold text-xs">
                        {user.name.charAt(0).toUpperCase()}
                    </div>
                </div>
            </div>

            {/* Desktop Header */}
            {!isFullPage && (
                <header className="hidden md:flex bg-white h-16 border-b border-gray-200 justify-between items-center px-8 shrink-0 z-20 gap-4">
                    <div className="flex items-center gap-2 text-gray-400 text-sm whitespace-nowrap">
                        <Home className="w-4 h-4" />
                        <span>/</span>
                        <span className="font-medium text-gray-600">
                            {currentView === 'LANDING_PAGE' ? 'Início' : 
                             currentView === 'PLATFORM_TUTORIAL' ? 'Como Funciona' : 
                             currentView.replace(/_/g, ' ').toLowerCase()}
                        </span>
                    </div>

                    {/* Search Bar */}
                    <div className="flex-1 max-w-md mx-4 relative">
                        <input 
                            type="text"
                            value={localSearch}
                            onChange={(e) => setLocalSearch(e.target.value)}
                            onKeyDown={handleSearchSubmit}
                            placeholder="Buscar benefício ou serviço..."
                            className="w-full bg-gray-100 border-none rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-rio-blue focus:bg-white transition-all outline-none text-gray-700"
                        />
                        <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                    </div>

                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => onNavigate('WELCOME')}
                            className="p-2 text-gray-400 hover:text-rio-blue transition-colors flex items-center gap-2 group"
                            title="Como Funciona / Tutorial"
                        >
                            <BookOpen className="w-5 h-5" />
                            <span className="text-xs font-medium hidden lg:block group-hover:underline">Como Funciona</span>
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

            {/* Scrollable Main Content - Padding bottom added for mobile nav */}
            <main className="flex-1 overflow-y-auto bg-gray-50 relative scroll-smooth w-full pb-20 md:pb-0">
                {children}
            </main>

            {/* Mobile Bottom Navigation Bar */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-between items-center px-6 py-2 pb-safe z-40 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                <button 
                    onClick={() => onNavigate('LANDING_PAGE')}
                    className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${currentView === 'LANDING_PAGE' ? 'text-rio-blue' : 'text-gray-400 hover:text-gray-600'}`}
                >
                    <Home className={`w-6 h-6 ${currentView === 'LANDING_PAGE' ? 'fill-current' : ''}`} strokeWidth={currentView === 'LANDING_PAGE' ? 2 : 1.5} />
                    <span className="text-[10px] font-medium">Início</span>
                </button>

                {/* SUBSTITUÍDO: Painel -> Ajuda (Tutorial) */}
                <button 
                    onClick={() => onNavigate('PLATFORM_TUTORIAL')}
                    className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${currentView === 'PLATFORM_TUTORIAL' ? 'text-rio-blue' : 'text-gray-400 hover:text-gray-600'}`}
                >
                    <Book className={`w-6 h-6 ${currentView === 'PLATFORM_TUTORIAL' ? 'fill-blue-100' : ''}`} strokeWidth={currentView === 'PLATFORM_TUTORIAL' ? 2 : 1.5} />
                    <span className="text-[10px] font-medium">Ajuda</span>
                </button>

                <button 
                    onClick={() => onNavigate('ALL_BENEFITS')}
                    className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${currentView === 'ALL_BENEFITS' ? 'text-rio-blue' : 'text-gray-400 hover:text-gray-600'}`}
                >
                    <LayoutGrid className={`w-6 h-6 ${currentView === 'ALL_BENEFITS' ? 'fill-blue-100' : ''}`} strokeWidth={currentView === 'ALL_BENEFITS' ? 2 : 1.5} />
                    <span className="text-[10px] font-medium">Benefícios</span>
                </button>

                <button 
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="flex flex-col items-center gap-1 p-2 rounded-lg text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <Menu className="w-6 h-6" strokeWidth={1.5} />
                    <span className="text-[10px] font-medium">Menu</span>
                </button>
            </div>
        </div>
    </div>
  );
};

export default Layout;

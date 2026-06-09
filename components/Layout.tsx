
// Autor: Gabriel Salles
// Suporte do SO: Windows11
// Descrição: Layout principal com Sidebar e Topbar

import React, { useState, useEffect } from 'react';
import { User, Benefit } from '../types';
import { 
  Menu, X, LogOut, User as UserIcon, Bell, 
  Home, LayoutGrid, Gavel, FileText, Sparkles, Calendar, 
  MonitorPlay, Megaphone, Briefcase, BarChart3, Music,
  MessageCircle, Phone, Shield, UserCog, ArrowLeft,
  Users, Search, MessageSquarePlus, ShoppingBag, HelpCircle, Newspaper, Camera,
  Star
} from 'lucide-react';
import { BENEFITS_DATA } from '../constants';
import Breadcrumb from './Breadcrumb';

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
    const scrollable = document.getElementById('scrollable-content');
    if (scrollable) {
      scrollable.scrollTop = 0;
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
      setLocalSearch('');
    }
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[#002b64] text-white">
      <div className="px-6 pt-7 pb-5 flex justify-center shrink-0">
        <img 
           src="https://abihrj.com.br/wp-content/uploads/2024/08/Logo-ABIH-RJ-BRANCA-1.webp" 
           alt="ABIH-RJ" 
           className="h-16 w-auto object-contain"
        />
      </div>

      <nav className="flex-1 overflow-y-auto px-3 space-y-4 custom-scrollbar pb-24 md:pb-4">
            {/* PRINCIPAL SECTION */}
            <div className="mb-2 px-1">
                <button 
                id="sidebar-home"
                onClick={() => { onNavigate('LANDING_PAGE'); setIsMobileMenuOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group mb-1
                    ${currentView === 'LANDING_PAGE'
                    ? 'bg-white/12 text-[#f5c64b] font-bold shadow-lg ring-1 ring-white/10' 
                    : 'text-white/80 hover:bg-white/10 hover:text-white'}
                `}
                >
                <Home className="w-5 h-5 shrink-0" />
                Início
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
                <div className="text-[10px] font-bold text-blue-200/70 uppercase tracking-widest px-3 mb-2 mt-5">
                    GESTÃO E SUPORTE
                </div>

                <button id="sidebar-commercial-actions" onClick={() => handleOpenBenefit('commercial-actions-hub')} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/70 hover:bg-white/10 hover:text-white transition-all overflow-hidden">
                    <ShoppingBag className="w-4 h-4 shrink-0" /> <span className="truncate">Ações Comerciais</span>
                </button>

                <button id="sidebar-juridico" onClick={() => handleOpenBenefit('juridico-01')} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/70 hover:bg-white/10 hover:text-white transition-all overflow-hidden">
                    <Gavel className="w-4 h-4 shrink-0" /> <span className="truncate">Assessoria Jurídica</span>
                </button>
                
                <button id="sidebar-talentos" onClick={() => handleOpenBenefit('banco-talentos')} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/70 hover:bg-white/10 hover:text-white transition-all overflow-hidden">
                    <Users className="w-4 h-4 shrink-0" /> <span className="truncate">Banco de Talentos</span>
                </button>

<button id="sidebar-suppliers" onClick={() => handleOpenBenefit('portal-fornecedores-new')} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/70 hover:bg-white/10 hover:text-white transition-all overflow-hidden">
                    <Briefcase className="w-4 h-4 shrink-0" /> <span className="truncate">Fornecedores Hotelaria</span>
                </button>

<div className="text-[10px] font-bold text-blue-200/70 uppercase tracking-widest px-3 mb-2 mt-5">
                    EVENTOS E CONTEÚDO
                </div>

                <div id="sidebar-calendar" className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/40 cursor-not-allowed overflow-hidden">
                    <Calendar className="w-4 h-4 shrink-0" /> <span className="truncate">Calendário de Eventos</span>
                    <span className="ml-auto shrink-0 text-xs bg-white/10 text-white/50 px-1.5 py-0.5 rounded-full">Em breve</span>
                </div>

                <button id="sidebar-holidays" onClick={() => handleOpenBenefit('planejador-feriados-2026')} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/70 hover:bg-white/10 hover:text-white transition-all overflow-hidden">
                    <Calendar className="w-4 h-4 shrink-0" /> <span className="truncate">Calendário de Feriados 2026</span>
                </button>

<button id="sidebar-courses" onClick={() => { onNavigate('COURSES_V2'); setIsMobileMenuOpen(false); }} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all overflow-hidden ${currentView === 'COURSES_V2' ? 'bg-white/10 text-white font-bold' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}>
                    <MonitorPlay className="w-4 h-4 shrink-0" /> <span className="truncate">Cursos & Treinamentos</span>
                </button>

<button id="sidebar-rir" onClick={() => { onNavigate('ROCK_IN_RIO'); setIsMobileMenuOpen(false); }} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all overflow-hidden ${currentView === 'ROCK_IN_RIO' ? 'bg-white/10 text-white font-bold' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}>
                    <Music className="w-4 h-4 shrink-0" /> <span className="truncate">Rock in Rio 2026</span>
                </button>

                <button id="sidebar-rio-press" onClick={() => handleOpenBenefit('rio-international-press')} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/70 hover:bg-white/10 hover:text-white transition-all overflow-hidden">
                    <Newspaper className="w-4 h-4 shrink-0" /> <span className="truncate">Rio International Press</span>
                </button>

                <button id="sidebar-influencers" onClick={() => handleOpenBenefit('influencers-hub')} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/70 hover:bg-white/10 hover:text-white transition-all overflow-hidden">
                    <Camera className="w-4 h-4 shrink-0" /> <span className="truncate">Influenciadores / UGC</span>
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
            fixed inset-y-0 left-0 z-50 w-64 bg-[#002b64] transform transition-transform duration-300 ease-in-out shadow-2xl
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
                        src="https://abihrj.com.br/wp-content/uploads/2024/08/Logo-ABIH-RJ-BRANCA-1.webp" 
                        alt="ABIH-RJ" 
                        className="h-8 w-auto"
                        style={{ filter: 'brightness(0) saturate(100%) invert(18%) sepia(87%) saturate(2227%) hue-rotate(205deg) brightness(91%) contrast(105%)' }}
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
                <header className="hidden md:flex bg-white h-16 border-b border-slate-200 justify-between items-center px-8 shrink-0 z-20 gap-4">
                    <div className="flex items-center gap-5 text-slate-700">
                        <Menu className="h-5 w-5 text-slate-500" />
                        <div className="h-6 w-px bg-slate-200" />
                        <span className="text-sm font-black text-slate-800">Painel do Associado</span>
                    </div>

                    {/* Search Bar */}
                    <div className="flex-1 max-w-xl mx-4 relative">
                        <input 
                            type="text"
                            value={localSearch}
                            onChange={(e) => setLocalSearch(e.target.value)}
                            onKeyDown={handleSearchSubmit}
                            placeholder="Buscar beneficio, servico, evento..."
                            className="w-full bg-slate-100 border-none rounded-lg py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-rio-blue focus:bg-white transition-all outline-none text-slate-700"
                        />
                        <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    </div>

                    <div className="flex items-center gap-5 text-sm font-black text-slate-700">
                        <button className="flex items-center gap-2 hover:text-rio-blue">
                            <LayoutGrid className="h-5 w-5" /> Atalhos
                        </button>
                        <div className="h-8 w-px bg-slate-200"></div>
                        <button className="flex items-center gap-2 hover:text-rio-blue">
                            <Star className="h-5 w-5" /> Favoritos
                        </button>
                        <button className="relative flex items-center gap-2 hover:text-rio-blue">
                            <Bell className="h-5 w-5" /> Notificações
                            <span className="absolute -right-3 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-900 text-[10px] font-black text-white">3</span>
                        </button>
                        <div className="h-8 w-px bg-slate-200 mx-1"></div>
                        <div className="flex items-center gap-3">
                            <div className="text-right">
                                <p className="text-sm font-black text-slate-900 leading-none">{user.name.split(' ')[0]}</p>
                                <p className="text-xs font-medium text-slate-500 mt-0.5 truncate max-w-[150px]">{user.hotel || 'HoteisRIO'}</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center text-white font-black shadow-inner border border-blue-800">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                        </div>
                    </div>
                </header>
            )}

            {/* Scrollable Main Content - Padding bottom added for mobile nav */}
            <main id="scrollable-content" className="flex-1 overflow-y-auto bg-gray-50 relative scroll-smooth w-full pb-20 md:pb-0">
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

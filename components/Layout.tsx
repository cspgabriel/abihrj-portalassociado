
import React, { useState } from 'react';
import { User, Benefit, BenefitCategory, HotelSector } from '../types';
import { 
  Home, Users, MessageCircle, LogOut, Menu, X, Search, 
  LayoutDashboard, Calculator, Shield, Briefcase, Wrench, 
  GraduationCap, Calendar, PieChart, Headphones, Settings,
  ChevronRight, ChevronDown, Bell, UserCircle, ExternalLink, Sparkles, LayoutGrid, Building2, Bed, Utensils, ConciergeBell, ArrowRight, MousePointer2, FileText, MonitorPlay,
  Gavel, Music, Ticket, UserCog, Megaphone
} from 'lucide-react';
import { BENEFITS_DATA } from '../constants';
import * as Icons from 'lucide-react';

// Import AppView type locally
type AppView = 'LANDING_PAGE' | 'DASHBOARD' | 'BENEFIT_DETAILS' | 'TUTORIAL' | 'CONTACTS' | 'WHATSAPP_GROUPS' | 'ASSOCIATION_EVENTS' | 'LAWS_REGULATIONS' | 'SECURITY_PAGE' | 'REGISTRATION_UPDATE' | 'FORUM_PAGE' | 'FORUMS_OVERVIEW' | 'ROCK_IN_RIO' | 'CALCULATORS_PAGE' | 'CATEGORY_LISTING' | 'ALL_BENEFITS' | 'SERVICE_VIEWER' | 'CATEGORIZER' | 'COURSES_V2';

interface LayoutProps {
  children: React.ReactNode;
  user: User;
  onLogout: () => void;
  onNavigate: (view: AppView, params?: any) => void;
  onBenefitClick?: (benefit: Benefit) => void;
  onCategorySelect?: (category: string) => void; 
  currentView?: string;
  selectedCategory?: string; 
  onSectorSelect?: (sector: HotelSector) => void;
  isFullPage?: boolean; // New prop to control padding
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  user, 
  onLogout, 
  onNavigate, 
  onBenefitClick,
  onSectorSelect,
  currentView,
  isFullPage = false
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Benefit[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  // Search Logic
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term.length >= 2) {
      const results = BENEFITS_DATA.filter(b => 
        b.title.toLowerCase().includes(term.toLowerCase()) || 
        b.description.toLowerCase().includes(term.toLowerCase())
      );
      setSearchResults(results);
      setIsSearchOpen(true);
    } else {
      setSearchResults([]);
      setIsSearchOpen(false);
    }
  };

  const handleSearchResultClick = (benefit: Benefit) => {
    if (onBenefitClick) onBenefitClick(benefit);
    setSearchTerm('');
    setIsSearchOpen(false);
    setIsMobileMenuOpen(false);
  };

  const handleOpenCalendar = () => {
      const calendar = BENEFITS_DATA.find(b => b.id === 'calendar-2026');
      if (calendar && onBenefitClick) {
          onBenefitClick(calendar);
      }
      setIsMobileMenuOpen(false);
  };

  const handleOpenBenefit = (id: string) => {
      const benefit = BENEFITS_DATA.find(b => b.id === id);
      if (benefit && onBenefitClick) {
          onBenefitClick(benefit);
      }
      setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      
      {/* --- SIDEBAR (Desktop) --- */}
      <aside className="hidden md:flex w-72 flex-col bg-gradient-to-b from-rio-blue to-blue-900 text-white shadow-2xl z-30 shrink-0 h-full border-r border-white/5">
        {/* Logo Area */}
        <div className="p-6 flex items-center justify-center border-b border-white/10 h-20 shrink-0 bg-rio-blue">
           <img 
             src="https://sindhoteisrj.com.br/wp-content/uploads/2023/04/Logo-HoteisRIO-Branca-Fundo-Transparente.png" 
             alt="HoteisRio" 
             className="h-10 w-auto cursor-pointer hover:opacity-80 transition-opacity"
             onClick={() => onNavigate('DASHBOARD')}
           />
        </div>

        {/* Scrollable Navigation */}
        <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
            
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
                onClick={() => onNavigate('DASHBOARD')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group mb-1
                    ${currentView === 'DASHBOARD'
                    ? 'bg-white text-rio-blue font-bold shadow-lg' 
                    : 'text-white/80 hover:bg-white/10 hover:text-white'}
                `}
                >
                <LayoutDashboard className="w-5 h-5 shrink-0" />
                Visão Geral
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

                <button onClick={() => handleOpenBenefit('juridico-01')} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/70 hover:bg-white/10 hover:text-white transition-all overflow-hidden">
                    <Gavel className="w-4 h-4 shrink-0" /> <span className="truncate">Assessoria Jurídica</span>
                </button>

                <button onClick={() => handleOpenBenefit('highlight-events-reg')} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/70 hover:bg-white/10 hover:text-white transition-all overflow-hidden">
                    <FileText className="w-4 h-4 shrink-0" /> <span className="truncate">Cadastro de Grandes Eventos</span>
                </button>

                <button onClick={handleOpenCalendar} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-yellow-300 hover:bg-white/10 hover:text-white transition-all overflow-hidden">
                    <Sparkles className="w-4 h-4 shrink-0" /> <span className="truncate">Calendário de Eventos</span>
                </button>

                <button onClick={() => handleOpenBenefit('planejador-feriados-2026')} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/70 hover:bg-white/10 hover:text-white transition-all overflow-hidden">
                    <Calendar className="w-4 h-4 shrink-0" /> <span className="truncate">Calendário de Feriados 2026</span>
                </button>

                <button onClick={() => onNavigate('COURSES_V2')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all overflow-hidden ${currentView === 'COURSES_V2' ? 'bg-white/10 text-white font-bold' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}>
                    <MonitorPlay className="w-4 h-4 shrink-0" /> <span className="truncate">Cursos & Treinamentos</span>
                </button>

                <button onClick={() => handleOpenBenefit('public-order-01')} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/70 hover:bg-white/10 hover:text-white transition-all overflow-hidden">
                    <Megaphone className="w-4 h-4 shrink-0" /> <span className="truncate">Demandas de Ordem Pública</span>
                </button>

                <button onClick={() => handleOpenBenefit('portal-fornecedores-new')} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/70 hover:bg-white/10 hover:text-white transition-all overflow-hidden">
                    <Briefcase className="w-4 h-4 shrink-0" /> <span className="truncate">Fornecedores Hotelaria</span>
                </button>

                <button onClick={() => onNavigate('ROCK_IN_RIO')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all overflow-hidden ${currentView === 'ROCK_IN_RIO' ? 'bg-white/10 text-white font-bold' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}>
                    <Music className="w-4 h-4 shrink-0" /> <span className="truncate">Rock in Rio 2026</span>
                </button>
            </div>

            <div className="w-full h-px bg-white/10 my-4 mx-2 w-[calc(100%-16px)]" />

            {/* COMUNIDADE */}
            <div className="px-1 space-y-1">
                <div className="text-[10px] font-bold text-blue-200 uppercase tracking-widest px-3 mb-2 mt-2">
                    Conexão
                </div>

                <button onClick={() => onNavigate('WHATSAPP_GROUPS')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all overflow-hidden ${currentView === 'WHATSAPP_GROUPS' ? 'bg-white/10 text-white font-bold' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}>
                    <MessageCircle className="w-4 h-4 shrink-0" /> <span className="truncate">Grupos WhatsApp</span>
                </button>

                <button onClick={() => onNavigate('CONTACTS')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all overflow-hidden ${currentView === 'CONTACTS' ? 'bg-white/10 text-white font-bold' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}>
                    <Users className="w-4 h-4 shrink-0" /> <span className="truncate">Equipe & Contatos</span>
                </button>

                <button onClick={() => onNavigate('REGISTRATION_UPDATE')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all overflow-hidden ${currentView === 'REGISTRATION_UPDATE' ? 'bg-white/10 text-white font-bold' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}>
                    <UserCog className="w-4 h-4 shrink-0" /> <span className="truncate">Atualização Cadastral</span>
                </button>

                <button onClick={() => onNavigate('CATEGORIZER')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all overflow-hidden ${currentView === 'CATEGORIZER' ? 'bg-white/10 text-white font-bold' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}>
                    <FileText className="w-4 h-4 shrink-0" /> <span className="truncate">Relatórios</span>
                </button>
            </div>

        </div>

        {/* User Footer */}
        <div className="p-4 bg-black/20 shrink-0 border-t border-white/10">
            <div className="flex items-center gap-3 mb-3">
                <div className="bg-white/20 p-2 rounded-full">
                    <UserCircle className="w-6 h-6 text-white" />
                </div>
                <div className="overflow-hidden">
                    <p className="text-sm font-bold text-white truncate">{user.name}</p>
                    <p className="text-[10px] text-blue-200 truncate uppercase">{user.hotel}</p>
                </div>
            </div>
            <button 
              onClick={onLogout}
              className="w-full flex items-center justify-center gap-2 bg-red-500/20 hover:bg-red-600 text-red-100 hover:text-white py-2 rounded-lg text-xs font-bold transition-colors uppercase tracking-wide"
            >
               <LogOut className="w-3 h-3" /> Encerrar Sessão
            </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative bg-slate-50">
        
        {/* Top Header (Desktop & Mobile) - HIDDEN IN FULL PAGE MODE */}
        {!isFullPage && (
        <header className="h-16 bg-white border-b border-gray-200 shadow-sm shrink-0 flex items-center justify-center md:justify-between px-4 lg:px-8 z-20">
            
            {/* Mobile Menu Toggle */}
            <div className="flex items-center gap-4 md:hidden w-full justify-between">
               <div className="flex items-center gap-3">
                   <button onClick={() => setIsMobileMenuOpen(true)} className="text-gray-600 hover:text-rio-blue">
                      <Menu className="w-6 h-6" />
                   </button>
                   <span className="font-bold text-gray-800 text-sm">HoteisRio</span>
               </div>
               <img 
                 src="https://sindhoteisrj.com.br/wp-content/uploads/2023/08/logo-hoteisrio-color.png" 
                 alt="HoteisRio" 
                 className="h-6 w-auto"
               />
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-xl mx-4 relative">
                <div className="relative w-full">
                    <input 
                      type="text" 
                      value={searchTerm}
                      onChange={(e) => handleSearch(e.target.value)}
                      placeholder="Buscar benefício, serviço ou ferramenta..." 
                      className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-transparent hover:bg-white hover:border-gray-200 focus:bg-white focus:border-rio-blue rounded-full text-sm focus:ring-2 focus:ring-rio-blue/20 focus:outline-none transition-all"
                    />
                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                </div>
                
                {/* Search Results Dropdown */}
                {isSearchOpen && (
                  <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden animate-fade-in z-50 max-h-80 overflow-y-auto">
                    {searchResults.length > 0 ? (
                      <ul>
                        {searchResults.map(result => (
                          <li key={result.id}>
                            <button 
                              onClick={() => handleSearchResultClick(result)}
                              className="w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors border-b border-gray-50 last:border-0 flex items-center gap-3"
                            >
                              <div className="bg-blue-50 p-2 rounded-lg text-rio-blue shrink-0">
                                  <LayoutDashboard className="w-4 h-4" /> 
                              </div>
                              <div>
                                  <span className="font-bold text-sm text-gray-800 block">{result.title}</span>
                                  <span className="text-xs text-gray-500 truncate block">{result.description}</span>
                              </div>
                              <ChevronRight className="w-4 h-4 text-gray-300 ml-auto" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="p-8 text-center text-sm text-gray-500">
                        Nenhum resultado encontrado.
                      </div>
                    )}
                  </div>
                )}
            </div>

            {/* Right Actions */}
            <div className="hidden md:flex items-center gap-4">
               <button 
                 onClick={() => onNavigate('TUTORIAL')}
                 className="hidden md:flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-rio-blue bg-gray-50 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors"
               >
                  <Settings className="w-4 h-4" />
                  Ajuda
               </button>
               <button className="relative p-2 text-gray-400 hover:text-rio-blue transition-colors">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
               </button>
               <div className="hidden md:flex items-center gap-3 pl-4 border-l border-gray-200">
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-800 leading-none">{user.name}</p>
                    <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-wide">{user.hotel}</p>
                  </div>
                  <div className="w-9 h-9 bg-rio-blue text-white rounded-full flex items-center justify-center font-bold shadow-sm ring-2 ring-blue-50">
                     {user.name.charAt(0)}
                  </div>
               </div>
            </div>
        </header>
        )}

        {/* Main Scrollable Content */}
        <main className={`flex-1 overflow-y-auto scroll-smooth relative ${isFullPage ? 'p-0' : 'p-4 md:p-8'}`} id="main-content">
           <div className={`${isFullPage ? 'h-full w-full' : 'max-w-7xl mx-auto pb-10'}`}>
             {children}
           </div>
        </main>
      </div>

      {/* --- MOBILE SIDEBAR (Drawer) --- */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
           {/* Backdrop */}
           <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
           
           {/* Drawer */}
           <div className="relative w-[85%] max-w-xs bg-gradient-to-b from-rio-blue to-blue-900 h-full shadow-2xl flex flex-col animate-slide-in-left">
              <div className="p-5 flex justify-between items-center border-b border-white/10 shrink-0">
                 <img 
                   src="https://sindhoteisrj.com.br/wp-content/uploads/2023/04/Logo-HoteisRIO-Branca-Fundo-Transparente.png" 
                   alt="HoteisRio" 
                   className="h-8 w-auto"
                 />
                 <button onClick={() => setIsMobileMenuOpen(false)} className="text-white/80 hover:text-white">
                    <X className="w-6 h-6" />
                 </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-2">
                 <button onClick={() => { onNavigate('LANDING_PAGE'); setIsMobileMenuOpen(false); }} className="w-full text-left text-white font-bold py-3 px-2 rounded hover:bg-white/10 flex items-center gap-3">
                    <Home className="w-5 h-5" /> Início
                 </button>

                 <button onClick={() => { onNavigate('DASHBOARD'); setIsMobileMenuOpen(false); }} className="w-full text-left text-white font-bold py-3 px-2 rounded hover:bg-white/10 flex items-center gap-3">
                    <LayoutDashboard className="w-5 h-5" /> Visão Geral
                 </button>

                 <button onClick={() => { onNavigate('ALL_BENEFITS'); setIsMobileMenuOpen(false); }} className="w-full text-left text-white font-bold py-3 px-2 rounded hover:bg-white/10 flex items-center gap-3">
                    <LayoutGrid className="w-5 h-5" /> Todos os Benefícios
                 </button>
                 
                 <div className="pt-4 pb-2 text-xs text-blue-300 font-bold uppercase tracking-widest border-b border-white/10 mb-2">
                    Principais Benefícios
                 </div>

                 {/* Mobile Sorted A-Z */}
                 <button onClick={() => handleOpenBenefit('juridico-01')} className="w-full text-left text-white/90 py-3 px-2 rounded hover:bg-white/10 flex items-center gap-3 text-sm overflow-hidden">
                    <Gavel className="w-5 h-5 shrink-0" /> <span className="truncate">Assessoria Jurídica</span>
                 </button>

                 <button onClick={() => handleOpenBenefit('highlight-events-reg')} className="w-full text-left text-white/90 py-3 px-2 rounded hover:bg-white/10 flex items-center gap-3 text-sm overflow-hidden">
                    <FileText className="w-5 h-5 shrink-0" /> <span className="truncate">Cadastro de Grandes Eventos</span>
                 </button>

                 <button onClick={handleOpenCalendar} className="w-full text-left text-yellow-300 font-bold py-3 px-2 rounded hover:bg-white/10 flex items-center gap-3 text-sm overflow-hidden">
                    <Sparkles className="w-5 h-5 shrink-0" /> <span className="truncate">Calendário de Eventos</span>
                 </button>

                 <button onClick={() => handleOpenBenefit('planejador-feriados-2026')} className="w-full text-left text-white/90 py-3 px-2 rounded hover:bg-white/10 flex items-center gap-3 text-sm overflow-hidden">
                    <Calendar className="w-5 h-5 shrink-0" /> <span className="truncate">Calendário de Feriados 2026</span>
                 </button>

                 <button onClick={() => { onNavigate('COURSES_V2'); setIsMobileMenuOpen(false); }} className="w-full text-left text-white/90 py-3 px-2 rounded hover:bg-white/10 flex items-center gap-3 text-sm overflow-hidden">
                    <MonitorPlay className="w-5 h-5 shrink-0" /> <span className="truncate">Cursos & Treinamentos</span>
                 </button>

                 <button onClick={() => handleOpenBenefit('public-order-01')} className="w-full text-left text-white/90 py-3 px-2 rounded hover:bg-white/10 flex items-center gap-3 text-sm overflow-hidden">
                    <Megaphone className="w-5 h-5 shrink-0" /> <span className="truncate">Demandas de Ordem Pública</span>
                 </button>

                 <button onClick={() => handleOpenBenefit('portal-fornecedores-new')} className="w-full text-left text-white/90 py-3 px-2 rounded hover:bg-white/10 flex items-center gap-3 text-sm overflow-hidden">
                    <Briefcase className="w-5 h-5 shrink-0" /> <span className="truncate">Fornecedores Hotelaria</span>
                 </button>

                 <button onClick={() => { onNavigate('ROCK_IN_RIO'); setIsMobileMenuOpen(false); }} className="w-full text-left text-white/90 py-3 px-2 rounded hover:bg-white/10 flex items-center gap-3 text-sm overflow-hidden">
                    <Music className="w-5 h-5 shrink-0" /> <span className="truncate">Rock in Rio 2026</span>
                 </button>

                 <div className="pt-4 pb-2 text-xs text-blue-300 font-bold uppercase tracking-widest border-b border-white/10 mb-2">
                    Conexão
                 </div>

                 <button onClick={() => { onNavigate('WHATSAPP_GROUPS'); setIsMobileMenuOpen(false); }} className="w-full text-left text-white/90 py-3 px-2 rounded hover:bg-white/10 flex items-center gap-3 text-sm">
                    <MessageCircle className="w-5 h-5" /> WhatsApp
                 </button>

                 <button onClick={() => { onNavigate('CONTACTS'); setIsMobileMenuOpen(false); }} className="w-full text-left text-white/90 py-3 px-2 rounded hover:bg-white/10 flex items-center gap-3 text-sm">
                    <Users className="w-5 h-5" /> Contatos
                 </button>
                 
                 <button onClick={onLogout} className="w-full text-left text-red-300 font-bold py-3 px-2 rounded hover:bg-white/10 flex items-center gap-3 mt-4 border-t border-white/10 pt-4">
                    <LogOut className="w-5 h-5" /> Sair
                 </button>
              </div>
           </div>
        </div>
      )}

    </div>
  );
};

export default Layout;

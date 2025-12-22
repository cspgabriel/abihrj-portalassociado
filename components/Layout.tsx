
import React, { useState } from 'react';
import { User, Benefit, BenefitCategory, HotelSector } from '../types';
import { 
  Home, Users, MessageCircle, LogOut, Menu, X, Search, 
  LayoutDashboard, Calculator, Shield, Briefcase, Wrench, 
  GraduationCap, Calendar, PieChart, Headphones, Settings,
  ChevronRight, ChevronDown, Bell, UserCircle, ExternalLink, Sparkles, LayoutGrid, Building2, Bed, Utensils, ConciergeBell, ArrowRight, MousePointer2, FileText, MonitorPlay, ShieldCheck
} from 'lucide-react';
import { BENEFITS_DATA, SUPER_CATEGORIES, HOTEL_SECTORS } from '../constants';
import * as Icons from 'lucide-react';

// Import AppView type locally
type AppView = 'DASHBOARD' | 'BENEFIT_DETAILS' | 'TUTORIAL' | 'CONTACTS' | 'WHATSAPP_GROUPS' | 'ASSOCIATION_EVENTS' | 'LAWS_REGULATIONS' | 'SECURITY_PAGE' | 'REGISTRATION_UPDATE' | 'FORUM_PAGE' | 'FORUMS_OVERVIEW' | 'ROCK_IN_RIO' | 'CALCULATORS_PAGE' | 'CATEGORY_LISTING' | 'ALL_BENEFITS' | 'SERVICE_VIEWER' | 'CATEGORIZER' | 'COURSES_V2' | 'ADMIN_DASHBOARD';

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
  
  // Accordion States
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [expandedSectors, setExpandedSectors] = useState<string[]>([]); // Default collapsed

  const toggleCategory = (id: string) => {
    setExpandedCategories(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const toggleSector = (id: string) => {
    setExpandedSectors(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

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

  const handleSuperCategoryClick = (categoryId: string) => {
    onNavigate('CATEGORY_LISTING', categoryId);
    setIsMobileMenuOpen(false);
  };

  const renderIcon = (name: string, className: string) => {
      const IconComponent = (Icons as any)[name] || Icons.Circle;
      return <IconComponent className={className} />;
  };

  const isAdmin = user.email === 'marketing@hoteisrio.com.br';

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      
      {/* --- SIDEBAR (Desktop) --- */}
      <aside className="hidden md:flex w-72 flex-col bg-gradient-to-b from-rio-blue to-blue-900 text-white shadow-2xl z-30 shrink-0 h-full border-r border-white/5">
        {/* Logo Area */}
        <div className="p-6 flex items-center justify-center border-b border-white/10 h-20 shrink-0 bg-rio-blue">
           <img 
             src="https://sindhoteisrj.com.br/wp-content/uploads/2020/04/logo-hoteisrio-azul-fundo-transparente-178x171-1.png" 
             alt="HoteisRio" 
             className="h-12 w-auto cursor-pointer hover:opacity-80 transition-opacity brightness-0 invert"
             onClick={() => onNavigate('DASHBOARD')}
           />
        </div>

        {/* Scrollable Navigation */}
        <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
            
            {/* PRINCIPAL SECTION */}
            <div className="mb-6 px-1">
                <button 
                onClick={() => onNavigate('DASHBOARD')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group mb-1
                    ${currentView === 'DASHBOARD'
                    ? 'bg-white text-rio-blue font-bold shadow-lg' 
                    : 'text-white/80 hover:bg-white/10 hover:text-white'}
                `}
                >
                <LayoutDashboard className="w-5 h-5" />
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
                <LayoutGrid className="w-5 h-5" />
                Todos os Benefícios
                </button>

                {isAdmin && (
                    <button 
                    onClick={() => onNavigate('ADMIN_DASHBOARD')}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group mt-2 border border-yellow-500/30 bg-yellow-500/10
                        ${currentView === 'ADMIN_DASHBOARD' 
                        ? 'bg-yellow-500 text-black font-bold shadow-lg' 
                        : 'text-yellow-400 hover:bg-yellow-500/20 hover:text-white'}
                    `}
                    >
                    <ShieldCheck className="w-5 h-5" />
                    Painel Admin
                    </button>
                )}
            </div>

            <div className="w-full h-px bg-white/10 my-4 mx-2 w-[calc(100%-16px)]" />

            {/* SECTORS ACCORDION (MAIN NAV) */}
            <div className="mb-6">
                <div className="text-[10px] font-bold text-blue-200 uppercase tracking-widest px-4 mb-3">
                    Por Departamento
                </div>
                
                {HOTEL_SECTORS.map(sector => {
                    const isExpanded = expandedSectors.includes(sector.id);
                    // Find benefits for this sector
                    const sectorBenefits = BENEFITS_DATA.filter(b => b.targetSectors?.includes(sector.id as HotelSector));
                    
                    if (sectorBenefits.length === 0) return null;

                    return (
                        <div key={sector.id} className="mb-1">
                            <button 
                                onClick={() => toggleSector(sector.id)}
                                className={`w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg text-sm transition-all group hover:bg-white/5
                                    ${isExpanded ? 'text-white bg-white/5' : 'text-white/70'}
                                `}
                            >
                                <div className="flex items-center gap-3 font-medium">
                                    {renderIcon(sector.iconName, `w-4 h-4 ${isExpanded ? 'text-rio-gold' : 'text-white/60'}`)}
                                    {sector.label}
                                </div>
                                <ChevronRight className={`w-3 h-3 transition-transform duration-200 ${isExpanded ? 'rotate-90 text-white' : 'text-white/30'}`} />
                            </button>

                            {/* Submenu Items */}
                            {isExpanded && (
                                <div className="mt-1 ml-4 border-l border-white/10 pl-2 space-y-0.5 animate-slide-down origin-top">
                                    {sectorBenefits.slice(0, 6).map(b => (
                                        <button
                                            key={b.id}
                                            onClick={() => onBenefitClick && onBenefitClick(b)}
                                            className="w-full text-left px-3 py-2 text-xs text-blue-100/70 hover:text-white hover:bg-white/5 rounded-md transition-colors flex items-center gap-2 group/item"
                                            title={b.title}
                                        >
                                            <span className="w-1 h-1 rounded-full bg-white/30 group-hover/item:bg-rio-gold transition-colors"></span>
                                            <span className="truncate">{b.title}</span>
                                        </button>
                                    ))}
                                    {sectorBenefits.length > 0 && (
                                        <button 
                                            onClick={() => { if(onSectorSelect) onSectorSelect(sector.id as HotelSector); onNavigate('ALL_BENEFITS'); }}
                                            className="w-full text-left px-3 py-2 text-[10px] uppercase font-bold text-rio-gold hover:underline pl-6"
                                        >
                                            Ver todos os benefícios
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>

            <div className="w-full h-px bg-white/10 my-4 mx-2 w-[calc(100%-16px)]" />

            {/* SUPER CATEGORIES (SECONDARY NAV) */}
            <div className="mb-4">
                <div className="text-[10px] font-bold text-blue-200 uppercase tracking-widest px-4 mb-3">
                    Categorias
                </div>
                
                {SUPER_CATEGORIES.map(cat => {
                    const isExpanded = expandedCategories.includes(cat.id);
                    return (
                        <div key={cat.id} className="mb-1">
                            <button 
                                onClick={() => toggleCategory(cat.id)}
                                className={`w-full flex items-center justify-between gap-3 px-3 py-2 rounded-lg text-sm transition-all group hover:bg-white/5
                                    ${isExpanded ? 'text-white' : 'text-white/60'}
                                `}
                            >
                                <div className="flex items-center gap-3">
                                    {renderIcon(cat.iconName, "w-4 h-4 opacity-70")}
                                    {cat.title}
                                </div>
                                <ChevronRight className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                            </button>

                            {isExpanded && (
                                <div className="pl-9 mt-1 mb-2 animate-fade-in">
                                    <button 
                                        onClick={() => handleSuperCategoryClick(cat.id)}
                                        className="text-xs text-blue-300 hover:text-white hover:underline flex items-center gap-1"
                                    >
                                        Abrir página da categoria <ArrowRight className="w-3 h-3" />
                                    </button>
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>

            <div className="w-full h-px bg-white/10 my-4 mx-2 w-[calc(100%-16px)]" />

            {/* COMUNIDADE */}
            <div className="px-1">
                <div className="text-[10px] font-bold text-blue-200 uppercase tracking-widest px-3 mb-3">
                    Links Úteis
                </div>

                <button 
                    onClick={() => {
                        const calendar = BENEFITS_DATA.find(b => b.id === 'calendar-2026');
                        if (calendar && onBenefitClick) {
                            onBenefitClick(calendar);
                        }
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-yellow-300 hover:bg-white/10 hover:text-white transition-all font-semibold group text-sm"
                >
                    <Sparkles className="w-4 h-4 group-hover:animate-pulse" />
                    Calendário 2026
                </button>

                <button 
                    onClick={() => onNavigate('COURSES_V2')} 
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-all text-sm group"
                >
                    <MonitorPlay className="w-4 h-4 group-hover:text-rio-gold" />
                    Cursos 2.0 (Beta)
                </button>

                <button onClick={() => onNavigate('CALCULATORS_PAGE')} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-all text-sm group">
                    <Calculator className="w-4 h-4 group-hover:text-green-400" />
                    Calculadoras Hoteleiras
                </button>

                <button onClick={() => onNavigate('CATEGORIZER')} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-all text-sm">
                    <FileText className="w-4 h-4" />
                    Gerador de Relatórios
                </button>

                <button onClick={() => onNavigate('WHATSAPP_GROUPS')} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-all text-sm">
                    <MessageCircle className="w-4 h-4" />
                    Grupos WhatsApp
                </button>
                <button onClick={() => onNavigate('CONTACTS')} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-all text-sm">
                    <Users className="w-4 h-4" />
                    Equipe & Contatos
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
        <header className="h-16 bg-white border-b border-gray-200 shadow-sm shrink-0 flex items-center justify-between px-4 lg:px-8 z-20">
            
            {/* Mobile Menu Toggle */}
            <div className="flex items-center gap-4 md:hidden">
               <button onClick={() => setIsMobileMenuOpen(true)} className="text-gray-600 hover:text-rio-blue">
                  <Menu className="w-6 h-6" />
               </button>
               <img 
                 src="https://sindhoteisrj.com.br/wp-content/uploads/2020/04/logo-hoteisrio-azul-fundo-transparente-178x171-1.png" 
                 alt="HoteisRio" 
                 className="h-10 w-auto"
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
            <div className="flex items-center gap-4">
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
                    <p className="text-xs text-gray-500 mt-1 uppercase tracking-wide">{user.hotel}</p>
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
                   src="https://sindhoteisrj.com.br/wp-content/uploads/2020/04/logo-hoteisrio-azul-fundo-transparente-178x171-1.png" 
                   alt="HoteisRio" 
                   className="h-10 w-auto brightness-0 invert"
                 />
                 <button onClick={() => setIsMobileMenuOpen(false)} className="text-white/80 hover:text-white">
                    <X className="w-6 h-6" />
                 </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-2">
                 <button onClick={() => { onNavigate('DASHBOARD'); setIsMobileMenuOpen(false); }} className="w-full text-left text-white font-bold py-3 px-2 rounded hover:bg-white/10 flex items-center gap-3">
                    <LayoutDashboard className="w-5 h-5" /> Início
                 </button>

                 <button onClick={() => { onNavigate('ALL_BENEFITS'); setIsMobileMenuOpen(false); }} className="w-full text-left text-white font-bold py-3 px-2 rounded hover:bg-white/10 flex items-center gap-3">
                    <LayoutGrid className="w-5 h-5" /> Todos os Benefícios
                 </button>
                 
                 <div className="pt-4 pb-2 text-xs text-blue-300 font-bold uppercase tracking-widest border-b border-white/10 mb-2">Departamentos</div>
                 
                 {HOTEL_SECTORS.map(s => (
                    <button key={s.id} onClick={() => { if(onSectorSelect) onSectorSelect(s.id as HotelSector); onNavigate('ALL_BENEFITS'); setIsMobileMenuOpen(false); }} className="w-full text-left text-white/90 text-sm py-3 px-2 rounded hover:bg-white/10 flex items-center gap-3">
                        {renderIcon(s.iconName, "w-4 h-4 opacity-70")} {s.label}
                    </button>
                 ))}

                 <div className="pt-6 pb-2 text-xs text-blue-300 font-bold uppercase tracking-widest border-b border-white/10 mb-2">Links Rápidos</div>

                 <button 
                    onClick={() => {
                        const calendar = BENEFITS_DATA.find(b => b.id === 'calendar-2026');
                        if (calendar && onBenefitClick) {
                            onBenefitClick(calendar);
                            setIsMobileMenuOpen(false);
                        }
                    }}
                    className="w-full text-left text-yellow-300 font-bold py-3 px-2 rounded hover:bg-white/10 flex items-center gap-3"
                 >
                    <Sparkles className="w-5 h-5" /> Calendário 2026
                 </button>

                 <button onClick={() => { onNavigate('COURSES_V2'); setIsMobileMenuOpen(false); }} className="w-full text-left text-white/90 font-bold py-3 px-2 rounded hover:bg-white/10 flex items-center gap-3">
                    <MonitorPlay className="w-5 h-5" /> Cursos 2.0 (Beta)
                 </button>

                 <button onClick={() => { onNavigate('CALCULATORS_PAGE'); setIsMobileMenuOpen(false); }} className="w-full text-left text-white/90 font-bold py-3 px-2 rounded hover:bg-white/10 flex items-center gap-3">
                    <Calculator className="w-5 h-5" /> Calculadoras Hoteleiras
                 </button>

                 <button onClick={() => { onNavigate('CATEGORIZER'); setIsMobileMenuOpen(false); }} className="w-full text-left text-white/90 font-bold py-3 px-2 rounded hover:bg-white/10 flex items-center gap-3">
                    <FileText className="w-5 h-5" /> Ferramenta de Relatórios
                 </button>

                 {isAdmin && (
                    <button onClick={() => { onNavigate('ADMIN_DASHBOARD'); setIsMobileMenuOpen(false); }} className="w-full text-left text-yellow-400 font-bold py-3 px-2 rounded hover:bg-white/10 flex items-center gap-3">
                        <ShieldCheck className="w-5 h-5" /> Painel Admin
                    </button>
                 )}
                 
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


// Autor: Gabriel Salles
// Suporte do SO: Windows11
// Descrição: Layout principal com Sidebar e Topbar

import React, { useState, useEffect } from 'react';
import { User, Benefit } from '../types';
import { 
  Menu, X, LogOut, User as UserIcon, Bell, 
  Home, LayoutGrid, ArrowLeft, Search
} from 'lucide-react';
import * as LucideIcons from 'lucide-react';
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

                {/* Removed: 'Como Funciona' tutorial per request */}

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
                    Todos os Benefícios
                </div>
                
                {[...BENEFITS_DATA,
                  { id: 'ROCK_IN_RIO', title: 'Rock in Rio 2026', iconName: 'Music', specialNav: 'ROCK_IN_RIO' },
                  { id: 'SECURITY_PAGE', title: 'Órgãos de Segurança', iconName: 'Shield', specialNav: 'SECURITY_PAGE' },
                  { id: 'WHATSAPP_GROUPS', title: 'Grupos WhatsApp', iconName: 'MessageCircle', specialNav: 'WHATSAPP_GROUPS' },
                  { id: 'CONTACTS', title: 'Equipe & Contatos', iconName: 'Phone', specialNav: 'CONTACTS' }
                ]
                  .sort((a, b) => a.title.localeCompare(b.title))
                  .map(benefit => {
                    // Type assertion to quiet TS
                    const b = benefit as any;
                    const IconComponent = (LucideIcons as any)[b.iconName || 'FileText'] || LucideIcons.FileText;
                    
                    const handleClick = () => {
                      if (b.specialNav) {
                        onNavigate(b.specialNav);
                      } else {
                        handleOpenBenefit(b.id);
                      }
                      setIsMobileMenuOpen(false);
                    };

                    const isActive = currentView === b.specialNav || currentView === b.id;

                    return (
                        <button 
                            key={b.id} 
                            onClick={handleClick} 
                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all overflow-hidden ${isActive ? 'bg-white/10 text-white font-bold' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}
                        >
                            <IconComponent className="w-4 h-4 shrink-0" /> 
                            <span className="truncate">{b.title}</span>
                        </button>
                    )
                  })
                }
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
        {!isFullPage && (
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
        )}

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
                    <Breadcrumb currentView={currentView} />

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
                        {/* 'Como Funciona' removed from header */}

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

                {/* 'Como Funciona' / tutorial removed per request */}

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

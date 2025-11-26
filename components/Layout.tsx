import React, { useState } from 'react';
import { User, Benefit } from '../types';
import { Menu, X, LogOut, Bell, Search, User as UserIcon, HelpCircle, Users, Calendar, MessageCircle, Home, ChevronDown } from 'lucide-react';
import MegaMenu from './MegaMenu';
import Footer from './Footer';

// Import AppView type locally or accept string to avoid circular dependency issues if strict
type AppView = 'DASHBOARD' | 'BENEFIT_DETAILS' | 'TUTORIAL' | 'CONTACTS' | 'WHATSAPP_GROUPS' | 'ASSOCIATION_EVENTS' | 'LAWS_REGULATIONS';

interface LayoutProps {
  children: React.ReactNode;
  user: User;
  onLogout: () => void;
  onNavigate: (view: AppView) => void;
  onBenefitClick?: (benefit: Benefit) => void;
  currentView?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, user, onLogout, onNavigate, onBenefitClick, currentView }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

  const handleNavClick = (view: AppView) => {
    onNavigate(view);
    setIsMobileMenuOpen(false);
    setIsMegaMenuOpen(false);
  };

  const navItems = [
    { label: 'Início', view: 'DASHBOARD' as AppView, icon: Home },
    { label: 'Equipe', view: 'CONTACTS' as AppView, icon: Users },
    { label: 'Grupos', view: 'WHATSAPP_GROUPS' as AppView, icon: MessageCircle },
    { label: 'Agenda', view: 'ASSOCIATION_EVENTS' as AppView, icon: Calendar },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Navbar */}
      <nav className="bg-rio-blue text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            
            {/* Logo & Desktop Nav */}
            <div className="flex items-center">
              <div 
                className="flex-shrink-0 flex items-center gap-2 cursor-pointer hover:opacity-90 transition-opacity" 
                onClick={() => handleNavClick('DASHBOARD')}
              >
                <img 
                  src="https://sindhoteisrj.com.br/wp-content/uploads/2023/04/Logo-HoteisRIO-Branca-Fundo-Transparente.png" 
                  alt="HoteisRio" 
                  className="h-10 w-auto"
                />
              </div>
              
              {/* Desktop Menu Links */}
              <div className="hidden md:ml-8 md:flex md:items-center md:space-x-1">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleNavClick(item.view)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2
                      ${currentView === item.view 
                        ? 'bg-blue-800 text-white border-b-2 border-rio-gold' 
                        : 'text-blue-100 hover:bg-blue-700 hover:text-white'
                      }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </button>
                ))}

                {/* Mega Menu Trigger */}
                <div 
                  className="relative"
                  onMouseEnter={() => setIsMegaMenuOpen(true)}
                  onMouseLeave={() => setIsMegaMenuOpen(false)}
                >
                  <button
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1
                      ${isMegaMenuOpen ? 'bg-blue-800 text-white' : 'text-blue-100 hover:bg-blue-700 hover:text-white'}
                    `}
                    onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                  >
                    Benefícios
                    <ChevronDown className={`w-4 h-4 transition-transform ${isMegaMenuOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {/* Mega Menu Component */}
                  <MegaMenu 
                    isOpen={isMegaMenuOpen} 
                    onClose={() => setIsMegaMenuOpen(false)} 
                    onBenefitClick={(benefit) => {
                      if (onBenefitClick) onBenefitClick(benefit);
                      setIsMegaMenuOpen(false);
                    }}
                  />
                </div>
              </div>
            </div>
            
            {/* Right Side Icons */}
            <div className="hidden md:flex items-center gap-4">
               <div className="relative">
                <input 
                  type="text" 
                  placeholder="Buscar benefício..." 
                  className="bg-blue-800 text-white placeholder-blue-300 rounded-full px-4 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-rio-gold w-64"
                />
                <Search className="absolute right-3 top-1.5 h-4 w-4 text-blue-300" />
               </div>
               
               <button 
                 onClick={() => handleNavClick('TUTORIAL')}
                 className="flex items-center gap-1.5 text-blue-200 hover:text-white px-3 py-1.5 rounded-full hover:bg-blue-700 transition text-sm font-medium"
                 title="Como usar a plataforma"
               >
                 <HelpCircle className="w-4 h-4" />
                 Ajuda
               </button>

               <button className="p-1 rounded-full text-gray-200 hover:text-white hover:bg-blue-700 transition">
                 <Bell className="h-6 w-6" />
               </button>
               
               <div className="flex items-center gap-3 pl-4 border-l border-blue-700">
                  <div className="text-right">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs text-blue-200 mt-0.5">{user.hotel}</p>
                  </div>
                  <button onClick={onLogout} className="text-blue-200 hover:text-white" title="Sair">
                    <LogOut className="h-5 w-5" />
                  </button>
               </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-blue-200 hover:text-white hover:bg-blue-700 focus:outline-none"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-blue-800 animate-fade-in">
            <div className="pt-2 pb-3 space-y-1 px-4">
              {/* User Info Mobile */}
              <div className="flex items-center gap-3 pb-3 border-b border-blue-700 mb-3">
                 <div className="bg-blue-600 p-2 rounded-full">
                    <UserIcon className="h-5 w-5" />
                 </div>
                 <div>
                    <p className="text-white font-medium">{user.name}</p>
                    <p className="text-blue-300 text-xs">{user.hotel}</p>
                 </div>
              </div>

              {/* Mobile Navigation Links */}
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.view)}
                  className="w-full text-left flex items-center gap-3 px-3 py-3 rounded-md text-base font-medium text-blue-100 hover:text-white hover:bg-blue-700"
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </button>
              ))}

              <button 
                onClick={() => handleNavClick('TUTORIAL')} 
                className="w-full text-left flex items-center gap-3 px-3 py-3 rounded-md text-base font-medium text-blue-100 hover:text-white hover:bg-blue-700"
              >
                 <HelpCircle className="w-5 h-5" />
                 Tutorial / Ajuda
              </button>
              
              <button onClick={onLogout} className="w-full text-left flex items-center gap-3 px-3 py-3 rounded-md text-base font-medium text-red-300 hover:text-red-100 hover:bg-blue-700 mt-2 border-t border-blue-700">
                <LogOut className="w-5 h-5" />
                Sair
              </button>
            </div>
          </div>
        )}
      </nav>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* New Elegant Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
import React, { useState } from 'react';
import { User } from '../types';
import { Menu, X, LogOut, Hotel, Bell, Search, User as UserIcon } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  user: User;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, user, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <nav className="bg-rio-blue text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center gap-2">
                <Hotel className="h-8 w-8 text-rio-gold" />
                <span className="font-bold text-xl tracking-tight">HoteisRio</span>
              </div>
              <div className="hidden md:ml-8 md:flex md:space-x-8">
                <a href="#" className="border-b-2 border-rio-gold text-white px-1 pt-1 text-sm font-medium">
                  Portal do Associado
                </a>
                <a href="#" className="border-b-2 border-transparent hover:border-gray-300 text-gray-200 px-1 pt-1 text-sm font-medium transition-colors">
                  Notícias
                </a>
                <a href="#" className="border-b-2 border-transparent hover:border-gray-300 text-gray-200 px-1 pt-1 text-sm font-medium transition-colors">
                  Agenda
                </a>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-4">
               <div className="relative">
                <input 
                  type="text" 
                  placeholder="Buscar benefício..." 
                  className="bg-blue-800 text-white placeholder-blue-300 rounded-full px-4 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-rio-gold w-64"
                />
                <Search className="absolute right-3 top-1.5 h-4 w-4 text-blue-300" />
               </div>
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
          <div className="md:hidden bg-blue-800">
            <div className="pt-2 pb-3 space-y-1 px-4">
              <div className="flex items-center gap-3 pb-3 border-b border-blue-700 mb-3">
                 <div className="bg-blue-600 p-2 rounded-full">
                    <UserIcon className="h-5 w-5" />
                 </div>
                 <div>
                    <p className="text-white font-medium">{user.name}</p>
                    <p className="text-blue-300 text-xs">{user.hotel}</p>
                 </div>
              </div>
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-white bg-blue-900">Portal</a>
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-blue-200 hover:text-white hover:bg-blue-700">Notícias</a>
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-blue-200 hover:text-white hover:bg-blue-700">Agenda</a>
              <button onClick={onLogout} className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-300 hover:text-red-100 hover:bg-blue-700 mt-4">
                Sair
              </button>
            </div>
          </div>
        )}
      </nav>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <footer className="bg-white border-t border-gray-200 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} HoteisRio - Associação de Hotéis do Rio de Janeiro.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
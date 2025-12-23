// Autor: Gabriel Salles
// Suporte do SO: Windows11
// Descrição: Componente principal da aplicação

import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import ModernDashboard from './components/ModernDashboard';
import AllBenefitsPage from './components/AllBenefitsPage';
import BenefitPage from './components/BenefitPage';
import BenefitModal from './components/BenefitModal';
import ServiceRequestModal from './components/ServiceRequestModal';
import CalendarModal from './components/CalendarModal';
import CalculatorModal from './components/CalculatorModal';
import AiAssistant from './components/AiAssistant';
import ContactsPage from './components/ContactsPage';
import WhatsAppGroupsPage from './components/WhatsAppGroupsPage';
import AssociationEventsPage from './components/AssociationEventsPage';
import LawsRegulationPage from './components/LawsRegulationPage';
import SecurityPage from './components/SecurityPage';
import RegistrationUpdatePage from './components/RegistrationUpdatePage';
import ForumPage from './components/ForumPage';
import ForumsOverviewPage from './components/ForumsOverviewPage';
import RockInRioPage from './components/RockInRioPage';
import CalculatorsPage from './components/CalculatorsPage';
import CategoryListingPage from './components/CategoryListingPage';
import ServiceViewerPage from './components/ServiceViewerPage';
import BenefitCategorizerPage from './components/BenefitCategorizerPage';
import CoursesPage from './components/CoursesPage';
import AdminDashboard from './components/AdminDashboard';
import PlatformTutorial from './components/PlatformTutorial';
import AppDownloadPage from './components/AppDownloadPage';
import { authService } from './services/authService';
import { User, Benefit, HotelSector, Forum } from './types';
import { LogIn } from 'lucide-react';

type AppView = 'DASHBOARD' | 'BENEFIT_DETAILS' | 'TUTORIAL' | 'CONTACTS' | 'WHATSAPP_GROUPS' | 'ASSOCIATION_EVENTS' | 'LAWS_REGULATIONS' | 'SECURITY_PAGE' | 'REGISTRATION_UPDATE' | 'FORUM_PAGE' | 'FORUMS_OVERVIEW' | 'ROCK_IN_RIO' | 'CALCULATORS_PAGE' | 'CATEGORY_LISTING' | 'ALL_BENEFITS' | 'SERVICE_VIEWER' | 'CATEGORIZER' | 'COURSES_V2' | 'ADMIN_DASHBOARD' | 'APP_DOWNLOAD';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<AppView>('DASHBOARD');
  const [selectedBenefit, setSelectedBenefit] = useState<Benefit | null>(null);
  const [selectedSector, setSelectedSector] = useState<HotelSector | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [selectedForum, setSelectedForum] = useState<Forum | null>(null);
  const [installPrompt, setInstallPrompt] = useState<any>(null);

  // Modal States
  const [showBenefitModal, setShowBenefitModal] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [showCalculatorModal, setShowCalculatorModal] = useState(false);

  // Login Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    // Check for PWA install prompt
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setInstallPrompt(e);
    });

    // Check auth status (mock for now)
    const checkAuth = async () => {
      // Logic to check persistence could go here
      setLoading(false);
    };
    checkAuth();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const result = await authService.login(email, password);
    if (result.success && result.user) {
      setUser(result.user);
    } else {
      setLoginError(result.error || 'Erro ao fazer login');
    }
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    setView('DASHBOARD');
  };

  const handleNavigate = (newView: AppView, params?: any) => {
    setView(newView);
    if (newView === 'CATEGORY_LISTING' && params) {
        setSelectedCategoryId(params);
    }
    if (newView === 'DASHBOARD') {
        setSelectedSector(null);
    }
  };

  const handleUseBenefit = (benefit: Benefit) => {
    if (benefit.id === 'calendar-2026') {
        setShowCalendarModal(true);
        return;
    }
    if (benefit.id.startsWith('calc-')) {
        setSelectedBenefit(benefit);
        setShowCalculatorModal(true);
        return;
    }
    if (benefit.isService && (benefit.id === 'juridico-01' || benefit.id === 'public-order-01')) {
        setSelectedBenefit(benefit);
        setShowServiceModal(true);
        return;
    }
    if (benefit.isService && (benefit.embedUrl || benefit.dashboardUrl)) {
        setSelectedBenefit(benefit);
        setView('SERVICE_VIEWER');
        return;
    }
    if (benefit.externalLink) {
        window.open(benefit.externalLink, '_blank');
        return;
    }
    // Default to modal details
    setSelectedBenefit(benefit);
    setShowBenefitModal(true);
  };

  const handleViewDetails = (benefit: Benefit) => {
      setSelectedBenefit(benefit);
      setView('BENEFIT_DETAILS');
  };

  const handleSectorSelect = (sector: HotelSector) => {
      setSelectedSector(sector);
      setView('ALL_BENEFITS');
  };

  const handleForumClick = (forum: Forum) => {
      setSelectedForum(forum);
      setView('FORUM_PAGE');
  };

  if (loading) {
      return <div className="flex h-screen items-center justify-center bg-gray-50">Carregando...</div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-rio-blue p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md animate-fade-in-up">
           <div className="text-center mb-8">
              <img 
                src="https://sindhoteisrj.com.br/wp-content/uploads/2020/04/logo-hoteisrio-azul-fundo-transparente-178x171-1.png" 
                alt="HoteisRio" 
                className="h-16 mx-auto mb-4"
              />
              <h1 className="text-2xl font-bold text-gray-800">Central do Associado</h1>
              <p className="text-gray-500 text-sm">Acesse benefícios, ferramentas e suporte.</p>
           </div>

           <form onSubmit={handleLogin} className="space-y-4">
              <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">E-mail Corporativo</label>
                 <input 
                   type="email" 
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rio-blue focus:border-rio-blue outline-none transition-all"
                   placeholder="seu@hotel.com.br"
                   required
                 />
              </div>
              <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
                 <input 
                   type="password" 
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rio-blue focus:border-rio-blue outline-none transition-all"
                   placeholder="••••••••"
                   required
                 />
              </div>

              {loginError && (
                 <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-100">
                    {loginError}
                 </div>
              )}

              <button 
                type="submit"
                className="w-full bg-rio-blue hover:bg-blue-800 text-white font-bold py-3 rounded-lg transition-all transform hover:scale-[1.02] shadow-lg flex items-center justify-center gap-2"
              >
                <LogIn className="w-5 h-5" />
                Entrar
              </button>
           </form>

           <div className="mt-6 text-center">
              <p className="text-xs text-gray-400">
                Ainda não tem acesso? <a href="#" className="text-rio-blue hover:underline">Solicite aqui</a>
              </p>
              <p className="text-[10px] text-gray-300 mt-2">v2.0.0 - HoteisRio Tecnologia</p>
           </div>
        </div>
      </div>
    );
  }

  return (
    <Layout 
        user={user} 
        onLogout={handleLogout} 
        onNavigate={handleNavigate}
        onBenefitClick={handleViewDetails}
        onSectorSelect={handleSectorSelect}
        currentView={view}
        isFullPage={view === 'COURSES_V2'}
    >
        {view === 'DASHBOARD' && (
            <ModernDashboard 
                user={user}
                onUseBenefit={handleUseBenefit}
                onViewDetails={handleViewDetails}
            />
        )}

        {view === 'ALL_BENEFITS' && (
            <AllBenefitsPage 
                onBack={() => setView('DASHBOARD')}
                onUse={handleUseBenefit}
                onDetails={handleViewDetails}
                initialSector={selectedSector}
                onClearSector={() => setSelectedSector(null)}
            />
        )}

        {view === 'BENEFIT_DETAILS' && selectedBenefit && (
            <BenefitPage 
                benefit={selectedBenefit}
                onBack={() => setView('DASHBOARD')}
                onUse={handleUseBenefit}
            />
        )}

        {view === 'CATEGORY_LISTING' && selectedCategoryId && (
            <CategoryListingPage 
                categoryId={selectedCategoryId}
                onBack={() => setView('DASHBOARD')}
                onUse={handleUseBenefit}
                onDetails={handleViewDetails}
            />
        )}

        {view === 'SERVICE_VIEWER' && selectedBenefit && (
            <ServiceViewerPage 
                benefit={selectedBenefit}
                onBack={() => setView('DASHBOARD')}
            />
        )}

        {view === 'CONTACTS' && <ContactsPage onBack={() => setView('DASHBOARD')} />}
        {view === 'WHATSAPP_GROUPS' && <WhatsAppGroupsPage onBack={() => setView('DASHBOARD')} />}
        {view === 'ASSOCIATION_EVENTS' && <AssociationEventsPage onBack={() => setView('DASHBOARD')} />}
        {view === 'LAWS_REGULATIONS' && <LawsRegulationPage onBack={() => setView('DASHBOARD')} />}
        {view === 'SECURITY_PAGE' && <SecurityPage onBack={() => setView('DASHBOARD')} onReport={() => {}} />}
        {view === 'REGISTRATION_UPDATE' && <RegistrationUpdatePage onBack={() => setView('DASHBOARD')} />}
        {view === 'FORUMS_OVERVIEW' && <ForumsOverviewPage onBack={() => setView('DASHBOARD')} onForumClick={handleForumClick} />}
        {view === 'FORUM_PAGE' && selectedForum && <ForumPage forum={selectedForum} onBack={() => setView('FORUMS_OVERVIEW')} onRegisterUpdate={() => setView('REGISTRATION_UPDATE')} />}
        {view === 'ROCK_IN_RIO' && <RockInRioPage onBack={() => setView('DASHBOARD')} />}
        {view === 'CALCULATORS_PAGE' && <CalculatorsPage onBack={() => setView('DASHBOARD')} onOpenCalculator={handleUseBenefit} />}
        {view === 'CATEGORIZER' && <BenefitCategorizerPage onBack={() => setView('DASHBOARD')} />}
        {view === 'COURSES_V2' && <CoursesPage onBack={() => setView('DASHBOARD')} />}
        {view === 'ADMIN_DASHBOARD' && <AdminDashboard onBack={() => setView('DASHBOARD')} currentUserEmail={user.email} />}
        {view === 'TUTORIAL' && <PlatformTutorial onBack={() => setView('DASHBOARD')} />}
        {view === 'APP_DOWNLOAD' && <AppDownloadPage onBack={() => setView('DASHBOARD')} installPrompt={installPrompt} />}

        {/* Floating AI Assistant */}
        <AiAssistant />

        {/* Global Modals */}
        {showBenefitModal && (
            <BenefitModal 
                benefit={selectedBenefit} 
                onClose={() => setShowBenefitModal(false)} 
            />
        )}

        {showServiceModal && selectedBenefit && (
            <ServiceRequestModal 
                benefit={selectedBenefit}
                onClose={() => setShowServiceModal(false)}
            />
        )}

        {showCalendarModal && (
            <CalendarModal onClose={() => setShowCalendarModal(false)} />
        )}

        {showCalculatorModal && (
            <CalculatorModal 
                benefit={selectedBenefit || undefined}
                onClose={() => setShowCalculatorModal(false)} 
            />
        )}
    </Layout>
  );
};

export default App;

// --- Fim de App.tsx ---
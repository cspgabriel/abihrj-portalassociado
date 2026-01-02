
// Autor: Gabriel Salles
// Suporte do SO: Windows11
// Descrição: Componente principal da aplicação que gerencia rotas, estado global e autenticação

import React, { useState, useEffect } from 'react';
import { User, Benefit, Forum } from './types';
import { authService } from './services/authService';
import Layout from './components/Layout';
import LandingPage from './components/LandingPage';
import ModernDashboard from './components/ModernDashboard';
import AllBenefitsPage from './components/AllBenefitsPage';
import BenefitPage from './components/BenefitPage';
import ServiceViewerPage from './components/ServiceViewerPage';
import RockInRioPage from './components/RockInRioPage';
import CoursesPage from './components/CoursesPage';
import SecurityPage from './components/SecurityPage';
import RegistrationUpdatePage from './components/RegistrationUpdatePage';
import ForumPage from './components/ForumPage';
import ForumsOverviewPage from './components/ForumsOverviewPage';
import ContactsPage from './components/ContactsPage';
import WhatsAppGroupsPage from './components/WhatsAppGroupsPage';
import AssociationEventsPage from './components/AssociationEventsPage';
import LawsRegulationPage from './components/LawsRegulationPage';
import CategoryListingPage from './components/CategoryListingPage';
import CalculatorsPage from './components/CalculatorsPage';
import BenefitCategorizerPage from './components/BenefitCategorizerPage';
import AdminPanel from './components/AdminPanel';
import AiAssistant from './components/AiAssistant';
import CalendarModal from './components/CalendarModal';
import CalculatorModal from './components/CalculatorModal';
import ServiceRequestModal from './components/ServiceRequestModal';
import InteractiveTutorial from './components/InteractiveTutorial';
import PlatformTutorial from './components/PlatformTutorial';
import MegaMenu from './components/MegaMenu';
import { Loader2, Lock, User as UserIcon } from 'lucide-react';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState('LANDING_PAGE');
  const [selectedBenefit, setSelectedBenefit] = useState<Benefit | null>(null);
  const [selectedForum, setSelectedForum] = useState<Forum | null>(null);
  
  // Modals State
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [showCalculatorModal, setShowCalculatorModal] = useState(false);
  const [showServiceRequestModal, setShowServiceRequestModal] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState(false);

  // Login Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    const unsubscribe = authService.subscribeToAuthChanges((u) => {
      setUser(u);
      setLoading(false);
      if (u && !localStorage.getItem('tutorial_seen')) {
        setShowTutorial(true);
        localStorage.setItem('tutorial_seen', 'true');
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError('');
    try {
      await authService.login(email, password);
    } catch (err: any) {
      setLoginError(err.message || 'Falha no login');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    authService.logout();
    setCurrentView('LANDING_PAGE');
    setUser(null);
  };

  const navigateTo = (view: string) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBenefitClick = (benefit: Benefit) => {
    // --- FORCED INTERNAL NAVIGATION FOR SPECIFIC IDS ---
    const forceInternalIds = [
        'juridico-01', 
        'public-order-01', 
        'calendar-2026', 
        'occupancy-reports',
        'registration-update',
        'leis-decretos-app',
        'planejador-feriados-2026', 
        'portal-fornecedores-new'
    ];

    if (forceInternalIds.includes(benefit.id)) {
        setSelectedBenefit(benefit);
        navigateTo('SERVICE_VIEWER');
        return;
    }

    if (benefit.isService) {
       // Check for general embed/dashboard capability
       if (benefit.embedUrl || benefit.dashboardUrl) {
           setSelectedBenefit(benefit);
           navigateTo('SERVICE_VIEWER');
           return;
       }

       if (benefit.id === 'calendar-01') {
           setShowCalendarModal(true);
           return;
       }
       
       if (benefit.id.startsWith('calc-') || benefit.id === 'calculators-hub') {
           if (benefit.id === 'calculators-hub') {
             navigateTo('CALCULATORS_PAGE');
           } else {
             setSelectedBenefit(benefit);
             setShowCalculatorModal(true);
           }
           return;
       } 
       
       if (benefit.id === 'courses-v2') {
           navigateTo('COURSES_V2');
           return;
       } 
       
       if (benefit.externalLink) {
           window.open(benefit.externalLink, '_blank');
       } else if (benefit.downloadUrl) {
           window.open(benefit.downloadUrl, '_blank');
       }
    } else {
       // View Details Page
       setSelectedBenefit(benefit);
       navigateTo('BENEFIT_DETAILS');
    }
  };

  const handleForumClick = (forum: Forum) => {
    setSelectedForum(forum);
    navigateTo('FORUM_DETAILS');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-rio-blue" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rio-blue to-blue-900 p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md animate-scale-in">
           <div className="text-center mb-8">
             <div className="w-full flex justify-center mb-6">
                <div className="bg-rio-blue p-4 rounded-xl shadow-lg rotate-3 transform hover:rotate-0 transition-all duration-500">
                    <img 
                        src="https://sindhoteisrj.com.br/wp-content/uploads/2023/04/Logo-HoteisRIO-Branca-Fundo-Transparente.png" 
                        alt="HoteisRio" 
                        className="h-12 w-auto brightness-0 invert"
                    />
                </div>
             </div>
             <h1 className="text-2xl font-bold text-gray-800">Portal do Associado</h1>
             <p className="text-gray-500 text-sm mt-2">Acesse sua área exclusiva</p>
           </div>
           
           <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rio-blue focus:border-rio-blue outline-none transition-all"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input 
                    type="password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rio-blue focus:border-rio-blue outline-none transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {loginError && (
                <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg text-center font-medium">
                  {loginError}
                </div>
              )}

              <button 
                type="submit"
                disabled={isLoggingIn}
                className="w-full bg-rio-blue hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                {isLoggingIn && <Loader2 className="w-4 h-4 animate-spin" />}
                {isLoggingIn ? 'Entrando...' : 'Entrar'}
              </button>
           </form>

           <div className="mt-6 flex flex-col items-center gap-3 text-sm">
              <button 
                onClick={() => alert("Um link de redefinição de senha será enviado para seu e-mail.")}
                className="text-gray-500 hover:text-rio-blue transition-colors"
              >
                Esqueci minha senha
              </button>
              <div className="flex items-center gap-1">
                <span className="text-gray-600">Não tem uma conta?</span>
                <button 
                  onClick={() => alert("Entre em contato com o suporte HoteisRio para solicitar seu acesso.")}
                  className="font-bold text-rio-blue hover:underline"
                >
                  Criar conta
                </button>
              </div>
           </div>
           
           <p className="text-center text-xs text-gray-400 mt-6">
             &copy; 2025 HoteisRio. Todos os direitos reservados.
           </p>
        </div>
      </div>
    );
  }

  // --- RENDER CONTENT BASED ON VIEW ---
  const renderContent = () => {
    switch (currentView) {
      case 'LANDING_PAGE':
        return <LandingPage onNavigate={navigateTo} userName={user.name} onBenefitClick={handleBenefitClick} />;
      case 'ALL_BENEFITS':
        return <AllBenefitsPage onBack={() => navigateTo('LANDING_PAGE')} onUse={handleBenefitClick} onDetails={(b) => { setSelectedBenefit(b); navigateTo('BENEFIT_DETAILS'); }} />;
      case 'BENEFIT_DETAILS':
        return selectedBenefit ? <BenefitPage benefit={selectedBenefit} onBack={() => navigateTo('ALL_BENEFITS')} onUse={handleBenefitClick} /> : null;
      case 'SERVICE_VIEWER':
        return selectedBenefit ? <ServiceViewerPage benefit={selectedBenefit} onBack={() => navigateTo('LANDING_PAGE')} /> : null;
      case 'ROCK_IN_RIO':
        return <RockInRioPage onBack={() => navigateTo('LANDING_PAGE')} />;
      case 'COURSES_V2':
        return <CoursesPage onBack={() => navigateTo('LANDING_PAGE')} />;
      case 'SECURITY_PAGE':
        return <SecurityPage onBack={() => navigateTo('LANDING_PAGE')} onReport={() => { const b = { id: 'public-order-01', title: 'Ordem Pública', description: '', category: 'Operacional', iconName: 'AlertTriangle', imageUrl: '', isService: true } as Benefit; setSelectedBenefit(b); navigateTo('SERVICE_VIEWER'); }} />;
      case 'REGISTRATION_UPDATE':
        return <RegistrationUpdatePage onBack={() => navigateTo('LANDING_PAGE')} />;
      case 'FORUMS_OVERVIEW':
        return <ForumsOverviewPage onBack={() => navigateTo('LANDING_PAGE')} onForumClick={handleForumClick} />;
      case 'FORUM_DETAILS':
        return selectedForum ? <ForumPage forum={selectedForum} onBack={() => navigateTo('FORUMS_OVERVIEW')} onRegisterUpdate={() => navigateTo('REGISTRATION_UPDATE')} /> : null;
      case 'CONTACTS':
        return <ContactsPage onBack={() => navigateTo('LANDING_PAGE')} />;
      case 'WHATSAPP_GROUPS':
        return <WhatsAppGroupsPage onBack={() => navigateTo('LANDING_PAGE')} />;
      case 'ASSOCIATION_EVENTS':
        return <AssociationEventsPage onBack={() => navigateTo('LANDING_PAGE')} />;
      case 'LAWS_REGULATION':
        return <LawsRegulationPage onBack={() => navigateTo('LANDING_PAGE')} />;
      case 'CALCULATORS_PAGE':
        return <CalculatorsPage onBack={() => navigateTo('LANDING_PAGE')} onOpenCalculator={(b) => { setSelectedBenefit(b); setShowCalculatorModal(true); }} />;
      case 'BENEFIT_CATEGORIZER':
        return <BenefitCategorizerPage onBack={() => navigateTo('LANDING_PAGE')} />;
      case 'ADMIN_PANEL':
        return <AdminPanel user={user} onBack={() => navigateTo('LANDING_PAGE')} />;
      case 'PLATFORM_TUTORIAL':
        return <PlatformTutorial onBack={() => navigateTo('LANDING_PAGE')} />;
      default:
        // Handle Category Listing Pages
        if (currentView.startsWith('CAT_')) {
            const catId = currentView.replace('CAT_', '');
            return <CategoryListingPage categoryId={catId} onBack={() => navigateTo('LANDING_PAGE')} onUse={handleBenefitClick} onDetails={(b) => { setSelectedBenefit(b); navigateTo('BENEFIT_DETAILS'); }} />;
        }
        return <ModernDashboard user={user} onUseBenefit={handleBenefitClick} onViewDetails={(b) => { setSelectedBenefit(b); navigateTo('BENEFIT_DETAILS'); }} />;
    }
  };

  const isFullPage = ['SERVICE_VIEWER', 'COURSES_V2', 'BENEFIT_CATEGORIZER'].includes(currentView);

  return (
    <>
      <Layout 
        user={user} 
        onLogout={handleLogout} 
        onNavigate={navigateTo} 
        onBenefitClick={handleBenefitClick}
        currentView={currentView}
        isFullPage={isFullPage}
      >
        {renderContent()}
      </Layout>

      {/* GLOBAL MODALS */}
      {showCalendarModal && <CalendarModal onClose={() => setShowCalendarModal(false)} />}
      
      {showCalculatorModal && (
        <CalculatorModal 
            onClose={() => setShowCalculatorModal(false)} 
            benefit={selectedBenefit || undefined}
        />
      )}
      
      {showServiceRequestModal && selectedBenefit && (
        <ServiceRequestModal 
            benefit={selectedBenefit} 
            onClose={() => setShowServiceRequestModal(false)} 
        />
      )}
      
      {showTutorial && <InteractiveTutorial onClose={() => setShowTutorial(false)} />}
      
      <AiAssistant />
      
      <MegaMenu 
         isOpen={showMegaMenu} 
         onClose={() => setShowMegaMenu(false)} 
         onBenefitClick={handleBenefitClick} 
         onForumClick={handleForumClick}
      />
    </>
  );
};

export default App;

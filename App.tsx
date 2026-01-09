
// Autor: Gabriel Salles
// Suporte do SO: Windows11
// Descrição: Componente principal da aplicação

import React, { useState, useEffect } from 'react';
import { User, Benefit, Forum } from './types';
import { authService } from './services/authService';
import { BENEFITS_DATA } from './constants';

// Components
import Layout from './components/Layout';
import LandingPage from './components/LandingPage';
import ModernDashboard from './components/ModernDashboard';
import AllBenefitsPage from './components/AllBenefitsPage';
import BenefitPage from './components/BenefitPage';
import ServiceViewerPage from './components/ServiceViewerPage';
import CategoryListingPage from './components/CategoryListingPage';
import SecurityPage from './components/SecurityPage';
import ForumsOverviewPage from './components/ForumsOverviewPage';
import ForumPage from './components/ForumPage';
import AssociationEventsPage from './components/AssociationEventsPage';
import WhatsAppGroupsPage from './components/WhatsAppGroupsPage';
import ContactsPage from './components/ContactsPage';
import LawsRegulationPage from './components/LawsRegulationPage';
import PlatformTutorial from './components/PlatformTutorial';
import RockInRioPage from './components/RockInRioPage';
import CalculatorsPage from './components/CalculatorsPage';
import RegistrationUpdatePage from './components/RegistrationUpdatePage';
import CoursesPage from './components/CoursesPage';
import BenefitCategorizerPage from './components/BenefitCategorizerPage';
import CommercialActionsPage from './components/CommercialActionsPage';
import AdminPanel from './components/AdminPanel';
import WelcomeOnboarding from './components/WelcomeOnboarding';
import PhotoGalleryPage from './components/PhotoGalleryPage';

// Modals & Widgets
import BenefitModal from './components/BenefitModal';
import CalendarModal from './components/CalendarModal';
import CalculatorModal from './components/CalculatorModal';
import InteractiveTutorial from './components/InteractiveTutorial';
import AiAssistant from './components/AiAssistant';
import Footer from './components/Footer';

import { Loader2, LogIn, Key, Mail, ArrowLeft, CheckCircle } from 'lucide-react';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState('LANDING_PAGE');
  
  const [selectedBenefit, setSelectedBenefit] = useState<Benefit | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedForum, setSelectedForum] = useState<Forum | null>(null);
  const [globalSearchTerm, setGlobalSearchTerm] = useState('');

  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [showCalculatorModal, setShowCalculatorModal] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showBenefitModal, setShowBenefitModal] = useState(false);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [regName, setRegName] = useState('');
  const [regHotel, setRegHotel] = useState('');

  useEffect(() => {
    const safetyTimer = setTimeout(() => {
      if (loading) setLoading(false);
    }, 5000);

    const unsubscribe = authService.subscribeToAuthChanges((u) => {
      setUser(u);
      setLoading(false);
      clearTimeout(safetyTimer);
    });
    
    return () => {
      unsubscribe();
      clearTimeout(safetyTimer);
    };
  }, []);

  const navigateTo = (view: string) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  const handleGlobalSearch = (term: string) => {
    setGlobalSearchTerm(term);
    navigateTo('ALL_BENEFITS');
  };

  const handleLogout = () => {
    authService.logout();
    navigateTo('LANDING_PAGE');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthSuccess('');
    setLoading(true); // Feedback visual imediato

    try {
      let loggedUser: User | null = null;

      if (isForgotPassword) {
        await authService.sendPasswordReset(email);
        setAuthSuccess('E-mail de recuperação enviado com sucesso!');
        setIsForgotPassword(false);
        setLoading(false);
        return;
      } else if (isRegistering) {
         loggedUser = await authService.register(email, password, regName, regHotel, 'Associado');
      } else {
         loggedUser = await authService.login(email, password);
      }

      // Forçar atualização do estado imediatamente após sucesso
      if (loggedUser) {
        setUser(loggedUser);
      }
    } catch (err: any) {
      setAuthError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBenefitClick = (benefit: Benefit) => {
    if (benefit.id === 'highlight-drinks') {
        navigateTo('COURSES_V2');
        return;
    }

    const forceInternalIds = ['juridico-01', 'calendar-2026', 'occupancy-reports', 'registration-update', 'leis-decretos-app', 'planejador-feriados-2026', 'portal-fornecedores-new', 'influencers-hub', 'clipping-service', 'highlight-events-reg', 'sugestao-pauta', 'public-order-01'];

    if (forceInternalIds.includes(benefit.id)) {
        setSelectedBenefit(benefit);
        navigateTo('SERVICE_VIEWER');
        return;
    }

    if (benefit.isService) {
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
           if (benefit.id === 'calculators-hub') navigateTo('CALCULATORS_PAGE');
           else { setSelectedBenefit(benefit); setShowCalculatorModal(true); }
           return;
       } 
       if (benefit.id === 'courses-v2') { navigateTo('COURSES_V2'); return; } 
       if (benefit.id === 'commercial-actions-hub') { navigateTo('COMMERCIAL_ACTIONS_PAGE'); return; }
       
       if (benefit.externalLink) window.open(benefit.externalLink, '_blank');
       else if (benefit.downloadUrl) window.open(benefit.downloadUrl, '_blank');
    } else {
       setSelectedBenefit(benefit);
       navigateTo('BENEFIT_DETAILS');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <Loader2 className="w-10 h-10 animate-spin text-rio-blue mb-4" />
        <p className="text-rio-blue font-medium animate-pulse">Carregando informações...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rio-blue to-blue-900 p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full animate-fade-in-up">
           <div className="text-center mb-8">
              <div className="flex justify-center mb-6">
                <div className="bg-rio-blue p-4 rounded-xl shadow-lg shadow-blue-100">
                    <img src="https://sindhoteisrj.com.br/wp-content/uploads/2023/04/Logo-HoteisRIO-Branca-Fundo-Transparente.png" alt="HoteisRio" className="h-12 w-auto" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-gray-800">
                {isForgotPassword ? 'Recuperar Senha' : 'Portal do Associado'}
              </h1>
              <p className="text-gray-500 text-sm">
                {isForgotPassword ? 'Enviaremos um link de redefinição para seu e-mail.' : 'Acesse sua central de benefícios exclusiva.'}
              </p>
           </div>
           
           <form onSubmit={handleLogin} className="space-y-4">
              {isRegistering && !isForgotPassword && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                    <input type="text" required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rio-blue outline-none" value={regName} onChange={e => setRegName(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Hotel</label>
                    <input type="text" required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rio-blue outline-none" value={regHotel} onChange={e => setRegHotel(e.target.value)} />
                  </div>
                </>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">E-mail Corporativo</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                  <input type="email" required className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-rio-blue outline-none" value={email} onChange={e => setEmail(e.target.value)} placeholder="seu.nome@hotel.com.br" />
                </div>
              </div>
              
              {!isForgotPassword && (
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-sm font-medium text-gray-700">Senha</label>
                    <button 
                      type="button"
                      onClick={() => setIsForgotPassword(true)}
                      className="text-xs text-rio-blue hover:underline font-semibold"
                    >
                      Esqueceu a senha?
                    </button>
                  </div>
                  <div className="relative">
                    <Key className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                    <input type="password" required className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-rio-blue outline-none" value={password} onChange={e => setPassword(e.target.value)} />
                  </div>
                </div>
              )}

              {authError && (
                <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-100 animate-shake">
                  {authError}
                </div>
              )}

              {authSuccess && (
                <div className="bg-green-50 text-green-700 text-sm p-3 rounded-lg border border-green-100 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  {authSuccess}
                </div>
              )}

              <button type="submit" className="w-full bg-rio-blue hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2">
                {isForgotPassword ? <Mail className="w-5 h-5" /> : <LogIn className="w-5 h-5" />}
                {isForgotPassword ? 'Enviar E-mail' : isRegistering ? 'Criar Conta' : 'Entrar'}
              </button>
           </form>
           
           <div className="mt-6 text-center text-sm">
             {isForgotPassword ? (
               <button onClick={() => { setIsForgotPassword(false); setAuthError(''); setAuthSuccess(''); }} className="text-rio-blue hover:underline font-medium flex items-center justify-center gap-1 mx-auto">
                 <ArrowLeft className="w-4 h-4" /> Voltar para o Login
               </button>
             ) : (
               <button onClick={() => { setIsRegistering(!isRegistering); setAuthError(''); setAuthSuccess(''); }} className="text-rio-blue hover:underline font-medium">
                 {isRegistering ? 'Já tenho conta. Fazer Login.' : 'Não tem acesso? Cadastre-se.'}
               </button>
             )}
           </div>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (currentView) {
      case 'LANDING_PAGE': return <LandingPage userName={user.name} onNavigate={navigateTo} onBenefitClick={handleBenefitClick} />;
      case 'WELCOME': return <WelcomeOnboarding onStartTutorial={() => { navigateTo('LANDING_PAGE'); setTimeout(() => setShowTutorial(true), 500); }} onSkip={() => navigateTo('LANDING_PAGE')} />;
      case 'MODERN_DASHBOARD': return <ModernDashboard user={user} onUseBenefit={handleBenefitClick} onViewDetails={(b) => { setSelectedBenefit(b); navigateTo('BENEFIT_DETAILS'); }} />;
      case 'ALL_BENEFITS': return <AllBenefitsPage initialSearchTerm={globalSearchTerm} onBack={() => navigateTo('LANDING_PAGE')} onUse={handleBenefitClick} onDetails={(b) => { setSelectedBenefit(b); navigateTo('BENEFIT_DETAILS'); }} />;
      case 'BENEFIT_DETAILS': return selectedBenefit ? <BenefitPage benefit={selectedBenefit} onBack={() => navigateTo('ALL_BENEFITS')} onUse={handleBenefitClick} /> : <AllBenefitsPage onBack={() => navigateTo('LANDING_PAGE')} onUse={handleBenefitClick} onDetails={(b) => { setSelectedBenefit(b); navigateTo('BENEFIT_DETAILS'); }} />;
      case 'SERVICE_VIEWER': return selectedBenefit ? <ServiceViewerPage benefit={selectedBenefit} onBack={() => navigateTo('ALL_BENEFITS')} /> : <AllBenefitsPage onBack={() => navigateTo('LANDING_PAGE')} onUse={handleBenefitClick} onDetails={(b) => { setSelectedBenefit(b); navigateTo('BENEFIT_DETAILS'); }} />;
      case 'CATEGORY_LISTING': return <CategoryListingPage categoryId={selectedCategory} onBack={() => navigateTo('MODERN_DASHBOARD')} onUse={handleBenefitClick} onDetails={(b) => { setSelectedBenefit(b); navigateTo('BENEFIT_DETAILS'); }} />;
      case 'SECURITY_PAGE': return <SecurityPage onBack={() => navigateTo('LANDING_PAGE')} onReport={() => { const op = BENEFITS_DATA.find(b => b.id === 'public-order-01'); if(op) handleBenefitClick(op); }} />;
      case 'FORUMS_OVERVIEW': return <ForumsOverviewPage onBack={() => navigateTo('LANDING_PAGE')} onForumClick={(f) => { setSelectedForum(f); navigateTo('FORUM_DETAILS'); }} />;
      case 'FORUM_DETAILS': return selectedForum ? <ForumPage forum={selectedForum} onBack={() => navigateTo('FORUMS_OVERVIEW')} onRegisterUpdate={() => navigateTo('REGISTRATION_UPDATE')} /> : <ForumsOverviewPage onBack={() => navigateTo('LANDING_PAGE')} onForumClick={(f) => { setSelectedForum(f); navigateTo('FORUM_DETAILS'); }} />;
      case 'ASSOCIATION_EVENTS': return <AssociationEventsPage onBack={() => navigateTo('LANDING_PAGE')} />;
      case 'WHATSAPP_GROUPS': return <WhatsAppGroupsPage onBack={() => navigateTo('LANDING_PAGE')} />;
      case 'CONTACTS': return <ContactsPage onBack={() => navigateTo('LANDING_PAGE')} />;
      case 'LAWS_REGULATION': return <LawsRegulationPage onBack={() => navigateTo('LANDING_PAGE')} />;
      case 'PLATFORM_TUTORIAL': return <PlatformTutorial onBack={() => navigateTo('LANDING_PAGE')} />;
      case 'ROCK_IN_RIO': return <RockInRioPage onBack={() => navigateTo('LANDING_PAGE')} />;
      case 'CALCULATORS_PAGE': return <CalculatorsPage onBack={() => navigateTo('LANDING_PAGE')} onOpenCalculator={(b) => { setSelectedBenefit(b); setShowCalculatorModal(true); }} />;
      case 'REGISTRATION_UPDATE': return <RegistrationUpdatePage onBack={() => navigateTo('LANDING_PAGE')} />;
      case 'COURSES_V2': return <CoursesPage onBack={() => navigateTo('LANDING_PAGE')} />;
      case 'BENEFIT_CATEGORIZER': return <BenefitCategorizerPage onBack={() => navigateTo('LANDING_PAGE')} />;
      case 'COMMERCIAL_ACTIONS_PAGE': return <CommercialActionsPage onBack={() => navigateTo('LANDING_PAGE')} />;
      case 'ADMIN_PANEL': return <AdminPanel user={user} onBack={() => navigateTo('LANDING_PAGE')} />;
      case 'PHOTO_GALLERY': return <PhotoGalleryPage onBack={() => navigateTo('LANDING_PAGE')} />;
      default: return <LandingPage userName={user.name} onNavigate={navigateTo} onBenefitClick={handleBenefitClick} />;
    }
  };

  return (
    <Layout user={user} onLogout={handleLogout} onNavigate={navigateTo} onSearch={handleGlobalSearch} onBenefitClick={handleBenefitClick} currentView={currentView} isFullPage={['COURSES_V2', 'BENEFIT_CATEGORIZER', 'COMMERCIAL_ACTIONS_PAGE', 'WELCOME', 'PHOTO_GALLERY'].includes(currentView)}>
       {renderContent()}
       <Footer />
       <AiAssistant />
       {showCalendarModal && <CalendarModal onClose={() => setShowCalendarModal(false)} />}
       {showCalculatorModal && <CalculatorModal onClose={() => setShowCalculatorModal(false)} benefit={selectedBenefit || undefined} />}
       {showTutorial && <InteractiveTutorial onClose={() => setShowTutorial(false)} />}
       {showBenefitModal && <BenefitModal benefit={selectedBenefit} onClose={() => setShowBenefitModal(false)} />}
    </Layout>
  );
}

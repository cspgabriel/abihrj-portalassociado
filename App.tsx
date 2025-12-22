
// Autor: Gabriel Salles
// Suporte do SO: Windows11
// Descrição: Componente principal da aplicação

import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import BenefitPage from './components/BenefitPage';
import ServiceRequestModal from './components/ServiceRequestModal';
import CalendarModal from './components/CalendarModal';
import CalculatorModal from './components/CalculatorModal';
import PlatformTutorial from './components/PlatformTutorial';
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
import AllBenefitsPage from './components/AllBenefitsPage';
import ServiceViewerPage from './components/ServiceViewerPage';
import BenefitCategorizerPage from './components/BenefitCategorizerPage';
import CoursesPage from './components/CoursesPage';
import AdminDashboard from './components/AdminDashboard';
import AppDownloadPage from './components/AppDownloadPage';
import AiAssistant from './components/AiAssistant';

import { User, Benefit, Forum, HotelSector } from './types';
import { BENEFITS_DATA, SUPER_CATEGORIES } from './constants';
import { authService } from './services/authService';
import { Loader2, Lock, Mail, ArrowRight, UserPlus, Building2, UserCircle } from 'lucide-react';

type AppView = 'DASHBOARD' | 'BENEFIT_DETAILS' | 'TUTORIAL' | 'CONTACTS' | 'WHATSAPP_GROUPS' | 'ASSOCIATION_EVENTS' | 'LAWS_REGULATIONS' | 'SECURITY_PAGE' | 'REGISTRATION_UPDATE' | 'FORUM_PAGE' | 'FORUMS_OVERVIEW' | 'ROCK_IN_RIO' | 'CALCULATORS_PAGE' | 'CATEGORY_LISTING' | 'ALL_BENEFITS' | 'SERVICE_VIEWER' | 'CATEGORIZER' | 'COURSES_V2' | 'ADMIN_DASHBOARD' | 'APP_DOWNLOAD';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<AppView>('DASHBOARD');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  
  const [regName, setRegName] = useState('');
  const [regHotel, setRegHotel] = useState('');

  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [isSendingReset, setIsSendingReset] = useState(false);
  const [forgotPasswordStatus, setForgotPasswordStatus] = useState<{ type: 'success' | 'error', msg: string } | null>(null);

  const [selectedBenefit, setSelectedBenefit] = useState<Benefit | null>(null);
  const [selectedForum, setSelectedForum] = useState<Forum | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSector, setSelectedSector] = useState<HotelSector | null>(null);
  
  const [modalBenefit, setModalBenefit] = useState<Benefit | null>(null);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [showCalculatorModal, setShowCalculatorModal] = useState(false);
  const [calculatorBenefit, setCalculatorBenefit] = useState<Benefit | undefined>(undefined);

  // Global Install Prompt State
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const checkSession = async () => {
      // Deep Linking Logic
      const params = new URLSearchParams(window.location.search);
      const benefitId = params.get('benefitId');
      
      if (benefitId) {
          const benefit = BENEFITS_DATA.find(b => b.id === benefitId);
          if (benefit) {
              // Pre-select benefit to show after login/load
              setSelectedBenefit(benefit);
              
              // Determine correct view based on benefit type
              if (benefit.embedUrl) {
                  setView('SERVICE_VIEWER');
              } else if (benefit.category === 'Ferramentas & Calculadoras' && !benefit.id.includes('hub')) {
                  setCalculatorBenefit(benefit);
                  setShowCalculatorModal(true);
              } else {
                  setView('BENEFIT_DETAILS');
              }
          }
      }

      setTimeout(() => setLoading(false), 800);
    };
    checkSession();

    // Capture PWA Install Prompt Globally
    const handleBeforeInstallPrompt = (e: any) => {
        e.preventDefault();
        setDeferredPrompt(e);
        console.log("PWA Install Prompt Captured in App Root");
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError('');

    try {
        if (isRegistering) {
            if (!regName || !regHotel) {
                setLoginError('Preencha todos os campos.');
                setIsLoggingIn(false);
                return;
            }
            const result = await authService.register(email, password, regName, regHotel);
            if (result.success && result.user) {
                setUser(result.user);
            } else {
                setLoginError(result.error || 'Erro ao criar conta.');
            }
        } else {
            const result = await authService.login(email, password);
            if (result.success && result.user) {
                setUser(result.user);
            } else {
                setLoginError(result.error || 'Erro ao fazer login');
            }
        }
    } catch (error: any) {
        setLoginError('Ocorreu um erro inesperado.');
    } finally {
        setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    setView('DASHBOARD');
    setEmail('');
    setPassword('');
    // Clean URL params on logout
    window.history.pushState({}, '', window.location.pathname);
  };

  const handleForgotPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotPasswordEmail) return;
    
    setIsSendingReset(true);
    setForgotPasswordStatus(null);

    const result = await authService.sendPasswordReset(forgotPasswordEmail);
    
    if (result.success) {
        setForgotPasswordStatus({ 
            type: 'success', 
            msg: `Solicitação processada. Se o e-mail ${forgotPasswordEmail} tiver uma conta ativa, você receberá o link em instantes. Verifique sua caixa de Spam.` 
        });
        setForgotPasswordEmail('');
    } else {
        setForgotPasswordStatus({ type: 'error', msg: result.error || 'Erro ao enviar e-mail.' });
    }
    
    setIsSendingReset(false);
  };

  const handleNavigate = (newView: AppView, params?: any) => {
     if (params && typeof params === 'string') {
         setSelectedCategory(params);
     } else {
         // Reset category if not navigating to a specific one
         setSelectedCategory('');
     }
     
     // If we are navigating to something other than ALL_BENEFITS via menu, we might want to clear sector
     // But if we come from onSectorSelect, we want to keep it.
     // Layout handles the sequence: onSectorSelect -> onNavigate.
     
     // Clear deep link params when navigating manually
     window.history.pushState({}, '', window.location.pathname);
     
     setView(newView);
     window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUseBenefit = (benefit: Benefit) => {
     if (benefit.id === 'juridico-01' || benefit.id === 'public-order-01') {
         setModalBenefit(benefit);
         setShowServiceModal(true);
         return;
     }
     if (benefit.id === 'cat-nav') {
         const cat = SUPER_CATEGORIES.find(c => c.title === benefit.title);
         if (cat) {
             setSelectedCategory(cat.id);
             setView('CATEGORY_LISTING');
         }
         return;
     }
     if (benefit.id === 'calendar-01' || benefit.id === 'calendar-2-0') {
         setShowCalendarModal(true);
         return;
     }
     if (benefit.category === 'Ferramentas & Calculadoras' || benefit.id.startsWith('calc-') || benefit.id === 'calculators-hub') {
         if (benefit.id === 'calculators-hub') {
            setView('CALCULATORS_PAGE');
         } else {
            setCalculatorBenefit(benefit);
            setShowCalculatorModal(true);
         }
         return;
     }
     if (benefit.id === 'courses-v2') {
         setView('COURSES_V2');
         return;
     }

     if (benefit.embedUrl) {
         setSelectedBenefit(benefit);
         setView('SERVICE_VIEWER');
         return;
     }

     if (benefit.externalLink) {
         window.open(benefit.externalLink, '_blank');
         return;
     }

     setSelectedBenefit(benefit);
     setView('BENEFIT_DETAILS');
  };

  const handleDetailsClick = (benefit: Benefit) => {
     setSelectedBenefit(benefit);
     setView('BENEFIT_DETAILS');
  };

  const handleForumClick = (forum: Forum) => {
     setSelectedForum(forum);
     setView('FORUM_PAGE');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white">
        <Loader2 className="w-10 h-10 animate-spin text-rio-blue mb-4" />
        <p className="animate-pulse">Carregando Central do Associado...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rio-blue to-blue-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col animate-fade-in-up">
            <div className="bg-gray-50 p-8 text-center relative overflow-hidden border-b border-gray-100">
                <img 
                   src="https://sindhoteisrj.com.br/wp-content/uploads/2020/04/logo-hoteisrio-azul-fundo-transparente-178x171-1.png" 
                   alt="HoteisRio" 
                   className="h-16 mx-auto mb-4 object-contain"
                />
                <h2 className="text-gray-800 text-xl font-bold relative z-10">
                    {isRegistering ? 'Criar Nova Conta' : 'Central do Associado'}
                </h2>
                <p className="text-gray-500 text-sm relative z-10">
                    {isRegistering ? 'Preencha os dados abaixo' : 'Faça login para acessar os benefícios'}
                </p>
            </div>

            {!showForgotPassword ? (
                <div className="p-8">
                    <form onSubmit={handleAuthSubmit} className="space-y-4">
                        
                        {isRegistering && (
                            <>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Nome Completo</label>
                                    <div className="relative">
                                        <UserCircle className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                        <input 
                                            type="text" 
                                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rio-blue outline-none transition-all"
                                            placeholder="Seu nome"
                                            value={regName}
                                            onChange={e => setRegName(e.target.value)}
                                            required={isRegistering}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Hotel / Empresa</label>
                                    <div className="relative">
                                        <Building2 className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                        <input 
                                            type="text" 
                                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rio-blue outline-none transition-all"
                                            placeholder="Nome do Hotel"
                                            value={regHotel}
                                            onChange={e => setRegHotel(e.target.value)}
                                            required={isRegistering}
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">E-mail Corporativo</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                <input 
                                    type="email" 
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rio-blue focus:border-rio-blue outline-none transition-all"
                                    placeholder="seu.nome@hotel.com.br"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Senha</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                <input 
                                    type="password" 
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rio-blue focus:border-rio-blue outline-none transition-all"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                    minLength={6}
                                />
                            </div>
                        </div>

                        {loginError && (
                            <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg flex items-center gap-2 border border-red-100">
                                <span className="block w-1.5 h-1.5 bg-red-600 rounded-full"></span>
                                {loginError}
                            </div>
                        )}

                        {!isRegistering && (
                            <div className="flex justify-end">
                                <button 
                                    type="button" 
                                    onClick={() => setShowForgotPassword(true)}
                                    className="text-sm text-rio-blue hover:underline font-medium"
                                >
                                    Esqueceu a senha?
                                </button>
                            </div>
                        )}

                        <button 
                            type="submit" 
                            disabled={isLoggingIn}
                            className="w-full bg-rio-blue hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70 mt-2"
                        >
                            {isLoggingIn ? <Loader2 className="w-5 h-5 animate-spin" /> : (isRegistering ? 'Criar Conta' : 'Entrar')}
                            {!isLoggingIn && !isRegistering && <ArrowRight className="w-5 h-5" />}
                            {!isLoggingIn && isRegistering && <UserPlus className="w-5 h-5" />}
                        </button>
                    </form>

                    <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                        <button 
                            onClick={() => {
                                setIsRegistering(!isRegistering);
                                setLoginError('');
                            }}
                            className="text-sm font-bold text-gray-600 hover:text-rio-blue transition-colors"
                        >
                            {isRegistering ? 'Já tem uma conta? Fazer Login' : 'Não tem conta? Cadastre-se'}
                        </button>
                    </div>
                </div>
            ) : (
                <div className="p-8">
                    <button 
                        onClick={() => { setShowForgotPassword(false); setForgotPasswordStatus(null); }}
                        className="text-gray-500 hover:text-gray-700 text-sm flex items-center gap-1 mb-6"
                    >
                        ← Voltar para Login
                    </button>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Redefinir Senha</h3>
                    <p className="text-sm text-gray-500 mb-6">Digite seu e-mail cadastrado para receber um link de redefinição.</p>

                    <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">E-mail cadastrado</label>
                            <input 
                                type="email" 
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rio-blue outline-none"
                                placeholder="exemplo@hotel.com.br"
                                value={forgotPasswordEmail}
                                onChange={e => setForgotPasswordEmail(e.target.value)}
                                required
                            />
                        </div>

                        {forgotPasswordStatus && (
                            <div className={`text-sm p-3 rounded-lg flex items-start gap-2 ${forgotPasswordStatus.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                <span className="mt-0.5">•</span>
                                {forgotPasswordStatus.msg}
                            </div>
                        )}

                        <button 
                            type="submit" 
                            disabled={isSendingReset}
                            className="w-full bg-rio-blue hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                        >
                            {isSendingReset ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Enviar Link'}
                        </button>
                    </form>
                </div>
            )}
        </div>
      </div>
    );
  }

  const renderContent = () => {
     switch(view) {
        case 'DASHBOARD':
            return (
                <Dashboard 
                    user={user} 
                    onUseBenefit={handleUseBenefit} 
                    onViewDetails={handleDetailsClick}
                />
            );
        case 'ALL_BENEFITS':
            return (
                <AllBenefitsPage 
                    onBack={() => setView('DASHBOARD')}
                    onUse={handleUseBenefit}
                    onDetails={handleDetailsClick}
                    initialSector={selectedSector}
                    onClearSector={() => setSelectedSector(null)}
                />
            );
        case 'BENEFIT_DETAILS':
            return selectedBenefit ? (
                <BenefitPage 
                    benefit={selectedBenefit} 
                    onBack={() => setView('DASHBOARD')} 
                    onUse={handleUseBenefit}
                />
            ) : <Dashboard user={user} onUseBenefit={handleUseBenefit} onViewDetails={handleDetailsClick} />;
        case 'TUTORIAL':
            return <PlatformTutorial onBack={() => setView('DASHBOARD')} />;
        case 'CONTACTS':
            return <ContactsPage onBack={() => setView('DASHBOARD')} />;
        case 'WHATSAPP_GROUPS':
            return <WhatsAppGroupsPage onBack={() => setView('DASHBOARD')} />;
        case 'ASSOCIATION_EVENTS':
            return <AssociationEventsPage onBack={() => setView('DASHBOARD')} />;
        case 'LAWS_REGULATIONS':
            return <LawsRegulationPage onBack={() => setView('DASHBOARD')} />;
        case 'SECURITY_PAGE':
            return <SecurityPage onBack={() => setView('DASHBOARD')} onReport={() => {
                const publicOrder = BENEFITS_DATA.find(b => b.id === 'public-order-01');
                if (publicOrder) handleUseBenefit(publicOrder);
            }} />;
        case 'REGISTRATION_UPDATE':
            return <RegistrationUpdatePage onBack={() => setView('DASHBOARD')} />;
        case 'FORUMS_OVERVIEW':
            return <ForumsOverviewPage onBack={() => setView('DASHBOARD')} onForumClick={handleForumClick} />;
        case 'FORUM_PAGE':
            return selectedForum ? (
                <ForumPage 
                    forum={selectedForum} 
                    onBack={() => setView('FORUMS_OVERVIEW')} 
                    onRegisterUpdate={() => setView('REGISTRATION_UPDATE')} 
                />
            ) : <ForumsOverviewPage onBack={() => setView('DASHBOARD')} onForumClick={handleForumClick} />;
        case 'ROCK_IN_RIO':
            return <RockInRioPage onBack={() => setView('DASHBOARD')} />;
        case 'CALCULATORS_PAGE':
            return (
                <CalculatorsPage 
                    onBack={() => setView('DASHBOARD')} 
                    onOpenCalculator={(b) => {
                        setCalculatorBenefit(b);
                        setShowCalculatorModal(true);
                    }} 
                />
            );
        case 'CATEGORY_LISTING':
            return (
                <CategoryListingPage 
                    categoryId={selectedCategory} 
                    onBack={() => setView('DASHBOARD')} 
                    onUse={handleUseBenefit} 
                    onDetails={handleDetailsClick}
                />
            );
        case 'SERVICE_VIEWER':
            return selectedBenefit ? (
                <ServiceViewerPage benefit={selectedBenefit} onBack={() => setView('DASHBOARD')} />
            ) : <Dashboard user={user} onUseBenefit={handleUseBenefit} onViewDetails={handleDetailsClick} />;
        case 'CATEGORIZER':
            return <BenefitCategorizerPage onBack={() => setView('DASHBOARD')} />;
        case 'COURSES_V2':
            return <CoursesPage onBack={() => setView('DASHBOARD')} />;
        case 'ADMIN_DASHBOARD':
            return <AdminDashboard onBack={() => setView('DASHBOARD')} currentUserEmail={user.email} />;
        case 'APP_DOWNLOAD':
            return <AppDownloadPage onBack={() => setView('DASHBOARD')} installPrompt={deferredPrompt} />;
        default:
            return <Dashboard user={user} onUseBenefit={handleUseBenefit} onViewDetails={handleDetailsClick} />;
     }
  };

  const isFullPageLayout = view === 'SERVICE_VIEWER' || view === 'COURSES_V2';

  return (
    <Layout 
        user={user} 
        onLogout={handleLogout} 
        onNavigate={handleNavigate}
        onBenefitClick={handleDetailsClick}
        currentView={view}
        onSectorSelect={(sector) => setSelectedSector(sector)}
        isFullPage={isFullPageLayout}
    >
        {renderContent()}

        {showServiceModal && modalBenefit && (
            <ServiceRequestModal 
                benefit={modalBenefit} 
                onClose={() => setShowServiceModal(false)} 
            />
        )}
        
        {showCalendarModal && (
            <CalendarModal onClose={() => setShowCalendarModal(false)} />
        )}
        
        {showCalculatorModal && (
            <CalculatorModal 
                benefit={calculatorBenefit} 
                onClose={() => setShowCalculatorModal(false)} 
            />
        )}

        {!isFullPageLayout && <AiAssistant />}
        
    </Layout>
  );
};

export default App;

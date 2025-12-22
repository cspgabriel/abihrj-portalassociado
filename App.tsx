
// Autor: Gabriel Salles
// Suporte do SO: Windows11
// Descrição: Componente principal da aplicação que gerencia rotas, estado global e autenticação

import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import ModernDashboard from './components/ModernDashboard';
import BenefitModal from './components/BenefitModal';
import BenefitPage from './components/BenefitPage';
import AiAssistant from './components/AiAssistant';
import CalendarModal from './components/CalendarModal';
import ServiceRequestModal from './components/ServiceRequestModal';
import PlatformTutorial from './components/PlatformTutorial';
import ContactsPage from './components/ContactsPage';
import WhatsAppGroupsPage from './components/WhatsAppGroupsPage';
import AssociationEventsPage from './components/AssociationEventsPage';
import InteractiveTutorial from './components/InteractiveTutorial';
import LawsRegulationPage from './components/LawsRegulationPage';
import SecurityPage from './components/SecurityPage';
import RegistrationUpdatePage from './components/RegistrationUpdatePage';
import ForumPage from './components/ForumPage';
import ForumsOverviewPage from './components/ForumsOverviewPage';
import RockInRioPage from './components/RockInRioPage';
import CalculatorModal from './components/CalculatorModal';
import CalculatorsPage from './components/CalculatorsPage';
import CategoryListingPage from './components/CategoryListingPage';
import AllBenefitsPage from './components/AllBenefitsPage';
import ServiceViewerPage from './components/ServiceViewerPage';
import BenefitCategorizerPage from './components/BenefitCategorizerPage';
import CoursesPage from './components/CoursesPage';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';

import { authService } from './services/authService';
import { User, Benefit, BenefitCategory, HotelSector, Forum } from './types';
import { BENEFITS_DATA } from './constants';
import { Loader2, LogIn, Mail, Lock, AlertCircle, KeyRound, X, CheckCircle2, UserPlus, Building2, UserCircle } from 'lucide-react';

type AppView = 'DASHBOARD' | 'BENEFIT_DETAILS' | 'TUTORIAL' | 'CONTACTS' | 'WHATSAPP_GROUPS' | 'ASSOCIATION_EVENTS' | 'LAWS_REGULATIONS' | 'SECURITY_PAGE' | 'REGISTRATION_UPDATE' | 'FORUM_PAGE' | 'FORUMS_OVERVIEW' | 'ROCK_IN_RIO' | 'CALCULATORS_PAGE' | 'CATEGORY_LISTING' | 'ALL_BENEFITS' | 'SERVICE_VIEWER' | 'CATEGORIZER' | 'COURSES_V2' | 'ADMIN_DASHBOARD';

const App: React.FC = () => {
  // Auth State
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Login Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Registration Form State
  const [isRegistering, setIsRegistering] = useState(false);
  const [regName, setRegName] = useState('');
  const [regHotel, setRegHotel] = useState('');

  // Forgot Password State
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [forgotPasswordStatus, setForgotPasswordStatus] = useState<{type: 'success' | 'error', msg: string} | null>(null);
  const [isSendingReset, setIsSendingReset] = useState(false);

  // Navigation State
  const [currentView, setCurrentView] = useState<AppView>('DASHBOARD');
  
  // Selection State for Pages
  const [selectedBenefitForDetails, setSelectedBenefitForDetails] = useState<Benefit | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
  const [selectedForum, setSelectedForum] = useState<Forum | null>(null);
  const [viewerBenefit, setViewerBenefit] = useState<Benefit | null>(null);

  // Modal State
  const [selectedBenefit, setSelectedBenefit] = useState<Benefit | null>(null); // For Quick View Modal
  const [calculatorBenefit, setCalculatorBenefit] = useState<Benefit | null>(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [serviceRequestBenefit, setServiceRequestBenefit] = useState<Benefit | null>(null);
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = authService.subscribeToAuthChanges((u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // URL Parameter Check for Special Views (Deep Linking)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const viewParam = params.get('view');
    const benefitIdParam = params.get('benefitId');
    const courseIdParam = params.get('courseId');
    
    // Support both "categorizer" and "categorize"
    if (viewParam === 'categorizer' || viewParam === 'categorize') {
       setCurrentView('CATEGORIZER');
    }
    // Support deep link to courses
    else if (viewParam === 'courses-v2' || viewParam === 'courses' || courseIdParam) {
       setCurrentView('COURSES_V2');
    }
    // Support deep link to specific benefit
    else if (benefitIdParam) {
        const benefit = BENEFITS_DATA.find(b => b.id === benefitIdParam);
        if (benefit) {
            // Special routing based on category or specific IDs
            if (benefit.id === 'calculators-hub') {
                setCurrentView('CALCULATORS_PAGE');
            } else if (benefit.category === BenefitCategory.TOOLS && benefit.id.startsWith('calc-')) {
                // If it's a specific calculator, open the page AND the modal
                setCurrentView('CALCULATORS_PAGE');
                setCalculatorBenefit(benefit);
            } else if (benefit.id === 'courses-v2') {
                setCurrentView('COURSES_V2');
            } else if (benefit.id === 'laws-regulations') {
                setCurrentView('LAWS_REGULATIONS');
            } else if (benefit.id === 'security') {
                setCurrentView('SECURITY_PAGE');
            } else if (benefit.id === 'registration-update') {
                setCurrentView('REGISTRATION_UPDATE');
            } else if (benefit.id === 'forums-overview') {
                setCurrentView('FORUMS_OVERVIEW');
            } else if (benefit.id === 'highlight-rir') {
                setCurrentView('ROCK_IN_RIO');
            } else {
                // Standard Benefit Page
                setSelectedBenefitForDetails(benefit);
                setCurrentView('BENEFIT_DETAILS');
            }
        }
    }
  }, []);

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);

    try {
      if (isRegistering) {
        // Registration Logic
        if (!regName || !regHotel) {
            throw new Error('Por favor, preencha todos os campos.');
        }
        await authService.register(loginEmail, loginPassword, regName, regHotel, 'Associado');
        // Auto-login happens via listener
      } else {
        // Login Logic
        await authService.login(loginEmail, loginPassword);
      }
    } catch (error: any) {
      setLoginError(error.message || 'Ocorreu um erro. Tente novamente.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    authService.logout();
    setCurrentView('DASHBOARD');
  };

  const handleForgotPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotPasswordEmail) return;
    
    setIsSendingReset(true);
    setForgotPasswordStatus(null);

    const result = await authService.sendPasswordReset(forgotPasswordEmail);
    
    if (result.success) {
        setForgotPasswordStatus({ type: 'success', msg: `E-mail de redefinição enviado para ${forgotPasswordEmail}` });
        setForgotPasswordEmail('');
    } else {
        setForgotPasswordStatus({ type: 'error', msg: result.error || 'Erro ao enviar e-mail.' });
    }
    
    setIsSendingReset(false);
  };

  // --- NAVIGATION HANDLERS ---

  const handleBenefitClick = (benefit: Benefit) => {
    // 1. Check for specific functional IDs
    if (benefit.id === 'calendar-01' || benefit.id === 'calendar-2026' || benefit.id === 'calendar-2-0') {
        if (benefit.embedUrl) {
            setViewerBenefit(benefit);
            setCurrentView('SERVICE_VIEWER');
        } else {
            setIsCalendarOpen(true);
        }
        return;
    }
    if (benefit.id === 'juridico-01' || benefit.id === 'public-order-01') {
        setServiceRequestBenefit(benefit);
        return;
    }
    if (benefit.id === 'courses-v2') {
        setCurrentView('COURSES_V2');
        return;
    }
    if (benefit.id === 'calculators-hub') {
        setCurrentView('CALCULATORS_PAGE');
        return;
    }
    if (benefit.id === 'highlight-rir') {
        setCurrentView('ROCK_IN_RIO');
        return;
    }
    if (benefit.id === 'laws-regulations') {
        setCurrentView('LAWS_REGULATIONS');
        return;
    }
    if (benefit.id === 'security') {
        setCurrentView('SECURITY_PAGE');
        return;
    }
    if (benefit.id === 'registration-update') {
        setCurrentView('REGISTRATION_UPDATE');
        return;
    }
    if (benefit.id === 'forums-overview') {
        setCurrentView('FORUMS_OVERVIEW');
        return;
    }
    if (benefit.id === 'news-portal') {
        window.open(benefit.externalLink, '_blank');
        return;
    }

    // 2. Check for Calculators
    if (benefit.category === BenefitCategory.TOOLS && benefit.id.startsWith('calc-')) {
        setCalculatorBenefit(benefit);
        return;
    }

    // 3. Generic Handling
    if (benefit.isService) {
        if (benefit.embedUrl || benefit.dashboardUrl) {
            setViewerBenefit(benefit);
            setCurrentView('SERVICE_VIEWER');
        } else if (benefit.externalLink) {
            window.open(benefit.externalLink, '_blank');
        } else {
            // Fallback: Open details modal
            setSelectedBenefit(benefit);
        }
    } else {
        // Not a direct service, open details modal
        setSelectedBenefit(benefit);
    }
  };

  const handleViewDetails = (benefit: Benefit) => {
      setSelectedBenefitForDetails(benefit);
      setCurrentView('BENEFIT_DETAILS');
  };

  const handleSectorSelect = (sector: HotelSector) => {
      // Logic can be extended if needed, currently just navigating
      setCurrentView('ALL_BENEFITS');
  };

  const handleForumClick = (forum: Forum) => {
      setSelectedForum(forum);
      setCurrentView('FORUM_PAGE');
  };

  // --- RENDER ---

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
           <Loader2 className="w-10 h-10 animate-spin text-rio-blue" />
           <p className="text-gray-500 font-medium">Carregando Central...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-rio-blue to-blue-900 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md animate-fade-in-up relative">
                <div className="text-center mb-8">
                    <img 
                      src="https://sindhoteisrj.com.br/wp-content/uploads/2020/04/logo-hoteisrio-azul-fundo-transparente-178x171-1.png" 
                      alt="HoteisRio" 
                      className="h-16 mx-auto mb-4 object-contain"
                    />
                    <h1 className="text-2xl font-bold text-gray-800">
                        {isRegistering ? 'Criar Conta' : 'Central do Associado'}
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">
                        {isRegistering ? 'Preencha os dados abaixo para se cadastrar' : 'Faça login para acessar os benefícios'}
                    </p>
                </div>

                {loginError && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6 flex items-start gap-2 border border-red-100">
                        <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                        <span>{loginError}</span>
                    </div>
                )}

                <form onSubmit={handleAuthSubmit} className="space-y-4">
                    {/* Campos Extras para Cadastro */}
                    {isRegistering && (
                        <>
                            <div className="animate-fade-in">
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Nome Completo</label>
                                <div className="relative">
                                    <UserCircle className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                                    <input 
                                        type="text" 
                                        value={regName}
                                        onChange={e => setRegName(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rio-blue focus:border-transparent outline-none transition-all"
                                        placeholder="Seu nome"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="animate-fade-in">
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Hotel / Empresa</label>
                                <div className="relative">
                                    <Building2 className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                                    <input 
                                        type="text" 
                                        value={regHotel}
                                        onChange={e => setRegHotel(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rio-blue focus:border-transparent outline-none transition-all"
                                        placeholder="Nome do Hotel"
                                        required
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">E-mail Corporativo</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                            <input 
                                type="email" 
                                value={loginEmail}
                                onChange={e => setLoginEmail(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rio-blue focus:border-transparent outline-none transition-all"
                                placeholder="seunome@hotel.com.br"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between items-center mb-1.5">
                            <label className="block text-sm font-semibold text-gray-700">Senha</label>
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                            <input 
                                type="password" 
                                value={loginPassword}
                                onChange={e => setLoginPassword(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rio-blue focus:border-transparent outline-none transition-all"
                                placeholder="••••••••"
                                required
                                minLength={6}
                            />
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={isLoggingIn}
                        className="w-full bg-rio-blue hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all transform active:scale-95 flex items-center justify-center gap-2 mt-2"
                    >
                        {isLoggingIn ? <Loader2 className="w-5 h-5 animate-spin" /> : (isRegistering ? <UserPlus className="w-5 h-5" /> : <LogIn className="w-5 h-5" />)}
                        {isLoggingIn ? 'Processando...' : (isRegistering ? 'Criar Conta' : 'Acessar Portal')}
                    </button>
                </form>

                <div className="mt-6 flex flex-col gap-3 text-center">
                    {!isRegistering && (
                        <button 
                            onClick={() => {
                                setForgotPasswordStatus(null);
                                setForgotPasswordEmail(loginEmail);
                                setIsForgotPasswordOpen(true);
                            }}
                            className="text-sm text-gray-500 hover:text-rio-blue font-medium hover:underline transition-colors"
                        >
                            Esqueci minha senha
                        </button>
                    )}
                    
                    <div className="relative py-2">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-gray-200" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-gray-400">Ou</span>
                        </div>
                    </div>

                    <button 
                        onClick={() => {
                            setIsRegistering(!isRegistering);
                            setLoginError('');
                        }}
                        className="text-sm font-bold text-rio-blue hover:text-blue-800 transition-colors"
                    >
                        {isRegistering ? 'Já tenho uma conta. Fazer Login.' : 'Não tem conta? Cadastre-se'}
                    </button>
                </div>

                <div className="mt-8 text-center border-t border-gray-100 pt-6">
                    <p className="text-xs text-gray-400">
                        Problemas com acesso? Contate <a href="mailto:suporte@hoteisrio.com.br" className="text-rio-blue hover:underline">suporte@hoteisrio.com.br</a>
                    </p>
                </div>
            </div>

            {/* FORGOT PASSWORD MODAL */}
            {isForgotPasswordOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsForgotPasswordOpen(false)}></div>
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md relative z-10 animate-fade-in-up p-6">
                        
                        <div className="flex justify-between items-start mb-4">
                            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                <KeyRound className="w-5 h-5 text-rio-blue" />
                                Recuperar Senha
                            </h2>
                            <button onClick={() => setIsForgotPasswordOpen(false)} className="text-gray-400 hover:text-gray-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <p className="text-sm text-gray-600 mb-6">
                            Digite seu e-mail cadastrado. Enviaremos um link para você redefinir sua senha.
                        </p>

                        <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">E-mail</label>
                                <input 
                                    type="email" 
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rio-blue outline-none"
                                    placeholder="seunome@hotel.com.br"
                                    value={forgotPasswordEmail}
                                    onChange={e => setForgotPasswordEmail(e.target.value)}
                                />
                            </div>

                            {forgotPasswordStatus && (
                                <div className={`p-3 rounded-lg text-sm flex items-start gap-2 ${forgotPasswordStatus.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
                                    {forgotPasswordStatus.type === 'success' ? <CheckCircle2 className="w-4 h-4 mt-0.5" /> : <AlertCircle className="w-4 h-4 mt-0.5" />}
                                    <span>{forgotPasswordStatus.msg}</span>
                                </div>
                            )}

                            <button 
                                type="submit" 
                                disabled={isSendingReset}
                                className="w-full bg-rio-blue hover:bg-blue-700 text-white font-bold py-2.5 rounded-lg shadow-md flex items-center justify-center gap-2 transition-all disabled:opacity-70"
                            >
                                {isSendingReset ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Enviar Link de Recuperação'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
  }

  return (
    <Layout 
        user={user} 
        onLogout={handleLogout} 
        onNavigate={(view, params) => {
            setCurrentView(view);
            if (view === 'CATEGORY_LISTING' && params) setSelectedCategoryId(params);
        }}
        onBenefitClick={handleBenefitClick}
        onCategorySelect={(catId) => {
            setSelectedCategoryId(catId);
            setCurrentView('CATEGORY_LISTING');
        }}
        onSectorSelect={handleSectorSelect}
        currentView={currentView}
        isFullPage={currentView === 'COURSES_V2' || currentView === 'SERVICE_VIEWER'}
    >
        {/* VIEW ROUTING */}
        
        {currentView === 'DASHBOARD' && (
            <ModernDashboard 
                user={user} 
                onUseBenefit={handleBenefitClick}
                onViewDetails={handleViewDetails}
            />
        )}

        {currentView === 'BENEFIT_DETAILS' && selectedBenefitForDetails && (
            <BenefitPage 
                benefit={selectedBenefitForDetails}
                onBack={() => setCurrentView('DASHBOARD')}
                onUse={handleBenefitClick}
            />
        )}

        {currentView === 'CATEGORY_LISTING' && (
            <CategoryListingPage 
                categoryId={selectedCategoryId}
                onBack={() => setCurrentView('DASHBOARD')}
                onUse={handleBenefitClick}
                onDetails={handleViewDetails}
            />
        )}

        {currentView === 'ALL_BENEFITS' && (
            <AllBenefitsPage 
                onBack={() => setCurrentView('DASHBOARD')}
                onUse={handleBenefitClick}
                onDetails={handleViewDetails}
            />
        )}

        {currentView === 'CALCULATORS_PAGE' && (
            <CalculatorsPage 
                onBack={() => setCurrentView('DASHBOARD')}
                onOpenCalculator={(benefit) => setCalculatorBenefit(benefit)}
            />
        )}

        {currentView === 'COURSES_V2' && (
            <CoursesPage onBack={() => setCurrentView('DASHBOARD')} />
        )}

        {currentView === 'SERVICE_VIEWER' && viewerBenefit && (
            <ServiceViewerPage 
                benefit={viewerBenefit}
                onBack={() => setCurrentView('DASHBOARD')}
            />
        )}

        {currentView === 'TUTORIAL' && (
            <PlatformTutorial onBack={() => setCurrentView('DASHBOARD')} />
        )}

        {currentView === 'CONTACTS' && (
            <ContactsPage onBack={() => setCurrentView('DASHBOARD')} />
        )}

        {currentView === 'WHATSAPP_GROUPS' && (
            <WhatsAppGroupsPage onBack={() => setCurrentView('DASHBOARD')} />
        )}

        {currentView === 'ASSOCIATION_EVENTS' && (
            <AssociationEventsPage onBack={() => setCurrentView('DASHBOARD')} />
        )}

        {currentView === 'LAWS_REGULATIONS' && (
            <LawsRegulationPage onBack={() => setCurrentView('DASHBOARD')} />
        )}

        {currentView === 'SECURITY_PAGE' && (
            <SecurityPage 
                onBack={() => setCurrentView('DASHBOARD')}
                onReport={() => {
                    const b = BENEFITS_DATA.find(x => x.id === 'public-order-01');
                    if(b) setServiceRequestBenefit(b);
                }}
            />
        )}

        {currentView === 'REGISTRATION_UPDATE' && (
            <RegistrationUpdatePage onBack={() => setCurrentView('DASHBOARD')} />
        )}

        {currentView === 'FORUMS_OVERVIEW' && (
            <ForumsOverviewPage 
                onBack={() => setCurrentView('DASHBOARD')}
                onForumClick={handleForumClick}
            />
        )}

        {currentView === 'FORUM_PAGE' && selectedForum && (
            <ForumPage 
                forum={selectedForum} 
                onBack={() => setCurrentView('FORUMS_OVERVIEW')}
                onRegisterUpdate={() => setCurrentView('REGISTRATION_UPDATE')}
            />
        )}

        {currentView === 'ROCK_IN_RIO' && (
            <RockInRioPage onBack={() => setCurrentView('DASHBOARD')} />
        )}
        
        {currentView === 'CATEGORIZER' && (
            <BenefitCategorizerPage onBack={() => setCurrentView('DASHBOARD')} />
        )}

        {currentView === 'ADMIN_DASHBOARD' && user && (
            <AdminDashboard 
                onBack={() => setCurrentView('DASHBOARD')}
                currentUserEmail={user.email}
            />
        )}

        {/* MODALS */}
        {selectedBenefit && (
            <BenefitModal 
                benefit={selectedBenefit} 
                onClose={() => setSelectedBenefit(null)} 
            />
        )}

        {calculatorBenefit && (
            <CalculatorModal 
                benefit={calculatorBenefit}
                onClose={() => setCalculatorBenefit(null)} 
            />
        )}

        {isCalendarOpen && (
            <CalendarModal onClose={() => setIsCalendarOpen(false)} />
        )}

        {serviceRequestBenefit && (
            <ServiceRequestModal 
                benefit={serviceRequestBenefit}
                onClose={() => setServiceRequestBenefit(null)}
            />
        )}

        {/* Global Components */}
        {isTutorialOpen && (
            <InteractiveTutorial onClose={() => setIsTutorialOpen(false)} />
        )}
        
        <AiAssistant />
        <Footer />
        
    </Layout>
  );
};

export default App;

// --- Fim de App.tsx ---

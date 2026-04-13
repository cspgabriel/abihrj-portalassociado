
// Autor: Gabriel Salles
// Suporte do SO: Windows11
// Descrição: Componente principal da aplicação

import React, { useState, useEffect } from 'react';
import { User, Benefit, Forum } from './types';
import { authService } from './services/authService';
import { analyticsService } from './services/analyticsService';
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
import RockInRioPage from './components/RockInRioPage';
import CalculatorsPage from './components/CalculatorsPage';
import RegistrationUpdatePage from './components/RegistrationUpdatePage';
import CoursesPage from './components/CoursesPage';
import BenefitCategorizerPage from './components/BenefitCategorizerPage';
import CommercialActionsPage from './components/CommercialActionsPage';
import AdminPanel from './components/AdminPanel';
import WelcomeOnboarding from './components/WelcomeOnboarding';
import PhotoGalleryPage from './components/PhotoGalleryPage';
import TalentBankPage from './components/TalentBankPage';
import MarketingLaunchKit from './components/MarketingLaunchKit';
import BenefitsShowcase from './components/BenefitsShowcase'; // NEW IMPORT
import PublicOrderPage from './components/PublicOrderPage';
import LegalAdvisoryPage from './components/LegalAdvisoryPage';

// Modals & Widgets
import BenefitModal from './components/BenefitModal';
import CalendarModal from './components/CalendarModal';
import CalculatorModal from './components/CalculatorModal';
import InteractiveTutorial from './components/InteractiveTutorial';
import QuickAccessMenu from './components/QuickAccessMenu';
import Footer from './components/Footer';

import { Loader2, LogIn, Key, Mail, ArrowLeft, CheckCircle, Unlock, LayoutGrid, Phone, Briefcase, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { firestoreBenefitsService } from './services/firestoreBenefitsService';

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
  const [regCargo, setRegCargo] = useState('');
  const [regWhatsapp, setRegWhatsapp] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const scrollToTop = () => {
    try {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    } catch {
      // ignore
    }
    const scrollable = document.getElementById('scrollable-content');
    if (scrollable && 'scrollTo' in scrollable) {
      (scrollable as any).scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
  };

  // Provide a non-null user object to downstream components to avoid runtime null dereferences
  const safeUser: User = user || { id: 'guest', name: 'Visitante', email: '', hotel: '', role: '' };

  const getPasswordStrength = (pwd: string): { label: string; color: string; width: string } => {
    if (!pwd) return { label: '', color: '', width: '0%' };
    let score = 0;
    if (pwd.length >= 8) score++;
    if (pwd.length >= 12) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    if (score <= 1) return { label: 'Fraca', color: 'bg-red-500', width: '20%' };
    if (score === 2) return { label: 'Fraca', color: 'bg-red-400', width: '30%' };
    if (score === 3) return { label: 'Média', color: 'bg-yellow-400', width: '55%' };
    if (score === 4) return { label: 'Boa', color: 'bg-blue-500', width: '75%' };
    return { label: 'Forte', color: 'bg-green-500', width: '100%' };
  };

  // Initial Route Check
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const viewParam = params.get('view');

    // If a query param explicitly requests a view, honor it first
    if (viewParam) {
        if (viewParam === 'MARKETING_KIT') setCurrentView('MARKETING_KIT');
        else if (viewParam === 'ALL_BENEFITS') setCurrentView('ALL_BENEFITS');
        else if (viewParam === 'CALCULATORS_PAGE') setCurrentView('CALCULATORS_PAGE');
        else if (viewParam === 'ASSOCIATION_EVENTS') setCurrentView('ASSOCIATION_EVENTS');
        else if (viewParam === 'BENEFITS_SHOWCASE') setCurrentView('BENEFITS_SHOWCASE');
        return;
    }

    // Otherwise try to derive route from the pathname so direct links work
    try {
      const p = window.location.pathname || '/';
      // Normalize trailing slash
      const path = p.replace(/\/$/, '');

      // Landing legacy path (some systems may link to this HTML file)
      if (path === '/landing-portal-do-associado.html' || path === '/landing-portal-do-associado' || path === '/landing') {
        setCurrentView('LANDING_PAGE');
        // replace state to clean querystring but keep pathname
        window.history.replaceState({}, '', '/landing-portal-do-associado.html');
        return;
      }

      // All benefits listing
      if (path === '/benefits' || path === '/beneficios' || path === '/todos-beneficios') {
        setCurrentView('ALL_BENEFITS');
        return;
      }

      // Single benefit route: /benefits/:id or /benefit/:id
      const benefitMatch = path.match(/\/(?:benefits|beneficio|benefit)\/(.+)/i);
      if (benefitMatch && benefitMatch[1]) {
        const id = decodeURIComponent(benefitMatch[1]);
        const b = BENEFITS_DATA.find(x => x.id === id);
        if (b) {
          setSelectedBenefit(b);
          setCurrentView('BENEFIT_DETAILS');
          return;
        }
      }

      // Default: leave currentView as-is (LANDING_PAGE default)
    } catch (e) {
      // ignore parsing errors and fall back to default
    }
  }, []);

  // Handle browser back/forward so direct navigation updates the app view
  useEffect(() => {
    const onPop = () => {
      try {
        const p = window.location.pathname || '/';
        const path = p.replace(/\/$/, '');
        if (path === '/landing-portal-do-associado.html' || path === '/landing-portal-do-associado' || path === '/landing') {
          setCurrentView('LANDING_PAGE');
          return;
        }
        if (path === '/benefits' || path === '/beneficios' || path === '/todos-beneficios') {
          setCurrentView('ALL_BENEFITS');
          return;
        }
        const benefitMatch = path.match(/\/(?:benefits|beneficio|benefit)\/(.+)/i);
        if (benefitMatch && benefitMatch[1]) {
          const id = decodeURIComponent(benefitMatch[1]);
          const b = BENEFITS_DATA.find(x => x.id === id);
          if (b) {
            setSelectedBenefit(b);
            setCurrentView('BENEFIT_DETAILS');
            return;
          }
        }
      } catch {}
    };

    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  useEffect(() => {
    // Ensure new static benefits exist in Firestore (one-time sync on app start)
    try {
      const b = BENEFITS_DATA.find(b => b.id === 'rio-international-press');
      if (b) {
        firestoreBenefitsService.upsert(b).catch(() => {});
      }
    } catch (e) {}

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
    scrollToTop();
    // Update browser URL for shareable routes
    try {
      if (view === 'ALL_BENEFITS') {
        window.history.pushState({}, '', '/benefits');
      } else if (view === 'LANDING_PAGE') {
        window.history.pushState({}, '', '/landing-portal-do-associado.html');
      } else if (view === 'BENEFITS_SHOWCASE') {
        window.history.pushState({}, '', '/benefits/showcase');
      } else if (view === 'BENEFIT_DETAILS') {
        // benefit details route is managed by handleBenefitClick which sets the canonical URL
      } else {
        // for other app views we keep the landing root
        window.history.pushState({}, '', '/');
      }
    } catch {}
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
    setLoading(true); 

    try {
      let loggedUser: User | null = null;

      const allowedDomain = '@';
      if (!isForgotPassword && !email.includes(allowedDomain)) {
        setAuthError('Use seu e-mail corporativo válido.');
        setLoading(false);
        return;
      }

      if (isForgotPassword) {
        await authService.sendPasswordReset(email);
        setAuthSuccess('Link de recuperação enviado para o seu e-mail!');
        setIsForgotPassword(false);
        setLoading(false);
        return;
      } else if (isRegistering) {
        if (password !== regConfirmPassword) {
          setAuthError('As senhas não coincidem. Verifique e tente novamente.');
          setLoading(false);
          return;
        }
         loggedUser = await authService.register(email, password, regName, regHotel, 'Associado', regCargo, regWhatsapp);
      } else {
         loggedUser = await authService.login(email, password);
      }

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
    scrollToTop();
    // enviar evento analítico de interação
    analyticsService.logEvent({
      type: 'USE_BENEFIT',
      details: { benefitId: benefit.id, title: benefit.title }
    }).catch(() => {});

    if (benefit.id === 'highlight-drinks' || benefit.id === 'online-courses') {
        navigateTo('COURSES_V2');
        return;
    }

    if (benefit.id === 'banco-talentos') {
        navigateTo('TALENT_BANK');
        return;
    }

    if (benefit.id === 'public-order-01') {
      navigateTo('PUBLIC_ORDER_PAGE');
      return;
    }

    if (benefit.id === 'juridico-01') {
      navigateTo('LEGAL_ADVISORY_PAGE');
      return;
    }

    const forceInternalIds = ['calendar-2026', 'occupancy-reports', 'registration-update', 'leis-decretos-app', 'planejador-feriados-2026', 'portal-fornecedores-new', 'highlight-events-reg', 'sugestao-pauta'];

    if (forceInternalIds.includes(benefit.id)) {
        setSelectedBenefit(benefit);
        navigateTo('SERVICE_VIEWER');
        return;
    }

    if (benefit.isService) {
       // Check for temp benefits from Talent Bank that are services
       if (benefit.id === 'job-post-zoho' || benefit.id === 'portal-rh-future') {
           setSelectedBenefit(benefit);
           navigateTo('SERVICE_VIEWER');
           return;
       }

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
         // push canonical benefit URL so each benefit has a unique shareable link
         try {
           window.history.pushState({}, '', `/benefits/${encodeURIComponent(benefit.id)}`);
         } catch {}
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

  // PUBLIC ROUTES (No Login Required)
  if (currentView === 'BENEFITS_SHOWCASE') {
      return <BenefitsShowcase onBack={() => navigateTo('LANDING_PAGE')} />;
  }

  if (currentView === 'MARKETING_KIT') {
      return (
          <Layout user={user || { id: 'guest', name: 'Visitante', email: '', hotel: '', role: '' }} onLogout={handleLogout} onNavigate={navigateTo} onBenefitClick={handleBenefitClick} currentView={currentView} isFullPage={true}>
              <MarketingLaunchKit onBack={() => navigateTo('LANDING_PAGE')} />
          </Layout>
      );
  }

  // Allow certain pages to be publicly accessible without login
  const publicViews = ['LANDING_PAGE', 'BENEFITS_SHOWCASE', 'ALL_BENEFITS', 'BENEFIT_DETAILS', 'SERVICE_VIEWER', 'MARKETING_KIT'];
  if (!user && !publicViews.includes(currentView)) {
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
                {isForgotPassword 
                  ? 'Digite seu e-mail para receber o link de redefinição.' 
                  : 'Acesse sua central de benefícios exclusiva.'}
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
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cargo <span className="text-gray-400 font-normal">(opcional)</span></label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                      <input type="text" className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-rio-blue outline-none" value={regCargo} onChange={e => setRegCargo(e.target.value)} placeholder="Ex: Gerente, Recepcionista..." />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp <span className="text-gray-400 font-normal">(opcional)</span></label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                      <input type="tel" inputMode="tel" className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-rio-blue outline-none" value={regWhatsapp} onChange={e => setRegWhatsapp(e.target.value)} placeholder="(21) 99999-9999" />
                    </div>
                  </div>
                </>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">E-mail Corporativo</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                  <input 
                    type="email" 
                    required 
                    autoComplete="email"
                    inputMode="email"
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-rio-blue outline-none" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    placeholder="seu.nome@hotel.com.br" 
                  />
                </div>
              </div>
              
              {!isForgotPassword && (
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-sm font-medium text-gray-700">Senha</label>
                    {!isRegistering && (
                      <button 
                        type="button"
                        onClick={() => { setIsForgotPassword(true); setAuthError(''); setAuthSuccess(''); }}
                        className="text-xs text-rio-blue hover:underline font-semibold"
                      >
                        Esqueceu a senha?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Key className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                    <input 
                      type={showPassword ? 'text' : 'password'}
                      required 
                      autoComplete={isRegistering ? 'new-password' : 'current-password'}
                      className="w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-rio-blue outline-none" 
                      value={password} 
                      onChange={e => setPassword(e.target.value)} 
                    />
                    <button type="button" onClick={() => setShowPassword(v => !v)} className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600" title={showPassword ? 'Ocultar senha' : 'Mostrar senha'}>
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {isRegistering && password && (() => {
                    const strength = getPasswordStrength(password);
                    return (
                      <div className="mt-2">
                        <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full transition-all duration-300 ${strength.color}`} style={{ width: strength.width }} />
                        </div>
                        <p className="text-xs mt-1 text-gray-500 flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3" />
                          Força da senha: <span className="font-semibold">{strength.label}</span>
                        </p>
                      </div>
                    );
                  })()}
                </div>
              )}

              {isRegistering && !isForgotPassword && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar Senha</label>
                  <div className="relative">
                    <Key className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      autoComplete="new-password"
                      className={`w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-rio-blue outline-none ${regConfirmPassword && password !== regConfirmPassword ? 'border-red-400' : ''}`}
                      value={regConfirmPassword}
                      onChange={e => setRegConfirmPassword(e.target.value)}
                      placeholder="Repita a senha"
                    />
                    <button type="button" onClick={() => setShowConfirmPassword(v => !v)} className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600" title={showConfirmPassword ? 'Ocultar senha' : 'Mostrar senha'}>
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {regConfirmPassword && password !== regConfirmPassword && (
                    <p className="text-xs text-red-500 mt-1">As senhas não coincidem.</p>
                  )}
                  {regConfirmPassword && password === regConfirmPassword && (
                    <p className="text-xs text-green-600 mt-1 flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Senhas coincidem.</p>
                  )}
                </div>
              )}

              {authError && (
                <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-100 animate-shake">
                  {authError}
                </div>
              )}

              {authSuccess && (
                <div className="bg-green-50 text-green-700 text-sm p-3 rounded-lg border border-green-100 flex items-center gap-2 animate-fade-in">
                  <CheckCircle className="w-4 h-4" />
                  {authSuccess}
                </div>
              )}

              <button type="submit" className="w-full bg-gradient-to-r from-rio-blue to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2">
                {isForgotPassword ? <Unlock className="w-5 h-5" /> : <LogIn className="w-5 h-5" />}
                {isForgotPassword ? 'Enviar Link de Recuperação' : isRegistering ? 'Criar Conta' : 'Entrar'}
              </button>
           </form>
           
           <div className="mt-6 text-center space-y-4">
             {!isForgotPassword && (
                <button 
                    onClick={() => navigateTo('BENEFITS_SHOWCASE')}
                    className="text-gray-500 hover:text-rio-blue hover:underline text-xs flex items-center justify-center gap-1 mx-auto transition-colors"
                >
                    <LayoutGrid className="w-3 h-3" />
                    Ainda não é associado? Conheça nossos benefícios
                </button>
             )}

             {isForgotPassword ? (
               <button 
                 onClick={() => { setIsForgotPassword(false); setAuthError(''); setAuthSuccess(''); }} 
                 className="text-gray-500 hover:text-rio-blue hover:underline font-medium flex items-center justify-center gap-1 mx-auto text-sm"
               >
                 <ArrowLeft className="w-4 h-4" /> Voltar para o Login
               </button>
             ) : (
               <button onClick={() => { setIsRegistering(!isRegistering); setAuthError(''); setAuthSuccess(''); setRegCargo(''); setRegWhatsapp(''); setRegConfirmPassword(''); setShowPassword(false); setShowConfirmPassword(false); }} className="text-rio-blue hover:underline font-medium text-sm">
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
      case 'LANDING_PAGE': return <LandingPage userName={safeUser.name} onNavigate={navigateTo} onBenefitClick={handleBenefitClick} />;
      case 'WELCOME': return <WelcomeOnboarding onStartTutorial={() => { navigateTo('LANDING_PAGE'); setTimeout(() => setShowTutorial(true), 500); }} onSkip={() => navigateTo('LANDING_PAGE')} />;
      case 'MODERN_DASHBOARD': return <ModernDashboard user={safeUser} onUseBenefit={handleBenefitClick} onViewDetails={(b) => { handleBenefitClick(b); }} />;
      case 'ALL_BENEFITS': return <AllBenefitsPage initialSearchTerm={globalSearchTerm} onBack={() => navigateTo('LANDING_PAGE')} onUse={handleBenefitClick} onDetails={(b) => { handleBenefitClick(b); }} />;
      case 'BENEFIT_DETAILS': return selectedBenefit ? <BenefitPage benefit={selectedBenefit} onBack={() => navigateTo('ALL_BENEFITS')} onUse={handleBenefitClick} /> : <AllBenefitsPage onBack={() => navigateTo('LANDING_PAGE')} onUse={handleBenefitClick} onDetails={(b) => { handleBenefitClick(b); }} />;
      case 'SERVICE_VIEWER': return selectedBenefit ? <ServiceViewerPage benefit={selectedBenefit} onBack={() => navigateTo('ALL_BENEFITS')} /> : <AllBenefitsPage onBack={() => navigateTo('LANDING_PAGE')} onUse={handleBenefitClick} onDetails={(b) => { handleBenefitClick(b); }} />;
      case 'CATEGORY_LISTING': return <CategoryListingPage categoryId={selectedCategory} onBack={() => navigateTo('MODERN_DASHBOARD')} onUse={handleBenefitClick} onDetails={(b) => { handleBenefitClick(b); }} />;
      case 'SECURITY_PAGE': return <SecurityPage onBack={() => navigateTo('LANDING_PAGE')} />;
      case 'FORUMS_OVERVIEW': return <ForumsOverviewPage onBack={() => navigateTo('LANDING_PAGE')} onForumClick={(f) => { setSelectedForum(f); navigateTo('FORUM_DETAILS'); }} />;
      case 'FORUM_DETAILS': return selectedForum ? <ForumPage forum={selectedForum} onBack={() => navigateTo('FORUMS_OVERVIEW')} onRegisterUpdate={() => navigateTo('REGISTRATION_UPDATE')} /> : <ForumsOverviewPage onBack={() => navigateTo('LANDING_PAGE')} onForumClick={(f) => { setSelectedForum(f); navigateTo('FORUM_DETAILS'); }} />;
      case 'ASSOCIATION_EVENTS': return <AssociationEventsPage onBack={() => navigateTo('LANDING_PAGE')} />;
      case 'WHATSAPP_GROUPS': return <WhatsAppGroupsPage onBack={() => navigateTo('LANDING_PAGE')} />;
      case 'CONTACTS': return <ContactsPage onBack={() => navigateTo('LANDING_PAGE')} />;
      case 'LAWS_REGULATION': return <LawsRegulationPage onBack={() => navigateTo('LANDING_PAGE')} />;
      // PLATFORM_TUTORIAL removed
      case 'ROCK_IN_RIO': return <RockInRioPage onBack={() => navigateTo('LANDING_PAGE')} />;
      case 'CALCULATORS_PAGE': return <CalculatorsPage onBack={() => navigateTo('LANDING_PAGE')} onOpenCalculator={(b) => { setSelectedBenefit(b); setShowCalculatorModal(true); }} />;
      case 'REGISTRATION_UPDATE': return <RegistrationUpdatePage onBack={() => navigateTo('LANDING_PAGE')} />;
      case 'COURSES_V2': return <CoursesPage onBack={() => navigateTo('LANDING_PAGE')} />;
      case 'BENEFIT_CATEGORIZER': return <BenefitCategorizerPage onBack={() => navigateTo('LANDING_PAGE')} />;
      case 'COMMERCIAL_ACTIONS_PAGE': return <CommercialActionsPage onBack={() => navigateTo('LANDING_PAGE')} />;
      case 'ADMIN_PANEL': return <AdminPanel user={safeUser} onBack={() => navigateTo('LANDING_PAGE')} />;
      case 'PHOTO_GALLERY': return <PhotoGalleryPage onBack={() => navigateTo('LANDING_PAGE')} />;
      case 'TALENT_BANK': return <TalentBankPage onBack={() => navigateTo('LANDING_PAGE')} onUse={handleBenefitClick} />;
      case 'PUBLIC_ORDER_PAGE': return <PublicOrderPage onBack={() => navigateTo('LANDING_PAGE')} />;
      case 'LEGAL_ADVISORY_PAGE': return <LegalAdvisoryPage onBack={() => navigateTo('LANDING_PAGE')} />;
      case 'MARKETING_KIT': return <MarketingLaunchKit onBack={() => navigateTo('LANDING_PAGE')} />; 
      case 'BENEFITS_SHOWCASE': return <BenefitsShowcase onBack={() => navigateTo('LANDING_PAGE')} />; // ROUTE HANDLER
      default: return <LandingPage userName={safeUser.name} onNavigate={navigateTo} onBenefitClick={handleBenefitClick} />;
    }
  };

  return (
    <Layout user={safeUser} onLogout={handleLogout} onNavigate={navigateTo} onSearch={handleGlobalSearch} onBenefitClick={handleBenefitClick} currentView={currentView} isFullPage={['COURSES_V2', 'BENEFIT_CATEGORIZER', 'COMMERCIAL_ACTIONS_PAGE', 'WELCOME', 'PHOTO_GALLERY', 'TALENT_BANK', 'PUBLIC_ORDER_PAGE', 'LEGAL_ADVISORY_PAGE', 'MARKETING_KIT', 'BENEFITS_SHOWCASE'].includes(currentView)}>
       {renderContent()}
       <Footer onNavigate={navigateTo} onBenefitClick={(id) => { const b = BENEFITS_DATA.find(x => x.id === id); if (b) handleBenefitClick(b); }} />
       <QuickAccessMenu onUse={(id)=>{
         const b = BENEFITS_DATA.find(x => x.id === id);
         if (b) handleBenefitClick(b);
       }} />
       {showCalendarModal && <CalendarModal onClose={() => setShowCalendarModal(false)} />}
       {showCalculatorModal && <CalculatorModal onClose={() => setShowCalculatorModal(false)} benefit={selectedBenefit || undefined} />}
       {showTutorial && <InteractiveTutorial onClose={() => setShowTutorial(false)} />}
       {showBenefitModal && <BenefitModal benefit={selectedBenefit} onClose={() => setShowBenefitModal(false)} />}
    </Layout>
  );
}

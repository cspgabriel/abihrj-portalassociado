

import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import BenefitCard from './components/BenefitCard';
// BenefitModal replaced by BenefitPage
import BenefitPage from './components/BenefitPage';
import PlatformTutorial from './components/PlatformTutorial';
import InteractiveTutorial from './components/InteractiveTutorial'; // Importar novo componente
import CalendarModal from './components/CalendarModal';
import ServiceRequestModal from './components/ServiceRequestModal';
import AiAssistant from './components/AiAssistant';
import ContactsPage from './components/ContactsPage';
import WhatsAppGroupsPage from './components/WhatsAppGroupsPage';
import AssociationEventsPage from './components/AssociationEventsPage';
import LawsRegulationPage from './components/LawsRegulationPage';
import SecurityPage from './components/SecurityPage';
import RegistrationUpdatePage from './components/RegistrationUpdatePage';
import ForumPage from './components/ForumPage';
import ForumsOverviewPage from './components/ForumsOverviewPage'; // New Component
import WeatherWidget from './components/WeatherWidget'; // New custom widget
import { User, Benefit, BenefitCategory, Forum } from './types';
import { BENEFITS_DATA, OTHER_BENEFITS_LIST, FORUMS_DATA, COMMUNITY_ITEMS_DATA } from './constants';
import { Building2, CheckCircle2, Lock, Loader2, AlertCircle, ArrowLeft, Laptop2, LayoutGrid, Users, Calendar, MessageCircle, Phone, UserCog, CloudSun, Sun, CloudRain, Filter, ArrowDownAZ, ArrowUpAZ, Star, ChevronDown, ChevronRight, List, Grid } from 'lucide-react';
import { authService } from './services/authService';
import * as Icons from 'lucide-react';

// --- Types for View Management ---
type AppView = 'DASHBOARD' | 'BENEFIT_DETAILS' | 'TUTORIAL' | 'CONTACTS' | 'WHATSAPP_GROUPS' | 'ASSOCIATION_EVENTS' | 'LAWS_REGULATIONS' | 'SECURITY_PAGE' | 'REGISTRATION_UPDATE' | 'FORUM_PAGE' | 'FORUMS_OVERVIEW';

// --- Components ---

const LoginScreen: React.FC<{ onLogin: (user: User) => void }> = ({ onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  
  // Login State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Register State
  const [name, setName] = useState('');
  const [hotel, setHotel] = useState('');
  const [role, setRole] = useState('');

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isRegistering) {
        // Fluxo de Cadastro
        if (!name || !hotel || !role) {
          throw new Error("Por favor, preencha todos os campos.");
        }
        await authService.register(email, password, name, hotel, role);
        // Após registro, o Firebase faz login automático e o listener do Dashboard resolve.
      } else {
        // Fluxo de Login
        await authService.login(email, password);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Ocorreu um erro. Tente novamente.');
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsRegistering(!isRegistering);
    setError('');
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1518182170546-0766ce6fec56?q=80&w=2670&auto=format&fit=crop")' }}>
      <div className="absolute inset-0 bg-blue-900/70 backdrop-blur-sm"></div>
      
      <div className="relative bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md animate-fade-in mx-4 my-8">
        <div className="text-center mb-6">
          <div className="bg-rio-blue w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg rotate-3">
             <img 
               src="https://sindhoteisrj.com.br/wp-content/uploads/2023/04/Logo-HoteisRIO-Branca-Fundo-Transparente.png" 
               alt="Logo" 
               className="w-12 h-auto"
               style={{ filter: 'brightness(10)' }} // Make it white inside the box if it's not already
             />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">
            {isRegistering ? 'Nova Filiação' : 'Central do Associado'}
          </h1>
          <p className="text-gray-500 mt-2 font-medium">HotéisRIO</p>
          {!isRegistering && <p className="text-xs text-gray-400 mt-1">Acesse sua área exclusiva de gestão.</p>}
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {isRegistering && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Ana Souza"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rio-blue focus:border-rio-blue outline-none transition"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Hotel</label>
                <input 
                  type="text" 
                  value={hotel}
                  onChange={(e) => setHotel(e.target.value)}
                  placeholder="Ex: Hotel Atlântico Rio"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rio-blue focus:border-rio-blue outline-none transition"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cargo</label>
                <input 
                  type="text" 
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="Ex: Gerente Geral"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rio-blue focus:border-rio-blue outline-none transition"
                  required
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Corporativo</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rio-blue focus:border-rio-blue outline-none transition"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rio-blue focus:border-rio-blue outline-none transition"
              required
              minLength={6}
            />
          </div>
          
          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-rio-blue hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-md transition-all transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {isRegistering ? 'Cadastrando...' : 'Entrando...'}
              </>
            ) : (
              isRegistering ? 'Criar Conta' : 'Acessar Central'
            )}
          </button>
        </form>

        <div className="mt-6 flex flex-col items-center gap-3 border-t border-gray-100 pt-4">
           <button 
             onClick={toggleMode}
             className="text-sm text-rio-blue hover:underline font-medium flex items-center gap-1"
           >
             {isRegistering ? (
               <>
                <ArrowLeft className="w-4 h-4" />
                Voltar para Login
               </>
             ) : (
               'Primeiro acesso? Cadastre-se'
             )}
           </button>
           
           {!isRegistering && (
             <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
               <Lock className="w-3 h-3" /> Acesso Restrito aos Associados
             </p>
           )}
        </div>
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  
  // View State Management
  const [currentView, setCurrentView] = useState<AppView>('DASHBOARD');
  const [selectedBenefitForDetails, setSelectedBenefitForDetails] = useState<Benefit | null>(null);
  const [selectedForum, setSelectedForum] = useState<Forum | null>(null);
  
  // Catalog Filter State
  const [selectedCategory, setSelectedCategory] = useState<BenefitCategory | 'Todos'>('Todos');
  const [sortOrder, setSortOrder] = useState<'az' | 'za'>('az');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Quick Access Filter State
  const [quickAccessCategory, setQuickAccessCategory] = useState<BenefitCategory | 'Todos'>('Todos');
  const [quickAccessViewMode, setQuickAccessViewMode] = useState<'grid' | 'list'>('grid');
  const [quickAccessSortOrder, setQuickAccessSortOrder] = useState<'az' | 'za'>('az');

  // Community Filter State
  const [communityViewMode, setCommunityViewMode] = useState<'grid' | 'list'>('grid');
  const [communitySortOrder, setCommunitySortOrder] = useState<'az' | 'za'>('az');

  // Forums Section Filter State
  const [forumsViewMode, setForumsViewMode] = useState<'grid' | 'list'>('grid');
  const [forumsSortOrder, setForumsSortOrder] = useState<'az' | 'za'>('az');
  
  // Functional Modals State
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [serviceRequestBenefit, setServiceRequestBenefit] = useState<Benefit | null>(null);
  
  // Tutorial State
  const [showInteractiveTutorial, setShowInteractiveTutorial] = useState(false);

  const [checkingSession, setCheckingSession] = useState(true);

  // Date Logic
  const today = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Check for existing session on load using Firebase Real Listener
  useEffect(() => {
    let timeoutId: any;
    
    const unsubscribe = authService.subscribeToAuthChanges((currentUser) => {
      setUser(currentUser);
      setCheckingSession(false);
      if (timeoutId) clearTimeout(timeoutId);
    });

    // Safety timeout: If Firebase takes too long (e.g. network issue), stop loading to allow manual interaction or error display
    timeoutId = setTimeout(() => {
        if (checkingSession) {
            console.warn("Auth check timed out, forcing render");
            setCheckingSession(false);
        }
    }, 3000);

    return () => {
        unsubscribe();
        if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const handleLogout = async () => {
    await authService.logout();
    // Listener updates user state
  };

  // --- ACTIONS ---
  
  const handleNavigate = (view: AppView) => {
    if (view === 'TUTORIAL') {
        // Agora o botão de tutorial abre o interativo se estiver no Dashboard, ou a página estática se não
        setShowInteractiveTutorial(true);
    } else {
        setCurrentView(view);
        // Reset selection if moving away from details
        if (view !== 'BENEFIT_DETAILS') {
          setSelectedBenefitForDetails(null);
        }
    }
  };

  // Botão "Detalhes": Navega para a página de explicação do benefício
  const handleViewDetails = (benefit: Benefit) => {
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
    
    setSelectedBenefitForDetails(benefit);
    setCurrentView('BENEFIT_DETAILS');
  };

  const handleForumClick = (forum: Forum) => {
    setSelectedForum(forum);
    setCurrentView('FORUM_PAGE');
  };

  // Botão "Utilizar": Executa a ação direta (Modal de serviço, Calendário, etc.)
  const handleUseBenefit = (benefit: Benefit) => {
    // 0. Download de Arquivos
    if (benefit.downloadUrl) {
      // Abre o link em nova aba, iniciando o download
      window.open(benefit.downloadUrl, '_blank');
      return;
    }

    // 1. Links Externos
    if (benefit.externalLink) {
      window.open(benefit.externalLink, '_blank');
      return;
    }

    // 2. Ações Internas Específicas
    if (benefit.id === 'calendar-01') {
      setIsCalendarOpen(true);
      return;
    } 
    
    if (benefit.id === 'juridico-01' || benefit.id === 'public-order-01') {
      setServiceRequestBenefit(benefit);
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

    // 3. Padrão: Abre página de detalhes
    handleViewDetails(benefit);
  };

  const handleBackToDashboard = () => {
    setCurrentView('DASHBOARD');
    setSelectedBenefitForDetails(null);
    setSelectedForum(null);
  };

  const handleOpenPublicOrderModal = () => {
    // Manually trigger the modal for public order
    const publicOrderBenefit = BENEFITS_DATA.find(b => b.id === 'public-order-01');
    if (publicOrderBenefit) {
      setServiceRequestBenefit(publicOrderBenefit);
    }
  };

  // --- FILTER & SORT LOGIC ---
  
  const toggleSort = () => setSortOrder(prev => prev === 'az' ? 'za' : 'az');
  const toggleViewMode = () => setViewMode(prev => prev === 'grid' ? 'list' : 'grid');

  const toggleQuickAccessSort = () => setQuickAccessSortOrder(prev => prev === 'az' ? 'za' : 'az');
  const toggleQuickAccessView = () => setQuickAccessViewMode(prev => prev === 'grid' ? 'list' : 'grid');

  const toggleCommunitySort = () => setCommunitySortOrder(prev => prev === 'az' ? 'za' : 'az');
  const toggleCommunityView = () => setCommunityViewMode(prev => prev === 'grid' ? 'list' : 'grid');

  const toggleForumsSort = () => setForumsSortOrder(prev => prev === 'az' ? 'za' : 'az');
  const toggleForumsView = () => setForumsViewMode(prev => prev === 'grid' ? 'list' : 'grid');

  // Common Sort Helper
  const getSortedData = <T extends { title: string }>(data: T[], order: 'az' | 'za') => {
    return [...data].sort((a, b) => {
        if (order === 'az') return a.title.localeCompare(b.title);
        return b.title.localeCompare(a.title);
    });
  };

  // 1. Quick Access (Services only)
  const serviceBenefits = BENEFITS_DATA
    .filter(b => b.isService === true)
    .filter(b => quickAccessCategory === 'Todos' || b.category === quickAccessCategory);
  const sortedServiceBenefits = getSortedData(serviceBenefits, quickAccessSortOrder);
  
  // 2. Catalog (Non-services or All depending on design choice)
  const filteredCatalogBenefits = BENEFITS_DATA
    .filter(b => {
       const matchesCategory = selectedCategory === 'Todos' || b.category === selectedCategory;
       const isQuickAccess = b.isService === true;
       
       if (selectedCategory !== 'Todos') {
         return matchesCategory;
       } else {
         return !isQuickAccess && matchesCategory;
       }
    });
  const sortedCatalogBenefits = getSortedData(filteredCatalogBenefits, sortOrder);

  // 3. Community Items
  const sortedCommunityItems = getSortedData(COMMUNITY_ITEMS_DATA, communitySortOrder);

  // 4. Forums
  const sortedForums = getSortedData(FORUMS_DATA, forumsSortOrder);

  // Get unique categories for dropdowns
  const availableCategories = Object.values(BenefitCategory);

  if (checkingSession) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 flex-col gap-4">
        <Loader2 className="w-10 h-10 text-rio-blue animate-spin" />
        <p className="text-gray-500 text-sm">Carregando Central do Associado...</p>
      </div>
    );
  }

  if (!user) {
    return <LoginScreen onLogin={setUser} />;
  }

  // --- VIEW ROUTING ---

  // Main Layout wrapper now handles navigation via onNavigate
  const commonLayoutProps = {
    user,
    onLogout: handleLogout,
    onNavigate: handleNavigate,
    onBenefitClick: handleViewDetails,
    onForumClick: handleForumClick, // Pass down to MegaMenu
    currentView
  };

  if (currentView === 'FORUM_PAGE' && selectedForum) {
    return (
      <Layout {...commonLayoutProps}>
        <ForumPage 
          forum={selectedForum} 
          onBack={handleBackToDashboard}
          onRegisterUpdate={() => setCurrentView('REGISTRATION_UPDATE')}
        />
        <AiAssistant />
      </Layout>
    );
  }

  if (currentView === 'FORUMS_OVERVIEW') {
    return (
      <Layout {...commonLayoutProps}>
        <ForumsOverviewPage 
          onBack={handleBackToDashboard}
          onForumClick={handleForumClick}
        />
        <AiAssistant />
      </Layout>
    );
  }

  if (currentView === 'REGISTRATION_UPDATE') {
    return (
      <Layout {...commonLayoutProps}>
        <RegistrationUpdatePage onBack={handleBackToDashboard} />
        <AiAssistant />
      </Layout>
    );
  }

  if (currentView === 'LAWS_REGULATIONS') {
    return (
      <Layout {...commonLayoutProps}>
        <LawsRegulationPage onBack={handleBackToDashboard} />
        <AiAssistant />
      </Layout>
    );
  }

  if (currentView === 'SECURITY_PAGE') {
    return (
      <Layout {...commonLayoutProps}>
        <SecurityPage onBack={handleBackToDashboard} onReport={handleOpenPublicOrderModal} />
        <AiAssistant />
        {serviceRequestBenefit && (
          <ServiceRequestModal 
            benefit={serviceRequestBenefit}
            onClose={() => setServiceRequestBenefit(null)}
          />
        )}
      </Layout>
    );
  }

  if (currentView === 'TUTORIAL') {
    return (
       <Layout {...commonLayoutProps}>
          <PlatformTutorial onBack={handleBackToDashboard} />
          <AiAssistant />
       </Layout>
    );
  }

  if (currentView === 'CONTACTS') {
    return (
      <Layout {...commonLayoutProps}>
        <ContactsPage onBack={handleBackToDashboard} />
        <AiAssistant />
      </Layout>
    );
  }

  if (currentView === 'WHATSAPP_GROUPS') {
    return (
      <Layout {...commonLayoutProps}>
        <WhatsAppGroupsPage onBack={handleBackToDashboard} />
        <AiAssistant />
      </Layout>
    );
  }

  if (currentView === 'ASSOCIATION_EVENTS') {
    return (
      <Layout {...commonLayoutProps}>
        <AssociationEventsPage onBack={handleBackToDashboard} />
        <AiAssistant />
      </Layout>
    );
  }

  if (currentView === 'BENEFIT_DETAILS' && selectedBenefitForDetails) {
    return (
      <Layout {...commonLayoutProps}>
        <BenefitPage 
          benefit={selectedBenefitForDetails}
          onBack={handleBackToDashboard}
          onUse={handleUseBenefit}
        />
        <AiAssistant />
        {isCalendarOpen && <CalendarModal onClose={() => setIsCalendarOpen(false)} />}
        {serviceRequestBenefit && (
          <ServiceRequestModal 
            benefit={serviceRequestBenefit}
            onClose={() => setServiceRequestBenefit(null)}
          />
        )}
      </Layout>
    );
  }

  // VIEW PADRÃO: DASHBOARD
  return (
    <Layout {...commonLayoutProps}>
      
      {/* Hero Header */}
      <div id="header-welcome" className="bg-gradient-to-r from-rio-blue to-blue-800 rounded-2xl p-6 md:p-8 mb-10 shadow-lg text-white flex flex-col md:flex-row items-center justify-between gap-6 animate-fade-in relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-16 -mt-16 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full -ml-10 -mb-10 pointer-events-none" />
        
        <div className="relative z-10">
          <div className="inline-block px-3 py-1 mb-3 rounded-full bg-white/10 border border-white/20 text-xs font-medium backdrop-blur-sm">
             {today}
          </div>
          <h1 className="text-3xl font-bold mb-2">Central do Associado</h1>
          <p className="text-blue-100 max-w-xl text-lg mb-4">
            Bem-vindo, {user.name.split(' ')[0]}. Acesse abaixo as ferramentas de gestão do seu hotel.
          </p>
        </div>

        {/* Real-time Custom Weather Widget */}
        <div className="relative z-10 w-full md:w-auto md:min-w-[300px]">
          <WeatherWidget />
        </div>
      </div>

      {/* SEÇÃO 1: SERVIÇOS ONLINE (Acesso Rápido) */}
      <div id="quick-access-section" className="mb-12">
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
               <div className="p-2 bg-blue-100 text-rio-blue rounded-lg">
                  <Laptop2 className="w-6 h-6" />
               </div>
               <h2 className="text-xl font-bold text-gray-800">Acesso Rápido aos Serviços</h2>
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-gray-500 hidden md:inline">Filtrar:</span>
              
              {/* Category Dropdown */}
              <div className="relative">
                <select 
                   value={quickAccessCategory}
                   onChange={(e) => setQuickAccessCategory(e.target.value as any)}
                   className="appearance-none bg-white border border-gray-200 text-gray-700 py-1.5 pl-3 pr-8 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-rio-blue cursor-pointer"
                >
                   <option value="Todos">Todas as Categorias</option>
                   {availableCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
                <Filter className="w-4 h-4 text-gray-400 absolute right-2.5 top-2 pointer-events-none" />
              </div>

              <div className="w-px h-6 bg-gray-300 mx-1 hidden md:block"></div>

              <button 
                onClick={toggleQuickAccessSort}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
                title="Ordenar"
              >
                {quickAccessSortOrder === 'az' ? <ArrowDownAZ className="w-4 h-4" /> : <ArrowUpAZ className="w-4 h-4" />}
              </button>
              
              <button 
                onClick={toggleQuickAccessView}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
                title="Mudar Visualização"
              >
                {quickAccessViewMode === 'grid' ? <List className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
              </button>
            </div>
         </div>
         
         <div className={`
           ${quickAccessViewMode === 'grid' 
             ? 'grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5' 
             : 'flex flex-col gap-3'}
         `}>
            {sortedServiceBenefits.length > 0 ? (
                sortedServiceBenefits.map(benefit => (
                   <BenefitCard 
                     key={benefit.id}
                     benefit={benefit}
                     onDetails={handleViewDetails}
                     onUse={handleUseBenefit}
                     layout={quickAccessViewMode}
                   />
                ))
            ) : (
                <div className="col-span-full py-8 text-center text-gray-500 bg-gray-100 rounded-xl border border-dashed border-gray-300">
                    Nenhum serviço encontrado nesta categoria.
                </div>
            )}
         </div>
      </div>

      {/* SEÇÃO EXTRA: COMUNIDADE & CONEXÃO */}
      <div id="community-section" className="mb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
           <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                 <Users className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Comunidade & Conexão</h2>
           </div>

           <div className="flex flex-wrap items-center gap-2">
             <button 
                onClick={toggleCommunitySort}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
                title="Ordenar"
              >
                {communitySortOrder === 'az' ? <ArrowDownAZ className="w-4 h-4" /> : <ArrowUpAZ className="w-4 h-4" />}
              </button>
              <button 
                onClick={toggleCommunityView}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
                title="Mudar Visualização"
              >
                {communityViewMode === 'grid' ? <List className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
              </button>
           </div>
        </div>

         <div className={`
           ${communityViewMode === 'grid' 
             ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6' 
             : 'flex flex-col gap-3'}
         `}>
            {sortedCommunityItems.map(item => {
               const IconComponent = (Icons as any)[item.iconName] || Icons.HelpCircle;
               const isList = communityViewMode === 'list';
               
               return (
                  <div 
                    key={item.id}
                    onClick={() => handleNavigate(item.viewTarget as any)}
                    className={`
                      bg-white rounded-xl shadow-sm hover:shadow-lg border border-gray-100 cursor-pointer group transition-all
                      ${isList ? 'flex flex-row items-center p-4 gap-4' : 'flex flex-col p-6'}
                    `}
                  >
                     <div className={`
                       rounded-lg flex items-center justify-center transition-colors
                       ${item.bgClass} ${item.colorClass} ${item.hoverBgClass} group-hover:text-white
                       ${isList ? 'w-10 h-10 shrink-0' : 'w-12 h-12 mb-4'}
                     `}>
                       <IconComponent className={`${isList ? 'w-5 h-5' : 'w-6 h-6'}`} />
                     </div>
                     <div className="flex-1">
                        <h3 className={`font-bold text-gray-800 group-hover:text-opacity-80 transition-colors ${isList ? 'text-base mb-0' : 'text-lg mb-1'}`}>
                          {item.title}
                        </h3>
                        <p className={`text-gray-500 ${isList ? 'text-xs line-clamp-1' : 'text-sm'}`}>
                          {item.description}
                        </p>
                     </div>
                     {isList && (
                       <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gray-500" />
                     )}
                  </div>
               );
            })}
         </div>
      </div>

      {/* SEÇÃO: FORUMS */}
      <div id="forums-section" className="mb-12">
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
               <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                  <Users className="w-6 h-6" />
               </div>
               <h2 className="text-xl font-bold text-gray-800">Fóruns da Hotelaria</h2>
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
             <button 
                onClick={toggleForumsSort}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
                title="Ordenar"
              >
                {forumsSortOrder === 'az' ? <ArrowDownAZ className="w-4 h-4" /> : <ArrowUpAZ className="w-4 h-4" />}
              </button>
              <button 
                onClick={toggleForumsView}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
                title="Mudar Visualização"
              >
                {forumsViewMode === 'grid' ? <List className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
              </button>
           </div>
         </div>
         
         <div className={`
           ${forumsViewMode === 'grid'
             ? 'grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4'
             : 'flex flex-col gap-3'}
         `}>
            {sortedForums.map(forum => {
              const IconComponent = (Icons as any)[forum.iconName] || Icons.Users;
              const isList = forumsViewMode === 'list';

              return (
                <div 
                  key={forum.id} 
                  onClick={() => handleForumClick(forum)}
                  className={`
                    bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-rio-blue transition-all cursor-pointer group
                    ${isList ? 'flex flex-row items-center p-4 gap-4' : 'p-4 flex flex-col justify-between'}
                  `}
                >
                  <div className={`${isList ? 'flex items-center gap-4 flex-1' : 'mb-4'}`}>
                    <div className={`
                      rounded-lg bg-gray-50 flex items-center justify-center group-hover:bg-rio-blue group-hover:text-white transition-colors
                      ${isList ? 'w-10 h-10 shrink-0' : 'w-10 h-10 mb-3'}
                    `}>
                      <IconComponent className="w-5 h-5 text-gray-600 group-hover:text-white" />
                    </div>
                    
                    <div>
                      <h3 className={`font-bold text-gray-800 leading-tight group-hover:text-rio-blue ${isList ? 'mb-0' : 'mb-1'}`}>
                        {forum.title}
                      </h3>
                      <p className={`text-xs text-gray-500 ${isList ? 'line-clamp-1' : 'line-clamp-2'}`}>
                        {forum.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className={`flex items-center text-xs font-semibold text-rio-blue ${isList ? 'shrink-0' : 'mt-2'}`}>
                    {isList ? <ChevronRight className="w-4 h-4" /> : (
                      <>
                        Ver detalhes <ChevronRight className="w-3 h-3 ml-1" />
                      </>
                    )}
                  </div>
                </div>
              );
            })}
         </div>
      </div>

      <hr className="border-gray-200 mb-12" />

      {/* SEÇÃO 2: CATÁLOGO DE BENEFÍCIOS */}
      <div id="catalog-section">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
           <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 text-gray-600 rounded-lg">
                 <LayoutGrid className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Catálogo de Benefícios & Conquistas</h2>
           </div>

           <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-gray-500 hidden md:inline">Filtrar:</span>
              
              {/* Category Dropdown (Replacing Tabs visually or complementing them) */}
              <div className="relative">
                <select 
                   value={selectedCategory}
                   onChange={(e) => setSelectedCategory(e.target.value as any)}
                   className="appearance-none bg-white border border-gray-200 text-gray-700 py-1.5 pl-3 pr-8 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-rio-blue cursor-pointer"
                >
                   <option value="Todos">Todas as Categorias</option>
                   {availableCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
                <Filter className="w-4 h-4 text-gray-400 absolute right-2.5 top-2 pointer-events-none" />
              </div>

              <div className="w-px h-6 bg-gray-300 mx-1 hidden md:block"></div>

              <button 
                onClick={toggleSort}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
              >
                {sortOrder === 'az' ? <ArrowDownAZ className="w-4 h-4" /> : <ArrowUpAZ className="w-4 h-4" />}
              </button>

              <button 
                onClick={toggleViewMode}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
                title="Mudar Visualização"
              >
                {viewMode === 'grid' ? <List className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
              </button>
            </div>
        </div>

        {/* Catalog Grid */}
        <div className={`
          ${viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
            : 'flex flex-col gap-4'}
          mb-12
        `}>
          {sortedCatalogBenefits.map((benefit) => (
            <BenefitCard 
              key={benefit.id} 
              benefit={benefit} 
              onDetails={handleViewDetails}
              onUse={handleUseBenefit}
              layout={viewMode}
            />
          ))}
        </div>
        
        {/* Empty State */}
        {sortedCatalogBenefits.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200 mb-12">
            <p className="text-gray-500">Nenhum benefício encontrado nesta categoria.</p>
            <button 
               onClick={() => setSelectedCategory('Todos')}
               className="mt-2 text-rio-blue hover:underline text-sm font-medium"
            >
               Ver todos os benefícios
            </button>
          </div>
        )}
      </div>

      {/* SEÇÃO 3: LISTA COMPLEMENTAR */}
      {selectedCategory === 'Todos' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 animate-fade-in mt-8">
          <h2 className="text-lg font-bold text-gray-800 mb-6 pb-2 border-b border-gray-100">
            Mais Vantagens Institucionais
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {OTHER_BENEFITS_LIST.sort().map((item, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <span className="text-gray-700 font-medium text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Interactive Elements */}
      
      {isCalendarOpen && (
        <CalendarModal onClose={() => setIsCalendarOpen(false)} />
      )}

      {serviceRequestBenefit && (
        <ServiceRequestModal 
          benefit={serviceRequestBenefit}
          onClose={() => setServiceRequestBenefit(null)}
        />
      )}

      {showInteractiveTutorial && (
        <InteractiveTutorial onClose={() => setShowInteractiveTutorial(false)} />
      )}
      
      <AiAssistant />
    </Layout>
  );
};

export default Dashboard;
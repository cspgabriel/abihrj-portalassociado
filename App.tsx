












import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import BenefitCard from './components/BenefitCard';
// BenefitModal replaced by BenefitPage
import BenefitPage from './components/BenefitPage';
import PlatformTutorial from './components/PlatformTutorial';
import InteractiveTutorial from './components/InteractiveTutorial'; // Importar novo componente
import CalendarModal from './components/CalendarModal';
import ServiceRequestModal from './components/ServiceRequestModal';
import CalculatorModal from './components/CalculatorModal'; // New Component
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
import ModernDashboard from './components/ModernDashboard'; // New Modern Layout
import RockInRioPage from './components/RockInRioPage'; // New Rock in Rio Page
import CalculatorsPage from './components/CalculatorsPage'; // New Page
import CategoryListingPage from './components/CategoryListingPage'; // New Page
import AllBenefitsPage from './components/AllBenefitsPage'; // New Page
import ServiceViewerPage from './components/ServiceViewerPage'; // New Iframe Viewer
import BenefitCategorizerPage from './components/BenefitCategorizerPage'; // New Categorizer Tool
import CoursesPage from './components/CoursesPage'; // New Courses 2.0 Page
import { User, Benefit, BenefitCategory, Forum, UserGamificationProfile, HotelSector } from './types';
import { BENEFITS_DATA, OTHER_BENEFITS_LIST, FORUMS_DATA, COMMUNITY_ITEMS_DATA, LEVEL_THRESHOLDS, XP_REWARDS, GAMIFICATION_BADGES, NEWS_ITEMS } from './constants';
import { Building2, CheckCircle2, Lock, Loader2, AlertCircle, ArrowLeft, Laptop2, LayoutGrid, Users, Calendar, MessageCircle, Phone, UserCog, CloudSun, Sun, CloudRain, Filter, ArrowDownAZ, ArrowUpAZ, Star, ChevronDown, ChevronRight, List, Grid, LayoutTemplate, Gift, ArrowRight, ChevronLeft, Newspaper, ExternalLink, Calculator, TrendingUp, Search } from 'lucide-react';
import { authService } from './services/authService';
import * as Icons from 'lucide-react';

// --- Types for View Management ---
type AppView = 'DASHBOARD' | 'BENEFIT_DETAILS' | 'TUTORIAL' | 'CONTACTS' | 'WHATSAPP_GROUPS' | 'ASSOCIATION_EVENTS' | 'LAWS_REGULATIONS' | 'SECURITY_PAGE' | 'REGISTRATION_UPDATE' | 'FORUM_PAGE' | 'FORUMS_OVERVIEW' | 'ROCK_IN_RIO' | 'CALCULATORS_PAGE' | 'CATEGORY_LISTING' | 'ALL_BENEFITS' | 'SERVICE_VIEWER' | 'CATEGORIZER' | 'COURSES_V2';

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
      let loggedUser: User;
      
      if (isRegistering) {
        // Fluxo de Cadastro
        if (!name || !hotel || !role) {
          throw new Error("Por favor, preencha todos os campos.");
        }
        loggedUser = await authService.register(email, password, name, hotel, role);
      } else {
        // Fluxo de Login
        loggedUser = await authService.login(email, password);
      }

      // CORREÇÃO: Forçar atualização imediata do estado se o login retornar um usuário
      if (loggedUser) {
        onLogin(loggedUser);
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
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg flex items-center gap-2 animate-pulse">
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
  const [layoutMode, setLayoutMode] = useState<'CLASSIC' | 'MODERN'>('CLASSIC'); // Default to classic based on user preference

  // View State Management
  const [currentView, setCurrentView] = useState<AppView>('DASHBOARD');
  const [selectedBenefitForDetails, setSelectedBenefitForDetails] = useState<Benefit | null>(null);
  const [selectedForum, setSelectedForum] = useState<Forum | null>(null);
  const [selectedSuperCategory, setSelectedSuperCategory] = useState<string>('');
  
  // Catalog Filter State (Unified)
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos'); // Changed type to string to match Layout prop
  
  // Main Grid Filter State (Unified)
  const [quickAccessCategory, setQuickAccessCategory] = useState<BenefitCategory | 'Todos'>('Todos');
  const [quickAccessViewMode, setQuickAccessViewMode] = useState<'grid' | 'list'>('grid');
  const [quickAccessSortOrder, setQuickAccessSortOrder] = useState<'az' | 'za'>('az');
  const [quickAccessSearchTerm, setQuickAccessSearchTerm] = useState(''); // New Search State

  // Community Filter State
  const [communityViewMode, setCommunityViewMode] = useState<'grid' | 'list'>('grid');
  const [communitySortOrder, setCommunitySortOrder] = useState<'az' | 'za'>('az');

  // Forums Section Filter State
  const [forumsViewMode, setForumsViewMode] = useState<'grid' | 'list'>('grid');
  const [forumsSortOrder, setForumsSortOrder] = useState<'az' | 'za'>('az');
  
  // Functional Modals State
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [serviceRequestBenefit, setServiceRequestBenefit] = useState<Benefit | null>(null);
  const [calculatorBenefit, setCalculatorBenefit] = useState<Benefit | null>(null); // State for Calculator Modal
  
  // Tutorial State
  const [showInteractiveTutorial, setShowInteractiveTutorial] = useState(false);

  const [checkingSession, setCheckingSession] = useState(true);

  // Slider State (Classic View)
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Date Logic
  const today = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // URL Parameter Check for Special Views (Categorizer)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const viewParam = params.get('view');
    // Support both "categorizer" and "categorize"
    if (viewParam === 'categorizer' || viewParam === 'categorize') {
       setCurrentView('CATEGORIZER');
    }
  }, []);

  // Check for existing session on load using Firebase Real Listener
  useEffect(() => {
    let timeoutId: any;
    
    const unsubscribe = authService.subscribeToAuthChanges((currentUser) => {
      if (currentUser) {
        // Init Gamification if missing
        const storedGamification = localStorage.getItem('rio_gamification');
        let profile = currentUser.gamification;

        if (storedGamification) {
           profile = JSON.parse(storedGamification);
        } else if (!profile) {
           profile = {
             xp: 0,
             level: 'BRONZE',
             streak: 1,
             lastLoginDate: new Date().toISOString(),
             badges: [],
             completedActions: []
           };
        }

        // --- STREAK CALCULATION LOGIC ---
        if (profile) {
            const lastLogin = new Date(profile.lastLoginDate);
            const now = new Date();
            
            // Zerar horas para comparar apenas dias
            const lastDate = new Date(lastLogin.getFullYear(), lastLogin.getMonth(), lastLogin.getDate());
            const todayDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            
            const diffTime = Math.abs(todayDate.getTime() - lastDate.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

            if (diffDays === 1) {
                // Login consecutivo, aumenta streak
                profile.streak += 1;
                profile.lastLoginDate = now.toISOString();
            } else if (diffDays > 1) {
                // Quebrou a streak, reseta
                profile.streak = 1;
                profile.lastLoginDate = now.toISOString();
            } else {
                // Mesmo dia, apenas atualiza hora se necessário
                profile.lastLoginDate = now.toISOString();
            }

            // Check First Login Badge
            if (!profile.badges.includes('badge-first-login')) {
                profile.badges.push('badge-first-login');
                profile.xp += 10;
            }

            currentUser.gamification = profile;
            localStorage.setItem('rio_gamification', JSON.stringify(profile));
        }
      }
      setUser(currentUser);
      setCheckingSession(false);
      if (timeoutId) clearTimeout(timeoutId);
    });

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
    try {
      await authService.logout();
    } catch (error) {
      console.error("Erro ao sair:", error);
    } finally {
      // Force UI Update Immediately to avoid stuck state
      setUser(null);
      setCurrentView('DASHBOARD');
      // Limpa dados sensíveis da view
      setSelectedBenefitForDetails(null);
      setSelectedForum(null);
    }
  };

  // --- GAMIFICATION LOGIC ---
  const awardXP = (amount: number, actionId: string) => {
    if (!user || !user.gamification) return;
    
    const newXP = user.gamification.xp + amount;
    
    // Calculate new Level
    let newLevel: UserGamificationProfile['level'] = 'BRONZE';
    if (newXP >= LEVEL_THRESHOLDS.MASTER) newLevel = 'MASTER';
    else if (newXP >= LEVEL_THRESHOLDS.DIAMOND) newLevel = 'DIAMOND';
    else if (newXP >= LEVEL_THRESHOLDS.GOLD) newLevel = 'GOLD';
    else if (newXP >= LEVEL_THRESHOLDS.SILVER) newLevel = 'SILVER';

    // Badge Check Logic
    const currentBadges = [...user.gamification.badges];
    
    // Check Explorer Badge
    const uniqueActions = new Set([...user.gamification.completedActions, actionId]);
    if (uniqueActions.size >= 5 && !currentBadges.includes('badge-explorer')) {
        currentBadges.push('badge-explorer');
    }
    
    // Check Legend Badge
    if (newLevel === 'MASTER' && !currentBadges.includes('badge-legend')) {
        currentBadges.push('badge-legend');
    }

    const updatedProfile: UserGamificationProfile = {
       ...user.gamification,
       xp: newXP,
       level: newLevel,
       badges: currentBadges,
       completedActions: [...user.gamification.completedActions, actionId]
    };

    const updatedUser = { ...user, gamification: updatedProfile };
    setUser(updatedUser);
    localStorage.setItem('rio_gamification', JSON.stringify(updatedProfile));
  };

  // --- ACTIONS ---
  
  const handleNavigate = (view: AppView, params?: any) => {
    if (view === 'TUTORIAL') {
        // Agora o botão de tutorial abre o interativo se estiver no Dashboard, ou a página estática se não
        setShowInteractiveTutorial(true);
    } else if (view === 'CATEGORY_LISTING') {
        setSelectedSuperCategory(params);
        setCurrentView(view);
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
    awardXP(XP_REWARDS.VIEW_DETAILS, `view-${benefit.id}`);

    if (benefit.id === 'calculators-hub') {
      setCurrentView('CALCULATORS_PAGE');
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

    if (benefit.id === 'highlight-rir') {
      setCurrentView('ROCK_IN_RIO');
      return;
    }

    if (benefit.id === 'courses-v2') {
      setCurrentView('COURSES_V2');
      return;
    }
    
    if (benefit.category === BenefitCategory.TOOLS && benefit.id.startsWith('calc-')) {
       // Also allow opening modal from details view for calculators if clicked via card
       setCalculatorBenefit(benefit);
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
    awardXP(XP_REWARDS.USE_BENEFIT, `use-${benefit.id}`);

    if (benefit.id === 'calculators-hub') {
      setCurrentView('CALCULATORS_PAGE');
      return;
    }

    if (benefit.id === 'courses-v2') {
      setCurrentView('COURSES_V2');
      return;
    }

    // CALCULATORS LOGIC
    if (benefit.category === BenefitCategory.TOOLS && benefit.id.startsWith('calc-')) {
        setCalculatorBenefit(benefit);
        return;
    }

    // 0. Download de Arquivos
    if (benefit.downloadUrl) {
      // Abre o link em nova aba, iniciando o download
      window.open(benefit.downloadUrl, '_blank');
      return;
    }

    // 1. IFRAME/EMBED LOGIC (New Strategy: Open inside app if possible)
    // Se tiver embedUrl ou for dashboard, tentamos abrir no ServiceViewer
    // Se for link externo genérico e quisermos forçar o visualizador, usamos também
    if (benefit.embedUrl || benefit.dashboardUrl || (benefit.isService && benefit.externalLink && !benefit.externalLink.includes('forms.gle'))) { // Forms Google sometimes break in iframe if not embed link
        setSelectedBenefitForDetails(benefit); // We abuse this state for viewer too or add new one
        // IMPORTANT: We need to set the state for the viewer component
        // Using existing state or creating new one? Let's use setSelectedBenefitForDetails for simplicity or create a new selectedBenefitForViewer
        setSelectedBenefitForDetails(benefit);
        setCurrentView('SERVICE_VIEWER');
        return;
    }

    // 1b. Links Externos Fallback (Se não for embeddable ou se preferirmos abrir fora)
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

    if (benefit.id === 'highlight-rir') {
      setCurrentView('ROCK_IN_RIO');
      return;
    }

    // 3. Padrão: Abre página de detalhes
    handleViewDetails(benefit);
  };

  const handleBackToDashboard = () => {
    setCurrentView('DASHBOARD');
    setSelectedBenefitForDetails(null);
    setSelectedForum(null);
    setSelectedSuperCategory('');
    
    // Clean URL if exiting special view
    const url = new URL(window.location.href);
    if (url.searchParams.has('view')) {
       url.searchParams.delete('view');
       window.history.replaceState({}, '', url);
    }
  };

  const handleOpenPublicOrderModal = () => {
    // Manually trigger the modal for public order
    const publicOrderBenefit = BENEFITS_DATA.find(b => b.id === 'public-order-01');
    if (publicOrderBenefit) {
      setServiceRequestBenefit(publicOrderBenefit);
    }
  };

  const handleOpenCalculatorsPage = () => {
      setCurrentView('CALCULATORS_PAGE');
  };

  // --- FILTER & SORT LOGIC ---
  
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

  // 1. UNIFIED MAIN GRID (MERGED CATALOG & SERVICES)
  const allBenefits = BENEFITS_DATA
    .filter(b => !b.id.startsWith('calc-') || b.id === 'calculators-hub') // Ensure individual calcs are hidden, hub is shown
    .filter(b => quickAccessCategory === 'Todos' || b.category === quickAccessCategory)
    .filter(b => 
      quickAccessSearchTerm === '' ||
      b.title.toLowerCase().includes(quickAccessSearchTerm.toLowerCase()) || 
      b.description.toLowerCase().includes(quickAccessSearchTerm.toLowerCase())
    );
  
  const sortedAllBenefits = getSortedData(allBenefits, quickAccessSortOrder);
  
  // 1b. Calculators Section
  const calculatorBenefits = BENEFITS_DATA.filter(b => b.category === BenefitCategory.TOOLS && b.id.startsWith('calc-'));

  // 3. Community Items
  const sortedCommunityItems = getSortedData(COMMUNITY_ITEMS_DATA, communitySortOrder);

  // 4. Forums
  const sortedForums = getSortedData(FORUMS_DATA, forumsSortOrder);

  // Get unique categories for dropdowns
  const availableCategories = Object.values(BenefitCategory);

  // --- SLIDER LOGIC ---
  const highlightIds = [
      'calendar-2026',
      'highlight-top-hotel-25',
      'natal-2025', 
      'highlight-drinks', 
      'portal-fornecedores-new'
  ];
  
  const highlightSlides = highlightIds
    .map(id => BENEFITS_DATA.find(b => b.id === id))
    .filter(Boolean) as Benefit[];

  // No longer use automatic full width rotation for Classic, but we keep state for potential future use or mobile
  useEffect(() => {
    if (highlightSlides.length <= 1) return;
    const interval = setInterval(() => {
        setCurrentSlideIndex((prev) => (prev + 1) % highlightSlides.length);
    }, 5000); 
    return () => clearInterval(interval);
  }, [highlightSlides.length]);

  const nextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % highlightSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + highlightSlides.length) % highlightSlides.length);
  };

  const getSlideGradient = (id: string) => {
      switch (id) {
          case 'calendar-2026': return 'from-indigo-600 to-purple-800 border-indigo-500/50';
          case 'highlight-top-hotel-25': return 'from-yellow-500 to-amber-600 border-yellow-600/50';
          case 'natal-2025': return 'from-red-700 to-red-900 border-red-800/50';
          case 'highlight-drinks': return 'from-blue-700 to-slate-800 border-blue-800/50';
          case 'highlight-rir': return 'from-purple-900 to-black border-purple-800/50';
          case 'highlight-job-fair': return 'from-green-700 to-teal-900 border-green-800/50';
          case 'portal-fornecedores-new': return 'from-orange-600 to-amber-700 border-orange-600/50';
          default: return 'from-gray-700 to-gray-900 border-gray-600/50';
      }
  };

  const getSlideAccentColor = (id: string) => {
      switch (id) {
          case 'calendar-2026': return 'text-indigo-200 bg-indigo-900 text-white';
          case 'highlight-top-hotel-25': return 'text-yellow-900 bg-white text-yellow-900';
          case 'natal-2025': return 'text-yellow-300 bg-yellow-400 text-red-900';
          case 'highlight-drinks': return 'text-cyan-300 bg-cyan-400 text-blue-900';
          case 'highlight-rir': return 'text-pink-400 bg-pink-500 text-white';
          case 'highlight-job-fair': return 'text-green-300 bg-green-400 text-green-900';
          case 'portal-fornecedores-new': return 'text-orange-900 bg-white text-orange-900';
          default: return 'text-white bg-gray-500 text-white';
      }
  };

  if (checkingSession) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 flex-col gap-4">
        <Loader2 className="w-10 h-10 text-rio-blue animate-spin" />
        <p className="text-gray-500 text-sm">Carregando Central do Associado...</p>
      </div>
    );
  }

  // Handle CATEGORIZER View (Accessible without login if via direct link, or with login)
  if (currentView === 'CATEGORIZER') {
     return <BenefitCategorizerPage onBack={handleBackToDashboard} />;
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
    onBenefitClick: handleUseBenefit, // Updated to use UseBenefit which routes to viewer if applicable
    onForumClick: handleForumClick, // Pass down to MegaMenu
    onCategorySelect: (cat: string) => setSelectedCategory(cat), // New handler
    onSectorSelect: (sector: HotelSector) => {
        // Implement logic to filter All Benefits by Sector and switch view
        console.log("Sector selected", sector);
    },
    currentView,
    selectedCategory,
    isFullPage: currentView === 'SERVICE_VIEWER' || currentView === 'COURSES_V2'
  };

  // Wrap all non-dashboard views with standard layout logic
  if (currentView !== 'DASHBOARD') {
    return (
        <Layout {...commonLayoutProps}>
            {currentView === 'COURSES_V2' && (
                <CoursesPage onBack={handleBackToDashboard} />
            )}
            {currentView === 'SERVICE_VIEWER' && selectedBenefitForDetails && (
                <ServiceViewerPage 
                    benefit={selectedBenefitForDetails}
                    onBack={handleBackToDashboard}
                />
            )}
            {currentView === 'ALL_BENEFITS' && (
                <AllBenefitsPage 
                    onBack={handleBackToDashboard}
                    onUse={handleUseBenefit}
                    onDetails={handleViewDetails}
                />
            )}
            {currentView === 'CATEGORY_LISTING' && (
                <CategoryListingPage 
                    categoryId={selectedSuperCategory}
                    onBack={handleBackToDashboard}
                    onUse={handleUseBenefit}
                    onDetails={handleViewDetails}
                />
            )}
            {currentView === 'CALCULATORS_PAGE' && (
                <>
                <CalculatorsPage 
                    onBack={handleBackToDashboard} 
                    onOpenCalculator={(benefit) => setCalculatorBenefit(benefit)}
                />
                {calculatorBenefit && (
                  <CalculatorModal 
                    benefit={calculatorBenefit}
                    onClose={() => setCalculatorBenefit(null)}
                  />
                )}
                </>
            )}
            {currentView === 'ROCK_IN_RIO' && (
                <RockInRioPage onBack={handleBackToDashboard} />
            )}
            {currentView === 'FORUM_PAGE' && selectedForum && (
                <ForumPage 
                    forum={selectedForum} 
                    onBack={handleBackToDashboard}
                    onRegisterUpdate={() => setCurrentView('REGISTRATION_UPDATE')}
                />
            )}
            {currentView === 'FORUMS_OVERVIEW' && (
                 <ForumsOverviewPage 
                    onBack={handleBackToDashboard}
                    onForumClick={handleForumClick}
                 />
            )}
            {currentView === 'REGISTRATION_UPDATE' && (
                <RegistrationUpdatePage onBack={handleBackToDashboard} />
            )}
            {currentView === 'LAWS_REGULATIONS' && (
                <LawsRegulationPage onBack={handleBackToDashboard} />
            )}
            {currentView === 'SECURITY_PAGE' && (
                <>
                <SecurityPage onBack={handleBackToDashboard} onReport={handleOpenPublicOrderModal} />
                {serviceRequestBenefit && (
                  <ServiceRequestModal 
                    benefit={serviceRequestBenefit}
                    onClose={() => setServiceRequestBenefit(null)}
                  />
                )}
                </>
            )}
            {currentView === 'TUTORIAL' && (
                <PlatformTutorial onBack={handleBackToDashboard} />
            )}
            {currentView === 'CONTACTS' && (
                <ContactsPage onBack={handleBackToDashboard} />
            )}
            {currentView === 'WHATSAPP_GROUPS' && (
                <WhatsAppGroupsPage onBack={handleBackToDashboard} />
            )}
            {currentView === 'ASSOCIATION_EVENTS' && (
                <AssociationEventsPage onBack={handleBackToDashboard} />
            )}
            {currentView === 'BENEFIT_DETAILS' && selectedBenefitForDetails && (
                 <>
                 <BenefitPage 
                    benefit={selectedBenefitForDetails}
                    onBack={handleBackToDashboard}
                    onUse={handleUseBenefit}
                 />
                 {isCalendarOpen && <CalendarModal onClose={() => setIsCalendarOpen(false)} />}
                 {serviceRequestBenefit && (
                   <ServiceRequestModal 
                     benefit={serviceRequestBenefit}
                     onClose={() => setServiceRequestBenefit(null)}
                   />
                 )}
                 {/* Calculator Modal not needed here as it's a direct service, but could be */}
                 </>
            )}
            <AiAssistant />
        </Layout>
    );
  }

  // VIEW PADRÃO: DASHBOARD (COM TOGGLE DE LAYOUT)
  return (
    <Layout {...commonLayoutProps}>
      
      {/* Layout Toggle Button */}
      <div className="flex justify-end mb-4">
          <button 
             onClick={() => setLayoutMode(prev => prev === 'CLASSIC' ? 'MODERN' : 'CLASSIC')}
             className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
             <LayoutTemplate className="w-4 h-4 text-rio-blue" />
             {layoutMode === 'CLASSIC' ? 'Mudar para Visual Moderno' : 'Mudar para Visual Clássico'}
          </button>
      </div>

      {layoutMode === 'MODERN' ? (
          <ModernDashboard 
             user={user} 
             onUseBenefit={handleUseBenefit} 
             onViewDetails={handleViewDetails} 
          />
      ) : (
      <>
      {/* CLASSIC HERO */}
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

      {/* HIGHLIGHT SLIDER (CLASSIC VIEW) - CHANGED TO 3 COLUMN GRID */}
      {highlightSlides.length > 0 && (
          <div className="mb-12 relative group animate-fade-in">
             <div className="flex items-center justify-between mb-4">
               <div className="flex items-center gap-3">
                   <div className="p-2 bg-yellow-100 text-yellow-700 rounded-lg">
                      <Star className="w-5 h-5" />
                   </div>
                   <h2 className="text-xl font-bold text-gray-800">Destaques para Você</h2>
               </div>
             </div>

             <div className="relative">
                {/* Navigation Arrows */}
                <button 
                  onClick={prevSlide}
                  className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 shadow-md text-gray-700 p-2 rounded-full hover:bg-white hover:text-rio-blue transition-all border border-gray-100 opacity-0 group-hover:opacity-100"
                  aria-label="Anterior"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[0, 1, 2].map((offset) => {
                    // Calculate index to display 3 distinct items wrapping around array
                    const slideIndex = (currentSlideIndex + offset) % highlightSlides.length;
                    const slide = highlightSlides[slideIndex];
                    
                    const IconComponent = (Icons as any)[slide.iconName] || Icons.HelpCircle;
                    const gradientClass = getSlideGradient(slide.id);
                    const accentClass = getSlideAccentColor(slide.id).split(' '); // [text, bg, badgeText]

                    return (
                        <div 
                            key={`${slide.id}-${offset}`}
                            className={`bg-gradient-to-r ${gradientClass} rounded-2xl p-6 shadow-lg relative overflow-hidden flex flex-col items-start gap-4 border transition-all duration-500 hover:scale-[1.02] cursor-pointer h-full`}
                            onClick={() => handleUseBenefit(slide)}
                        >
                            {/* Decorations */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-8 -mt-8 pointer-events-none" />

                            {/* Icon */}
                            <div className="bg-white/10 p-3 rounded-full backdrop-blur-sm shrink-0 border border-white/20 shadow-inner">
                                <IconComponent className={`w-8 h-8 ${accentClass[0]}`} />
                            </div>

                            {/* Text */}
                            <div className="flex-1 text-left z-10 w-full">
                                <div className={`inline-block ${accentClass[1]} ${accentClass[2]} text-[10px] font-bold px-2 py-0.5 rounded-full mb-2 uppercase tracking-wide shadow-sm`}>
                                    Novidade
                                </div>
                                <h2 className="text-xl font-bold text-white mb-2 leading-tight">{slide.title}</h2>
                                <p className="text-white/80 text-sm line-clamp-2">{slide.description}</p>
                            </div>

                            {/* Action */}
                            <button className="w-full bg-white text-gray-800 font-bold py-2.5 px-4 rounded-xl shadow-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 whitespace-nowrap z-10 text-sm">
                                {slide.customCta || "Inscreva-se"}
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    );
                  })}
                </div>

                <button 
                  onClick={nextSlide}
                  className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 shadow-md text-gray-700 p-2 rounded-full hover:bg-white hover:text-rio-blue transition-all border border-gray-100 opacity-0 group-hover:opacity-100"
                  aria-label="Próximo"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
             </div>
             
             {/* Slider Indicators */}
             <div className="flex justify-center gap-2 mt-4">
                {highlightSlides.map((_, idx) => (
                    <button 
                        key={idx}
                        onClick={() => setCurrentSlideIndex(idx)}
                        className={`w-2 h-2 rounded-full transition-all ${idx === currentSlideIndex ? 'bg-rio-blue w-6' : 'bg-gray-300 hover:bg-gray-400'}`}
                    />
                ))}
             </div>
          </div>
      )}

      {/* SEÇÃO 1: SERVIÇOS E BENEFÍCIOS (Merged Grid) */}
      <div id="quick-access-section" className="mb-12">
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
               <div className="p-2 bg-blue-100 text-rio-blue rounded-lg">
                  <Laptop2 className="w-6 h-6" />
               </div>
               <h2 className="text-xl font-bold text-gray-800">Serviços e Benefícios</h2>
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-gray-500 hidden md:inline">Filtrar:</span>
              
              {/* Pesquisa Rápida (New) */}
              <div className="relative group">
                  <input
                    type="text"
                    placeholder="Pesquisar..."
                    value={quickAccessSearchTerm}
                    onChange={(e) => setQuickAccessSearchTerm(e.target.value)}
                    className="pl-9 pr-4 py-1.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-rio-blue focus:border-transparent outline-none w-40 focus:w-64 transition-all"
                  />
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>

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
             ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5' 
             : 'flex flex-col gap-3'}
         `}>
            {sortedAllBenefits.length > 0 ? (
                sortedAllBenefits.map(benefit => (
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
                    Nenhum benefício encontrado com esse termo.
                </div>
            )}
         </div>
      </div>

      {/* BANNER CALCULADORAS (Moved from Grid to Banner) */}
      <div 
        id="calculators-banner" 
        className="mb-12 bg-gradient-to-r from-emerald-600 to-teal-800 rounded-2xl p-8 shadow-lg text-white flex flex-col md:flex-row items-center justify-between gap-6 cursor-pointer transform transition-transform hover:scale-[1.01]"
        onClick={handleOpenCalculatorsPage}
      >
          <div className="flex items-center gap-6">
              <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm shadow-inner">
                  <Calculator className="w-10 h-10 text-yellow-300" />
              </div>
              <div>
                  <h2 className="text-2xl font-bold mb-1">Calculadoras HoteisRio</h2>
                  <p className="text-emerald-100 text-lg">
                      RevPAR, ADR, GOPPAR e mais. Acesse todas as ferramentas financeiras em um só lugar.
                  </p>
              </div>
          </div>
          <button className="bg-white text-emerald-800 font-bold py-3 px-6 rounded-xl shadow-lg hover:bg-emerald-50 transition-colors flex items-center gap-2 whitespace-nowrap">
              Acessar Calculadoras
              <ArrowRight className="w-5 h-5" />
          </button>
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

      {/* SEÇÃO 3: LISTA COMPLEMENTAR */}
      {selectedCategory === 'Todos' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 animate-fade-in mt-8 mb-12">
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

      </>
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
      
      {/* CALCULATOR MODAL */}
      {calculatorBenefit && (
        <CalculatorModal 
          benefit={calculatorBenefit}
          onClose={() => setCalculatorBenefit(null)}
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

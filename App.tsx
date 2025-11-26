import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import BenefitCard from './components/BenefitCard';
// BenefitModal replaced by BenefitPage
import BenefitPage from './components/BenefitPage';
import PlatformTutorial from './components/PlatformTutorial';
import CalendarModal from './components/CalendarModal';
import ServiceRequestModal from './components/ServiceRequestModal';
import AiAssistant from './components/AiAssistant';
import ContactsPage from './components/ContactsPage';
import WhatsAppGroupsPage from './components/WhatsAppGroupsPage';
import AssociationEventsPage from './components/AssociationEventsPage';
import { User, Benefit, BenefitCategory } from './types';
import { BENEFITS_DATA, OTHER_BENEFITS_LIST } from './constants';
import { Building2, CheckCircle2, Lock, Loader2, AlertCircle, ArrowLeft, Laptop2, LayoutGrid, Users, Calendar, MessageCircle, Phone } from 'lucide-react';
import { authService } from './services/authService';

// --- Types for View Management ---
type AppView = 'DASHBOARD' | 'BENEFIT_DETAILS' | 'TUTORIAL' | 'CONTACTS' | 'WHATSAPP_GROUPS' | 'ASSOCIATION_EVENTS';

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
  
  // Catalog Filter State
  const [selectedCategory, setSelectedCategory] = useState<BenefitCategory | 'Todos'>('Todos');
  
  // Functional Modals State
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [serviceRequestBenefit, setServiceRequestBenefit] = useState<Benefit | null>(null);
  
  const [checkingSession, setCheckingSession] = useState(true);

  // Check for existing session on load using Firebase Real Listener
  useEffect(() => {
    const unsubscribe = authService.subscribeToAuthChanges((currentUser) => {
      setUser(currentUser);
      setCheckingSession(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await authService.logout();
    // Listener updates user state
  };

  // --- ACTIONS ---
  
  const handleNavigate = (view: AppView) => {
    setCurrentView(view);
    // Reset selection if moving away from details
    if (view !== 'BENEFIT_DETAILS') {
      setSelectedBenefitForDetails(null);
    }
  };

  // Botão "Utilizar": Executa a ação direta (Modal de serviço, Calendário, etc.)
  const handleUseBenefit = (benefit: Benefit) => {
    if (benefit.id === 'calendar-01') {
      setIsCalendarOpen(true);
    } else if (benefit.id === 'juridico-01' || benefit.id === 'public-order-01') {
      setServiceRequestBenefit(benefit);
    } else {
      // Se não tem ação direta implementada, abre os detalhes/tutorial do benefício
      handleViewDetails(benefit);
    }
  };

  // Botão "Detalhes": Navega para a página de explicação do benefício
  const handleViewDetails = (benefit: Benefit) => {
    setSelectedBenefitForDetails(benefit);
    setCurrentView('BENEFIT_DETAILS');
  };

  const handleBackToDashboard = () => {
    setCurrentView('DASHBOARD');
    setSelectedBenefitForDetails(null);
  };

  // --- FILTER LOGIC ---
  const serviceBenefits = BENEFITS_DATA.filter(b => b.isService === true);
  const filteredCatalogBenefits = BENEFITS_DATA.filter(b => 
    b.isService !== true && (selectedCategory === 'Todos' || b.category === selectedCategory)
  );

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
    currentView
  };

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
        {/* Modais funcionais globais também acessíveis daqui */}
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
      <div className="bg-gradient-to-r from-rio-blue to-blue-800 rounded-2xl p-8 mb-10 shadow-lg text-white flex flex-col md:flex-row items-center justify-between gap-6 animate-fade-in relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-16 -mt-16 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full -ml-10 -mb-10 pointer-events-none" />
        
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Central do Associado</h1>
          <p className="text-blue-100 max-w-xl text-lg">
            Bem-vindo, {user.name.split(' ')[0]}. Acesse abaixo as ferramentas de gestão do seu hotel.
          </p>
        </div>
      </div>

      {/* SEÇÃO 1: SERVIÇOS ONLINE (Acesso Rápido) */}
      <div className="mb-12">
         <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-100 text-rio-blue rounded-lg">
               <Laptop2 className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Acesso Rápido aos Serviços</h2>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {serviceBenefits.map(benefit => (
               <BenefitCard 
                 key={benefit.id}
                 benefit={benefit}
                 onDetails={handleViewDetails}
                 onUse={handleUseBenefit}
               />
            ))}
         </div>
      </div>

      {/* SEÇÃO EXTRA: COMUNIDADE & CONEXÃO (Novos Cards) */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
               <Users className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Comunidade & Conexão</h2>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card: Contatos */}
            <div 
              onClick={() => handleNavigate('CONTACTS')}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg border border-gray-100 cursor-pointer group transition-all"
            >
               <div className="w-12 h-12 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center mb-4 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                 <Phone className="w-6 h-6" />
               </div>
               <h3 className="font-bold text-lg text-gray-800 mb-1 group-hover:text-orange-600">Fale Conosco</h3>
               <p className="text-sm text-gray-500">Contatos diretos das equipes jurídica, comercial e diretoria.</p>
            </div>

            {/* Card: Grupos WhatsApp */}
            <div 
              onClick={() => handleNavigate('WHATSAPP_GROUPS')}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg border border-gray-100 cursor-pointer group transition-all"
            >
               <div className="w-12 h-12 rounded-lg bg-green-50 text-green-600 flex items-center justify-center mb-4 group-hover:bg-green-600 group-hover:text-white transition-colors">
                 <MessageCircle className="w-6 h-6" />
               </div>
               <h3 className="font-bold text-lg text-gray-800 mb-1 group-hover:text-green-600">Grupos da Hotelaria</h3>
               <p className="text-sm text-gray-500">Links para entrar nos grupos oficiais de networking por setor.</p>
            </div>

            {/* Card: Agenda/Foruns */}
            <div 
              onClick={() => handleNavigate('ASSOCIATION_EVENTS')}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg border border-gray-100 cursor-pointer group transition-all"
            >
               <div className="w-12 h-12 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                 <Calendar className="w-6 h-6" />
               </div>
               <h3 className="font-bold text-lg text-gray-800 mb-1 group-hover:text-indigo-600">Agenda HoteisRio</h3>
               <p className="text-sm text-gray-500">Próximos fóruns, reuniões de diretoria e workshops.</p>
            </div>
         </div>
      </div>

      {/* Divider */}
      <hr className="border-gray-200 mb-12" />

      {/* SEÇÃO 2: CATÁLOGO DE BENEFÍCIOS */}
      <div>
        <div className="flex items-center justify-between gap-3 mb-6">
           <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 text-gray-600 rounded-lg">
                 <LayoutGrid className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Catálogo de Benefícios & Conquistas</h2>
           </div>
        </div>

        {/* Category Tabs */}
        <div className="mb-8 overflow-x-auto pb-1 scrollbar-hide">
          <div className="flex space-x-2 bg-gray-100 p-1.5 rounded-xl w-max">
            {['Todos', ...Object.values(BenefitCategory)].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat as any)}
                className={`
                  px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all
                  ${selectedCategory === cat 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'}
                `}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Catalog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {filteredCatalogBenefits.map((benefit) => (
            <BenefitCard 
              key={benefit.id} 
              benefit={benefit} 
              onDetails={handleViewDetails}
              onUse={handleUseBenefit}
            />
          ))}
        </div>
        
        {/* Empty State */}
        {filteredCatalogBenefits.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200 mb-12">
            <p className="text-gray-500">Nenhum benefício encontrado nesta categoria.</p>
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
            {OTHER_BENEFITS_LIST.map((item, index) => (
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
      
      <AiAssistant />
    </Layout>
  );
};

export default Dashboard;
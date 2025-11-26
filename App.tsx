import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import BenefitCard from './components/BenefitCard';
import BenefitModal from './components/BenefitModal';
import CalendarModal from './components/CalendarModal';
import ServiceRequestModal from './components/ServiceRequestModal';
import AiAssistant from './components/AiAssistant';
import { User, Benefit, BenefitCategory } from './types';
import { BENEFITS_DATA, OTHER_BENEFITS_LIST } from './constants';
import { Building2, CheckCircle2, Lock, Loader2, AlertCircle, ArrowLeft } from 'lucide-react';
import { authService } from './services/authService';

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
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=2670&auto=format&fit=crop")' }}>
      <div className="absolute inset-0 bg-blue-900/60 backdrop-blur-sm"></div>
      
      <div className="relative bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md animate-fade-in mx-4 my-8">
        <div className="text-center mb-6">
          <div className="bg-rio-blue w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg rotate-3">
             <Building2 className="text-white w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">
            {isRegistering ? 'Criar Nova Conta' : 'Portal do Associado'}
          </h1>
          <p className="text-gray-500 mt-2">HoteisRio</p>
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
                {isRegistering ? 'Cadastrando...' : 'Acessando...'}
              </>
            ) : (
              isRegistering ? 'Criar Conta' : 'Acessar Portal'
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
                Já tenho uma conta
               </>
             ) : (
               'Não tenho conta: Cadastrar agora'
             )}
           </button>
           
           {!isRegistering && (
             <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
               <Lock className="w-3 h-3" /> Ambiente Seguro v1.2
             </p>
           )}
        </div>
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<BenefitCategory | 'Todos'>('Todos');
  
  // Modals state
  const [selectedBenefit, setSelectedBenefit] = useState<Benefit | null>(null);
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
    // O listener vai setar user como null automaticamente
  };

  // 1. Ação para botão "Utilizar"
  const handleUseBenefit = (benefit: Benefit) => {
    if (benefit.id === 'calendar-01') {
      setIsCalendarOpen(true);
    } else if (benefit.id === 'juridico-01' || benefit.id === 'public-order-01') {
      setServiceRequestBenefit(benefit);
    } else {
      // Se não houver uma ação específica mapeada (link externo ou modal específico),
      // abrimos o modal de detalhes como fallback, pois ele tem o botão "Solicitar Uso".
      // Futuramente, isso pode ser um link externo direto na propriedade do benefício.
      setSelectedBenefit(benefit);
    }
  };

  // 2. Ação para botão "Detalhes" (Sempre abre o modal IA)
  const handleViewDetails = (benefit: Benefit) => {
    setSelectedBenefit(benefit);
  };

  const filteredBenefits = selectedCategory === 'Todos' 
    ? BENEFITS_DATA 
    : BENEFITS_DATA.filter(b => b.category === selectedCategory);

  if (checkingSession) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 flex-col gap-4">
        <Loader2 className="w-10 h-10 text-rio-blue animate-spin" />
        <p className="text-gray-500 text-sm">Conectando ao banco de dados...</p>
      </div>
    );
  }

  if (!user) {
    return <LoginScreen onLogin={setUser} />;
  }

  return (
    <Layout user={user} onLogout={handleLogout}>
      
      {/* Hero / Welcome Section */}
      <div className="bg-white rounded-2xl p-8 mb-8 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6 animate-fade-in">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Benefícios e Conquistas
          </h1>
          <p className="text-gray-600 mt-2 max-w-xl">
            Confira todas as vantagens de ser associado ao HotéisRIO para otimizar a <span className="font-semibold text-rio-blue">Gestão do seu hotel</span>.
          </p>
        </div>
        <div className="flex gap-4">
           <div className="text-center px-4 py-2 bg-blue-50 rounded-lg">
              <span className="block text-2xl font-bold text-rio-blue">12</span>
              <span className="text-xs text-gray-500 uppercase font-semibold">Benefícios Ativos</span>
           </div>
           <div className="text-center px-4 py-2 bg-yellow-50 rounded-lg">
              <span className="block text-2xl font-bold text-yellow-600">3</span>
              <span className="text-xs text-gray-500 uppercase font-semibold">Novidades</span>
           </div>
        </div>
      </div>

      {/* Category Filter - Styled as Tabs */}
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

      {/* Benefits Grid (Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {filteredBenefits.map((benefit) => (
          <BenefitCard 
            key={benefit.id} 
            benefit={benefit} 
            onDetails={handleViewDetails}
            onUse={handleUseBenefit}
          />
        ))}
      </div>
      
      {/* Empty State for Cards */}
      {filteredBenefits.length === 0 && (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200 mb-12">
          <p className="text-gray-500">Nenhum benefício encontrado nesta categoria.</p>
        </div>
      )}

      {/* NEW: Outros Benefícios Permanentes (List View) */}
      {selectedCategory === 'Todos' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 animate-fade-in">
          <h2 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-100">
            Outros Benefícios Permanentes
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
      <BenefitModal 
        benefit={selectedBenefit} 
        onClose={() => setSelectedBenefit(null)} 
      />
      
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
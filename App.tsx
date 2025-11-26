import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import BenefitCard from './components/BenefitCard';
import BenefitModal from './components/BenefitModal';
import CalendarModal from './components/CalendarModal';
import ServiceRequestModal from './components/ServiceRequestModal';
import AiAssistant from './components/AiAssistant';
import { User, Benefit, BenefitCategory } from './types';
import { BENEFITS_DATA } from './constants';
import { Building2, CheckCircle2, Lock, Loader2, AlertCircle } from 'lucide-react';
import { authService } from './services/authService';

// --- Components ---

const LoginScreen: React.FC<{ onLogin: (user: User) => void }> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const user = await authService.login(email, password);
      // O listener do useEffect no Dashboard vai capturar a mudança de estado
      // Mas chamamos onLogin para feedback imediato se necessário
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro ao tentar entrar.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=2670&auto=format&fit=crop")' }}>
      <div className="absolute inset-0 bg-blue-900/60 backdrop-blur-sm"></div>
      
      <div className="relative bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md animate-fade-in mx-4">
        <div className="text-center mb-8">
          <div className="bg-rio-blue w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg rotate-3">
             <Building2 className="text-white w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Portal do Associado</h1>
          <p className="text-gray-500 mt-2">HoteisRio</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
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
            />
          </div>
          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-rio-blue hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-md transition-all transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Acessando...
              </>
            ) : (
              'Acessar Portal'
            )}
          </button>
        </form>

        <div className="mt-4 flex flex-col items-center gap-4">
           <button 
             onClick={() => alert('Para criar uma conta, contate a administração do HoteisRio ou cadastre-se no Firebase Console.')}
             className="text-sm text-rio-blue hover:underline"
           >
             Não tenho conta
           </button>
           
           <div className="text-xs text-yellow-600 bg-yellow-50 p-3 rounded-lg w-full text-center border border-yellow-100">
             <p className="font-semibold mb-1">Atenção:</p>
             <p>Este sistema requer chaves do Firebase configuradas no arquivo <span className="font-mono">firebaseConfig.ts</span></p>
           </div>
           
           <p className="text-xs text-gray-400 flex items-center justify-center gap-1 mt-2">
             <Lock className="w-3 h-3" /> Ambiente Seguro v1.2
           </p>
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

  const handleBenefitClick = (benefit: Benefit) => {
    if (benefit.id === 'calendar-01') {
      setIsCalendarOpen(true);
    } else if (benefit.id === 'juridico-01' || benefit.id === 'public-order-01') {
      setServiceRequestBenefit(benefit);
    } else {
      setSelectedBenefit(benefit);
    }
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
            Olá, {user.name.split(' ')[0]}! 👋
          </h1>
          <p className="text-gray-600 mt-2 max-w-xl">
            Bem-vindo ao portal HoteisRio. Aqui você centraliza todos os recursos para otimizar a gestão do <span className="font-semibold text-rio-blue">{user.hotel}</span>.
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

      {/* Category Filter */}
      <div className="mb-8 overflow-x-auto pb-2 scrollbar-hide">
        <div className="flex space-x-2">
          {['Todos', ...Object.values(BenefitCategory)].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat as any)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all
                ${selectedCategory === cat 
                  ? 'bg-rio-blue text-white shadow-md' 
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}
              `}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Benefits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBenefits.map((benefit) => (
          <BenefitCard 
            key={benefit.id} 
            benefit={benefit} 
            onClick={() => handleBenefitClick(benefit)}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredBenefits.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500">Nenhum benefício encontrado nesta categoria.</p>
        </div>
      )}

      {/* Latest News / Quick Actions (Secondary Section) */}
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Últimas Notícias do Setor</h2>
            <div className="space-y-4">
               {[1, 2].map((i) => (
                 <div key={i} className="flex gap-4 items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0 group cursor-pointer">
                    <div className="overflow-hidden rounded-lg w-20 h-20 flex-shrink-0">
                      <img src={`https://picsum.photos/seed/news${i}/100/100`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="News" />
                    </div>
                    <div>
                       <span className="text-xs text-rio-blue font-semibold">Turismo</span>
                       <h3 className="font-semibold text-gray-800 group-hover:text-rio-blue transition-colors">
                         Ocupação hoteleira no Rio supera expectativas para o próximo feriado
                       </h3>
                       <p className="text-xs text-gray-500 mt-1">Há 2 horas</p>
                    </div>
                 </div>
               ))}
            </div>
         </div>
         <div className="bg-rio-blue rounded-xl shadow-lg p-6 text-white relative overflow-hidden">
            <div className="relative z-10">
               <h2 className="text-xl font-bold mb-2">Central de Atendimento</h2>
               <p className="text-blue-100 text-sm mb-6">
                 Dúvidas sobre sua associação ou mensalidades?
               </p>
               <button className="w-full bg-white text-rio-blue font-bold py-2 rounded-lg hover:bg-rio-gold transition-colors">
                 Falar com Consultor
               </button>
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
         </div>
      </div>

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
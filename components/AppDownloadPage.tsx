
import React, { useEffect, useState } from 'react';
import { ArrowLeft, Smartphone, Download, Share, MoreVertical, PlusSquare, Home, CheckCircle2, Monitor, Laptop } from 'lucide-react';

interface AppDownloadPageProps {
  onBack: () => void;
}

const AppDownloadPage: React.FC<AppDownloadPageProps> = ({ onBack }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    setIsIOS(/iphone|ipad|ipod/.test(userAgent));

    // Check if already in standalone mode
    if (window.matchMedia('(display-mode: standalone)').matches) {
        setIsInstalled(true);
        setIsStandalone(true);
    }

    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      console.log("PWA Install Prompt Captured");
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
        alert("A instalação automática não está disponível neste navegador. Siga as instruções manuais abaixo.");
        return;
    }

    deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
      setDeferredPrompt(null);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-24 md:pb-12 animate-fade-in">
      <div className="bg-gradient-to-r from-rio-blue to-blue-900 text-white pt-8 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -mr-20 -mt-20 blur-2xl" />
        <div className="max-w-4xl mx-auto relative z-10">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-blue-200 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar
          </button>
          <div className="flex flex-col items-center text-center">
             <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-md mb-4 shadow-lg border border-white/20">
               <Smartphone className="w-12 h-12 text-white" />
             </div>
             <h1 className="text-2xl md:text-3xl font-bold mb-2">Instale o App HoteisRio</h1>
             <p className="text-blue-100 max-w-lg">
                Acesse benefícios, notícias e segurança com um toque. Disponível para Android, iOS e Windows (Chrome).
             </p>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 -mt-10 relative z-20 space-y-6">
         
         {/* STATUS CARD */}
         {isInstalled ? (
             <div className="bg-green-50 rounded-2xl p-6 shadow-sm border border-green-200 text-center">
                 <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-2" />
                 <h3 className="text-lg font-bold text-green-800">Aplicativo Instalado</h3>
                 <p className="text-sm text-green-700">Você já está utilizando a versão App.</p>
             </div>
         ) : deferredPrompt ? (
             // AUTOMATIC INSTALL (Chrome/Edge/Android)
             <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-rio-blue/20 text-center relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rio-blue to-rio-gold"></div>
                 <h3 className="text-xl font-bold text-gray-800 mb-2">Instalação Disponível</h3>
                 <p className="text-gray-600 mb-6">
                     Instale o aplicativo oficial para melhor performance e acesso offline no seu dispositivo.
                 </p>
                 <button 
                    onClick={handleInstallClick}
                    className="bg-rio-blue hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-transform hover:scale-105 flex items-center justify-center gap-3 mx-auto w-full md:w-auto animate-pulse-soft"
                 >
                    <Download className="w-6 h-6" />
                    Instalar Agora
                 </button>
             </div>
         ) : (
             // MANUAL INSTRUCTIONS
             <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                 <p className="text-center text-gray-500 mb-4 font-medium">Selecione seu dispositivo para ver como instalar:</p>
                 
                 {/* Desktop Chrome Instructions */}
                 <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-200 mb-4">
                    <div className="bg-gray-100 p-3 font-bold text-gray-700 flex items-center gap-2">
                        <Laptop className="w-4 h-4 text-blue-600" />
                        Computador (Chrome/Edge)
                    </div>
                    <div className="p-4 space-y-4">
                        <div className="flex gap-3 items-start">
                            <span className="bg-white w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm shadow-sm border border-gray-200 shrink-0">1</span>
                            <p className="text-sm text-gray-600">Olhe para a barra de endereço do navegador.</p>
                        </div>
                        <div className="flex gap-3 items-start">
                            <span className="bg-white w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm shadow-sm border border-gray-200 shrink-0">2</span>
                            <p className="text-sm text-gray-600">Clique no ícone de <strong>Instalar</strong> <Download className="w-3 h-3 inline text-gray-500" /> ou <strong>Computador</strong> no canto direito.</p>
                        </div>
                    </div>
                 </div>

                 {/* IOS Instructions */}
                 <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-200 mb-4">
                    <div className="bg-gray-100 p-3 font-bold text-gray-700 flex items-center gap-2">
                        <div className="flex gap-1">
                            <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        </div>
                        iOS (iPhone/iPad)
                    </div>
                    <div className="p-4 space-y-4">
                        <div className="flex gap-3 items-start">
                            <span className="bg-white w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm shadow-sm border border-gray-200 shrink-0">1</span>
                            <p className="text-sm text-gray-600">Abra esta página no <strong>Safari</strong>.</p>
                        </div>
                        <div className="flex gap-3 items-start">
                            <span className="bg-white w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm shadow-sm border border-gray-200 shrink-0">2</span>
                            <p className="text-sm text-gray-600">Toque no botão <strong>Compartilhar</strong> <Share className="w-3 h-3 inline text-blue-500" /> na barra inferior.</p>
                        </div>
                        <div className="flex gap-3 items-start">
                            <span className="bg-white w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm shadow-sm border border-gray-200 shrink-0">3</span>
                            <p className="text-sm text-gray-600">Role e selecione <strong>Adicionar à Tela de Início</strong> <PlusSquare className="w-3 h-3 inline text-gray-500" />.</p>
                        </div>
                    </div>
                 </div>

                 {/* Android Instructions */}
                 <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-200">
                    <div className="bg-gray-100 p-3 font-bold text-gray-700 flex items-center gap-2">
                        <Smartphone className="w-4 h-4 text-green-600" />
                        Android (Chrome)
                    </div>
                    <div className="p-4 space-y-4">
                        <div className="flex gap-3 items-start">
                            <span className="bg-white w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm shadow-sm border border-gray-200 shrink-0">1</span>
                            <p className="text-sm text-gray-600">Abra no <strong>Google Chrome</strong>.</p>
                        </div>
                        <div className="flex gap-3 items-start">
                            <span className="bg-white w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm shadow-sm border border-gray-200 shrink-0">2</span>
                            <p className="text-sm text-gray-600">Toque no menu (3 pontinhos) <MoreVertical className="w-3 h-3 inline text-gray-500" /> no topo.</p>
                        </div>
                        <div className="flex gap-3 items-start">
                            <span className="bg-white w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm shadow-sm border border-gray-200 shrink-0">3</span>
                            <p className="text-sm text-gray-600">Selecione <strong>Instalar aplicativo</strong> ou <strong>Adicionar à tela inicial</strong>.</p>
                        </div>
                    </div>
                 </div>
             </div>
         )}

         <div className="text-center pt-4 pb-8">
             <p className="text-xs text-gray-400">
                 HoteisRio PWA v2.0 • Compatível com iOS, Android e Windows
             </p>
         </div>

      </div>
    </div>
  );
};

export default AppDownloadPage;

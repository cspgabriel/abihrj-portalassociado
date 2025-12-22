
import React, { useEffect, useState } from 'react';
import { ArrowLeft, Smartphone, Download, Share, MoreVertical, PlusSquare, Home, CheckCircle2 } from 'lucide-react';

interface AppDownloadPageProps {
  onBack: () => void;
}

const AppDownloadPage: React.FC<AppDownloadPageProps> = ({ onBack }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already in standalone mode
    if (window.matchMedia('(display-mode: standalone)').matches) {
        setIsInstalled(true);
    }

    const handler = (e: any) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
      setDeferredPrompt(null);
    } else {
      console.log('User dismissed the install prompt');
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
                Tenha acesso rápido aos benefícios, carteirinha digital e notificações direto na tela do seu celular.
             </p>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 -mt-10 relative z-20 space-y-6">
         
         {/* Install Button (Android/Desktop PWA) */}
         {!isInstalled && deferredPrompt && (
             <div className="bg-white rounded-2xl p-6 shadow-lg border border-rio-blue/20 text-center animate-pulse-soft">
                 <h3 className="text-lg font-bold text-gray-800 mb-2">Instalação Rápida</h3>
                 <p className="text-sm text-gray-600 mb-4">
                     Detectamos que seu dispositivo é compatível. Clique abaixo para instalar.
                 </p>
                 <button 
                    onClick={handleInstallClick}
                    className="bg-rio-blue hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl shadow-md transition-transform hover:scale-105 flex items-center justify-center gap-2 mx-auto w-full md:w-auto"
                 >
                    <Download className="w-5 h-5" />
                    Instalar Aplicativo Agora
                 </button>
             </div>
         )}

         {isInstalled && (
             <div className="bg-green-50 rounded-2xl p-6 shadow-sm border border-green-200 text-center">
                 <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-2" />
                 <h3 className="text-lg font-bold text-green-800">Aplicativo Instalado</h3>
                 <p className="text-sm text-green-700">Você já está utilizando a versão App do HoteisRio.</p>
             </div>
         )}
         
         {/* iOS Instructions */}
         <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
            <div className="bg-gray-50 p-4 border-b border-gray-100 flex items-center gap-2">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="ml-2 text-sm font-bold text-gray-500">iPhone / iPad (iOS)</span>
            </div>
            <div className="p-6">
                <ol className="space-y-6">
                    <li className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-rio-blue rounded-full flex items-center justify-center font-bold">1</div>
                        <div>
                            <p className="text-gray-700 font-medium">Abra no Safari</p>
                            <p className="text-sm text-gray-500">Este recurso funciona apenas no navegador Safari.</p>
                        </div>
                    </li>
                    <li className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-rio-blue rounded-full flex items-center justify-center font-bold">2</div>
                        <div>
                            <p className="text-gray-700 font-medium flex items-center gap-2">
                                Toque no botão Compartilhar 
                                <Share className="w-4 h-4 text-blue-500" />
                            </p>
                            <p className="text-sm text-gray-500">Geralmente localizado na barra inferior da tela.</p>
                        </div>
                    </li>
                    <li className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-rio-blue rounded-full flex items-center justify-center font-bold">3</div>
                        <div>
                            <p className="text-gray-700 font-medium flex items-center gap-2">
                                Selecione "Adicionar à Tela de Início"
                                <PlusSquare className="w-4 h-4 text-gray-600" />
                            </p>
                            <p className="text-sm text-gray-500">Role para baixo no menu de opções até encontrar.</p>
                        </div>
                    </li>
                </ol>
            </div>
         </div>

         {/* Android Instructions (Manual) */}
         <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
            <div className="bg-gray-50 p-4 border-b border-gray-100 flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-green-600" />
                <span className="text-sm font-bold text-gray-500">Android (Manual)</span>
            </div>
            <div className="p-6">
                <p className="text-sm text-gray-500 mb-4">Caso o botão de instalação automática não apareça:</p>
                <ol className="space-y-6">
                    <li className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-bold">1</div>
                        <div>
                            <p className="text-gray-700 font-medium">Abra no Google Chrome</p>
                        </div>
                    </li>
                    <li className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-bold">2</div>
                        <div>
                            <p className="text-gray-700 font-medium flex items-center gap-2">
                                Toque no Menu de Opções
                                <MoreVertical className="w-4 h-4 text-gray-600" />
                            </p>
                            <p className="text-sm text-gray-500">Os três pontinhos no canto superior direito.</p>
                        </div>
                    </li>
                    <li className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-bold">3</div>
                        <div>
                            <p className="text-gray-700 font-medium flex items-center gap-2">
                                Toque em "Instalar aplicativo" ou "Adicionar à tela inicial"
                                <Download className="w-4 h-4 text-gray-600" />
                            </p>
                        </div>
                    </li>
                </ol>
            </div>
         </div>

         <div className="text-center pt-4 pb-8">
             <p className="text-xs text-gray-400">
                 O App HoteisRio é um PWA (Progressive Web App), garantindo leveza e atualizações automáticas sem ocupar muito espaço no seu dispositivo.
             </p>
         </div>

      </div>
    </div>
  );
};

export default AppDownloadPage;

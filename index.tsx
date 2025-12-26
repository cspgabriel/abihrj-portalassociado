
// Autor: Gabriel Salles
// Suporte do SO: Windows11
// Descrição: Ponto de entrada da aplicação com registro de PWA

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Registrar o Service Worker para transformar em PWA
serviceWorkerRegistration.register();
// --- Fim de index.tsx ---

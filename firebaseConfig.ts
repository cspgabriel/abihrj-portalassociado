// Autor: Gabriel Salles
// Suporte do SO: Windows11
// Descrição: Configuração de inicialização do Firebase

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuração Real do Projeto "centralas-f05b9"
export const firebaseConfig = {
  apiKey: "AIzaSyC9xlWLtHkkvnIsowDjLTiAJG9AzepBRC4",
  authDomain: "centralas-f05b9.firebaseapp.com",
  projectId: "centralas-f05b9",
  storageBucket: "centralas-f05b9.firebasestorage.app",
  messagingSenderId: "1008296122812",
  appId: "1:1008296122812:web:7c61ca7a4ae6d285cef3b9",
  measurementId: "G-HM8J0WZRNC"
};

// Inicialização
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

// --- Fim de firebaseConfig.ts ---
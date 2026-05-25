import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported as isAnalyticsSupported, type Analytics } from "firebase/analytics";

// Projeto Firebase: portal-associado-abih
// Auth domain: portal-associado-abih.firebaseapp.com
// Domínio de produção autorizado: associados.abihrj.com.br
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

// Analytics só inicializa em ambiente compatível (browser, https/localhost)
export let analytics: Analytics | null = null;
if (typeof window !== "undefined") {
  isAnalyticsSupported().then((ok) => {
    if (ok) analytics = getAnalytics(app);
  });
}

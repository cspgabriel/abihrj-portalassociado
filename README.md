# Portal do Associado — ABIH-RJ

Portal exclusivo para os associados da **ABIH-RJ** (Associação Brasileira da Indústria de Hotéis — Seção Rio de Janeiro) acessarem benefícios, notícias, suporte jurídico, agenda de eventos, calculadoras de revenue, fóruns e assistente virtual com IA.

**URL de produção:** https://associados.abihrj.com.br

## Stack

- **Frontend:** React 19 + TypeScript + Vite 6
- **UI:** Tailwind CSS 3 + MUI + lucide-react
- **Backend:** Firebase (Auth + Firestore + Hosting) — projeto `portal-associado-abih`
- **IA:** Google Gemini (`@google/genai`)
- **PWA:** service worker próprio + Web App Manifest
- **Deploy:** Firebase Hosting (e Vercel como alternativa)

## Rodando local

**Pré-requisitos:** Node.js 18+

1. Instale dependências:
   ```bash
   npm install
   ```
2. Crie um `.env.local` na raiz com as variáveis do Firebase e Gemini (veja `.env.example`).
3. Suba o dev server:
   ```bash
   npm run dev
   ```

## Build

```bash
npm run build      # gera ./dist
npm run preview    # serve o build local
```

## Deploy (Firebase Hosting)

```bash
firebase deploy --only hosting
```

## Estrutura

```
.
├── App.tsx                  # raiz do roteamento
├── components/              # componentes de páginas e UI
├── services/                # integrações (Gemini, Firebase, etc.)
├── public/                  # assets estáticos (icons, manifest, service worker)
├── firebaseConfig.ts        # init do Firebase SDK
├── firestore.rules          # regras de segurança Firestore
├── firebase.json            # config de hosting + headers
└── tailwind.config.ts       # paleta `abihrj.*`
```

## Histórico

Este projeto é um fork rebrandeado do antigo Portal do Associado HoteisRio. Veja o branch `rebrand/abih-rj` e o PR de migração para o changelog completo.

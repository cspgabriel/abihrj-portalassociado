// Autor: Gabriel Salles
// Suporte do SO: Windows11
// Descrição: Definições de tipos e interfaces globais

import { LucideIcon } from 'lucide-react';

export interface User {
  id: string;
  name: string;
  email: string;
  hotel: string;
  role: string;
  cargo?: string;
  whatsapp?: string;
  avatarUrl?: string;
  gamification?: UserGamificationProfile;
}

export interface GamificationBadge {
  id: string;
  name: string;
  description: string;
  iconName: string;
  requiredXP: number;
}

export interface UserGamificationProfile {
  xp: number;
  level: 'BRONZE' | 'SILVER' | 'GOLD' | 'DIAMOND' | 'MASTER';
  streak: number; // Dias seguidos de acesso
  lastLoginDate: string; // Data do último login para calcular streak
  badges: string[]; // IDs das medalhas conquistadas
  completedActions: string[];
}

export enum BenefitCategory {
  LEGAL = 'Jurídico',
  COMMERCIAL = 'Comercial',
  TRAINING = 'Treinamento',
  EVENTS = 'Eventos',
  STATISTICS = 'Estatísticas',
  PARTNERS = 'Parceiros',
  OPERATIONAL = 'Operacional',
  INSTITUTIONAL = 'Institucional',
  COMMUNICATION = 'Comunicação & Marketing',
  TECHNOLOGY = 'Tecnologia',
  HR = 'Recursos Humanos',
  SUPPORT = 'Suporte',
  TOOLS = 'Ferramentas & Calculadoras',
  MANAGEMENT = 'Gestão',
  FNRH = 'FNRH Digital'
}

export type HotelSector = 'MANAGEMENT' | 'RECEPTION' | 'HOUSEKEEPING' | 'MAINTENANCE' | 'SALES' | 'HR' | 'LEGAL_DEPT' | 'FB' | 'SECURITY';

export interface Benefit {
  id: string;
  title: string;
  description: string;
  category: BenefitCategory;
  targetSectors?: HotelSector[]; // New field for sector filtering
  iconName: string; // We map string to icon component in UI
  imageUrl: string;
  fullDetails?: string;
  isNew?: boolean; // Novo campo para destacar itens novos
  isService?: boolean; // Define se é um serviço online com link/ação direta
  usageSteps?: string[]; // Passo a passo de como utilizar
  externalLink?: string; // Link externo para portais dedicados
  downloadUrl?: string; // URL direta para download de arquivos
  dashboardUrl?: string; // URL para dashboard externo (ex: Ordem Pública)
  customCta?: string; // Texto personalizado para o botão de ação
  embedUrl?: string; // URL otimizada para iframe (se diferente do externalLink)
}

export interface Course {
  id: string;
  youtubeId: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  thumbnailUrl: string;
  isNew?: boolean;
}

// Pergunta de avaliação (quiz) de um curso
export interface QuizQuestion {
  q: string;
  options: string[];
  correct: number; // índice da alternativa correta
}

// Progresso de um usuário em um curso (salvo no Firestore: coleção course_progress)
export interface CourseProgress {
  userId: string;
  courseId: string;
  courseTitle?: string;
  started?: boolean;
  completed?: boolean;
  completedAt?: string;
  quizScore?: number;
  quizTotal?: number;
  quizPassed?: boolean;
  quizAt?: string;
  updatedAt?: string;
}

export interface Forum {
  id: string;
  title: string;
  description: string;
  iconName: string;
  imageUrl: string;
  nextEdition: {
    date: string;
    location: string;
    topic: string;
  };
  lastEditions: {
    date: string;
    summary: string;
  }[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export interface RioEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  type: string;
  imageUrl: string;
}
// --- Fim de types.ts ---
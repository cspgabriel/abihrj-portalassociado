
import { LucideIcon } from 'lucide-react';

export interface User {
  id: string;
  name: string;
  email: string;
  hotel: string;
  role: string;
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
  SUPPORT = 'Suporte'
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
  category: BenefitCategory;
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

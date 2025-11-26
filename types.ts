import { LucideIcon } from 'lucide-react';

export interface User {
  id: string;
  name: string;
  email: string;
  hotel: string;
  role: string;
  avatarUrl?: string;
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
  COMMUNICATION = 'Comunicação',
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

// Autor: Gabriel Salles
// Suporte do SO: Windows11
// Descrição: Constantes e dados estáticos da aplicação

import { Benefit, BenefitCategory, Course, Forum, GamificationBadge, HotelSector, RioEvent } from './types';
import * as Icons from 'lucide-react';

export const COMMERCIAL_SUB_ACTIONS = [
  {
    id: 'commercial-fairs',
    title: 'Inscrições em Feiras',
    description: 'Garanta sua participação nos estandes da HoteisRio em feiras nacionais e internacionais (WTM, ABAV, FIT, etc).',
    iconName: 'Globe',
    buttonText: 'Inscrições em Breve!',
    link: null,
    color: 'bg-blue-600',
    textClass: 'text-blue-600',
    iconColor: 'text-blue-200'
  },
  {
    id: 'commercial-procap',
    title: 'Descubra RJ (Projeto Procap)',
    description: 'Programa de capacitação de venda do destino – confira as edições',
    iconName: 'Presentation',
    buttonText: 'Conheça o projeto',
    link: 'https://procaprj.com.br',
    color: 'bg-indigo-600',
    textClass: 'text-indigo-600',
    iconColor: 'text-indigo-200'
  },
  {
    id: 'commercial-xp-rio',
    title: 'Experiência Rio',
    description: 'Participe das ações de promoção do destino e famtours exclusivos para mostrar o melhor do Rio.',
    iconName: 'Sparkles',
    buttonText: 'Manifestar Interesse',
    link: 'https://docs.google.com/forms/d/e/1FAIpQLSdL-Z_o-2TV6mRXquFiUM55wLXgWQfm3CxbIkQtlOuKnmOn_w/viewform?authuser=1',
    color: 'bg-pink-600',
    textClass: 'text-pink-600',
    iconColor: 'text-pink-200'
  }
];

export const GALLERY_EVENTS = [];

export const FORUMS_DATA: Forum[] = [];

export const COURSES_DATA: Course[] = [
  {
    id: 'curso-boas-vindas',
    youtubeId: 'dQw4w9WgXcQ',
    title: 'Boas-vindas ao Portal do Associado',
    description: 'Conheça os principais recursos do portal e como aproveitar os benefícios.',
    category: 'Introdução',
    duration: '10 min',
    thumbnailUrl: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    isNew: true
  }
];

export const CALCULATOR_TOOLS: Benefit[] = [];

export const RJ_LAWS_DATA: Array<{
  id: string;
  number: string;
  description: string;
  category: string;
  date: string;
  link?: string;
}> = [];

export const CRM_LINK = 'https://sindhoteisrj.com.br';

export const ASSOCIATION_EVENTS: Array<{
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  status: string;
}> = [];

export const TEAM_CONTACTS: Array<{
  sector: string;
  manager: string;
  email: string;
  whatsapp?: string;
}> = [];

export const WHATSAPP_GROUPS: Array<{
  id: string;
  name: string;
  description: string;
  link: string;
}> = [];

export const HOTEL_SECTORS: Array<{ id: HotelSector; label: string }> = [
  { id: 'MANAGEMENT', label: 'Gestão' },
  { id: 'RECEPTION', label: 'Recepção' },
  { id: 'HOUSEKEEPING', label: 'Governança' },
  { id: 'MAINTENANCE', label: 'Manutenção' },
  { id: 'SALES', label: 'Comercial' },
  { id: 'HR', label: 'RH' },
  { id: 'LEGAL_DEPT', label: 'Jurídico' },
  { id: 'FB', label: 'A&B' },
  { id: 'SECURITY', label: 'Segurança' }
];

export const FOOTER_DATA = {
  socials: {
    instagram: 'https://instagram.com',
    linkedin: 'https://linkedin.com',
    youtube: 'https://youtube.com',
    facebook: 'https://facebook.com'
  },
  address: 'Rua Exemplo, 100 - Rio de Janeiro/RJ',
  cep: '20000-000',
  phone: '(21) 0000-0000',
  email: 'contato@sindhoteisrj.com.br',
  razaoSocial: 'Sindicato de Hotéis e Meios de Hospedagem do Município do Rio de Janeiro',
  cnpj: '00.000.000/0001-00'
};

export const SUPER_CATEGORIES = [
  {
    id: 'estrategico',
    title: 'Estratégico',
    description: 'Serviços para gestão, crescimento comercial e tomada de decisão.',
    iconName: 'TrendingUp',
    gradient: 'from-blue-600 to-indigo-600',
    categories: [BenefitCategory.COMMERCIAL, BenefitCategory.STATISTICS, BenefitCategory.MANAGEMENT]
  },
  {
    id: 'operacao',
    title: 'Operação',
    description: 'Recursos para rotinas operacionais e eficiência do dia a dia.',
    iconName: 'Cog',
    gradient: 'from-emerald-600 to-teal-600',
    categories: [BenefitCategory.OPERATIONAL, BenefitCategory.SUPPORT, BenefitCategory.TOOLS]
  },
  {
    id: 'pessoas',
    title: 'Pessoas',
    description: 'Capacitação, RH e suporte para equipes de alta performance.',
    iconName: 'Users',
    gradient: 'from-purple-600 to-pink-600',
    categories: [BenefitCategory.HR, BenefitCategory.TRAINING, BenefitCategory.LEGAL]
  },
  {
    id: 'conexao',
    title: 'Conexão & Mercado',
    description: 'Eventos, parcerias e comunicação para fortalecer o networking.',
    iconName: 'Globe',
    gradient: 'from-amber-500 to-orange-600',
    categories: [BenefitCategory.EVENTS, BenefitCategory.PARTNERS, BenefitCategory.COMMUNICATION, BenefitCategory.INSTITUTIONAL]
  }
];

export const BENEFITS_DATA: Benefit[] = [
  {
    id: 'commercial-actions-hub',
    title: 'Ações Comerciais',
    description: 'Central de inscrições para Feiras, PROCAP e Experiência Rio.',
    category: BenefitCategory.COMMERCIAL,
    targetSectors: ['SALES', 'MANAGEMENT'],
    iconName: 'ShoppingBag',
    imageUrl: '',
    isService: true,
    isNew: true,
    customCta: 'Acessar Ações'
  },
  {
    id: 'calendar-2026',
    title: 'Calendário de Eventos 2026',
    description: 'Planejamento antecipado! Confira feriados, congressos e grandes eventos confirmados para 2026.',
    category: BenefitCategory.EVENTS,
    targetSectors: ['SALES', 'RECEPTION', 'MANAGEMENT'],
    iconName: 'CalendarRange',
    imageUrl: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=400',
    isService: true,
    isNew: true,
    embedUrl: 'https://calendarioeventos.sindhoteisrj.com.br',
    externalLink: 'https://calendariodeeventos.sindhoteisrj.com.br/',
    customCta: 'Acessar Calendário 2026'
  }
];

// 🔴 RESTAURADO (ERRO DE BUILD)
export const LEVEL_THRESHOLDS = { BRONZE: 0, SILVER: 1000, GOLD: 3000, DIAMOND: 6000, MASTER: 10000 };
export const LEVEL_NAMES = { BRONZE: 'Bronze', SILVER: 'Prata', GOLD: 'Ouro', DIAMOND: 'Diamante', MASTER: 'Lenda' };
export const GAMIFICATION_BADGES: GamificationBadge[] = [
  { id: 'pioneiro', name: 'Pioneiro', description: 'Primeiro acesso', iconName: 'Star', requiredXP: 0 },
  { id: 'social', name: 'Social', description: 'Conectou redes sociais', iconName: 'Share2', requiredXP: 100 }
];

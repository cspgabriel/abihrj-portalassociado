
// Autor: Gabriel Salles
// Suporte do SO: Windows11
// Descrição: Constantes e dados estáticos da aplicação

import { Benefit, BenefitCategory, Forum, GamificationBadge, RioEvent } from './types';
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

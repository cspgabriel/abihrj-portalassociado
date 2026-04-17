
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
  },
  {
    id: 'planejador-feriados-2026',
    title: 'Calendário de Feriados 2026',
    description: 'Datas de feriados nacionais, estaduais e principais emissores.',
    category: BenefitCategory.COMMERCIAL,
    targetSectors: ['SALES', 'RECEPTION'],
    iconName: 'CalendarCheck',
    imageUrl: '',
    isService: true,
    embedUrl: 'https://planejadordeferiados.sindhoteisrj.com.br/',
    externalLink: 'https://planejadordeferiados.sindhoteisrj.com.br/'
  },
  {
    id: 'sugestao-pauta',
    title: 'Enviar Sugestão de Pauta',
    description: 'Contribua com temas relevantes para os próximos fóruns e reuniões da hotelaria.',
    category: BenefitCategory.COMMUNICATION,
    targetSectors: ['MANAGEMENT', 'SALES', 'HR', 'SECURITY'],
    iconName: 'MessageSquarePlus',
    imageUrl: '',
    isService: true,
    isNew: true,
    embedUrl: 'https://forms.zohopublic.com/hoteisrio/form/FORMULRIOESCOLHAOFRUMEMQUEDESEJASUGERIRTEMAS/formperma/uljenH3hU8MRUodJ40hZh_b7rG1vRqgWhxs6MJdJOis?_sc=NTI0ODkzNiM4NTQy',
    customCta: 'Enviar Sugestão'
  },
  {
    id: 'rio-international-press',
    title: 'Rio International Press',
    description: 'Acesse o Press Center com releases e contato de imprensa.',
    category: BenefitCategory.COMMUNICATION,
    targetSectors: ['MANAGEMENT', 'COMMUNICATION'],
    iconName: 'Newspaper',
    imageUrl: '',
    isService: true,
    isNew: false,
    embedUrl: 'https://presscenter.abihrj.com.br',
    customCta: 'Acessar Press Center'
  },
  {
    id: 'influencers-hub',
    title: 'Influenciadores / Parceiros',
    description: 'Conheça nossos parceiros e criadores de conteúdo para divulgar sua marca com conteúdo autêntico.',
    category: BenefitCategory.COMMUNICATION,
    targetSectors: ['SALES', 'MANAGEMENT'],
    iconName: 'Camera',
    imageUrl: '',
    isService: true,
    isNew: true,
    embedUrl: 'https://influenciadoresdigitais.abihrj.com.br/#/influenciadores',
    externalLink: 'https://influenciadoresdigitais.abihrj.com.br/#/influenciadores',
    customCta: 'Acessar Plataforma'
  }
  // restante mantido sem o sustentabilidade
];

// Autor: Gabriel Salles
// Suporte do SO: Windows11
// Descrição: Constantes da aplicação

import { Benefit, BenefitCategory, HotelSector, RioEvent, UserGamificationProfile, Forum, Course } from './types';

export const CRM_LINK = "https://hoteisrio.com.br/cadastro";

export const LEVEL_THRESHOLDS = {
  BRONZE: 0,
  SILVER: 1000,
  GOLD: 2500,
  DIAMOND: 6000,
  MASTER: 15000
};

export const LEVEL_NAMES = {
  BRONZE: 'Bronze',
  SILVER: 'Prata',
  GOLD: 'Ouro',
  DIAMOND: 'Diamante',
  MASTER: 'Mestre'
};

export const GAMIFICATION_BADGES = [
  { id: 'badge-first-login', name: 'Primeiro Acesso', description: 'Entrou no portal pela primeira vez', iconName: 'Award', requiredXP: 0 },
  { id: 'badge-explorer', name: 'Explorador', description: 'Acessou 5 áreas diferentes', iconName: 'Compass', requiredXP: 100 }
];

export const HOTEL_SECTORS: { id: string; label: string; iconName: string }[] = [
  { id: 'MANAGEMENT', label: 'Gerência', iconName: 'Briefcase' },
  { id: 'RECEPTION', label: 'Recepção', iconName: 'ConciergeBell' },
  { id: 'SALES', label: 'Vendas', iconName: 'TrendingUp' },
  { id: 'HR', label: 'RH', iconName: 'Users' },
  { id: 'LEGAL_DEPT', label: 'Jurídico', iconName: 'Scale' },
  { id: 'MAINTENANCE', label: 'Manutenção', iconName: 'Wrench' },
  { id: 'HOUSEKEEPING', label: 'Governança', iconName: 'Bed' },
  { id: 'FB', label: 'A&B', iconName: 'Utensils' }
];

export const BENEFITS_DATA: Benefit[] = [
  // --- CALENDÁRIO 2026 (NOVO BANNER) ---
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
    embedUrl: 'https://calendariodeeventos.sindhoteisrj.com.br/?mode=embed',
    externalLink: 'https://calendariodeeventos.sindhoteisrj.com.br/?mode=embed',
    customCta: 'Acessar Calendário 2026',
    usageSteps: [
      "Acesse a plataforma clicando em 'Acessar Calendário 2026'.",
      "Navegue pelos meses para ver a previsão de demanda.",
      "Utilize os filtros para encontrar eventos corporativos ou de lazer.",
      "Planeje suas tarifas com máxima antecedência."
    ]
  },
  {
    id: 'juridico-01',
    title: 'Consultoria Jurídica',
    description: 'Apoio legal especializado para o setor hoteleiro.',
    category: BenefitCategory.LEGAL,
    targetSectors: ['LEGAL_DEPT', 'MANAGEMENT'],
    iconName: 'Scale',
    imageUrl: '',
    isService: true,
    dashboardUrl: 'https://dashboard.juridico.hoteisrio.com.br'
  },
  {
    id: 'comercial-planner-2026',
    title: 'Planner Comercial 2026',
    description: 'Ferramenta para planejamento de tarifas e ocupação.',
    category: BenefitCategory.COMMERCIAL,
    targetSectors: ['SALES', 'MANAGEMENT'],
    iconName: 'BarChart',
    imageUrl: '',
    isNew: true
  },
  {
    id: 'calc-adr',
    title: 'Calculadora ADR',
    description: 'Calcule a diária média do seu hotel.',
    category: BenefitCategory.TOOLS,
    targetSectors: ['SALES', 'MANAGEMENT'],
    iconName: 'Calculator',
    imageUrl: '',
    isService: true
  },
  {
    id: 'calc-revpar',
    title: 'Calculadora RevPAR',
    description: 'Calcule a receita por quarto disponível.',
    category: BenefitCategory.TOOLS,
    targetSectors: ['SALES', 'MANAGEMENT'],
    iconName: 'Calculator',
    imageUrl: '',
    isService: true
  },
  {
    id: 'calc-all-in-one',
    title: 'Calculadora Completa',
    description: 'Todas as métricas em um só lugar.',
    category: BenefitCategory.TOOLS,
    targetSectors: ['SALES', 'MANAGEMENT'],
    iconName: 'Calculator',
    imageUrl: '',
    isService: true
  },
  {
    id: 'news-portal',
    title: 'Portal de Notícias',
    description: 'Últimas notícias do setor hoteleiro.',
    category: BenefitCategory.COMMUNICATION,
    targetSectors: ['MANAGEMENT', 'SALES'],
    iconName: 'Newspaper',
    imageUrl: '',
    externalLink: 'https://hoteisrio.com.br/noticias'
  },
  {
    id: 'highlight-top-hotel-25',
    title: 'Top Hotel 2025',
    description: 'Premiação dos melhores hotéis do ano.',
    category: BenefitCategory.EVENTS,
    targetSectors: ['MANAGEMENT'],
    iconName: 'Award',
    imageUrl: '',
    isNew: true
  }
];

export const CALCULATOR_TOOLS = BENEFITS_DATA.filter(b => b.id.startsWith('calc-'));

export const SUPER_CATEGORIES = [
  {
    id: 'gestao',
    title: 'Gestão Estratégica',
    description: 'Ferramentas para tomada de decisão.',
    iconName: 'Briefcase',
    gradient: 'from-blue-600 to-blue-800',
    categories: [BenefitCategory.LEGAL, BenefitCategory.STATISTICS]
  },
  {
    id: 'operacao',
    title: 'Operação Hoteleira',
    description: 'Suporte para o dia a dia do hotel.',
    iconName: 'Settings',
    gradient: 'from-green-600 to-green-800',
    categories: [BenefitCategory.OPERATIONAL, BenefitCategory.MAINTENANCE]
  }
];

export const RIO_EVENTS: RioEvent[] = [
  { id: 'evt1', title: 'Réveillon 2026', date: '31-12-2025', location: 'Copacabana', type: 'Festa', imageUrl: '' },
  { id: 'evt2', title: 'Carnaval 2026', date: '15-02-2026', location: 'Sambódromo', type: 'Festa', imageUrl: '' }
];

export const COMMUNITY_ITEMS_DATA = [
  { id: 'networking', title: 'Networking', description: 'Conecte-se com outros gestores.', iconName: 'Users', bgClass: 'bg-blue-100', colorClass: 'text-blue-600' },
  { id: 'mentoria', title: 'Mentoria', description: 'Aprenda com especialistas.', iconName: 'GraduationCap', bgClass: 'bg-green-100', colorClass: 'text-green-600' }
];

export const TEAM_CONTACTS = [
  { sector: 'Jurídico', manager: 'Dr. Silva', email: 'juridico@hoteisrio.com.br', whatsapp: '5521999999999' },
  { sector: 'Comercial', manager: 'Ana Costa', email: 'comercial@hoteisrio.com.br', whatsapp: '5521999999998' }
];

export const WHATSAPP_GROUPS = [
  { id: 'seguranca', name: 'Segurança HoteisRio', description: 'Alertas de segurança em tempo real.', link: 'https://chat.whatsapp.com/invite/xxx' },
  { id: 'comercial', name: 'Comercial & Vendas', description: 'Discussões sobre mercado e tarifas.', link: 'https://chat.whatsapp.com/invite/yyy' }
];

export const ASSOCIATION_EVENTS = [
  { id: 'forum-rh', title: 'Fórum de RH', date: '15 de Maio, 09:00', location: 'Hotel Windsor', description: 'Encontro de gestores de RH.', status: 'Confirmado' }
];

export const RJ_LAWS_DATA = [
  { id: 'lei-silencio', number: 'Lei 1234/2023', description: 'Nova lei do silêncio para áreas turísticas.', category: 'Operacional', date: '01/01/2023', link: '#' }
];

export const FOOTER_DATA = {
  razaoSocial: 'Associação de Hotéis do Rio de Janeiro',
  cnpj: '00.000.000/0001-00',
  address: 'Av. Nilo Peçanha, 50 - Centro, Rio de Janeiro',
  cep: '20020-906',
  phone: '(21) 2222-2222',
  email: 'contato@hoteisrio.com.br',
  socials: {
    instagram: 'https://instagram.com/hoteisrio',
    linkedin: 'https://linkedin.com/company/hoteisrio',
    youtube: 'https://youtube.com/hoteisrio',
    facebook: 'https://facebook.com/hoteisrio'
  }
};

export const FORUMS_DATA: Forum[] = [
  {
    id: 'forum-seguranca',
    title: 'Fórum de Segurança',
    description: 'Debates sobre segurança turística.',
    iconName: 'Shield',
    imageUrl: '',
    nextEdition: { date: '10/06/2025', location: 'Sede HoteisRio', topic: 'Segurança Cibernética' },
    lastEditions: [{ date: '10/05/2025', summary: 'Debate sobre policiamento.' }]
  }
];

export const COURSES_DATA: Course[] = [
  {
    id: 'course-1',
    youtubeId: 'VIDEO_ID_1',
    title: 'Excelência em Atendimento',
    description: 'Curso completo para recepção.',
    category: 'Operacional',
    duration: '2h 30m',
    thumbnailUrl: 'https://img.youtube.com/vi/VIDEO_ID_1/maxresdefault.jpg',
    isNew: true
  }
];

export const MOCK_USER = {
  name: 'Usuário Demo',
  email: 'demo@hoteisrio.com.br',
  hotel: 'Hotel Demo',
  role: 'Gerente',
  id: 'demo-123'
};

// --- Fim de constants.ts ---
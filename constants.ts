// Autor: Gabriel Salles
// Suporte do SO: Windows11
// Descrição: Constantes e dados estáticos da aplicação

import { Benefit, BenefitCategory, Forum, Course, GamificationBadge, RioEvent, HotelSector } from './types';

export const CRM_LINK = "https://hoteisrio.com.br/cadastro";

export const LEVEL_THRESHOLDS = {
  BRONZE: 0,
  SILVER: 1000,
  GOLD: 3000,
  DIAMOND: 6000,
  MASTER: 10000
};

export const LEVEL_NAMES = {
  BRONZE: 'Bronze',
  SILVER: 'Prata',
  GOLD: 'Ouro',
  DIAMOND: 'Diamante',
  MASTER: 'Mestre'
};

export const GAMIFICATION_BADGES: GamificationBadge[] = [
  { id: 'pioneiro', name: 'Pioneiro', description: 'Primeiro acesso ao portal', iconName: 'Flag', requiredXP: 0 },
  { id: 'expert', name: 'Expert', description: 'Completou 5 treinamentos', iconName: 'Star', requiredXP: 500 },
  { id: 'social', name: 'Social', description: 'Participou de 3 eventos', iconName: 'Users', requiredXP: 300 }
];

export const HOTEL_SECTORS = [
  { id: 'MANAGEMENT', label: 'Gerência' },
  { id: 'RECEPTION', label: 'Recepção' },
  { id: 'HOUSEKEEPING', label: 'Governança' },
  { id: 'MAINTENANCE', label: 'Manutenção' },
  { id: 'SALES', label: 'Vendas' },
  { id: 'HR', label: 'RH' },
  { id: 'LEGAL_DEPT', label: 'Jurídico' },
  { id: 'FB', label: 'A&B' },
  { id: 'SECURITY', label: 'Segurança' }
];

export const TEAM_CONTACTS = [
  { sector: 'Superintendência', manager: 'Theresa Jansen', email: 'superintendencia@hoteisrio.com.br', whatsapp: '5521999999999' },
  { sector: 'Jurídico', manager: 'Dr. Paulo Henrique', email: 'juridico@hoteisrio.com.br', whatsapp: '5521999999999' },
  { sector: 'Comercial', manager: 'Juliana Salles', email: 'comercial@hoteisrio.com.br', whatsapp: '5521999999999' },
  { sector: 'Operacional', manager: 'Carlos Silva', email: 'operacional@hoteisrio.com.br', whatsapp: '5521999999999' },
  { sector: 'Comunicação', manager: 'Fernanda Lemos', email: 'comunicacao@hoteisrio.com.br', whatsapp: '5521999999999' }
];

export const WHATSAPP_GROUPS = [
  { id: 'seg', name: 'Segurança HoteisRio', description: 'Alertas de segurança e ocorrências em tempo real.', link: '#' },
  { id: 'comercial', name: 'Fórum Comercial', description: 'Networking e estratégias de vendas.', link: '#' },
  { id: 'rh', name: 'RH & Gestão de Pessoas', description: 'Dúvidas trabalhistas e gestão de talentos.', link: '#' },
  { id: 'manutencao', name: 'Engenharia e Manutenção', description: 'Melhores práticas e fornecedores.', link: '#' },
  { id: 'gov', name: 'Governança', description: 'Gestão de hospedagem e limpeza.', link: '#' },
  { id: 'recepcao', name: 'Recepção e Reservas', description: 'Troca de experiências do front-office.', link: '#' }
];

export const FOOTER_DATA = {
  razaoSocial: 'Associação de Hotéis do Rio de Janeiro',
  cnpj: '33.333.333/0001-00',
  address: 'Av. Nilo Peçanha, 50 - Centro, Rio de Janeiro',
  cep: '20020-100',
  phone: '(21) 3797-9000',
  email: 'contato@hoteisrio.com.br',
  socials: { 
    instagram: 'https://instagram.com/hoteisrio', 
    linkedin: 'https://linkedin.com/company/hoteisrio', 
    youtube: 'https://youtube.com/hoteisrio', 
    facebook: 'https://facebook.com/hoteisrio' 
  }
};

export const ASSOCIATION_EVENTS: RioEvent[] = [
    {
        id: 'evt-1',
        title: 'Fórum Comercial e Marketing',
        date: '15 de Maio, 09:00',
        location: 'Windsor Florida Hotel',
        type: 'Fórum',
        imageUrl: ''
    },
    {
        id: 'evt-2',
        title: 'Encontro de RH',
        date: '22 de Maio, 14:00',
        location: 'Hotel Prodigy Santos Dumont',
        type: 'Reunião',
        imageUrl: ''
    },
    {
        id: 'evt-3',
        title: 'Workshop de Segurança',
        date: '05 de Junho, 10:00',
        location: 'Sede HoteisRio',
        type: 'Workshop',
        imageUrl: ''
    }
];

export const RJ_LAWS_DATA = [
    { id: 'law-1', number: 'Lei 8.888/2023', description: 'Obrigatoriedade de cardápios em braile.', category: 'Acessibilidade', date: '10/01/2023', link: '#' },
    { id: 'law-2', number: 'Decreto 44.555', description: 'Regulamentação de eventos em áreas públicas.', category: 'Eventos', date: '15/03/2023', link: '#' },
    { id: 'law-3', number: 'Lei 9.123/2024', description: 'Incentivos fiscais para retrofit hoteleiro.', category: 'Fiscal', date: '01/02/2024', link: '#' }
];

export const COURSES_DATA: Course[] = [
    {
        id: 'course-drinks',
        youtubeId: 'dQw4w9WgXcQ', // Placeholder ID
        title: 'Prevenção: Bebidas Falsas',
        description: 'Aprenda a identificar bebidas adulteradas e proteja seu estabelecimento.',
        category: 'Operacional',
        duration: '45min',
        thumbnailUrl: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
        isNew: true
    },
    {
        id: 'course-cx',
        youtubeId: 'dummy1',
        title: 'Excelência em Atendimento',
        description: 'Técnicas de Customer Experience para hotelaria de luxo.',
        category: 'Atendimento',
        duration: '1h 20min',
        thumbnailUrl: 'https://img.youtube.com/vi/dummy1/maxresdefault.jpg',
        isNew: false
    },
    {
        id: 'course-rev',
        youtubeId: 'dummy2',
        title: 'Revenue Management Básico',
        description: 'Introdução aos conceitos de RM para iniciantes.',
        category: 'Gestão',
        duration: '2h',
        thumbnailUrl: 'https://img.youtube.com/vi/dummy2/maxresdefault.jpg',
        isNew: false
    }
];

export const FORUMS_DATA: Forum[] = [
    {
        id: 'forum-rh',
        title: 'Fórum de RH',
        description: 'Discussões estratégicas sobre gestão de pessoas e legislação trabalhista.',
        iconName: 'Users',
        imageUrl: '',
        nextEdition: { date: '20 de Junho, 14h', location: 'Hotel Nacional', topic: 'Retenção de Talentos' },
        lastEditions: [
          { date: 'Maio 2024', summary: 'Debate sobre novas regras de contratação.' },
          { date: 'Abril 2024', summary: 'Saúde mental no ambiente de trabalho.' }
        ]
    },
    {
        id: 'forum-comercial',
        title: 'Fórum Comercial',
        description: 'Análise de mercado, tendências de vendas e marketing hoteleiro.',
        iconName: 'TrendingUp',
        imageUrl: '',
        nextEdition: { date: '12 de Junho, 09h', location: 'Sheraton Rio', topic: 'Estratégias para Baixa Temporada' },
        lastEditions: [
          { date: 'Maio 2024', summary: 'O impacto dos grandes eventos no Rio.' }
        ]
    },
    {
        id: 'forum-seguranca',
        title: 'Fórum de Segurança',
        description: 'Alinhamento com forças de segurança pública e protocolos preventivos.',
        iconName: 'Shield',
        imageUrl: '',
        nextEdition: { date: '05 de Julho, 10h', location: 'Sede HoteisRio', topic: 'Segurança no Verão' },
        lastEditions: []
    }
];

export const SUPER_CATEGORIES = [
    { id: 'cat-legal', title: 'Jurídico & Leis', description: 'Consultoria, pareceres e atualização legislativa.', iconName: 'Scale', gradient: 'from-blue-600 to-blue-800', categories: [BenefitCategory.LEGAL] },
    { id: 'cat-ops', title: 'Operacional & Segurança', description: 'Ferramentas para o dia a dia do hotel.', iconName: 'ShieldCheck', gradient: 'from-slate-600 to-slate-800', categories: [BenefitCategory.OPERATIONAL, BenefitCategory.SUPPORT] },
    { id: 'cat-biz', title: 'Comercial & Vendas', description: 'Inteligência de mercado e promoção.', iconName: 'TrendingUp', gradient: 'from-emerald-600 to-emerald-800', categories: [BenefitCategory.COMMERCIAL, BenefitCategory.STATISTICS] },
    { id: 'cat-hr', title: 'RH & Capacitação', description: 'Treinamentos e gestão de pessoas.', iconName: 'Users', gradient: 'from-purple-600 to-purple-800', categories: [BenefitCategory.HR, BenefitCategory.TRAINING] }
];

export const CALCULATOR_TOOLS: Benefit[] = [
    {
        id: 'calc-all-in-one',
        title: 'Calculadora Completa',
        description: 'Análise 360º de performance.',
        category: BenefitCategory.TOOLS,
        iconName: 'Calculator',
        imageUrl: '',
        isService: true
    },
    {
        id: 'calc-adr',
        title: 'Calculadora ADR',
        description: 'Diária Média (Average Daily Rate).',
        category: BenefitCategory.TOOLS,
        iconName: 'DollarSign',
        imageUrl: '',
        isService: true
    },
    {
        id: 'calc-revpar',
        title: 'Calculadora RevPAR',
        description: 'Receita por Quarto Disponível.',
        category: BenefitCategory.TOOLS,
        iconName: 'BarChart',
        imageUrl: '',
        isService: true
    },
    {
        id: 'calc-occ',
        title: 'Calculadora Ocupação',
        description: 'Taxa de Ocupação (%).',
        category: BenefitCategory.TOOLS,
        iconName: 'PieChart',
        imageUrl: '',
        isService: true
    },
    {
        id: 'calc-goppar',
        title: 'Calculadora GOPPAR',
        description: 'Lucro Operacional Bruto por Quarto.',
        category: BenefitCategory.TOOLS,
        iconName: 'TrendingUp',
        imageUrl: '',
        isService: true
    },
    {
        id: 'calc-trevpar',
        title: 'Calculadora TRevPAR',
        description: 'Receita Total por Quarto Disponível.',
        category: BenefitCategory.TOOLS,
        iconName: 'Layers',
        imageUrl: '',
        isService: true
    },
    {
        id: 'calc-trevpab',
        title: 'Calculadora TRevPAB',
        description: 'Receita Total por Cama (Hostels).',
        category: BenefitCategory.TOOLS,
        iconName: 'Bed',
        imageUrl: '',
        isService: true
    }
];

export const BENEFITS_DATA: Benefit[] = [
  {
    id: 'influencers-hub',
    title: 'Influenciadores & Creators',
    description: 'Conecte-se com criadores de conteúdo parceiros do HoteisRio para divulgar sua marca.',
    category: BenefitCategory.COMMUNICATION,
    targetSectors: ['SALES', 'MANAGEMENT'],
    iconName: 'Camera',
    imageUrl: '',
    isService: true,
    isNew: true,
    embedUrl: 'https://influenciadores-digitais.vercel.app/#/search',
    customCta: 'Acessar Hub'
  },
  {
    id: 'juridico-01',
    title: 'Assessoria Jurídica',
    description: 'Plantão de dúvidas e defesa de interesses coletivos da hotelaria.',
    category: BenefitCategory.LEGAL,
    targetSectors: ['LEGAL_DEPT', 'HR', 'MANAGEMENT'],
    iconName: 'Scale',
    imageUrl: '',
    isService: true,
    dashboardUrl: 'https://dashboard-juridico-mock.com'
  },
  {
    id: 'public-order-01',
    title: 'Ordem Pública',
    description: 'Canal direto para reportar ocorrências no entorno do hotel.',
    category: BenefitCategory.OPERATIONAL,
    targetSectors: ['SECURITY', 'MANAGEMENT', 'RECEPTION'],
    iconName: 'ShieldAlert',
    imageUrl: '',
    isService: true,
    embedUrl: 'https://forms.zohopublic.com/hoteisrio/form/FORMULRIODEDEMANDASORDEMPBLICA/formperma/w7kNge34KkPE0pW9ocbnDA94ax7dElQK84wqpNtKIo8'
  },
  {
    id: 'calendar-2026',
    title: 'Calendário de Eventos',
    description: 'Programação oficial de eventos da cidade do Rio de Janeiro.',
    category: BenefitCategory.EVENTS,
    targetSectors: ['SALES', 'RECEPTION', 'MANAGEMENT'],
    iconName: 'Calendar',
    imageUrl: '',
    isService: true,
    dashboardUrl: 'https://app.powerbi.com/view?r=eyJrIjoiYTg4NGM2ODEtNDI2NC00NTY2LWFmNGQtOGQ2NDEwMmQyYWVhIiwidCI6IjlhOTczNzc1LWViMzQtNDhkOS05MjYzLWY3Mjg4ZGY5OTlmZSJ9'
  },
  {
      id: 'planejador-feriados-2026',
      title: 'Planejador de Feriados',
      description: 'Ferramenta para planejamento operacional em datas comemorativas.',
      category: BenefitCategory.MANAGEMENT,
      targetSectors: ['MANAGEMENT', 'SALES', 'HR'],
      iconName: 'CalendarCheck',
      imageUrl: '',
      isService: true
  },
  {
      id: 'highlight-events-reg',
      title: 'Cadastro de Grandes Eventos',
      description: 'Inscreva seu hotel para receber delegações de grandes eventos.',
      category: BenefitCategory.EVENTS,
      targetSectors: ['SALES', 'MANAGEMENT'],
      iconName: 'FileText',
      imageUrl: '',
      isService: true,
      fullDetails: 'Ao se cadastrar, seu hotel entra na lista prioritária para hospedagem de participantes de grandes congressos e festivais captados pelo Rio CVB e HoteisRio.'
  },
  {
      id: 'portal-fornecedores-new',
      title: 'Portal de Fornecedores',
      description: 'Catálogo de parceiros homologados com condições especiais.',
      category: BenefitCategory.PARTNERS,
      targetSectors: ['MANAGEMENT', 'MAINTENANCE', 'FB'],
      iconName: 'Truck',
      imageUrl: '',
      isService: true
  },
  {
      id: 'leis-decretos-app',
      title: 'Leis e Decretos',
      description: 'Consulte a legislação vigente que impacta o setor hoteleiro.',
      category: BenefitCategory.LEGAL,
      targetSectors: ['LEGAL_DEPT', 'MANAGEMENT'],
      iconName: 'Book',
      imageUrl: '',
      isService: true
  },
  {
      id: 'occupancy-reports',
      title: 'Relatórios de Ocupação',
      description: 'Dados estatísticos mensais da hotelaria carioca.',
      category: BenefitCategory.STATISTICS,
      targetSectors: ['SALES', 'MANAGEMENT'],
      iconName: 'BarChart',
      imageUrl: '',
      isService: true
  },
  {
      id: 'news-portal',
      title: 'Central de Notícias',
      description: 'Fique por dentro das novidades do turismo e hotelaria.',
      category: BenefitCategory.COMMUNICATION,
      targetSectors: ['MANAGEMENT', 'SALES'],
      iconName: 'Newspaper',
      imageUrl: '',
      isService: true,
      externalLink: 'https://hoteisrio.com.br/noticias'
  },
  {
      id: 'highlight-top-hotel-25',
      title: 'Prêmio Top Hotel 2025',
      description: 'Inscreva seu case de sucesso e concorra ao prêmio máximo da hotelaria.',
      category: BenefitCategory.EVENTS,
      targetSectors: ['MANAGEMENT', 'HR', 'SALES'],
      iconName: 'Trophy',
      imageUrl: '',
      isService: true,
      isNew: true
  },
  {
      id: 'courses-v2',
      title: 'Cursos & Treinamentos',
      description: 'Plataforma de capacitação online para sua equipe.',
      category: BenefitCategory.TRAINING,
      targetSectors: ['HR', 'MANAGEMENT'],
      iconName: 'GraduationCap',
      imageUrl: '',
      isService: true
  },
  {
      id: 'highlight-drinks',
      title: 'Curso: Bebidas Falsas',
      description: 'Treinamento vital para identificação de produtos adulterados.',
      category: BenefitCategory.TRAINING,
      targetSectors: ['FB', 'SECURITY'],
      iconName: 'Wine',
      imageUrl: '',
      isService: true,
      isNew: true
  },
  {
      id: 'highlight-rir',
      title: 'Rock in Rio 2026',
      description: 'Hub de benefícios oficial do festival.',
      category: BenefitCategory.EVENTS,
      targetSectors: ['SALES', 'MANAGEMENT'],
      iconName: 'Music',
      imageUrl: '',
      isService: true,
      isNew: true
  },
  {
      id: 'natal-2025',
      title: 'Natal 2025',
      description: 'Campanha promocional de fim de ano.',
      category: BenefitCategory.EVENTS,
      targetSectors: ['SALES', 'FB'],
      iconName: 'Gift',
      imageUrl: '',
      isService: true
  },
  {
      id: 'calculators-hub',
      title: 'Calculadoras Hoteleiras',
      description: 'Hub de ferramentas para Revenue Management.',
      category: BenefitCategory.TOOLS,
      targetSectors: ['SALES', 'MANAGEMENT'],
      iconName: 'Calculator',
      imageUrl: '',
      isService: true
  },
  {
      id: 'registration-update',
      title: 'Atualização Cadastral',
      description: 'Mantenha os dados do seu hotel e equipe atualizados.',
      category: BenefitCategory.MANAGEMENT,
      targetSectors: ['MANAGEMENT', 'HR'],
      iconName: 'UserCog',
      imageUrl: '',
      isService: true
  }
];

// Append calculators to main list for searchability
BENEFITS_DATA.push(...CALCULATOR_TOOLS);
// --- Fim de constants.ts ---

import { Benefit, BenefitCategory, RioEvent, Forum, GamificationBadge } from './types';

export const MOCK_USER = {
  name: "Carlos Silva",
  hotel: "Copacabana Palace View",
  role: "Gerente Geral"
};

export const CRM_LINK = "https://hoteisrio.com.br/crm/inscricao-newsletter";

export const FOOTER_DATA = {
  address: "Rua Maria Eugenia, 300 - Humaitá, Rio de Janeiro - RJ",
  cep: "22261-080",
  phone: "(21) 2226-2520",
  email: "contato@hoteisrio.com.br",
  razaoSocial: "Associação de Hotéis do Rio de Janeiro - ABIH-RJ",
  cnpj: "33.662.138/0001-44",
  socials: {
    instagram: "https://instagram.com/hoteisrio",
    linkedin: "https://linkedin.com/company/hoteisrio",
    youtube: "https://youtube.com/hoteisrio",
    facebook: "https://facebook.com/hoteisrio"
  }
};

// --- GAMIFICATION CONSTANTS ---
export const LEVEL_THRESHOLDS = {
  BRONZE: 0,
  SILVER: 100,
  GOLD: 300,
  DIAMOND: 600,
  MASTER: 1000
};

export const LEVEL_NAMES = {
  BRONZE: 'Associado Bronze',
  SILVER: 'Associado Prata',
  GOLD: 'Associado Ouro',
  DIAMOND: 'Associado Diamante',
  MASTER: 'Embaixador da Hotelaria'
};

export const XP_REWARDS = {
  USE_BENEFIT: 10,
  VIEW_DETAILS: 2,
  LOGIN_DAILY: 5
};

export const GAMIFICATION_BADGES: GamificationBadge[] = [
  {
    id: 'badge-first-login',
    name: 'Bem-vindo a bordo',
    description: 'Realizou o primeiro acesso ao portal.',
    iconName: 'Medal',
    requiredXP: 0
  },
  {
    id: 'badge-explorer',
    name: 'Explorador',
    description: 'Acessou 5 serviços diferentes.',
    iconName: 'Compass',
    requiredXP: 50
  },
  {
    id: 'badge-social',
    name: 'Conectado',
    description: 'Entrou em um grupo de WhatsApp.',
    iconName: 'Users',
    requiredXP: 100
  },
  {
    id: 'badge-legend',
    name: 'Lenda Hoteleira',
    description: 'Atingiu o nível Mestre.',
    iconName: 'Crown',
    requiredXP: 1000
  }
];

export const FORUMS_DATA: Forum[] = [
  {
    id: 'forum-comercial',
    title: 'Fórum Comercial',
    description: 'Estratégias de vendas, revenue management e análise de mercado.',
    iconName: 'TrendingUp',
    imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=400',
    nextEdition: {
      date: '15 de Maio, 09:00',
      location: 'Windsor Marapendi',
      topic: 'Estratégias para o Segundo Semestre e Calendário de Eventos 2025'
    },
    lastEditions: [
      { date: 'Abril 2024', summary: 'Análise dos resultados do Carnaval e Verão.' },
      { date: 'Março 2024', summary: 'Tendências de distribuição e novas OTAs.' }
    ]
  },
  {
    id: 'forum-rh',
    title: 'Fórum de RH',
    description: 'Gestão de pessoas, legislação trabalhista e capacitação.',
    iconName: 'Users',
    imageUrl: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=400',
    nextEdition: {
      date: '22 de Maio, 14:00',
      location: 'Sede HoteisRio',
      topic: 'Convenção Coletiva 2024/2025 e Saúde Mental'
    },
    lastEditions: [
      { date: 'Abril 2024', summary: 'Recrutamento e Seleção na era digital.' },
      { date: 'Fevereiro 2024', summary: 'Treinamento de equipes para grandes eventos.' }
    ]
  },
  {
    id: 'forum-mkt',
    title: 'Fórum de Comunicação & MKT',
    description: 'Marketing digital, branding e relacionamento com imprensa.',
    iconName: 'Megaphone',
    imageUrl: 'https://images.unsplash.com/photo-1533750516457-a7f992034fec?auto=format&fit=crop&q=80&w=400',
    nextEdition: {
      date: '05 de Junho, 10:00',
      location: 'Online (Zoom)',
      topic: 'Inteligência Artificial aplicada ao Marketing Hoteleiro'
    },
    lastEditions: [
      { date: 'Março 2024', summary: 'Gestão de crises nas redes sociais.' },
      { date: 'Janeiro 2024', summary: 'Planejamento de campanhas sazonais.' }
    ]
  },
  {
    id: 'forum-seguranca',
    title: 'Fórum de Segurança',
    description: 'Integração com forças policiais e protocolos de risco.',
    iconName: 'Shield',
    imageUrl: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=400',
    nextEdition: {
      date: '12 de Junho, 10:00',
      location: 'DEAT - Leblon',
      topic: 'Preparação para alta temporada e segurança no entorno'
    },
    lastEditions: [
      { date: 'Maio 2024', summary: 'Novos canais de comunicação com a PMERJ.' },
      { date: 'Março 2024', summary: 'Prevenção a golpes digitais e reservas falsas.' }
    ]
  },
  {
    id: 'forum-recepcao',
    title: 'Fórum de Recepção',
    description: 'Excelência no atendimento e procedimentos de front-office.',
    iconName: 'ConciergeBell',
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=400',
    nextEdition: {
      date: '20 de Junho, 15:00',
      location: 'Hotel Prodigy Santos Dumont',
      topic: 'Hospitalidade Carioca: O diferencial no check-in'
    },
    lastEditions: [
      { date: 'Abril 2024', summary: 'Upselling e Cross-selling na recepção.' },
      { date: 'Fevereiro 2024', summary: 'Procedimentos de check-in ágil.' }
    ]
  }
];

export const COMMUNITY_ITEMS_DATA = [
  {
    id: 'contacts',
    title: 'Fale Conosco',
    description: 'Contatos diretos das equipes jurídica, comercial e diretoria.',
    iconName: 'Phone',
    colorClass: 'text-orange-600',
    bgClass: 'bg-orange-50',
    hoverTextClass: 'group-hover:text-orange-600',
    hoverBgClass: 'group-hover:bg-orange-600',
    viewTarget: 'CONTACTS'
  },
  {
    id: 'whatsapp',
    title: 'Grupos do WhatsApp',
    description: 'Links para entrar nos grupos oficiais de networking por setor.',
    iconName: 'MessageCircle',
    colorClass: 'text-green-600',
    bgClass: 'bg-green-50',
    hoverTextClass: 'group-hover:text-green-600',
    hoverBgClass: 'group-hover:bg-green-600',
    viewTarget: 'WHATSAPP_GROUPS'
  },
  {
    id: 'events',
    title: 'Agenda HoteisRio',
    description: 'Próximos fóruns, reuniões de diretoria e workshops.',
    iconName: 'Calendar',
    colorClass: 'text-indigo-600',
    bgClass: 'bg-indigo-50',
    hoverTextClass: 'group-hover:text-indigo-600',
    hoverBgClass: 'group-hover:bg-indigo-600',
    viewTarget: 'ASSOCIATION_EVENTS'
  },
  {
    id: 'registration',
    title: 'Atualização Cadastral',
    description: 'Inscreva-se para receber informativos e convites oficiais.',
    iconName: 'UserCog',
    colorClass: 'text-rio-blue',
    bgClass: 'bg-blue-50',
    hoverTextClass: 'group-hover:text-rio-blue',
    hoverBgClass: 'group-hover:bg-rio-blue',
    viewTarget: 'REGISTRATION_UPDATE'
  }
];

export const RIO_EVENTS: RioEvent[] = [
  {
    id: 'ev-01',
    title: 'Web Summit Rio',
    date: '15-18 Abril, 2024',
    location: 'Riocentro',
    type: 'Tecnologia',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'ev-02',
    title: 'Rio Oil & Gas',
    date: '23-26 Setembro, 2024',
    location: 'Boulevard Olímpico',
    type: 'Negócios',
    imageUrl: 'https://images.unsplash.com/photo-1561484930-998b6a7b22e8?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'ev-03',
    title: 'Rock in Rio',
    date: '13-22 Setembro, 2024',
    location: 'Parque Olímpico',
    type: 'Entretenimento',
    imageUrl: 'https://images.unsplash.com/photo-1459749411177-0473ef485078?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'ev-04',
    title: 'Réveillon Copacabana',
    date: '31 Dezembro, 2024',
    location: 'Praia de Copacabana',
    type: 'Turismo',
    imageUrl: 'https://images.unsplash.com/photo-1576180362397-9ae0062a4d04?auto=format&fit=crop&q=80&w=400'
  }
];

export const TEAM_CONTACTS = [
  {
    sector: "Presidência & Superintendência",
    email: "presidencia@hoteisrio.com.br",
    whatsapp: "5521999999999",
    manager: "Alfredo Lopes"
  },
  {
    sector: "Jurídico & Trabalhista",
    email: "juridico@hoteisrio.com.br",
    whatsapp: "5521999999999",
    manager: "Dr. Capanema"
  },
  {
    sector: "Comercial & Novos Negócios",
    email: "comercial@hoteisrio.com.br",
    whatsapp: "5521999999999",
    manager: "Theresa Jannuzzi"
  },
  {
    sector: "Operacional & Segurança",
    email: "operacional@hoteisrio.com.br",
    whatsapp: "5521999999999",
    manager: "Equipe de Apoio"
  },
  {
    sector: "Comunicação & Imprensa",
    email: "comunicacao@hoteisrio.com.br",
    whatsapp: "5521999999999",
    manager: "Assessoria Arteiras"
  },
  {
    sector: "Financeiro",
    email: "financeiro@hoteisrio.com.br",
    whatsapp: "5521999999999",
    manager: "Departamento Financeiro"
  }
];

export const WHATSAPP_GROUPS = [
  {
    id: 'gp-gm',
    name: "Gerentes Gerais (GMs)",
    description: "Grupo exclusivo para GMs trocarem informações estratégicas.",
    link: "https://chat.whatsapp.com/exemplo-gm"
  },
  {
    id: 'gp-rh',
    name: "Recursos Humanos",
    description: "Vagas, legislação trabalhista e convenções coletivas.",
    link: "https://chat.whatsapp.com/exemplo-rh"
  },
  {
    id: 'gp-seg',
    name: "Segurança Hoteleira",
    description: "Alertas em tempo real sobre ocorrências na cidade.",
    link: "https://chat.whatsapp.com/exemplo-seguranca"
  },
  {
    id: 'gp-com',
    name: "Comercial & Vendas",
    description: "Discussão sobre tarifas, eventos e ocupação.",
    link: "https://chat.whatsapp.com/exemplo-comercial"
  },
  {
    id: 'gp-gov',
    name: "Governança",
    description: "Troca de experiências e fornecedores para governantas.",
    link: "https://chat.whatsapp.com/exemplo-governanca"
  },
  {
    id: 'gp-manut',
    name: "Manutenção & Engenharia",
    description: "Soluções técnicas e indicações de serviços.",
    link: "https://chat.whatsapp.com/exemplo-manutencao"
  }
];

export const ASSOCIATION_EVENTS = [
  {
    id: 'forum-comercial',
    title: "Fórum Comercial & Marketing",
    date: "15 de Maio, 09:00",
    location: "Hotel Windsor Marapendi",
    description: "Encontro mensal para discutir estratégias de vendas para o segundo semestre e análise do calendário de eventos da cidade.",
    status: "Confirmado"
  },
  {
    id: 'forum-rh',
    title: "Reunião de RH",
    date: "22 de Maio, 14:00",
    location: "Sede HoteisRio",
    description: "Atualização sobre a convenção coletiva 2024/2025 e palestra sobre saúde mental no trabalho.",
    status: "Confirmado"
  },
  {
    id: 'forum-seguranca',
    title: "Conselho de Segurança Turística",
    date: "05 de Junho, 10:00",
    location: "DEAT - Leblon",
    description: "Reunião com autoridades policiais para alinhamento de segurança para o verão.",
    status: "Agendado"
  },
  {
    id: 'workshop-ia',
    title: "Workshop: IA na Hotelaria",
    date: "12 de Junho, 09:00",
    location: "Online (Zoom)",
    description: "Treinamento prático sobre como usar ferramentas de IA no dia a dia do hotel.",
    status: "Inscrições Abertas"
  }
];

export const RJ_LAWS_DATA = [
  {
    id: 'law-001',
    number: 'Decreto Rio nº 29.881',
    date: '18/09/2008',
    description: 'Institui o Programa de Incentivo ao Turismo na Cidade do Rio de Janeiro e concede incentivos fiscais para hotéis (Redução IPTU).',
    category: 'Tributário',
    link: 'http://mail.camara.rj.gov.br/APL/Legislativos/contlei.nsf/50ad008247b8f030032579ea0073d588/6676101c569777f9032576ac0072b2c3?OpenDocument'
  },
  {
    id: 'law-002',
    number: 'Lei Estadual nº 2.895',
    date: '19/05/1998',
    description: 'Dispõe sobre a obrigatoriedade de disponibilização de cardápios em Braille em bares, restaurantes e hotéis.',
    category: 'Operacional',
    link: '#'
  },
  {
    id: 'law-003',
    number: 'Lei Federal nº 11.771 (Lei Geral do Turismo)',
    date: '17/09/2008',
    description: 'Dispõe sobre a Política Nacional de Turismo, definindo as atribuições do setor hoteleiro e cadastro no Cadastur.',
    category: 'Institucional',
    link: 'http://www.planalto.gov.br/ccivil_03/_ato2007-2010/2008/lei/l11771.htm'
  },
  {
    id: 'law-004',
    number: 'Lei Estadual nº 5.517 (Lei Antifumo RJ)',
    date: '17/08/2009',
    description: 'Proíbe o consumo de cigarros em ambientes de uso coletivo, total ou parcialmente fechados, incluindo hotéis.',
    category: 'Operacional',
    link: '#'
  },
  {
    id: 'law-005',
    number: 'Decreto nº 49.333',
    date: '26/08/2021',
    description: 'Regulamenta procedimentos de licenciamento sanitário e vigilância em estabelecimentos hoteleiros.',
    category: 'Operacional',
    link: '#'
  },
  {
    id: 'law-006',
    number: 'Lei Federal nº 8.069 (ECA - Art. 82)',
    date: '13/07/1990',
    description: 'Proíbe a hospedagem de criança ou adolescente em hotel, salvo se autorizado ou acompanhado pelos pais.',
    category: 'Jurídico',
    link: 'http://www.planalto.gov.br/ccivil_03/leis/l8069.htm'
  },
  {
    id: 'law-007',
    number: 'Convenção Coletiva de Trabalho 2024/2025',
    date: '01/01/2024',
    description: 'Estabelece as diretrizes trabalhistas, pisos salariais e benefícios da categoria hoteleira no Rio de Janeiro.',
    category: 'Trabalhista',
    link: '#'
  }
];

export const OTHER_BENEFITS_LIST = [
  "Monitoramento de novas leis (civil, trabalhista, tributária)",
  "Reuniões periódicas sobre Segurança",
  "Fóruns mensais/bimestrais por área hoteleira",
  "Informativo mensal com notícias e eventos",
  "Negociação de convenções coletivas",
  "Pesquisas de ocupação hoteleira",
  "Divulgação do destino Rio",
  "Calendário de eventos da cidade",
  "Parcerias com empresas de energia renovável"
];

export const BENEFITS_DATA: Benefit[] = [
  // --- CONCURSO DE NATAL 2025 (DESTAQUE MÁXIMO) ---
  {
    id: 'natal-2025',
    title: 'Concurso de Decoração Natalina 2025',
    description: 'Inscrições abertas! Participe e destaque seu hotel na celebração mais mágica do Rio.',
    category: BenefitCategory.EVENTS,
    iconName: 'Gift',
    imageUrl: 'https://images.unsplash.com/photo-1543589077-47d81606c1bf?auto=format&fit=crop&q=80&w=400',
    isService: true,
    isNew: true,
    externalLink: 'https://forms.zohopublic.com/hoteisrio/form/InscriodeHotelNatalHotisRIO2025/formperma/BykHl55SbDyK0cT3wbCmtDBCjB_msRFBMTia8b-IchI',
    usageSteps: [
      "Acesse o formulário de inscrição.",
      "Preencha os dados do hotel e a categoria de decoração.",
      "Aguarde o cronograma de visitas da comissão julgadora.",
      "Participe da cerimônia de premiação."
    ]
  },
  // --- SHUTTLE SERVICE (NOVO) ---
  {
    id: 'shuttle-service',
    title: 'Shuttle Service',
    description: 'Sistema de transporte compartilhado e logística para eventos.',
    category: BenefitCategory.OPERATIONAL,
    iconName: 'Bus',
    imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=400',
    isService: true,
    isNew: true,
    externalLink: 'https://depth-mural-35413640.figma.site/',
    usageSteps: [
      "Acesse a plataforma de agendamento do Shuttle.",
      "Verifique as rotas disponíveis (Aeroportos, Centros de Convenção).",
      "Solicite o serviço para seus hóspedes ou grupos corporativos."
    ]
  },
  // --- CURSOS ONLINE ---
  {
    id: 'online-courses',
    title: 'Cursos Online',
    description: 'Plataforma oficial de ensino e capacitação para associados.',
    category: BenefitCategory.TRAINING,
    iconName: 'MonitorPlay',
    imageUrl: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=400',
    isService: true,
    isNew: true,
    externalLink: 'https://cursos.hoteisrio.com.br/',
    usageSteps: [
      "Acesse a plataforma de cursos clicando em 'Acessar'.",
      "Escolha entre cursos de governança, recepção, idiomas e gestão.",
      "Inscreva seus colaboradores e acompanhe o progresso.",
      "Emita certificados digitais após a conclusão."
    ]
  },
  // --- NOVOS PORTAIS ---
  {
    id: 'forums-overview',
    title: 'Fóruns da Hotelaria',
    description: 'Acesse o calendário completo dos comitês e fóruns.',
    category: BenefitCategory.EVENTS,
    iconName: 'Users',
    imageUrl: 'https://images.unsplash.com/photo-1515168816902-8408aa648c5e?auto=format&fit=crop&q=80&w=400',
    isService: true,
    isNew: true,
    usageSteps: [
      "Visualize todos os fóruns disponíveis (Comercial, RH, Segurança, etc).",
      "Confira as datas das próximas reuniões.",
      "Inscreva-se ou sugira pautas para os encontros."
    ]
  },
  {
    id: 'central-ia-new',
    title: 'Central da IA',
    description: 'Ferramentas de Inteligência Artificial exclusivas para hoteleiros.',
    category: BenefitCategory.TECHNOLOGY,
    iconName: 'Bot',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=400',
    isService: true,
    isNew: true,
    externalLink: 'https://iaparahoteis.sindhoteisrj.com.br/',
    usageSteps: [
      "Acesse a Central da IA.",
      "Utilize os assistentes virtuais para marketing e atendimento.",
      "Explore os cursos de capacitação em tecnologia."
    ]
  },
  {
    id: 'influencers',
    title: 'Influenciadores Digitais',
    description: 'Catálogo de creators homologados para ações de marketing.',
    category: BenefitCategory.COMMUNICATION, // Comunicação & Marketing
    iconName: 'Camera',
    imageUrl: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=400',
    isService: true,
    isNew: true,
    externalLink: 'https://hoteisrio.com.br/influenciadores', // Mock URL
    usageSteps: [
      "Acesse o catálogo de influenciadores.",
      "Filtre por nicho (gastronomia, lifestyle, viagens).",
      "Veja o media kit e entre em contato direto para parcerias."
    ]
  },
  {
    id: 'sustainability-raiox',
    title: 'Raio-X de Sustentabilidade',
    description: 'Avaliação gratuita e online da maturidade sustentável do seu hotel.',
    category: BenefitCategory.OPERATIONAL,
    iconName: 'Leaf',
    imageUrl: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&q=80&w=400',
    isService: true,
    isNew: true,
    externalLink: 'https://sustetanbilidade-hoteisrio.figma.site/',
    usageSteps: [
      "Acesse o Raio-X Online.",
      "Responda ao questionário simplificado sobre suas práticas.",
      "Receba a visita técnica de diagnóstico.",
      "Implemente melhorias de gestão de resíduos e energia."
    ]
  },
  {
    id: 'portal-fornecedores-new',
    title: 'Portal de Fornecedores',
    description: 'Acesse o catálogo completo de fornecedores homologados.',
    category: BenefitCategory.PARTNERS,
    iconName: 'ShoppingBag',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=400',
    isService: true,
    isNew: true,
    externalLink: 'https://beige-lobster-734094.hostingersite.com/',
    usageSteps: [
      "Clique em 'Utilizar' para acessar o portal externo.",
      "Busque por categoria de produto ou serviço.",
      "Entre em contato direto com fornecedores parceiros."
    ]
  },
  {
    id: 'central-rh-new',
    title: 'Central do RH',
    description: 'Plataforma exclusiva para gestores de Recursos Humanos.',
    category: BenefitCategory.HR,
    iconName: 'Users2',
    imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=400',
    isService: true,
    isNew: true,
    externalLink: 'https://centraldorh.sindhoteisrj.com.br/',
    usageSteps: [
      "Acesse a Central do RH.",
      "Consulte convenções coletivas e tabelas salariais.",
      "Acesse modelos de documentos trabalhistas."
    ]
  },
  {
    id: 'planejador-feriados-2026',
    title: 'Calendário de Feriados 2026',
    description: 'Datas de feriados nacionais, estaduais e principais emissores.',
    category: BenefitCategory.COMMERCIAL,
    iconName: 'CalendarCheck',
    imageUrl: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=400',
    isService: true,
    isNew: true,
    externalLink: 'https://planejadordeferiados.sindhoteisrj.com.br/',
    usageSteps: [
      "Consulte feriados nacionais e internacionais.",
      "Verifique as datas dos principais emissores de turistas para o RJ.",
      "Planeje suas escalas operacionais com antecedência."
    ]
  },
  {
    id: 'comercial-planner-2026',
    title: 'Planejador Comercial 2026',
    description: 'Ferramenta para gerar ações comerciais baseadas em datas.',
    category: BenefitCategory.COMMERCIAL,
    iconName: 'TrendingUp',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400',
    isService: true,
    isNew: true,
    externalLink: 'https://planejadordeferiados.sindhoteisrj.com.br/',
    usageSteps: [
      "Acesse o Planejador Comercial.",
      "Selecione uma data comemorativa ou feriado.",
      "Gere insights de pacotes e promoções específicas para a data."
    ]
  },
  {
    id: 'central-manutencao-new',
    title: 'Central da Manutenção',
    description: 'Hub de serviços técnicos e suporte para engenharia hoteleira.',
    category: BenefitCategory.OPERATIONAL,
    iconName: 'Wrench',
    imageUrl: 'https://images.unsplash.com/photo-1581092921461-eab62e97a782?auto=format&fit=crop&q=80&w=400',
    isService: true,
    isNew: true,
    externalLink: 'https://centraldamanutencao.sindhoteisrj.com.br/',
    usageSteps: [
      "Acesse a Central da Manutenção.",
      "Encontre prestadores de serviços técnicos especializados.",
      "Consulte manuais de boas práticas de manutenção predial."
    ]
  },

  // --- BENEFICIO ATUALIZAÇÃO CADASTRAL (NOVO) ---
  {
    id: 'registration-update',
    title: 'Atualização Cadastral',
    description: 'Receba o Informativo Mensal, convites para eventos e alertas.',
    category: BenefitCategory.COMMUNICATION,
    iconName: 'UserCog',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=400',
    isService: true,
    isNew: true,
    usageSteps: [
      "Clique em 'Utilizar' para acessar a área de cadastro.",
      "Atualize seu e-mail para receber comunicados oficiais e convites.",
      "Compartilhe o link de inscrição com sua equipe via WhatsApp."
    ]
  },

  // --- BENEFICIO PLACAS OBRIGATORIAS (NOVO) ---
  {
    id: 'placas-obrigatorias',
    title: 'Placas Obrigatórias',
    description: 'Kit completo com todas as placas de sinalização exigidas por lei.',
    category: BenefitCategory.LEGAL,
    iconName: 'ClipboardList',
    imageUrl: 'https://images.unsplash.com/photo-1563215579-24da5a2df85e?auto=format&fit=crop&q=80&w=400',
    isService: true,
    isNew: true,
    downloadUrl: 'https://sindhoteisrj.com.br/placas-obrigatorias-download.zip', // Mock URL
    usageSteps: [
      "Clique no botão de download para baixar o pacote ZIP.",
      "Descompacte o arquivo em seu computador.",
      "Imprima as placas em alta resolução.",
      "Fixe na recepção e áreas comuns conforme a legislação indicada em cada arquivo."
    ]
  },
  
  // --- NOVO BENEFICIO: CONVENIO ECAD ---
  {
    id: 'ecad-agreement',
    title: 'Convênio ECAD (Desconto de 60%)',
    description: 'Parceria exclusiva garante descontos em débitos e mensalidades.',
    category: BenefitCategory.INSTITUTIONAL,
    iconName: 'Music',
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=400',
    isNew: true,
    usageSteps: [
      "Verifique se o hotel está adimplente com a mensalidade associativa.",
      "O benefício oferece até 60% de desconto em débitos passados.",
      "Descontos especiais para mensalidades de áreas comuns e quartos (inclusive Simples Nacional).",
      "Solicite sua adesão enviando e-mail para: julio.correa@hoteisrio.com.br ou julio.correa@abihrj.com.br."
    ]
  },

  // --- SERVIÇOS (TOPO DA PÁGINA) ---
  {
    id: 'security',
    title: 'Segurança',
    description: 'Parceria com forças policiais para segurança turística.',
    category: BenefitCategory.OPERATIONAL,
    iconName: 'Shield',
    imageUrl: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=400',
    isService: true,
    usageSteps: [
      "Utilize o Canal Ordem Pública para reportes não emergenciais.",
      "Em caso de emergência, utilize o botão de pânico (se disponível) ou ligue 190.",
      "Participe das reuniões mensais com o BPTur e DEAT.",
      "Receba orientações preventivas para hóspedes."
    ]
  },
  {
    id: 'juridico-01',
    title: 'Assessoria Jurídica',
    description: 'Abertura de chamados e suporte especializado em causas trabalhistas.',
    category: BenefitCategory.LEGAL,
    iconName: 'Scale',
    imageUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400',
    isService: true,
    usageSteps: [
      "Clique no botão 'Utilizar' para abrir o formulário oficial.",
      "Preencha os dados do hotel e o tipo de demanda (Trabalhista, Cível ou Tributária).",
      "Anexe documentos relevantes se houver.",
      "Aguarde o retorno da equipe jurídica em até 48 horas úteis via e-mail."
    ]
  },
  {
    id: 'laws-regulations',
    title: 'Decretos e Leis RJ',
    description: 'Consulta completa à legislação hoteleira vigente no Rio.',
    category: BenefitCategory.LEGAL,
    iconName: 'Gavel',
    imageUrl: 'https://images.unsplash.com/photo-1589578527966-fdac0f44566c?auto=format&fit=crop&q=80&w=400',
    isService: true,
    usageSteps: [
      "Acesse a base atualizada de leis e decretos.",
      "Filtre por categoria (Trabalhista, Operacional, Tributário).",
      "Visualize o número da lei, data e resumo da obrigatoriedade.",
      "Acesse o link oficial do diário oficial quando disponível."
    ]
  },
  {
    id: 'public-order-01',
    title: 'Canal Ordem Pública',
    description: 'Reporte irregularidades e solicite apoio de segurança no entorno.',
    category: BenefitCategory.OPERATIONAL,
    iconName: 'ShieldAlert',
    imageUrl: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&q=80&w=400',
    isService: true,
    dashboardUrl: 'https://ordempublica.sindhoteisrj.com.br/',
    usageSteps: [
      "Identifique uma irregularidade no entorno do hotel (ex: camelôs, lixo, insegurança).",
      "Acesse o formulário clicando em 'Utilizar'.",
      "Descreva o ocorrido e, se possível, envie fotos.",
      "A HoteisRio encaminhará a demanda diretamente aos órgãos públicos responsáveis."
    ]
  },
  {
    id: 'calendar-01',
    title: 'Calendário de Eventos do Rio',
    description: 'Painel interativo de grandes eventos e inteligência de mercado.',
    category: BenefitCategory.EVENTS,
    iconName: 'CalendarDays',
    imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=400',
    isService: true,
    usageSteps: [
      "Acesse o painel para visualizar o calendário consolidado da cidade.",
      "Utilize os filtros para selecionar por mês, tipo de evento ou região.",
      "Analise os picos de demanda para ajustar sua tarifa (Revenue Management).",
      "Exporte os dados em Excel se necessário."
    ]
  },
  {
    id: 'cv-bank',
    title: 'Banco de Talentos',
    description: 'Acesse currículos qualificados para vagas no seu hotel.',
    category: BenefitCategory.HR,
    iconName: 'FileText',
    imageUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=400',
    isService: true,
    usageSteps: [
      "Entre em contato com o setor de RH da HoteisRio.",
      "Solicite o acesso à base de currículos filtrada por função.",
      "Receba os perfis selecionados via e-mail.",
      "Realize as entrevistas diretamente com os candidatos."
    ]
  },
  {
    id: 'app-hoteis',
    title: 'App HotéisRIO',
    description: 'Baixe o aplicativo exclusivo para gestão na palma da mão.',
    category: BenefitCategory.TECHNOLOGY,
    iconName: 'TabletSmartphone',
    imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=400',
    isService: true,
    externalLink: 'https://app.hoteisrio.com.br/',
    usageSteps: [
      "Acesse o link oficial do Web App.",
      "Adicione à tela inicial do seu celular para acesso rápido.",
      "Faça login com as mesmas credenciais deste portal.",
      "Receba notificações push em tempo real sobre segurança e legislação."
    ]
  },

  // --- BENEFÍCIOS GERAIS (CATÁLOGO ABAIXO) ---
  
  // --- Destaque Conquista (IPTU) ---
  {
    id: 'iptu-01',
    title: 'Desconto de 40% no IPTU',
    description: 'Benefício renovado até 2028 para todos os hotéis associados.',
    category: BenefitCategory.INSTITUTIONAL,
    iconName: 'Percent',
    imageUrl: '',
    isNew: true,
    usageSteps: [
      "Certifique-se de estar em dia com as mensalidades associativas.",
      "A renovação é automática para associados adimplentes junto à Prefeitura.",
      "Caso não receba o desconto no boleto, entre em contato com nosso setor jurídico.",
      "Mantenha seu Certificado de Regularidade HoteisRio atualizado."
    ]
  },
  {
    id: 'top-hotel',
    title: 'Prêmio Top Hotel',
    description: 'Reconhecimento aos melhores cases e práticas do setor hoteleiro.',
    category: BenefitCategory.EVENTS,
    iconName: 'Trophy',
    imageUrl: 'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&q=80&w=400',
    isNew: true,
    usageSteps: [
      "Aguarde a abertura das inscrições (anunciada no Boletim).",
      "Envie seu case de sucesso nas categorias disponíveis.",
      "Participe da cerimônia de premiação anual.",
      "Utilize o selo 'Top Hotel' em seu marketing caso seja vencedor."
    ]
  },
  {
    id: 'imprensa',
    title: 'Comunicação e Imprensa',
    description: 'Assessoria de imprensa e visibilidade na mídia para o setor.',
    category: BenefitCategory.COMMUNICATION, // Comunicação & Marketing
    iconName: 'Megaphone',
    imageUrl: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=400',
    usageSteps: [
      "Envie novidades do seu hotel (reformas, festivais gastronômicos) para nossa assessoria.",
      "Nossa equipe transformará em pauta para a mídia especializada.",
      "Acompanhe o clipping de notícias enviado mensalmente.",
      "Participe das entrevistas coletivas organizadas pela associação."
    ]
  },
  {
    id: 'whatsapp-groups',
    title: 'Grupos WhatsApp',
    description: 'Networking e informações rápidas entre gestores e a associação.',
    category: BenefitCategory.COMMUNICATION, // Comunicação & Marketing
    iconName: 'MessageCircle',
    imageUrl: 'https://images.unsplash.com/photo-1611746347311-3a9957777cfa?auto=format&fit=crop&q=80&w=400',
    usageSteps: [
      "Solicite a inclusão no grupo referente à sua região ou cargo (ex: GM, Comercial, RH).",
      "Respeite as regras de postagem (apenas assuntos profissionais).",
      "Receba alertas de segurança em tempo real.",
      "Interaja com outros gestores para troca de melhores práticas."
    ]
  },
  {
    id: 'forums',
    title: 'Fóruns e Reuniões',
    description: 'Debates sobre o futuro da hotelaria e alinhamento estratégico.',
    category: BenefitCategory.EVENTS,
    iconName: 'Users',
    imageUrl: 'https://images.unsplash.com/photo-1515168816902-8408aa648c5e?auto=format&fit=crop&q=80&w=400',
    usageSteps: [
      "Consulte o calendário de reuniões no portal.",
      "Confirme sua presença via RSVP.",
      "Leve pautas e sugestões para serem debatidas.",
      "Receba a ata da reunião com os encaminhamentos definidos."
    ]
  },
  {
    id: 'edu-partners',
    title: 'Convênios Educacionais',
    description: 'Descontos em faculdades e cursos para colaboradores.',
    category: BenefitCategory.PARTNERS,
    iconName: 'GraduationCap',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=400',
    usageSteps: [
      "Acesse a lista de instituições parceiras no portal.",
      "Solicite a carta de vínculo empregatício ao RH do hotel.",
      "Apresente a carta no momento da matrícula na instituição.",
      "O desconto será aplicado automaticamente na mensalidade."
    ]
  },
  {
    id: 'sustainability',
    title: 'Sustentabilidade',
    description: 'Certificações ESG e Dashboard de Sustentabilidade.',
    category: BenefitCategory.OPERATIONAL,
    iconName: 'Leaf',
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=400',
    dashboardUrl: 'https://app.powerbi.com/view?r=eyJrIjoiMzM1NGQyMGYtZGU4NS00ZTQ1LTg3ZjAtMjYzZjhlZjU2YmY2IiwidCI6IjlhOTczNzc1LWViMzQtNDhkOS05MjYzLWY3Mjg4ZGY5OTlmZSJ9',
    usageSteps: [
      "Acesse o Dashboard para ver os indicadores de sustentabilidade do Rio.",
      "Inscreva-se no programa de certificação HoteisRio Sustentável.",
      "Receba a visita técnica de diagnóstico.",
      "Implemente melhorias de gestão de resíduos e energia."
    ]
  },
  {
    id: 'trainings',
    title: 'Treinamentos',
    description: 'Capacitação contínua via Universidade HoteisRio.',
    category: BenefitCategory.TRAINING,
    iconName: 'BookOpen',
    imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=400',
    usageSteps: [
      "Verifique a agenda de cursos da Universidade HoteisRio.",
      "Inscreva seus colaboradores via portal.",
      "Os cursos podem ser presenciais ou EAD.",
      "Certificados são emitidos após a conclusão."
    ]
  },
  {
    id: 'suppliers',
    title: 'Fornecedores Parceiros',
    description: 'Clube de compras com condições exclusivas para associados.',
    category: BenefitCategory.PARTNERS,
    iconName: 'Handshake',
    imageUrl: 'https://images.unsplash.com/photo-1472851294608-415522f96319?auto=format&fit=crop&q=80&w=400',
    usageSteps: [
      "Acesse o guia de fornecedores no portal.",
      "Identifique as empresas com o selo 'Parceiro Oficial'.",
      "Informe que é associado HoteisRio no momento da cotação.",
      "Aproveite tabelas de preços e prazos diferenciados."
    ]
  },
  {
    id: 'newsletter',
    title: 'Informativo Mensal',
    description: 'Notícias, convites para eventos e atualizações do setor.',
    category: BenefitCategory.COMMUNICATION, // Comunicação & Marketing
    iconName: 'Mail',
    imageUrl: 'https://images.unsplash.com/photo-1557568192-238a63f66318?auto=format&fit=crop&q=80&w=400',
    usageSteps: [
      "Cadastre os e-mails da sua equipe na seção 'Atualização Cadastral'.",
      "Receba convites para eventos e lançamentos de produtos.",
      "Acompanhe as notícias legislativas e de mercado.",
      "Compartilhe informações relevantes com seu time operacional."
    ]
  },
  {
    id: 'occupation-stats',
    title: 'Pesquisas de Ocupação',
    description: 'Participe e acesse dados vitais de ocupação do Rio de Janeiro.',
    category: BenefitCategory.STATISTICS,
    iconName: 'PieChart',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400',
    dashboardUrl: 'https://app.powerbi.com/view?r=eyJrIjoiOGU2NTUyNjMtN2I3OS00N2E1LTg3ZjAtMjYzZjhlZjU2YmY2IiwidCI6IjlhOTczNzc1LWViMzQtNDhkOS05MjYzLWY3Mjg4ZGY5OTlmZSJ9',
    externalLink: CRM_LINK, // Link to update mailing/signup for surveys
    usageSteps: [
      "Acesse o Dashboard para visualizar a performance do mercado.",
      "Clique em 'Utilizar' para atualizar seu cadastro e garantir o recebimento das pesquisas.",
      "Responda às pesquisas semanais e de feriados.",
      "Seus dados são confidenciais e fundamentais para a estatística do setor."
    ]
  },
  {
    id: 'support-general',
    title: 'Suporte',
    description: 'Atendimento direto da associação para suas demandas.',
    category: BenefitCategory.SUPPORT,
    iconName: 'Headphones',
    imageUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=400',
    usageSteps: [
      "Entre em contato via telefone, e-mail ou WhatsApp oficial.",
      "Identifique-se com o nome do hotel e cargo.",
      "Sua demanda será direcionada ao departamento responsável.",
      "Acompanhe o status da solicitação com a equipe de atendimento."
    ]
  }
];

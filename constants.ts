
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
    link: 'https://hoteisrio.com.br/feiras',
    color: 'bg-blue-600',
    textClass: 'text-blue-600',
    iconColor: 'text-blue-200'
  },
  {
    id: 'commercial-procap',
    title: 'PROCAP - Capacitação',
    description: 'Inscreva-se nos projetos de capacitação junto a emissores, agentes e operadores de turismo.',
    iconName: 'Presentation',
    buttonText: 'Inscrições em Breve!',
    link: 'https://hoteisrio.com.br/procap',
    color: 'bg-indigo-600',
    textClass: 'text-indigo-600',
    iconColor: 'text-indigo-200'
  },
  {
    id: 'commercial-xp-rio',
    title: 'Experiência Rio',
    description: 'Participe das ações de promoção do destino e famtours exclusivos para mostrar o melhor do Rio.',
    iconName: 'Sparkles',
    buttonText: 'Inscrições em Breve!',
    link: 'https://hoteisrio.com.br/experiencia',
    color: 'bg-pink-600',
    textClass: 'text-pink-600',
    iconColor: 'text-pink-200'
  }
];

export const GALLERY_EVENTS = [
  // Galeria removida conforme solicitação
];

export const BENEFITS_DATA: Benefit[] = [
  // --- AÇÕES COMERCIAIS (HUB UNIFICADO) ---
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

  // --- CALENDÁRIOS ---
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

  // --- MARKETING & COMUNICAÇÃO ---
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
    title: 'Parceiros Influenciadores',
    description: 'Conecte-se com nossos parceiros para divulgar sua marca.',
    category: BenefitCategory.COMMUNICATION,
    targetSectors: ['SALES', 'MANAGEMENT'],
    iconName: 'Camera',
    imageUrl: '',
    isService: true,
    isNew: true,
    customCta: 'Ver Parceiros'
  },

  // --- LEGISLAÇÃO ---
  {
    id: 'leis-decretos-app',
    title: 'Leis e Decretos RJ (App)',
    description: 'Sistema inteligente de busca e consulta de legislação hoteleira atualizada.',
    category: BenefitCategory.LEGAL,
    targetSectors: ['LEGAL_DEPT', 'MANAGEMENT', 'HR'],
    iconName: 'Gavel',
    imageUrl: '',
    isService: true,
    isNew: true,
    embedUrl: 'https://leis-e-decretos-hoteis-rio-e-abihrj.vercel.app/',
    customCta: 'Acessar Sistema Legal'
  },
  {
    id: 'placas-recepcao',
    title: 'Placas Obrigatórias da Recepção',
    description: 'Kit oficial para download com todas as placas exigidas por lei (Procon, Antifumo, etc).',
    category: BenefitCategory.LEGAL,
    targetSectors: ['RECEPTION', 'MANAGEMENT', 'LEGAL_DEPT'],
    iconName: 'Stamp',
    imageUrl: '',
    isService: true,
    isNew: true,
    downloadUrl: 'https://drive.google.com/file/d/1ps8dpidzYS0PxR6-PQIQT5gmNsJexZOb/view?usp=sharing',
    customCta: 'Baixar Placas (Drive)'
  },
  {
    id: 'juridico-01',
    title: 'Assessoria Jurídica',
    description: 'Suporte legal especializado para associados.',
    category: BenefitCategory.LEGAL,
    targetSectors: ['MANAGEMENT', 'LEGAL_DEPT'],
    iconName: 'Gavel',
    imageUrl: '',
    isService: true,
    dashboardUrl: 'https://forms.zohopublic.com/hoteisrio/form/AssessoriaJuridicaHotisRIO/formperma/fu39bcu4m02hW1cSina-onTXjx9GomFvznNKYqkP0j8',
    customCta: 'Solicitar Atendimento'
  },

  // --- FERRAMENTAS E SERVIÇOS ---
  {
    id: 'banco-talentos',
    title: 'Banco de Talentos',
    description: 'Plataforma exclusiva de recrutamento. Divulgue vagas ou acesse a base de candidatos.',
    category: BenefitCategory.HR,
    targetSectors: ['HR', 'MANAGEMENT'],
    iconName: 'Users',
    imageUrl: '',
    isService: true,
    isNew: true,
    customCta: 'Acessar Plataforma'
  },
  {
    id: 'portal-fornecedores-new',
    title: 'Fornecedores para Hotéis',
    description: 'Encontre parceiros homologados e negociações exclusivas.',
    category: BenefitCategory.PARTNERS,
    targetSectors: ['MANAGEMENT', 'MAINTENANCE', 'HOUSEKEEPING', 'FB'],
    iconName: 'Briefcase',
    imageUrl: '',
    isService: true,
    embedUrl: 'https://portaldefornecedores.sindhoteisrj.com.br/',
    externalLink: 'https://portaldefornecedores.sindhoteisrj.com.br/'
  },
  {
    id: 'online-courses',
    title: 'Cursos Online',
    description: 'Plataforma oficial de ensino e capacitação para associados.',
    category: BenefitCategory.TRAINING,
    targetSectors: ['HR', 'RECEPTION', 'HOUSEKEEPING'],
    iconName: 'MonitorPlay',
    imageUrl: '',
    isService: true,
    externalLink: 'https://cursos.hoteisrio.com.br/'
  },
  // Shuttle Service Removido
  // Central IA Removido
  {
    id: 'sustainability-raiox',
    title: 'Raio-X de Sustentabilidade',
    description: 'Avaliação gratuita e online da maturidade sustentável do seu hotel.',
    category: BenefitCategory.OPERATIONAL,
    targetSectors: ['MAINTENANCE', 'MANAGEMENT'],
    iconName: 'Leaf',
    imageUrl: '',
    isService: true,
    fullDetails: 'Elaborado pela IA.',
    externalLink: 'https://sustetanbilidade-hoteisrio.figma.site/'
  },
  // Central RH Removido
  {
    id: 'public-order-01',
    title: 'Demandas de Ordem Pública',
    description: 'Canal direto para reportar ocorrências no entorno.',
    category: BenefitCategory.OPERATIONAL,
    targetSectors: ['MANAGEMENT', 'SECURITY'],
    iconName: 'Megaphone',
    imageUrl: '',
    isService: true,
    embedUrl: 'http://hoteisrio.com.br/ordem-publica',
    customCta: 'Reportar Ocorrência'
  },
  {
    id: 'registration-update',
    title: 'Atualização Cadastral',
    description: 'Mantenha os dados do seu hotel atualizados.',
    category: BenefitCategory.INSTITUTIONAL,
    targetSectors: ['MANAGEMENT', 'HR'],
    iconName: 'UserCog',
    imageUrl: '',
    isService: true,
    externalLink: 'https://u2s0o.share.hsforms.com/2rFHWMzfmTfiLNOmWU7uUvg'
  },
  {
    id: 'occupancy-reports',
    title: 'Relatórios de Ocupação',
    description: 'Dados estatísticos de ocupação hoteleira.',
    category: BenefitCategory.STATISTICS,
    targetSectors: ['MANAGEMENT', 'SALES'],
    iconName: 'BarChart3',
    imageUrl: '',
    isService: true,
    dashboardUrl: 'https://observatorio.sindhoteisrj.com.br/',
    customCta: 'Ver Observatório'
  },

  // --- DESTAQUES / CAMPANHAS ---
  {
    id: 'highlight-top-hotel-25',
    title: 'Prêmio Top Hotel RJ 2025',
    description: 'Confira os vencedores e as melhores práticas do setor.',
    category: BenefitCategory.EVENTS,
    targetSectors: ['MANAGEMENT', 'SALES', 'HR'],
    iconName: 'Trophy',
    imageUrl: 'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&q=80&w=400',
    isService: true,
    isNew: true,
    embedUrl: 'https://premiotophotel.sindhoteisrj.com.br/',
    customCta: 'Acessar Site Oficial'
  },
  {
    id: 'highlight-drinks',
    title: 'Curso: Identificação de Bebidas Falsas',
    description: 'Workshop técnico em parceria com ABBD e Procon RJ.',
    category: BenefitCategory.TRAINING,
    targetSectors: ['FB', 'MAINTENANCE'],
    iconName: 'Wine',
    imageUrl: '',
    isService: true,
    isNew: true,
    customCta: 'Assistir Curso Agora'
  },
  {
    id: 'highlight-rir',
    title: 'Viva o Rio com o Rock in Rio 2026',
    description: 'Cadastre seu hotel no hub oficial de benefícios do festival.',
    category: BenefitCategory.COMMERCIAL,
    targetSectors: ['MANAGEMENT', 'SALES'],
    iconName: 'Music',
    imageUrl: '',
    isService: true,
    isNew: true
  },
  {
    id: 'highlight-events-reg',
    title: 'Cadastro de Grandes Eventos',
    description: 'Parceria SETUR/TurisRio e Segurança Pública para apoio a eventos.',
    category: BenefitCategory.OPERATIONAL,
    targetSectors: ['MANAGEMENT', 'SALES', 'RECEPTION'],
    iconName: 'FileCheck',
    imageUrl: '',
    isService: true,
    isNew: true,
    embedUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdm5ehKWYpU3e70FTKUWUnaRget8l9l3d-Y-xU7qEnCABcCZA/viewform',
    customCta: 'Acessar Formulário',
    fullDetails: `O HotéisRIO vem comunicar aos hotéis associados que a Secretaria de Estado de Turismo – SETUR e a Companhia de Turismo do Estado do Rio de Janeiro – TurisRio criaram um Grupo de Trabalho de Apoio aos Eventos e Negócios Corporativos e uma das ações implementadas por ele foi disponibilizar um formulário para que os organizadores de eventos, meios de hospedagens e Centro de convenções informem detalhes do seus eventos ao Governo do Estado.

O formulário somente deverá ser preenchido para eventos de negócios corporativos que promovam concentração a partir de 500 pessoas.

Caberá a SETUR/TurisRio encaminhar o formulário com as informações relativas ao evento ao setor da Polícia Militar responsável pela região.

Esta iniciativa visa contribuir para que as informações sobre os eventos cheguem ao comando de área da Polícia Militar e ao respectivo batalhão para que providenciem o apoio, caso julguem necessário.

Foi encaminhado a todos os associados no dia 15 de dezembro de 2023 o comunicado interno sobre este assunto - HOTÉIS-RIO-CI-106/2023`
  },
  {
    id: 'news-portal',
    title: 'Portal de Notícias HoteisRio',
    description: 'Fique por dentro das últimas novidades da hotelaria carioca e nacional.',
    category: BenefitCategory.COMMUNICATION,
    targetSectors: ['MANAGEMENT', 'SALES', 'HR'],
    iconName: 'Newspaper',
    imageUrl: '',
    isService: true,
    isNew: true,
    externalLink: 'https://sindhoteisrj.com.br/noticias',
    customCta: 'Ler Notícias'
  },
  {
    id: 'natal-2025',
    title: 'Vencedores: Decoração Natalina',
    description: 'Confira a galeria de fotos com os vencedores do concurso de 2025.',
    category: BenefitCategory.EVENTS,
    targetSectors: ['MANAGEMENT', 'SALES', 'MAINTENANCE'],
    iconName: 'Gift',
    imageUrl: '',
    isService: true,
    isNew: true,
    externalLink: 'https://hoteisrio.com.br/natal-2025-vencedores', // Link corrigido
    customCta: 'Ver Galeria'
  },
  
  // --- CALCULADORAS INDIVIDUAIS ---
  {
    id: 'calc-adr',
    title: 'Calculadora de Diária Média (ADR)',
    description: 'Calcule o valor médio pago por apartamento ocupado em um período determinado.',
    category: BenefitCategory.TOOLS,
    targetSectors: ['SALES', 'MANAGEMENT'],
    iconName: 'TrendingUp',
    imageUrl: '',
    isService: true,
    customCta: 'Calcular ADR'
  },
  {
    id: 'calc-revpar',
    title: 'Calculadora de RevPAR',
    description: 'Indicador de receita por quarto disponível. Essencial para análise de desempenho.',
    category: BenefitCategory.TOOLS,
    targetSectors: ['SALES', 'MANAGEMENT'],
    iconName: 'BarChart3',
    imageUrl: '',
    isService: true,
    customCta: 'Calcular RevPAR'
  },
  {
    id: 'calc-occ',
    title: 'Calculadora de Ocupação',
    description: 'Monitore a taxa de ocupação do hotel em relação à capacidade total.',
    category: BenefitCategory.TOOLS,
    targetSectors: ['SALES', 'RECEPTION', 'MANAGEMENT'],
    iconName: 'PieChart',
    imageUrl: '',
    isService: true,
    customCta: 'Calcular %'
  },
  {
    id: 'calc-goppar',
    title: 'Calculadora de GOPPAR',
    description: 'Avalie o lucro operacional bruto por quarto disponível.',
    category: BenefitCategory.TOOLS,
    targetSectors: ['MANAGEMENT', 'SALES'],
    iconName: 'Wallet',
    imageUrl: '',
    isService: true,
    customCta: 'Calcular Lucro'
  }
];

export const COURSES_DATA: any[] = [
  { 
    id: 'course-future', 
    youtubeId: '_q2a96-cgFE', 
    title: 'O Futuro dos Meios de Hospedagem', 
    description: 'Simpósio completo (HD) discutindo tendências, inovação e o futuro da hotelaria no cenário global e local.', 
    category: 'Estratégia', 
    duration: '3h 30m', 
    thumbnailUrl: 'https://img.youtube.com/vi/_q2a96-cgFE/maxresdefault.jpg', 
    isNew: false 
  },
  { 
    id: 'course-drinks', 
    youtubeId: 'KNtlsV3ad2I', 
    title: 'Identificação de Bebidas Falsificadas', 
    description: 'Treinamento técnico sobre segurança de alimentos e bebidas, focado na identificação de fraudes.', 
    category: 'Operacional & Segurança', 
    duration: '2h 15m', 
    thumbnailUrl: 'https://img.youtube.com/vi/KNtlsV3ad2I/maxresdefault.jpg', 
    isNew: true 
  },
  { 
    id: 'course-shuttle', 
    youtubeId: '0GcOpWXiQDI', 
    title: 'Treinamento Shuttle e Recepção', 
    description: 'Melhores práticas para o serviço de transfer e acolhimento na recepção do hotel.', 
    category: 'Recepção', 
    duration: '45m', 
    thumbnailUrl: 'https://img.youtube.com/vi/0GcOpWXiQDI/maxresdefault.jpg', 
    isNew: false 
  },
  { 
    id: 'course-fnhr', 
    youtubeId: 'YeSKeFOy52Y', 
    title: 'Treinamento FNHR Digital', 
    description: 'Capacitação sobre o preenchimento correto e a gestão da Ficha Nacional de Registro de Hóspedes.', 
    category: 'Gestão & Tecnologia', 
    duration: '1h 10m', 
    thumbnailUrl: 'https://img.youtube.com/vi/YeSKeFOy52Y/maxresdefault.jpg', 
    isNew: false 
  }
];

// Re-exports for existing functionality
export const RIO_EVENTS: RioEvent[] = [
  { id: '1', title: 'Réveillon 2025', date: '31-12-2024', location: 'Copacabana', type: 'Festa', imageUrl: '' },
  { id: '2', title: 'Carnaval 2025', date: '28-02-2025', location: 'Sambódromo', type: 'Festa', imageUrl: '' },
  { id: '3', title: 'Web Summit Rio', date: '15-04-2025', location: 'Riocentro', type: 'Congresso', imageUrl: '' }
];

export const TEAM_CONTACTS = [
  { sector: 'Superintendência', manager: 'Theresa Jansen', email: 'theresa.jansen@hoteisrio.com.br', whatsapp: '21988888888' },
  { sector: 'Gerência Operacional', manager: 'Julio Correa', email: 'julio.correa@hoteisrio.com.br', whatsapp: '21988888888' },
  { sector: 'Eventos', manager: 'Julie Souza', email: 'julie.souza@hoteisrio.com.br', whatsapp: '21988888888' },
  { sector: 'Financeiro', manager: 'Mauricio Ferreira', email: 'mauricio.ferreira@hoteisrio.com.br', whatsapp: '' },
  { sector: 'Marketing', manager: 'Equipe Marketing', email: 'marketing@hoteisrio.com.br', whatsapp: '21988888888' }
];

export const WHATSAPP_GROUPS = [
  { 
    id: 'group-gms', 
    name: 'Gerentes Gerais (GMs)', 
    description: 'Grupo exclusivo para GMs trocarem informações estratégicas.', 
    link: 'https://chat.whatsapp.com/example' 
  },
  { 
    id: 'group-rh', 
    name: 'Recursos Humanos', 
    description: 'Vagas, legislação trabalhista e convenções coletivas.', 
    link: 'https://chat.whatsapp.com/example' 
  },
  { 
    id: 'group-seg', 
    name: 'Segurança Hoteleira', 
    description: 'Alertas em tempo real sobre ocorrências na cidade.', 
    link: 'https://chat.whatsapp.com/example' 
  },
  { 
    id: 'group-comercial', 
    name: 'Comercial & Vendas', 
    description: 'Discussão sobre tarifas, eventos e ocupação.', 
    link: 'https://chat.whatsapp.com/example' 
  },
  { 
    id: 'group-gov', 
    name: 'Governança', 
    description: 'Troca de experiências e fornecedores para governantas.', 
    link: 'https://chat.whatsapp.com/example' 
  },
  { 
    id: 'group-manutencao', 
    name: 'Manutenção & Engenharia', 
    description: 'Soluções técnicas e indicações de serviços.', 
    link: 'https://chat.whatsapp.com/example' 
  },
  { 
    id: 'group-recepcao', 
    name: 'Recepção & Front Office', 
    description: 'Técnicas de atendimento, check-in/out e procedimentos.', 
    link: 'https://chat.whatsapp.com/example' 
  },
  { 
    id: 'group-ab', 
    name: 'Alimentos & Bebidas', 
    description: 'Gestão de restaurantes, bares e café da manhã.', 
    link: 'https://chat.whatsapp.com/example' 
  }
];

export const ASSOCIATION_EVENTS = [
  { id: 'evt-01', title: 'Reunião Geral', date: '15 de Maio, 09:00', location: 'Hotel Othon', description: 'Alinhamento estratégico', status: 'Confirmado', type: 'Reunião', imageUrl: '' }
];

export const RJ_LAWS_DATA = [
  { id: 'law-01', number: 'Lei 1234', description: 'Lei do Silêncio', category: 'Operacional', link: '#', date: '2023' }
];

export const FORUMS_DATA: Forum[] = [
  { 
    id: 'forum-comercial', 
    title: 'Fórum Comercial', 
    description: 'Estratégias de vendas, revenue management e tendências de mercado.', 
    iconName: 'TrendingUp', 
    imageUrl: '', 
    nextEdition: { date: 'Data a ser informada', location: 'A definir', topic: 'Inscrições em breve' }, 
    lastEditions: [] 
  },
  { 
    id: 'forum-rh', 
    title: 'Fórum de RH e DP', 
    description: 'Melhores práticas de gestão de pessoas, legislação trabalhista e retenção de talentos.', 
    iconName: 'Users', 
    imageUrl: '', 
    nextEdition: { date: 'Data a ser informada', location: 'A definir', topic: 'Inscrições em breve' }, 
    lastEditions: [] 
  },
  { 
    id: 'forum-seg', 
    title: 'Fórum de Segurança', 
    description: 'Integração com forças policiais e protocolos de segurança hoteleira.', 
    iconName: 'Shield', 
    imageUrl: '', 
    nextEdition: { date: 'Data a ser informada', location: 'A definir', topic: 'Inscrições em breve' }, 
    lastEditions: [] 
  },
  { 
    id: 'forum-control', 
    title: 'Fórum de Controladoria', 
    description: 'Gestão financeira, auditoria, tributação e compliance.', 
    iconName: 'PieChart', 
    imageUrl: '', 
    nextEdition: { date: 'Data a ser informada', location: 'A definir', topic: 'Inscrições em breve' }, 
    lastEditions: [] 
  },
  { 
    id: 'forum-ab', 
    title: 'Fórum de A&B', 
    description: 'Gestão de restaurantes, bares, custos e tendências gastronômicas.', 
    iconName: 'Utensils', 
    imageUrl: '', 
    nextEdition: { date: 'Data a ser informada', location: 'A definir', topic: 'Inscrições em breve' }, 
    lastEditions: [] 
  }
];

export const LEVEL_THRESHOLDS = { BRONZE: 0, SILVER: 1000, GOLD: 3000, DIAMOND: 6000, MASTER: 10000 };
export const LEVEL_NAMES = { BRONZE: 'Bronze', SILVER: 'Prata', GOLD: 'Ouro', DIAMOND: 'Diamante', MASTER: 'Lenda' };

export const GAMIFICATION_BADGES: GamificationBadge[] = [
  { id: 'pioneiro', name: 'Pioneiro', description: 'Primeiro acesso', iconName: 'Star', requiredXP: 0 },
  { id: 'social', name: 'Social', description: 'Conectou redes sociais', iconName: 'Share2', requiredXP: 100 }
];

export const SUPER_CATEGORIES = [
  { id: 'gestao', title: 'Gestão & Estratégia', description: 'Ferramentas para gestores', iconName: 'Briefcase', gradient: 'from-blue-600 to-blue-800', categories: [BenefitCategory.MANAGEMENT, BenefitCategory.COMMERCIAL] }
];

export const CALCULATOR_TOOLS = BENEFITS_DATA.filter(b => b.category === BenefitCategory.TOOLS || b.id.startsWith('calc'));

export const FOOTER_DATA = {
  razaoSocial: 'Associação de Hotéis do Rio de Janeiro',
  cnpj: '33.333.333/0001-00',
  address: 'Maria Eugenia 300 – sala 13 – Humaitá',
  cep: '22261-000',
  phone: '(21) 2226-2520',
  email: 'contato@hoteisrio.com.br',
  socials: {
    instagram: 'https://instagram.com/hoteisrio',
    linkedin: 'https://linkedin.com/company/hoteisrio',
    youtube: 'https://youtube.com/hoteisrio',
    facebook: 'https://facebook.com/hoteisrio'
  }
};

export const CRM_LINK = "https://u2s0o.share.hsforms.com/2rFHWMzfmTfiLNOmWU7uUvg";

export const HOTEL_SECTORS: { id: any; label: string }[] = [
  { id: 'MANAGEMENT', label: 'Gerência' },
  { id: 'SALES', label: 'Vendas' },
  { id: 'RECEPTION', label: 'Recepção' },
  { id: 'HR', label: 'RH' },
  { id: 'LEGAL_DEPT', label: 'Jurídico' },
  { id: 'MAINTENANCE', label: 'Manutenção' },
  { id: 'FB', label: 'A&B' },
  { id: 'HOUSEKEEPING', label: 'Governança' },
  { id: 'SECURITY', label: 'Segurança' }
];


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

// MUDANÇA: Galeria removida conforme solicitação
export const GALLERY_EVENTS = [];

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
    title: 'Influenciadores / UGC',
    description: 'Conheça criadores e parceiros para divulgar sua marca com conteúdo autêntico.',
    category: BenefitCategory.COMMUNICATION,
    targetSectors: ['SALES', 'MANAGEMENT'],
    iconName: 'Camera',
    imageUrl: '',
    isService: true,
    isNew: true,
    embedUrl: 'https://influenciadoresdigitais.abihrj.com.br/#/influenciadores',
    externalLink: 'https://influenciadoresdigitais.abihrj.com.br/#/influenciadores',
    customCta: 'Acessar Plataforma'
  },

  // --- ROTA DO VINHO RJ ---
  {
    id: 'rota-do-vinho-rj',
    title: 'Rota do Vinho RJ',
    description: 'Plataforma oficial da Rota do Vinho do Rio de Janeiro. Conheca vinicolas, roteiros e parcerias para o trade hoteleiro.',
    category: BenefitCategory.PARTNERS,
    targetSectors: ['SALES', 'MANAGEMENT', 'RECEPTION'],
    iconName: 'Wine',
    imageUrl: '',
    isService: true,
    isNew: true,
    embedUrl: 'https://rotadovinho.abihrj.com.br/',
    externalLink: 'https://rotadovinho.abihrj.com.br/',
    customCta: 'Acessar Rota do Vinho'
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
    customCta: 'Acessar'
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
    embedUrl: 'https://assessoriajuridica.sindhoteisrj.com.br/enviar',
    externalLink: 'https://assessoriajuridica.sindhoteisrj.com.br/enviar',
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
    embedUrl: 'https://bancodetalentos.sindhoteisrj.com.br/#/recrutador',
    externalLink: 'https://bancodetalentos.sindhoteisrj.com.br/#/recrutador',
    customCta: 'Acessar Recrutador'
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
  {
    id: 'public-order-01',
    title: 'Demandas de Ordem Pública',
    description: 'Consulte o andamento das demandas ou cadastre uma nova solicitacao em um fluxo dedicado.',
    category: BenefitCategory.OPERATIONAL,
    targetSectors: ['MANAGEMENT', 'SECURITY'],
    iconName: 'Megaphone',
    imageUrl: '',
    isService: true,
    customCta: 'Acessar Opcoes'
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
    embedUrl: 'https://u2s0o.share.hsforms.com/2rFHWMzfmTfiLNOmWU7uUvg',
    externalLink: 'https://u2s0o.share.hsforms.com/2rFHWMzfmTfiLNOmWU7uUvg',
    customCta: 'Acessar'
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
    customCta: 'Acessar',
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
  // MUDANÇA: natal-concurso removido (projeto acabou)
  {
    id: 'natal-2025',
    title: 'Vencedores: Decoração Natalina',
    description: 'Confira os vencedores e destaques do concurso de 2025.',
    category: BenefitCategory.EVENTS,
    targetSectors: ['MANAGEMENT', 'SALES', 'MAINTENANCE'],
    iconName: 'Gift',
    imageUrl: '',
    isService: true,
    isNew: true,
    // MUDANÇA: link corrigido - link estava partido
    externalLink: 'https://sindhoteisrj.com.br/natal-2025-vencedores',
    customCta: 'Ver Vencedores'
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
  },
  // --- Ciclo de Seminários sobre Relações do Trabalho na Hotelaria ---
  {
    id: 'course-nr15',
    youtubeId: 'j0lyPPS7PV0',
    title: 'NR 15 — Insalubridade e Critérios Técnicos na Hotelaria',
    description: '1ª palestra do Ciclo de Seminários sobre Relações do Trabalho na Hotelaria, com Ana Luiza Horcades. Aborda critérios técnicos da NR 15, identificação e gestão de atividades insalubres, integração do GRO com a NR-01 e boas práticas de DP e RH para evitar passivos trabalhistas.',
    category: 'Relações do Trabalho',
    duration: '1h',
    thumbnailUrl: 'https://img.youtube.com/vi/j0lyPPS7PV0/maxresdefault.jpg',
    isNew: true
  },
  {
    id: 'course-nr1',
    youtubeId: 'd-V8COwKEt4',
    title: 'NR 1 — Gerenciamento de Riscos Ocupacionais na Hotelaria',
    description: '2ª palestra do Ciclo de Seminários sobre Relações do Trabalho na Hotelaria, com Ana Luiza Horcades (Auditora-Fiscal do Trabalho — MTE). Estrutura da NR-01, GRO, mapeamento de riscos no ambiente hoteleiro, documentação e conformidade legal.',
    category: 'Relações do Trabalho',
    duration: '1h',
    thumbnailUrl: 'https://img.youtube.com/vi/d-V8COwKEt4/maxresdefault.jpg',
    isNew: true
  },
  {
    id: 'course-jornada',
    youtubeId: '5a12xEFi8ck',
    title: 'Jornada de Trabalho e Banco de Horas',
    description: '3ª palestra do Ciclo de Seminários sobre Relações do Trabalho na Hotelaria, com Rosemary Villanueva (Auditora-Fiscal do Trabalho — MTE). Conceitos de jornada e banco de horas na CLT, diferença para horas extras, implementação sem passivos, registros e erros mais comuns.',
    category: 'Relações do Trabalho',
    duration: '1h',
    thumbnailUrl: 'https://img.youtube.com/vi/5a12xEFi8ck/maxresdefault.jpg',
    isNew: true
  },
  {
    id: 'course-pcd',
    youtubeId: 'ikriXX8SIGM',
    title: 'Inclusão de PCDs — Cotas e Obrigações Legais na Hotelaria',
    description: '4ª palestra do Ciclo de Seminários sobre Relações do Trabalho na Hotelaria, com Marcelo José Rodrigues de Freitas (Auditor-Fiscal do Trabalho — MTE) e presença de Claudio Secchin (Superintendente Regional do Trabalho e Emprego no RJ). Lei de Cotas, cálculo, diferença entre PCD e Beneficiário Reabilitado, integração e acessibilidade.',
    category: 'Relações do Trabalho',
    duration: '1h',
    thumbnailUrl: 'https://img.youtube.com/vi/ikriXX8SIGM/maxresdefault.jpg',
    isNew: true
  },
  {
    id: 'course-aprendiz',
    youtubeId: 'pryxxgBE6RE',
    title: 'Inclusão de Jovens Aprendizes — Programa e Obrigações na Hotelaria',
    description: '5ª palestra do Ciclo de Seminários sobre Relações do Trabalho na Hotelaria, com Ramon de Faria Santos (Auditor-Fiscal do Trabalho — MTE e Coordenador de Aprendizagem do RJ). Programa de jovem aprendiz, Lei da Aprendizagem, cota, contratação, incentivos fiscais e integração na rotina hoteleira.',
    category: 'Relações do Trabalho',
    duration: '1h',
    thumbnailUrl: 'https://img.youtube.com/vi/pryxxgBE6RE/maxresdefault.jpg',
    isNew: true
  }
];

// Re-exports for existing functionality
export const RIO_EVENTS: RioEvent[] = [
  { id: '1', title: 'Réveillon 2025', date: '31-12-2024', location: 'Copacabana', type: 'Festa', imageUrl: '' },
  { id: '2', title: 'Carnaval 2025', date: '28-02-2025', location: 'Sambódromo', type: 'Festa', imageUrl: '' },
  { id: '3', title: 'Web Summit Rio', date: '15-04-2025', location: 'Riocentro', type: 'Congresso', imageUrl: '' }
];

export const TEAM_CONTACTS = [
  { sector: 'Superintendência', manager: 'Theresa Jansen', email: 'theresa.jansen@hoteisrio.com.br' },
  { sector: 'Gerência Operacional', manager: 'Julio Correa', email: 'julio.correa@hoteisrio.com.br', whatsapp: '21970186447' },
  { sector: 'Eventos', manager: 'Julie Souza', email: 'julie.souza@hoteisrio.com.br', whatsapp: '21970179949' },
  { sector: 'Financeiro', manager: 'Mauricio Ferreira', email: 'mauricio.ferreira@hoteisrio.com.br', whatsapp: '21994979099' },
  // MUDANÇA: WhatsApp removido do contato de Marketing conforme solicitado
  { sector: 'Marketing', manager: 'Equipe Marketing', email: 'marketing@hoteisrio.com.br' }
];

export const WHATSAPP_GROUPS = [
  { id: 'grupo-01', name: 'Grupo HoteisRio 01', description: 'Grupo oficial HoteisRio.', link: 'https://chat.whatsapp.com/GLBN6SipLJa53SET5iu3Az' },
  { id: 'grupo-02', name: 'Grupo HoteisRio 02', description: 'Grupo oficial HoteisRio.', link: 'https://chat.whatsapp.com/HDWSpMh5i4A3evfuFae9ee' },
  { id: 'grupo-03', name: 'Grupo HoteisRio 03', description: 'Grupo oficial HoteisRio.', link: 'https://chat.whatsapp.com/LGCPQnGKNsN8FMVtVP2Nx9' },
  { id: 'grupo-04', name: 'Grupo HoteisRio 04', description: 'Grupo oficial HoteisRio.', link: 'https://chat.whatsapp.com/LYbTk5WmsAP09eUJGg1ykc' },
  { id: 'grupo-05', name: 'Grupo HoteisRio 05', description: 'Grupo oficial HoteisRio.', link: 'https://chat.whatsapp.com/H51hiL8LKO57saNiSXfuwV' },
  { id: 'grupo-06', name: 'Grupo HoteisRio 06', description: 'Grupo oficial HoteisRio.', link: 'https://chat.whatsapp.com/CxTSUAFseZ8KrjstxtYpWp' },
  { id: 'grupo-07', name: 'Grupo HoteisRio 07', description: 'Grupo oficial HoteisRio.', link: 'https://chat.whatsapp.com/JRs28cGpNOEHWL7Ao4mnwz' },
  { id: 'grupo-08', name: 'Grupo HoteisRio 08', description: 'Grupo oficial HoteisRio.', link: 'https://chat.whatsapp.com/CwZnNICjROREiTLScorQNS' },
  { id: 'grupo-09', name: 'Grupo HoteisRio 09', description: 'Grupo oficial HoteisRio.', link: 'https://chat.whatsapp.com/EpFqo1Wp9UUFHQqrtDkD23' },
  { id: 'grupo-10', name: 'Grupo HoteisRio 10', description: 'Grupo oficial HoteisRio.', link: 'https://chat.whatsapp.com/LIUx9xwjNjeAnsiHhFirTu' },
  { id: 'grupo-11', name: 'Grupo HoteisRio 11', description: 'Grupo oficial HoteisRio.', link: 'https://chat.whatsapp.com/KGhGL2Xp1GSBmuEzDa4Onx' },
  { id: 'grupo-12', name: 'Grupo HoteisRio 12', description: 'Grupo oficial HoteisRio.', link: 'https://chat.whatsapp.com/Hoj0XWoAbfA8HzXs4IbKBR' },
  { id: 'grupo-13', name: 'Grupo HoteisRio 13', description: 'Grupo oficial HoteisRio.', link: 'https://chat.whatsapp.com/LDQ96AlFYB38H0NGCTQqlu' },
  { id: 'grupo-14', name: 'Grupo HoteisRio 14', description: 'Grupo oficial HoteisRio.', link: 'https://chat.whatsapp.com/KTkHIwqKGVB78Su3PLgj7Q' },
  { id: 'grupo-15', name: 'Grupo HoteisRio 15', description: 'Grupo oficial HoteisRio.', link: 'https://chat.whatsapp.com/GPSe932zboL5THzeTeZUgt' }
];

export const ASSOCIATION_EVENTS = [
  { id: 'evt-01', title: 'Reunião Geral', date: '15 de Maio, 09:00', location: 'Hotel Othon', description: 'Alinhamento estratégico', status: 'Confirmado', type: 'Reunião', imageUrl: '' }
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
  // MUDANÇA: endereço correto conforme solicitado
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

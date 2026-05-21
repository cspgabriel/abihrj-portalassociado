
// Autor: Gabriel Salles
// Suporte do SO: Windows11
// Descrição: Constantes e dados estáticos da aplicação

import { Benefit, BenefitCategory, Course, Forum, GamificationBadge, HotelSector, RioEvent } from './types';

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

export interface SuperCategory {
  id: string;
  title: string;
  iconName: string;
  gradient: string;
}

export const SUPER_CATEGORIES: SuperCategory[] = [
  { id: 'juridico',   title: 'Jurídico',       iconName: 'Scale',         gradient: 'from-blue-600 to-blue-800' },
  { id: 'comercial',  title: 'Comercial',      iconName: 'TrendingUp',    gradient: 'from-green-500 to-green-700' },
  { id: 'eventos',    title: 'Eventos',        iconName: 'CalendarDays',  gradient: 'from-purple-500 to-purple-700' },
  { id: 'ferramentas',title: 'Ferramentas',    iconName: 'Wrench',        gradient: 'from-orange-500 to-orange-700' },
  { id: 'treinamento',title: 'Treinamento',    iconName: 'GraduationCap', gradient: 'from-sky-500 to-sky-700' },
  { id: 'gestao',     title: 'Gestão',         iconName: 'BarChart2',     gradient: 'from-rose-500 to-rose-700' },
  { id: 'rh',         title: 'RH',             iconName: 'Users',         gradient: 'from-teal-500 to-teal-700' },
  { id: 'parceiros',  title: 'Parceiros',      iconName: 'Handshake',     gradient: 'from-yellow-500 to-yellow-700' },
];

// 🔴 RESTAURADO (ERRO DE BUILD)
export const LEVEL_THRESHOLDS = { BRONZE: 0, SILVER: 1000, GOLD: 3000, DIAMOND: 6000, MASTER: 10000 };
export const LEVEL_NAMES = { BRONZE: 'Bronze', SILVER: 'Prata', GOLD: 'Ouro', DIAMOND: 'Diamante', MASTER: 'Lenda' };
export const GAMIFICATION_BADGES: GamificationBadge[] = [
  { id: 'pioneiro', name: 'Pioneiro', description: 'Primeiro acesso', iconName: 'Star', requiredXP: 0 },
  { id: 'social', name: 'Social', description: 'Conectou redes sociais', iconName: 'Share2', requiredXP: 100 }
];

// ─── CRM / Cadastro ───────────────────────────────────────────────────────────
export const CRM_LINK = 'https://forms.gle/hoteisrio-cadastro';

// ─── Rodapé ──────────────────────────────────────────────────────────────────
export const FOOTER_DATA = {
  razaoSocial: 'HoteisRio – Associação de Hotéis do Rio de Janeiro',
  cnpj: '29.757.975/0001-55',
  address: 'Av. Rio Branco, 156 – Sala 1408, Centro',
  cep: '20040-901',
  phone: '(21) 2533-2848',
  email: 'contato@hoteisrio.com.br',
  socials: {
    instagram: 'https://instagram.com/hoteisrio',
    linkedin: 'https://linkedin.com/company/hoteisrio',
    youtube: '',
    facebook: 'https://facebook.com/hoteisrio',
  },
};

// ─── WhatsApp Groups ─────────────────────────────────────────────────────────
export const WHATSAPP_GROUPS: { id: string; name: string; description: string; link: string }[] = [
  { id: 'seg',        name: 'Segurança Hoteleira',    description: 'Alertas e boas práticas de segurança',          link: 'https://chat.whatsapp.com/seg' },
  { id: 'comercial',  name: 'Comercial & Revenue',    description: 'Estratégias comerciais e revenue management',   link: 'https://chat.whatsapp.com/comercial' },
  { id: 'rh',         name: 'RH & Pessoas',           description: 'Recursos humanos, vagas e treinamentos',        link: 'https://chat.whatsapp.com/rh' },
  { id: 'manutencao', name: 'Manutenção',             description: 'Dicas e fornecedores de manutenção predial',    link: 'https://chat.whatsapp.com/manutencao' },
  { id: 'gov',        name: 'Legislação & Gov',       description: 'Atualizações legais e relação com governo',     link: 'https://chat.whatsapp.com/gov' },
  { id: 'gms',        name: 'GMs & Diretores',        description: 'Grupo exclusivo para gerentes gerais',          link: 'https://chat.whatsapp.com/gms' },
  { id: 'recepcao',   name: 'Recepção',               description: 'Melhores práticas de front-office',             link: 'https://chat.whatsapp.com/recepcao' },
  { id: 'compras',    name: 'Compras & Suprimentos',  description: 'Cotações e fornecedores homologados',           link: 'https://chat.whatsapp.com/compras' },
];

// ─── Contatos da Equipe ───────────────────────────────────────────────────────
export const TEAM_CONTACTS: { sector: string; manager: string; email: string; whatsapp?: string }[] = [
  { sector: 'Presidência',              manager: 'Fernando Haddad',       email: 'presidencia@hoteisrio.com.br' },
  { sector: 'Jurídico & Compliance',   manager: 'Dra. Ana Beatriz Lima',  email: 'juridico@hoteisrio.com.br',   whatsapp: '5521999990001' },
  { sector: 'Comercial & Eventos',     manager: 'Rodrigo Mendes',         email: 'comercial@hoteisrio.com.br',  whatsapp: '5521999990002' },
  { sector: 'Comunicação & Marketing', manager: 'Camila Torres',          email: 'marketing@hoteisrio.com.br',  whatsapp: '5521999990003' },
  { sector: 'Relações Institucionais', manager: 'Paulo Resende',          email: 'institucional@hoteisrio.com.br' },
  { sector: 'Tecnologia & Inovação',   manager: 'Gabriel Salles',         email: 'ti@hoteisrio.com.br',         whatsapp: '5521999990005' },
];

// ─── Setores Hoteleiros ───────────────────────────────────────────────────────
export const HOTEL_SECTORS: { id: HotelSector; label: string }[] = [
  { id: 'MANAGEMENT',  label: 'Gestão & Diretoria' },
  { id: 'RECEPTION',   label: 'Recepção & Front-Office' },
  { id: 'HOUSEKEEPING',label: 'Governança & Limpeza' },
  { id: 'MAINTENANCE', label: 'Manutenção Predial' },
  { id: 'SALES',       label: 'Vendas & Comercial' },
  { id: 'HR',          label: 'Recursos Humanos' },
  { id: 'LEGAL_DEPT',  label: 'Departamento Jurídico' },
  { id: 'FB',          label: 'Alimentos & Bebidas' },
  { id: 'SECURITY',    label: 'Segurança' },
];

// ─── Eventos da Associação ────────────────────────────────────────────────────
export const ASSOCIATION_EVENTS: { id: string; title: string; date: string; description: string; location: string; status: string }[] = [
  { id: 'evt-01', title: 'Assembleia Geral Ordinária 2025',      date: '10 de Junho, 14:00',    description: 'Apresentação de resultados, votação de diretrizes e eleição de conselho.',      location: 'HoteisRio – Sala de Reuniões', status: 'Confirmado' },
  { id: 'evt-02', title: 'Workshop Revenue Management',          date: '25 de Junho, 09:00',    description: 'Técnicas avançadas de precificação dinâmica e gestão de receita.',               location: 'Hotel Windsor Barra – Auditório', status: 'Confirmado' },
  { id: 'evt-03', title: 'Fórum de Segurança Hoteleira',        date: '08 de Julho, 10:00',    description: 'Análise de incidentes recentes, novas tecnologias e procedimentos de segurança.',location: 'Online – Zoom', status: 'Confirmado' },
  { id: 'evt-04', title: 'Café com o Presidente',               date: '22 de Julho, 08:30',    description: 'Encontro informal para debater pautas do setor com a presidência da associação.', location: 'HoteisRio – Sede', status: 'Confirmado' },
  { id: 'evt-05', title: 'Treinamento Atendimento ao Cliente',  date: '05 de Agosto, 09:00',   description: 'Capacitação em hospitalidade e gestão de reclamações para equipes de frente.',    location: 'Online – Google Meet', status: 'Em breve' },
];

// ─── Fóruns Setoriais ─────────────────────────────────────────────────────────
export const FORUMS_DATA: Forum[] = [
  {
    id: 'forum-comercial',
    title: 'Comitê Comercial',
    description: 'Estratégias de distribuição, tarifação e parcerias com OTAs e agências de viagem.',
    iconName: 'TrendingUp',
    imageUrl: '',
    nextEdition: { date: '18 de Junho de 2025', location: 'Online – Zoom', topic: 'Revisão de estratégia tarifária para alta temporada' },
    lastEditions: [{ date: 'Maio/2025', summary: 'Discussão sobre paridade de tarifas e Google Hotel Ads.' }],
  },
  {
    id: 'forum-rh',
    title: 'Comitê de RH',
    description: 'Gestão de pessoas, recrutamento, treinamento e retenção de talentos no setor hoteleiro.',
    iconName: 'Users',
    imageUrl: '',
    nextEdition: { date: '25 de Junho de 2025', location: 'HoteisRio – Sede', topic: 'Planos de cargos e salários 2025-2026' },
    lastEditions: [{ date: 'Maio/2025', summary: 'Mapeamento de competências e trilhas de desenvolvimento.' }],
  },
  {
    id: 'forum-sustentabilidade',
    title: 'Comitê de Sustentabilidade',
    description: 'Práticas ESG, certificações verdes e eficiência energética para hotéis do Rio.',
    iconName: 'Leaf',
    imageUrl: '',
    nextEdition: { date: '02 de Julho de 2025', location: 'Online – Teams', topic: 'Certificação LEED e incentivos fiscais' },
    lastEditions: [{ date: 'Abril/2025', summary: 'Levantamento de iniciativas de redução de resíduos sólidos.' }],
  },
  {
    id: 'forum-seguranca',
    title: 'Comitê de Segurança',
    description: 'Protocolos de segurança, relação com órgãos públicos e prevenção de crimes hoteleiros.',
    iconName: 'ShieldCheck',
    imageUrl: '',
    nextEdition: { date: '09 de Julho de 2025', location: 'Online – Zoom', topic: 'Integração com Polícia Civil – protocolos 2025' },
    lastEditions: [{ date: 'Maio/2025', summary: 'Revisão dos procedimentos de segurança para grandes eventos.' }],
  },
  {
    id: 'forum-tecnologia',
    title: 'Comitê de Tecnologia',
    description: 'Inovação tecnológica, PMSs, automação e inteligência artificial no setor hoteleiro.',
    iconName: 'Cpu',
    imageUrl: '',
    nextEdition: { date: '16 de Julho de 2025', location: 'Online – Zoom', topic: 'IA generativa e automação de check-in' },
    lastEditions: [{ date: 'Junho/2025', summary: 'Demo de ferramentas de automação de revenue management.' }],
  },
];

// ─── Leis e Decretos ─────────────────────────────────────────────────────────
export const RJ_LAWS_DATA: { id: string; number: string; description: string; category: string; date: string; link: string }[] = [
  { id: 'lei-01', number: 'Lei Nº 7.426/2016',    description: 'Dispõe sobre a obrigatoriedade de afixação de placas informativas nos hotéis do Rio de Janeiro.',                         category: 'Operacional',  date: '2016-05-12', link: 'https://leismunicipais.com.br/a/rj/r/rio-de-janeiro/lei-ordinaria/2016/742/7426' },
  { id: 'lei-02', number: 'Decreto Nº 46.594/2019',description: 'Regulamenta o Programa de Certificação de Sustentabilidade Turística para meios de hospedagem.',                      category: 'Sustentabilidade', date: '2019-03-20', link: '#' },
  { id: 'lei-03', number: 'Lei Nº 8.245/1991',    description: 'Lei do Inquilinato – regula locações de imóveis urbanos, aplicável a contratos hoteleiros de longa permanência.',      category: 'Jurídico',     date: '1991-10-18', link: 'https://www.planalto.gov.br/ccivil_03/leis/l8245.htm' },
  { id: 'lei-04', number: 'Decreto Nº 7.381/2010',description: 'Regulamenta a Lei nº 11.771/2008 (Política Nacional de Turismo) e classifica meios de hospedagem.',                   category: 'Classificação', date: '2010-12-02', link: '#' },
  { id: 'lei-05', number: 'Lei Nº 13.709/2018',   description: 'Lei Geral de Proteção de Dados (LGPD) – aplicada ao tratamento de dados de hóspedes e colaboradores.',               category: 'Privacidade',  date: '2018-08-14', link: 'https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm' },
  { id: 'lei-06', number: 'Portaria MTur Nº 100/2011', description: 'Sistema Brasileiro de Classificação de Meios de Hospedagem (SBClass) – critérios de estrelas.',                 category: 'Classificação', date: '2011-06-16', link: '#' },
];

// ─── Cursos e Treinamentos ────────────────────────────────────────────────────
export const COURSES_DATA: Course[] = [
  { id: 'curso-revenue',      youtubeId: 'dQw4w9WgXcQ', title: 'Revenue Management Essencial',        description: 'Fundamentos de precificação, demanda e estratégia de distribuição.',        category: 'Gestão',       duration: '2h 30min', thumbnailUrl: '', isNew: false },
  { id: 'curso-atendimento',  youtubeId: 'dQw4w9WgXcQ', title: 'Excelência no Atendimento ao Hóspede', description: 'Técnicas de hospitalidade, comunicação e resolução de conflitos.',          category: 'Operacional',  duration: '1h 45min', thumbnailUrl: '', isNew: true  },
  { id: 'curso-lgpd',         youtubeId: 'dQw4w9WgXcQ', title: 'LGPD na Hotelaria',                   description: 'Adequação à Lei Geral de Proteção de Dados no ambiente hoteleiro.',         category: 'Jurídico',     duration: '1h 20min', thumbnailUrl: '', isNew: false },
  { id: 'curso-seguranca',    youtubeId: 'dQw4w9WgXcQ', title: 'Segurança Hoteleira Avançada',         description: 'Protocolos de segurança, prevenção de furtos e gestão de crises.',           category: 'Segurança',    duration: '2h 00min', thumbnailUrl: '', isNew: false },
  { id: 'curso-sustent',      youtubeId: 'dQw4w9WgXcQ', title: 'Sustentabilidade na Hotelaria',        description: 'Práticas ESG, redução de resíduos e certificações ambientais.',               category: 'Sustentabilidade', duration: '1h 30min', thumbnailUrl: '', isNew: true  },
];

// ─── Ferramentas de Calculadora ───────────────────────────────────────────────
export const CALCULATOR_TOOLS: Benefit[] = BENEFITS_DATA.filter(b => b.id.startsWith('calc-') || b.id === 'calculators-hub');

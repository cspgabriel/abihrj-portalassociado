import { Benefit, BenefitCategory, RioEvent } from './types';

export const MOCK_USER = {
  name: "Carlos Silva",
  hotel: "Copacabana Palace View",
  role: "Gerente Geral"
};

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

export const BENEFITS_DATA: Benefit[] = [
  // --- 3 Primeiros Mantidos (Funcionais) ---
  {
    id: 'calendar-01',
    title: 'Calendário de Eventos',
    description: 'Acompanhe a agenda oficial de grandes eventos da cidade.',
    category: BenefitCategory.EVENTS,
    iconName: 'CalendarDays',
    imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'juridico-01',
    title: 'Assessoria Jurídica',
    description: 'Suporte especializado em causas trabalhistas e cíveis para associados.',
    category: BenefitCategory.LEGAL,
    iconName: 'Scale',
    imageUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'public-order-01',
    title: 'Demandas Ordem Pública',
    description: 'Canal direto para reportar irregularidades e segurança no entorno.',
    category: BenefitCategory.OPERATIONAL,
    iconName: 'ShieldAlert',
    imageUrl: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&q=80&w=400'
  },
  
  // --- Novos Benefícios da Lista ---
  
  {
    id: 'top-hotel',
    title: 'Prêmio Top Hotel',
    description: 'Reconhecimento aos melhores cases e práticas do setor hoteleiro.',
    category: BenefitCategory.EVENTS,
    iconName: 'Trophy',
    imageUrl: 'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&q=80&w=400',
    isNew: true
  },
  {
    id: 'influencers',
    title: 'Influenciadores Digitais',
    description: 'Ações conectando hotéis a criadores de conteúdo relevantes.',
    category: BenefitCategory.COMMUNICATION,
    iconName: 'Camera',
    imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'imprensa',
    title: 'Comunicação e Imprensa',
    description: 'Assessoria de imprensa e visibilidade na mídia para o setor.',
    category: BenefitCategory.COMMUNICATION,
    iconName: 'Megaphone',
    imageUrl: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'mkt-digital',
    title: 'Marketing Digital',
    description: 'Estratégias e consultoria para presença digital do seu hotel.',
    category: BenefitCategory.COMMERCIAL,
    iconName: 'Globe',
    imageUrl: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'app-hoteis',
    title: 'App HotéisRIO',
    description: 'Toda a associação na palma da sua mão. Baixe agora.',
    category: BenefitCategory.TECHNOLOGY,
    iconName: 'TabletSmartphone',
    imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'ai-news',
    title: 'Inteligência Artificial',
    description: 'Ferramentas de IA para otimizar a gestão e atendimento.',
    category: BenefitCategory.TECHNOLOGY,
    iconName: 'Bot',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=400',
    isNew: true
  },
  {
    id: 'whatsapp-groups',
    title: 'Grupos WhatsApp',
    description: 'Networking e informações rápidas entre gestores e a associação.',
    category: BenefitCategory.COMMUNICATION,
    iconName: 'MessageCircle',
    imageUrl: 'https://images.unsplash.com/photo-1611746347311-3a9957777cfa?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'forums',
    title: 'Fóruns e Reuniões',
    description: 'Debates sobre o futuro da hotelaria e alinhamento estratégico.',
    category: BenefitCategory.EVENTS,
    iconName: 'Users',
    imageUrl: 'https://images.unsplash.com/photo-1515168816902-8408aa648c5e?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'edu-partners',
    title: 'Convênios Educacionais',
    description: 'Descontos em faculdades e cursos para colaboradores.',
    category: BenefitCategory.PARTNERS,
    iconName: 'GraduationCap',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'security',
    title: 'Segurança',
    description: 'Parceria com forças policiais para segurança turística.',
    category: BenefitCategory.OPERATIONAL,
    iconName: 'Shield',
    imageUrl: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'sustainability',
    title: 'Sustentabilidade',
    description: 'Programas e certificações de práticas sustentáveis (ESG).',
    category: BenefitCategory.OPERATIONAL,
    iconName: 'Leaf',
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'lobby',
    title: 'Lobby e Advocacy',
    description: 'Defesa dos interesses da hotelaria junto ao poder público.',
    category: BenefitCategory.INSTITUTIONAL,
    iconName: 'Landmark',
    imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'trainings',
    title: 'Treinamentos',
    description: 'Capacitação contínua via Universidade HoteisRio.',
    category: BenefitCategory.TRAINING,
    iconName: 'BookOpen',
    imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'suppliers',
    title: 'Fornecedores Parceiros',
    description: 'Clube de compras com condições exclusivas para associados.',
    category: BenefitCategory.PARTNERS,
    iconName: 'Handshake',
    imageUrl: 'https://images.unsplash.com/photo-1472851294608-415522f96319?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'cv-bank',
    title: 'Banco de Currículos',
    description: 'Acesso a talentos qualificados para contratação.',
    category: BenefitCategory.HR,
    iconName: 'FileText',
    imageUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'newsletter',
    title: 'Boletim Online',
    description: 'Notícias semanais e atualizações do setor no seu email.',
    category: BenefitCategory.COMMUNICATION,
    iconName: 'Mail',
    imageUrl: 'https://images.unsplash.com/photo-1557568192-238a63f66318?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'occupation-stats',
    title: 'Pesquisas de Ocupação',
    description: 'Dados estatísticos e comparativos de desempenho hoteleiro.',
    category: BenefitCategory.STATISTICS,
    iconName: 'PieChart',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'support-general',
    title: 'Suporte',
    description: 'Atendimento direto da associação para suas demandas.',
    category: BenefitCategory.SUPPORT,
    iconName: 'Headphones',
    imageUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=400'
  }
];
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
  {
    id: 'calendar-01',
    title: 'Calendário de Eventos',
    description: 'Acompanhe a agenda oficial de grandes eventos da cidade para planejar sua ocupação.',
    category: BenefitCategory.EVENTS,
    iconName: 'CalendarDays',
    imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'juridico-01',
    title: 'Assessoria Jurídica',
    description: 'Abra chamados diretos com nosso corpo jurídico para dúvidas trabalhistas e cíveis.',
    category: BenefitCategory.LEGAL,
    iconName: 'Gavel',
    imageUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'public-order-01',
    title: 'Ordem Pública',
    description: 'Canal direto com a Prefeitura para reportar camelôs, segurança e iluminação.',
    category: BenefitCategory.OPERATIONAL,
    iconName: 'ShieldAlert',
    imageUrl: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'stats-01',
    title: 'Dados de Ocupação',
    description: 'Relatórios semanais de ocupação hoteleira e tarifa média (ADR) no Rio.',
    category: BenefitCategory.STATISTICS,
    iconName: 'BarChart3',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'training-01',
    title: 'Universidade HoteisRio',
    description: 'Cursos de capacitação para recepcionistas, camareiras e gestores.',
    category: BenefitCategory.TRAINING,
    iconName: 'GraduationCap',
    imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'partners-01',
    title: 'Clube de Compras',
    description: 'Descontos exclusivos com fornecedores de enxoval, alimentos e energia.',
    category: BenefitCategory.PARTNERS,
    iconName: 'ShoppingBag',
    imageUrl: 'https://images.unsplash.com/photo-1472851294608-415522f96319?auto=format&fit=crop&q=80&w=400'
  }
];
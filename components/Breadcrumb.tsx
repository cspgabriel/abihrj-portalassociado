import React from 'react';
import { Home, ChevronRight } from 'lucide-react';

interface BreadcrumbProps {
  currentView: string;
}

const VIEW_LABELS: Record<string, string> = {
  LANDING_PAGE: 'Início',
  ALL_BENEFITS: 'Todos os Benefícios',
  COURSES_V2: 'Cursos & Treinamentos',
  SECURITY_PAGE: 'Órgãos de Segurança',
  WHATSAPP_GROUPS: 'Grupos WhatsApp',
  CONTACTS: 'Equipe & Contatos',
  REGISTRATION_UPDATE: 'Atualização Cadastral',
  FORUMS_OVERVIEW: 'Fóruns da Hotelaria',
  FORUM_DETAILS: 'Detalhes do Fórum',
  ASSOCIATION_EVENTS: 'Eventos da Associação',
  LAWS_REGULATION: 'Leis & Decretos',
  PLATFORM_TUTORIAL: 'Como Funciona',
  ROCK_IN_RIO: 'Rock in Rio 2026',
  CALCULATORS_PAGE: 'Calculadoras',
  BENEFIT_DETAILS: 'Detalhes do Benefício',
  SERVICE_VIEWER: 'Serviço Online',
  MODERN_DASHBOARD: 'Painel',
};

const Breadcrumb: React.FC<BreadcrumbProps> = ({ currentView }) => {
  const label =
    VIEW_LABELS[currentView] ||
    currentView.replace(/_/g, ' ').toLowerCase();

  const isHome = currentView === 'LANDING_PAGE';

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-2 text-gray-400 text-sm whitespace-nowrap"
    >
      <Home className="w-4 h-4" />
      {!isHome && (
        <>
          <ChevronRight className="w-3 h-3" />
          <span className="font-medium text-gray-600 truncate max-w-xs">
            {label}
          </span>
        </>
      )}
      {isHome && (
        <span className="font-medium text-gray-600">Início</span>
      )}
    </nav>
  );
};

export default Breadcrumb;


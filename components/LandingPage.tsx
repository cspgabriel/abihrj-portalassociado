import React from 'react';
import {
  ArrowRight,
  BriefcaseBusiness,
  Gavel,
  LayoutGrid,
  Users,
  Bell,
  Camera,
  Music,
  Building2,
  CalendarCheck,
} from 'lucide-react';
import { Benefit } from '../types';
import { BENEFITS_DATA } from '../constants';
import SuppliersBanner from './SuppliersBanner';

interface LandingPageProps {
  onNavigate: (view: any) => void;
  userName: string;
  onBenefitClick?: (benefit: Benefit) => void;
}

const featuredCards: Array<{
  title: string;
  body: string;
  action: string;
  icon: React.ComponentType<{ className?: string }>;
  view?: string;
  benefitId?: string;
  image: string;
  tone: string;
  badge: string;
}> = [
  {
    title: 'Rock in Rio 2026',
    body: 'Cadastre seu hotel no hub oficial de beneficios do maior festival de musica e entretenimento do mundo.',
    action: 'Acessar pagina',
    icon: Music,
    view: 'ROCK_IN_RIO',
    image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=85',
    tone: 'from-pink-950/95 via-pink-800/75 to-fuchsia-600/40',
    badge: 'Novo',
  },
  {
    title: 'Fornecedores Hotelaria',
    body: 'Conheca o portal de fornecedores parceiros com condicoes exclusivas para o setor.',
    action: 'Acessar portal',
    icon: Building2,
    benefitId: 'portal-fornecedores-new',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=900&q=85',
    tone: 'from-slate-950/95 via-slate-900/75 to-orange-700/35',
    badge: 'Novo',
  },
  {
    title: 'Calendario de Feriados 2026',
    body: 'Planeje sua operacao com o planejador completo de feriados nacionais e do RJ.',
    action: 'Acessar planejador',
    icon: CalendarCheck,
    benefitId: 'planejador-feriados-2026',
    image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=900&q=85',
    tone: 'from-emerald-950/95 via-emerald-900/75 to-amber-600/35',
    badge: 'Novo',
  },
];

const quickLinks = [
  { label: 'Assessoria Juridica', icon: Gavel, benefitId: 'juridico-01' },
  { label: 'Banco de Talentos', icon: Users, benefitId: 'banco-talentos' },
  { label: 'Influenciadores / UGC', icon: Camera, benefitId: 'influencers-hub' },
];

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate, userName, onBenefitClick }) => {
  const firstName = userName.split(' ')[0] || 'Associado';

  const handleQuickLink = (link: typeof quickLinks[number]) => {
    if (link.benefitId && onBenefitClick) {
      const benefit = BENEFITS_DATA.find(item => item.id === link.benefitId);
      if (benefit) {
        onBenefitClick(benefit);
        return;
      }
    }

    if (link.view) onNavigate(link.view);
  };

  return (
    <div className="min-h-full bg-[#f6f8fc] px-4 py-5 md:px-6 lg:px-8 animate-fade-in">
      <section className="relative overflow-hidden rounded-2xl min-h-[260px] bg-blue-950 shadow-sm">
        <img
          src="https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1800&q=85"
          alt="Vista aerea do Rio de Janeiro"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#022b66] via-[#073b86]/90 to-[#073b86]/35" />
        <div className="absolute inset-y-0 right-0 hidden w-1/3 border-l border-amber-300/30 md:block">
          <div className="absolute right-10 top-12 h-44 w-44 rounded-full border border-amber-300/60" />
          <div className="absolute right-28 top-20 h-52 w-52 rounded-full border border-amber-300/30" />
        </div>

        <div className="relative z-10 flex min-h-[260px] flex-col justify-center px-6 py-8 md:px-14">
          <p className="mb-3 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.24em] text-blue-100">
            Portal do Associado <span className="h-px w-8 bg-amber-300" />
          </p>
          <h1 className="max-w-xl text-4xl font-black leading-tight text-white md:text-5xl">
            Bem-vindo, {firstName}
          </h1>
          <p className="mt-4 max-w-2xl text-sm font-medium leading-6 text-blue-50 md:text-base">
            Sua central exclusiva de inteligencia, beneficios e gestao hoteleira.
            Tudo o que voce precisa para fortalecer seu negocio em um so lugar.
          </p>
          <button
            id="explore-benefits-btn"
            onClick={() => onNavigate('ALL_BENEFITS')}
            className="mt-6 inline-flex w-fit items-center gap-3 rounded-lg bg-[#f5c64b] px-6 py-3 text-sm font-black text-blue-950 shadow-lg shadow-blue-950/20 transition hover:bg-amber-300"
          >
            Explorar Beneficios <ArrowRight className="h-4 w-4" />
          </button>

          <div className="mt-6 w-full max-w-sm rounded-xl border border-white/20 bg-white/10 p-4 text-white shadow-2xl backdrop-blur md:absolute md:bottom-8 md:right-10">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-amber-300/70 bg-blue-950/50">
                <BriefcaseBusiness className="h-6 w-6 text-amber-300" />
              </div>
              <div>
                <p className="font-black">Juntos somos mais fortes</p>
                <p className="mt-1 text-xs leading-5 text-blue-50">
                  Conectamos hoteis, geramos valor e impulsionamos o turismo do Rio.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1fr_280px]">
        <main className="space-y-5">
          <section className="grid gap-4 lg:grid-cols-3">
            {featuredCards.map((card) => {
              const Icon = card.icon;
              return (
                <button
                  key={card.title}
                  onClick={() => {
                    if (card.benefitId && onBenefitClick) {
                      const benefit = BENEFITS_DATA.find(item => item.id === card.benefitId);
                      if (benefit) { onBenefitClick(benefit); return; }
                    }
                    if (card.view) onNavigate(card.view);
                  }}
                  className="group relative min-h-[190px] overflow-hidden rounded-xl text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-xl"
                >
                  <img src={card.image} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  <div className={`absolute inset-0 bg-gradient-to-r ${card.tone}`} />
                  <div className="relative flex h-full min-h-[190px] flex-col justify-between p-5 text-white">
                    <div className="flex items-start justify-between">
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/15 backdrop-blur">
                        <Icon className="h-5 w-5 text-amber-300" />
                      </span>
                      <span className="rounded-full bg-white/20 px-2.5 py-1 text-[10px] font-black uppercase text-white backdrop-blur">
                        {card.badge}
                      </span>
                    </div>
                    <div>
                      <h2 className="max-w-[260px] text-2xl font-black leading-7">{card.title}</h2>
                      <p className="mt-3 max-w-[300px] text-sm font-medium leading-5 text-white/85">{card.body}</p>
                      <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-amber-300">
                        {card.action} <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-end gap-3">
                <h2 className="text-base font-black text-slate-900">Fornecedores em Destaque</h2>
                <p className="hidden text-xs font-medium text-slate-500 sm:block">Parceiros oficiais com condicoes especiais para associados HoteisRIO.</p>
              </div>
              <button onClick={() => onNavigate('ALL_BENEFITS')} className="inline-flex items-center gap-2 text-xs font-black text-blue-700">
                Ver todos os fornecedores <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
            <SuppliersBanner />
          </section>
        </main>

        <aside className="space-y-5">
          <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="mb-4 flex items-center gap-2 text-base font-black text-blue-950">
              <LayoutGrid className="h-5 w-5 text-blue-600" /> Acessos rapidos
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {quickLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <button
                    key={link.label}
                    onClick={() => handleQuickLink(link)}
                    className="min-h-[68px] rounded-lg border border-slate-100 bg-white p-3 text-left shadow-sm transition hover:border-blue-200 hover:bg-blue-50"
                  >
                    <Icon className="mb-2 h-4 w-4 text-blue-700" />
                    <span className="block text-[11px] font-black leading-4 text-slate-700">{link.label}</span>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="rounded-xl border border-blue-100 bg-blue-950 p-4 text-white shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                <Bell className="h-5 w-5 text-amber-300" />
              </div>
              <div>
                <p className="text-sm font-black">Precisa de ajuda?</p>
                <p className="text-xs text-blue-100">Fale com nossa equipe</p>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
};

export default LandingPage;

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
  Play,
  MessageCircle,
} from 'lucide-react';
import { Benefit } from '../types';
import { BENEFITS_DATA, COURSES_DATA, WHATSAPP_GROUPS } from '../constants';
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

  // Cursos em destaque (novos primeiro) e principais grupos de WhatsApp
  const featuredCourses = [...COURSES_DATA]
    .sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
    .slice(0, 4);
  const featuredGroups = WHATSAPP_GROUPS.slice(0, 4);

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
      <section className="relative overflow-hidden rounded-2xl min-h-[180px] bg-blue-950 shadow-sm">
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

        <div className="relative z-10 flex min-h-[180px] flex-col justify-center px-6 py-6 md:px-12">
          <p className="mb-2 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.24em] text-blue-100">
            Portal do Associado <span className="h-px w-8 bg-amber-300" />
          </p>
          <h1 className="max-w-xl text-2xl font-black leading-tight text-white md:text-4xl">
            Bem-vindo, {firstName}
          </h1>
          <p className="mt-2 max-w-2xl text-xs font-medium leading-5 text-blue-50 md:text-sm">
            Sua central exclusiva de inteligencia, beneficios e gestao hoteleira.
          </p>
          <button
            id="explore-benefits-btn"
            onClick={() => onNavigate('ALL_BENEFITS')}
            className="mt-4 inline-flex w-fit items-center gap-3 rounded-lg bg-[#f5c64b] px-5 py-2.5 text-sm font-black text-blue-950 shadow-lg shadow-blue-950/20 transition hover:bg-amber-300"
          >
            Explorar Beneficios <ArrowRight className="h-4 w-4" />
          </button>

          <div className="mt-4 w-full max-w-xs rounded-xl border border-white/20 bg-white/10 p-3 text-white shadow-2xl backdrop-blur md:absolute md:bottom-5 md:right-10">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-300/70 bg-blue-950/50">
                <BriefcaseBusiness className="h-5 w-5 text-amber-300" />
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
                <h2 className="text-base font-black text-slate-900">Cursos em Destaque</h2>
                <p className="hidden text-xs font-medium text-slate-500 sm:block">Capacitação ABIHRJ Academy para a hotelaria carioca.</p>
              </div>
              <button onClick={() => onNavigate('COURSES_V2')} className="inline-flex items-center gap-2 text-xs font-black text-blue-700">
                Ver todos os cursos <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {featuredCourses.map((c) => (
                <button
                  key={c.id}
                  onClick={() => onNavigate('COURSES_V2')}
                  className="group text-left rounded-lg overflow-hidden border border-slate-100 bg-white shadow-sm transition-all hover:border-blue-200 hover:shadow-md"
                >
                  <div className="relative aspect-video overflow-hidden bg-slate-100">
                    <img
                      src={`https://img.youtube.com/vi/${c.youtubeId}/hqdefault.jpg`}
                      alt={c.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 ring-1 ring-white/40 backdrop-blur">
                        <Play className="h-4 w-4 fill-white text-white" />
                      </span>
                    </span>
                    {c.isNew && (
                      <span className="absolute left-2 top-2 rounded bg-red-600 px-1.5 py-0.5 text-[9px] font-bold text-white">NOVO</span>
                    )}
                  </div>
                  <div className="p-2.5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-blue-700">{c.category}</p>
                    <h3 className="mt-1 line-clamp-2 text-xs font-black leading-4 text-slate-900">{c.title}</h3>
                  </div>
                </button>
              ))}
            </div>
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

            {/* Precisa de ajuda? — agora dentro do Acesso Rápido */}
            <button
              onClick={() => onNavigate('CONTACTS')}
              className="mt-3 flex w-full items-center gap-3 rounded-lg bg-blue-950 p-3 text-left text-white transition hover:bg-blue-900"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10">
                <Bell className="h-4 w-4 text-amber-300" />
              </span>
              <span>
                <span className="block text-sm font-black">Precisa de ajuda?</span>
                <span className="block text-xs text-blue-100">Fale com nossa equipe</span>
              </span>
            </button>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="flex items-center gap-2 text-base font-black text-blue-950">
                <MessageCircle className="h-5 w-5 text-green-600" /> Grupos de WhatsApp
              </h2>
              <button onClick={() => onNavigate('WHATSAPP_GROUPS')} className="text-[11px] font-black text-blue-700">
                Ver todos
              </button>
            </div>
            <ul className="space-y-2">
              {featuredGroups.map((g) => (
                <li key={g.id}>
                  <a
                    href={g.link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-lg border border-slate-100 px-3 py-2 transition-colors hover:border-green-300 hover:bg-green-50"
                  >
                    <MessageCircle className="h-4 w-4 shrink-0 text-green-600" />
                    <span className="line-clamp-1 text-[11px] font-bold leading-4 text-slate-700">{g.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>
    </div>
  );
};

export default LandingPage;

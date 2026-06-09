
// Autor: Gabriel Salles
// Suporte do SO: Windows11
// Descrição: Seção FNRH Digital — vídeo de treinamento + conteúdos oficiais (com fontes)

import React from 'react';
import {
  ArrowLeft, ExternalLink, FileText, ShieldCheck, CalendarClock,
  Landmark, PlayCircle, CheckCircle2, AlertTriangle, BookOpen
} from 'lucide-react';
import { COURSES_DATA } from '../constants';

interface FNRHDigitalPageProps {
  onBack: () => void;
}

// Vídeo de treinamento já cadastrado no catálogo de cursos (course-fnhr)
const FNRH_COURSE = COURSES_DATA.find((c: any) => c.id === 'course-fnhr');
const FNRH_YOUTUBE_ID = FNRH_COURSE?.youtubeId || 'YeSKeFOy52Y';

// Fontes OFICIAIS (.gov.br / Planalto). Não usar fontes não oficiais aqui.
const OFFICIAL_SOURCES = [
  {
    label: 'Lei nº 11.771/2008 — Lei Geral do Turismo (Planalto)',
    detail: 'Base legal que institui a obrigatoriedade do registro de hóspedes pelos meios de hospedagem.',
    url: 'https://www.planalto.gov.br/ccivil_03/_ato2007-2010/2008/lei/l11771.htm'
  },
  {
    label: 'Decreto nº 7.381/2010 (Planalto)',
    detail: 'Regulamenta a Lei do Turismo e determina que a movimentação diária de hóspedes seja declarada por meio da FNRH.',
    url: 'https://www.planalto.gov.br/ccivil_03/_ato2007-2010/2010/decreto/d7381.htm'
  },
  {
    label: 'Ministério do Turismo — prorrogação da FNRH Digital',
    detail: 'Notícia oficial sobre a Portaria MTur nº 4, de 18/02/2026, que prorrogou por 60 dias a entrada em vigor (nova data: 20/04/2026).',
    url: 'https://www.gov.br/turismo/pt-br/assuntos/noticias/ministerio-do-turismo-prorroga-por-60-dias-inicio-da-ficha-nacional-de-registro-de-hospedes-digital'
  },
  {
    label: 'Sistema de hospedagem (SNRHos / FNRH Digital) — gov.br',
    detail: 'Plataforma única do Ministério do Turismo, desenvolvida com o SERPRO, para emissão da FNRH em meio digital (acesso via login gov.br).',
    url: 'https://hospedagem.turismo.gov.br/'
  },
  {
    label: 'Cadastur — Ministério do Turismo',
    detail: 'Pré-requisito: o meio de hospedagem precisa estar com o cadastro ativo no Cadastur.',
    url: 'https://cadastur.turismo.gov.br/'
  }
];

const FNRHDigitalPage: React.FC<FNRHDigitalPageProps> = ({ onBack }) => {
  return (
    <div className="bg-white min-h-screen pb-20 animate-fade-in">
      {/* Hero */}
      <div className="bg-rio-blue text-white py-12 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full -ml-10 -mb-10 blur-2xl" />

        <div className="max-w-5xl mx-auto relative z-10">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-blue-200 hover:text-white transition-colors mb-8 group"
          >
            <div className="p-1 rounded-full bg-blue-800/50 group-hover:bg-blue-700 transition">
              <ArrowLeft className="w-5 h-5" />
            </div>
            <span className="font-medium">Voltar para o Dashboard</span>
          </button>

          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-xl">
              <FileText className="w-16 h-16 text-rio-gold" strokeWidth={1.5} />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <span className="bg-rio-gold text-blue-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  FNRH Digital
                </span>
                <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide flex items-center gap-1">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  Conteúdo Oficial
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">FNRH Digital — Ficha Nacional de Registro de Hóspedes</h1>
              <p className="text-blue-100 text-lg md:text-xl max-w-2xl leading-relaxed">
                Treinamento e conteúdos oficiais (com fontes) para os hotéis associados se adequarem
                à Ficha Nacional de Registro de Hóspedes em meio 100% digital.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 mt-8 space-y-8">

        {/* Alerta de prazo */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-amber-900 text-sm leading-relaxed">
            <strong>Obrigatória desde 20/04/2026.</strong> A FNRH em meio digital passou a ser obrigatória
            para todos os meios de hospedagem do país, substituindo definitivamente o modelo em papel.
            O prazo foi prorrogado pela Portaria MTur nº 4, de 18/02/2026.
          </p>
        </div>

        {/* Vídeo de Treinamento */}
        <section className="bg-white border border-gray-100 rounded-xl p-6 md:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-5">
            <PlayCircle className="w-5 h-5 text-rio-blue" />
            Vídeo de Treinamento
          </h2>
          <div className="aspect-video w-full rounded-xl overflow-hidden bg-black shadow-lg border border-gray-200">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${FNRH_YOUTUBE_ID}?rel=0&modestbranding=1`}
              title="Treinamento FNRH Digital"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <p className="text-sm text-gray-500 mt-3">
            Capacitação sobre o preenchimento correto e a gestão da Ficha Nacional de Registro de Hóspedes,
            integração com o PMS e prevenção de inconsistências.
          </p>
        </section>

        {/* O que é */}
        <section className="bg-white border border-gray-100 rounded-xl p-6 md:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-rio-blue" />
            O que é a FNRH
          </h2>
          <p className="text-gray-600 leading-relaxed text-justify">
            A Ficha Nacional de Registro de Hóspedes (FNRH) é o documento que o hotel, pousada, resort ou hostel
            deve apresentar ao hóspede no momento do check-in, com informações como nome, profissão, nacionalidade
            e dados de viagem. Sua aplicação é obrigação de todos os meios de hospedagem do Brasil. Na nova versão
            digital, a emissão passa a ocorrer por uma plataforma única do Ministério do Turismo, podendo ser
            acessada pelo hóspede via login na conta <strong>gov.br</strong>.
          </p>
        </section>

        {/* Base legal */}
        <section className="bg-white border border-gray-100 rounded-xl p-6 md:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-4">
            <Landmark className="w-5 h-5 text-rio-blue" />
            Base Legal
          </h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span><strong>Lei nº 11.771/2008</strong> (Lei Geral do Turismo) — estabelece as obrigações dos meios de hospedagem.</span>
            </li>
            <li className="flex gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span><strong>Decreto nº 7.381/2010</strong> — determina que a movimentação diária de hóspedes seja declarada por meio da FNRH.</span>
            </li>
            <li className="flex gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span><strong>Portaria MTur nº 4, de 18/02/2026</strong> — prorrogou por 60 dias o início da FNRH em meio digital (nova data: 20/04/2026).</span>
            </li>
          </ul>
        </section>

        {/* O que muda */}
        <section className="bg-white border border-gray-100 rounded-xl p-6 md:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-4">
            <ShieldCheck className="w-5 h-5 text-rio-blue" />
            O que muda com a FNRH Digital
          </h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" /><span>Plataforma única, desenvolvida pelo Ministério do Turismo em parceria com o <strong>SERPRO</strong>.</span></li>
            <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" /><span>Substitui definitivamente o preenchimento em papel e moderniza o check-in.</span></li>
            <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" /><span>Exige <strong>cadastro ativo no Cadastur</strong> para o meio de hospedagem.</span></li>
            <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" /><span>Dados devem ser <strong>arquivados eletronicamente por 5 anos</strong>.</span></li>
            <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" /><span>Atende integralmente à <strong>LGPD</strong> (Lei Geral de Proteção de Dados), segundo o Governo Federal.</span></li>
          </ul>
        </section>

        {/* Prazos */}
        <section className="bg-white border border-gray-100 rounded-xl p-6 md:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-4">
            <CalendarClock className="w-5 h-5 text-rio-blue" />
            Prazo de Adequação
          </h2>
          <p className="text-gray-600 leading-relaxed text-justify">
            Os meios de hospedagem tiveram até <strong>20 de abril de 2026</strong> para se adequar ao uso da FNRH
            em formato 100% digital. A data resultou da prorrogação de 60 dias publicada pela Portaria MTur nº 4,
            de 18/02/2026. Verifique abaixo as fontes oficiais para acompanhar eventuais atualizações.
          </p>
        </section>

        {/* Fontes oficiais */}
        <section className="bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-xl p-6 md:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-2">
            <Landmark className="w-5 h-5 text-rio-blue" />
            Fontes Oficiais
          </h2>
          <p className="text-sm text-gray-500 mb-5">
            Todo o conteúdo desta página tem origem em fontes oficiais do Governo Federal (.gov.br / Planalto).
          </p>
          <div className="space-y-3">
            {OFFICIAL_SOURCES.map((src) => (
              <a
                key={src.url}
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-4 rounded-xl bg-white border border-gray-100 hover:border-rio-blue/40 hover:shadow-md transition-all group"
              >
                <ExternalLink className="w-4 h-4 text-rio-blue shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-800 text-sm group-hover:text-rio-blue transition-colors">{src.label}</p>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{src.detail}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default FNRHDigitalPage;

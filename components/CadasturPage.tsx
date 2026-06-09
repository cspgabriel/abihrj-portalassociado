
// Autor: Gabriel Salles
// Suporte do SO: Windows11
// Descrição: Página Cadastur — guia completo de regularização (passo a passo + fontes oficiais)

import React from 'react';
import {
  ArrowLeft, ExternalLink, BadgeCheck, ListChecks, AlertTriangle,
  Landmark, CheckCircle2, RefreshCw, Building2, ClipboardList, FileText,
} from 'lucide-react';

interface CadasturPageProps {
  onBack: () => void;
}

// Passo a passo oficial para regularizar o meio de hospedagem no Cadastur
const STEPS: { title: string; detail: string }[] = [
  {
    title: 'Garanta os pré-requisitos',
    detail: 'CNPJ ativo na Receita Federal com CNAE compatível com meio de hospedagem e conta gov.br do responsável legal da empresa.',
  },
  {
    title: 'Acesse o portal Cadastur',
    detail: 'Entre em cadastur.turismo.gov.br e clique em "Entrar com gov.br". Se não tiver conta, crie no acesso.gov.br.',
  },
  {
    title: 'Inicie um novo cadastro',
    detail: 'No painel, clique em "Cadastrar Prestador", selecione a atividade "Meios de Hospedagem" e informe o CNPJ — o sistema busca os dados na base da Receita Federal.',
  },
  {
    title: 'Preencha o formulário eletrônico',
    detail: 'Complete os dados do empreendimento: endereço, tipo de meio de hospedagem, capacidade (UHs/leitos), contatos e dados do responsável.',
  },
  {
    title: 'Assine o Termo de Responsabilidade',
    detail: 'Leia e assine eletronicamente o Termo de Responsabilidade declarando a veracidade das informações.',
  },
  {
    title: 'Envie e aguarde a homologação',
    detail: 'Após o envio, o cadastro é analisado e homologado em até 5 dias úteis, caso não haja pendências.',
  },
  {
    title: 'Emita o Certificado Cadastur',
    detail: 'Com o cadastro homologado, baixe o Certificado Cadastur pelo próprio sistema. Todo o processo é gratuito.',
  },
  {
    title: 'Mantenha ativo e renove no prazo',
    detail: 'A renovação pode ser solicitada a partir de 90 dias antes do vencimento, em "Gerenciar Atividades" → "Renovar Atividade", revisando e atualizando os dados.',
  },
];

const OBRIGADOS = [
  'Meios de hospedagem (hotéis, pousadas, resorts, hostels, flats)',
  'Agências de turismo',
  'Transportadoras turísticas',
  'Organizadoras de eventos',
  'Parques temáticos e acampamentos turísticos',
  'Guias de turismo (MEI)',
];

const BENEFICIOS = [
  'Pré-requisito para usar a FNRH Digital e participar de programas do MTur',
  'Inclusão no Mapa do Turismo Brasileiro',
  'Acesso a linhas de financiamento específicas para o turismo',
  'Maior credibilidade comercial e participação em editais/feiras',
  'Evita autuações e penalidades em fiscalizações',
];

// Fontes OFICIAIS (.gov.br / Planalto)
const OFFICIAL_SOURCES = [
  {
    label: 'Portal Cadastur — Ministério do Turismo',
    detail: 'Sistema oficial para cadastro, renovação e emissão do Certificado Cadastur (acesso via gov.br).',
    url: 'https://cadastur.turismo.gov.br/',
  },
  {
    label: 'gov.br — Cadastrar prestador de serviços turísticos',
    detail: 'Serviço oficial com requisitos e orientações para o primeiro cadastro.',
    url: 'https://www.gov.br/pt-br/servicos/cadastrar-prestadora-de-servico-turistico',
  },
  {
    label: 'gov.br — Renovar cadastro (Cadastur)',
    detail: 'Serviço oficial para renovação do cadastro do prestador de serviços turísticos.',
    url: 'https://www.gov.br/pt-br/servicos/renovar-cadastro-de-prestador-de-servicos-turisticos-cadastur',
  },
  {
    label: 'Lei nº 11.771/2008 — Política Nacional de Turismo (Planalto)',
    detail: 'Estabelece a obrigatoriedade do cadastro para meios de hospedagem e demais prestadores.',
    url: 'https://www.planalto.gov.br/ccivil_03/_ato2007-2010/2008/lei/l11771.htm',
  },
  {
    label: 'Decreto nº 7.381/2010 (Planalto)',
    detail: 'Regulamenta a Lei do Turismo e detalha o cadastro dos prestadores de serviços turísticos.',
    url: 'https://www.planalto.gov.br/ccivil_03/_ato2007-2010/2010/decreto/d7381.htm',
  },
  {
    label: 'Conta gov.br (acesso.gov.br)',
    detail: 'Crie ou eleve o nível da conta gov.br usada para acessar o Cadastur.',
    url: 'https://acesso.gov.br/',
  },
];

const CadasturPage: React.FC<CadasturPageProps> = ({ onBack }) => {
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
              <BadgeCheck className="w-16 h-16 text-rio-gold" strokeWidth={1.5} />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <span className="bg-rio-gold text-blue-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  Cadastur
                </span>
                <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide flex items-center gap-1">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  Guia Oficial
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Cadastur — Regularize seu meio de hospedagem</h1>
              <p className="text-blue-100 text-lg md:text-xl max-w-2xl leading-relaxed">
                Guia completo, com passo a passo e fontes oficiais, para o seu hotel ou pousada
                obter e manter o Cadastro dos Prestadores de Serviços Turísticos do Ministério do Turismo.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 mt-8 space-y-8">

        {/* Alerta de obrigatoriedade */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-amber-900 text-sm leading-relaxed">
            <strong>Cadastro obrigatório.</strong> Pela Lei nº 11.771/2008, os meios de hospedagem devem manter
            registro ativo no Cadastur. Ele é gratuito, feito 100% on-line e é pré-requisito para a FNRH Digital,
            para o Mapa do Turismo e para diversas linhas de financiamento.
          </p>
        </div>

        {/* O que é */}
        <section className="bg-white border border-gray-100 rounded-xl p-6 md:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-rio-blue" />
            O que é o Cadastur
          </h2>
          <p className="text-gray-600 leading-relaxed text-justify">
            O Cadastur é o Cadastro de Prestadores de Serviços Turísticos do Ministério do Turismo — o registro oficial
            de pessoas físicas e jurídicas que atuam no setor de turismo no Brasil. Para meios de hospedagem, é a
            forma de comprovar formalmente a atividade junto ao poder público, sendo gratuito e realizado pela internet.
          </p>
        </section>

        {/* Quem é obrigado */}
        <section className="bg-white border border-gray-100 rounded-xl p-6 md:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-4">
            <Building2 className="w-5 h-5 text-rio-blue" />
            Quem é obrigado a ter
          </h2>
          <ul className="grid sm:grid-cols-2 gap-2 text-gray-600">
            {OBRIGADOS.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Passo a passo */}
        <section className="bg-white border border-gray-100 rounded-xl p-6 md:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-6">
            <ListChecks className="w-5 h-5 text-rio-blue" />
            Passo a passo para regularizar
          </h2>
          <div className="space-y-6">
            {STEPS.map((step, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-rio-blue text-white flex items-center justify-center font-bold text-sm shadow-md">
                  {index + 1}
                </div>
                <div className="pt-0.5">
                  <p className="font-semibold text-gray-800">{step.title}</p>
                  <p className="text-gray-600 leading-relaxed text-sm mt-1">{step.detail}</p>
                </div>
              </div>
            ))}
          </div>
          <a
            href="https://cadastur.turismo.gov.br/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-2 bg-rio-blue hover:bg-blue-700 text-white font-bold py-3 px-5 rounded-xl shadow-lg shadow-blue-200 transition-all"
          >
            Acessar o portal Cadastur <ExternalLink className="w-4 h-4" />
          </a>
        </section>

        {/* Documentos / pré-requisitos */}
        <section className="bg-white border border-gray-100 rounded-xl p-6 md:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-4">
            <ClipboardList className="w-5 h-5 text-rio-blue" />
            Pré-requisitos e dados necessários
          </h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" /><span><strong>CNPJ ativo</strong> na Receita Federal, com CNAE compatível com meio de hospedagem.</span></li>
            <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" /><span><strong>Conta gov.br</strong> do responsável legal pela empresa.</span></li>
            <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" /><span>Dados do empreendimento: endereço, tipo, capacidade (UHs/leitos) e contatos.</span></li>
            <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" /><span>Dados do responsável e aceite do <strong>Termo de Responsabilidade</strong>.</span></li>
          </ul>
        </section>

        {/* Renovação */}
        <section className="bg-white border border-gray-100 rounded-xl p-6 md:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-4">
            <RefreshCw className="w-5 h-5 text-rio-blue" />
            Renovação e manutenção
          </h2>
          <p className="text-gray-600 leading-relaxed text-justify">
            O certificado tem prazo de validade e a renovação deve ser feita antes do vencimento — o sistema libera o
            pedido a partir de <strong>90 dias antes</strong> do término. Acesse o Cadastur, vá em
            "Gerenciar Atividades", clique em "Renovar Atividade" e revise/atualize todos os dados. O processo de
            renovação também é gratuito. Consulte sempre as fontes oficiais abaixo para confirmar prazos vigentes.
          </p>
        </section>

        {/* Por que é importante */}
        <section className="bg-white border border-gray-100 rounded-xl p-6 md:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-4">
            <BadgeCheck className="w-5 h-5 text-rio-blue" />
            Por que é importante
          </h2>
          <ul className="space-y-3 text-gray-600">
            {BENEFICIOS.map((item) => (
              <li key={item} className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
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

export default CadasturPage;

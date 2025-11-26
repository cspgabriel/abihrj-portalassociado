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

// Dados das Equipes HoteisRio
export const TEAM_CONTACTS = [
  {
    sector: "Presidência & Superintendência",
    email: "presidencia@hoteisrio.com.br",
    whatsapp: "5521999999999",
    manager: "Alfredo Lopes"
  },
  {
    sector: "Jurídico & Trabalhista",
    email: "juridico@hoteisrio.com.br",
    whatsapp: "5521999999999",
    manager: "Dr. Capanema"
  },
  {
    sector: "Comercial & Novos Negócios",
    email: "comercial@hoteisrio.com.br",
    whatsapp: "5521999999999",
    manager: "Theresa Jannuzzi"
  },
  {
    sector: "Operacional & Segurança",
    email: "operacional@hoteisrio.com.br",
    whatsapp: "5521999999999",
    manager: "Equipe de Apoio"
  },
  {
    sector: "Comunicação & Imprensa",
    email: "comunicacao@hoteisrio.com.br",
    whatsapp: "5521999999999",
    manager: "Assessoria Arteiras"
  },
  {
    sector: "Financeiro",
    email: "financeiro@hoteisrio.com.br",
    whatsapp: "5521999999999",
    manager: "Departamento Financeiro"
  }
];

// Dados dos Grupos de WhatsApp
export const WHATSAPP_GROUPS = [
  {
    id: 'gp-gm',
    name: "Gerentes Gerais (GMs)",
    description: "Grupo exclusivo para GMs trocarem informações estratégicas.",
    link: "https://chat.whatsapp.com/exemplo-gm"
  },
  {
    id: 'gp-rh',
    name: "Recursos Humanos",
    description: "Vagas, legislação trabalhista e convenções coletivas.",
    link: "https://chat.whatsapp.com/exemplo-rh"
  },
  {
    id: 'gp-seg',
    name: "Segurança Hoteleira",
    description: "Alertas em tempo real sobre ocorrências na cidade.",
    link: "https://chat.whatsapp.com/exemplo-seguranca"
  },
  {
    id: 'gp-com',
    name: "Comercial & Vendas",
    description: "Discussão sobre tarifas, eventos e ocupação.",
    link: "https://chat.whatsapp.com/exemplo-comercial"
  },
  {
    id: 'gp-gov',
    name: "Governança",
    description: "Troca de experiências e fornecedores para governantas.",
    link: "https://chat.whatsapp.com/exemplo-governanca"
  },
  {
    id: 'gp-manut',
    name: "Manutenção & Engenharia",
    description: "Soluções técnicas e indicações de serviços.",
    link: "https://chat.whatsapp.com/exemplo-manutencao"
  }
];

// Dados dos Eventos da Associação (Fóruns)
export const ASSOCIATION_EVENTS = [
  {
    id: 'forum-comercial',
    title: "Fórum Comercial & Marketing",
    date: "15 de Maio, 09:00",
    location: "Hotel Windsor Marapendi",
    description: "Encontro mensal para discutir estratégias de vendas para o segundo semestre e análise do calendário de eventos da cidade.",
    status: "Confirmado"
  },
  {
    id: 'forum-rh',
    title: "Reunião de RH",
    date: "22 de Maio, 14:00",
    location: "Sede HoteisRio",
    description: "Atualização sobre a convenção coletiva 2024/2025 e palestra sobre saúde mental no trabalho.",
    status: "Confirmado"
  },
  {
    id: 'forum-seguranca',
    title: "Conselho de Segurança Turística",
    date: "05 de Junho, 10:00",
    location: "DEAT - Leblon",
    description: "Reunião com autoridades policiais para alinhamento de segurança para o verão.",
    status: "Agendado"
  },
  {
    id: 'workshop-ia',
    title: "Workshop: IA na Hotelaria",
    date: "12 de Junho, 09:00",
    location: "Online (Zoom)",
    description: "Treinamento prático sobre como usar ferramentas de IA no dia a dia do hotel.",
    status: "Inscrições Abertas"
  }
];

// Lista de texto simples para a seção "Outros Benefícios Permanentes"
export const OTHER_BENEFITS_LIST = [
  "Monitoramento de novas leis (civil, trabalhista, tributária)",
  "Reuniões periódicas sobre Segurança",
  "Fóruns mensais/bimestrais por área hoteleira",
  "Boletim online mensal com notícias",
  "Negociação de convenções coletivas",
  "Pesquisas de ocupação hoteleira",
  "Marketing e divulgação do destino Rio",
  "Calendário de eventos da cidade",
  "Parcerias com empresas de energia renovável"
];

export const BENEFITS_DATA: Benefit[] = [
  // --- NOVOS PORTAIS (ADICIONADOS) ---
  {
    id: 'portal-fornecedores-new',
    title: 'Portal de Fornecedores',
    description: 'Acesse o catálogo completo de fornecedores homologados.',
    category: BenefitCategory.PARTNERS,
    iconName: 'ShoppingBag',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=400',
    isService: true,
    isNew: true,
    externalLink: 'https://beige-lobster-734094.hostingersite.com/',
    usageSteps: [
      "Clique em 'Utilizar' para acessar o portal externo.",
      "Busque por categoria de produto ou serviço.",
      "Entre em contato direto com fornecedores parceiros."
    ]
  },
  {
    id: 'central-rh-new',
    title: 'Central do RH',
    description: 'Plataforma exclusiva para gestores de Recursos Humanos.',
    category: BenefitCategory.HR,
    iconName: 'Users2',
    imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=400',
    isService: true,
    isNew: true,
    externalLink: 'https://centraldorh.sindhoteisrj.com.br/',
    usageSteps: [
      "Acesse a Central do RH.",
      "Consulte convenções coletivas e tabelas salariais.",
      "Acesse modelos de documentos trabalhistas."
    ]
  },
  {
    id: 'planejador-feriados-2026',
    title: 'Feriados 2026 & Comercial',
    description: 'Planejador comercial com calendário completo de feriados.',
    category: BenefitCategory.COMMERCIAL,
    iconName: 'CalendarCheck',
    imageUrl: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=400',
    isService: true,
    isNew: true,
    externalLink: 'https://planejadordeferiados.sindhoteisrj.com.br/',
    usageSteps: [
      "Abra o Planejador Comercial.",
      "Visualize feriados nacionais e locais de 2026.",
      "Planeje suas tarifas e pacotes com antecedência."
    ]
  },
  {
    id: 'central-manutencao-new',
    title: 'Central da Manutenção',
    description: 'Hub de serviços técnicos e suporte para engenharia hoteleira.',
    category: BenefitCategory.OPERATIONAL,
    iconName: 'Wrench',
    imageUrl: 'https://images.unsplash.com/photo-1581092921461-eab62e97a782?auto=format&fit=crop&q=80&w=400',
    isService: true,
    isNew: true,
    externalLink: 'https://centraldamanutencao.sindhoteisrj.com.br/',
    usageSteps: [
      "Acesse a Central da Manutenção.",
      "Encontre prestadores de serviços técnicos especializados.",
      "Consulte manuais de boas práticas de manutenção predial."
    ]
  },

  // --- SERVIÇOS (TOPO DA PÁGINA) ---
  {
    id: 'juridico-01',
    title: 'Assessoria Jurídica',
    description: 'Abertura de chamados e suporte especializado em causas trabalhistas.',
    category: BenefitCategory.LEGAL,
    iconName: 'Scale',
    imageUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400',
    isService: true,
    usageSteps: [
      "Clique no botão 'Utilizar' para abrir o formulário oficial.",
      "Preencha os dados do hotel e o tipo de demanda (Trabalhista, Cível ou Tributária).",
      "Anexe documentos relevantes se houver.",
      "Aguarde o retorno da equipe jurídica em até 48 horas úteis via e-mail."
    ]
  },
  {
    id: 'public-order-01',
    title: 'Canal Ordem Pública',
    description: 'Reporte irregularidades e solicite apoio de segurança no entorno.',
    category: BenefitCategory.OPERATIONAL,
    iconName: 'ShieldAlert',
    imageUrl: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&q=80&w=400',
    isService: true,
    usageSteps: [
      "Identifique uma irregularidade no entorno do hotel (ex: camelôs, lixo, insegurança).",
      "Acesse o formulário clicando em 'Utilizar'.",
      "Descreva o ocorrido e, se possível, envie fotos.",
      "A HoteisRio encaminhará a demanda diretamente aos órgãos públicos responsáveis."
    ]
  },
  {
    id: 'calendar-01',
    title: 'Calendário de Eventos do Rio',
    description: 'Painel interativo de grandes eventos e inteligência de mercado.',
    category: BenefitCategory.EVENTS,
    iconName: 'CalendarDays',
    imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=400',
    isService: true,
    usageSteps: [
      "Acesse o painel para visualizar o calendário consolidado da cidade.",
      "Utilize os filtros para selecionar por mês, tipo de evento ou região.",
      "Analise os picos de demanda para ajustar sua tarifa (Revenue Management).",
      "Exporte os dados em Excel se necessário."
    ]
  },
  {
    id: 'cv-bank',
    title: 'Banco de Talentos',
    description: 'Acesse currículos qualificados para vagas no seu hotel.',
    category: BenefitCategory.HR,
    iconName: 'FileText',
    imageUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=400',
    isService: true,
    usageSteps: [
      "Entre em contato com o setor de RH da HoteisRio.",
      "Solicite o acesso à base de currículos filtrada por função.",
      "Receba os perfis selecionados via e-mail.",
      "Realize as entrevistas diretamente com os candidatos."
    ]
  },
  {
    id: 'app-hoteis',
    title: 'App HotéisRIO',
    description: 'Baixe o aplicativo exclusivo para gestão na palma da mão.',
    category: BenefitCategory.TECHNOLOGY,
    iconName: 'TabletSmartphone',
    imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=400',
    isService: true,
    usageSteps: [
      "Acesse a loja de aplicativos (Google Play ou App Store).",
      "Busque por 'HoteisRio Associados'.",
      "Faça login com as mesmas credenciais deste portal.",
      "Receba notificações push em tempo real sobre segurança e legislação."
    ]
  },

  // --- BENEFÍCIOS GERAIS (CATÁLOGO ABAIXO) ---
  
  // --- Destaque Conquista (IPTU) ---
  {
    id: 'iptu-01',
    title: 'Desconto de 40% no IPTU',
    description: 'Benefício renovado até 2028 para todos os hotéis associados.',
    category: BenefitCategory.INSTITUTIONAL,
    iconName: 'Percent',
    imageUrl: '',
    isNew: true,
    usageSteps: [
      "Certifique-se de estar em dia com as mensalidades associativas.",
      "A renovação é automática para associados adimplentes junto à Prefeitura.",
      "Caso não receba o desconto no boleto, entre em contato com nosso setor jurídico.",
      "Mantenha seu Certificado de Regularidade HoteisRio atualizado."
    ]
  },
  {
    id: 'top-hotel',
    title: 'Prêmio Top Hotel',
    description: 'Reconhecimento aos melhores cases e práticas do setor hoteleiro.',
    category: BenefitCategory.EVENTS,
    iconName: 'Trophy',
    imageUrl: 'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&q=80&w=400',
    isNew: true,
    usageSteps: [
      "Aguarde a abertura das inscrições (anunciada no Boletim).",
      "Envie seu case de sucesso nas categorias disponíveis.",
      "Participe da cerimônia de premiação anual.",
      "Utilize o selo 'Top Hotel' em seu marketing caso seja vencedor."
    ]
  },
  {
    id: 'influencers',
    title: 'Influenciadores Digitais',
    description: 'Ações conectando hotéis a criadores de conteúdo relevantes.',
    category: BenefitCategory.COMMUNICATION,
    iconName: 'Camera',
    imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=400',
    usageSteps: [
      "Cadastre seu interesse em receber press trips.",
      "A HoteisRio fará a curadoria de influenciadores alinhados ao seu perfil.",
      "Defina as cortesias (hospedagem/alimentação) oferecidas.",
      "Receba o mídia kit e relatórios pós-visita do influenciador."
    ]
  },
  {
    id: 'imprensa',
    title: 'Comunicação e Imprensa',
    description: 'Assessoria de imprensa e visibilidade na mídia para o setor.',
    category: BenefitCategory.COMMUNICATION,
    iconName: 'Megaphone',
    imageUrl: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=400',
    usageSteps: [
      "Envie novidades do seu hotel (reformas, festivais gastronômicos) para nossa assessoria.",
      "Nossa equipe transformará em pauta para a mídia especializada.",
      "Acompanhe o clipping de notícias enviado mensalmente.",
      "Participe das entrevistas coletivas organizadas pela associação."
    ]
  },
  {
    id: 'mkt-digital',
    title: 'Marketing Digital',
    description: 'Estratégias e consultoria para presença digital do seu hotel.',
    category: BenefitCategory.COMMERCIAL,
    iconName: 'Globe',
    imageUrl: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80&w=400',
    usageSteps: [
      "Solicite um diagnóstico da presença digital do seu hotel.",
      "Participe dos workshops de capacitação em redes sociais.",
      "Receba dicas de SEO e performance periodicamente.",
      "Acesse descontos com agências parceiras homologadas."
    ]
  },
  {
    id: 'ai-news',
    title: 'Inteligência Artificial',
    description: 'Ferramentas de IA para otimizar a gestão e atendimento.',
    category: BenefitCategory.TECHNOLOGY,
    iconName: 'Bot',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=400',
    isNew: true,
    usageSteps: [
      "Utilize nosso Chatbot no portal para tirar dúvidas rápidas.",
      "Participe dos cursos de 'IA para Hotelaria'.",
      "Implemente soluções parceiras de atendimento automatizado.",
      "Acompanhe as tendências tecnológicas no nosso boletim Tech."
    ]
  },
  {
    id: 'whatsapp-groups',
    title: 'Grupos WhatsApp',
    description: 'Networking e informações rápidas entre gestores e a associação.',
    category: BenefitCategory.COMMUNICATION,
    iconName: 'MessageCircle',
    imageUrl: 'https://images.unsplash.com/photo-1611746347311-3a9957777cfa?auto=format&fit=crop&q=80&w=400',
    usageSteps: [
      "Solicite a inclusão no grupo referente à sua região ou cargo (ex: GM, Comercial, RH).",
      "Respeite as regras de postagem (apenas assuntos profissionais).",
      "Receba alertas de segurança em tempo real.",
      "Interaja com outros gestores para troca de melhores práticas."
    ]
  },
  {
    id: 'forums',
    title: 'Fóruns e Reuniões',
    description: 'Debates sobre o futuro da hotelaria e alinhamento estratégico.',
    category: BenefitCategory.EVENTS,
    iconName: 'Users',
    imageUrl: 'https://images.unsplash.com/photo-1515168816902-8408aa648c5e?auto=format&fit=crop&q=80&w=400',
    usageSteps: [
      "Consulte o calendário de reuniões no portal.",
      "Confirme sua presença via RSVP.",
      "Leve pautas e sugestões para serem debatidas.",
      "Receba a ata da reunião com os encaminhamentos definidos."
    ]
  },
  {
    id: 'edu-partners',
    title: 'Convênios Educacionais',
    description: 'Descontos em faculdades e cursos para colaboradores.',
    category: BenefitCategory.PARTNERS,
    iconName: 'GraduationCap',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=400',
    usageSteps: [
      "Acesse a lista de instituições parceiras no portal.",
      "Solicite a carta de vínculo empregatício ao RH do hotel.",
      "Apresente a carta no momento da matrícula na instituição.",
      "O desconto será aplicado automaticamente na mensalidade."
    ]
  },
  {
    id: 'security',
    title: 'Segurança',
    description: 'Parceria com forças policiais para segurança turística.',
    category: BenefitCategory.OPERATIONAL,
    iconName: 'Shield',
    imageUrl: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=400',
    usageSteps: [
      "Utilize o Canal Ordem Pública para reportes não emergenciais.",
      "Em caso de emergência, utilize o botão de pânico (se disponível) ou ligue 190.",
      "Participe das reuniões mensais com o BPTur e DEAT.",
      "Receba orientações preventivas para hóspedes."
    ]
  },
  {
    id: 'sustainability',
    title: 'Sustentabilidade',
    description: 'Programas e certificações de práticas sustentáveis (ESG).',
    category: BenefitCategory.OPERATIONAL,
    iconName: 'Leaf',
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=400',
    usageSteps: [
      "Inscreva-se no programa de certificação HoteisRio Sustentável.",
      "Receba a visita técnica de diagnóstico.",
      "Implemente as melhorias sugeridas (gestão de resíduos, energia, etc).",
      "Receba o selo verde para divulgar em seus canais."
    ]
  },
  {
    id: 'lobby',
    title: 'Lobby e Advocacy',
    description: 'Defesa dos interesses da hotelaria junto ao poder público.',
    category: BenefitCategory.INSTITUTIONAL,
    iconName: 'Landmark',
    imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=400',
    usageSteps: [
      "Acompanhe as pautas legislativas no boletim semanal.",
      "Participe de audiências públicas quando convocado.",
      "Envie sugestões de melhorias regulatórias para a diretoria.",
      "Utilize os pareceres jurídicos da associação para defesa do seu negócio."
    ]
  },
  {
    id: 'trainings',
    title: 'Treinamentos',
    description: 'Capacitação contínua via Universidade HoteisRio.',
    category: BenefitCategory.TRAINING,
    iconName: 'BookOpen',
    imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=400',
    usageSteps: [
      "Verifique a agenda de cursos da Universidade HoteisRio.",
      "Inscreva seus colaboradores via portal.",
      "Os cursos podem ser presenciais ou EAD.",
      "Certificados são emitidos após a conclusão."
    ]
  },
  {
    id: 'suppliers',
    title: 'Fornecedores Parceiros',
    description: 'Clube de compras com condições exclusivas para associados.',
    category: BenefitCategory.PARTNERS,
    iconName: 'Handshake',
    imageUrl: 'https://images.unsplash.com/photo-1472851294608-415522f96319?auto=format&fit=crop&q=80&w=400',
    usageSteps: [
      "Acesse o guia de fornecedores no portal.",
      "Identifique as empresas com o selo 'Parceiro Oficial'.",
      "Informe que é associado HoteisRio no momento da cotação.",
      "Aproveite tabelas de preços e prazos diferenciados."
    ]
  },
  {
    id: 'newsletter',
    title: 'Boletim Online',
    description: 'Notícias semanais e atualizações do setor no seu email.',
    category: BenefitCategory.COMMUNICATION,
    iconName: 'Mail',
    imageUrl: 'https://images.unsplash.com/photo-1557568192-238a63f66318?auto=format&fit=crop&q=80&w=400',
    usageSteps: [
      "Cadastre os e-mails da sua equipe para receber o boletim.",
      "Verifique sua caixa de entrada toda terça e quinta-feira.",
      "Clique nos links para ler as matérias completas no site.",
      "Compartilhe informações relevantes com seu time operacional."
    ]
  },
  {
    id: 'occupation-stats',
    title: 'Pesquisas de Ocupação',
    description: 'Dados estatísticos e comparativos de desempenho hoteleiro.',
    category: BenefitCategory.STATISTICS,
    iconName: 'PieChart',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400',
    usageSteps: [
      "Responda ao formulário de ocupação enviado semanalmente/mensalmente.",
      "Receba o relatório consolidado com a média do mercado.",
      "Compare seu desempenho (RevPAR, Diária Média) com a média da região.",
      "Utilize os dados para planejamento estratégico."
    ]
  },
  {
    id: 'support-general',
    title: 'Suporte',
    description: 'Atendimento direto da associação para suas demandas.',
    category: BenefitCategory.SUPPORT,
    iconName: 'Headphones',
    imageUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=400',
    usageSteps: [
      "Entre em contato via telefone, e-mail ou WhatsApp oficial.",
      "Identifique-se com o nome do hotel e cargo.",
      "Sua demanda será direcionada ao departamento responsável.",
      "Acompanhe o status da solicitação com a equipe de atendimento."
    ]
  }
];
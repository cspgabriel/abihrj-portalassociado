'use strict';
const fs = require('fs');
const path = require('path');

const benefits = [
  {
    id: 'comercial',
    icon: '💼',
    title: 'Ações Comerciais',
    subtitle: 'Estratégias e oportunidades de negócios',
    description: 'A seção de Ações Comerciais oferece estratégias comerciais específicas e oportunidades de negócios desenvolvidas para ajudar seu hotel a crescer. Encontre insights de mercado, tendências e melhores práticas.',
    features: [
      { icon: '📊', title: 'Análise de Mercado', desc: 'Tendências e dados do setor hoteleiro' },
      { icon: '🤝', title: 'Oportunidades', desc: 'Parcerias e colaborações estratégicas' },
      { icon: '📈', title: 'Growth', desc: 'Estratégias de crescimento comprovadas' },
      { icon: '📉', title: 'Relatórios', desc: 'Dados e análises detalhadas' },
      { icon: '💡', title: 'Estudos', desc: 'Casos de sucesso do setor' },
      { icon: '🎯', title: 'Recomendações', desc: 'Sugestões personalizadas para seu negócio' }
    ],
    steps: [
      'Acesse a seção "Ações Comerciais" no menu',
      'Explore as estratégias sugeridas',
      'Leia os estudos de caso e relatórios',
      'Aplique as melhores práticas no seu negócio',
      'Acompanhe os resultados no dashboard'
    ],
    prev: 'benefit-beneficios.html',
    next: 'benefit-cursos.html'
  },
  {
    id: 'cursos',
    icon: '📚',
    title: 'Cursos & Treinamentos',
    subtitle: 'Programa de capacitação profissional',
    description: 'Acesse um catálogo completo de cursos online e treinamentos profissionais. Desenvolva competências essenciais para o setor hoteleiro, desde gestão até inovação digital.',
    features: [
      { icon: '🎓', title: 'Certificação', desc: 'Cursos com certificado reconhecido' },
      { icon: '🎬', title: 'Webinars', desc: 'Sessões ao vivo com especialistas' },
      { icon: '📖', title: 'Materiais', desc: 'Conteúdo de aprendizado completo' },
      { icon: '👨‍🏫', title: 'Mentoria', desc: 'Suporte de professores especializados' },
      { icon: '⏱️', title: 'Flexível', desc: 'Aprenda no seu próprio ritmo' },
      { icon: '📊', title: 'Progresso', desc: 'Acompanhe seu desenvolvimento' }
    ],
    steps: [
      'Navegue até a seção "Cursos"',
      'Explore o catálogo de cursos disponíveis',
      'Clique em um curso para detalhes completos',
      'Clique em "Inscrever-se"',
      'Comece a aprender imediatamente'
    ],
    prev: 'benefit-comercial.html',
    next: 'benefit-eventos.html'
  },
  {
    id: 'eventos',
    icon: '🎉',
    title: 'Associação de Eventos',
    subtitle: 'Calendário de eventos e networking',
    description: 'Participe de eventos exclusivos, conferências e encontros de networking. Conheça outros associados, troque experiências e crie parcerias valiosas.',
    features: [
      { icon: '🎪', title: 'Conferências', desc: 'Eventos de grande porte anuais' },
      { icon: '🏫', title: 'Workshops', desc: 'Treinamentos temáticos focados' },
      { icon: '👥', title: 'Networking', desc: 'Encontros com outros associados' },
      { icon: '💻', title: 'Online', desc: 'Eventos virtu ais com alcance global' },
      { icon: '🗓️', title: 'Calendário', desc: 'Programação completa do ano' },
      { icon: '📢', title: 'Inscrição', desc: 'Registro fácil e rápido' }
    ],
    steps: [
      'Acesse a seção "Eventos"',
      'Navegue pelo calendário de eventos',
      'Clique em um evento de seu interesse',
      'Clique "Inscrever-se" ou "Mais Informações"',
      'Receba confirmação por email'
    ],
    prev: 'benefit-cursos.html',
    next: 'benefit-forum.html'
  },
  {
    id: 'forum',
    icon: '💬',
    title: 'Fórum de Discussão',
    subtitle: 'Comunidade e discussões colaborativas',
    description: 'Participe de discussões com outros associados, compartilhe experiências e aprenda com a comunidade. Um espaço para tirar dúvidas e encontrar soluções colaborativas.',
    features: [
      { icon: '💭', title: 'Discussões', desc: 'Tópicos temáticos animados' },
      { icon: '🔄', title: 'Colaboração', desc: 'Resoluções em conjunto' },
      { icon: '📝', title: 'Experiências', desc: 'Compartilhe suas histórias' },
      { icon: '👨‍🎓', title: 'Mentoria', desc: 'Aprenda com profissionais experientes' },
      { icon: '💡', title: 'Ideias', desc: 'Compartilhe e receba sugestões' },
      { icon: '🌟', title: 'Comunidade', desc: 'Faça parte de uma rede unida' }
    ],
    steps: [
      'Acesse a seção "Fórum"',
      'Explore as discussões já existentes',
      'Participe respondendo ou criando tópicos',
      'Compartilhe suas experiências e dúvidas',
      'Aprenda com outros membros da comunidade'
    ],
    prev: 'benefit-eventos.html',
    next: 'benefit-talentbank.html'
  },
  {
    id: 'talentbank',
    icon: '🎯',
    title: 'Talent Bank',
    subtitle: 'Banco de talentos e recursos humanos',
    description: 'Acesse um banco de profissionais qualificados e candidatos em busca de oportunidades no setor hoteleiro. Recrute talento e expanda sua rede de contatos profissionais.',
    features: [
      { icon: '👔', title: 'Profissionais', desc: 'Banco de talentos do setor' },
      { icon: '📋', title: 'Perfis', desc: 'Currículos detalhados e qualificados' },
      { icon: '🔍', title: 'Busca', desc: 'Encontre candidatos por competência' },
      { icon: '🤝', title: 'Networking', desc: 'Conecte-se com profissionais' },
      { icon: '💼', title: 'Oportunidades', desc: 'Publique vagas de emprego' },
      { icon: '✉️', title: 'Contato', desc: 'Mensagem direta com candidatos' }
    ],
    steps: [
      'Acesse a seção "Talent Bank"',
      'Navegue pelo banco de profissionais',
      'Use filtros para encontrar talentos',
      'Visualize perfis detalhados',
      'Entre em contato com candidatos'
    ],
    prev: 'benefit-forum.html',
    next: 'benefit-legal.html'
  },
  {
    id: 'legal',
    icon: '📜',
    title: 'Informações Legais',
    subtitle: 'Documentos, regulamentações e orientações',
    description: 'Acesse toda a documentação legal, regulamentações do setor e orientações importantes. Fique atualizado sobre mudanças nas leis e normas que afetam seu negócio.',
    features: [
      { icon: '⚖️', title: 'Leis', desc: 'Legislações e regulamentações' },
      { icon: '📄', title: 'Documentos', desc: 'Modelos e templates oficiais' },
      { icon: '✅', title: 'Conformidade', desc: 'Guias de cumprimento normativo' },
      { icon: '🔔', title: 'Atualizações', desc: 'Notificações de mudanças legais' },
      { icon: '📚', title: 'Recursos', desc: 'Biblioteca de referências legais' },
      { icon: '❓', title: 'Suporte', desc: 'Acesso a consultoria especializada' }
    ],
    steps: [
      'Acesse "Informações Legais" no menu',
      'Navegue por categorias legais',
      'Consulte leis e regulamentações',
      'Baixe modelos de documentos',
      'Mantenha-se atualizado com notificações'
    ],
    prev: 'benefit-talentbank.html',
    next: 'benefit-dashboard.html'
  }
];

const baseTemplate = (benefit) => `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${benefit.title} - Portal do Associado</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    :root {
      --primary: #0066cc;
      --primary-dark: #0052a3;
      --primary-light: #e6f2ff;
      --secondary: #ff6b35;
      --text-dark: #1a1a1a;
      --text-light: #666;
      --border: #e5e5e5;
      --bg-light: #f9f9f9;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #fff;
      color: var(--text-dark);
      display: flex;
      height: 100vh;
    }

    .sidebar {
      width: 250px;
      background: var(--primary-dark);
      color: white;
      padding: 2rem 0;
      overflow-y: auto;
      flex-shrink: 0;
    }

    .sidebar-title {
      padding: 1rem 1.5rem;
      border-bottom: 1px solid rgba(255,255,255,0.1);
      margin-bottom: 1rem;
    }

    .sidebar-title h3 {
      font-size: 1rem;
      margin-bottom: 0.25rem;
    }

    .sidebar-title p {
      font-size: 0.75rem;
      opacity: 0.8;
    }

    .sidebar-nav {
      list-style: none;
    }

    .sidebar-nav a {
      display: block;
      padding: 0.75rem 1.5rem;
      color: rgba(255,255,255,0.7);
      text-decoration: none;
      border-left: 3px solid transparent;
      transition: all 0.3s;
      font-size: 0.9rem;
    }

    .sidebar-nav a:hover,
    .sidebar-nav a.active {
      background: rgba(255,255,255,0.1);
      color: white;
      border-left-color: var(--secondary);
      padding-left: 1.2rem;
    }

    .main-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    header {
      background: white;
      border-bottom: 1px solid var(--border);
      padding: 1.5rem 2rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }

    .header-content {
      max-width: 1400px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo {
      font-size: 1.3rem;
      font-weight: 700;
      color: var(--primary);
    }

    .nav-buttons {
      display: flex;
      gap: 1rem;
    }

    .btn {
      padding: 0.6rem 1.2rem;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      text-decoration: none;
      font-weight: 600;
      transition: all 0.3s;
      font-size: 0.9rem;
    }

    .btn-prev {
      background: var(--border);
      color: var(--text-dark);
    }

    .btn-prev:hover {
      background: var(--text-light);
      color: white;
    }

    .btn-next {
      background: var(--primary);
      color: white;
    }

    .btn-next:hover {
      background: var(--primary-dark);
    }

    .content {
      flex: 1;
      overflow-y: auto;
      padding: 2rem;
    }

    .content-wrapper {
      max-width: 1400px;
      margin: 0 auto;
    }

    .title-section {
      margin-bottom: 2rem;
    }

    .title-section h1 {
      font-size: 2rem;
      color: var(--primary);
      margin-bottom: 0.5rem;
    }

    .title-section p {
      color: var(--text-light);
      font-size: 1.05rem;
    }

    .screenshot-container {
      background: var(--bg-light);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 2rem;
      text-align: center;
    }

    .screenshot-container img {
      max-width: 100%;
      max-height: 600px;
      border-radius: 6px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }

    .screenshot-placeholder {
      min-height: 400px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--text-light);
      font-size: 1.1rem;
    }

    .description {
      background: var(--primary-light);
      border-left: 4px solid var(--primary);
      padding: 1.5rem;
      border-radius: 6px;
      margin-bottom: 2rem;
    }

    .description h3 {
      color: var(--primary-dark);
      margin-bottom: 0.75rem;
    }

    .description p {
      color: var(--text-dark);
      line-height: 1.7;
    }

    .features {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .feature-card {
      background: white;
      border: 1px solid var(--border);
      padding: 1.5rem;
      border-radius: 8px;
      transition: all 0.3s;
    }

    .feature-card:hover {
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      transform: translateY(-2px);
    }

    .feature-card h4 {
      color: var(--primary);
      margin-bottom: 0.5rem;
    }

    .feature-card p {
      color: var(--text-light);
      font-size: 0.9rem;
      line-height: 1.6;
    }

    .how-to {
      background: white;
      border: 1px solid var(--border);
      padding: 2rem;
      border-radius: 8px;
      margin-bottom: 2rem;
    }

    .how-to h3 {
      color: var(--primary);
      margin-bottom: 1.5rem;
    }

    .steps {
      list-style: none;
    }

    .steps li {
      padding: 1rem 0;
      padding-left: 2.5rem;
      position: relative;
      border-bottom: 1px solid var(--border);
      color: var(--text-dark);
      line-height: 1.6;
    }

    .steps li:last-child {
      border-bottom: none;
    }

    .steps li:before {
      content: attr(data-step);
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 32px;
      height: 32px;
      background: var(--primary);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 0.85rem;
    }

    .buttons-group {
      display: flex;
      gap: 1rem;
      margin-top: 2rem;
      padding-top: 1.5rem;
      border-top: 1px solid var(--border);
    }

    .btn-large {
      padding: 1rem 2rem;
      font-size: 1rem;
      flex: 1;
    }

    @media (max-width: 768px) {
      body {
        flex-direction: column;
      }

      .sidebar {
        width: 100%;
        max-height: 150px;
        overflow-x: auto;
        display: flex;
        align-items: center;
      }

      .sidebar-title {
        display: none;
      }

      .sidebar-nav {
        display: flex;
        gap: 0;
      }

      .sidebar-nav a {
        white-space: nowrap;
      }

      .content {
        padding: 1rem;
      }

      .title-section h1 {
        font-size: 1.5rem;
      }

      .features {
        grid-template-columns: 1fr;
      }

      .nav-buttons {
        flex-direction: column;
      }

      .btn {
        width: 100%;
      }
    }
  </style>
</head>
<body>
  <!-- Sidebar -->
  <aside class="sidebar">
    <div class="sidebar-title">
      <h3>🏨 Benefícios</h3>
      <p>Navegação Rápida</p>
    </div>
    <ul class="sidebar-nav">
      <li><a href="benefit-dashboard.html">📊 Dashboard</a></li>
      <li><a href="benefit-beneficios.html">🎁 Benefícios</a></li>
      <li><a href="benefit-comercial.html">💼 Comercial</a></li>
      <li><a href="benefit-cursos.html">📚 Cursos</a></li>
      <li><a href="benefit-eventos.html">🎉 Eventos</a></li>
      <li><a href="benefit-forum.html">💬 Fórum</a></li>
      <li><a href="benefit-talentbank.html">🎯 Talent Bank</a></li>
      <li><a href="benefit-legal.html">📜 Legal</a></li>
    </ul>
  </aside>

  <!-- Main Content -->
  <div class="main-content">
    <!-- Header -->
    <header>
      <div class="header-content">
        <div class="logo">🏨 Portal do Associado</div>
        <nav class="nav-buttons">
          <a href="${benefit.prev}" class="btn btn-prev">← Anterior</a>
          <a href="${benefit.next}" class="btn btn-next">Próximo →</a>
        </nav>
      </div>
    </header>

    <!-- Content -->
    <div class="content">
      <div class="content-wrapper">
        <!-- Title -->
        <div class="title-section">
          <h1>${benefit.icon} ${benefit.title}</h1>
          <p>${benefit.subtitle}</p>
        </div>

        <!-- Screenshot -->
        <div class="screenshot-container">
          <div class="screenshot-placeholder">
            [Screenshot - será adicionado automaticamente]
          </div>
        </div>

        <!-- Description -->
        <div class="description">
          <h3>O que é ${benefit.title}?</h3>
          <p>${benefit.description}</p>
        </div>

        <!-- Features -->
        <div class="features">
          ${benefit.features.map(f => `
          <div class="feature-card">
            <h4>${f.icon} ${f.title}</h4>
            <p>${f.desc}</p>
          </div>
          `).join('')}
        </div>

        <!-- How to Use -->
        <div class="how-to">
          <h3>Como Usar ${benefit.title}</h3>
          <ol class="steps">
            ${benefit.steps.map((step, i) => `
            <li data-step="${i + 1}">${step}</li>
            `).join('')}
          </ol>
        </div>

        <!-- Navigation -->
        <div class="buttons-group">
          <a href="${benefit.prev}" class="btn btn-prev btn-large">← Anterior</a>
          <a href="${benefit.next}" class="btn btn-next btn-large">Próximo Benefício →</a>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;

// Criar os arquivos
console.log('\n📝 Gerando páginas de benefícios...\n');

benefits.forEach(benefit => {
  const filename = `benefit-${benefit.id}.html`;
  const filepath = path.join(__dirname, filename);
  const content = baseTemplate(benefit);
  
  fs.writeFileSync(filepath, content, 'utf-8');
  console.log(`✅ Criado: ${filename}`);
});

console.log('\n✨ Todas as 6 páginas foram criadas com sucesso!\n');
console.log('📁 Arquivos: benefit-comercial.html, benefit-cursos.html, etc.');
console.log('🎯 Para começar, acesse: benefit-dashboard.html\n');

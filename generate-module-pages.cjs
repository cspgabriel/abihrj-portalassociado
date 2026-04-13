#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const modules = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    icon: '📊',
    description: 'Painel principal com acesso central a todas as funcionalidades do portal',
    details: 'Visualize as principais métricas, widgets e atalhos para navegar pelos módulos',
    features: [
      'Widgets com resumo de informações',
      'Acesso rápido aos serviços',
      'Gamificação e recompensas',
      'Informações meteorológicas',
      'Notificações personalizadas',
      'Menu intuitivo de navegação'
    ],
    steps: [
      'Acesse o dashboard ao fazer login',
      'Explore os widgets disponíveis',
      'Use os atalhos para acessar serviços',
      'Personalize sua experiência',
      'Verifique suas recompensas'
    ],
    route: '/#/'
  },
  {
    id: 'all-benefits',
    name: 'Todos os Benefícios',
    icon: '🎁',
    description: 'Catálogo completo de benefícios exclusivos disponíveis para associados',
    details: 'Descubra todos os benefícios, cupons, descontos e vantagens personalizadas do portal',
    features: [
      'Visualizar todos os benefícios',
      'Filtrar por categoria',
      'Buscar benefícios específicos',
      'Ver detalhes completos',
      'Acessar cupons e códigos',
      'Salvar favoritos'
    ],
    steps: [
      'Navegue até a seção de benefícios',
      'Explore as categorias disponíveis',
      'Clique em um benefício para detalhes',
      'Use cupons disponíveis',
      'Aproveite as ofertas exclusivas',
      'Compartilhe com outros associados'
    ],
    route: '/#/all-benefits'
  },
  {
    id: 'commercial',
    name: 'Ações Comerciais',
    icon: '💼',
    description: 'Plataforma de gerenciamento de ações e análise de investimentos',
    details: 'Consulte tendências, receba análises de especialistas e negocie com confiança',
    features: [
      'Cotações de ações em tempo real',
      'Análises e recomendações',
      'Gráficos detalhados',
      'Histórico de transações',
      'Alertas de preços',
      'Relatórios de performance'
    ],
    steps: [
      'Acesse a seção de ações comerciais',
      'Estude as cotações disponíveis',
      'Leia as análises de especialistas',
      'Configure alertas de preço',
      'Registre suas transações',
      'Acompanhe sua carteira'
    ],
    route: '/#/commercial-actions'
  },
  {
    id: 'cursos',
    name: 'Cursos e Treinamentos',
    icon: '📚',
    description: 'Biblioteca de cursos online, workshops e programas de certificação',
    details: 'Acesse recursos de desenvolvimento contínuo e progressão profissional',
    features: [
      'Cursos online variados',
      'Certificações profissionais',
      'Workshops especializados',
      'Conteúdo interativo',
      'Instrutores qualificados',
      'Cronograma flexível'
    ],
    steps: [
      'Explore o catálogo de cursos',
      'Filtro por área de interesse',
      'Leia os detalhes do curso',
      'Inscreva-se no programa',
      'Acompanhe seu progresso',
      'Obtenha seu certificado'
    ],
    route: '/#/courses'
  },
  {
    id: 'events',
    name: 'Eventos da Associação',
    icon: '🎉',
    description: 'Calendário de eventos, conferências e encontros exclusivos de networking',
    details: 'Participe de eventos especiais e amplie sua rede de contatos profissionais',
    features: [
      'Calendário de eventos',
      'Detalhes e agendas',
      'Inscrição online',
      'Mapa de locais',
      'Networking facilitado',
      'Certificados de participação'
    ],
    steps: [
      'Navegue pelo calendário de eventos',
      'Escolha um evento de seu interesse',
      'Consulte a agenda e palestrantes',
      'Faça sua inscrição',
      'Amplie sua rede de contatos',
      'Receba seu certificado'
    ],
    route: '/#/events'
  },
  {
    id: 'forum',
    name: 'Fórum de Discussão',
    icon: '💬',
    description: 'Comunidade online para troca de ideias, dúvidas e conhecimento',
    details: 'Participe de discussões com outros membros, esclareça dúvidas e compartilhe experiências',
    features: [
      'Tópicos organizado por categoria',
      'Respostas helpful da comunidade',
      'Reputação e pontos',
      'Busca de conteúdo',
      'Notificações de respostas',
      'Moderação ativa'
    ],
    steps: [
      'Explore os tópicos do fórum',
      'Leia discussões de seu interesse',
      'Faça uma pergunta ou comente',
      'Ajude outros membros',
      'Construa sua reputação',
      'Ganhe distintivos de comunidade'
    ],
    route: '/#/forum'
  },
  {
    id: 'talentbank',
    name: 'Talent Bank',
    icon: '🎯',
    description: 'Oportunidades de carreira, recrutamento e desenvolvimento profissional',
    details: 'Conecte-se com recrutadores, expanda sua rede e explore novas oportunidades',
    features: [
      'Banco de oportunidades',
      'Perfil profissional',
      'Conexão com recrutadores',
      'Vagas exclusivas',
      'Análise de perfil',
      'Recomendações personalizadas'
    ],
    steps: [
      'Complete seu perfil profissional',
      'Explore as oportunidades disponíveis',
      'Candidate-se para vagas',
      'Conecte com recrutadores',
      'Receba recomendações',
      'Avance na sua carreira'
    ],
    route: '/#/talent-bank'
  },
  {
    id: 'legal',
    name: 'Legislação & Normas',
    icon: '📜',
    description: 'Documentos, legislações e regulamentações da associação',
    details: 'Consulte legislações, normas e documentos oficiais sempre atualizado',
    features: [
      'Legislações completas',
      'Regulamentações atualizadas',
      'Documentos oficiais',
      'Guias e manuais',
      'Busca avançada',
      'Versões PDF para download'
    ],
    steps: [
      'Acesse a biblioteca de legislação',
      'Busque por tema ou número',
      'Leia os documentos completos',
      'Compare versões',
      'Faça download de PDFs',
      'Mantenha-se atualizado'
    ],
    route: '/#/laws-regulation'
  }
];

const cssShared = `<style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
      background: #f5f7fa;
      color: #333;
    }

    .container {
      display: flex;
      min-height: 100vh;
    }

    .sidebar {
      width: 250px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 20px;
      position: fixed;
      height: 100vh;
      overflow-y: auto;
      box-shadow: 2px 0 12px rgba(0, 0, 0, 0.1);
    }

    .sidebar h2 {
      font-size: 1.2em;
      margin-bottom: 20px;
      font-weight: 600;
    }

    .sidebar ul {
      list-style: none;
    }

    .sidebar li {
      margin-bottom: 8px;
    }

    .sidebar a {
      display: block;
      color: rgba(255, 255, 255, 0.8);
      text-decoration: none;
      padding: 12px;
      border-radius: 6px;
      transition: all 0.3s ease;
      font-size: 0.95em;
    }

    .sidebar a:hover,
    .sidebar a.active {
      background: rgba(255, 255, 255, 0.2);
      color: white;
      font-weight: 500;
    }

    .main {
      margin-left: 250px;
      flex: 1;
      padding: 30px;
    }

    .header {
      background: white;
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 30px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .header h1 {
      font-size: 1.5em;
      color: #333;
    }

    .nav-buttons {
      display: flex;
      gap: 10px;
    }

    .btn {
      padding: 10px 20px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      text-decoration: none;
      font-weight: 500;
      transition: all 0.3s ease;
      display: inline-block;
    }

    .btn-prev, .btn-next {
      background: #e0e7ff;
      color: #667eea;
    }

    .btn-prev:hover, .btn-next:hover {
      background: #c7d2fe;
    }

    .btn-next {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .btn-next:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    }

    .content {
      background: white;
      border-radius: 8px;
      padding: 30px;
      margin-bottom: 30px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    }

    .content h2 {
      color: #667eea;
      font-size: 1.3em;
      margin-bottom: 15px;
    }

    .content p {
      color: #666;
      line-height: 1.8;
      margin-bottom: 15px;
    }

    .screenshot {
      width: 100%;
      border-radius: 8px;
      margin: 20px 0;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      max-height: 400px;
      object-fit: cover;
    }

    .description-box {
      background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
      border-left: 4px solid #667eea;
      padding: 20px;
      border-radius: 6px;
      margin: 20px 0;
    }

    .features {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 15px;
      margin: 30px 0;
    }

    .feature-card {
      background: #f8f9fa;
      padding: 15px;
      border-radius: 6px;
      border-top: 3px solid #667eea;
    }

    .feature-card strong {
      color: #333;
      display: block;
      margin-bottom: 5px;
    }

    .feature-card p {
      font-size: 0.9em;
      color: #666;
      margin: 0;
    }

    .how-to {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 6px;
      margin: 20px 0;
    }

    .how-to h3 {
      color: #333;
      margin-bottom: 15px;
    }

    .steps {
      list-style: none;
    }

    .steps li {
      padding: 8px 0;
      padding-left: 30px;
      position: relative;
      color: #666;
      line-height: 1.6;
    }

    .steps li:before {
      content: attr(data-step);
      position: absolute;
      left: 0;
      width: 24px;
      height: 24px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.85em;
      font-weight: bold;
    }

    @media (max-width: 768px) {
      .sidebar {
        position: relative;
        width: 100%;
        height: auto;
      }

      .main {
        margin-left: 0;
        padding: 15px;
      }

      .content,
      .description-box {
        padding: 15px;
      }

      .header {
        flex-direction: column;
        gap: 15px;
      }

      .features {
        grid-template-columns: 1fr;
      }

      .screenshot {
        max-height: 300px;
      }
    }
  </style>`;

function generateHTML(module) {
  const prevIdx = Math.max(0, modules.indexOf(module) - 1);
  const nextIdx = Math.min(modules.length - 1, modules.indexOf(module) + 1);
  const prevModule = modules[prevIdx];
  const nextModule = modules[nextIdx];

  let html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${module.name} - Portal do Associado</title>
  ${cssShared}
</head>
<body>
  <div class="container">
    <div class="sidebar">
      <h2>📱 Módulos</h2>
      <ul>`;

  modules.forEach(m => {
    const isActive = m.id === module.id ? ' active' : '';
    html += `\n        <li><a href="module-${m.id}.html" class="link${isActive}">${m.icon} ${m.name}</a></li>`;
  });

  html += `\n      </ul>
    </div>

    <div class="main">
      <div class="header">
        <div>
          <h1>${module.icon} ${module.name}</h1>
        </div>
        <div class="nav-buttons">
          <a href="module-${prevModule.id}.html" class="btn btn-prev">← Anterior</a>
          <a href="module-${nextModule.id}.html" class="btn btn-next">Próximo →</a>
        </div>
      </div>

      <div class="content">
        <h2>${module.description}</h2>
        <p>${module.details}</p>

        <div class="screenshot-placeholder" style="background: #e0e7ff; height: 300px; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #667eea; font-size: 1.2em; font-weight: 600;">
          📸 Screenshot será adicionado após captura
        </div>

        <div class="description-box">
          <h3>O que você encontra neste módulo</h3>
          <p>${module.details}</p>
        </div>

        <h3>✨ Features Principais</h3>
        <div class="features">`;

  module.features.forEach(feature => {
    html += `
          <div class="feature-card">
            <strong>✓ ${feature}</strong>
          </div>`;
  });

  html += `
        </div>

        <div class="how-to">
          <h3>📖 Como Usar</h3>
          <ol class="steps">`;

  module.steps.forEach((step, idx) => {
    html += `
            <li data-step="${idx + 1}">${step}</li>`;
  });

  html += `
          </ol>
        </div>

        <div style="background: #f0f4ff; padding: 15px; border-radius: 6px; margin-top: 20px;">
          <strong>🔗 Rota do Portal:</strong>
          <code style="background: white; padding: 5px 10px; border-radius: 3px; font-family: monospace;">${module.route}</code>
        </div>
      </div>

      <div class="header" style="justify-content: flex-end; gap: 10px;">
        <a href="module-${prevModule.id}.html" class="btn btn-prev">← ${prevModule.name}</a>
        <a href="module-${nextModule.id}.html" class="btn btn-next">${nextModule.name} →</a>
      </div>
    </div>
  </div>
</body>
</html>`;

  return html;
}

console.log('📝 Gerando páginas HTML dos módulos...\n');

modules.forEach(module => {
  const html = generateHTML(module);
  const filename = `module-${module.id}.html`;
  const filepath = path.join(__dirname, filename);
  
  fs.writeFileSync(filepath, html, 'utf8');
  console.log(`✅ ${filename}`);
});

console.log(`\n✨ ${modules.length} páginas criadas!`);
console.log(`📍 Inicie com: module-dashboard.html`);

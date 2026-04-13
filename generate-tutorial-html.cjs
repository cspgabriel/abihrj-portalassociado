#!/usr/bin/env node

/**
 * 🎬 TUTORIAL GENERATOR - Portal do Associado
 * 
 * Cria um tutorial em HTML simulando o fluxo de uso do portal
 * com instruções passo a passo
 */

const fs = require('fs');
const path = require('path');

const tutorial = {
  title: 'Tutorial: Como Usar o Portal do Associado',
  description: 'Guia completo para acessar e aproveitar os benefícios do portal',
  url: 'https://associados.sindhoteisrj.com.br',
  steps: [
    {
      number: 1,
      title: 'Acessar o Portal',
      description: 'Navegue até o portal usando seu navegador web',
      actions: [
        'Abra seu navegador (Chrome, Firefox, Safari, Edge)',
        `Acesse: ${__dirname}/modules-hub.html ou https://associados.sindhoteisrj.com.br`,
        'Você verá a página de login'
      ],
      duration: '30 segundos'
    },
    {
      number: 2,
      title: 'Fazer Login',
      description: 'Autentique-se com suas credenciais',
      actions: [
        'Insira seu email no campo de login',
        'Insira sua senha no campo correspondente',
        'Clique no botão "Entrar"',
        'Aguarde o carregamento do dashboard'
      ],
      duration: '1 minuto',
      credentials: {
        email: 'marketing@hoteisrio.com.br',
        password: '••••••••'
      }
    },
    {
      number: 3,
      title: 'Explorar Dashboard',
      description: 'Conheça o painel principal com todos os widgets',
      actions: [
        'Visualize os widgets informativos no topo',
        'Confira sua pontuação de gamificação',
        'Veja as informações meteorológicas',
        'Acesse os atalhos rápidos para módulos'
      ],
      modules: ['📊 Dashboard', '🎮 Gamificação', '🌤️ Clima', '⚡ Atalhos'],
      duration: '2 minutos'
    },
    {
      number: 4,
      title: 'Explorar Benefícios Exclusivos',
      description: 'Descubra todas as ofertas disponíveis',
      actions: [
        'Clique em "Benefícios" no menu',
        'Explore as categorias de ofertas',
        'Veja os cupons e descontos disponíveis',
        'Role para ver mais benefícios',
        'Clique em um benefício para detalhes'
      ],
      features: [
        'Catálogo de ofertas',
        'Códigos de desconto',
        'Filtros por categoria',
        'Descrição completa'
      ],
      duration: '3 minutos'
    },
    {
      number: 5,
      title: 'Módulo de Ações Comerciais',
      description: 'Gerenciar investimentos e acompanhar cotações',
      actions: [
        'Acesse "Ações Comerciais" no menu',
        'Visualize as cotações em tempo real',
        'Leia análises de especialistas',
        'Configure alertas de preço',
        'Acompanhe sua carteira'
      ],
      features: [
        'Cotações em tempo real',
        'Análises profissionais',
        'Gráficos detalhados',
        'Alertas personalizados'
      ],
      duration: '3 minutos'
    },
    {
      number: 6,
      title: 'Cursos e Treinamentos',
      description: 'Aperfeiçoe-se com programas de desenvolvimento',
      actions: [
        'Clique em "Cursos" no menu',
        'Explore o catálogo de cursos',
        'Leia descrições e requisitos',
        'Inscreva-se em um curso',
        'Acompanhe seu progresso'
      ],
      features: [
        'Cursos variados',
        'Certificações profissionais',
        'Cronograma flexível',
        'Instrutores qualificados'
      ],
      duration: '2 minutos'
    },
    {
      number: 7,
      title: 'Eventos da Associação',
      description: 'Participe de eventos e networking',
      actions: [
        'Navegue para "Eventos"',
        'Veja o calendário completo',
        'Clique em um evento para detalhes',
        'Inscreva-se nos de seu interesse',
        'Receba confirmação por email'
      ],
      features: [
        'Calendario de eventos',
        'Agendas e palestrantes',
        'Inscrição online',
        'Certificados de participação'
      ],
      duration: '2 minutos'
    },
    {
      number: 8,
      title: 'Fórum de Discussão',
      description: 'Conecte-se com a comunidade',
      actions: [
        'Abra "Fórum" no menu',
        'Explore tópicos organizados',
        'Leia discussões da comunidade',
        'Faça uma pergunta ou comente',
        'Construa sua reputação'
      ],
      features: [
        'Tópicos por categoria',
        'Sistema de reputação',
        'Busca avançada',
        'Notificações de resposta'
      ],
      duration: '2 minutos'
    },
    {
      number: 9,
      title: 'Talent Bank - Oportunidades',
      description: 'Explore carreiras e conecte com recrutadores',
      actions: [
        'Acesse "Talent Bank"',
        'Complete seu perfil profissional',
        'Explore vagas disponíveis',
        'Candidate-se para posições',
        'Conextem-reite com recrutadores'
      ],
      features: [
        'Banco de oportunidades',
        'Perfil profissional',
        'Vagas exclusivas',
        'Rede de contatos'
      ],
      duration: '3 minutos'
    },
    {
      number: 10,
      title: 'Legislação e Normas',
      description: 'Consulte documentações e regulamentações',
      actions: [
        'Clique em "Legislação" no menu',
        'Busque por documento ou tema',
        'Leia legislações completas',
        'Faça download de PDFs',
        'Mantenha-se atualizado'
      ],
      features: [
        'Legislações atualizadas',
        'Regulamentações oficiais',
        'Busca avançada',
        'Download de documentos'
      ],
      duration: '2 minutos'
    }
  ]
};

const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${tutorial.title}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      padding: 40px 20px;
    }

    .container {
      max-width: 900px;
      margin: 0 auto;
    }

    .header {
      background: white;
      border-radius: 12px;
      padding: 40px;
      margin-bottom: 30px;
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
      text-align: center;
    }

    .header h1 {
      color: #667eea;
      font-size: 2.2em;
      margin-bottom: 12px;
    }

    .header p {
      color: #666;
      font-size: 1.1em;
      margin-bottom: 15px;
    }

    .portal-url {
      background: #f0f4ff;
      padding: 12px 20px;
      border-radius: 6px;
      border-left: 4px solid #667eea;
      color: #333;
      font-family: monospace;
      font-size: 0.95em;
    }

    .steps-container {
      display: grid;
      gap: 20px;
    }

    .step-card {
      background: white;
      border-radius: 12px;
      padding: 30px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
      border-left: 5px solid #667eea;
      animation: slideIn 0.5s ease-out;
    }

    .step-card:nth-child(odd) {
      border-left-color: #667eea;
    }

    .step-card:nth-child(even) {
      border-left-color: #764ba2;
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateX(-20px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    .step-number {
      display: inline-block;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 1.1em;
      margin-right: 12px;
      vertical-align: middle;
    }

    .step-header {
      display: flex;
      align-items: center;
      margin-bottom: 15px;
    }

    .step-title {
      color: #333;
      font-size: 1.4em;
      font-weight: 600;
    }

    .step-description {
      color: #666;
      font-size: 1em;
      margin-bottom: 20px;
      line-height: 1.6;
    }

    .step-actions {
      background: #f8f9fa;
      padding: 15px 20px;
      border-radius: 8px;
      margin-bottom: 15px;
    }

    .step-actions h4 {
      color: #333;
      margin-bottom: 10px;
      font-size: 0.95em;
    }

    .step-actions ul {
      list-style: none;
      padding-left: 0;
    }

    .step-actions li {
      color: #555;
      padding: 6px 0;
      padding-left: 24px;
      position: relative;
      line-height: 1.5;
    }

    .step-actions li:before {
      content: "✓";
      position: absolute;
      left: 0;
      color: #667eea;
      font-weight: bold;
    }

    .step-features {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 12px;
    }

    .feature-tag {
      background: #e0e7ff;
      color: #667eea;
      padding: 8px 12px;
      border-radius: 6px;
      font-size: 0.9em;
      font-weight: 500;
      text-align: center;
    }

    .step-meta {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
      padding-top: 15px;
      border-top: 1px solid #e0e7ff;
      font-size: 0.9em;
      color: #888;
    }

    .duration {
      background: #fef3c7;
      padding: 4px 12px;
      border-radius: 12px;
      color: #92400e;
    }

    .footer {
      background: white;
      border-radius: 12px;
      padding: 30px;
      margin-top: 30px;
      text-align: center;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    }

    .footer h3 {
      color: #667eea;
      margin-bottom: 15px;
    }

    .footer p {
      color: #666;
      line-height: 1.8;
      margin-bottom: 15px;
    }

    .cta-button {
      display: inline-block;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 14px 32px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      transition: all 0.3s ease;
      border: none;
      cursor: pointer;
    }

    .cta-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
    }

    .credentials {
      background: #fff3cd;
      border-left: 4px solid #ffc107;
      padding: 15px;
      border-radius: 6px;
      margin-top: 15px;
      font-size: 0.9em;
      color: #333;
    }

    .credentials strong {
      color: #856404;
    }

    @media (max-width: 768px) {
      .header {
        padding: 25px;
      }

      .header h1 {
        font-size: 1.6em;
      }

      .step-card {
        padding: 20px;
      }

      .step-features {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎬 ${tutorial.title}</h1>
      <p>${tutorial.description}</p>
      <div class="portal-url">
        🔗 ${tutorial.url}
      </div>
    </div>

    <div class="steps-container">
`;

tutorial.steps.forEach(step => {
  html += `
      <div class="step-card">
        <div class="step-header">
          <div class="step-number">${step.number}</div>
          <div>
            <div class="step-title">${step.title}</div>
          </div>
        </div>
        
        <div class="step-description">${step.description}</div>

        <div class="step-actions">
          <h4>📋 Como fazer:</h4>
          <ul>
            ${step.actions.map(action => `<li>${action}</li>`).join('')}
          </ul>
        </div>

        ${step.features ? `
        <div>
          <h4 style="margin-bottom: 10px; color: #333;">✨ Funcionalidades</h4>
          <div class="step-features">
            ${step.features.map(feature => `<div class="feature-tag">${feature}</div>`).join('')}
          </div>
        </div>
        ` : ''}

        ${step.credentials ? `
        <div class="credentials">
          <strong>Credenciais de login:</strong><br>
          Email: ${step.credentials.email}<br>
          Senha: ${step.credentials.password}
        </div>
        ` : ''}

        <div class="step-meta">
          <span>⏱️ Tempo estimado: ${step.duration}</span>
          <span class="duration">Passo ${step.number} de ${tutorial.steps.length}</span>
        </div>
      </div>
`;
});

html += `
    </div>

    <div class="footer">
      <h3>🎯 Parabéns!</h3>
      <p>Você concluiu o tutorial de como usar o Portal do Associado!</p>
      <p>Agora você conhece todos os módulos e funcionalidades disponíveis.</p>
      <a href="${tutorial.url}" class="cta-button">→ Acessar Portal Agora</a>
    </div>
  </div>
</body>
</html>
`;

// Salvar arquivo
const filePath = path.join(__dirname, 'tutorial-completo.html');
fs.writeFileSync(filePath, html, 'utf8');

console.log('\n✅ Tutorial criado com sucesso!\n');
console.log(`📁 Arquivo: tutorial-completo.html`);
console.log(`📊 Total de passos: ${tutorial.steps.length}`);
console.log(`⏱️  Tempo total estimado: ${tutorial.steps.reduce((sum, s) => {
  const min = parseInt(s.duration);
  return sum + min;
}, 0)} minutos`);
console.log('\n🎬 Abra o arquivo no navegador para ver o tutorial interativo!\n');

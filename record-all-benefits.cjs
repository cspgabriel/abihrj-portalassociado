#!/usr/bin/env node

/**
 * 🎬 SCREEN RECORDING - Todos os Benefícios do Portal
 * 
 * Grava um tutorial completo mostrando cada benefício 1 por 1
 * com screenshots e explicações detalhadas
 * 
 * Usa: Playwright para automação + Chromium video recording
 * Saída: tutorial-moments.json + video files
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const PORTAL_URL = 'https://associados.sindhoteisrj.com.br';
const LOGIN_EMAIL = 'marketing@hoteisrio.com.br';
const LOGIN_PASSWORD = 'sind2025';

const BENEFITS_DATA = [
  {
    id: 'dashboard',
    title: 'Dashboard - Painel Principal',
    description: 'Visualize seu perfil, pontuação e acesso rápido a todos os módulos',
    path: '/',
    actions: ['wait', 'screenshot', 'scroll', 'wait']
  },
  {
    id: 'beneficios',
    title: 'Benefícios Exclusivos',
    description: 'Catálogo completo de ofertas, cupons e descontos especiais para associados',
    path: '/all-benefits',
    actions: ['navigate', 'wait', 'screenshot', 'scroll', 'click-benefit', 'screenshot', 'wait']
  },
  {
    id: 'comercial',
    title: 'Ações Comerciais',
    description: 'Acompanhe cotações em tempo real, análises e alertas de preço personalizados',
    path: '/commercial-actions',
    actions: ['navigate', 'wait', 'screenshot', 'scroll', 'wait']
  },
  {
    id: 'cursos',
    title: 'Cursos e Treinamentos',
    description: 'Programas de desenvolvimento profissional com certificações e cronograma flexível',
    path: '/courses',
    actions: ['navigate', 'wait', 'screenshot', 'scroll', 'wait']
  },
  {
    id: 'eventos',
    title: 'Eventos da Associação',
    description: 'Calendário de eventos, palestras, workshops e oportunidades de networking',
    path: '/events',
    actions: ['navigate', 'wait', 'screenshot', 'scroll', 'wait']
  },
  {
    id: 'forum',
    title: 'Fórum de Discussão',
    description: 'Comunidade ativa onde você pode fazer perguntas, compartilhar experiências e construir reputação',
    path: '/forum',
    actions: ['navigate', 'wait', 'screenshot', 'scroll', 'wait']
  },
  {
    id: 'talentbank',
    title: 'Talent Bank - Oportunidades',
    description: 'Banco de vagas exclusivas, perfil profissional e conexões com recrutadores',
    path: '/talent-bank',
    actions: ['navigate', 'wait', 'screenshot', 'scroll', 'wait']
  },
  {
    id: 'legislacao',
    title: 'Legislação e Normas',
    description: 'Documentações oficiais, regulamentações atualizadas e normas do setor hoteleiro',
    path: '/laws-regulation',
    actions: ['navigate', 'wait', 'screenshot', 'scroll', 'wait']
  }
];

// Criar diretório de saída
const outputDir = path.join(__dirname, 'tutorials');
const screenshotsDir = path.join(outputDir, 'screenshots');
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
if (!fs.existsSync(screenshotsDir)) fs.mkdirSync(screenshotsDir, { recursive: true });

let moments = [];
let screenshotCount = 0;

async function recordTutorial() {
  console.log('\n🎬 INICIANDO GRAVAÇÃO DO TUTORIAL\n');
  console.log(`📍 Portal: ${PORTAL_URL}`);
  console.log(`👤 Usuário: ${LOGIN_EMAIL}`);
  console.log(`📍 Saída: ${outputDir}\n`);

  const browser = await chromium.launch({
    headless: true,
    // Tentar usar recorders
    recordVideo: {
      dir: outputDir
    }
  });

  try {
    const context = await browser.createBrowserContext({
      recordVideo: {
        dir: outputDir
      }
    });

    const page = await context.newPage();
    
    // PASSO 1: Navegar para o portal
    console.log('▶️  [1/9] Acessando portal...');
    await page.goto(PORTAL_URL, { waitUntil: 'networkidle' });
    await recordMoment('navigate', `Acesso ao portal - ${PORTAL_URL}`);
    await page.waitForTimeout(1000);

    // PASSO 2: Fazer login
    console.log('▶️  [2/9] Realizando login...');
    await recordMoment('type', 'Digitando email de login');
    await page.fill('input[type="email"], input[name="email"], input[placeholder*="email" i]', LOGIN_EMAIL);
    await page.waitForTimeout(500);

    await recordMoment('type', 'Digitando senha');
    await page.fill('input[type="password"], input[name="password"]', LOGIN_PASSWORD);
    await page.waitForTimeout(500);

    await recordMoment('click', 'Clicando em botão Entrar');
    await page.click('button:has-text("Entrar"), button:has-text("ENTRAR"), button[type="submit"]');
    
    console.log('   ⏳ Aguardando carregamento do dashboard...');
    try {
      await page.waitForNavigation({ waitUntil: 'networkidle', timeout: 10000 }).catch(() => {});
    } catch (e) {
      console.log('   ℹ️  Timeout na navegação (esperado)');
    }
    await page.waitForTimeout(3000);

    await recordMoment('screenshot', 'Dashboard após login');
    const dashScreenshot = path.join(screenshotsDir, '00-dashboard.png');
    await page.screenshot({ path: dashScreenshot, fullPage: true });
    screenshotCount++;
    console.log(`   ✅ Screenshot ${screenshotCount}: Dashboard`);

    // PASSO 3-10: Navegar por cada benefício
    for (let i = 0; i < BENEFITS_DATA.length; i++) {
      const benefit = BENEFITS_DATA[i];
      console.log(`\n▶️  [${i + 3}/9] Acessando: ${benefit.title}`);
      
      try {
        // Navegar para o módulo
        if (benefit.path !== '/') {
          const fullPath = `/#${benefit.path}`;
          console.log(`   📍 Navegando para: ${fullPath}`);
          await page.goto(`${PORTAL_URL}${fullPath}`, { waitUntil: 'networkidle' }).catch(() => {});
          await page.waitForTimeout(2000);
        }

        // Tirar screenshot
        await recordMoment('screenshot', benefit.title);
        const filename = `${String(i + 1).padStart(2, '0')}-${benefit.id}.png`;
        const screenshotPath = path.join(screenshotsDir, filename);
        await page.screenshot({ path: screenshotPath, fullPage: true });
        screenshotCount++;
        console.log(`   ✅ Screenshot ${screenshotCount}: ${benefit.title}`);

        // Scroll para mostrar mais conteúdo
        await recordMoment('scroll', `Rolando página de ${benefit.title}`);
        await page.evaluate(() => window.scrollBy(0, 400));
        await page.waitForTimeout(800);

        // Outro screenshot após scroll
        const filename2 = `${String(i + 1).padStart(2, '0')}-${benefit.id}-scroll.png`;
        const screenshotPath2 = path.join(screenshotsDir, filename2);
        await page.screenshot({ path: screenshotPath2, fullPage: true });
        screenshotCount++;
        console.log(`   ✅ Screenshot ${screenshotCount}: ${benefit.title} (após scroll)`);

        await recordMoment('screenshot', `${benefit.title} - conteúdo adicional`);

      } catch (error) {
        console.log(`   ⚠️  Erro ao processar ${benefit.title}: ${error.message}`);
        await recordMoment('error', `Erro ao processar ${benefit.title}`);
      }

      await page.waitForTimeout(500);
    }

    console.log('\n✅ Gravação concluída!');

    // Fechar página
    await page.close();

    // Aguardar video ser processado
    console.log('\n⏳ Aguardando finalização da gravação de vídeo...');
    await context.close();

  } catch (error) {
    console.error('\n❌ Erro durante gravação:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }

  // Salvar moments.json
  console.log('\n📝 Salvando dados dos momentos...');
  const momentsFile = path.join(outputDir, 'tutorial-moments.json');
  fs.writeFileSync(momentsFile, JSON.stringify(moments, null, 2), 'utf8');
  console.log(`✅ Arquivo: ${momentsFile}`);

  // Mostrar resumo
  console.log('\n' + '='.repeat(60));
  console.log('📊 RESUMO DA GRAVAÇÃO');
  console.log('='.repeat(60));
  console.log(`✅ Screenshots capturados: ${screenshotCount}`);
  console.log(`✅ Momentos registrados: ${moments.length}`);
  console.log(`✅ Benefícios documentados: ${BENEFITS_DATA.length}`);
  console.log(`📁 Saída: ${screenshotsDir}`);
  console.log('='.repeat(60) + '\n');

  // Copiar dados para integração
  await createIntegrationGuide();
}

async function recordMoment(type, label) {
  const timestamp = Date.now();
  moments.push({
    timestamp,
    type,
    label,
    index: moments.length
  });
  console.log(`   📍 [${type}] ${label}`);
}

async function createIntegrationGuide() {
  const guide = `# Tutorial - Guia de Integração

## Estrutura de Saída

Este diretório contém:
- \`tutorial-moments.json\` - Dados de cada momento capturado
- \`screenshots/\` - ${screenshotCount} screenshots (1-2 por módulo)
- \`videos/\` - Video bruto capturado pelo Playwright (se gerado)

## Módulos Documentados

${BENEFITS_DATA.map((b, i) => `${i + 1}. **${b.title}**
   - Descrição: ${b.description}
   - ID: ${b.id}
   - Screenshots capturadas: ${i + 1}`).join('\n\n')}

## Próximos Passos

1. **Processar com Remotion:**
   \`\`\`bash
   node process-tutorial-video.cjs
   \`\`\`

2. **Integrar em HTML:**
   - Screenshots já estão em \`tutorials/screenshots/\`
   - Incorporar em \`tutorial-completo.html\`

3. **Publicar:**
   - Host dos screenshots
   - Embed do vídeo final

## Dados dos Momentos

\`\`\`json
${JSON.stringify(moments.slice(0, 5), null, 2)}
... (${moments.length} momentos no total)
\`\`\`

---
Gerado em: ${new Date().toLocaleString('pt-BR')}
`;

  fs.writeFileSync(path.join(outputDir, 'INTEGRATION_GUIDE.md'), guide, 'utf8');
  console.log('📖 Guia de integração criado: INTEGRATION_GUIDE.md');
}

// Executar
recordTutorial().catch(console.error);

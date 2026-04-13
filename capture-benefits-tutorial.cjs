#!/usr/bin/env node

/**
 * 🎬 TUTORIAL CAPTURE - Benefícios do Portal
 * Versão simplificada que captura screenshots
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const PORTAL_URL = 'https://associados.sindhoteisrj.com.br';

const outputDir = path.join(__dirname, 'benefit-screenshots');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const MODULES = [
  { name: 'Dashboard', url: '/#/', delay: 3 },
  { name: 'Todos os Benefícios', url: '/#/all-benefits', delay: 3 },
  { name: 'Ações Comerciais', url: '/#/commercial-actions', delay: 3 },
  { name: 'Cursos', url: '/#/courses', delay: 3 },
  { name: 'Eventos', url: '/#/events', delay: 3 },
  { name: 'Fórum', url: '/#/forum', delay: 3 },
  { name: 'Talent Bank', url: '/#/talent-bank', delay: 3 },
  { name: 'Legislação', url: '/#/laws-regulation', delay: 3 }
];

async function captureScreenshots() {
  console.log('\n🎬 CAPTURANDO SCREENSHOTS DOS BENEFÍCIOS\n');
  console.log(`📁 Saída: ${outputDir}\n`);

  const browser = await chromium.launch({ headless: true });
  
  try {
    const page = await browser.newPage({
      viewport: { width: 1920, height: 1080 }
    });

    // LOGIN
    console.log('🔐 Fazendo login...');
    await page.goto(PORTAL_URL, { waitUntil: 'networkidle' });
    
    try {
      const emailSelector = 'input[type="email"], input[placeholder*="email" i], input[name="email"]';
      const passwordSelector = 'input[type="password"], input[name="password"]';
      const submitSelector = 'button:has-text("Entrar"), button:has-text("ENTRAR"), button[type="submit"]';

      await page.fill(emailSelector, 'marketing@hoteisrio.com.br');
      await page.fill(passwordSelector, 'sind2025');
      await page.click(submitSelector);
      
      await page.waitForTimeout(4000);
      console.log('✅ Login realizado\n');
    } catch (e) {
      console.log('⚠️  Login error (ignorando): ' + e.message);
    }

    // CAPTURAR CADA MÓDULO
    for (let i = 0; i < MODULES.length; i++) {
      const module = MODULES[i];
      console.log(`[${i + 1}/${MODULES.length}] Capturando: ${module.name}`);
      
      try {
        // Navegar
        await page.goto(PORTAL_URL + module.url, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(module.delay * 1000);

        // Screenshot viewport
        const viewportFile = path.join(outputDir, `${String(i + 1).padStart(2, '0')}-${module.name.replace(/\s+/g, '-').toLowerCase()}.png`);
        await page.screenshot({ path: viewportFile });
        console.log(`  ✅ ${path.basename(viewportFile)}`);

        // Screenshot fullpage
        const fullFile = path.join(outputDir, `${String(i + 1).padStart(2, '0')}-${module.name.replace(/\s+/g, '-').toLowerCase()}-full.png`);
        await page.screenshot({ path: fullFile, fullPage: true });
        console.log(`  ✅ ${path.basename(fullFile)}\n`);

      } catch (error) {
        console.log(`  ⚠️  Erro: ${error.message}\n`);
      }
    }

    await page.close();
    
  } finally {
    await browser.close();
  }

  // Gerar índice HTML
  console.log('\n📝 Gerando índice de screenshots...\n');
  generateIndexHTML();
}

function generateIndexHTML() {
  const screenshots = fs.readdirSync(outputDir)
    .filter(f => f.endsWith('.png'))
    .sort();

  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dashboard - Screenshots dos Benefícios</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 40px 20px;
      min-height: 100vh;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
    }
    h1 {
      color: white;
      text-align: center;
      margin-bottom: 40px;
      font-size: 2.5em;
      text-shadow: 0 4px 8px rgba(0,0,0,0.2);
    }
    .gallery {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 20px;
    }
    .card {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 8px 24px rgba(0,0,0,0.15);
      transition: transform 0.3s, box-shadow 0.3s;
    }
    .card:hover {
      transform: translateY(-8px);
      box-shadow: 0 16px 40px rgba(0,0,0,0.25);
    }
    .card img {
      width: 100%;
      height: 400px;
      object-fit: cover;
      display: block;
    }
    .card-info {
      padding: 16px;
      background: #f8f9fa;
    }
    .card-info p {
      color: #666;
      font-size: 0.9em;
      margin: 4px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🎬 Portal do Associado - Screenshots dos Benefícios</h1>
    <div class="gallery">
`;

  let moduleCount = 0;
  for (const screenshot of screenshots) {
    if (!screenshot.includes('-full')) {
      moduleCount++;
      const displayName = screenshot
        .replace(/^\d+-/, '')
        .replace(/-/g, ' ')
        .replace(/\.png$/, '')
        .replace(/\b\w/g, l => l.toUpperCase());

      html += `
      <div class="card">
        <img src="./benefit-screenshots/${screenshot}" alt="${displayName}" loading="lazy">
        <div class="card-info">
          <p><strong>${displayName}</strong></p>
          <p style="color: #999;">📸 Visualização ${moduleCount} de 8</p>
        </div>
      </div>
      `;
    }
  }

  html += `
    </div>
  </div>
</body>
</html>
  `;

  const indexFile = path.join(__dirname, 'screenshots-index.html');
  fs.writeFileSync(indexFile, html, 'utf8');
  console.log(`✅ Índice HTML: screenshots-index.html`);
  console.log(`📊 Total de screenshots: ${screenshots.length}`);
  console.log(`📁 Abra em navegador: file://${indexFile.replace(/\\/g, '/')}\n`);
}

// Executar
captureScreenshots().catch(console.error);

#!/usr/bin/env node

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const http = require('http');

const PORT = 5173;
const projectDir = __dirname;
const screenshotsDir = path.join(projectDir, 'screenshots', 'modules');

if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

async function checkServer() {
  return new Promise((resolve) => {
    const req = http.get(`http://localhost:${PORT}`, () => resolve(true));
    req.on('error', () => resolve(false));
    req.setTimeout(3000);
  });
}

async function captureModules() {
  console.log('🚀 Capturando screenshots dos módulos do portal...\n');

  const serverRunning = await checkServer();
  if (!serverRunning) {
    console.log('❌ Servidor não encontrado em localhost:5173');
    console.log('\nPara capturar screenshots:');
    console.log('   1. Execute: npm run dev');
    console.log('   2. Aguarde o servidor iniciar');
    console.log('   3. Execute novamente: node capture-modules-v2.cjs\n');
    process.exit(1);
  }

  console.log('✅ Servidor detectado!\n');

  const browser = await chromium.launch();
  const page = await browser.newPage();

  const modules = [
    { name: 'Dashboard', id: 'dashboard', path: '/#/' },
    { name: 'Todos os Benefícios', id: 'all-benefits', path: '/#/all-benefits' },
    { name: 'Ações Comerciais', id: 'commercial', path: '/#/commercial-actions' },
    { name: 'Cursos', id: 'cursos', path: '/#/courses' },
    { name: 'Eventos', id: 'events', path: '/#/events' },
    { name: 'Fórum', id: 'forum', path: '/#/forum' },
    { name: 'Talent Bank', id: 'talentbank', path: '/#/talent-bank' },
    { name: 'Legislação', id: 'legal', path: '/#/laws-regulation' }
  ];

  console.log(`📸 Capturando ${modules.length} módulos...\n`);

  for (const module of modules) {
    try {
      const url = `http://localhost:${PORT}${module.path}`;
      console.log(`📄 ${module.name}...`);
      
      await page.goto(url, { waitUntil: 'load', timeout: 10000 });
      await page.waitForTimeout(2000);

      const vp = path.join(screenshotsDir, `${module.id}-viewport.png`);
      const fp = path.join(screenshotsDir, `${module.id}-full.png`);
      
      await page.screenshot({ path: vp });
      await page.screenshot({ path: fp, fullPage: true });

      console.log(`  ✅ Capturado\n`);
    } catch (err) {
      console.log(`  ⚠️  ${err.message}\n`);
    }
  }

  await browser.close();

  const files = fs.readdirSync(screenshotsDir);
  console.log(`\n✨ Concluído! ${files.length} arquivos criados`);
  console.log('📁 Abra: screenshots/modules/');
}

captureModules().catch(console.error);

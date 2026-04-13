const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function captureBenefits() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Criar pasta de screenshots
  const screenshotsDir = path.join(__dirname, 'screenshots', 'benefits');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  console.log('📸 Capturando screenshots diretos das páginas HTML...\n');

  const benefits = [
    { id: 'dashboard', file: 'benefit-dashboard.html', label: '📊 Dashboard' },
    { id: 'beneficios', file: 'benefit-beneficios.html', label: '🎁 Benefícios' },
    { id: 'comercial', file: 'benefit-comercial.html', label: '💼 Ações Comerciais' },
    { id: 'cursos', file: 'benefit-cursos.html', label: '📚 Cursos' },
    { id: 'eventos', file: 'benefit-eventos.html', label: '🎉 Eventos' },
    { id: 'forum', file: 'benefit-forum.html', label: '💬 Fórum' },
    { id: 'talentbank', file: 'benefit-talentbank.html', label: '🎯 Talent Bank' },
    { id: 'legal', file: 'benefit-legal.html', label: '📜 Legal' }
  ];

  for (const benefit of benefits) {
    try {
      const filePath = path.join(__dirname, benefit.file);
      const fileUrl = `file://${filePath}`;
      
      console.log(`${benefit.label}...`);
      await page.goto(fileUrl, { waitUntil: 'networkidle' });
      
      // Screenshot da viewport
      const viewportPath = path.join(screenshotsDir, `${benefit.id}-viewport.png`);
      await page.screenshot({ path: viewportPath });
      console.log(`   ✅ Viewport: ${benefit.id}-viewport.png`);
      
      // Screenshot full-page
      const fullPath = path.join(screenshotsDir, `${benefit.id}-full.png`);
      await page.screenshot({ path: fullPath, fullPage: true });
      console.log(`   ✅ Full-page: ${benefit.id}-full.png\n`);
      
    } catch (err) {
      console.log(`   ❌ Erro: ${err.message}\n`);
    }
  }

  await browser.close();
  console.log('✨ Captura completa!');
  
  // Listar arquivos criados
  const files = fs.readdirSync(screenshotsDir);
  console.log(`\n📁 Arquivos criados (${files.length}):`);
  files.forEach(f => console.log(`   - ${f}`));
}

captureBenefits().catch(console.error);

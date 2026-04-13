#!/usr/bin/env node

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  console.log('📸 Capturando screenshots das páginas de benefício...\n');

  let browser;
  try {
    browser = await chromium.launch();
    const page = await browser.newPage();

    const screenshotsDir = path.join(__dirname, 'screenshots', 'benefits');
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }

    const benefits = [
      { id: 'dashboard', file: 'benefit-dashboard.html', label: '📊 Dashboard' },
      { id: 'beneficios', file: 'benefit-beneficios.html', label: '🎁 Benefícios' },
      { id: 'comercial', file: 'benefit-comercial.html', label: '💼 Comercial' },
      { id: 'cursos', file: 'benefit-cursos.html', label: '📚 Cursos' },
      { id: 'eventos', file: 'benefit-eventos.html', label: '🎉 Eventos' },
      { id: 'forum', file: 'benefit-forum.html', label: '💬 Fórum' },
      { id: 'talentbank', file: 'benefit-talentbank.html', label: '🎯 Talent Bank' },
      { id: 'legal', file: 'benefit-legal.html', label: '📜 Legal' }
    ];

    for (const benefit of benefits) {
      const filePath = path.join(__dirname, benefit.file);
      if (!fs.existsSync(filePath)) {
        console.log(`${benefit.label}: ❌ Arquivo não encontrado`);
        continue;
      }

      console.log(`${benefit.label}...`);
      const fileUrl = `file:///${filePath.replace(/\\/g, '/')}`;

      try {
        await page.goto(fileUrl, { waitUntil: 'load', timeout: 10000 });

        const viewportPath = path.join(screenshotsDir, `${benefit.id}-viewport.png`);
        await page.screenshot({ path: viewportPath });

        const fullPath = path.join(screenshotsDir, `${benefit.id}-full.png`);
        await page.screenshot({ path: fullPath, fullPage: true });

        console.log(`  ✅ viewport.png (${fs.statSync(viewportPath).size} bytes)`);
        console.log(`  ✅ full.png (${fs.statSync(fullPath).size} bytes)\n`);
      } catch (err) {
        console.log(`  ❌ Erro: ${err.message}\n`);
      }
    }

    await browser.close();

    const files = fs.readdirSync(screenshotsDir);
    console.log(`\n✨ Concluído! ${files.length} arquivos criados:`);
    files.forEach(f => console.log(`   - ${f}`));

  } catch (error) {
    console.error('❌ Erro fatal:', error.message);
    throw error;
  } finally {
    if (browser) await browser.close();
  }
})();

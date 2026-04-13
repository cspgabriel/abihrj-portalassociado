#!/usr/bin/env node

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  console.log('🎬 Gravando vídeo rápido dos beneficiários...\n');

  let browser;
  try {
    browser = await chromium.launch();
    const context = await browser.newContext({
      recordVideo: { dir: __dirname }
    });
    const page = await context.newPage();

    const benefits = [
      { id: 'dashboard', file: 'benefit-dashboard.html', delay: 3000 },
      { id: 'beneficios', file: 'benefit-beneficios.html', delay: 3000 },
      { id: 'comercial', file: 'benefit-comercial.html', delay: 3000 },
      { id: 'cursos', file: 'benefit-cursos.html', delay: 3000 },
      { id: 'eventos', file: 'benefit-eventos.html', delay: 3000 },
      { id: 'forum', file: 'benefit-forum.html', delay: 3000 },
      { id: 'talentbank', file: 'benefit-talentbank.html', delay: 3000 },
      { id: 'legal', file: 'benefit-legal.html', delay: 3000 }
    ];

    for (const benefit of benefits) {
      const filePath = path.join(__dirname, benefit.file);
      const fileUrl = `file:///${filePath.replace(/\\/g, '/')}`;

      console.log(`📄 Abrindo ${benefit.id}...`);
      await page.goto(fileUrl, { waitUntil: 'load' });

      // Scroll até o meio da página para mostrar conteúdo
      await page.evaluate(() => window.scrollBy(0, 300));
      await page.waitForTimeout(500);

      // Drawtext overlay com o nome do benefício
      await page.evaluate((name) => {
        const canvas = document.createElement('canvas');
        canvas.width = window.innerWidth;
        canvas.height = 80;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        ctx.font = 'bold 32px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(name, canvas.width / 2, 50);
        const overlay = document.createElement('div');
        overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;height:80px;background:rgba(0,0,0,0.7);display:flex;align-items:center;justify-content:center;color:white;font-size:28px;font-weight:bold;z-index:9999;';
        overlay.textContent = name;
        document.body.prepend(overlay);
      }, benefit.id.toUpperCase());

      await page.waitForTimeout(benefit.delay);

      // Remover overlay
      await page.evaluate(() => {
        const overlay = document.querySelector('div[style*="position:fixed"]');
        if (overlay) overlay.remove();
      });
    }

    const videosDir = __dirname;
    const files = fs.readdirSync(videosDir).filter(f => f.endsWith('.webm'));
    let latestVideo = null;
    let latestTime = 0;

    for (const file of files) {
      const filePath = path.join(videosDir, file);
      const stat = fs.statSync(filePath);
      if (stat.mtime.getTime() > latestTime) {
        latestTime = stat.mtime.getTime();
        latestVideo = file;
      }
    }

    if (latestVideo) {
      const oldPath = path.join(videosDir, latestVideo);
      const newPath = path.join(videosDir, 'demo-benefits-fast.webm');
      fs.renameSync(oldPath, newPath);
      const size = fs.statSync(newPath).size / 1024 / 1024;
      console.log(`\n✅ Vídeo gravado: demo-benefits-fast.webm (${size.toFixed(2)} MB)`);
    }

    await context.close();
    await browser.close();

    console.log('\n🎬 Gravação concluída!');
    console.log('📍 Local: raiz do projeto');
    console.log('📊 Duração: ~25 segundos (8 benefícios × 3 segundos)');

  } catch (error) {
    console.error('❌ Erro:', error.message);
  }
})();

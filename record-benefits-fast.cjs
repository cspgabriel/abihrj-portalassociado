'use strict';
const { chromium } = require('playwright');
const path = require('path');

const BASE_URL = 'https://associados.sindhoteisrj.com.br/';
const EMAIL = 'marketing@hoteisrio.com.br';
const PASSWORD = 'sind2025';
const OUTPUT_FILE = path.join(__dirname, 'demo-benefits-fast.webm');

const benefits = [
  { label: 'Todos os Benefícios', selector: 'button:has-text("Todos os Benefícios")', duration: 3000 },
  { label: 'Ações Comerciais', selector: 'button:has-text("Ações Comerciais")', duration: 3000 },
  { label: 'Cursos & Treinamentos', selector: 'button:has-text("Cursos")', duration: 3000 },
  { label: 'Eventos da Associação', selector: 'button:has-text("Associação de Eventos")', duration: 3000 },
  { label: 'Fórum de Discussão', selector: 'button:has-text("Fórum")', duration: 3000 },
  { label: 'Talent Bank', selector: 'button:has-text("Talent Bank")', duration: 3000 },
  { label: 'Legislação', selector: 'button:has-text("Informações Legais")', duration: 3000 },
];

async function drawText(page, text, x, y, duration = 2000) {
  await page.evaluate(({ text, x, y, duration }) => {
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '99999';
    canvas.style.pointerEvents = 'none';

    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgba(0, 102, 204, 0.9)';
    ctx.font = 'bold 28px sans-serif';
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = 8;
    ctx.fillText('▶ ' + text, x, y);

    document.body.appendChild(canvas);
    setTimeout(() => canvas.remove(), duration);
  }, { text, x, y, duration });
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ 
    viewport: { width: 1280, height: 720 },
    recordVideo: { dir: path.dirname(OUTPUT_FILE) }
  });
  const page = await context.newPage();

  try {
    console.log('\n🎬 Gravando vídeo rápido de benefícios...\n');

    // Login
    console.log('🔐 Autenticando...');
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page.fill('input[type="email"]', EMAIL);
    await page.fill('input[type="password"]', PASSWORD);
    await page.click('button:has-text("Entrar")');
    await page.waitForNavigation({ waitUntil: 'networkidle', timeout: 10000 }).catch(() => {});
    await page.waitForTimeout(1500);

    // Dashboard preview
    console.log('📹 Capturando Dashboard...');
    await drawText(page, 'Dashboard Principal', 600, 80, 2500);
    await page.waitForTimeout(3000);

    // Passar por cada benefício
    for (const benefit of benefits) {
      console.log(`📹 ${benefit.label}...`);
      
      const btn = page.locator(benefit.selector).first();
      await btn.scrollIntoViewIfNeeded().catch(() => {});
      await page.waitForTimeout(300);

      if (await btn.isVisible().catch(() => false)) {
        // Mostrar label flutuante
        await drawText(page, benefit.label, 600, 80, benefit.duration + 500);

        // Clicar
        await btn.click();
        await page.waitForLoadState('networkidle').catch(() => {});
        await page.waitForTimeout(benefit.duration);

        // Voltar
        await page.goBack();
        await page.waitForTimeout(1000);
      }
    }

    // Conclusão
    await drawText(page, 'Fim da Apresentação', 560, 80, 2000);
    await page.waitForTimeout(2500);

    await context.close();
    
    // Aguardar o vídeo ser salvo
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log('\n✅ Vídeo gravado com sucesso!\n');
    console.log('📁 Arquivo: demo-benefits-fast.webm\n');

  } catch (err) {
    console.error('❌ Erro:', err.message);
  } finally {
    try {
      await browser.close();
    } catch (e) {}
  }
})();

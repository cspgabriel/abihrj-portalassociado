'use strict';
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const BASE_URL = 'https://associados.sindhoteisrj.com.br/';
const EMAIL = 'marketing@hoteisrio.com.br';
const PASSWORD = 'sind2025';
const VIDEO_DIR = path.join(__dirname, 'screenshots');
const OUTPUT_NAME = 'demo-beneficios-detalhado.webm';
const REHEARSAL = process.argv.includes('--rehearse');

if (!fs.existsSync(VIDEO_DIR)) {
  fs.mkdirSync(VIDEO_DIR, { recursive: true });
}

// ============ HELPERS ============

async function injectCursor(page) {
  await page.evaluate(() => {
    if (document.getElementById('demo-cursor')) return;
    const cursor = document.createElement('div');
    cursor.id = 'demo-cursor';
    cursor.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 3L19 12L12 13L9 20L5 3Z" fill="white" stroke="#0066CC" stroke-width="2.5" stroke-linejoin="round"/>
    </svg>`;
    cursor.style.cssText = `
      position: fixed; z-index: 999999; pointer-events: none;
      width: 24px; height: 24px;
      transition: left 0.08s, top 0.08s;
      filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.5));
    `;
    document.body.appendChild(cursor);
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });
  });
}

async function injectSubtitleBar(page) {
  await page.evaluate(() => {
    if (document.getElementById('demo-subtitle')) return;
    const bar = document.createElement('div');
    bar.id = 'demo-subtitle';
    bar.style.cssText = `
      position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%); z-index: 999998;
      background: rgba(0, 102, 204, 0.96);
      backdrop-filter: blur(12px);
      color: white; font-family: -apple-system, "Segoe UI", sans-serif;
      font-size: 17px; font-weight: 500; letter-spacing: 0.3px;
      padding: 14px 28px;
      border-radius: 10px;
      max-width: 700px;
      transition: opacity 0.3s ease;
      pointer-events: none;
      box-shadow: 0 8px 24px rgba(0, 102, 204, 0.3);
    `;
    document.body.appendChild(bar);
  });
}

async function showSubtitle(page, text) {
  await page.evaluate((t) => {
    const bar = document.getElementById('demo-subtitle');
    if (!bar) return;
    bar.textContent = t;
    bar.style.opacity = t ? '1' : '0';
  }, text);
}

async function moveAndClick(page, locator, label, opts = {}) {
  const { postClickDelay = 800, ...clickOpts } = opts;
  const el = typeof locator === 'string' ? page.locator(locator).first() : locator;
  
  try {
    const visible = await el.isVisible({ timeout: 2000 }).catch(() => false);
    if (!visible) return false;
    
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(250);
    
    const box = await el.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 10 });
      await page.waitForTimeout(350);
    }
    
    await el.click(clickOpts);
  } catch (e) {
    console.warn(`⚠️  "${label}": ${e.message}`);
    return false;
  }
  
  await page.waitForTimeout(postClickDelay);
  return true;
}

// ============ MAIN ============

(async () => {
  const browser = await chromium.launch({ headless: !REHEARSAL });

  if (REHEARSAL) {
    console.log('\n🎬 VALIDAÇÃO: Demo de Benefícios Detalhada\n');
    
    const context = await browser.newContext({ viewport: { width: 1280, height: 720 } });
    const page = await context.newPage();

    try {
      // Login
      await page.goto(BASE_URL, { waitUntil: 'networkidle' });
      await page.fill('input[type="email"]', EMAIL);
      await page.fill('input[type="password"]', PASSWORD);
      await page.click('button:has-text("Entrar")');
      await page.waitForNavigation({ waitUntil: 'networkidle', timeout: 5000 }).catch(() => {});
      await page.waitForTimeout(1500);

      // Validar seletores
      const checks = [
        { selector: 'text=Bem-vindo', label: 'Dashboard' },
        { selector: 'button:has-text("Todos os Benefícios")', label: 'Botão Benefícios' },
      ];

      let ok = true;
      for (const check of checks) {
        const visible = await page.locator(check.selector).first().isVisible().catch(() => false);
        console.log(`${visible ? '✓' : '✗'} ${check.label}`);
        ok = ok && visible;
      }

      console.log(ok ? '\n✅ PRONTO PARA GRAVAR' : '\n❌ Erro na validação');
      process.exit(ok ? 0 : 1);
    } finally {
      await context.close();
      await browser.close();
    }
    return;
  }

  // RECORDING
  console.log('\n🎥 GRAVANDO: Demo de Benefícios Detalhada\n');

  const context = await browser.newContext({
    recordVideo: { dir: VIDEO_DIR, size: { width: 1280, height: 720 } },
    viewport: { width: 1280, height: 720 }
  });
  const page = await context.newPage();

  try {
    // Login
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(800);

    await page.fill('input[type="email"]', EMAIL);
    await page.fill('input[type="password"]', PASSWORD);
    await page.click('button:has-text("Entrar")');
    await page.waitForNavigation({ waitUntil: 'networkidle', timeout: 5000 }).catch(() => {});
    await page.waitForTimeout(1500);

    // Setup demo UI
    await injectCursor(page);
    await injectSubtitleBar(page);

    // Cena 1: Intro
    await showSubtitle(page, '📋 Explorando os Benefícios Exclusivos');
    await page.waitForTimeout(2500);

    await showSubtitle(page, 'Clique em "Todos os Benefícios" para ver a lista completa');
    await page.waitForTimeout(1500);

    // Cena 2: Clique no botão
    await moveAndClick(page, 'button:has-text("Todos os Benefícios")', 'Benefits button', { postClickDelay: 2500 });
    await page.waitForNavigation({ waitUntil: 'networkidle', timeout: 5000 }).catch(() => {});
    await page.waitForTimeout(1200);

    await injectCursor(page);
    await injectSubtitleBar(page);

    // Cena 3: Explorar benefícios
    await showSubtitle(page, 'Página de Benefícios - Categorias disponíveis');
    await page.waitForTimeout(2000);

    // Scroll para mostrar conteúdo
    await page.evaluate(() => window.scrollBy({ top: 400, behavior: 'smooth' }));
    await page.waitForTimeout(2000);

    await showSubtitle(page, 'Navegue por categoria ou busque benefícios específicos');
    await page.waitForTimeout(1500);

    await page.evaluate(() => window.scrollBy({ top: -400, behavior: 'smooth' }));
    await page.waitForTimeout(1500);

    // Finalização
    await showSubtitle(page, '✅ Explore todos os benefícios disponíveis');
    await page.waitForTimeout(2000);

    await showSubtitle(page, '');

    console.log('✅ Gravação concluída!');

  } catch (err) {
    console.error('❌ ERRO:', err.message);
  } finally {
    await context.close();
    await page.waitForTimeout(1000);

    const video = page.video();
    if (video) {
      try {
        const src = await video.path();
        const dest = path.join(VIDEO_DIR, OUTPUT_NAME);
        await new Promise(resolve => setTimeout(resolve, 1500));

        if (fs.existsSync(src)) {
          fs.copyFileSync(src, dest);
          const stats = fs.statSync(dest);
          console.log(`✅ Salvo: ${OUTPUT_NAME} (${(stats.size / (1024 * 1024)).toFixed(2)} MB)\n`);
        }
      } catch (e) {
        console.error('Erro ao salvar:', e.message);
      }
    }

    await browser.close();
  }
})();

'use strict';
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const BASE_URL = 'https://associados.sindhoteisrj.com.br/';
const VIDEO_DIR = path.join(__dirname, 'screenshots');
const OUTPUT_NAME = 'demo-portal-hoteleiros.webm';
const REHEARSAL = process.argv.includes('--rehearse');

// Criar diretório se não existir
if (!fs.existsSync(VIDEO_DIR)) {
  fs.mkdirSync(VIDEO_DIR, { recursive: true });
}

// ============ HELPER FUNCTIONS ============

async function injectCursor(page) {
  await page.evaluate(() => {
    if (document.getElementById('demo-cursor')) return;
    const cursor = document.createElement('div');
    cursor.id = 'demo-cursor';
    cursor.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 3L19 12L12 13L9 20L5 3Z" fill="white" stroke="#005BCC" stroke-width="2" stroke-linejoin="round"/>
    </svg>`;
    cursor.style.cssText = `
      position: fixed; z-index: 999999; pointer-events: none;
      width: 24px; height: 24px;
      transition: left 0.1s, top 0.1s;
      filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.4));
    `;
    cursor.style.left = '0px';
    cursor.style.top = '0px';
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
      position: fixed; bottom: 20px; left: 0; right: 0; z-index: 999998;
      text-align: center;
      background: rgba(0, 91, 204, 0.95);
      backdrop-filter: blur(10px);
      color: white; font-family: -apple-system, "Segoe UI", "Helvetica Neue", sans-serif;
      font-size: 18px; font-weight: 500; letter-spacing: 0.5px;
      padding: 12px 24px;
      border-radius: 8px;
      max-width: 600px;
      margin: 0 auto;
      transition: opacity 0.3s ease;
      pointer-events: none;
      box-shadow: 0 4px 16px rgba(0, 91, 204, 0.3);
    `;
    bar.textContent = '';
    bar.style.opacity = '0';
    document.body.appendChild(bar);
  });
}

async function showSubtitle(page, text, duration = 0) {
  await page.evaluate((t) => {
    const bar = document.getElementById('demo-subtitle');
    if (!bar) return;
    if (t) {
      bar.textContent = t;
      bar.style.opacity = '1';
    } else {
      bar.style.opacity = '0';
    }
  }, text);
  
  if (text && duration > 0) {
    await page.waitForTimeout(duration);
  }
}

async function ensureVisible(page, locator, label) {
  const el = typeof locator === 'string' ? page.locator(locator).first() : locator;
  const visible = await el.isVisible().catch(() => false);
  if (!visible) {
    console.error(`REHEARSAL FAIL: "${label}" not found - selector: ${typeof locator === 'string' ? locator : '(locator object)'}`);
    return false;
  }
  console.log(`REHEARSAL OK: "${label}"`);
  return true;
}

async function moveAndClick(page, locator, label, opts = {}) {
  const { postClickDelay = 800, ...clickOpts } = opts;
  const el = typeof locator === 'string' ? page.locator(locator).first() : locator;
  const visible = await el.isVisible().catch(() => false);
  if (!visible) {
    console.warn(`WARNING: moveAndClick skipped - "${label}" not visible`);
    return false;
  }
  try {
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    const box = await el.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 10 });
      await page.waitForTimeout(400);
    }
    await el.click(clickOpts);
  } catch (e) {
    console.warn(`WARNING: moveAndClick failed on "${label}": ${e.message}`);
    return false;
  }
  await page.waitForTimeout(postClickDelay);
  return true;
}

async function typeSlowly(page, locator, text, label, charDelay = 35) {
  const el = typeof locator === 'string' ? page.locator(locator).first() : locator;
  const visible = await el.isVisible().catch(() => false);
  if (!visible) {
    console.warn(`WARNING: typeSlowly skipped - "${label}" not visible`);
    return false;
  }
  await moveAndClick(page, el, `Focus: ${label}`);
  await el.fill('');
  await el.pressSequentially(text, { delay: charDelay });
  await page.waitForTimeout(500);
  return true;
}

async function panCursor(page, targets) {
  for (const target of targets) {
    try {
      const box = await page.locator(target).boundingBox();
      if (box) {
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 8 });
        await page.waitForTimeout(600);
      }
    } catch (e) {
      console.warn(`WARNING: panCursor skipped target: ${e.message}`);
    }
  }
}

// ============ MAIN DEMO ============

(async () => {
  const browser = await chromium.launch({ headless: !REHEARSAL });

  if (REHEARSAL) {
    console.log('\n🎬 FASE 2: REHEARSAL');
    const context = await browser.newContext({ viewport: { width: 1280, height: 720 } });
    const page = await context.newPage();

    try {
      await page.goto(BASE_URL, { waitUntil: 'networkidle' });
      await page.waitForTimeout(1000);

      const steps = [
        { label: 'Email field', selector: 'input[type="email"]' },
        { label: 'Password field', selector: 'input[type="password"]' },
        { label: 'Login button', selector: 'button:has-text("Entrar")' },
        { label: '"Esqueceu a senha?" button', selector: 'button:has-text("Esqueceu")' },
        { label: 'Cadastro link', selector: 'button:has-text("Cadastre-se")' },
        { label: 'Benefícios link', selector: 'button:has-text("benefícios")' },
      ];

      let allOk = true;
      for (const step of steps) {
        if (!await ensureVisible(page, step.selector, step.label)) {
          allOk = false;
        }
      }

      if (!allOk) {
        console.error('\n❌ REHEARSAL FAILED - fix selectors before recording\n');
        process.exit(1);
      }

      console.log('\n✅ REHEARSAL PASSED - all selectors verified\n');
    } catch (err) {
      console.error('REHEARSAL ERROR:', err.message);
      process.exit(1);
    } finally {
      await context.close();
      await browser.close();
    }
    return;
  }

  // ============ RECORDING PHASE ============
  console.log('\n🎥 FASE 3: GRAVAÇÃO');
  const context = await browser.newContext({
    recordVideo: { dir: VIDEO_DIR, size: { width: 1280, height: 720 } },
    viewport: { width: 1280, height: 720 }
  });
  const page = await context.newPage();
  page.on('console', msg => {
    if (msg.type() === 'log') console.log(`[🌐 Browser] ${msg.text()}`);
  });

  try {
    // ========== CENA 1: Home & Login Screen ==========
    console.log('Cena 1: Home & Login...');
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    
    await injectCursor(page);
    await injectSubtitleBar(page);
    
    await showSubtitle(page, '🏨 Portal do Associado - HotéisRio');
    await page.waitForTimeout(2500);
    
    await showSubtitle(page, 'Seu portal de benefícios e oportunidades');
    await page.waitForTimeout(2500);
    
    // Pan sobre os botões principais
    await showSubtitle(page, '');
    await page.mouse.move(640, 300, { steps: 5 });
    await page.waitForTimeout(1200);
    
    // ========== CENA 2: Fluxo de Login ==========
    console.log('Cena 2: Login Flow...');
    await showSubtitle(page, 'Fazer login com suas credenciais');
    await page.waitForTimeout(1200);
    
    await moveAndClick(page, 'input[type="email"]', 'Email field', { postClickDelay: 600 });
    await showSubtitle(page, 'Digite seu email');
    await page.waitForTimeout(300);
    
    // Simular digitação de email
    await page.type('input[type="email"]', 'demo@', { delay: 30 });
    await page.waitForTimeout(400);
    await page.type('input[type="email"]', 'hotel.com.br', { delay: 30 });
    await page.waitForTimeout(800);
    
    await showSubtitle(page, '');
    await moveAndClick(page, 'input[type="password"]', 'Password field', { postClickDelay: 400 });
    await showSubtitle(page, 'Digite sua senha');
    await page.waitForTimeout(300);
    
    // Simular digitação de senha
    await page.type('input[type="password"]', '••••••••', { delay: 25 });
    await page.waitForTimeout(600);
    
    // ========== CENA 3: Recuperação de Senha ==========
    console.log('Cena 3: Password Recovery...');
    await page.goBack(); // Simular voltar
    await page.goto(BASE_URL);
    await page.waitForTimeout(1000);
    
    await injectCursor(page);
    await injectSubtitleBar(page);
    
    await showSubtitle(page, 'Recuperar senha quando necessário');
    await page.waitForTimeout(1500);
    
    await moveAndClick(page, 'button:has-text("Esqueceu")', 'Forgot password button', { postClickDelay: 1200 });
    await page.waitForTimeout(500);
    
    await injectCursor(page);
    await injectSubtitleBar(page);
    
    await showSubtitle(page, 'Modal de recuperação de senha');
    await page.waitForTimeout(1500);
    
    const recoverEmailField = page.locator('input[type="email"]').first();
    if (await recoverEmailField.isVisible()) {
      await moveAndClick(page, recoverEmailField, 'Recovery email field', { postClickDelay: 400 });
      await recoverEmailField.fill('associado@hotel.com.br', { delay: 20 });
      await page.waitForTimeout(700);
    }
    
    await showSubtitle(page, '');
    await page.waitForTimeout(1000);
    
    // ========== CENA 4: Finalização ==========
    console.log('Cena 4: Closing...');
    await page.goto(BASE_URL);
    await page.waitForTimeout(1000);
    
    await injectCursor(page);
    await injectSubtitleBar(page);
    
    await showSubtitle(page, '✨ Bem-vindo ao Portal do Associado!');
    await page.waitForTimeout(2000);
    
    await showSubtitle(page, '🌟 Acesse seus benefícios exclusivos');
    await page.waitForTimeout(2000);
    
    await showSubtitle(page, '📱 associados.sindhoteisrj.com.br');
    await page.waitForTimeout(2500);
    
    await showSubtitle(page, '');

    console.log('✅ Gravação concluída com sucesso!');
  } catch (err) {
    console.error('DEMO ERROR:', err.message);
    console.error(err.stack);
  } finally {
    await context.close();
    
    // Aguardar que o vídeo seja salvo
    await page.waitForTimeout(1000);
    
    const video = page.video();
    if (video) {
      try {
        const src = await video.path();
        const dest = path.join(VIDEO_DIR, OUTPUT_NAME);
        
        // Aguardar um pouco para garantir que o arquivo foi escrito
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (fs.existsSync(src)) {
          fs.copyFileSync(src, dest);
          console.log(`\n✅ Vídeo salvo: ${dest}`);
          console.log(`📊 Tamanho: ${(fs.statSync(dest).size / (1024 * 1024)).toFixed(2)} MB`);
        }
      } catch (e) {
        console.error('ERROR: Failed to copy video:', e.message);
      }
    }
    
    await browser.close();
  }
})();

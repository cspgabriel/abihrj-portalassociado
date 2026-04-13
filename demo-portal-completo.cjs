'use strict';
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const BASE_URL = 'https://associados.sindhoteisrj.com.br/';
const EMAIL = 'marketing@hoteisrio.com.br';
const PASSWORD = 'sind2025';
const VIDEO_DIR = path.join(__dirname, 'screenshots');
const OUTPUT_NAME = 'demo-portal-completo.webm';
const REHEARSAL = process.argv.includes('--rehearse');

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
      <path d="M5 3L19 12L12 13L9 20L5 3Z" fill="white" stroke="#0066CC" stroke-width="2.5" stroke-linejoin="round"/>
    </svg>`;
    cursor.style.cssText = `
      position: fixed; z-index: 999999; pointer-events: none;
      width: 24px; height: 24px;
      transition: left 0.08s, top 0.08s;
      filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.5));
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
      position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%); z-index: 999998;
      background: rgba(0, 51, 102, 0.96);
      backdrop-filter: blur(12px);
      color: white; font-family: -apple-system, "Segoe UI", "Helvetica Neue", sans-serif;
      font-size: 18px; font-weight: 500; letter-spacing: 0.3px;
      padding: 14px 28px;
      border-radius: 10px;
      max-width: 700px;
      transition: opacity 0.3s ease, transform 0.3s ease;
      pointer-events: none;
      box-shadow: 0 8px 24px rgba(0, 51, 102, 0.35);
      border: 1px solid rgba(255, 255, 255, 0.1);
    `;
    bar.textContent = '';
    bar.style.opacity = '0';
    document.body.appendChild(bar);
  });
}

async function showSubtitle(page, text) {
  await page.evaluate((t) => {
    const bar = document.getElementById('demo-subtitle');
    if (!bar) return;
    if (t) {
      bar.textContent = t;
      bar.style.opacity = '1';
      bar.style.transform = 'translateX(-50%) scale(1)';
    } else {
      bar.style.opacity = '0';
      bar.style.transform = 'translateX(-50%) scale(0.95)';
    }
  }, text);
}

async function moveAndClick(page, locator, label, opts = {}) {
  const { postClickDelay = 800, ...clickOpts } = opts;
  const el = typeof locator === 'string' ? page.locator(locator).first() : locator;
  
  try {
    const visible = await el.isVisible({ timeout: 2000 }).catch(() => false);
    if (!visible) {
      console.warn(`⚠️  "${label}" não está visível`);
      return false;
    }
    
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    
    const box = await el.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 10 });
      await page.waitForTimeout(350);
    }
    
    await el.click(clickOpts);
  } catch (e) {
    console.warn(`⚠️  Erro ao clicar em "${label}": ${e.message}`);
    return false;
  }
  
  await page.waitForTimeout(postClickDelay);
  return true;
}

async function typeSlowly(page, locator, text, label, charDelay = 30) {
  const el = typeof locator === 'string' ? page.locator(locator).first() : locator;
  
  try {
    const visible = await el.isVisible({ timeout: 2000 }).catch(() => false);
    if (!visible) {
      console.warn(`⚠️  "${label}" não está visível`);
      return false;
    }
    
    await moveAndClick(page, el, `Focus: ${label}`);
    await el.fill('');
    await el.pressSequentially(text, { delay: charDelay });
    await page.waitForTimeout(400);
  } catch (e) {
    console.warn(`⚠️  Erro ao digitar em "${label}": ${e.message}`);
    return false;
  }
  
  return true;
}

async function ensureVisible(page, locator, label) {
  const el = typeof locator === 'string' ? page.locator(locator).first() : locator;
  const visible = await el.isVisible().catch(() => false);
  if (!visible) {
    console.error(`✗ "${label}" não encontrado`);
    return false;
  }
  console.log(`✓ "${label}"`);
  return true;
}

// ============ MAIN ============

(async () => {
  const browser = await chromium.launch({ headless: !REHEARSAL });

  if (REHEARSAL) {
    console.log('\n🎬 FASE 2: VALIDAÇÃO DE SELETORES');
    console.log('=' .repeat(60) + '\n');
    
    const context = await browser.newContext({ viewport: { width: 1280, height: 720 } });
    const page = await context.newPage();

    try {
      await page.goto(BASE_URL, { waitUntil: 'networkidle' });
      await page.waitForTimeout(1000);

      // Step 1: Login
      console.log('Validando formulário de login...');
      let ok = true;
      ok = await ensureVisible(page, 'input[type="email"]', 'Campo de email') && ok;
      ok = await ensureVisible(page, 'input[type="password"]', 'Campo de senha') && ok;
      ok = await ensureVisible(page, 'button:has-text("Entrar")', 'Botão Entrar') && ok;

      if (!ok) throw new Error('Elementos de login não encontrados');

      // Fazer login
      console.log('\nFazendo login...');
      await page.fill('input[type="email"]', EMAIL);
      await page.fill('input[type="password"]', PASSWORD);
      await page.click('button:has-text("Entrar")');
      await page.waitForTimeout(5000);
      await page.waitForNavigation({ waitUntil: 'networkidle', timeout: 5000 }).catch(() => {});
      await page.waitForTimeout(2000);

      if (page.url() === BASE_URL) {
        console.log('✓ Login bem-sucedido\n');
      } else {
        console.log(`✓ Com redirecionamento para: ${page.url()}\n`);
      }

      // Step 2: Dashboard elements
      console.log('Validando elementos do dashboard...');
      ok = await ensureVisible(page, 'text=Bem-vindo', 'Mensagem de boas-vindas') && ok;
      ok = await ensureVisible(page, 'button:has-text("Todos os Benefícios")', 'Botão Benefícios') && ok;
      ok = await ensureVisible(page, 'button:has-text("Ações Comerciais")', 'Botão Ações Comerciais') && ok;
      ok = await ensureVisible(page, 'button:has-text("Cursos")', 'Botão Cursos') && ok;

      if (!ok) {
        console.error('\n❌ Alguns elementos do dashboard não encontrados');
        process.exit(1);
      }

      console.log('\n✅ VALIDAÇÃO CONCLUÍDA COM SUCESSO\n');
    } catch (err) {
      console.error(`\n❌ ERRO NA VALIDAÇÃO: ${err.message}\n`);
      process.exit(1);
    } finally {
      await context.close();
      await browser.close();
    }
    return;
  }

  // ============ RECORDING PHASE ============
  console.log('\n🎥 FASE 3: GRAVANDO VIDEO DE DEMONSTRAÇÃO');
  console.log('=' .repeat(60) + '\n');

  const context = await browser.newContext({
    recordVideo: { dir: VIDEO_DIR, size: { width: 1280, height: 720 } },
    viewport: { width: 1280, height: 720 }
  });
  const page = await context.newPage();

  try {
    // ========== CENA 1: HOME & PROCESSO DE LOGIN ==========
    console.log('📽️  Cena 1: Login');
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    await injectCursor(page);
    await injectSubtitleBar(page);

    await showSubtitle(page, '🏨 Portal do Associado - HotéisRio');
    await page.waitForTimeout(2000);

    await showSubtitle(page, 'Seus benefícios e oportunidades em um só lugar');
    await page.waitForTimeout(2500);

    // Demonstrar o processo de login
    await showSubtitle(page, '1️⃣  Inserir credenciais de acesso');
    await page.waitForTimeout(1500);

    await moveAndClick(page, 'input[type="email"]', 'Email field', { postClickDelay: 500 });
    await typeSlowly(page, 'input[type="email"]', EMAIL, 'Email', 20);
    await page.waitForTimeout(600);

    await moveAndClick(page, 'input[type="password"]', 'Password field', { postClickDelay: 400 });
    await page.type('input[type="password"]', PASSWORD, { delay: 15 });
    await page.waitForTimeout(800);

    await showSubtitle(page, '2️⃣  Clicar em "Entrar"');
    await page.waitForTimeout(1200);

    await moveAndClick(page, 'button:has-text("Entrar")', 'Login button', { postClickDelay: 2500 });

    // Aguardar carregamento
    await page.waitForNavigation({ waitUntil: 'networkidle', timeout: 8000 }).catch(() => {});
    await page.waitForTimeout(2000);

    await injectCursor(page);
    await injectSubtitleBar(page);

    // ========== CENA 2: DASHBOARD OVERVIEW ==========
    console.log('📽️  Cena 2: Dashboard');
    await showSubtitle(page, '✨ Bem-vindo ao seu Portal!');
    await page.waitForTimeout(2500);

    // Pan sobre o dashboard
    await showSubtitle(page, 'Acesso rápido às principais funcionalidades');
    await page.waitForTimeout(1500);

    // Scroll suave para mostrar conteúdo
    await page.evaluate(() => window.scrollBy({ top: 300, behavior: 'smooth' }));
    await page.waitForTimeout(2000);

    await showSubtitle(page, '');
    await page.waitForTimeout(500);

    // Scroll volta
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
    await page.waitForTimeout(1500);

    // ========== CENA 3: EXPLORANDO FUNCIONALIDADES ==========
    console.log('📽️  Cena 3: Funcionalidades');

    // 3.1: Todos os Benefícios
    await showSubtitle(page, '📋 Navegando por Benefícios');
    await page.waitForTimeout(1500);

    await moveAndClick(page, 'button:has-text("Todos os Benefícios")', 'Beneficios button', { postClickDelay: 2500 });
    await page.waitForNavigation({ waitUntil: 'networkidle', timeout: 8000 }).catch(() => {});
    await page.waitForTimeout(1500);

    await injectCursor(page);
    await injectSubtitleBar(page);

    await showSubtitle(page, 'Categoria: Todos os Benefícios');
    await page.waitForTimeout(1000);

    // Scroll para mostrar benefícios
    await page.evaluate(() => window.scrollBy({ top: 400, behavior: 'smooth' }));
    await page.waitForTimeout(2000);

    await showSubtitle(page, '');
    await page.waitForTimeout(800);

    // Voltar ao dashboard
    await page.goBack();
    await page.waitForTimeout(2000);
    await injectCursor(page);
    await injectSubtitleBar(page);

    // 3.2: Ações Comerciais
    await showSubtitle(page, '🏪 Ações Comerciais para Vendas');
    await page.waitForTimeout(1500);

    await moveAndClick(page, 'button:has-text("Ações Comerciais")', 'Commercial button', { postClickDelay: 2500 });
    await page.waitForNavigation({ waitUntil: 'networkidle', timeout: 8000 }).catch(() => {});
    await page.waitForTimeout(1500);

    await injectCursor(page);
    await injectSubtitleBar(page);

    await showSubtitle(page, 'Oportunidades comerciais e parcerias');
    await page.waitForTimeout(2000);

    await page.evaluate(() => window.scrollBy({ top: 300, behavior: 'smooth' }));
    await page.waitForTimeout(1500);

    await showSubtitle(page, '');
    await page.goBack();
    await page.waitForTimeout(2000);

    // 3.3: Cursos & Treinamentos
    await injectCursor(page);
    await injectSubtitleBar(page);

    console.log('📽️  Cena 4: Cursos');
    await showSubtitle(page, '🎓 Programas de Treinamento');
    await page.waitForTimeout(1500);

    const cursosBtn = page.locator('button:has-text("Cursos")').first();
    if (await cursosBtn.isVisible().catch(() => false)) {
      await moveAndClick(page, cursosBtn, 'Cursos button', { postClickDelay: 2500 });
      await page.waitForNavigation({ waitUntil: 'networkidle', timeout: 8000 }).catch(() => {});
      await page.waitForTimeout(1500);

      await injectCursor(page);
      await injectSubtitleBar(page);

      await showSubtitle(page, 'Capacitação e desenvolvimento profissional');
      await page.waitForTimeout(1800);

      await page.evaluate(() => window.scrollBy({ top: 350, behavior: 'smooth' }));
      await page.waitForTimeout(1500);

      await showSubtitle(page, '');
      await page.goBack();
      await page.waitForTimeout(1500);
    }

    // ========== CENA 5: FINALIZAÇÃO ==========
    console.log('📽️  Cena 5: Fechamento');
    await injectCursor(page);
    await injectSubtitleBar(page);

    await showSubtitle(page, '🌟 Plataforma integrada para hoteleiros');
    await page.waitForTimeout(2000);

    await showSubtitle(page, '📱 associados.sindhoteisrj.com.br');
    await page.waitForTimeout(2000);

    await showSubtitle(page, '✅ Seu sucesso é nossa prioridade!');
    await page.waitForTimeout(2500);

    await showSubtitle(page, '');

    console.log('\n✅ Gravação concluída com sucesso!');

  } catch (err) {
    console.error('\n❌ ERRO DURANTE GRAVAÇÃO:', err.message);
    console.error(err.stack);
  } finally {
    await context.close();
    await page.waitForTimeout(800);

    const video = page.video();
    if (video) {
      try {
        const src = await video.path();
        const dest = path.join(VIDEO_DIR, OUTPUT_NAME);

        await new Promise(resolve => setTimeout(resolve, 1500));

        if (fs.existsSync(src)) {
          fs.copyFileSync(src, dest);
          const stats = fs.statSync(dest);
          console.log(`\n✅ Vídeo salvo com sucesso!`);
          console.log(`📁 Arquivo: ${OUTPUT_NAME}`);
          console.log(`📊 Tamanho: ${(stats.size / (1024 * 1024)).toFixed(2)} MB`);
          console.log(`📍 Caminho: ${dest}\n`);
        }
      } catch (e) {
        console.error('Erro ao salvar vídeo:', e.message);
      }
    }

    await browser.close();
  }
})();

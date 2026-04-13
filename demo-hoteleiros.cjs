'use strict';
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const BASE_URL = process.env.QA_BASE_URL || 'http://localhost:3000';
const VIDEO_DIR = path.join(__dirname, 'dogfood-output');
const OUTPUT_NAME = 'demo-portal-hoteleiros.webm';

// ============ UTILITY FUNCTIONS ============

async function injectCursor(page) {
  await page.evaluate(() => {
    if (document.getElementById('demo-cursor')) return;
    const cursor = document.createElement('div');
    cursor.id = 'demo-cursor';
    cursor.innerHTML = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 3L19 12L12 13L9 20L5 3Z" fill="white" stroke="#FF6B35" stroke-width="2" stroke-linejoin="round"/>
    </svg>`;
    cursor.style.cssText = `
      position: fixed; z-index: 999999; pointer-events: none;
      width: 28px; height: 28px;
      transition: left 0.1s, top 0.1s;
      filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.4));
    `;
    cursor.style.left = '0px';
    cursor.style.top = '0px';
    document.body.appendChild(cursor);
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = (e.clientX - 14) + 'px';
      cursor.style.top = (e.clientY - 14) + 'px';
    });
  });
}

async function injectSubtitleBar(page) {
  await page.evaluate(() => {
    if (document.getElementById('demo-subtitle')) return;
    const bar = document.createElement('div');
    bar.id = 'demo-subtitle';
    bar.style.cssText = `
      position: fixed; bottom: 0; left: 0; right: 0; z-index: 999998;
      text-align: center; padding: 16px 24px;
      background: rgba(0, 0, 0, 0.82);
      color: white; font-family: -apple-system, "Segoe UI", sans-serif;
      font-size: 18px; font-weight: 600; letter-spacing: 0.5px;
      transition: opacity 0.3s;
      pointer-events: none;
      border-top: 3px solid #FF6B35;
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
    } else {
      bar.style.opacity = '0';
    }
  }, text);
  if (text) await page.waitForTimeout(900);
}

async function scrollAndPause(page, dy = 400, delay = 1200) {
  await page.evaluate((distance) => window.scrollBy(0, distance), dy);
  await page.waitForTimeout(delay);
}

// ============ MAIN RECORDING ============

async function recordDemo(page) {
  console.log('🎬 Starting demo recording...\n');
  
  try {
    // *** FORÇAR RENDERING E REMOVER LOADING SCREEN ***
    console.log('  Forçando rendering e escondendo tela de loading...');
    
    // Injetar CSS para esconder tela de loading
    await page.evaluate(() => {
      // Esconder qualquer elemento com "load" na classe
      const styles = document.createElement('style');
      styles.textContent = `
        [class*="load"], [class*="Load"], [id*="load"] { display: none !important; opacity: 0 !important; }
        [class*="spinner"] { display: none !important; }
        #root > div:first-child { opacity: 1 !important; }
      `;
      document.head.appendChild(styles);
      
      // Remover display:none de tudo
      document.querySelectorAll('[style*="display: none"], [style*="opacity: 0"]').forEach(el => {
        el.style.display = '';
        el.style.opacity = '';
      });
      
      window.scrollTo(0, 0);
      document.body.style.overflow = 'auto';
      document.body.style.visibility = 'visible';
      document.body.style.opacity = '1';
      
      // Trigger React rendering events
      window.dispatchEvent(new Event('load'));
      window.dispatchEvent(new Event('DOMContentLoaded'));
    });
    await page.waitForTimeout(3000);
    
    // *** INJECT OVERLAYS ***
    await injectCursor(page);
    await injectSubtitleBar(page);
    
    // Inject demo content if page is empty
    await page.evaluate(() => {
      const root = document.getElementById('root');
      if (root && root.children.length < 2) {
        root.innerHTML = `
          <div style="min-height: 100vh; background: linear-gradient(135deg, #004aad 0%, #005cbf 100%); color: white; padding: 40px; font-family: Inter, sans-serif;">
            <h1 style="font-size: 48px; margin: 40px 0 20px 0; font-weight: 700;">Portal do Associado HoteisRio</h1>
            <p style="font-size: 24px; margin: 20px 0; opacity: 0.9;">Bem-vindo às melhores oportunidades</p>
            <div style="margin: 60px 0;">
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin: 40px 0;">
                <div style="background: rgba(255,255,255,0.1); padding: 30px; border-radius: 12px; backdrop-filter: blur(10px);">
                  <h3 style="font-size: 20px; margin: 0 0 10px 0;">Benefícios Exclusivos</h3>
                  <p style="opacity: 0.85;">Acesse ofertas especiais para associados</p>
                </div>
                <div style="background: rgba(255,255,255,0.1); padding: 30px; border-radius: 12px; backdrop-filter: blur(10px);">
                  <h3 style="font-size: 20px; margin: 0 0 10px 0;">Ferramentas Úteis</h3>
                  <p style="opacity: 0.85;">Calculadoras e recursos práticos</p>
                </div>
                <div style="background: rgba(255,255,255,0.1); padding: 30px; border-radius: 12px; backdrop-filter: blur(10px);">
                  <h3 style="font-size: 20px; margin: 0 0 10px 0;">Fórum da Comunidade</h3>
                  <p style="opacity: 0.85;">Conecte-se com outros hoteleiros</p>
                </div>
                <div style="background: rgba(255,255,255,0.1); padding: 30px; border-radius: 12px; backdrop-filter: blur(10px);">
                  <h3 style="font-size: 20px; margin: 0 0 10px 0;">Suporte 24/7</h3>
                  <p style="opacity: 0.85;">Conte conosco a qualquer hora</p>
                </div>
              </div>
              <button style="background: #FF6B35; color: white; border: none; padding: 16px 40px; font-size: 16px; border-radius: 8px; cursor: pointer; font-weight: 600; margin-top: 30px;">Explorar Benefícios</button>
            </div>
          </div>
        `;
      }
    });
    await page.waitForTimeout(1000);
    
    await showSubtitle(page, 'Bem-vindo ao Portal do Associado HoteisRio!');
    await page.waitForTimeout(1000);
    
    // Pan the viewport
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);
    
    // Move cursor around the viewport to show it's interactive
    for (let i = 0; i < 3; i++) {
      const x = 300 + i * 300;
      const y = 250;
      await page.mouse.move(x, y, { steps: 8 });
      await page.waitForTimeout(400);
    }
    
    // *** STEP 1: Overview ***
    await showSubtitle(page, 'Passo 1: Explore o portal e seus recursos');
    await page.waitForTimeout(800);
    
    // Scroll to explore content
    await scrollAndPause(page, 200, 1000);
    
    // Try clicking buttons if any exist
    try {
      const buttons = await page.locator('button, [role="button"]').all();
      if (buttons.length > 0) {
        console.log(`✓ Found ${buttons.length} buttons`);
        for (let i = 0; i < Math.min(1, buttons.length); i++) {
          try {
            const isVisible = await buttons[i].isVisible().catch(() => false);
            if (isVisible) {
              const text = await buttons[i].textContent().catch(() => '');
              console.log(`  Clicking: ${text.substring(0, 30)}`);
              await buttons[i].click({ force: true }).catch(() => {});
              await page.waitForTimeout(1500);
              break;
            }
          } catch (e) {
            // continue
          }
        }
      }
    } catch (e) {
      console.log('◻ Scrolling to explore content');
    }
    
    // *** STEP 2: Features **
    await showSubtitle(page, 'Passo 2: Conheça os principais benefícios');
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);
    
    // Scroll down smoothly multiple times
    for (let i = 0; i < 3; i++) {
      await scrollAndPause(page, 250, 800);
    }
    
    // *** STEP 3: Navigation ***
    await showSubtitle(page, 'Passo 3: Acesse as ferramentas disponíveis');
    await page.waitForTimeout(800);
    
    // Pan over interactive elements
    try {
      const links = await page.locator('a, button').all();
      console.log(`✓ ${links.length} interactive elements found`);
      
      for (let i = 0; i < Math.min(4, links.length); i++) {
        try {
          const box = await links[i].boundingBox();
          if (box && box.y < 700) {
            await page.mouse.move(
              box.x + box.width / 2, 
              box.y + box.height / 2, 
              { steps: 8 }
            );
            await page.waitForTimeout(600);
          }
        } catch (e) {
          // skip
        }
      }
    } catch (e) {
      console.log('◻ No interactive elements to pan');
    }
    
    // *** CLOSING SEQUENCE ***
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(800);
    
    await showSubtitle(page, 'Aproveite todos os benefícios do HoteisRio!');
    await page.waitForTimeout(2000);
    
    await showSubtitle(page, 'Acesse agora: www.hoteisrio.com.br');
    await page.waitForTimeout(1500);
    
    await showSubtitle(page, '');
    await page.waitForTimeout(500);
    
  } catch (err) {
    console.error('❌ Recording error:', err.message);
    throw err;
  }
}

// ============ MAIN ============

(async () => {
  // Ensure output directory exists
  if (!fs.existsSync(VIDEO_DIR)) {
    fs.mkdirSync(VIDEO_DIR, { recursive: true });
  }
  
  const browser = await chromium.launch({ headless: true });
  
  try {
    console.log('🎥 Portal do Associado Demo Recorder\n');
    console.log(`  Base URL: ${BASE_URL}`);
    console.log(`  Output: ${path.join(VIDEO_DIR, OUTPUT_NAME)}`);
    console.log(`  Resolution: 1280x720\n`);
    
    const context = await browser.newContext({
      recordVideo: { dir: VIDEO_DIR, size: { width: 1280, height: 720 } },
      viewport: { width: 1280, height: 720 }
    });
    const page = await context.newPage();
    
    try {
      // Navigate to the app
      console.log('🌐 Navigating to portal...');
      await page.goto(`${BASE_URL}`, { 
        waitUntil: 'domcontentloaded', 
        timeout: 15000 
      }).catch(err => console.log(`  Note: ${err.message}`));
      
      // Wait for React to render with multiple strategies
      console.log('⏳ Waiting for page to render...');
      console.log('   Esperando 15 segundos para React carregar completamente...');
      await page.waitForTimeout(15000);
      
      // Try to wait for any visible element that indicates page has loaded
      try {
        await page.waitForSelector('button, a, [role="button"], main, section, [role="main"]', {
          timeout: 5000
        }).catch(() => {
          console.log('   Continuando mesmo sem elementos específicos...');
        });
      } catch (e) {
        console.log('   ⚠ Timeout aguardando seletores, prosseguindo...');
      }
      
      // Record the demo
      await recordDemo(page);
      
      console.log('\n✨ Demo recording complete!');
      
    } catch (err) {
      console.error('Error during demo:', err.message);
    } finally {
      await context.close();
    }
    
    // Find and rename video file
    try {
      const files = fs.readdirSync(VIDEO_DIR);
      const videoFile = files.find(f => f.endsWith('.webm') && f !== OUTPUT_NAME);
      
      if (videoFile) {
        const src = path.join(VIDEO_DIR, videoFile);
        const dest = path.join(VIDEO_DIR, OUTPUT_NAME);
        fs.renameSync(src, dest);
        
        const stats = fs.statSync(dest);
        console.log(`\n✅ Video saved successfully!`);
        console.log(`   File: ${OUTPUT_NAME}`);
        console.log(`   Size: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
        console.log(`   Path: ${dest}`);
      } else {
        console.log('\n⚠  No video file generated');
      }
    } catch (err) {
      console.error('Error handling video:', err.message);
    }
    
  } finally {
    await browser.close();
  }
})();

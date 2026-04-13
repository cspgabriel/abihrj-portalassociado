'use strict';
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const BASE_URL = 'https://associados.sindhoteisrj.com.br/';
const EMAIL = 'marketing@hoteisrio.com.br';
const PASSWORD = 'sind2025';
const SCREENSHOT_DIR = path.join(__dirname, 'screenshots', 'benefits');

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

const benefits = [
  { name: 'dashboard', label: 'Dashboard Principal', selector: null, waitTime: 2000 },
  { name: 'beneficios', label: 'Todos os Benefícios', selector: 'button:has-text("Todos os Benefícios")' },
  { name: 'comercial', label: 'Ações Comerciais', selector: 'button:has-text("Ações Comerciais")' },
  { name: 'cursos', label: 'Cursos & Treinamentos', selector: 'button:has-text("Cursos")' },
  { name: 'eventos', label: 'Eventos da Associação', selector: 'button:has-text("Associação de Eventos")' },
  { name: 'forum', label: 'Fórum de Discussão', selector: 'button:has-text("Fórum")' },
  { name: 'talentbank', label: 'Talent Bank', selector: 'button:has-text("Talent Bank")' },
  { name: 'legal', label: 'Legislação', selector: 'button:has-text("Informações Legais")' },
];

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  const page = await context.newPage();

  try {
    console.log('\n📸 Capturando screenshots internos de cada benefício...\n');

    // Login
    console.log('🔐 Fazendo login...');
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page.fill('input[type="email"]', EMAIL);
    await page.fill('input[type="password"]', PASSWORD);
    await page.click('button:has-text("Entrar")');
    await page.waitForNavigation({ waitUntil: 'networkidle', timeout: 10000 }).catch(() => {});
    await page.waitForTimeout(2500);

    // Dashboard (sem clicar em nada)
    console.log('📷 Dashboard Principal...');
    await page.screenshot({ 
      path: path.join(SCREENSHOT_DIR, 'dashboard-full.png'),
      fullPage: true
    });
    console.log('   ✅ Salvo: dashboard-full.png (fullPage)');

    // Capturar cada benefício
    for (const benefit of benefits.slice(1)) {
      try {
        console.log(`📷 ${benefit.label}...`);
        
        const btn = page.locator(benefit.selector).first();
        await btn.scrollIntoViewIfNeeded();
        await page.waitForTimeout(300);

        if (await btn.isVisible().catch(() => false)) {
          await btn.click();
          
          // Esperar a página carregar
          await page.waitForLoadState('networkidle').catch(() => {});
          await page.waitForTimeout(benefit.waitTime || 2000);

          // Screenshot fullpage para capturar todo o conteúdo
          await page.screenshot({
            path: path.join(SCREENSHOT_DIR, `${benefit.name}-full.png`),
            fullPage: true
          });

          // Screenshot viewport para usar na landing page
          await page.screenshot({
            path: path.join(SCREENSHOT_DIR, `${benefit.name}-viewport.png`),
            fullPage: false
          });

          console.log(`   ✅ Salvo: ${benefit.name}-full.png e ${benefit.name}-viewport.png`);
          
          // Voltar ao dashboard
          await page.goBack();
          await page.waitForTimeout(1500);
        } else {
          console.warn(`   ⚠️  ${benefit.label} não está visível`);
        }
      } catch (err) {
        console.warn(`   ⚠️  Erro ao capturar ${benefit.name}: ${err.message}`);
      }
    }

    console.log('\n✅ Screenshots capturados com sucesso!\n');
    console.log('📁 Localização: ./screenshots/benefits/\n');
    console.log('📊 Arquivos criados:');
    const files = fs.readdirSync(SCREENSHOT_DIR);
    files.forEach(f => {
      const size = (fs.statSync(path.join(SCREENSHOT_DIR, f)).size / 1024).toFixed(0);
      console.log(`   • ${f} (${size} KB)`);
    });
    console.log();

  } catch (err) {
    console.error('❌ Erro:', err.message);
  } finally {
    await context.close();
    await browser.close();
  }
})();

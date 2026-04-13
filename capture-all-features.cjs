'use strict';
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const BASE_URL = 'https://associados.sindhoteisrj.com.br/';
const EMAIL = 'marketing@hoteisrio.com.br';
const PASSWORD = 'sind2025';
const SCREENSHOT_DIR = path.join(__dirname, 'screenshots', 'features');

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

const features = [
  { name: 'dashboard', label: 'Dashboard Principal', selector: 'button:has-text("Bem-vindo")' },
  { name: 'beneficios', label: 'Todos os Benefícios', selector: 'button:has-text("Todos os Benefícios")' },
  { name: 'comercial', label: 'Ações Comerciais', selector: 'button:has-text("Ações Comerciais")' },
  { name: 'cursos', label: 'Cursos & Treinamentos', selector: 'button:has-text("Cursos")' },
  { name: 'eventos', label: 'Eventos da Associação', selector: 'button:has-text("Associação de Eventos")' },
  { name: 'forum', label: 'Fórum de Discussão', selector: 'button:has-text("Fórum")' },
  { name: 'talentbank', label: 'Talent Bank', selector: 'button:has-text("Talent Bank")' },
  { name: 'legal', label: 'Informações Legais', selector: 'button:has-text("Informações Legais")' },
];

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  const page = await context.newPage();

  try {
    console.log('\n📸 Capturando screenshots de todas as funcionalidades...\n');

    // Login
    console.log('🔐 Fazendo login...');
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page.fill('input[type="email"]', EMAIL);
    await page.fill('input[type="password"]', PASSWORD);
    await page.click('button:has-text("Entrar")');
    await page.waitForNavigation({ waitUntil: 'networkidle', timeout: 10000 }).catch(() => {});
    await page.waitForTimeout(2000);

    // Capturar dashboard principal
    console.log('📷 Dashboard Principal...');
    await page.screenshot({ 
      path: path.join(SCREENSHOT_DIR, 'dashboard.png'),
      fullPage: false
    });
    console.log('   ✅ Salvo: dashboard.png');

    // Capturar cada funcionalidade
    for (const feature of features.slice(1)) {
      try {
        console.log(`📷 ${feature.label}...`);
        
        // Scroll até encontrar o botão
        const btn = page.locator(feature.selector).first();
        await btn.scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);

        if (await btn.isVisible().catch(() => false)) {
          await btn.click();
          await page.waitForTimeout(2000);
          await page.waitForNavigation({ waitUntil: 'networkidle', timeout: 5000 }).catch(() => {});
          await page.waitForTimeout(1500);

          await page.screenshot({
            path: path.join(SCREENSHOT_DIR, `${feature.name}.png`),
            fullPage: false
          });

          console.log(`   ✅ Salvo: ${feature.name}.png`);
          
          // Voltar ao dashboard
          await page.goBack();
          await page.waitForTimeout(1500);
        } else {
          console.warn(`   ⚠️  ${feature.label} não está visível`);
        }
      } catch (err) {
        console.warn(`   ⚠️  Erro ao capturar ${feature.name}: ${err.message}`);
      }
    }

    console.log('\n✅ Screenshots capturados com sucesso!\n');
    console.log('📁 Localização: ./screenshots/features/\n');

  } catch (err) {
    console.error('❌ Erro:', err.message);
  } finally {
    await context.close();
    await browser.close();
  }
})();

'use strict';
const { chromium } = require('playwright');

const BASE_URL = 'https://associados.sindhoteisrj.com.br/';
const EMAIL = 'marketing@hoteisrio.com.br';
const PASSWORD = 'sind2025';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  const page = await context.newPage();

  try {
    console.log('\n========== EXPLORAÇÃO: PORTAL AUTENTICADO ==========\n');
    
    // Login
    console.log('📍 Acessando página de login...');
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1500);

    console.log('📋 Fazendo login...');
    await page.fill('input[type="email"]', EMAIL);
    await page.waitForTimeout(300);
    await page.fill('input[type="password"]', PASSWORD);
    await page.waitForTimeout(300);

    await page.click('button:has-text("Entrar")');
    console.log('⏳ Aguardando redirecionamento...');
    await page.waitForNavigation({ waitUntil: 'networkidle', timeout: 10000 }).catch(() => {
      console.log('⚠️  Timeout na navegação, continuando...');
    });
    await page.waitForTimeout(2000);

    console.log(`\n📄 URL atual: ${page.url()}`);
    console.log('✅ Autenticação concluída!\n');

    // Explorar estrutura da página autenticada
    await dumpPageStructure(page, 'DASHBOARD POST-LOGIN');

    // Explorar menu/navegação
    console.log('\n\n========== EXPLORANDO NAVEGAÇÃO ==========\n');
    await exploreNavigation(page);

    // Tirar screenshot para referência
    console.log('\n\n========== SALVANDO SCREENSHOT ==========\n');
    const screenshotPath = './screenshots/authenticated-dashboard.png';
    await page.screenshot({ path: screenshotPath, fullPage: false });
    console.log(`✓ Screenshot salvo: ${screenshotPath}`);

    // Print de informações úteis para scripting
    console.log('\n\n========== INFORMAÇÕES PARA SCRIPTING ==========\n');
    const pageInfo = await page.evaluate(() => {
      const info = {
        title: document.title,
        url: window.location.href,
        userName: null,
        mainContent: null,
      };

      // Procurar nome do usuário
      const userElements = document.querySelectorAll('[class*="user"], [class*="profile"], [class*="nombre"], [class*="name"]');
      for (let el of userElements) {
        const text = el.textContent?.trim();
        if (text && text.length > 0 && text.length < 100) {
          info.userName = text;
          break;
        }
      }

      // Procurar conteúdo principal
      const mainElements = document.querySelectorAll('main, [role="main"], .main-content, .dashboard');
      if (mainElements.length > 0) {
        info.mainContent = mainElements[0].querySelector('h1, h2, .title, .heading')?.textContent?.trim();
      }

      return info;
    });

    console.log(`Título: ${pageInfo.title}`);
    console.log(`URL: ${pageInfo.url}`);
    if (pageInfo.userName) console.log(`Usuário: ${pageInfo.userName}`);
    if (pageInfo.mainContent) console.log(`Conteúdo Principal: ${pageInfo.mainContent}`);

    console.log('\n✅ Exploração concluída! Navegador permanecerá aberto...');
    console.log('Feche o navegador quando terminar de explorar.\n');

  } catch (err) {
    console.error('❌ ERRO:', err.message);
  }
})();

async function dumpPageStructure(page, pageTitle) {
  const structure = await page.evaluate(() => {
    const data = {
      headings: [],
      buttons: [],
      links: [],
      cards: [],
      tables: [],
      forms: [],
    };

    // Headings
    document.querySelectorAll('h1, h2, h3, h4, h5').forEach(h => {
      if (h.offsetParent !== null) {
        const text = h.textContent?.trim().substring(0, 60);
        if (text && text.length > 0) {
          data.headings.push(`${h.tagName}: ${text}`);
        }
      }
    });

    // Buttons
    document.querySelectorAll('button').forEach(btn => {
      if (btn.offsetParent !== null) {
        const text = btn.textContent?.trim().substring(0, 50);
        if (text && text.length > 0) {
          data.buttons.push(text);
        }
      }
    });

    // Links
    document.querySelectorAll('a').forEach(link => {
      if (link.offsetParent !== null) {
        const text = link.textContent?.trim().substring(0, 50);
        if (text && text.length > 0) {
          data.links.push(text);
        }
      }
    });

    // Cards/Containers principais
    document.querySelectorAll('[class*="card"], [class*="tile"], [class*="box"]').forEach(card => {
      if (card.offsetParent !== null) {
        const text = card.querySelector('h3, h4, .title, .heading')?.textContent?.trim();
        if (text) {
          data.cards.push(text.substring(0, 50));
        }
      }
    });

    // Tables
    document.querySelectorAll('table').forEach(table => {
      if (table.offsetParent !== null) {
        const headers = Array.from(table.querySelectorAll('th')).map(th => th.textContent?.trim());
        data.tables.push({ headers });
      }
    });

    // Forms
    document.querySelectorAll('form').forEach(form => {
      if (form.offsetParent !== null) {
        const inputs = form.querySelectorAll('input, select, textarea').length;
        const submitBtn = form.querySelector('button[type="submit"]');
        data.forms.push({
          fields: inputs,
          submitText: submitBtn?.textContent?.trim() || 'Submit'
        });
      }
    });

    return data;
  });

  console.log(`\n📄 ${pageTitle}`);
  console.log(`${'='.repeat(60)}\n`);

  if (structure.headings.length > 0) {
    console.log(`📌 HEADINGS (${structure.headings.length}):`);
    structure.headings.slice(0, 10).forEach(h => console.log(`  ▪ ${h}`));
  }

  if (structure.cards.length > 0) {
    console.log(`\n🎴 CARDS/TILES (${structure.cards.length}):`);
    structure.cards.slice(0, 10).forEach(c => console.log(`  ▪ ${c}`));
  }

  if (structure.buttons.length > 0) {
    console.log(`\n🔘 BUTTONS (${structure.buttons.length}):`);
    structure.buttons.slice(0, 12).forEach(b => console.log(`  ▪ ${b}`));
  }

  if (structure.links.length > 0) {
    console.log(`\n🔗 LINKS (${structure.links.length}):`);
    structure.links.slice(0, 10).forEach(l => console.log(`  ▪ ${l}`));
  }

  if (structure.tables.length > 0) {
    console.log(`\n📊 TABLES (${structure.tables.length}):`);
    structure.tables.forEach(t => {
      console.log(`  ▪ Colunas: ${t.headers.join(', ')}`);
    });
  }

  if (structure.forms.length > 0) {
    console.log(`\n📝 FORMS (${structure.forms.length}):`);
    structure.forms.forEach((f, i) => {
      console.log(`  ▪ Form ${i + 1}: ${f.fields} campos | Submit: "${f.submitText}"`);
    });
  }
}

async function exploreNavigation(page) {
  const navItems = await page.evaluate(() => {
    const items = [];

    // Procurar navbar
    const navbar = document.querySelector('nav, [role="navigation"], .navbar, .menu');
    if (!navbar) return items;

    navbar.querySelectorAll('a, button').forEach(el => {
      if (el.offsetParent !== null) {
        const text = el.textContent?.trim();
        const href = el.getAttribute('href');
        const onclick = el.getAttribute('onclick');
        
        if (text && text.length > 0) {
          items.push({
            text,
            href: href || onclick || 'action',
            isButton: el.tagName === 'BUTTON'
          });
        }
      }
    });

    return items;
  });

  if (navItems.length > 0) {
    console.log('🧭 Itens de Navegação:');
    navItems.forEach(item => {
      const icon = item.isButton ? '🔘' : '🔗';
      console.log(`  ${icon} ${item.text}`);
    });
  } else {
    console.log('⚠️  Nenhum item de navegação encontrado');
  }
}

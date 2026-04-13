'use strict';
const { chromium } = require('playwright');

const BASE_URL = 'https://associados.sindhoteisrj.com.br/';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  const page = await context.newPage();

  try {
    console.log('\n========== DESCOBERTA PORTAL HOTÉIS RIO ==========\n');
    
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    console.log('📍 Página: HOME');
    await dumpElements(page);

    // Explorar navegação
    console.log('\n\n========== EXPLORANDO NAVEGAÇÃO ==========\n');
    
    const menuItems = await page.evaluate(() => {
      const items = [];
      // Procurar links de navegação
      document.querySelectorAll('nav a, [role="navigation"] a, .menu a, button[aria-label*="menu"], button[aria-label*="Menu"]').forEach(el => {
        if (el.offsetParent !== null) {
          items.push({
            tag: el.tagName,
            text: el.textContent?.trim().substring(0, 50),
            href: el.href || el.getAttribute('onclick') || 'button',
            ariaLabel: el.getAttribute('aria-label'),
          });
        }
      });
      return items;
    });

    console.log('Menu items encontrados:');
    menuItems.forEach(item => {
      console.log(`  - ${item.text} (${item.tag})`);
    });

  } catch (err) {
    console.error('ERRO:', err.message);
  } finally {
    console.log('\n\n========== CLOSE BROWSER QUANDO TERMINAR ==========');
    console.log('Navegar e explorar o site. Após terminar, feche o navegador.\n');
    // Manter aberto para exploração manual
    await browser.waitForClose();
  }
})();

async function dumpElements(page) {
  const elements = await page.evaluate(() => {
    const els = {
      forms: [],
      buttons: [],
      links: [],
      inputs: [],
      selects: [],
      other: []
    };

    document.querySelectorAll('form, input, select, button, a, [contenteditable], textarea').forEach(el => {
      if (el.offsetParent === null) return; // hidden

      const info = {
        tag: el.tagName.toLowerCase(),
        type: el.type || '',
        name: el.name || '',
        id: el.id || '',
        class: el.className || '',
        placeholder: el.placeholder || '',
        text: el.textContent?.trim().substring(0, 60) || '',
        ariaLabel: el.getAttribute('aria-label') || '',
        role: el.getAttribute('role') || '',
      };

      if (el.tagName === 'FORM') {
        els.forms.push(info);
      } else if (el.tagName === 'BUTTON') {
        els.buttons.push(info);
      } else if (el.tagName === 'A') {
        els.links.push({ ...info, href: el.href || '' });
      } else if (el.tagName === 'INPUT') {
        els.inputs.push(info);
      } else if (el.tagName === 'SELECT') {
        const options = Array.from(el.options || []).map(o => ({ text: o.text, value: o.value }));
        els.selects.push({ ...info, options });
      } else {
        els.other.push(info);
      }
    });

    return els;
  });

  console.log('\n📋 Elementos encontrados:');
  console.log('\nForms:', elements.forms.length);
  elements.forms.forEach(f => console.log(`  - ${f.id || f.name || '(unnamed)'}`));
  
  console.log('\nButtons:', elements.buttons.length);
  elements.buttons.slice(0, 15).forEach(b => console.log(`  - ${b.text || b.ariaLabel || '(unlabeled)'}`));
  
  console.log('\nLinks:', elements.links.length);
  elements.links.slice(0, 10).forEach(l => console.log(`  - ${l.text || l.ariaLabel || '(no text)'}`));
  
  console.log('\nInputs:', elements.inputs.length);
  elements.inputs.forEach(i => console.log(`  - ${i.type} (${i.placeholder || i.name || 'unknown'})`));
  
  console.log('\nSelects:', elements.selects.length);
  elements.selects.forEach(s => console.log(`  - ${s.name}: ${s.options.length} options`));
}

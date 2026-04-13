'use strict';
const { chromium } = require('playwright');

const BASE_URL = 'https://associados.sindhoteisrj.com.br/';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  const page = await context.newPage();

  try {
    console.log('\n========== DESCOBERTA: PORTAL HOTÉIS RIO ==========\n');
    
    // Página 1: Login
    console.log('\n📍 PÁGINA 1: HOME (LOGIN)');
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1500);
    
    await dumpPageStructure(page, 'HOME');

    // Procurar pelo link de cadastro
    console.log('\n>>> Procurando link de cadastro...');
    const cadastroLink = await page.locator('"Cadastre-se"').or(page.locator('text=/cadastro/i')).first();
    if (await cadastroLink.isVisible().catch(() => false)) {
      console.log('✓ Link de cadastro encontrado');
      const href = await cadastroLink.getAttribute('href').catch(() => null);
      if (href) console.log(`  URL: ${href}`);
    }

    // Procurar pelo link "Conheça nossos benefícios"
    console.log('\n>>> Procurando link de benefícios...');
    const benefitsLink = await page.locator('"Conheça nossos benefícios"').first();
    if (await benefitsLink.isVisible().catch(() => false)) {
      console.log('✓ Link de benefícios encontrado');
      const href = await benefitsLink.getAttribute('href').catch(() => null);
      if (href) console.log(`  URL: ${href}`);
      // Tentar acessar
      try {
        await Promise.race([
          benefitsLink.click(),
          page.waitForTimeout(3000)
        ]);
        await page.waitForTimeout(1500);
        console.log('\n📍 PÁGINA 2: BENEFÍCIOS');
        await dumpPageStructure(page, 'BENEFÍCIOS');
        await page.goBack();
        await page.waitForTimeout(1000);
      } catch (e) {
        console.log('⚠ Não conseguiu clicar no link de benefícios');
      }
    }

    // Volta para home
    await page.goto(BASE_URL);
    await page.waitForTimeout(1500);

    // Verificar se existe link de "Esqueceu a senha"
    console.log('\n>>> Procurando modal de recuperação de senha...');
    const esqueceuLink = await page.locator('"Esqueceu a senha?"').first();
    if (await esqueceuLink.isVisible().catch(() => false)) {
      console.log('✓ Link "Esqueceu a senha?" encontrado');
      try {
        await esqueceuLink.click();
        await page.waitForTimeout(1500);
        console.log('\n📍 MODAL: RECUPERAÇÃO DE SENHA');
        await dumpPageStructure(page, 'RECUPERAÇÃO');
      } catch (e) {
        console.log('⚠ Erro ao clicar');
      }
    }

    // Resumo
    console.log('\n\n========== RESUMO DA DESCOBERTA ==========');
    console.log(`✓ URL Home: ${BASE_URL}`);
    console.log('✓ Principais seções encontradas');
    console.log('\n⏹️  PRÓXIMOS PASSOS:');
    console.log('1. Usar credenciais para fazer login completo');
    console.log('2. Explorar dashboard pós-autenticação');
    console.log('3. Testar cada funcionalidade');

  } catch (err) {
    console.error('ERRO:', err.message);
  } finally {
    // Manter aberto por 10 segundos antes de fechar
    await page.waitForTimeout(3000);
    await browser.close();
  }
})();

async function dumpPageStructure(page, pageTitle) {
  const structure = await page.evaluate(() => {
    const data = {
      title: document.title,
      headings: [],
      buttons: [],
      inputs: [],
      sections: [],
      links: []
    };

    // Headings
    document.querySelectorAll('h1, h2, h3, h4').forEach(h => {
      if (h.offsetParent !== null) {
        data.headings.push(`${h.tagName}: ${h.textContent?.trim().substring(0, 60)}`);
      }
    });

    // Buttons
    document.querySelectorAll('button').forEach(btn => {
      if (btn.offsetParent !== null) {
        data.buttons.push(btn.textContent?.trim().substring(0, 50) || '(no text)');
      }
    });

    // Inputs
    document.querySelectorAll('input, select, textarea').forEach(inp => {
      if (inp.offsetParent !== null) {
        data.inputs.push({
          type: inp.type || inp.tagName,
          placeholder: inp.placeholder || inp.name || '?'
        });
      }
    });

    // Links
    document.querySelectorAll('a').forEach(link => {
      if (link.offsetParent !== null && link.href) {
        const text = link.textContent?.trim();
        if (text && text.length > 0) {
          data.links.push(`${text.substring(0, 40)} → ${link.href.substring(link.href.length - 40)}`);
        }
      }
    });

    // Seções/Containers
    document.querySelectorAll('[class*="section"], [class*="card"], [class*="container"], [class*="main"]').forEach(sec => {
      if (sec.offsetParent !== null && sec.children.length > 0) {
        const text = sec.textContent?.trim().substring(0, 40);
        if (text) data.sections.push(text);
      }
    });

    return data;
  });

  console.log(`\n  📄 Título: ${structure.title}`);
  
  if (structure.headings.length > 0) {
    console.log(`\n  📌 Headings (${structure.headings.length}):`);
    structure.headings.slice(0, 5).forEach(h => console.log(`    - ${h}`));
  }

  if (structure.buttons.length > 0) {
    console.log(`\n  🔘 Buttons (${structure.buttons.length}):`);
    structure.buttons.slice(0, 8).forEach(b => console.log(`    - ${b}`));
  }

  if (structure.inputs.length > 0) {
    console.log(`\n  ⌨️  Inputs (${structure.inputs.length}):`);
    structure.inputs.slice(0, 6).forEach(i => console.log(`    - ${i.type}: ${i.placeholder}`));
  }

  if (structure.links.length > 0) {
    console.log(`\n  🔗 Links (${structure.links.length}):`);
    structure.links.slice(0, 5).forEach(l => console.log(`    - ${l}`));
  }
}

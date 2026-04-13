const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const BASE_URL = 'https://associados.sindhoteisrj.com.br/';
const EMAIL = 'marketing@hoteisrio.com.br';
const PASSWORD = 'sind2025';
const VIDEO_DIR = path.join(__dirname, 'public', 'screenshots');

if (!fs.existsSync(VIDEO_DIR)) {
  fs.mkdirSync(VIDEO_DIR, { recursive: true });
}

(async () => {
  console.log('🎬 Iniciando gravação do tutorial do Portal...');
  
  // Launch browser
  const browser = await chromium.launch({ headless: true });
  
  // Create context with video recording enabled
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    recordVideo: {
      dir: VIDEO_DIR,
      size: { width: 1920, height: 1080 }
    }
  });

  const page = await context.newPage();

  try {
    // 1. Login
    console.log('1. Acessando a página de login...');
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000); // mostrar tela inicial

    console.log('   Preenchendo credenciais...');
    await page.type('input[type="email"]', EMAIL, { delay: 50 });
    await page.type('input[type="password"]', PASSWORD, { delay: 50 });
    await page.waitForTimeout(500);
    
    await page.click('button:has-text("Entrar")');
    await page.waitForNavigation({ waitUntil: 'networkidle' }).catch(() => {});
    await page.waitForTimeout(2000); // mostrar carregamento e chegada
    
    console.log('2. Dashboard Principal alcançado.');
    await page.mouse.wheel(0, 400); // scroll
    await page.waitForTimeout(1000);
    await page.mouse.wheel(0, -400);
    await page.waitForTimeout(1000);

    // List of benefits to click to simulate a user tutorial
    const actions = [
      { label: 'Ações Comerciais', text: 'Ações Comerciais', scroll: 600 },
      { label: 'Cursos', text: 'Cursos', scroll: 500 },
      { label: 'Assessoria Jurídica', text: 'Informações Legais', scroll: 300 }, // Legal is probably named that way or "Assessoria", let's use common selector that worked before
      { label: 'Banco de Talentos', text: 'Talent Bank', scroll: 600 }
    ];

    for (const action of actions) {
      console.log(`3. Demonstrando: ${action.label}`);
      // Find button
      const btn = page.locator(`button:has-text("${action.text}")`).first();
      
      if (await btn.isVisible().catch(() => false)) {
        // simulate hover
        await btn.hover();
        await page.waitForTimeout(500);
        await btn.click();
        
        await page.waitForLoadState('networkidle').catch(() => {});
        await page.waitForTimeout(1500); // wait content to render

        // Scroll simulation
        await page.mouse.wheel(0, action.scroll);
        await page.waitForTimeout(1500);
        await page.mouse.wheel(0, -action.scroll);
        await page.waitForTimeout(1000);

        // Go back
        await page.goBack();
        await page.waitForTimeout(1000);
      } else {
        console.log(`   [Pulo] Botão não encontrado para: ${action.text}`);
      }
    }

    console.log('🎬 Gravação concluída. Fechando navegador...');

  } catch (err) {
    console.error('❌ Erro durante o tutorial:', err.message);
  } finally {
    // Close page to save video
    await page.close();
    await context.close();
    await browser.close();

    // Rename the newest webm file in the folder
    const files = fs.readdirSync(VIDEO_DIR);
    const videoFiles = files.filter(f => f.endsWith('.webm'));
    
    if (videoFiles.length > 0) {
      // get the most recently created webm
      videoFiles.sort((a, b) => {
        return fs.statSync(path.join(VIDEO_DIR, b)).mtime.getTime() - 
               fs.statSync(path.join(VIDEO_DIR, a)).mtime.getTime();
      });
      
      const latestVideo = path.join(VIDEO_DIR, videoFiles[0]);
      const finalName = path.join(VIDEO_DIR, 'tutorial_hoteisrio.webm');
      
      if (fs.existsSync(finalName)) {
        fs.unlinkSync(finalName);
      }
      fs.renameSync(latestVideo, finalName);
      console.log(`✅ Vídeo tutorial salvo com sucesso em: public/screenshots/tutorial_hoteisrio.webm`);
    }
  }
})();

#!/usr/bin/env node

const { spawn } = require('child_process');
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const http = require('http');

console.log('🚀 Iniciando captura de screenshots dos módulos reais...\n');

// Caminho do projeto
const projectDir = __dirname;
const screenshotsDir = path.join(projectDir, 'screenshots', 'modules');

// Criar diretório se não existir
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

// Função para esperar o servidor ficar pronto
function waitForServer(port, maxAttempts = 60) {
  return new Promise((resolve, reject) => {
    let attempts = 0;
    const interval = setInterval(() => {
      const req = http.get(`http://localhost:${port}`, (res) => {
        clearInterval(interval);
        resolve(true);
      });
      req.on('error', () => {
        attempts++;
        console.log(`  Tentativa ${attempts}/60...`);
        if (attempts >= maxAttempts) {
          clearInterval(interval);
          reject(new Error('Servidor não respondeu a tempo'));
        }
      });
    }, 1000);
  });
}

(async () => {
  let devProcess;
  let browser;

  try {
    // Iniciar dev server
    console.log('⚙️  Iniciando servidor de desenvolvimento...');
    const isWindows = process.platform === 'win32';
    const npmCmd = isWindows ? 'npm.cmd' : 'npm';
    devProcess = spawn(npmCmd, ['run', 'dev'], { 
      cwd: projectDir,
      stdio: ['pipe', 'pipe', 'pipe'],
      shell: isWindows
    });

    // Capture output for debugging
    devProcess.stdout.on('data', (data) => {
      const output = data.toString();
      console.log(`  [DEV] ${output.trim()}`);
    });

    devProcess.stderr.on('data', (data) => {
      const output = data.toString();
      console.log(`  [DEV] ${output.trim()}`);
    });

    // Aguardar servidor ficar pronto
    await waitForServer(5173);
    console.log('✅ Servidor pronto!\n');

    // Aguardar mais um pouco para garantir que está totalmente carregado
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Iniciar browser
    browser = await chromium.launch();
    const page = await browser.newPage();

    // Módulos para capturar (rotas/sections)
    const modules = [
      { 
        name: 'Dashboard', 
        path: '/#/',
        description: 'Painel principal com widgets e acesso rápido'
      },
      { 
        name: 'Benefícios Exclusivos', 
        path: '/#/all-benefits',
        description: 'Visualizar todos os benefícios disponíveis'
      },
      { 
        name: 'Ações Comerciais', 
        path: '/#/commercial-actions',
        description: 'Gerenciar ações e investimentos'
      },
      { 
        name: 'Cursos e Treinamentos', 
        path: '/#/courses',
        description: 'Acessar programas de desenvolvimento'
      },
      { 
        name: 'Eventos da Associação', 
        path: '/#/events',
        description: 'Conferir eventos e networking'
      },
      { 
        name: 'Fórum de Discussão', 
        path: '/#/forum',
        description: 'Participar de discussões comunitárias'
      },
      { 
        name: 'Talent Bank', 
        path: '/#/talent-bank',
        description: 'Explorar oportunidades de carreira'
      },
      { 
        name: 'Legislação & Normas', 
        path: '/#/laws-regulation',
        description: 'Consultar legislações aplicáveis'
      },
      { 
        name: 'Galeria de Fotos', 
        path: '/#/photo-gallery',
        description: 'Ver galeria de eventos e atividades'
      },
      { 
        name: 'Contatos e Suporte', 
        path: '/#/contacts',
        description: 'Informações de suporte e contato'
      }
    ];

    console.log(`📸 Capturando ${modules.length} módulos do portal...\n`);

    for (const module of modules) {
      try {
        const url = `http://localhost:5173${module.path}`;
        console.log(`📄 ${module.name}...`);
        
        await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
        
        // Aguardar um pouco para animações carregarem
        await page.waitForTimeout(1500);

        // Screenshot viewport
        const viewportPath = path.join(
          screenshotsDir, 
          `${module.name.toLowerCase().replace(/\s+/g, '-')}-viewport.png`
        );
        await page.screenshot({ path: viewportPath });
        
        // Screenshot full-page
        const fullPath = path.join(
          screenshotsDir, 
          `${module.name.toLowerCase().replace(/\s+/g, '-')}-full.png`
        );
        await page.screenshot({ path: fullPath, fullPage: true });

        const vpSize = fs.statSync(viewportPath).size;
        const fpSize = fs.statSync(fullPath).size;
        console.log(`  ✅ Capturado (${vpSize} bytes)\n`);

      } catch (err) {
        console.log(`  ⚠️  Erro: ${err.message}\n`);
      }
    }

    await browser.close();

    // Listar arquivos criados
    const files = fs.readdirSync(screenshotsDir);
    console.log(`\n✨ Captura concluída!`);
    console.log(`📁 ${files.length} arquivos em: screenshots/modules/`);

  } catch (error) {
    console.error('❌ Erro:', error.message);
  } finally {
    // Encerrar dev process
    if (devProcess) {
      console.log('\n🛑 Encerrando servidor...');
      devProcess.kill();
    }
  }
})();

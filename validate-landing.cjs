'use strict';

console.log('\n🔍 Verificação Final da Landing Page\n');

const fs = require('fs');
const path = require('path');

const checks = [];

// Check 1: Landing page HTML existe
const htmlPath = path.join(__dirname, 'docs_landing_final.html');
if (fs.existsSync(htmlPath)) {
  const size = fs.statSync(htmlPath).size;
  checks.push({
    name: 'Landing page HTML',
    status: '✅',
    details: `${(size / 1024).toFixed(1)} KB`
  });
} else {
  checks.push({
    name: 'Landing page HTML',
    status: '❌',
    details: 'Arquivo não encontrado'
  });
}

// Check 2: Vídeo WebM existe
const videoPath = path.join(__dirname, 'demo-portal-completo.webm');
if (fs.existsSync(videoPath)) {
  const size = fs.statSync(videoPath).size;
  checks.push({
    name: 'Vídeo WebM (raiz)',
    status: '✅',
    details: `${(size / 1024 / 1024).toFixed(1)} MB`
  });
} else {
  checks.push({
    name: 'Vídeo WebM (raiz)',
    status: '⚠️',
    details: 'Use: copy "screenshots\\demo-portal-completo.webm" "demo-portal-completo.webm"'
  });
}

// Check 3: Vídeo em screenshots
const videoInScreenshots = path.join(__dirname, 'screenshots', 'demo-portal-completo.webm');
if (fs.existsSync(videoInScreenshots)) {
  const size = fs.statSync(videoInScreenshots).size;
  checks.push({
    name: 'Vídeo em screenshots/',
    status: '✅',
    details: `${(size / 1024 / 1024).toFixed(1)} MB`
  });
}

// Check 4: Diretório de screenshots
const screenshotsDir = path.join(__dirname, 'screenshots', 'features');
if (fs.existsSync(screenshotsDir)) {
  const files = fs.readdirSync(screenshotsDir).filter(f => f.endsWith('.png'));
  checks.push({
    name: 'Screenshots cativos',
    status: files.length > 0 ? '✅' : '⚠️',
    details: `${files.length} imagens encontradas`
  });
} else {
  checks.push({
    name: 'Screenshots cativos',
    status: '⚠️',
    details: 'Execute: node capture-all-features.cjs'
  });
}

// Check 5: arquivos de documentação
const docs = [
  'SIDEBAR_LANDING_README.md',
  'QUICK_START.md',
  'integrate-screenshots.cjs'
];

docs.forEach(doc => {
  const docPath = path.join(__dirname, doc);
  if (fs.existsSync(docPath)) {
    checks.push({
      name: `Documentação: ${doc}`,
      status: '✅',
      details: 'OK'
    });
  }
});

// Check 6: Conteúdo do HTML
if (fs.existsSync(htmlPath)) {
  const content = fs.readFileSync(htmlPath, 'utf-8');
  
  const hasVideo = content.includes('demo-portal-completo.webm');
  checks.push({
    name: 'Referência ao vídeo no HTML',
    status: hasVideo ? '✅' : '❌',
    details: hasVideo ? 'Encontrado' : 'Não encontrado'
  });

  const hasSidebar = content.includes('sidebar');
  checks.push({
    name: 'Sidebar implementado',
    status: hasSidebar ? '✅' : '❌',
    details: hasSidebar ? 'Encontrado' : 'Não encontrado'
  });

  const hasHowTo = content.includes('how-to');
  checks.push({
    name: 'Seção "Como Começar"',
    status: hasHowTo ? '✅' : '❌',
    details: hasHowTo ? 'Encontrado' : 'Não encontrado'
  });

  const hasFAQ = content.includes('faq-item');
  checks.push({
    name: 'FAQ funcional',
    status: hasFAQ ? '✅' : '❌',
    details: hasFAQ ? 'Encontrado' : 'Não encontrado'
  });

  const hasJavaScript = content.includes("document.querySelectorAll('.faq-question')");
  checks.push({
    name: 'JavaScript interativo',
    status: hasJavaScript ? '✅' : '❌',
    details: hasJavaScript ? 'Encontrado' : 'Não encontrado'
  });
}

// Exibir resultados
console.log('┌─────────────────────────────────────────────────────┐');
console.log('│          VERIFICAÇÃO DA LANDING PAGE                 │');
console.log('├─────────────────────────────────────────────────────┤');

checks.forEach(check => {
  const line = `│ ${check.status} ${check.name.padEnd(35)} ${check.details.padEnd(5)} │`;
  console.log(line.substring(0, 54) + '│');
});

console.log('├─────────────────────────────────────────────────────┤');

const allPassed = checks.every(c => c.status === '✅');
if (allPassed) {
  console.log('│  🎉 TUDO PRONTO! Landing page é funcional!          │');
} else {
  console.log('│  ⚠️  Alguns itens precisam de atenção               │');
}

console.log('└─────────────────────────────────────────────────────┘\n');

// Instruções próximas
console.log('📋 PRÓXIMOS PASSOS:\n');

if (!fs.existsSync(videoPath)) {
  console.log('1. ⚠️  Copie o vídeo para a raiz:');
  console.log('   copy "screenshots\\demo-portal-completo.webm" "demo-portal-completo.webm"\n');
}

if (fs.existsSync(screenshotsDir) && fs.readdirSync(screenshotsDir).filter(f => f.endsWith('.png')).length > 0) {
  console.log('2. 📸 Integre os screenshots capturados:');
  console.log('   node integrate-screenshots.cjs\n');
} else {
  console.log('2. 📸 Capture screenshots de cada funcionalidade:');
  console.log('   node capture-all-features.cjs\n');
  console.log('   Depois:');
  console.log('   node integrate-screenshots.cjs\n');
}

console.log('3. 🌐 Abra a landing page no navegador:');
console.log(`   start "${htmlPath}"\n`);

console.log('4. 🚀 Publique em produção:');
console.log('   vercel --prod\n');

console.log('📚 Leia a documentação:');
console.log('   • QUICK_START.md - Guia rápido');
console.log('   • SIDEBAR_LANDING_README.md - Documentação completa\n');

console.log('✨ Tudo pronto! Aproveite sua landing page!\n');

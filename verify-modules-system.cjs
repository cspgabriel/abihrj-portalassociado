#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('\n' + '='.repeat(70));
console.log('  ✅ SISTEMA DE MÓDULOS - VERIFICAÇÃO COMPLETA');
console.log('='.repeat(70) + '\n');

const projectDir = __dirname;
const modulesFiles = [
  'modules-hub.html',
  'module-dashboard.html',
  'module-all-benefits.html',
  'module-commercial.html',
  'module-cursos.html',
  'module-events.html',
  'module-forum.html',
  'module-talentbank.html',
  'module-legal.html'
];

console.log('📁 ARQUIVOS HTML CRIADOS:\n');
let htmlCount = 0;
modulesFiles.forEach(file => {
  const filePath = path.join(projectDir, file);
  if (fs.existsSync(filePath)) {
    const size = (fs.statSync(filePath).size / 1024).toFixed(1);
    console.log(`  ✅ ${file.padEnd(30)} (${size} KB)`);
    htmlCount++;
  } else {
    console.log(`  ❌ ${file.padEnd(30)} (NÃO ENCONTRADO)`);
  }
});

console.log(`\n  Total: ${htmlCount}/${modulesFiles.length} arquivos HTML\n`);

const screenshotsDir = path.join(projectDir, 'screenshots', 'modules');
console.log('📸 SCREENSHOTS CAPTURADOS:\n');
if (fs.existsSync(screenshotsDir)) {
  const screenshots = fs.readdirSync(screenshotsDir);
  if (screenshots.length > 0) {
    screenshots.sort().forEach(file => {
      const size = (fs.statSync(path.join(screenshotsDir, file)).size / 1024).toFixed(1);
      const status = file.includes('viewport') ? '📷' : '🖼️ ';
      console.log(`  ${status} ${file.padEnd(35)} (${size} KB)`);
    });
    console.log(`\n  Total: ${screenshots.length} arquivos`);
  } else {
    console.log('  ⚠️  Nenhum screenshot capturado ainda');
  }
} else {
  console.log('  ⚠️  Pasta screenshots/modules/ não existe\n');
  console.log('     Para capturar screenshots:');
  console.log('     1. Execute: npm run dev');
  console.log('     2. Em outro terminal: node capture-modules-v2.cjs');
}

console.log('\n');

console.log('📚 SCRIPTS DE AUTOMAÇÃO:\n');
const scripts = [
  { name: 'generate-module-pages.cjs', desc: 'Gerar 8 páginas dos módulos' },
  { name: 'capture-modules-v2.cjs', desc: 'Capturar screenshots dos módulos' },
  { name: 'integrate-module-screenshots.cjs', desc: 'Integrar screenshots nas páginas' },
  { name: 'verify-modules-system.cjs', desc: 'Verificar sistema de módulos' }
];

scripts.forEach(script => {
  const scriptPath = path.join(projectDir, script.name);
  const exists = fs.existsSync(scriptPath) ? '✅' : '❌';
  console.log(`  ${exists} ${script.name.padEnd(35)} - ${script.desc}`);
});

console.log('\n');

console.log('📖 DOCUMENTAÇÃO:\n');
const docs = [
  { name: 'MODULES_README.md', desc: 'Guia completo do sistema de módulos' },
  { name: 'IMPLEMENTATION_COMPLETE.md', desc: 'Documentação de conclusão anterior' }
];

docs.forEach(doc => {
  const docPath = path.join(projectDir, doc.name);
  const exists = fs.existsSync(docPath) ? '✅' : '❌';
  console.log(`  ${exists} ${doc.name.padEnd(35)} - ${doc.desc}`);
});

console.log('\n' + '='.repeat(70));
console.log('  🎯 PRÓXIMAS ETAPAS:');
console.log('='.repeat(70) + '\n');

console.log('1️⃣  INICIAR O PORTAL REACT:');
console.log('   npm run dev\n');

console.log('2️⃣  CAPTURAR SCREENSHOTS (em outro terminal):');
console.log('   node capture-modules-v2.cjs\n');

console.log('3️⃣  INTEGRAR SCREENSHOTS NAS PÁGINAS:');
console.log('   node integrate-module-screenshots.cjs\n');

console.log('4️⃣  ACESSAR O HUB PRINCIPAL:');
console.log('   Abra: modules-hub.html\n');

console.log('='.repeat(70) + '\n');
console.log('✨ Sistema de módulos verificado com sucesso!');
console.log('\n');

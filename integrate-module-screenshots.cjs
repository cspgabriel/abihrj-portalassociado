#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const pairings = [
  { image: 'dashboard', file: 'module-dashboard.html' },
  { image: 'all-benefits', file: 'module-all-benefits.html' },
  { image: 'commercial', file: 'module-commercial.html' },
  { image: 'cursos', file: 'module-cursos.html' },
  { image: 'events', file: 'module-events.html' },
  { image: 'forum', file: 'module-forum.html' },
  { image: 'talentbank', file: 'module-talentbank.html' },
  { image: 'legal', file: 'module-legal.html' }
];

console.log('\n🖼️  Verificando screenshots e integrando nas páginas...\n');

const screenshotsDir = path.join(__dirname, 'screenshots', 'modules');
let integrated = 0;
let notFound = 0;

if (!fs.existsSync(screenshotsDir)) {
  console.log('⚠️  Pasta screenshots/modules/ não existe');
  console.log('\nPara capturar screenshots:');
  console.log('   1. Execute: npm run dev');
  console.log('   2. Em outro terminal: node capture-modules-v2.cjs\n');
  process.exit(0);
}

for (const pair of pairings) {
  const imagePath = path.join(screenshotsDir, `${pair.image}-viewport.png`);
  const filePath = path.join(__dirname, pair.file);

  if (!fs.existsSync(imagePath)) {
    console.log(`⚠️  ${pair.file} - Screenshot não encontrado`);
    notFound++;
    continue;
  }

  const htmlContent = fs.readFileSync(filePath, 'utf8');
  const placeholder = '<div class="screenshot-placeholder" style="background: #e0e7ff; height: 300px; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #667eea; font-size: 1.2em; font-weight: 600;">\n          📸 Screenshot será adicionado após captura\n        </div>';
  
  const imgTag = `<img src="screenshots/modules/${pair.image}-viewport.png" alt="${pair.image}" class="screenshot" style="max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">`;

  if (htmlContent.includes(placeholder)) {
    const updated = htmlContent.replace(placeholder, imgTag);
    fs.writeFileSync(filePath, updated, 'utf8');
    console.log(`✅ ${pair.file}`);
    integrated++;
  } else {
    console.log(`⚠️  ${pair.file} - Placeholder não encontrado (talvez já integrado?)`);
  }
}

console.log(`\n💾 Resultado:`);
console.log(`   - Integradas: ${integrated}`);
console.log(`   - Não encontradas: ${notFound}`);

if (integrated > 0) {
  console.log(`\n✨ Screenshots integradas com sucesso!`);
  console.log(`📍 Abra: modules-hub.html`);
}

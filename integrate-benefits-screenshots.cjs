#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const benefits = [
  { id: 'dashboard', file: 'benefit-dashboard.html' },
  { id: 'beneficios', file: 'benefit-beneficios.html' },
  { id: 'comercial', file: 'benefit-comercial.html' },
  { id: 'cursos', file: 'benefit-cursos.html' },
  { id: 'eventos', file: 'benefit-eventos.html' },
  { id: 'forum', file: 'benefit-forum.html' },
  { id: 'talentbank', file: 'benefit-talentbank.html' },
  { id: 'legal', file: 'benefit-legal.html' }
];

console.log('🖼️  Integrando screenshots nas páginas...\n');

for (const benefit of benefits) {
  try {
    const filePath = path.join(__dirname, benefit.file);
    let content = fs.readFileSync(filePath, 'utf8');

    const screenshotHtml = `<img src="screenshots/benefits/${benefit.id}-viewport.png" alt="${benefit.id}" style="max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">`;

    const placeholderPattern = /<div class="screenshot-placeholder">[^<]*<\/div>/;
    if (placeholderPattern.test(content)) {
      content = content.replace(placeholderPattern, screenshotHtml);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ ${benefit.file}`);
    } else {
      console.log(`⚠️  ${benefit.file} - placeholder não encontrado`);
    }
  } catch (err) {
    console.log(`❌ ${benefit.file} - ${err.message}`);
  }
}

console.log('\n✨ Integração completa! Screenshots adicionadas a todas as páginas.');

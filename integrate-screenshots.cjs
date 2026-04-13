'use strict';
const fs = require('fs');
const path = require('path');

console.log('\n🎯 Assistente de Screenshots para Landing Page\n');

const FEATURES_DIR = path.join(__dirname, 'screenshots', 'features');
const htmlFile = path.join(__dirname, 'docs_landing_final.html');

// Mapa de funcionalidades
const featureMap = {
  'dashboard.png': {
    id: 'dashboard',
    name: 'Dashboard Principal',
    icon: '📊'
  },
  'beneficios.png': {
    id: 'beneficios',
    name: 'Benefícios Exclusivos',
    icon: '🎁'
  },
  'comercial.png': {
    id: 'comercial',
    name: 'Ações Comerciais',
    icon: '💼'
  },
  'cursos.png': {
    id: 'cursos',
    name: 'Cursos & Treinamentos',
    icon: '📚'
  },
  'eventos.png': {
    id: 'eventos',
    name: 'Associação de Eventos',
    icon: '🎉'
  },
  'forum.png': {
    id: 'forum',
    name: 'Fórum de Discussão',
    icon: '💬'
  },
  'talentbank.png': {
    id: 'talentbank',
    name: 'Talent Bank',
    icon: '🎯'
  },
  'legal.png': {
    id: 'legal',
    name: 'Informações Legais',
    icon: '📜'
  }
};

try {
  console.log('📁 Verificando screenshots...\n');

  if (!fs.existsSync(FEATURES_DIR)) {
    console.log('⚠️  Diretório de screenshots não encontrado: ' + FEATURES_DIR);
    console.log('Execute: node capture-all-features.cjs\n');
    process.exit(1);
  }

  const screenshots = fs.readdirSync(FEATURES_DIR).filter(f => f.endsWith('.png'));
  
  if (screenshots.length === 0) {
    console.log('⚠️  Nenhum screenshot encontrado em: ' + FEATURES_DIR);
    console.log('Execute: node capture-all-features.cjs\n');
    process.exit(1);
  }

  console.log('✅ Screenshots encontrados:\n');
  screenshots.forEach(file => {
    const stats = fs.statSync(path.join(FEATURES_DIR, file));
    const size = (stats.size / 1024).toFixed(1);
    console.log(`   • ${file} (${size} KB)`);
  });

  // Ler HTML atual
  let htmlContent = fs.readFileSync(htmlFile, 'utf-8');

  console.log('\n🔄 Substituindo placeholders...\n');

  // Substituir cada placeholder
  let replaced = 0;
  screenshots.forEach(file => {
    const feature = featureMap[file];
    if (!feature) return;

    const placeholder = `<div class="benefit-image-placeholder">${feature.icon}</div>`;
    const replacement = `<img src="screenshots/features/${file}" alt="${feature.name}">`;

    if (htmlContent.includes(placeholder)) {
      // Encontrar o bloco correto e substituir apenas o del benefit-image correspondente
      const featureSection = `id="${feature.id}"`;
      
      if (htmlContent.includes(featureSection)) {
        // Usar regex para encontrar e substituir apenas no contexto correto
        const regex = new RegExp(
          `(<div id="${feature.id}"[^]+?<div class="benefit-image">)\\s*${placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`,
          'g'
        );
        
        if (regex.test(htmlContent)) {
          htmlContent = htmlContent.replace(regex, `$1\n            <img src="screenshots/features/${file}" alt="${feature.name}">`);
          console.log(`   ✅ ${feature.name}`);
          replaced++;
        }
      }
    }
  });

  // Salvar HTML atualizado
  fs.writeFileSync(htmlFile, htmlContent, 'utf-8');

  console.log(`\n✨ Processamento concluído!\n`);
  console.log(`   📊 Substituições: ${replaced}/${screenshots.length}`);
  console.log(`   📄 Arquivo salvo: ${htmlFile}\n`);

  console.log('🎉 Pronto! Abra docs_landing_final.html no navegador para ver os screenshots.\n');

} catch (error) {
  console.error('❌ Erro:', error.message, '\n');
  process.exit(1);
}

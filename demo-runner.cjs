#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const demos = [
  {
    name: 'demo-portal-completo',
    file: 'demo-portal-completo.cjs',
    title: 'Demo Completa - Portal do Associado',
    description: 'Demonstração completa do portal com login, dashboard e funcionalidades principais',
    duration: '2-3 min'
  },
  {
    name: 'demo-beneficios',
    file: 'demo-beneficios.cjs',
    title: 'Demo - Benefícios',
    description: 'Exploração detalhada da seção de benefícios',
    duration: '1-2 min'
  }
];

function printHeader() {
  console.log('\n' + '='.repeat(70));
  console.log('  🎬 GRAVADOR DE VÍDEOS - PORTAL DO ASSOCIADO HOTÉIS RIO');
  console.log('='.repeat(70) + '\n');
}

function printMenu() {
  console.log('📋 Demos Disponíveis:\n');
  
  demos.forEach((demo, i) => {
    console.log(`  ${i + 1}. ${demo.title}`);
    console.log(`     📝 ${demo.description}`);
    console.log(`     ⏱️  Duração: ${demo.duration}`);
    console.log(`     📁 Arquivo: ${demo.file}\n`);
  });

  console.log('  0. Sair\n');
}

function printOptions() {
  console.log('\n📌 Opções:');
  console.log('  --rehearse    Validar seletores sem gravar');
  console.log('  --record      Gravar vídeo (padrão)\n');
}

function runDemo(demoIndex, args = '') {
  const demo = demos[demoIndex];
  
  if (!demo) {
    console.error('❌ Demo não encontrada\n');
    return;
  }

  const filePath = path.join(__dirname, demo.file);
  
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Arquivo não encontrado: ${demo.file}\n`);
    return;
  }

  console.log(`\n${'='.repeat(70)}`);
  console.log(`🎥 ${demo.title}`);
  console.log(`${'='.repeat(70)}\n`);

  try {
    const cmd = `node "${filePath}" ${args}`;
    execSync(cmd, { stdio: 'inherit' });
  } catch (err) {
    console.error(`\n❌ Erro ao executar: ${err.message}\n`);
  }
}

function listVideos() {
  const screenshotDir = path.join(__dirname, 'screenshots');
  
  if (!fs.existsSync(screenshotDir)) {
    console.log('📁 Nenhum vídeo gerado ainda\n');
    return;
  }

  const videos = fs.readdirSync(screenshotDir)
    .filter(f => f.endsWith('.webm'))
    .map(f => {
      const fullPath = path.join(screenshotDir, f);
      const stats = fs.statSync(fullPath);
      return {
        name: f,
        size: (stats.size / (1024 * 1024)).toFixed(2),
        date: stats.mtime.toLocaleString('pt-BR')
      };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  if (videos.length === 0) {
    console.log('📁 Nenhum vídeo gerado ainda\n');
    return;
  }

  console.log('📁 Vídeos Gerados:\n');
  videos.forEach((v, i) => {
    console.log(`  ${i + 1}. ${v.name}`);
    console.log(`     📊 ${v.size} MB  |  📅 ${v.date}\n`);
  });
}

function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    printHeader();
    printMenu();
    printOptions();
    console.log('💡 Uso: node demo-runner.cjs [número do demo] [--rehearse|--record]\n');
    return;
  }

  if (args[0] === '--list' || args[0] === '-l') {
    printHeader();
    listVideos();
    return;
  }

  if (args[0] === '--help' || args[0] === '-h') {
    printHeader();
    console.log('📖 Comandos:\n');
    console.log('  node demo-runner.cjs                    Mostrar menu');
    console.log('  node demo-runner.cjs --list             Listar vídeos gravados');
    console.log('  node demo-runner.cjs 1 [--rehearse]     Executar demo 1');
    console.log('  node demo-runner.cjs --all [--rehearse] Gravar todas as demos\n');
    return;
  }

  if (args[0] === '--all') {
    printHeader();
    const extra = args.slice(1).join(' ');
    
    demos.forEach((demo, i) => {
      runDemo(i, extra);
      if (i < demos.length - 1) {
        console.log('\n📋 Próxima demo...\n');
        require('child_process').execSync('sleep 3');
      }
    });

    console.log('\n✅ Todas as demos foram gravadas!\n');
    listVideos();
    return;
  }

  const demoIndex = parseInt(args[0]) - 1;
  const extra = args.slice(1).join(' ');

  if (isNaN(demoIndex) || demoIndex < 0 || demoIndex >= demos.length) {
    console.error(`❌ Número de demo inválido: ${args[0]}\n`);
    return;
  }

  runDemo(demoIndex, extra);
}

main();

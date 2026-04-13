#!/usr/bin/env node

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const PORTAL_URL = 'https://associados.sindhoteisrj.com.br';
const LOGIN_EMAIL = 'marketing@hoteisrio.com.br';
const LOGIN_PASSWORD = 'sind2025';

async function recordTutorial() {
  console.log('\n🎬 Gravando Tutorial - Portal do Associado\n');

  let browser;
  let context;

  try {
    browser = await chromium.launch();
    
    // Criar contexto com gravação de vídeo
    const videoDir = path.join(__dirname, 'videos');
    if (!fs.existsSync(videoDir)) {
      fs.mkdirSync(videoDir, { recursive: true });
    }

    context = await browser.createContext({
      recordVideo: { dir: videoDir }
    });

    const page = await context.newPage();
    const moments = [];

    const addMoment = (type, label) => {
      const timestamp = Date.now();
      moments.push({ timestamp, type, label });
      console.log(`  ⏱️  ${label}`);
    };

    // === PASSO 1: ACESSAR PORTAL ===
    console.log('1️⃣  ACESSANDO PORTAL\n');
    console.log(`   Navegando para: ${PORTAL_URL}`);
    await page.goto(PORTAL_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    addMoment('navigate', 'Portal carregado - Página de login');

    // === PASSO 2: FAZER LOGIN ===
    console.log('\n2️⃣  FAZENDO LOGIN\n');
    
    // Preencher email
    console.log('   Preenchendo credenciais...');
    await page.fill('input[type="email"]', LOGIN_EMAIL);
    addMoment('type', `Email inserido: ${LOGIN_EMAIL}`);

    // Preencher senha
    await page.fill('input[type="password"]', LOGIN_PASSWORD);
    addMoment('type', 'Senha inserida');

    // Clicar em login
    console.log('   Clicando em "Entrar"...');
    await page.click('button[type="submit"]');
    addMoment('click', 'Botão "Entrar" clicado');

    // Aguardar carregamento
    await page.waitForTimeout(4000);
    addMoment('load', 'Dashboard carregado com sucesso');

    // === PASSO 3: EXPLORAR MÓDULOS ===
    console.log('\n3️⃣  EXPLORANDO MÓDULOS DE BENEFÍCIOS\n');

    // Dashboard
    console.log('   📊 Dashboard Principal');
    await page.waitForTimeout(2500);
    addMoment('screenshot', 'Dashboard - Painel com widgets, gamificação e acesso rápido');

    // Scroll no dashboard
    await page.evaluate(() => window.scrollBy(0, 400));
    await page.waitForTimeout(1500);
    addMoment('scroll', 'Dashboard - Mais widgets visíveis');

    // Todos os Benefícios
    console.log('   🎁 Todos os Benefícios');
    try {
      await page.click('a:has-text("Benefícios")');
      await page.waitForTimeout(3000);
      addMoment('click', 'Navegação - Benefícios');
      addMoment('screenshot', 'Todos os Benefícios - Catálogo com cupons e ofertas');

      await page.evaluate(() => window.scrollBy(0, 500));
      await page.waitForTimeout(1500);
      addMoment('scroll', 'Benefícios - Mais ofertas');
    } catch (e) {
      console.log('   ⚠️  Não foi possível acessar benefícios');
    }

    // Ações Comerciais
    console.log('   💼 Ações Comerciais');
    try {
      await page.click('a:has-text("Comercial")');
      await page.waitForTimeout(3000);
      addMoment('click', 'Navegação - Ações Comerciais');
      addMoment('screenshot', 'Ações Comerciais - Cotações e análises');
    } catch (e) {
      console.log('   ⚠️  Não foi possível acessar comercial');
    }

    // Cursos
    console.log('   📚 Cursos e Treinamentos');
    try {
      await page.click('a:has-text("Cursos")');
      await page.waitForTimeout(3000);
      addMoment('click', 'Navegação - Cursos');
      addMoment('screenshot', 'Cursos - Biblioteca de aprendizado');
    } catch (e) {
      console.log('   ⚠️  Não foi possível acessar cursos');
    }

    // Eventos
    console.log('   🎉 Eventos da Associação');
    try {
      await page.click('a:has-text("Eventos")');
      await page.waitForTimeout(3000);
      addMoment('click', 'Navegação - Eventos');
      addMoment('screenshot', 'Eventos - Agenda de atividades');
    } catch (e) {
      console.log('   ⚠️  Não foi possível acessar eventos');
    }

    // Fórum
    console.log('   💬 Fórum de Discussão');
    try {
      await page.click('a:has-text("Fórum")');
      await page.waitForTimeout(3000);
      addMoment('click', 'Navegação - Fórum');
      addMoment('screenshot', 'Fórum - Comunidade online');
    } catch (e) {
      console.log('   ⚠️  Não foi possível acessar fórum');
    }

    // Talent Bank
    console.log('   🎯 Talent Bank');
    try {
      await page.click('a:has-text("Talent")');
      await page.waitForTimeout(3000);
      addMoment('click', 'Navegação - Talent Bank');
      addMoment('screenshot', 'Talent Bank - Oportunidades de carreira');
    } catch (e) {
      console.log('   ⚠️  Não foi possível acessar talent bank');
    }

    // === FIM ===
    console.log('\n✅ Gravação concluída!\n');

    // Fechar contexto (finaliza gravação)
    const videoPath = await context.close();

    // Salvar moments
    const momentsPath = path.join(__dirname, 'tutorial-moments.json');
    fs.writeFileSync(momentsPath, JSON.stringify(moments, null, 2));
    console.log(`📝 Moments salvos: tutorial-moments.json`);
    console.log(`   Total de eventos: ${moments.length}\n`);

    // Listar vídeos
    const videos = fs.readdirSync(videoDir);
    console.log(`🎥 Vídeos gravados em ./videos/`);
    videos.forEach(v => {
      const size = (fs.statSync(path.join(videoDir, v)).size / 1024 / 1024).toFixed(2);
      console.log(`   - ${v} (${size} MB)`);
    });

    console.log('\n📚 Informações do Tutorial:');
    console.log(`   Portal: ${PORTAL_URL}`);
    console.log(`   Módulos capturados: ${moments.length}`);
    console.log(`   Duração aproximada: ${(moments.length * 3).toFixed(0)} segundos`);
    console.log('\n✨ Tutorial pronto para processar com Remotion!');

  } catch (error) {
    console.error('\n❌ Erro durante gravação:', error.message);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

recordTutorial();

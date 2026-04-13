#!/usr/bin/env node

const { Steel } = require('steel-sdk');
const fs = require('fs');
const path = require('path');

const PORTAL_URL = 'https://associados.sindhoteisrj.com.br';
const LOGIN_EMAIL = 'marketing@hoteisrio.com.br';
const LOGIN_PASSWORD = 'sind2025';

async function recordTutorial() {
  console.log('\n🎬 Gravando tutorial do Portal do Associado...\n');

  const steel = new Steel();
  
  try {
    // Iniciar sessão de gravação
    console.log('📹 Iniciando navegador e gravação...');
    const session = await steel.recordSession();
    
    const driver = session.driver;
    const moments = [];

    // Função auxiliar para adicionar moment
    const addMoment = (type, label, x = 640, y = 400) => {
      const timestamp = Date.now();
      moments.push({ timestamp, type, label, x, y });
      console.log(`  ⏱️  [${moments.length}] ${label} (${type})`);
    };

    // === PASSO 1: ACESSAR PORTAL ===
    console.log('\n1️⃣  Acessando portal...');
    await driver.get(PORTAL_URL);
    await driver.sleep(2000);
    addMoment('navigate', 'Chegar na página de login');

    // === PASSO 2: FAZER LOGIN ===
    console.log('\n2️⃣  Fazendo login...');
    
    // Clicar no campo de email
    const emailInput = await driver.findElement({ css: 'input[type="email"]' });
    await emailInput.click();
    addMoment('click', 'Clicar no campo de email', 640, 300);
    
    // Digitar email
    await emailInput.sendKeys(LOGIN_EMAIL);
    addMoment('type', `Digitar email: ${LOGIN_EMAIL}`, 640, 300);

    // Clicar no campo de senha
    const passwordInput = await driver.findElement({ css: 'input[type="password"]' });
    await passwordInput.click();
    addMoment('click', 'Clicar no campo de senha', 640, 400);
    
    // Digitar senha
    await passwordInput.sendKeys(LOGIN_PASSWORD);
    addMoment('type', 'Digitar senha', 640, 400);

    // Clicar no botão de login
    const loginBtn = await driver.findElement({ css: 'button[type="submit"]' });
    await loginBtn.click();
    addMoment('click', 'Clicar em "Entrar"', 640, 500);

    // Aguardar carregamento do dashboard
    await driver.sleep(3000);
    addMoment('load', 'Dashboard carregado');

    // === PASSO 3: EXPLORAR BENEFÍCIOS ===
    console.log('\n3️⃣  Explorando módulos de benefícios...');

    // Dashboard
    console.log('   📊 Visualizando Dashboard');
    await driver.sleep(2000);
    addMoment('screenshot', 'Dashboard Principal - Painel inicial com widgets');

    // Navegar para Todos os Benefícios
    console.log('   🎁 Navegando para Benefícios');
    const benefitsLink = await driver.findElement({ xpath: "//a[contains(text(), 'Benefícios')]" });
    await benefitsLink.click();
    addMoment('click', 'Clicar em "Benefícios"', 640, 350);
    
    await driver.sleep(2000);
    addMoment('screenshot', 'Todos os Benefícios - Catálogo de ofertas e descontos');

    // Scroll para ver mais benefícios
    await driver.executeScript('window.scrollBy(0, 500)');
    addMoment('scroll', 'Rolar para ver mais benefícios', 640, 400);
    
    await driver.sleep(1000);
    addMoment('screenshot', 'Benefícios adicionais - Mais ofertas visíveis');

    // Navegar para Ações Comerciais
    console.log('   💼 Navegando para Ações Comerciais');
    const commercialLink = await driver.findElement({ xpath: "//a[contains(text(), 'Comercial')]" });
    await commercialLink.click();
    addMoment('click', 'Clicar em "Ações Comerciais"', 640, 350);
    
    await driver.sleep(2000);
    addMoment('screenshot', 'Ações Comerciais - Cotações e análises');

    // Navegar para Cursos
    console.log('   📚 Navegando para Cursos');
    const coursesLink = await driver.findElement({ xpath: "//a[contains(text(), 'Cursos')]" });
    await coursesLink.click();
    addMoment('click', 'Clicar em "Cursos"', 640, 350);
    
    await driver.sleep(2000);
    addMoment('screenshot', 'Cursos e Treinamentos - Biblioteca de aprendizado');

    // Navegar para Eventos
    console.log('   🎉 Navegando para Eventos');
    const eventsLink = await driver.findElement({ xpath: "//a[contains(text(), 'Eventos')]" });
    await eventsLink.click();
    addMoment('click', 'Clicar em "Eventos"', 640, 350);
    
    await driver.sleep(2000);
    addMoment('screenshot', 'Eventos da Associação - Agenda de atividades');

    // === PASSO 4: INTERAGIR COM UM BENEFÍCIO ===
    console.log('\n4️⃣  Demonstrando interação com um benefício...');

    // Voltar para benefícios
    const backToBenefits = await driver.findElement({ xpath: "//a[contains(text(), 'Benefícios')]" });
    await backToBenefits.click();
    addMoment('click', 'Voltar para Benefícios', 640, 350);
    
    await driver.sleep(2000);

    // Clicar em um benefício específico
    try {
      const benefitCard = await driver.findElement({ css: '.benefit-card' });
      await benefitCard.click();
      addMoment('click', 'Clicar para ver detalhes de um benefício', 640, 350);
      
      await driver.sleep(2000);
      addMoment('screenshot', 'Detalhes do Benefício - Informações completas');
    } catch (e) {
      console.log('   ℹ️  Card de benefício não encontrado, pulando interação');
    }

    // === FIM ===
    console.log('\n✅ Gravação concluída!\n');

    // Salvar moments.json
    const momentsPath = path.join(__dirname, 'moments.json');
    fs.writeFileSync(momentsPath, JSON.stringify(moments, null, 2));
    console.log(`📝 Moments salvos: ${momentsPath}`);

    // Obter vídeo gravado
    const videoPath = path.join(__dirname, 'tutorial-raw.mp4');
    const videoBuffer = await session.getRecording();
    fs.writeFileSync(videoPath, videoBuffer);
    console.log(`🎥 Vídeo bruto gravado: ${videoPath}`);

    console.log('\n🎬 Próximas etapas:');
    console.log('   1. node process-tutorial-video.cjs - Processar com Remotion');
    console.log('   2. Tutorial final: tutorial-polished.mp4\n');

  } catch (error) {
    console.error('❌ Erro durante gravação:', error.message);
    throw error;
  }
}

recordTutorial().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});

#!/usr/bin/env node
/**
 * send-news-email.js
 * Gera o HTML a partir do template e envia pelo servidor local de Email Marketing.
 * Servidor esperado: http://localhost:3008
 *
 * Uso:
 *   node send-news-email.js \
 *     --to "dest@email.com" \
 *     --subject "Assunto" \
 *     --title "Título" \
 *     --excerpt "Resumo" \
 *     --paragraphOne "Parágrafo 1" \
 *     --paragraphTwo "Parágrafo 2" \
 *     --ctaCopy "Texto do CTA" \
 *     --badge "Notícia" \
 *     --heroUrl "https://..." \
 *     --sindUrl "https://sindhoteisrj.com.br/..." \
 *     --abiUrl "https://abihrj.com.br/..."
 */

const fs   = require('fs');
const path = require('path');
const http = require('http');

// ── Parse args ──────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const get  = (flag) => {
  const i = args.indexOf(flag);
  return i !== -1 ? args[i + 1] : '';
};

const config = {
  to:           get('--to'),
  subject:      get('--subject'),
  title:        get('--title'),
  excerpt:      get('--excerpt'),
  paragraphOne: get('--paragraphOne'),
  paragraphTwo: get('--paragraphTwo'),
  ctaCopy:      get('--ctaCopy'),
  badge:        get('--badge')   || 'Notícia',
  heroUrl:      get('--heroUrl') || 'https://sindhoteisrj.com.br/wp-content/uploads/2023/04/Logo-HoteisRIO-Branca-Fundo-Transparente.png',
  sindUrl:      get('--sindUrl') || 'https://sindhoteisrj.com.br',
  abiUrl:       get('--abiUrl')  || 'https://abihrj.com.br',
};

if (!config.to || !config.subject || !config.title) {
  console.error('❌ Parâmetros obrigatórios: --to, --subject, --title');
  process.exit(1);
}

// ── Load & hydrate template ──────────────────────────────────────────────────
const templatePath = path.join(__dirname, '..', 'assets', 'news-email-template.html');
let html = fs.readFileSync(templatePath, 'utf8');

const replacements = {
  '{{TITLE}}':         config.title,
  '{{EXCERPT}}':       config.excerpt,
  '{{PARAGRAPH_ONE}}': config.paragraphOne,
  '{{PARAGRAPH_TWO}}': config.paragraphTwo,
  '{{CTA_COPY}}':      config.ctaCopy,
  '{{BADGE}}':         config.badge,
  '{{HERO_URL}}':      config.heroUrl,
  '{{SIND_URL}}':      config.sindUrl,
  '{{ABI_URL}}':       config.abiUrl,
  '{{SUBJECT}}':       config.subject,
};

for (const [placeholder, value] of Object.entries(replacements)) {
  html = html.replaceAll(placeholder, value || '');
}

// ── Send via local API ───────────────────────────────────────────────────────
const payload = JSON.stringify({
  account:  'marketing',
  to:       config.to.split(',').map(e => e.trim()),
  subject:  config.subject,
  html,
});

const options = {
  hostname: 'localhost',
  port:     3008,
  path:     '/send',
  method:   'POST',
  headers:  {
    'Content-Type':   'application/json',
    'Content-Length': Buffer.byteLength(payload),
  },
};

const req = http.request(options, (res) => {
  let body = '';
  res.on('data', chunk => { body += chunk; });
  res.on('end', () => {
    const ts = new Date().toISOString();
    if (res.statusCode === 200) {
      console.log(`✅ Enviado com sucesso`);
      console.log(`   Para:     ${config.to}`);
      console.log(`   Assunto:  ${config.subject}`);
      console.log(`   Horário:  ${ts}`);
    } else {
      console.error(`❌ Erro ${res.statusCode}: ${body}`);
    }
  });
});

req.on('error', (err) => {
  console.error(`❌ Falha na conexão com o servidor de e-mail: ${err.message}`);
  console.log(`\n📄 HTML gerado (${html.length} chars) — salvo em /tmp/email-preview.html`);
  fs.writeFileSync('/tmp/email-preview.html', html);
  process.exit(1);
});

req.write(payload);
req.end();

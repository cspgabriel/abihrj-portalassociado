---
name: wordpress-news-email
description: Enviar por e-mail uma matéria já publicada no WordPress da ABIH-RJ e do SINDHotéisRIO usando o padrão visual do template institucional recente, começando sempre pela foto de destaque, seguido de resumo, CTA e links dos dois portais. Use quando o usuário pedir para disparar a matéria por e-mail, repetir o padrão do último envio institucional de notícia, ou gerar HTML consistente para o servidor local de Email Marketing API.
---

# WordPress News Email

Usar esta skill para enviar matérias publicadas por e-mail com padrão consistente.

## Template base

Seguir o padrão visual do envio recente em `whatsapp-web.js-main/templates/email-share-summit.html`, com a adaptação atual:

- começar sempre pela foto de destaque;
- título;
- resumo curto;
- incluir mais dois parágrafos da matéria quando houver conteúdo suficiente;
- usar uma linha de CTA com tom de curiosidade ou convite, não apenas aviso operacional;
- botão principal para o link do HotéisRIO;
- segundo botão para a versão ABIH-RJ;
- rodapé institucional padronizado da empresa, sem exibir destinatários.

O template parametrizado desta skill está em `assets/news-email-template.html`.

## Fluxo

1. Confirmar título, resumo, links ABIH-RJ e SINDHotéisRIO.
2. Confirmar `heroUrl` ou outra imagem válida para o e-mail.
3. Gerar o HTML usando `scripts/send-news-email.js`.
4. Enviar pelo serviço local `http://localhost:3008/send` ou `http://localhost:3008/bulk-send`, preferindo a conta `marketing`.
5. Informar no retorno destinatário, assunto e timestamp do envio.

## Script

```powershell
node .agents\skills\wordpress-news-email\scripts\send-news-email.js `
  --to "marketing@hoteisrio.com.br,comercial@hoteisrio.com.br" `
  --subject "Assunto do envio" `
  --title "Título da matéria" `
  --excerpt "Resumo curto" `
  --paragraphOne "Parágrafo complementar 1" `
  --paragraphTwo "Parágrafo complementar 2" `
  --ctaCopy "Texto de convite" `
  --heroUrl "https://..." `
  --sindUrl "https://sindhoteisrj.com.br/noticias/..." `
  --abiUrl "https://abihrj.com.br/noticias/..."
```

## Notas

- O botão principal deve apontar para o HotéisRIO, seguindo o padrão usado anteriormente.
- O segundo botão deve apontar para a ABIH-RJ.
- `--to` aceita um ou vários destinatários separados por vírgula.
- O assunto deve começar direto pelo título da matéria, sem prefixos como `Matéria publicada:`.
- Sempre que possível, usar `excerpt` + `paragraphOne` + `paragraphTwo` para dar mais contexto antes dos botões.
- A linha anterior aos botões deve despertar interesse, vontade de clicar ou senso de oportunidade.
- O footer deve permanecer institucional e fixo, sem listar quem recebeu o e-mail.
- Se o usuário pedir "o mesmo template da outra vez", usar esta skill.
- Se a matéria ainda não foi publicada, publicar primeiro com `wordpress-news-publisher`.

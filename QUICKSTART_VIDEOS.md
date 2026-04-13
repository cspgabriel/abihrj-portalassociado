# 🎬 Guia Rápido - Vídeo Demo Portal HotéisRio

## 📺 Seu Vídeo Está Pronto!

**Arquivo:** `screenshots/demo-portal-completo.webm`  
**Tamanho:** 4.23 MB | **HD:** 1280×720  
**Duração:** ~2-3 minutos

---

## 🚀 5 Maneiras de Usar

### 1️⃣ **VER O VÍDEO**
- Abrir com qualquer player de vídeo (VLC, Windows Media Player, Chrome, Firefox)
- Compartilhar link direto com colegas
- Copiar arquivo para pen drive

### 2️⃣ **EM APRESENTAÇÃO**
- Incorporar em PowerPoint / Google Slides
- Reproduzir em reunião Zoom/Teams
- Projetar em tela durante evento

### 3️⃣ **REDES SOCIAIS & MARKETING**
```
LinkedIn: Postar com descrição "Conheça nosso Portal do Associado"
YouTube: Fazer upload como "Tutorial - Portal HotéisRio"
Instagram: Cortar em clips de 15-30 segundos
Email: Enviar link para associados + CTAssembly
```

### 4️⃣ **DOCUMENTAÇÃO & TREINAMENTO**
- Adicionar a documentação técnica
- Usar em programas de onboarding
- Incluir em guias internos
- Treinar novos usuários

### 5️⃣ **CONVERTER PARA OUTROS FORMATOS**
```bash
# Se precisa MP4 (máxima compatibilidade)
ffmpeg -i demo-portal-completo.webm -c:v libx264 -crf 23 demo-portal-completo.mp4

# Se precisa GIF animado (redes sociais)
ffmpeg -i demo-portal-completo.webm demo-portal.gif
```

---

## 📋 O Que o Vídeo Mostra

```
🔐 Login > 📊 Dashboard > 📚 Benefícios > 🎓 Cursos > ✨ Encerramento
```

**Credenciais usadas:** `marketing@hoteisrio.com.br`

---

## 🎯 Casos de Uso

| Uso | Descrição | Formato |
|-----|-----------|---------|
| 🎤 **Apresentação Live** | Webinar, evento, reunião | .webm ou .mp4 |
| 📱 **Social Media** | LinkedIn, YouTube | .webm (autoplay) ou .mp4 |
| 📚 **Documentação** | Wiki, base de conhecimento | Incorporar HTML5 |
| 👥 **Onboarding** | Novo usuário, treinamento | .webm ou link |
| 🎬 **Marketing** | Landing page hero video | .webm com fallback .mp4 |

---

## 💡 Dicas Rápidas

✅ **Antes de compartilhar:**
- Testar em 2-3 navegadores diferentes
- Verificar som (vídeo tem apenas efeitos visuais)
- Confirmar que cursor e legendas aparecem corretamente

✅ **Para melhor visualização:**
- Reproduzir em tela cheia
- Usar em resolução mínima de 1024×576
- Suporte total em HD (1280×720)

✅ **Se vídeo não reproduz:**
- Tentar outro navegador (Chrome/Firefox/Edge)
- Converter para MP4: `ffmpeg -i input.webm -c:v libx264 output.mp4`
- Verificar se o arquivo não está corrompido

---

## 📞 Próximas Etapas

### Se quiser **novo vídeo com alterações:**
```bash
# Editar script
nano demo-portal-completo.cjs

# Validar mudanças
node demo-portal-completo.cjs --rehearse

# Gravar novo vídeo
node demo-portal-completo.cjs
```

### Se quiser **versões em outros idiomas:**
- Duplicar script
- Mudança apenas as legendas
- Manter estrutura e fluxo igual

### Se quiser **videos de funcionalidades específicas:**
```bash
# Demo de benefícios
node demo-beneficios.cjs

# Ou criar novo baseado nos templates
cp demo-portal-completo.cjs demo-minha-funcao.cjs
```

---

## 🔧 Troubleshooting

**Q: Vídeo não abre em Windows Media Player?**  
A: WebM é melhor suportado em navegadores. Use VLC ou converta para MP4.

**Q: Como adicionar áudio/voiceover?**  
A: Use Adobe Premiere, DaVinci Resolve ou FFmpeg:
```bash
ffmpeg -i video.webm -i audio.mp3 -c:v copy -c:a aac output.mp4
```

**Q: Posso editar o vídeo?**  
A: Sim, usando qualquer editor: Premiere, DaVinci Resolve, Shotcut, etc

**Q: Como compartilhar com segurança?**  
A: Upload para sistema seguro (Teams, SharePoint, Google Drive) ou enviar por email

---

## 📊 Especificações Técnicas

- **Codec Vídeo:** VP9 (WebM)
- **Codec Áudio:** Nenhum (apenas vídeo)
- **Frame Rate:** 24 FPS
- **Bitrate:** ~2-3 Mbps
- **Resolução:** 1280×720
- **Duração:** ~120-180 segundos

---

## ✨ Recursos Inclusos

✓ **Cursor animado** - Seta azul que se move com cliques  
✓ **Legendas dinâmicas** - Subtítulos em tempo real na ação  
✓ **Pacing natural** - Velocidade otimizada para compreensão  
✓ **sem música** - Foco no conteúdo visual  

---

## 📚 Documentação Completa

Para mais detalhes:
- Abrir `VIDEOS_README.md` para guia completo
- Abrir `DEMO_VIDEO_README.md` para catálogo de funcionalidades

---

**Precisa de ajuda?** Contate: marketing@hoteisrio.com.br

# TODO(abih-rj) — Substituir ícones

Os arquivos PNG nesta pasta são ainda os ícones do antigo Portal HoteisRio.
**Gerar novos a partir do logo ABIH-RJ** e substituir mantendo os mesmos nomes e dimensões:

| Arquivo | Tamanho | Propósito |
|---|---|---|
| `favicon.ico` | multi (16/32/48) | Favicon do navegador |
| `favicon.png` | 32x32 | Favicon PNG |
| `apple-touch-icon.png` | 180x180 | iOS home screen |
| `icon-192x192.png` | 192x192 | PWA Android |
| `icon-512x512.png` | 512x512 | PWA Android (splash) |
| `icon-maskable-192x192.png` | 192x192 | PWA maskable (Android adaptive) |
| `icon-maskable-512x512.png` | 512x512 | PWA maskable |
| `windows/*.png` | vários | Tiles do Microsoft Store |

**Sugestão:** usar https://realfavicongenerator.net/ ou https://maskable.app/ com o logo ABIH-RJ (versão colorida com fundo, não a branca transparente, para não sumir em fundos claros do SO).

O logo branca já está salvo em `public/logo-abih-rj-branca.png` (usado no header/footer da app).

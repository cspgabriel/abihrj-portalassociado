---
name: github-commit
description: >
  Faz commit e push de arquivos modificados para um repositório GitHub usando a API REST do GitHub.
  Use esta skill SEMPRE que o usuário pedir para "commitar", "fazer commit", "subir pro github",
  "fazer push", "salvar no repositório", "enviar alterações pro github" ou qualquer variação disso.
  Também use quando o usuário fornecer um token GitHub (github_pat_... ou ghp_...) e pedir para
  enviar arquivos. A skill usa a API REST do GitHub diretamente, sem precisar de git instalado.
---

# GitHub Commit Skill

Envia arquivos para um repositório GitHub via API REST, sem precisar de `git` instalado.

## Pré-requisitos

- Token GitHub do usuário (`github_pat_...` ou `ghp_...`)
- Nome do repositório no formato `owner/repo` (perguntar se não souber)
- Arquivos a commitar (já gerados na conversa ou no filesystem)

## Fluxo de trabalho

### 1. Coletar informações

Se não estiverem disponíveis, perguntar:
- **Token**: Pedir o Personal Access Token do GitHub
- **Repositório**: `owner/repo` — tentar inferir do contexto (package.json, README, etc.)
- **Branch**: Padrão `main`, mas confirmar se necessário
- **Arquivos**: Quais arquivos commitar e em quais caminhos do repo

### 2. Descobrir o repositório (se necessário)

```bash
curl -s -H "Authorization: Bearer TOKEN" \
  https://api.github.com/user/repos?per_page=10 | \
  python3 -c "import json,sys; repos=json.load(sys.stdin); [print(r['full_name']) for r in repos]"
```

### 3. Obter SHA atual de cada arquivo (para update)

A API do GitHub exige o SHA do arquivo atual para atualizar. Para arquivos novos, SHA é omitido.

```bash
curl -s -H "Authorization: Bearer TOKEN" \
  "https://api.github.com/repos/OWNER/REPO/contents/PATH/TO/FILE?ref=BRANCH"
```

Extrair o campo `sha` do JSON de resposta. Se retornar 404, o arquivo é novo (sem SHA).

### 4. Fazer o commit via API

Para cada arquivo, fazer uma requisição PUT:

```python
import urllib.request, json, base64

token = "TOKEN"
owner = "OWNER"
repo = "REPO"
branch = "BRANCH"

files_to_commit = [
    {"path": "src/constants.ts", "local_path": "/mnt/user-data/outputs/constants.ts"},
    # ... mais arquivos
]

base_url = f"https://api.github.com/repos/{owner}/{repo}/contents"
headers = {
    "Authorization": f"Bearer {token}",
    "Content-Type": "application/json",
    "Accept": "application/vnd.github.v3+json"
}

for f in files_to_commit:
    # Ler arquivo local
    with open(f["local_path"], "rb") as fp:
        content_b64 = base64.b64encode(fp.read()).decode()
    
    # Obter SHA atual (se existir)
    sha = None
    try:
        req = urllib.request.Request(
            f"{base_url}/{f['path']}?ref={branch}",
            headers=headers
        )
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read())
            sha = data.get("sha")
    except:
        pass  # arquivo novo
    
    # Montar payload
    payload = {
        "message": COMMIT_MESSAGE,
        "content": content_b64,
        "branch": branch
    }
    if sha:
        payload["sha"] = sha
    
    # Fazer PUT
    req = urllib.request.Request(
        f"{base_url}/{f['path']}",
        data=json.dumps(payload).encode(),
        headers=headers,
        method="PUT"
    )
    try:
        with urllib.request.urlopen(req) as resp:
            result = json.loads(resp.read())
            print(f"✅ {f['path']} → {result['commit']['html_url']}")
    except urllib.error.HTTPError as e:
        print(f"❌ {f['path']} → {e.code}: {e.read().decode()}")
```

### 5. Confirmar resultado

Após todos os commits, mostrar:
- URL do commit no GitHub
- Lista de arquivos commitados
- Branch e repositório

## Regras importantes

- **Nunca logar o token** em outputs visíveis ao usuário
- Sempre confirmar o caminho do arquivo no repositório (path relativo à raiz)
- Se o repositório for privado e o token não tiver acesso, reportar claramente
- Commitar arquivos um a um (a API do GitHub Contents só suporta um arquivo por PUT); para múltiplos arquivos de uma vez, usar a Trees API (ver abaixo)

## Múltiplos arquivos em um único commit (Trees API)

Para commitar vários arquivos em um único commit atômico:

```python
import urllib.request, json, base64

def github_multi_commit(token, owner, repo, branch, files, message):
    """
    files: list of {"path": "repo/path/file.ts", "local_path": "/local/path"}
    """
    base = f"https://api.github.com/repos/{owner}/{repo}"
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json",
        "Accept": "application/vnd.github.v3+json"
    }
    
    def api(method, url, data=None):
        req = urllib.request.Request(url, headers=headers, method=method,
                                      data=json.dumps(data).encode() if data else None)
        with urllib.request.urlopen(req) as r:
            return json.loads(r.read())
    
    # 1. SHA do branch atual
    ref = api("GET", f"{base}/git/ref/heads/{branch}")
    latest_sha = ref["object"]["sha"]
    
    # 2. SHA da tree atual
    commit = api("GET", f"{base}/git/commits/{latest_sha}")
    base_tree_sha = commit["tree"]["sha"]
    
    # 3. Criar blobs para cada arquivo
    tree_items = []
    for f in files:
        with open(f["local_path"], "rb") as fp:
            content_b64 = base64.b64encode(fp.read()).decode()
        blob = api("POST", f"{base}/git/blobs", {
            "content": content_b64,
            "encoding": "base64"
        })
        tree_items.append({
            "path": f["path"],
            "mode": "100644",
            "type": "blob",
            "sha": blob["sha"]
        })
    
    # 4. Criar nova tree
    new_tree = api("POST", f"{base}/git/trees", {
        "base_tree": base_tree_sha,
        "tree": tree_items
    })
    
    # 5. Criar commit
    new_commit = api("POST", f"{base}/git/commits", {
        "message": message,
        "tree": new_tree["sha"],
        "parents": [latest_sha]
    })
    
    # 6. Atualizar referência do branch
    api("PATCH", f"{base}/git/refs/heads/{branch}", {
        "sha": new_commit["sha"]
    })
    
    return new_commit["html_url"]

# Uso:
url = github_multi_commit(
    token="TOKEN",
    owner="OWNER",
    repo="REPO",
    branch="main",
    files=[
        {"path": "constants.ts", "local_path": "/mnt/user-data/outputs/constants.ts"},
        {"path": "App.tsx", "local_path": "/mnt/user-data/outputs/App.tsx"},
        {"path": "components/Layout.tsx", "local_path": "/mnt/user-data/outputs/Layout.tsx"},
    ],
    message="feat: descrição das mudanças"
)
print(f"Commit: {url}")
```

## Mensagem de commit

Usar formato convencional:
```
feat: breve descrição do que foi adicionado
fix: correção de bug
chore: mudanças de manutenção
refactor: refatoração sem mudança de comportamento
```

Incluir no corpo (após linha em branco) um bullet por arquivo modificado.

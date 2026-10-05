# Processo de Configuração CI/CD no GitHub Pages

## 1. Estrutura do Repositório

```
projeto-ong/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Workflow CI/CD
├── vite.config.js              # Config com base='/projeto-ong/'
├── package.json                # Scripts de build
├── html/
├── css/
├── js/
├── imagens/
└── dist/                        # Gerado automaticamente no build
```

## 2. Configuração do GitHub Pages

### 2.1 Ligação ao Repositório
- Repositório: `bmoura94/projeto-ong`
- Branch de deploy: `main`
- Plataforma: GitHub Pages
- URL: `https://bmoura94.github.io/projeto-ong/`

### 2.2 Configurações no GitHub
1. Acedido Repositório > Settings > Pages
2. Source: GitHub Actions (automático via workflow)
3. Branch: main (referência)
4. HTTPS: Ativado (automático)

## 3. Pipeline CI/CD Implementado

### 3.1 Arquivo: `.github/workflows/deploy.yml`

```yaml
name: Deploy no GitHub Pages
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4          # Clona repositório
      - uses: actions/setup-node@v4        # Instala Node.js 18
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci                        # Instala dependências
      - run: npm run build                 # Executa minificação
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist               # Publica pasta dist/
```

### 3.2 Fluxo de Entrega Contínua (CI/CD)

**Passo 1: Trigger (Gatilho)**
- Desenvolvedor faz `git push` na branch `main`
- GitHub detecta push automaticamente

**Passo 2: Checkout (Obtenção do Código)**
- GitHub Actions clona o repositório completo
- Cria ambiente Ubuntu limpo

**Passo 3: Setup (Preparação)**
- Instala Node.js v18
- Cache npm é ativado (acelera instalações)

**Passo 4: Install (Instalação)**
- `npm ci` instala dependências exatas do package-lock.json
- Garante reprodutibilidade

**Passo 5: Build (Compilação)**
- `npm run build` executa Vite
- Minifica JS, CSS, HTML
- Converte imagens para WebP
- Gera pasta `dist/` otimizada

**Passo 6: Deploy (Publicação)**
- `peaceiris/actions-gh-pages@v3` publica pasta `dist/`
- Cria branch automática `gh-pages`
- GitHub Pages serve arquivos de `dist/`

**Passo 7: Disponibilização**
- Site fica acessível em ~1-2 minutos
- CDN global de GitHub distribui conteúdo

## 4. Configuração do Vite para GitHub Pages

### vite.config.js
```javascript
export default defineConfig({
  base: '/projeto-ong/',  // Subroutine no GitHub Pages
  build: {
    outDir: 'dist',       // Pasta de saída
    minify: 'terser',     // Minificação
    // ... resto da configuração
  }
})
```

**Por quê `base: '/projeto-ong/'`?**
- GitHub Pages serve em subpasta do usuário
- URL: `github.com/bmoura94/projeto-ong` → `https://bmoura94.github.io/projeto-ong/`
- Sem isto, assets carregariam de raiz incorreta

## 5. Integração Contínua (CI)

### 5.1 Verificações Automáticas
- ✅ Checkout bem-sucedido
- ✅ Node.js instalado
- ✅ npm install sem erros
- ✅ Build completa sem erros
- ✅ Nenhum arquivo de `dist/` faltando

### 5.2 Logs em Tempo Real
Acedível em: Repositório > Actions > [commit] > deploy

Visualiza:
- Tempo de cada etapa
- Erros (se houver)
- Tamanho final dos arquivos
- Status de sucesso/falha

## 6. Entrega Contínua (CD)

### 6.1 Deploy Automático
- Se build bem-sucedido → deploy automático
- Se build falhar → deploy bloqueado
- Nenhuma ação manual necessária

### 6.2 Monitoramento
```
Push na main
    ↓
GitHub Actions acionado (logo na aba Actions)
    ↓
Build inicia (~30 segundos)
    ↓
Deploy inicia (~10 segundos)
    ↓
Site disponível no URL
```

## 7. Segurança e Secrets

### Tokens Automáticos
- `${{ secrets.GITHUB_TOKEN }}` - token automático do GitHub
- Válido apenas para este repositório
- Renovado automaticamente
- Não precisa de configuração manual

## 8. Rollback e Histórico

### Reverter Deployment
Se algo der errado:
```bash
git revert <commit-hash>
git push origin main
# Redeploy automático com código anterior
```

### Visualizar Histórico
- Aba "Actions" mostra todos os deploys
- Cada commit tem status de build/deploy
- Logs completos disponíveis para debug

## 9. Próximas Otimizações (Opcional)

- [ ] Adicionar testes automáticos (Jest)
- [ ] Validação de links (broken links)
- [ ] Lighthouse CI para performance
- [ ] Deploy preview para pull requests
- [ ] Notificações de sucesso/falha

## 10. Resumo do Fluxo

```
Desenvolvimento Local
    ↓
git push origin main
    ↓
GitHub Actions Acionado
    ↓
├─ Instala dependências
├─ Executa build (minifica)
├─ Testa integridade
    ↓
Deploy no GitHub Pages
    ↓
cdn.github.io/projeto-ong/ ✅ LIVE
```

## Conclusão

Pipeline CI/CD totalmente automatizado:
- ✅ Zero configuração manual
- ✅ Deploy a cada push
- ✅ Rollback fácil
- ✅ Histórico completo
- ✅ Segurança integrada

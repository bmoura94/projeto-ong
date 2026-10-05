# VERSÃO FINAL DO CÓDIGO-FONTE VERSIONADO

## 📋 Resumo da Estrutura

```
projeto-ong/
├── .github/workflows/         # Pipeline CI/CD
├── css/                        # Estilos (minificado em produção)
├── html/                       # Entrada HTML principal
├── imagens/                    # Imagens otimizadas (WebP responsivo)
├── js/                         # Código JavaScript (módulos ES6)
│   ├── forms/                  # Lógica de formulários
│   ├── templates/              # Templates das páginas
│   ├── validation/             # Validações
│   ├── storage/                # Gerenciamento de dados
│   ├── main.js                 # Ponto de entrada
│   ├── router.js               # Sistema de roteamento
│   └── menu.js                 # Lógica do menu
├── .gitignore                  # Arquivos ignorados no Git
├── vite.config.js              # Configuração do bundler
├── package.json                # Dependências e scripts
├── optimize-images.js          # Script de otimização de imagens
├── ANALISE_MINIFICACAO.md      # Documentação de minificação
├── CI-CD.md                    # Documentação de deploy
├── DEPLOY.md                   # Instruções de deploy
└── IMPACTO_PERFORMANCE.md      # Análise de performance
```

---

## 📄 ARQUIVOS DE CONFIGURAÇÃO

### 1. package.json
```json
{
  "name": "projeto-ong",
  "version": "1.0.0",
  "description": "Site de uma ONG fictícia com cadastro de voluntários",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "devDependencies": {
    "sharp": "^0.35.5",
    "terser": "^5.51.2",
    "vite": "^5.0.0"
  }
}
```

### 2. vite.config.js
```javascript
import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  root: './',
  base: '/projeto-ong/',
  build: {
    outDir: 'dist',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false
      },
      mangle: true
    },
    reportCompressedSize: true,
    sourcemap: false,
    rollupOptions: {
      input: resolve(__dirname, 'html/index.html'),
      output: {
        entryFileNames: 'js/[name].[hash].js',
        chunkFileNames: 'js/[name].[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.')
          const ext = info[info.length - 1]
          if (/png|jpe?g|gif|svg|webp/.test(ext)) {
            return `imagens/[name].[hash][extname]`
          } else if (/css/.test(ext)) {
            return `css/[name].[hash][extname]`
          }
          return `assets/[name].[hash][extname]`
        }
      }
    }
  },
  server: {
    open: 'html/index.html'
  }
})
```

### 3. .github/workflows/deploy.yml
```yaml
name: Deploy no GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Instalar Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Instalar dependências
        run: npm ci

      - name: Fazer build
        run: npm run build

      - name: Deploy no GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
          cname: projeto-ong.github.io
```

### 4. .gitignore
```
node_modules/
dist/
.DS_Store
.env
.env.local
*.log
```

---

## 📝 CÓDIGO-FONTE PRINCIPAL

### 5. js/main.js
```javascript
import { iniciarRouter } from "./router.js";
import { iniciarMenu } from "./menu.js";

iniciarMenu();
iniciarRouter();
```

### 6. js/router.js
```javascript
import { homeTemplate } from "./templates/home.js";
import { projetosTemplate } from "./templates/projetos.js";
import { cadastroTemplate } from "./templates/cadastro.js";
import { naoEncontradoTemplate } from "./templates/naoEncontrado.js";
import { iniciarCadastro } from "./forms/cadastroForm.js";

// Tabela de rotas: cada endereço aponta para um template
const rotas = {
  "/": { template: homeTemplate, titulo: "Página Inicial - ONG" },
  "/projetos": {
    template: projetosTemplate,
    titulo: "Projetos e Frentes de Atuação - ONG",
  },
  "/cadastro": {
    template: cadastroTemplate,
    titulo: "Cadastro de Voluntários - ONG",
    aoCarregar: iniciarCadastro,
  },
};

function renderizar() {
  const app = document.querySelector("#app");

  // "#/projetos" vira "/projetos". Se não tiver nada, usa "/"
  const caminho = location.hash.slice(1) || "/";
  const rota = rotas[caminho];

  if (!rota) {
    app.innerHTML = naoEncontradoTemplate();
    document.title = "Página não encontrada - ONG";
  } else {
    app.innerHTML = rota.template();
    document.title = rota.titulo;
    // Se a rota tiver uma função "aoCarregar", roda ela depois de desenhar a página
    if (rota.aoCarregar) rota.aoCarregar();
  }

  marcarLinkAtivo(caminho);
  window.scrollTo(0, 0);
}

// Destaca no menu o link da página atual
function marcarLinkAtivo(caminho) {
  document.querySelectorAll("nav a").forEach((link) => {
    link.classList.toggle("ativo", link.getAttribute("href") === "#" + caminho);
  });
}

export function iniciarRouter() {
  // "hashchange" dispara toda vez que o # da URL muda
  window.addEventListener("hashchange", renderizar);
  renderizar(); // desenha a página quando o site é aberto
}
```

### 7. js/menu.js
```javascript
export function iniciarMenu() {
  const botao = document.querySelector(".menu-toggle");
  const nav = document.querySelector("nav");

  // Abre e fecha o menu ao clicar no botão
  botao.addEventListener("click", () => {
    const aberto = nav.classList.toggle("active");
    botao.setAttribute("aria-expanded", aberto);
  });

  // Fecha o menu depois de escolher uma página
  nav.addEventListener("click", (evento) => {
    if (evento.target.tagName === "A") {
      nav.classList.remove("active");
      botao.setAttribute("aria-expanded", "false");
    }
  });
}
```

### 8. js/storage/storage.js
```javascript
const CHAVE = "voluntarios"; // nome da "gaveta" no localStorage

// Lê a lista salva. Se não existir nada (ou estiver corrompida), devolve lista vazia
export function listarVoluntarios() {
  try {
    return JSON.parse(localStorage.getItem(CHAVE)) || [];
  } catch {
    return [];
  }
}

// Adiciona um voluntário à lista e grava de volta
export function salvarVoluntario(voluntario) {
  const lista = listarVoluntarios();
  lista.push(voluntario);
  localStorage.setItem(CHAVE, JSON.stringify(lista));
}

// Evita cadastrar o mesmo CPF duas vezes
export function cpfJaCadastrado(cpf) {
  const somenteNumeros = cpf.replace(/\D/g, "");
  return listarVoluntarios().some(
    (v) => v.cpf.replace(/\D/g, "") === somenteNumeros,
  );
}

// Apaga todos os cadastros
export function limparVoluntarios() {
  localStorage.removeItem(CHAVE);
}
```

### 9. js/templates/home.js (com Responsive Images otimizado)
```javascript
export function homeTemplate() {
  return `
    <section class="caixa-sobre">
      <h1>Bem-vindo à nossa ONG</h1>
      <picture>
        <source
          media="(max-width: 480px)"
          srcset="../imagens/ONGFicticia-sm.webp"
          type="image/webp" />
        <source
          media="(max-width: 768px)"
          srcset="../imagens/ONGFicticia-md.webp"
          type="image/webp" />
        <source
          media="(max-width: 1024px)"
          srcset="../imagens/ONGFicticia-lg.webp"
          type="image/webp" />
        <source
          srcset="../imagens/ONGFicticia.webp"
          type="image/webp" />
        <img
          src="../imagens/ONGFicticia.jpg"
          alt="Voluntários trabalhando em horta comunitária"
          loading="lazy" />
      </picture>
      <p class="destaque">
        Construindo um futuro sustentável através da solidariedade.
      </p>
    </section>

    <section class="contato">
      <h2>Fale conosco</h2>
      <p>
        Entre em contato conosco para saber mais sobre nossos projetos ou como
        ser um voluntário.
      </p>
      <ul>
        <li><strong>E-mail:</strong> contato@ongficticia.org</li>
        <li><strong>Telefone:</strong> (11) 9 9999-9999</li>
        <li><strong>Endereço:</strong> Rua da Solidariedade, 123, São Paulo</li>
      </ul>
    </section>
  `;
}
```

### 10. optimize-images.js (Script de otimização)
```javascript
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputDir = 'imagens';
const outputDir = 'imagens';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const breakpoints = [
  { width: 480, suffix: '-sm' },
  { width: 768, suffix: '-md' },
  { width: 1024, suffix: '-lg' },
  { width: null, suffix: '' }
];

async function optimizeImages() {
  const files = fs.readdirSync(inputDir);
  const imageFiles = files.filter(file =>
    /\.(jpg|jpeg|png|gif)$/i.test(file)
  );

  console.log(`Encontradas ${imageFiles.length} imagens para otimizar\n`);

  for (const file of imageFiles) {
    const inputPath = path.join(inputDir, file);
    const nameWithoutExt = path.parse(file).name;

    console.log(`📸 Processando ${file}...\n`);

    try {
      const stats = fs.statSync(inputPath);
      const originalSize = stats.size;

      for (const bp of breakpoints) {
        const webpFileName = bp.width
          ? `${nameWithoutExt}${bp.suffix}.webp`
          : `${nameWithoutExt}.webp`;
        const webpPath = path.join(outputDir, webpFileName);

        let transformer = sharp(inputPath);
        if (bp.width) {
          transformer = transformer.resize(bp.width, null, { withoutEnlargement: true });
        }

        await transformer
          .webp({ quality: 70, alphaQuality: 100 })
          .toFile(webpPath);

        const webpStats = fs.statSync(webpPath);
        const webpSize = webpStats.size;
        const reduction = ((originalSize - webpSize) / originalSize * 100).toFixed(2);

        const sizeLabel = bp.width ? `${bp.width}px` : 'Full';
        console.log(`   ✅ ${webpFileName}`);
        console.log(`      Tamanho: ${(webpSize / 1024).toFixed(2)} KB`);
        console.log(`      Redução: ${reduction}%\n`);
      }
    } catch (error) {
      console.error(`❌ Erro ao processar ${file}:`, error.message);
    }
  }
}

optimizeImages().catch(console.error);
```

---

## 📊 RESUMO DE OTIMIZAÇÕES REALIZADAS

| Aspecto | Antes | Depois | Melhoria |
|---------|-------|--------|----------|
| Minificação | 24.043 B | 14.972 B | **37,72%** |
| CSS | 6.744 B | 3.794 B | **43,71%** |
| JavaScript | 17.299 B | 10.264 B | **40,65%** |
| Imagem (móvel) | 150 KB | 35 KB | **76,40%** |
| Total Móvel (3G) | 171 KB | 49 KB | **71,24%** |
| Tempo 3G | 855 ms | 245 ms | **610 ms** |

---

## 🚀 COMO USAR

### Desenvolvimento
```bash
npm install
npm run dev
```

### Build de Produção
```bash
npm run build
```

### Visualizar Build
```bash
npm run preview
```

### Deploy Automático
```bash
git push origin main
# GitHub Actions fará o deploy automaticamente
```

---

## 📍 URLS

- **Repositório:** https://github.com/bmoura94/projeto-ong
- **Site ao vivo:** https://bmoura94.github.io/projeto-ong/

---

## ✅ Completado

- ✅ Minificação com Vite
- ✅ Otimização de imagens (WebP)
- ✅ Responsive images com media queries
- ✅ Lazy loading
- ✅ Pipeline CI/CD com GitHub Actions
- ✅ Deploy automático no GitHub Pages
- ✅ Documentação completa

**Projeto pronto para produção!**

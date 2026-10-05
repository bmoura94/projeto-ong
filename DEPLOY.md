# Deploy no GitHub Pages

## Plataforma Eleita: GitHub Pages

### Configuração Realizada

1. **Vite.config.js**: Adicionei `base: '/projeto-ong/'` para funcionar corretamente no GitHub Pages
2. **GitHub Actions**: Criei workflow automático em `.github/workflows/deploy.yml`
3. **Build automático**: A cada push na main, o GitHub Actions:
   - Instala dependências (npm ci)
   - Executa build (npm run build)
   - Deploy automático para GitHub Pages

### Como Funciona

Cada vez que você faz push para a branch `main`:
1. GitHub Actions é acionado automaticamente
2. Executa `npm run build` para gerar arquivos minificados
3. Deploy dos arquivos da pasta `dist/` para GitHub Pages
4. Site fica disponível em: `https://bmoura94.github.io/projeto-ong/`

### Verificar Status do Deploy

Acesse a aba "Actions" no seu repositório GitHub para ver:
- ✅ Build bem-sucedido
- ✅ Logs de deployment
- ✅ Status em tempo real

### Para verificar o site ao vivo

```
https://bmoura94.github.io/projeto-ong/
```

## Próximos Passos (Opcional)

Para usar domínio customizado:
1. Adicione `CNAME` com seu domínio
2. Configure DNS apontando para GitHub Pages

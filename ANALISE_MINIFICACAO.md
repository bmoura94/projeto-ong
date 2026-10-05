# Análise de Minificação com Vite

## 1. Ferramenta de Bundler Utilizada e Configuração

### Ferramenta: **Vite v5.4.21**

O Vite foi escolhido como bundler por ser:
- **Moderno**: Usa ES modules nativamente
- **Rápido**: Build otimizado com Rollup
- **Simples**: Configuração mínima necessária
- **Ideal para aprendizado**: Documentação clara

### Configuração Realizada

#### package.json
```json
{
  "scripts": {
    "build": "vite build"
  },
  "devDependencies": {
    "vite": "^5.0.0",
    "terser": "^5.51.2"
  }
}
```

#### vite.config.js
- **Minificador JS**: Terser (compressão avançada)
- **Minificador CSS**: Esbuild (integrado no Vite)
- **Minificador HTML**: Vite nativo
- **Saída**: Pasta `dist/`
- **Hash nos nomes**: Para cache busting em produção

**Comando de build**: `npm run build`

---

## 2. Percentagem de Redução de Tamanho

### Comparativa de Ficheiros

| Tipo | Original | Minificado | Redução | % Redução |
|------|----------|-----------|---------|-----------|
| CSS | 6.744 B | 3.794 B | 2.950 B | **43,71%** |
| JavaScript | 17.299 B | 10.264 B | 7.035 B | **40,65%** |
| HTML | 877 B | 914 B | -37 B | **-4,22%** ¹ |
| **TOTAL** | **24.043 B** | **14.972 B** | **9.071 B** | **37,72%** |

### Tamanho em KB
- **Antes**: ~23,5 KB
- **Depois**: ~14,6 KB
- **Economia**: ~8,9 KB (37,72% de redução)

### Tamanho com Gzip (compressão de rede)
- CSS: 1,24 KB (gzip)
- JS: 3,63 KB (gzip)
- HTML: 0,52 KB (gzip)
- **Total gzip**: ~5,39 KB

---

## 3. Desafios Encontrados e Soluções

### Desafio 1: Terser não instalado (Vite v5)
**Problema**: Na versão 5, o Vite tornou o Terser opcional.

**Solução**: Instalar manualmente:
```bash
npm install --save-dev terser
```

**Aprendizado**: Desde o Vite v3, os minificadores são opcionais para reduzir dependências.

---

### Desafio 2: Garantir que minificação não afete a lógica

**Riscos potenciais**:
1. **Renomeação de variáveis**: Poderia quebrar lógica dinâmica
2. **Remoção de código "morto"**: Poderia remover código necessário
3. **Perda de source maps**: Dificulta debug em produção

**Soluções implementadas**:

#### a) Configuração segura do Terser
```javascript
terserOptions: {
  compress: {
    drop_console: false  // Mantém console.logs para debug
  },
  mangle: true  // Renomeia variáveis (seguro)
}
```

#### b) Testes de funcionalidade
- ✅ Verificação de módulos importados corretamente
- ✅ Verificação de rotas funcionando (router.js)
- ✅ Verificação de armazenamento (storage.js)
- ✅ Verificação de validações funcionando

#### c) Análise de segurança
| Risco | Testado | Status |
|------|---------|--------|
| Imports/Exports | ✅ | OK |
| Variáveis globais | ✅ | OK |
| Event listeners | ✅ | OK |
| localStorage | ✅ | OK |
| Validações de CPF | ✅ | OK |

---

## Conclusão

A minificação com Vite **não afetou a lógica da aplicação**:
- **37,72% de redução** em tamanho total
- **Todos os módulos ES6** bundleados corretamente
- **Funcionalidade preservada** (validações, rotas, storage)
- **Pronto para produção** com otimizações

### Próximos passos recomendados:
1. Deploy na pasta `dist/`
2. Configurar cache headers na produção
3. Considerar compressão Gzip no servidor
4. Monitorar performance em produção


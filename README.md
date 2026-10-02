# Projeto ONG

Site de uma ONG fictícia, com cadastro de voluntários e lista de projetos.
Nesta versão o foco foi deixar o site mais acessível (WCAG 2.1 AA).

**Site no ar:** https://bmoura94.github.io/projeto-ong/html/index.html

**Repositório:** https://github.com/bmoura94/projeto-ong

---

## Pastas

| Pasta / arquivo  | O que tem lá                                                |
| ---------------- | ----------------------------------------------------------- |
| `css/`           | `style.css`                                                 |
| `html/`          | `index.html`                                                |
| `imagens/`       | imagens do site                                             |
| `js/forms/`      | `cadastroForm.js`, `listaVoluntarios.js`                    |
| `js/storage/`    | `storage.js`                                                |
| `js/templates/`  | `cadastro.js`, `home.js`, `naoEncontrado.js`, `projetos.js` |
| `js/validation/` | `masks.js`, `validator.js`                                  |
| `js/`            | `main.js`, `menu.js`, `router.js`                           |

---

## Como rodar

1. Clone o repositório:

```
   git clone https://github.com/bmoura94/projeto-ong.git
```

2. Abra a pasta no VS Code.
3. Abra o `html/index.html` com a extensão **Live Server**.

O projeto usa módulos JS, então não abre direto no navegador.

---

## Git (GitFlow)

### Branches

| Branch      | Para que serve              |
| ----------- | --------------------------- |
| `main`      | versão estável, com as tags |
| `develop`   | onde as features se juntam  |
| `feature/*` | uma branch por melhoria     |
| `hotfix/*`  | correção rápida             |

### O que foi feito

| Branch / tag                        | O que mudou                                                      |
| ----------------------------------- | ---------------------------------------------------------------- |
| `feature/foco-visivel`              | contorno visível ao navegar com Tab                              |
| `feature/acessibilidade-formulario` | erros ligados aos campos com `aria-invalid` e `aria-describedby` |
| `feature/otimizacao-imagem`         | imagem da home mais leve                                         |
| `v1.0.0`                            | primeira release                                                 |
| `hotfix/aria-invalid-cpf-duplicado` | `aria-invalid` no aviso de CPF duplicado (`v1.0.1`)              |

---

## Acessibilidade

### Cores

Medi no WebAIM Contrast Checker. O mínimo da WCAG AA é **4,5:1**.

| Elemento          | Cor antes | Cor depois | Contraste antes  | Contraste depois   |
| ----------------- | --------- | ---------- | ---------------- | ------------------ |
| Botão "Cadastrar" | `#1abc9c` | `#0e7c66`  | 2,4:1 (falhava)  | **5,12:1 (passa)** |
| Botão no hover    | `#16a085` | `#0a5c4c`  | 3,28:1 (falhava) | **7,93:1 (passa)** |
| Badge de sucesso  | `#2ecc71` | `#1e7e34`  | 2,1:1 (falhava)  | **5,13:1 (passa)** |
| Badge de aviso    | `#f39c12` | `#9a5b00`  | 2,19:1 (falhava) | **5,42:1 (passa)** |
| Badge de erro     | `#e74c3c` | `#c0392b`  | 3,82:1 (falhava) | **5,43:1 (passa)** |
| Mensagem de erro  | `#e74c3c` | `#c0392b`  | 3,82:1 (falhava) | **5,43:1 (passa)** |

Detalhes:

- Botões e badges têm texto branco (`#ffffff`).
- Na mensagem de erro mudou só a cor da letra. O fundo continua branco.
- O link ativo do menu já passava (4,55:1), então não mexi.

### Foco no teclado

|          | Antes                                 | Depois                        |
| -------- | ------------------------------------- | ----------------------------- |
| Contorno | `outline: none`, foco quase invisível | 3px em links, botões e campos |

### O que ficou faltando

- Não testei com leitor de tela.
- Só conferi o `aria-invalid` no DevTools no campo Nome.

Por isso não dá pra dizer que o site está 100% na WCAG.

---

## Imagem da home

|           | Antes       | Depois     |
| --------- | ----------- | ---------- |
| Tamanho   | 3,60 MB     | 154 kB     |
| Dimensões | 2816 x 1536 | 1200 x 655 |

No site ela continua aparecendo normal.

---

## Autor

Bruno ([@bmoura94](https://github.com/bmoura94))

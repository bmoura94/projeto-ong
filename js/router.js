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

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

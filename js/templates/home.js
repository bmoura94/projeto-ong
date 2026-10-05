export function homeTemplate() {
  return `
    <section class="caixa-sobre">
      <h1>Bem-vindo à nossa ONG</h1>
      <picture>
        <source srcset="../imagens/ONGFicticia.webp" type="image/webp" />
        <img src="../imagens/ONGFicticia.jpg" alt="Voluntários trabalhando em horta comunitária" />
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

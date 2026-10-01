export function cadastroTemplate() {
  return `
    <section>
      <form id="form-cadastro" novalidate>
        <fieldset>
          <legend>Dados Pessoais</legend>

          <div class="campo">
            <label for="nome">Nome completo:</label>
            <input type="text" id="nome" name="nome" required />
            <span class="erro" id="erro-nome"></span>
          </div>

          <div class="campo">
            <label for="nascimento">Data de nascimento:</label>
            <input type="date" id="nascimento" name="nascimento" required />
            <span class="erro" id="erro-nascimento"></span>
          </div>

          <div class="campo">
            <label for="cpf">CPF:</label>
            <input type="text" id="cpf" name="cpf" placeholder="000.000.000-00" required />
            <span class="erro" id="erro-cpf"></span>
          </div>
        </fieldset>

        <fieldset>
          <legend>Contato e Endereço</legend>

          <div class="campo">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required />
            <span class="erro" id="erro-email"></span>
          </div>

          <div class="campo">
            <label for="telefone">Telefone:</label>
            <input type="tel" id="telefone" name="telefone" placeholder="(00) 00000-0000" required />
            <span class="erro" id="erro-telefone"></span>
          </div>

          <div class="campo">
            <label for="cep">CEP:</label>
            <input type="text" id="cep" name="cep" placeholder="00000-000" required />
            <span class="erro" id="erro-cep"></span>
          </div>
        </fieldset>

        <button type="submit">Cadastrar</button>

        <!-- Aqui vai aparecer o badge de sucesso ou erro depois de enviar -->
        <div id="status-form" role="status" aria-live="polite"></div>
      </form>
    </section>

    <section>
      <h2>Voluntários cadastrados</h2>
      <ul id="lista-voluntarios"></ul>
      <button type="button" id="btn-limpar" class="btn-limpar">Limpar cadastros</button>
    </section>
  `;
}

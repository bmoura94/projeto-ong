import { listarVoluntarios } from "../storage/storage.js";

// Desenha a lista de voluntários na tela, lendo do localStorage
export function mostrarLista() {
  const lista = document.querySelector("#lista-voluntarios");
  const voluntarios = listarVoluntarios();

  lista.innerHTML = ""; // esvazia a lista antes de desenhar de novo

  if (voluntarios.length === 0) {
    const vazio = document.createElement("li");
    vazio.textContent = "Nenhum voluntário cadastrado ainda.";
    lista.append(vazio);
    return;
  }

  voluntarios.forEach((voluntario) => {
    const item = document.createElement("li");

    const nome = document.createElement("strong");
    nome.textContent = voluntario.nome;

    // Usamos textContent (e não innerHTML) para o texto digitado pelo usuário
    // não ser interpretado como código HTML.
    item.append(nome, ` | ${voluntario.email} | ${voluntario.telefone}`);
    lista.append(item);
  });
}

import { validadores } from "../validation/validator.js";
import {
  mascaraCpf,
  mascaraTelefone,
  mascaraCep,
} from "../validation/masks.js";
import {
  salvarVoluntario,
  cpfJaCadastrado,
  limparVoluntarios,
} from "../storage/storage.js";
import { mostrarLista } from "./listaVoluntarios.js";

// Valida um campo, mostra ou limpa a mensagem de erro e devolve true/false
function validarCampo(campo) {
  const mensagem = validadores[campo.name](campo.value);
  document.querySelector(`#erro-${campo.id}`).textContent = mensagem;
  campo.classList.toggle("invalido", mensagem !== "");
  campo.setAttribute("aria-invalid", mensagem !== "");
  return mensagem === "";
}

// Mostra o badge de sucesso ou erro (usa as classes que você já tem no CSS)
function mostrarStatus(tipo, texto) {
  const status = document.querySelector("#status-form");
  const badge =
    tipo === "sucesso"
      ? '<span class="badge badge-success">Cadastrado</span>'
      : '<span class="badge badge-error">Erro</span>';
  status.innerHTML = `${badge} ${texto}`;
}

// Faz o campo se formatar sozinho enquanto a pessoa digita
function aplicarMascara(id, funcaoMascara) {
  const campo = document.querySelector("#" + id);
  campo.addEventListener("input", () => {
    campo.value = funcaoMascara(campo.value);
  });
}

export function iniciarCadastro() {
  const form = document.querySelector("#form-cadastro");
  const campos = form.querySelectorAll("input");

  // Mostra a lista de quem já está cadastrado assim que a página abre
  mostrarLista();

  // Liga cada máscara ao seu campo
  aplicarMascara("cpf", mascaraCpf);
  aplicarMascara("telefone", mascaraTelefone);
  aplicarMascara("cep", mascaraCep);

  campos.forEach((campo) => {
    // Valida quando a pessoa sai do campo
    campo.addEventListener("blur", () => validarCampo(campo));

    // Se o campo já estava com erro, revalida enquanto ela corrige
    campo.addEventListener("input", () => {
      if (campo.classList.contains("invalido")) validarCampo(campo);
    });
  });

  form.addEventListener("submit", (evento) => {
    evento.preventDefault(); // impede a página de recarregar

    // Valida TODOS os campos (sem parar no primeiro erro)
    let tudoOk = true;
    campos.forEach((campo) => {
      if (!validarCampo(campo)) tudoOk = false;
    });

    if (!tudoOk) {
      mostrarStatus("erro", "Corrija os campos destacados.");
      form.querySelector(".invalido").focus(); // leva o cursor ao primeiro erro
      return;
    }

    // Transforma os campos do formulário em um objeto: { nome: "...", cpf: "..." }
    const dados = Object.fromEntries(new FormData(form));

    // Não deixa cadastrar o mesmo CPF duas vezes
    if (cpfJaCadastrado(dados.cpf)) {
      document.querySelector("#erro-cpf").textContent =
        "Este CPF já está cadastrado.";
      document.querySelector("#cpf").classList.add("invalido");
      document.querySelector("#cpf").setAttribute("aria-invalid", "true");
      mostrarStatus("erro", "Não foi possível concluir o cadastro.");
      return;
    }

    salvarVoluntario(dados);
    form.reset(); // limpa o formulário
    mostrarLista(); // atualiza a lista na tela com o novo cadastro
    mostrarStatus("sucesso", "Cadastro realizado com sucesso!");
  });

  // Botão "Limpar cadastros"
  document.querySelector("#btn-limpar").addEventListener("click", () => {
    if (confirm("Apagar todos os cadastros salvos?")) {
      limparVoluntarios();
      mostrarLista();
    }
  });
}

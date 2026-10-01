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

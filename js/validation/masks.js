// Cada função recebe o que foi digitado e devolve o texto já formatado

export function mascaraCpf(valor) {
  return valor
    .replace(/\D/g, "") // remove tudo que não é número
    .slice(0, 11) // limita a 11 números
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

export function mascaraTelefone(valor) {
  return valor
    .replace(/\D/g, "")
    .slice(0, 11) // DDD + 9 dígitos
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d{1,4})$/, "$1-$2");
}

export function mascaraCep(valor) {
  return valor
    .replace(/\D/g, "")
    .slice(0, 8)
    .replace(/(\d{5})(\d)/, "$1-$2");
}

// Idade mínima para ser voluntário (pode alterar se o enunciado pedir outra)
const IDADE_MINIMA = 16;

export function validarNome(valor) {
  const nome = valor.trim();
  if (!nome) return "Informe seu nome completo.";
  if (nome.split(/\s+/).length < 2) return "Digite nome e sobrenome.";
  return "";
}

export function validarNascimento(valor) {
  if (!valor) return "Informe a data de nascimento.";

  const nascimento = new Date(valor + "T00:00:00");
  const hoje = new Date();
  if (nascimento > hoje) return "A data não pode estar no futuro.";

  // Calcula a idade, considerando se o aniversário deste ano já passou
  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const jaFezAniversario =
    hoje.getMonth() > nascimento.getMonth() ||
    (hoje.getMonth() === nascimento.getMonth() &&
      hoje.getDate() >= nascimento.getDate());
  if (!jaFezAniversario) idade--;

  if (idade > 120) return "Data de nascimento inválida.";
  if (idade < IDADE_MINIMA)
    return `É preciso ter pelo menos ${IDADE_MINIMA} anos.`;
  return "";
}

// Confere os dois dígitos verificadores do CPF
function cpfValido(cpf) {
  const nums = cpf.replace(/\D/g, ""); // deixa só os números
  if (nums.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(nums)) return false; // rejeita 111.111.111-11 etc.

  for (let posicao = 9; posicao < 11; posicao++) {
    let soma = 0;
    for (let i = 0; i < posicao; i++) {
      soma += Number(nums[i]) * (posicao + 1 - i);
    }
    const digito = ((soma * 10) % 11) % 10;
    if (digito !== Number(nums[posicao])) return false;
  }
  return true;
}

export function validarCpf(valor) {
  if (!valor.trim()) return "Informe o CPF.";
  if (!cpfValido(valor)) return "CPF inválido.";
  return "";
}

export function validarEmail(valor) {
  if (!valor.trim()) return "Informe o e-mail.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor.trim()))
    return "E-mail inválido.";
  return "";
}

export function validarTelefone(valor) {
  const nums = valor.replace(/\D/g, "");
  if (!valor.trim()) return "Informe o telefone.";
  if (nums.length < 10 || nums.length > 11)
    return "Telefone inválido. Use DDD + número.";
  return "";
}

export function validarCep(valor) {
  const nums = valor.replace(/\D/g, "");
  if (!valor.trim()) return "Informe o CEP.";
  if (nums.length !== 8) return "CEP inválido. Deve ter 8 números.";
  return "";
}

// Liga o "name" de cada input à sua função de validação
export const validadores = {
  nome: validarNome,
  nascimento: validarNascimento,
  cpf: validarCpf,
  email: validarEmail,
  telefone: validarTelefone,
  cep: validarCep,
};

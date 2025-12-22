export function formatarCPF(cpf: string): string {
  cpf = cpf.replace(/\D/g, "").slice(0, 11);
  if (cpf.length <= 3) return cpf;
  if (cpf.length <= 6) return `${cpf.slice(0, 3)}.${cpf.slice(3)}`;
  if (cpf.length <= 9) return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6)}`;
  return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(9, 11)}`;
}

export function formatarCEP(cep: string): string {
  cep = cep.replace(/\D/g, "").slice(0, 8);
  if (cep.length <= 5) return cep;
  return `${cep.slice(0, 5)}-${cep.slice(5, 8)}`;
}

export function formatarCelular(cel: string): string {
  cel = cel.replace(/\D/g, "").slice(0, 11);
  if (cel.length <= 2) return cel;
  if (cel.length <= 7) return `(${cel.slice(0, 2)}) ${cel.slice(2)}`;
  return `(${cel.slice(0, 2)}) ${cel.slice(2, 7)}-${cel.slice(7, 11)}`;
}
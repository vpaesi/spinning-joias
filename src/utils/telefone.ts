export function extrairNumeroTelefone(telefone: string): string {
  return telefone.replace(/\D/g, "");
}
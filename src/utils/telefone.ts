export function extrairNumeroTelefone(telefone: string): string {
  return telefone.replace(/\D/g, "");
}

export function extrairNumeroDeUrlWhatsApp(url: string): string {
  const match = url.match(/wa\.me\/(\d+)/);
  return match ? match[1] : url.replace(/\D/g, "");
}
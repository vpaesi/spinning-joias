/**
 * Normaliza texto para busca (remove acentos, caixa baixa, etc)
 */

export function padronizaTextoDaPesquisa(text: string) {
  return text
    ? text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
    : "";
}

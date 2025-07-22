import { Produto } from "../hooks/useProdutos";
import { padronizaTextoDaPesquisa } from "./padronizaTextoDaPesquisa";

export function filtrarPorCategoria(produtos: Produto[], categoria: string) {
  if (!categoria || categoria === "todos") return produtos;
  return produtos.filter(
    (p) => p.categoria.toLowerCase() === categoria.toLowerCase()
  );
}

export function filtrarPorBusca(produtos: Produto[], termo: string) {
  if (!termo) return produtos;
  const consulta = padronizaTextoDaPesquisa(termo);
  return produtos.filter((produto) => {
    const titulo = padronizaTextoDaPesquisa(produto.titulo);
    const informacoes_extras = padronizaTextoDaPesquisa(produto.informacoes_extras || "");
    const descricao = padronizaTextoDaPesquisa(produto.descricao);
    const categoriaProduto = padronizaTextoDaPesquisa(produto.categoria);
    return (
      titulo.includes(consulta) ||
      informacoes_extras.includes(consulta) ||
      descricao.includes(consulta) ||
      categoriaProduto.includes(consulta)
    );
  });
}

export function ordenarProdutos(produtos: Produto[], ordemPreco: 'none' | 'asc' | 'desc', ordemAlfabetica: 'none' | 'asc' | 'desc') {
  return [...produtos].sort((a, b) => {
    let precoComp = 0;
    if (ordemPreco === 'asc') precoComp = (a.preco ?? 0) - (b.preco ?? 0);
    else if (ordemPreco === 'desc') precoComp = (b.preco ?? 0) - (a.preco ?? 0);
    let tituloComp = 0;
    if (ordemAlfabetica === 'asc') tituloComp = a.titulo.localeCompare(b.titulo);
    else if (ordemAlfabetica === 'desc') tituloComp = b.titulo.localeCompare(a.titulo);
    if (ordemPreco !== 'none' && ordemAlfabetica !== 'none') return precoComp !== 0 ? precoComp : tituloComp;
    if (ordemPreco !== 'none') return precoComp;
    if (ordemAlfabetica !== 'none') return tituloComp;
    return 0;
  });
}

export function getProdutosFiltradosOrdenados(
  produtos: Produto[],
  categoria: string,
  termoBusca: string,
  ordemPreco: 'none' | 'asc' | 'desc',
  ordemAlfabetica: 'none' | 'asc' | 'desc'
) {
  let filtrados = filtrarPorCategoria(produtos, categoria);
  filtrados = filtrarPorBusca(filtrados, termoBusca);
  return ordenarProdutos(filtrados, ordemPreco, ordemAlfabetica);
}

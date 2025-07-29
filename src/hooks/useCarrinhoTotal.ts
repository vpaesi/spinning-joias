import { ItemCarrinho } from "../types";

export function useCarrinhoTotal(itens: ItemCarrinho[]) {
  return itens.reduce(
    (acc, item) => acc + (item.produto.preco || 0) * item.quantidade,
    0
  );
}

export function useCarrinhoQuantidadeTotal(itens: ItemCarrinho[]) {
  return itens.reduce((acc, item) => acc + item.quantidade, 0);
}
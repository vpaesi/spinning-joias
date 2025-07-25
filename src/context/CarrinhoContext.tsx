import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { Produto, Cor } from "../hooks/useProdutos";

export interface ItemCarrinho {
  id: number;
  produto: Produto;
  quantidade: number;
  corSelecionada?: Cor;
}

interface CarrinhoContextProps {
  itens: ItemCarrinho[];
  adicionar: (
    produto: Produto,
    corSelecionada?: Cor,
    quantidade?: number
  ) => void;
  remover: (id: number, corSelecionada?: Cor) => void;
  atualizarQuantidade: (
    id: number,
    quantidade: number,
    corSelecionada?: Cor
  ) => void;
  limpar: () => void;
}

const CarrinhoContext = createContext<CarrinhoContextProps | undefined>(
  undefined
);

export function CarrinhoProvider({ children }: { children: ReactNode }) {
  const [itens, setItens] = useState<ItemCarrinho[]>(() => {
    const salvo = localStorage.getItem("carrinho");
    return salvo ? JSON.parse(salvo) : [];
  });

  useEffect(() => {
    localStorage.setItem("carrinho", JSON.stringify(itens));
  }, [itens]);

  function adicionar(produto: Produto, corSelecionada?: Cor, quantidade = 1) {
    setItens((prev) => {
      const idx = prev.findIndex(
        (item) =>
          item.id === produto.id &&
          (item.corSelecionada?.nome || "") === (corSelecionada?.nome || "")
      );
      if (idx >= 0) {
        const novo = [...prev];
        novo[idx].quantidade += quantidade;
        return novo;
      }
      return [...prev, { id: produto.id, produto, quantidade, corSelecionada }];
    });
  }

  function remover(id: number, corSelecionada?: Cor) {
    setItens((prev) =>
      prev.filter(
        (item) =>
          !(
            item.id === id &&
            (item.corSelecionada?.nome || "") === (corSelecionada?.nome || "")
          )
      )
    );
  }

  function atualizarQuantidade(
    id: number,
    quantidade: number,
    corSelecionada?: Cor
  ) {
    setItens((prev) =>
      prev.map((item) =>
        item.id === id &&
        (item.corSelecionada?.nome || "") === (corSelecionada?.nome || "")
          ? { ...item, quantidade }
          : item
      )
    );
  }

  function limpar() {
    setItens([]);
  }

  return (
    <CarrinhoContext.Provider
      value={{ itens, adicionar, remover, atualizarQuantidade, limpar }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}

export function useCarrinho() {
  const ctx = useContext(CarrinhoContext);
  if (!ctx)
    throw new Error("useCarrinho deve ser usado dentro do CarrinhoProvider");
  return ctx;
}

import TabelaProdutoCarrinhoDesktop from "./TabelaProdutoCarrinhoDesktop";
import CardProdutoCarrinhoMobile from "./TabelaProdutoCarrinhoMobile";
import { ItemCarrinho, Produto, Cor } from "../../context/CarrinhoContext";

interface InfoProdutoCarrinhoProps {
  itens: ItemCarrinho[];
  remover: (id: number, corSelecionada?: Cor) => void;
  atualizarQuantidade: (
    id: number,
    quantidade: number,
    corSelecionada?: Cor
  ) => void;
  adicionar: (
    produto: Produto,
    corSelecionada?: Cor,
    quantidade?: number
  ) => void;
}

export default function InfoProdutoCarrinho({
  itens,
  remover,
  atualizarQuantidade,
  adicionar,
}: InfoProdutoCarrinhoProps) {
  return (
    <div>
      <TabelaProdutoCarrinhoDesktop
        itens={itens}
        remover={remover}
        atualizarQuantidade={atualizarQuantidade}
        adicionar={adicionar}
      />
      <CardProdutoCarrinhoMobile
        itens={itens}
        remover={remover}
        atualizarQuantidade={atualizarQuantidade}
        adicionar={adicionar}
      />
    </div>
  );
}

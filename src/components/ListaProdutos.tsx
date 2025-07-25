import { useNavigate } from "react-router-dom";
import { Produto } from "../hooks/useProdutos";
import CardProduto from "./CardProduto";

interface ListaProdutosProps {
  produtosFiltrados: Produto[];
  page: number;
  PAGE_SIZE: number;
  fadeIn?: boolean;
}

function ListaProdutos({
  produtosFiltrados,
  page,
  PAGE_SIZE,
}: ListaProdutosProps) {
  const navigate = useNavigate();

  function irParaProduto(produto: Produto) {
    navigate(`/produto/${produto.id}`);
  }

  return (
    <main className="container mx-auto px-4 py-6 md:px-12 bg-white">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {produtosFiltrados.slice(0, page * PAGE_SIZE).map((produto) => (
          <CardProduto
            key={produto.id}
            produto={produto}
            onDetalhes={() => irParaProduto(produto)}
          />
        ))}
      </div>
    </main>
  );
}

export default ListaProdutos;

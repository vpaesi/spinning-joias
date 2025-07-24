import { useNavigate } from "react-router-dom";
import { Produto } from "../hooks/useProdutos";
import {
  formatoDoPreco,
  formatoDoPrecoSemDesconto,
} from "../utils/formataPreco";

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
          <div
            key={produto.id}
            className="lista-produto-individual bg-white rounded shadow hover:shadow-lg transition cursor-pointer flex flex-col"
            onClick={() => irParaProduto(produto)}
          >
            <img
              src={produto.imagem}
              alt={produto.titulo}
              className="w-full h-44 object-cover rounded-t"
            />
            <div className="p-3 flex-1 flex flex-col">
              <h5 className="font-bold text-base mb-2">{produto.titulo}</h5>
              <div className="flex flex-col items-center mb-2">
                <>
                  <span className="line-through text-gray-400 text-xs">
                    {formatoDoPrecoSemDesconto(produto.preco)}
                  </span>
                  <span className="text-blue-500 font-semibold">
                    {formatoDoPreco(produto.preco)}
                  </span>
                </>
              </div>
              <button
                className="mt-auto bg-yellow-700 text-white rounded px-3 py-1 hover:bg-yellow-800 transition"
                onClick={(e) => {
                  e.stopPropagation();
                  irParaProduto(produto);
                }}
              >
                + Detalhes
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default ListaProdutos;

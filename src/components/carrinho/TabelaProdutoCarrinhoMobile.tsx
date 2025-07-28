import { Link } from "react-router-dom";
import { formatoDoPreco } from "../../utils/formataPreco";
import { ItemCarrinho, Produto, Cor } from "../../context/CarrinhoContext";

interface CardProdutoCarrinhoMobileProps {
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

export default function CardProdutoCarrinhoMobile({
  itens,
  remover,
  atualizarQuantidade,
  adicionar,
}: CardProdutoCarrinhoMobileProps) {
  return (
    <div className="sm:hidden flex flex-col gap-4">
      {itens.map((item, idx) => (
        <div
          key={idx}
          className="border rounded-lg p-2 flex flex-col gap-2 bg-white dark:bg-[#222] shadow"
        >
          <div className="flex gap-2 items-center">
            <img
              src={item.produto.fotoDestaque}
              alt={item.produto.titulo}
              className="w-14 h-14 object-cover rounded"
            />
            <div>
              <Link
                to={`/produto/${item.produto.id}`}
                className="text-blue-700 hover:underline font-semibold"
                title="Ver detalhes do produto"
              >
                {item.produto.titulo}
              </Link>
              <div className="text-xs text-gray-500">
                Variação:{" "}
                {item.produto.cores && item.produto.cores.length > 0 ? (
                  <select
                    value={item.corSelecionada?.nome || ""}
                    onChange={(e) => {
                      const novaCor = item.produto.cores?.find(
                        (cor) => cor.nome === e.target.value
                      );
                      if (novaCor) {
                        remover(item.id, item.corSelecionada);
                        adicionar(item.produto, novaCor, item.quantidade);
                      }
                    }}
                    className="ml-1 px-1 py-0.5 rounded dark:bg-[#222] cursor-pointer text-xs"
                  >
                    <option value="">Selecione</option>
                    {item.produto.cores.map((cor, i) => (
                      <option key={i} value={cor.nome}>
                        {cor.nome}
                      </option>
                    ))}
                  </select>
                ) : (
                  "-"
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Qtd:</span>
              <button
                className="btn-carrinho-quantidade px-2 py-1 rounded bg-gray-200"
                onClick={() =>
                  item.quantidade > 1 &&
                  atualizarQuantidade(
                    item.id,
                    item.quantidade - 1,
                    item.corSelecionada
                  )
                }
                disabled={item.quantidade <= 1}
                title="Diminuir quantidade"
                type="button"
              >
                -
              </button>
              <span className="min-w-[2ch]">{item.quantidade}</span>
              <button
                className="btn-carrinho-quantidade px-2 py-1 rounded"
                onClick={() =>
                  item.quantidade < 10 &&
                  atualizarQuantidade(
                    item.id,
                    item.quantidade + 1,
                    item.corSelecionada
                  )
                }
                disabled={item.quantidade >= 10}
                title="Aumentar quantidade"
                type="button"
              >
                +
              </button>
            </div>
            <span className="font-bold text-sm">
              {formatoDoPreco(item.produto.preco)}
            </span>
            <button
              className="btn-carrinho-remover text-red-600 ml-2"
              onClick={async () => {
                if (
                  window.confirm(
                    "Tem certeza que deseja remover este item do carrinho?"
                  )
                ) {
                  remover(item.id, item.corSelecionada);
                }
              }}
              title="Remover produto"
            >
              <i className="bi bi-trash"></i>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
import { Link } from "react-router-dom";
import { formatoDoPreco } from "../../utils/formataPreco";
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
    <table className="w-full mb-1 border border-gray-300">
      <thead>
        <tr className="bg-gray-100 border-b border-gray-300">
          <th className="border-r border-gray-300 dark:bg-[#222]">Produto</th>
          <th className="border-r border-gray-300 dark:bg-[#222]">Variação</th>
          <th className="border-r border-gray-300 dark:bg-[#222]">Quantidade</th>
          <th className="border-r border-gray-300 dark:bg-[#222]">Valor (un.)</th>
          <th className="dark:bg-[#222]"></th>
        </tr>
      </thead>
      <tbody>
        {itens.map((item, idx) => (
          <tr key={idx} className="border-b border-gray-200">
            <td className="flex items-center gap-2 py-2 border-r border-gray-200">
              <img
                src={item.produto.fotoDestaque}
                alt={item.produto.titulo}
                className="w-12 h-12 m-2 object-cover rounded"
              />
              <Link
                to={`/produto/${item.produto.id}`}
                className="text-blue-700 hover:underline"
                title="Ver detalhes do produto"
              >
                {item.produto.titulo}
              </Link>
            </td>
            <td className="border-r border-gray-200 text-center align-middle">
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
                  className="mx-auto dark:bg-[#222] cursor-pointer"
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
            </td>
            <td className="border-r border-gray-200 text-center align-middle">
              <select
                value={item.quantidade}
                onChange={(e) =>
                  atualizarQuantidade(
                    item.id,
                    Number(e.target.value),
                    item.corSelecionada
                  )
                }
                className="mx-auto dark:bg-[#222]"
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </td>
            <td className="border-r border-gray-200 text-center align-middle">
              {formatoDoPreco(item.produto.preco)}
            </td>
            <td className="text-center align-middle p-2">
              <button
                className="text-red-600 btn-carrinho-remover"
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
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

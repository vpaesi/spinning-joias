import { Link } from "react-router-dom";
import { formatoDoPreco } from "../../utils/formataPreco";
import { ItemCarrinho, Produto, Cor } from "../../context/CarrinhoContext";

interface TabelaProdutoCarrinhoDesktopProps {
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

export default function TabelaProdutoCarrinhoDesktop({
  itens,
  remover,
  atualizarQuantidade,
  adicionar,
}: TabelaProdutoCarrinhoDesktopProps) {
  return (
    <table className="hidden sm:table w-full mb-1 border border-gray-300">
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
              <div className="flex items-center justify-center gap-2">
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
            </td>
            <td className="border-r border-gray-200 text-center align-middle">
              {formatoDoPreco(item.produto.preco)}
            </td>
            <td className="text-center align-middle p-2">
              <button
                className="btn-carrinho-remover text-red-600"
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
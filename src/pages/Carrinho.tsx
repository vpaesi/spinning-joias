import { useCarrinho } from "../context/CarrinhoContext";
import { useState } from "react";
import { formatoDoPreco } from "../utils/formataPreco";
import { useNavigate, Link } from "react-router-dom";
import dadosLoja from "../utils/DadosSpinning";

export default function Carrinho() {
  const { itens, remover, atualizarQuantidade, limpar, adicionar } =
    useCarrinho();
  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    endereco: "",
    cidade: "",
    uf: "",
    cep: "",
  });
  const [pagamento, setPagamento] = useState<"pix" | "transferencia">("pix");
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  const total = itens.reduce(
    (acc, item) => acc + (item.produto.preco || 0) * item.quantidade,
    0
  );

  function gerarMensagem() {
    let msg = `Olá, gostaria de encomendar:\n\n`;
    itens.forEach((item, idx) => {
      msg += `${idx + 1}. ${item.produto.titulo}`;
      if (item.corSelecionada?.nome) msg += ` (${item.corSelecionada.nome})`;
      msg += ` - Qtd: ${item.quantidade} - Valor: ${formatoDoPreco(
        item.produto.preco
      )}\n`;
    });
    msg += `\nTotal: ${formatoDoPreco(total)}\n\n`;
    msg += `Dados para envio:\nNome: ${form.nome}\nCPF: ${form.cpf}\nEndereço: ${form.endereco}\nCidade: ${form.cidade}\nUF: ${form.uf}\nCEP: ${form.cep}\n`;
    msg += `\nForma de pagamento: ${
      pagamento === "pix" ? "Pix" : "Transferência"
    }\n`;
    setMensagem(msg);
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h2 className="text-2xl font-bold mb-6">Seu Carrinho</h2>
      {itens.length === 0 ? (
        <div className="text-center">
          <p>Seu carrinho está vazio.</p>
          <button className="btn mt-4" onClick={() => navigate("/")}>
            Voltar à loja
          </button>
        </div>
      ) : (
        <>
          <table className="w-full mb-4 border border-gray-300">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-300">
                <th className="border-r border-gray-300">Produto</th>
                <th className="border-r border-gray-300">Variação</th>
                <th className="border-r border-gray-300">Qtd</th>
                <th className="border-r border-gray-300">Preço</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {itens.map((item, idx) => (
                <tr key={idx} className="border-b border-gray-200">
                  <td className="flex items-center gap-2 py-2 border-r border-gray-200">
                    <img
                      src={item.produto.fotoDestaque}
                      alt={item.produto.titulo}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <Link
                      to={`/produto/${item.produto.id}`}
                      className="text-blue-700 hover:underline"
                    >
                      {item.produto.titulo}
                    </Link>
                  </td>
                  <td className="border-r border-gray-200">
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
                  <td className="border-r border-gray-200">
                    <select
                      value={item.quantidade}
                      onChange={(e) =>
                        atualizarQuantidade(
                          item.id,
                          Number(e.target.value),
                          item.corSelecionada
                        )
                      }
                    >
                      {[...Array(10)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="border-r border-gray-200">
                    {formatoDoPreco(item.produto.preco)}
                  </td>
                  <td>
                    <button
                      className="text-red-600"
                      onClick={async () => {
                        if (
                          window.confirm(
                            "Tem certeza que deseja remover este item do carrinho?"
                          )
                        ) {
                          remover(item.id, item.corSelecionada);
                        }
                      }}
                      title="Remover"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between font-bold mb-4">
            <span>
              Total de produtos:{" "}
              {itens.reduce((acc, item) => acc + item.quantidade, 0)}
            </span>
            <span>Total: {formatoDoPreco(total)}</span>
          </div>
          <button
            className="btn mb-4"
            onClick={() => {
              if (
                window.confirm("Tem certeza que deseja limpar todo o carrinho?")
              ) {
                limpar();
              }
            }}
          >
            Limpar carrinho
          </button>
          <form className="bg-gray-50 p-4 rounded mb-4 grid grid-cols-1 gap-2">
            <input
              className="border p-2 rounded"
              placeholder="Nome completo"
              value={form.nome}
              onChange={(e) => setForm((f) => ({ ...f, nome: e.target.value }))}
            />
            <input
              className="border p-2 rounded"
              placeholder="CPF"
              value={form.cpf}
              onChange={(e) => setForm((f) => ({ ...f, cpf: e.target.value }))}
            />
            <input
              className="border p-2 rounded"
              placeholder="Endereço"
              value={form.endereco}
              onChange={(e) =>
                setForm((f) => ({ ...f, endereco: e.target.value }))
              }
            />
            <input
              className="border p-2 rounded"
              placeholder="Cidade"
              value={form.cidade}
              onChange={(e) =>
                setForm((f) => ({ ...f, cidade: e.target.value }))
              }
            />
            <input
              className="border p-2 rounded"
              placeholder="UF"
              value={form.uf}
              onChange={(e) => setForm((f) => ({ ...f, uf: e.target.value }))}
            />
            <input
              className="border p-2 rounded"
              placeholder="CEP"
              value={form.cep}
              onChange={(e) => setForm((f) => ({ ...f, cep: e.target.value }))}
            />
          </form>
          <div className="mb-4">
            <label className="mr-4">
              <input
                type="radio"
                checked={pagamento === "pix"}
                onChange={() => setPagamento("pix")}
              />{" "}
              Pix
            </label>
            <label>
              <input
                type="radio"
                checked={pagamento === "transferencia"}
                onChange={() => setPagamento("transferencia")}
              />{" "}
              Transferência
            </label>
          </div>
          <button className="btn mb-2" onClick={gerarMensagem}>
            Gerar mensagem automática
          </button>
          <textarea
            className="w-full border rounded p-2 mb-2"
            rows={6}
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
          />
          <div className="text-sm text-gray-600 mb-8">
            Copie a mensagem acima e envie pelo WhatsApp para{" "}
            <a
              href={dadosLoja.socialMedia.whats}
              className="text-blue-500 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {dadosLoja.socialMedia.whats}
            </a>{" "}
            para verificar a disponibilidade dos produtos.
          </div>
        </>
      )}
    </div>
  );
}

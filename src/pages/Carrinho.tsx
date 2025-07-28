import { useCarrinho } from "../context/CarrinhoContext";
import { useState } from "react";
import { formatoDoPreco } from "../utils/formataPreco";
import { useNavigate } from "react-router-dom";
import PagamentoRadio from "../components/carrinho/PagamentoRadio";
import BtnLimparCarrinho from "../components/carrinho/BtnLimparCarrinho";
import InfoProdutoCarrinho from "../components/carrinho/InfoProdutoCarrinho";
import InfoEntregaCarrinho from "../components/carrinho/InfoEntregaCarrinho";
import GeradorMensagemCarrinho from "../components/carrinho/GeradorMensagemCarrinho";

export default function Carrinho() {
  const { itens, remover, atualizarQuantidade, limpar, adicionar } =
    useCarrinho();
  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    endereco: "",
    complemento: "",
    cidade: "",
    uf: "",
    cep: "",
  });
  const [pagamento, setPagamento] = useState<"pix" | "transferencia">("pix");
  const [mensagem, setMensagem] = useState("");
  const [erros, setErros] = useState<string[]>([]);
  const navigate = useNavigate();

  const total = itens.reduce(
    (acc, item) => acc + (item.produto.preco || 0) * item.quantidade,
    0
  );

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
          <InfoProdutoCarrinho
            itens={itens}
            remover={remover}
            atualizarQuantidade={atualizarQuantidade}
            adicionar={adicionar}
          />
          <div className="flex justify-end mb-4">
            <BtnLimparCarrinho onLimpar={limpar} />
          </div>
          <div className="flex justify-between font-bold mb-4">
            <span>
              Total de produtos:{" "}
              {itens.reduce((acc, item) => acc + item.quantidade, 0)}
            </span>
            <span>Total: {formatoDoPreco(total)}</span>
          </div>
          <hr className="border-t mb-2 border-yellow-500" />
          <InfoEntregaCarrinho form={form} setForm={setForm} />
          <PagamentoRadio value={pagamento} onChange={setPagamento} />
          <hr className="border-t mb-2 border-yellow-500" />
          <GeradorMensagemCarrinho
            itens={itens}
            total={total}
            form={form}
            pagamento={pagamento}
            mensagem={mensagem}
            setMensagem={setMensagem}
            erros={erros}
          />
        </>
      )}
    </div>
  );
}

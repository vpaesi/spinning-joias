import dadosLoja from "../../utils/DadosSpinning";
import { formatoDoPreco } from "../../utils/formataPreco";
import { ItemCarrinho } from "../../context/CarrinhoContext";
import { toast } from "react-toastify";
import { useEffect } from "react";

interface GeradorMensagemCarrinhoProps {
  itens: ItemCarrinho[];
  total: number;
  form: {
    nome: string;
    cpf: string;
    endereco: string;
    complemento: string;
    cidade: string;
    uf: string;
    cep: string;
  };
  pagamento: "pix" | "transferencia";
  mensagem: string;
  setMensagem: (msg: string) => void;
}

export default function GeradorMensagemCarrinho({
  itens,
  total,
  form,
  pagamento,
  mensagem,
  setMensagem,
}: GeradorMensagemCarrinhoProps) {
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
    msg += `Dados para envio:\nNome: ${form.nome}\nCPF: ${form.cpf}\nEndereço: ${form.endereco}\nComplemento: ${form.complemento}\nCidade: ${form.cidade}\nUF: ${form.uf}\nCEP: ${form.cep}\n`;
    msg += `\nForma de pagamento: ${
      pagamento === "pix" ? "Pix" : "Transferência"
    }\n`;
    setMensagem(msg);
    toast.success("Mensagem gerada com sucesso!");
  }

  function enviarWhatsApp() {
    const numero = dadosLoja.socialMedia.whats.replace(/\D/g, "");
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, "_blank");
  }

  // Preenche automaticamente a mensagem quando todos os campos do form estão preenchidos
  useEffect(() => {
    const todosPreenchidos = Object.values(form).every(
      (v) => v && v.trim() !== ""
    );
    if (todosPreenchidos && itens.length > 0) {
      let msg = `Olá, gostaria de encomendar:\n\n`;
      itens.forEach((item, idx) => {
        msg += `${idx + 1}. ${item.produto.titulo}`;
        if (item.corSelecionada?.nome) msg += ` (${item.corSelecionada.nome})`;
        msg += ` - Qtd: ${item.quantidade} - Valor: ${formatoDoPreco(
          item.produto.preco
        )}\n`;
      });
      msg += `\nTotal: ${formatoDoPreco(total)}\n\n`;
      msg += `Dados para envio:\nNome: ${form.nome}\nCPF: ${form.cpf}\nEndereço: ${form.endereco}\nComplemento: ${form.complemento}\nCidade: ${form.cidade}\nUF: ${form.uf}\nCEP: ${form.cep}\n`;
      msg += `\nForma de pagamento: ${
        pagamento === "pix" ? "Pix" : "Transferência"
      }\n`;
      setMensagem(msg);
    }
  }, [form, itens, total, pagamento, setMensagem]);

  return (
    <>
      <h2 className="text-xl font-bold mb-4 mt-4">Mensagem para WhatsApp</h2>
      <textarea
        className="w-full border rounded p-2 mb-2 font-mono leading-relaxed"
        rows={8}
        value={mensagem}
        onChange={(e) => setMensagem(e.target.value)}
        style={{ whiteSpace: "pre-line" }}
      />
      <div className="flex items-center gap-3 mb-8">
        <button
          className="btn bg-green-600 text-white cursor-pointer"
          onClick={enviarWhatsApp}
          disabled={!mensagem.trim()}
          title="Finalizar compra no chat do WhatsApp"
        >
          Finalizar compra (via WhatsApp)
        </button>
        <span className="text-sm text-gray-600">
          Ao clicar no botão ao lado, você será redirecionado para o WhatsApp da
          Spinning com todos os dados do seu pedido preenchidos.
        </span>
      </div>
      <div className="flex items-center gap-1">
        <p className="text-sm text-gray-500">
          A mensagem não foi gerada automaticamente? Clique{" "}
        </p>
        <button className="btn-carrinho-gera-mensagem" onClick={gerarMensagem}>
          aqui.
        </button>
      </div>
    </>
  );
}

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
  erros, // <-- Adicione esta prop ao chamar o componente!
}: GeradorMensagemCarrinhoProps & { erros: { [k: string]: string | null } }) {
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

  // Preenche automaticamente a mensagem apenas se todos os campos obrigatórios estiverem preenchidos e sem erro
  useEffect(() => {
    // Campos obrigatórios (exceto complemento)
    const obrigatorios = ["nome", "cpf", "endereco", "cidade", "uf", "cep"];
    const todosPreenchidos = obrigatorios.every(
      (campo) => form[campo] && form[campo].trim() !== ""
    );
    const semErros = obrigatorios.every(
      (campo) => !erros[campo]
    );
    if (todosPreenchidos && semErros && itens.length > 0) {
      gerarMensagem();
    }
    // eslint-disable-next-line
  }, [form, itens, total, pagamento, erros]);

  return (
    <>
      <h2 className="text-xl font-bold mb-4 mt-4">Mensagem para WhatsApp</h2>
      <textarea
        className="w-full border rounded p-2 mb-2 font-mono leading-relaxed dark:bg-[#3c3c3c]"
        rows={8}
        value={mensagem}
        onChange={(e) => setMensagem(e.target.value)}
        style={{ whiteSpace: "pre-line", borderColor: "#d9a76b" }} // amarelo
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

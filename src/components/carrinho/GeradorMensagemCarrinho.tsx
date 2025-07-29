import dadosLoja from "../../utils/DadosSpinning";
import { formatoDoPreco } from "../../utils/formataPreco";
import { extrairNumeroTelefone } from "../../utils/telefone";
import { ItemCarrinho } from "../../context/CarrinhoContext";
import { toast } from "react-toastify";
import { useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

// Constante para campos obrigatórios
const CAMPOS_OBRIGATORIOS = [
  "nome",
  "cpf",
  "endereco",
  "cidade",
  "uf",
  "cep",
  "celular",
  "numero",
];

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
    celular: string;
    numero: string;
  };
  pagamento: "pix" | "transferencia";
  mensagem: string;
  setMensagem: (msg: string) => void;
  erros: { [k: string]: string | null };
}

export default function GeradorMensagemCarrinho({
  itens,
  total,
  form,
  pagamento,
  mensagem,
  setMensagem,
  erros,
}: GeradorMensagemCarrinhoProps) {
  const gerarMensagem = useCallback(() => {
    let msg = `Olá, gostaria de encomendar:\n\n`;
    itens.forEach((item, idx) => {
      msg += `${idx + 1}. ${item.produto.titulo}`;
      if (item.corSelecionada?.nome) msg += ` (${item.corSelecionada.nome})`;
      msg += ` - Qtd: ${item.quantidade} - Valor: ${formatoDoPreco(
        item.produto.preco ?? 0
      )}\n`;
    });
    msg += `\nTotal: ${formatoDoPreco(total)}\n\n`;
    msg += `Dados para envio:\nNome: ${form.nome}\nCPF: ${form.cpf}\nCelular: ${form.celular}\nEndereço: ${form.endereco}, ${form.numero}\nComplemento: ${form.complemento}\nCidade: ${form.cidade}\nUF: ${form.uf}\nCEP: ${form.cep}\n`;
    msg += `\nForma de pagamento: ${
      pagamento === "pix" ? "Pix" : "Transferência"
    }\n`;
    setMensagem(msg);
    toast.success("Mensagem gerada com sucesso!");
  }, [itens, total, form, pagamento, setMensagem]);

  function enviarWhatsApp() {
    const numero = extrairNumeroTelefone(dadosLoja.socialMedia.whats);
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, "_blank");
  }

  useEffect(() => {
    const todosPreenchidos = CAMPOS_OBRIGATORIOS.every(
      (campo) => form[campo as keyof typeof form] && form[campo as keyof typeof form].trim() !== ""
    );
    const semErros = CAMPOS_OBRIGATORIOS.every((campo) => !erros[campo]);
    if (todosPreenchidos && semErros && itens.length > 0) {
      gerarMensagem();
    }
  }, [form, itens, total, pagamento, erros, gerarMensagem]);

  return (
    <>
      <h2 className="text-xl font-bold mb-4 mt-4">Mensagem para WhatsApp</h2>
      <textarea
        className="w-full border rounded p-2 mb-2 font-mono leading-relaxed dark:bg-[#3c3c3c]"
        rows={8}
        value={mensagem}
        onChange={(e) => setMensagem(e.target.value)}
        style={{ whiteSpace: "pre-line", borderColor: "#d9a76b" }}
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
          Ao clicar no botão ao lado, você será redirecionado para o WhatsApp da Spinning com todos os dados do seu pedido preenchidos.
          <p className="text-gray-600 dark:text-white">
          Dúvida de como realizar a compra?{" "}
          <Link to="/faq" className="text-blue-500 hover:underline font-medium">
            Clique aqui!
          </Link>
        </p>
        </span>
      </div>
      <div className="flex items-center gap-1">
        <span className="text-sm text-gray-500">
          A mensagem não foi gerada automaticamente?{" "}
        </span>
        <button className="btn-carrinho-gera-mensagem" onClick={gerarMensagem}>
          Clique aqui.
        </button>
      </div>
    </>
  );
}

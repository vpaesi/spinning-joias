import { useState } from "react";
import { Produto, Cor } from "../hooks/useProdutos";
import { useCarrinho } from "../context/CarrinhoContext";
import ModalSelecionaCor from "./ModalSelecionaCor";
import { toast } from "react-toastify";

export default function BtnAddCarrinho({ produto, className = "" }: { produto: Produto; className?: string }) {
  const { adicionar } = useCarrinho();
  const [modal, setModal] = useState(false);

  function handleAdd(cor?: Cor) {
    adicionar(produto, cor, 1);
    setModal(false);
    toast.success("Produto adicionado ao carrinho!");
    // Não faz navigate!
  }

  if (produto.cores && produto.cores.length > 0) {
    return (
      <>
        <button
          className={`bg-yellow-700 text-white rounded px-3 py-1 hover:bg-yellow-800 transition flex items-center gap-1 ${className}`}
          onClick={() => setModal(true)}
          type="button"
        >
          <i className="bi bi-bag-plus"></i> Carrinho
        </button>
        {modal && (
          <ModalSelecionaCor
            produto={produto}
            onClose={() => setModal(false)}
            onSelecionar={handleAdd}
          />
        )}
      </>
    );
  }
  return (
    <button
      className={`text-white rounded px-3 py-1 transition flex items-center gap-3 ${className}`}
      onClick={() => handleAdd()}
      type="button"
    >
      <i className="bi bi-bag-plus"></i> Carrinho
    </button>
  );
}
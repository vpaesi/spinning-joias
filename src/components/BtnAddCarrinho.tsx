import { useState } from "react";
import { Produto, Cor } from "../hooks/useProdutos";
import { useCarrinho } from "../context/CarrinhoContext";
import ModalSelecionaCor from "./ModalSelecionaCor";
import { toast } from "react-toastify";

export default function BtnAddCarrinho({
  produto,
  className = "",
}: {
  produto: Produto;
  className?: string;
}) {
  const { adicionar } = useCarrinho();
  const [modal, setModal] = useState(false);

  const addCarrinhoBtn = (className: string, setModal: () => void) => {
    return (
      <button
        className={`flex justify-center bg-yellow-700 text-white rounded py-1 hover:bg-yellow-800 transition gap-1 ${className}`}
        onClick={setModal}
        type="button"
      >
        Adicionar ao Carrinho
      </button>
    );
  };

  function handleAdd(cor?: Cor) {
    adicionar(produto, cor, 1);
    setModal(false);
    toast.success("Produto adicionado ao carrinho!");
  }

  if (produto.cores && produto.cores.length > 0) {
    return (
      <>
        {addCarrinhoBtn(className, () => setModal(true))}
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
  return addCarrinhoBtn(className, () => handleAdd(undefined));
}

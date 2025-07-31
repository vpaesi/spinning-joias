import { useState } from "react";
import { toast } from "react-toastify";
import { Produto, Cor } from "../../hooks/useProdutos";
import { useCarrinho } from "../../context/CarrinhoContext";
import ModalSelecionaCor from "./../produto/ModalSelecionaCor";
import { clampQuantity } from "../../utils/validacoes";

export default function BtnAddCarrinho({
  produto,
  className = "",
}: {
  produto: Produto;
  className?: string;
}) {
  const { adicionar } = useCarrinho();
  const [modal, setModal] = useState(false);
  const [quantidade, setQuantidade] = useState(1);

  const addCarrinhoBtn = (className: string, setModal: () => void) => (
    <div className="flex items-center gap-4">
      <label className="flex items-center gap-2">
        <span className="text-sm font-medium">Qtd:</span>
        <input
          type="number"
          min="1"
          max="10"
          value={quantidade}
          onChange={(e) =>
            setQuantidade(clampQuantity(Number(e.target.value)))
          }
          className="w-16 px-2 py-1 border rounded text-center dark:text-black"
        />
      </label>
      <button
        className={`flex justify-center bg-yellow-700 text-white rounded py-1 hover:bg-yellow-800 transition gap-1 ${className}`}
        onClick={setModal}
        type="button"
      >
        Adicionar ao Carrinho
      </button>
    </div>
  );

  function handleAdd(cor?: Cor) {
    adicionar(produto, cor, quantidade);
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

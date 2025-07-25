import { Produto, Cor } from "../hooks/useProdutos";

export default function ModalSelecionaCor({
  produto,
  onClose,
  onSelecionar,
}: {
  produto: Produto;
  onClose: () => void;
  onSelecionar: (cor: Cor) => void;
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-[9999] flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 shadow-lg min-w-[320px]">
        <h3 className="text-xl font-bold mb-4">{produto.titulo}</h3>
        <h3 className="text-lg font-bold mt-4 mb-4">
          Selecione a cor/variação:
        </h3>
        <div className="flex gap-4 flex-wrap">
          {produto.cores?.map((cor, idx) => (
            <button
              key={idx}
              className="btn-modal-selecao-cor flex flex-col items-center gap-1 border rounded p-2 opacity-90"
              onClick={() => onSelecionar(cor)}
            >
              {cor.fotoCor?.[0] && (
                <img
                  src={cor.fotoCor[0]}
                  alt={cor.nome}
                  className="w-12 h-12 object-cover rounded"
                />
              )}
              <span className="">{cor.nome || "Variação"}</span>
            </button>
          ))}
        </div>
        <button
          className="mt-6 px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          onClick={onClose}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}

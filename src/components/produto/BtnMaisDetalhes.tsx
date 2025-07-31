export default function BtnMaisDetalhes(onDetalhes: () => void) {
  return (
    <button
      className="flex justify-center bg-yellow-700 text-white rounded px-3 py-1 hover:bg-yellow-800 transition flex-1"
      onClick={onDetalhes}
      type="button"
    >
      Ver produto
    </button>
  );
}

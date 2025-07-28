interface PaginacaoBotaoProps {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
}

export default function PaginacaoBotao({
  page,
  setPage,
  totalPages,
}: PaginacaoBotaoProps) {
  if (totalPages <= 1) return null;
  return (
    <>
      <div className="flex gap-1 items-center mt-1">
        <button
          className="px-2 py-1 rounded border bg-white hover:bg-yellow-100"
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
        >
          &lt;
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={`px-2 py-1 rounded border ${
              page === i + 1 ? "bg-yellow-200 font-bold" : "bg-white"
            } hover:bg-yellow-100`}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          className="px-2 py-1 rounded border bg-white hover:bg-yellow-100"
          disabled={page >= totalPages}
          onClick={() => setPage(page + 1)}
        >
          &gt;
        </button>
      </div>
      <div className="text-gray-700 text-sm mt-1">
        Página {page} de {totalPages}
      </div>
    </>
  );
}

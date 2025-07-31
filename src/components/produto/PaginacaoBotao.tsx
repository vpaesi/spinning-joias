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
    <div className="flex justify-center items-center gap-2 my-4">
      <div className="flex gap-1 items-center mt-1">
        <button
          className="btn-paginacao px-2 py-1 rounded border"
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
        >
          &lt; Página anterior
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={`px-2 py-1 rounded border ${
              page === i + 1
                ? "font-bold btn-pagina-atual"
                : "btn-pagina-nao-atual"
            }`}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          className="btn-paginacao px-2 py-1 rounded border"
          disabled={page >= totalPages}
          onClick={() => setPage(page + 1)}
        >
          Próxima página &gt;
        </button>
      </div>
    </div>
  );
}

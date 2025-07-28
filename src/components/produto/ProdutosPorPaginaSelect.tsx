interface ProdutosPorPaginaSelectProps {
  pageSize: number;
  setPageSize: (size: number) => void;
  setPage: (page: number) => void;
}

const PAGE_OPTIONS = [8, 16, 24, 32, 40, 48];

export default function ProdutosPorPaginaSelect({
  pageSize,
  setPageSize,
  setPage,
}: ProdutosPorPaginaSelectProps) {
  return (
    <div className="flex flex-wrap gap-2 items-center px-0 mt-4">
      <span className="hidden sm:inline text-base md:text-lg font-semibold whitespace-nowrap text-black dark:text-white">
        Produtos por página:
      </span>
      <select
        className="px-4 py-2 rounded border border-[#d9a76b] bg-white hover:bg-yellow-100 font-semibold cursor-pointer"
        value={pageSize}
        onChange={(e) => {
          setPageSize(Number(e.target.value));
          setPage(1);
        }}
      >
        {PAGE_OPTIONS.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
        <option value={0}>Todos</option>
      </select>
    </div>
  );
}

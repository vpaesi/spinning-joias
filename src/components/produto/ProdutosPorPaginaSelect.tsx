import { PAGE_SIZE_OPTIONS } from "../../utils/constants";

interface ProdutosPorPaginaSelectProps {
  pageSize: number;
  setPageSize: (size: number) => void;
  setPage: (page: number) => void;
  totalProdutos: number;
}

export default function ProdutosPorPaginaSelect({
  pageSize,
  setPageSize,
  setPage,
  totalProdutos,
}: ProdutosPorPaginaSelectProps) {
  if (totalProdutos <= 0) return null;

  const effectivePageSize =
    pageSize === 0 ? totalProdutos : Math.min(pageSize, totalProdutos);
  const pageSizeOptions = PAGE_SIZE_OPTIONS.filter(
    (size) => size <= totalProdutos
  );

  if (!pageSizeOptions.includes(effectivePageSize)) {
    pageSizeOptions.push(effectivePageSize);
    pageSizeOptions.sort((a, b) => a - b);
  }

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="pageSize" className="text-sm font-medium">
        Produtos por página:
      </label>
      <select
        id="pageSize"
        value={effectivePageSize}
        onChange={(e) => {
          setPageSize(Number(e.target.value));
          setPage(1);
        }}
        className="border rounded px-2 py-1 text-sm dark:bg-gray-800 dark:border-gray-600"
      >
        {pageSizeOptions.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
    </div>
  );
}

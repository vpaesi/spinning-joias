import { PAGE_SIZE_OPTIONS } from "../../utils/constants";

interface ProdutosPorPaginaSelectProps {
  pageSize: number;
  setPageSize: (size: number) => void;
  setPage: (page: number) => void;
}

export default function ProdutosPorPaginaSelect({
  pageSize,
  setPageSize,
  setPage,
}: ProdutosPorPaginaSelectProps) {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="pageSize" className="text-sm font-medium">
        Produtos por página:
      </label>
      <select
        id="pageSize"
        value={pageSize}
        onChange={(e) => {
          setPageSize(Number(e.target.value));
          setPage(1);
        }}
        className="border rounded px-2 py-1 text-sm dark:bg-gray-800 dark:border-gray-600"
      >
        {PAGE_SIZE_OPTIONS.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
    </div>
  );
}

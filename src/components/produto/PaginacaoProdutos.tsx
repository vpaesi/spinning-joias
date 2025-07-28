import ProdutosPorPaginaSelect from "./ProdutosPorPaginaSelect";
import PaginacaoBotao from "./PaginacaoBotao";
import TextoMostrandoProdutos from "./TextoMostrandoProdutos";

interface PaginacaoProdutosProps {
  page: number;
  setPage: (page: number) => void;
  pageSize: number;
  setPageSize: (size: number) => void;
  total: number;
}

export default function PaginacaoProdutos({
  page,
  setPage,
  pageSize,
  setPageSize,
  total,
}: PaginacaoProdutosProps) {
  const totalPages = pageSize === 0 ? 1 : Math.ceil(total / pageSize);

  return (
    <div className="flex flex-col items-center gap-2 mb-2">
      <ProdutosPorPaginaSelect
        pageSize={pageSize}
        setPageSize={setPageSize}
        setPage={setPage}
      />
      {pageSize !== 0 && (
        <PaginacaoBotao page={page} setPage={setPage} totalPages={totalPages} />
      )}
      <TextoMostrandoProdutos page={page} pageSize={pageSize} total={total} />
    </div>
  );
}

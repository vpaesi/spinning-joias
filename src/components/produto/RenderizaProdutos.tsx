import { Produto } from "../../hooks/useProdutos";
import ListaProdutos from "./ListaProdutos";
import CarrosselProdutos from "./CarrosselProdutos";
import PaginacaoBotao from "./PaginacaoBotao";
import TextoMostrandoProdutos from "./TextoMostrandoProdutos";

interface RenderizaProdutosProps {
  produtos: Produto[];
  loading: boolean;
  erro: string | null;
  carrossel?: boolean;
  page: number;
  setPage: (page: number) => void;
  pageSize: number;
  setPageSize: (size: number) => void;
}

function RenderizaProdutos({
  produtos,
  loading,
  erro,
  carrossel = false,
  page,
  setPage,
  pageSize,
}: RenderizaProdutosProps) {
  const totalPages = pageSize === 0 ? 1 : Math.ceil(produtos.length / pageSize);

  if (loading) return <div>Carregando...</div>;
  if (erro) return <div>{erro}</div>;

  const produtosPagina =
    pageSize === 0
      ? produtos
      : produtos.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="bg-gray-50">
      {carrossel ? (
        <CarrosselProdutos produtos={produtos} />
      ) : (
        <>
          <ListaProdutos
            produtosFiltrados={produtosPagina}
            page={page}
            PAGE_SIZE={pageSize === 0 ? produtos.length : pageSize}
          />
          {pageSize !== 0 && (
            <PaginacaoBotao
              page={page}
              setPage={setPage}
              totalPages={totalPages}
            />
          )}
          <TextoMostrandoProdutos
            page={page}
            pageSize={pageSize}
            total={produtos.length}
          />
        </>
      )}
      <style>{`
        .animate-fadein { animation: fadein 0.5s; }
        @keyframes fadein { from { opacity: 0; } to { opacity: 1; } }
        .loader-spinner {
          border: 4px solid #f3f3f3;
          border-top: 4px solid #D9A76B;
          border-radius: 50%;
          width: 28px;
          height: 28px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

export default RenderizaProdutos;

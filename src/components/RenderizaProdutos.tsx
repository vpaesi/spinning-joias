import { useState, useEffect, useRef } from "react";
import { Produto } from "../hooks/useProdutos";
import ModalProduto from "./ModalProduto";
import ListaProdutos from "./ListaProdutos";
import CarrosselProdutos from "./CarrosselProdutos";

const PAGE_SIZE = 8;

interface RenderizaProdutosProps {
  produtos: Produto[];
  loading: boolean;
  erro: string | null;
  carrossel?: boolean;
}
function RenderizaProdutos({
  produtos,
  loading,
  erro,
  carrossel = false,
}: RenderizaProdutosProps) {
  // UI state only
  const [page, setPage] = useState(1);
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(
    null
  );
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!carrossel) {
      function onScroll() {
        const reachedBottom =
          window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 400;
        const hasMore = page * PAGE_SIZE < produtos.length;
        if (reachedBottom && hasMore && !isLoadingMore) {
          setIsLoadingMore(true);
        }
      }
      window.addEventListener("scroll", onScroll);
      return () => {
        window.removeEventListener("scroll", onScroll);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }
  }, [produtos.length, carrossel, isLoadingMore, page]);

  // Efeito para simular carregamento e liberar o próximo lote
  useEffect(() => {
    if (isLoadingMore) {
      const hasMore = page * PAGE_SIZE < produtos.length;
      if (hasMore) {
        timeoutRef.current = setTimeout(() => {
          setPage((prev) => prev + 1);
          setIsLoadingMore(false);
        }, 600);
      } else {
        setIsLoadingMore(false);
      }
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isLoadingMore, page, produtos.length]);

  const abrirModal = (produto: Produto) => setProdutoSelecionado(produto);
  const fecharModal = () => setProdutoSelecionado(null);

  if (loading) return <div>Carregando...</div>;
  if (erro) return <div>{erro}</div>;

  return (
    <div className="bg-gray-50">
      {carrossel ? (
        <CarrosselProdutos produtos={produtos} onProdutoClick={abrirModal} />
      ) : (
        <>
          <ListaProdutos
            produtosFiltrados={produtos}
            page={page}
            PAGE_SIZE={PAGE_SIZE}
            abrirModal={abrirModal}
          />
          <div className="w-full flex justify-center my-4 text-gray-700 text-sm bg-white">
            {(() => {
              const total = produtos.length;
              const mostrados = Math.min(page * PAGE_SIZE, total);
              return `Mostrando ${mostrados} de ${total} produtos encontrados`;
            })()}
          </div>
          {isLoadingMore && (page - 1) * PAGE_SIZE < produtos.length && (
            <div className="flex justify-center items-center py-6 animate-fadein">
              <div className="loader-spinner mr-2"></div>
              <span className="text-yellow-700 font-medium">
                Carregando produtos...
              </span>
            </div>
          )}
        </>
      )}
      <ModalProduto produto={produtoSelecionado} fecharModal={fecharModal} />
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

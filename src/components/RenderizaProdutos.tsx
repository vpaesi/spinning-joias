import { useState, useEffect } from "react";
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
  carrossel = false
}: RenderizaProdutosProps) {
  const [page, setPage] = useState(1);
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(
    null
  );

  useEffect(() => {
    if (!carrossel) {
      function onScroll() {
        if (
          window.innerHeight + window.scrollY >=
            document.body.offsetHeight - 2 &&
          page * PAGE_SIZE < produtos.length
        ) {
          setPage((prev) => prev + 1);
        }
      }
      window.addEventListener("scroll", onScroll);
      return () => window.removeEventListener("scroll", onScroll);
    }
  }, [page, produtos.length, carrossel]);

  function abrirModal(produto: Produto) {
    setProdutoSelecionado(produto);
  }

  function fecharModal() {
    setProdutoSelecionado(null);
  }

  if (loading) return <div>Carregando...</div>;
  if (erro) return <div>{erro}</div>;

  return (
    <div className="bg-gray-50">
      {carrossel ? (
        <CarrosselProdutos produtos={produtos} onProdutoClick={abrirModal} />
      ) : (
        <ListaProdutos
          produtosFiltrados={produtos}
          page={page}
          PAGE_SIZE={PAGE_SIZE}
          abrirModal={abrirModal}
        />
      )}
      <ModalProduto produto={produtoSelecionado} fecharModal={fecharModal} />
    </div>
  );
}

export default RenderizaProdutos;

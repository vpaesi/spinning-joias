import { useState } from "react";
import { Produto } from "../hooks/useProdutos";
import HeroSection from "../components/home/HeroSection";
import RenderizaProdutos from "../components/produto/RenderizaProdutos";
import Filter from "../components/home/Filter";
import NavProdutosPrincipais from "../components/home/NavProdutosPrincipais";
import Letreiro from "../components/home/Letreiro";
import ProdutosPorPaginaSelect from "../components/produto/ProdutosPorPaginaSelect";

interface HomeProps {
  produtosFiltrados: Produto[];
  loading: boolean;
  erro: string | null;
  produtos: Produto[];
  termoBusca: string;
  categoriaSelecionada: string;
  ordemAlfabetica: "none" | "asc" | "desc";
  ordemPreco: "none" | "asc" | "desc";
  onCategoriaChange: (categoria: string) => void;
  onOrdemAlfabeticaChange: (ordem: "none" | "asc" | "desc") => void;
  onOrdemPrecoChange: (ordem: "none" | "asc" | "desc") => void;
}

function Home({
  produtosFiltrados,
  loading,
  erro,
  produtos,
  termoBusca,
  categoriaSelecionada,
  ordemAlfabetica,
  ordemPreco,
  onCategoriaChange,
  onOrdemAlfabeticaChange,
  onOrdemPrecoChange,
}: HomeProps) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  const exibeCarrossel =
    !termoBusca && (!categoriaSelecionada || categoriaSelecionada === "todos");

  let tituloLista = "Todos os produtos";
  if (termoBusca) {
    tituloLista = `Resultado da pesquisa por: "${termoBusca}"`;
  } else if (categoriaSelecionada && categoriaSelecionada !== "todos") {
    tituloLista = categoriaSelecionada;
  }

  return (
    <>
      <NavProdutosPrincipais onCategoriaSelect={onCategoriaChange} />
      {exibeCarrossel && <HeroSection />}
      {exibeCarrossel && <Letreiro />}
      {exibeCarrossel && (
        <RenderizaProdutos
          produtos={produtos}
          loading={loading}
          erro={erro}
          carrossel={true}
          page={0}
          setPage={function (page: number): void {
            throw new Error("Function not implemented.");
          }}
          pageSize={0}
          setPageSize={function (size: number): void {
            throw new Error("Function not implemented.");
          }}
        />
      )}
      <hr className="border-t border-yellow-500" />
      <div className="w-full flex flex-col gap-1 mt-8 mb-4">
        <h2
          id="lista-colecao"
          className="text-2xl md:text-2xl text-center w-full max-w-2xl mx-auto"
        >
          {tituloLista}
        </h2>
        <Filter
          categoriaSelecionada={categoriaSelecionada}
          todasCategorias={[...new Set(produtos.map((p) => p.categoria))]}
          ordemAlfabetica={ordemAlfabetica}
          ordemPreco={ordemPreco}
          onCategoriaChange={onCategoriaChange}
          onOrdemAlfabeticaChange={onOrdemAlfabeticaChange}
          onOrdemPrecoChange={onOrdemPrecoChange}
          pageSize={pageSize}
          setPageSize={setPageSize}
          setPage={setPage}
        />
      </div>
      <RenderizaProdutos
        produtos={produtosFiltrados}
        loading={loading}
        erro={erro}
        page={page}
        setPage={setPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />
    </>
  );
}

export default Home;

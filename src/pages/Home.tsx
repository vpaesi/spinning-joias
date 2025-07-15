import { useState, useEffect } from "react";
import { useProdutos, Produto } from "../hooks/useProdutos";
import HeroSection from "../components/HeroSection";
import RenderizaProdutos from "../components/RenderizaProdutos";
import Filter from "../components/Filter";
import NavProdutosPrincipais from "../components/NavProdutosPrincipais";

function Home() {
  const { produtos, loading, erro } = useProdutos();

  const [produtosBusca, setProdutosBusca] = useState<Produto[]>(produtos);
  const [produtosFiltrados, setProdutosFiltrados] =
    useState<Produto[]>(produtos);
  const [categoriaSelecionada, setCategoriaSelecionada] =
    useState<string>("todos");

  useEffect(() => {
    setProdutosBusca(produtos);
    setProdutosFiltrados(produtos);
  }, [produtos]);

  // Função para selecionar categoria (menu/nav)
  function handleCategoriaMenu(categoria: string) {
    setCategoriaSelecionada(categoria);
    const filtrados =
      categoria === "todos"
        ? produtos
        : produtos.filter(
            (p) => p.categoria.toLowerCase() === categoria.toLowerCase()
          );
    setProdutosBusca(filtrados);
    setProdutosFiltrados(filtrados);
  }

  // Função para selecionar categoria pelo Filter
  function handleFilterResult(resultados: Produto[], categoria: string) {
    setProdutosFiltrados(resultados);
    setCategoriaSelecionada(categoria);
  }

  function handleSearchResult(resultados: Produto[], termo: string) {
    setProdutosBusca(resultados);
    setProdutosFiltrados(resultados);
    setPesquisa(termo);
    setCategoria("todos");
    setPrecoOrdem("");
  }

  return (
    <>
      <NavProdutosPrincipais onCategoriaSelect={handleCategoriaMenu} />
      <HeroSection />
      <h2 className="bg-yellow-100 py-2 text-center text-yellow-800 font-semibold">
        Entregamos em todo território brasileiro
      </h2>
      <RenderizaProdutos
        produtos={produtosFiltrados}
        loading={loading}
        erro={erro}
        categoriaSelecionada={categoriaSelecionada}
        carrossel={true} // ou false para lista normal
      />
      <Filter
        produtos={produtosBusca}
        categoriaSelecionada={categoriaSelecionada}
        onFilterResult={handleFilterResult}
      />
      <h2 id="lista-colecao" className="py-2 text-center font-semibold">
        {categoriaSelecionada && categoriaSelecionada !== "todos"
          ? categoriaSelecionada
          : "Todos os produtos"}
      </h2>
      <RenderizaProdutos
        produtos={produtosFiltrados}
        loading={loading}
        erro={erro}
        categoriaSelecionada={categoriaSelecionada}
      />
    </>
  );
}

export default Home;

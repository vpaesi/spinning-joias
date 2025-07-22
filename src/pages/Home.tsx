import { Produto } from "../hooks/useProdutos";
import HeroSection from "../components/HeroSection";
import RenderizaProdutos from "../components/RenderizaProdutos";
import Filter from "../components/Filter";
import NavProdutosPrincipais from "../components/NavProdutosPrincipais";

interface HomeProps {
  produtosFiltrados: Produto[];
  loading: boolean;
  erro: string | null;
  categoriaSelecionada: string;
  setProdutosFiltrados: (produtos: Produto[]) => void;
  setCategoriaSelecionada: (categoria: string) => void;
  produtosBusca: Produto[];
  setProdutosBusca: (produtos: Produto[]) => void;
  produtos: Produto[];
  termoBusca: string;
}

function Home({
  produtosFiltrados,
  loading,
  erro,
  categoriaSelecionada,
  setProdutosFiltrados,
  setCategoriaSelecionada,
  produtosBusca,
  setProdutosBusca,
  produtos,
  termoBusca,
}: HomeProps) {
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
  // Exibir carrossel e hero só se não houver busca nem filtro
  const exibeCarrossel = !termoBusca && (!categoriaSelecionada || categoriaSelecionada === "todos");

  let tituloLista = "Todos os produtos";
  if (termoBusca) {
    tituloLista = `Resultado da pesquisa por: "${termoBusca}"`;
  } else if (categoriaSelecionada && categoriaSelecionada !== "todos") {
    tituloLista = categoriaSelecionada;
  }

  return (
    <>
      <NavProdutosPrincipais onCategoriaSelect={handleCategoriaMenu} />
      {exibeCarrossel && <HeroSection />}
      {exibeCarrossel && (
        <h2
          className="py-2 text-center text-yellow-800 font-semibold"
          style={{
            backgroundColor: "#D9A76B",
            color: "#fff",
            border: "none",
            padding: "0.5rem 1.5rem",
            fontWeight: 500,
            transition: "background 0.2s",
          }}
        >
          Entregamos em todo território brasileiro!
        </h2>
      )}
      {exibeCarrossel && (
        <RenderizaProdutos
          produtos={produtosFiltrados}
          loading={loading}
          erro={erro}
          categoriaSelecionada={categoriaSelecionada}
          carrossel={true}
        />
      )}
      <div className="w-full flex flex-col gap-1 mt-8 mb-4">
        <h2
          id="lista-colecao"
          className="text-2xl md:text-2xl text-center w-full max-w-2xl mx-auto"
        >
          {tituloLista}
        </h2>
        <div className="flex-1 flex justify-start px-16">
          <Filter
            produtos={produtos}
            categoriaSelecionada={categoriaSelecionada}
            onFilterResult={handleFilterResult}
            todasCategorias={[...new Set(produtos.map((p) => p.categoria))]}
          />
        </div>
      </div>
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

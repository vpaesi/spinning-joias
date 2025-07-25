import { Produto } from "../hooks/useProdutos";
import HeroSection from "../components/HeroSection";
import RenderizaProdutos from "../components/RenderizaProdutos";
import Filter from "../components/Filter";
import NavProdutosPrincipais from "../components/NavProdutosPrincipais";
import Letreiro from "../components/Letreiro";

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
        <div className="flex-1 flex justify-start px-16">
          <Filter
            categoriaSelecionada={categoriaSelecionada}
            todasCategorias={[...new Set(produtos.map((p) => p.categoria))]}
            ordemAlfabetica={ordemAlfabetica}
            ordemPreco={ordemPreco}
            onCategoriaChange={onCategoriaChange}
            onOrdemAlfabeticaChange={onOrdemAlfabeticaChange}
            onOrdemPrecoChange={onOrdemPrecoChange}
          />
        </div>
      </div>
      <RenderizaProdutos
        produtos={produtosFiltrados}
        loading={loading}
        erro={erro}
      />
    </>
  );
}

export default Home;

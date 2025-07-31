import { scrollToElement } from "../utils/scrollToElement";
import { padronizaTextoDaPesquisa } from "../utils/padronizaTextoDaPesquisa";
import { Produto } from "../hooks/useProdutos";

interface SearchProps {
  produtos: Produto[];
  onSearchResult: (resultados: Produto[], termo: string) => void;
  valorBusca: string;
  setValorBusca: (valor: string) => void;
}

function Search({
  produtos,
  onSearchResult,
  valorBusca,
  setValorBusca,
}: SearchProps) {
  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const termo = e.target.value;
    setValorBusca(termo);
  }

  function scrollToProdutos() {
    scrollToElement("produtos");
  }

  function handleSubmit(
    e?:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    if (e) e.preventDefault();
    const termo = valorBusca;
    if (!termo) {
      onSearchResult(produtos, "");
      return;
    }
    const consulta = padronizaTextoDaPesquisa(termo);
    const resultados = produtos.filter((produto) => {
      const titulo = padronizaTextoDaPesquisa(produto.titulo);
      const informacoes_extras = padronizaTextoDaPesquisa(
        produto.informacoes_extras || ""
      );
      const descricao = padronizaTextoDaPesquisa(produto.descricao);
      const categoriaProduto = padronizaTextoDaPesquisa(produto.categoria);
      return (
        titulo.includes(consulta) ||
        informacoes_extras.includes(consulta) ||
        descricao.includes(consulta) ||
        categoriaProduto.includes(consulta)
      );
    });
    onSearchResult(resultados, termo);
    scrollToProdutos();
  }

  return (
    <div className="flex justify-center items-center gap-2 mb-2">
      <form
        className="relative w-full md:w-1/2 lg:w-full"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <input
          type="search"
          className="campo-busca border border-yellow-700 rounded px-3 py-2 w-full pr-20"
          placeholder="Buscar produtos..."
          value={valorBusca}
          onChange={handleSearch}
        />
        {valorBusca && (
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 font-semibold rounded shadow transition"
            style={{ zIndex: 2, padding: "0.25rem" }}
            onClick={handleSubmit}
          >
            <i className="bi bi-search"></i>
            Buscar
          </button>
        )}
        {!valorBusca && (
          <i
            className="bi bi-search text-yellow-700 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
            aria-hidden="true"
          ></i>
        )}
      </form>
    </div>
  );
}

export default Search;

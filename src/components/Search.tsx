import { Produto } from "../hooks/useProdutos";

interface SearchProps {
  produtos: Produto[];
  onSearchResult: (resultados: Produto[], termo: string) => void;
}

function padronizaTextoDaPesquisa(text: string) {
  return text
    ? text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    : "";
}

function Search({ produtos, onSearchResult }: SearchProps) {
  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const termo = e.target.value;
    if (!termo) {
      onSearchResult(produtos, "");
      return;
    }
    const consulta = padronizaTextoDaPesquisa(termo);
    const resultados = produtos.filter((produto) => {
      const titulo = padronizaTextoDaPesquisa(produto.titulo);
      const material = padronizaTextoDaPesquisa(produto.material || "");
      const descricao = padronizaTextoDaPesquisa(produto.descricao);
      const categoriaProduto = padronizaTextoDaPesquisa(produto.categoria);
      return (
        titulo.includes(consulta) ||
        material.includes(consulta) ||
        descricao.includes(consulta) ||
        categoriaProduto.includes(consulta)
      );
    });
    onSearchResult(resultados, termo);
  }

  return (
    <div className="flex justify-center items-center gap-2 mb-2">
      <input
        type="search"
        className="border rounded px-3 py-2 w-72"
        placeholder="Pesquise a joia que é a sua cara!"
        onChange={handleSearch}
      />
      <i className="fa fa-search text-yellow-700" aria-hidden="true"></i>
    </div>
  );
}

export default Search;

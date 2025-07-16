import { Produto } from "../hooks/useProdutos";

interface FilterProps {
  produtos: Produto[];
  categoriaSelecionada: string;
  onFilterResult: (resultados: Produto[], categoria: string) => void;
}

function Filter({ produtos, categoriaSelecionada, onFilterResult }: FilterProps) {
  function handleFilter(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const categoria = (form.elements.namedItem("categoria") as HTMLSelectElement).value;
    const precoOrdem = (form.elements.namedItem("precoOrdem") as HTMLSelectElement).value;

    let filtrados = [...produtos];

    if (categoria !== "todos") {
      filtrados = filtrados.filter((produto) => produto.categoria === categoria);
    }

    if (precoOrdem === "menor-maior") {
      filtrados.sort((a, b) => (a.preco ?? 0) - (b.preco ?? 0));
    } else if (precoOrdem === "maior-menor") {
      filtrados.sort((a, b) => (b.preco ?? 0) - (a.preco ?? 0));
    }

    onFilterResult(filtrados, categoria);
  }

  return (
    <form
      className="flex flex-col md:flex-row gap-4 justify-center items-center bg-white py-4"
      onChange={handleFilter}
      onSubmit={e => e.preventDefault()}
    >
      <div>
        <label htmlFor="categoria" className="mr-2 font-semibold">
          Escolha a categoria do produto:
        </label>
        <select
          id="categoria"
          name="categoria"
          className="border rounded px-2 py-1"
          value={categoriaSelecionada}
        >
          <option value="todos">Todos os produtos</option>
          {[...new Set(produtos.map((p) => p.categoria))].map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="precoOrdem" className="mr-2 font-semibold">
          Ordenar por preço:
        </label>
        <select id="precoOrdem" name="precoOrdem" className="border rounded px-2 py-1" defaultValue="">
          <option value="">Selecione</option>
          <option value="menor-maior">Menor para Maior</option>
          <option value="maior-menor">Maior para Menor</option>
        </select>
      </div>
    </form>
  );
}

export default Filter;

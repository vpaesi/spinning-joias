import { useState, useRef, useEffect } from "react";
import { Produto } from "../hooks/useProdutos";

interface FilterProps {
  produtos: Produto[];
  categoriaSelecionada: string;
  onFilterResult: (resultados: Produto[], categoria: string) => void;
}

function Filter({
  produtos,
  categoriaSelecionada,
  onFilterResult,
}: FilterProps) {
  const [open, setOpen] = useState(false);
  const filtroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        filtroRef.current &&
        !filtroRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  function handleFilter(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const categoria = (
      form.elements.namedItem("categoria") as HTMLSelectElement
    ).value;
    const precoOrdem = (
      form.elements.namedItem("precoOrdem") as HTMLSelectElement
    ).value;

    let filtrados = [...produtos];

    if (categoria !== "todos") {
      filtrados = filtrados.filter(
        (produto) => produto.categoria === categoria
      );
    }

    if (precoOrdem === "menor-maior") {
      filtrados.sort((a, b) => (a.preco ?? 0) - (b.preco ?? 0));
    } else if (precoOrdem === "maior-menor") {
      filtrados.sort((a, b) => (b.preco ?? 0) - (a.preco ?? 0));
    }

    onFilterResult(filtrados, categoria);
  }

  return (
    <div
      className="relative flex flex-col items-center justify-center"
      ref={filtroRef}
    >
      <button
        type="button"
        className="btn-filter filtro-label flex items-center gap-2 px-4 py-2 rounded bg-[#b3e0fa] text-black font-semibold shadow hover:bg-[#a0d2ec] transition"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="filtro-modal"
      >
        <span className="filtro-icone">
          <i className="bi bi-funnel"></i>
        </span>
        Filtros
      </button>
      {open && (
        <form
          id="filtro-modal"
          className="filtro-modal absolute z-20 mt-3 left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0"
          style={{ top: "100%", position: "absolute" }}
          onChange={handleFilter}
          onSubmit={(e) => e.preventDefault()}
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
          <div className="mt-4">
            <label htmlFor="precoOrdem" className="mr-2 font-semibold">
              Ordenar por preço:
            </label>
            <select
              id="precoOrdem"
              name="precoOrdem"
              className="border rounded px-2 py-1"
              defaultValue=""
            >
              <option value="">Selecione</option>
              <option value="menor-maior">Menor para Maior</option>
              <option value="maior-menor">Maior para Menor</option>
            </select>
          </div>
        </form>
      )}
    </div>
  );
}

export default Filter;

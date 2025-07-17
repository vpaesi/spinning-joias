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
  const [ordemAlfabetica, setOrdemAlfabetica] = useState<'none' | 'asc' | 'desc'>('none');
  const [ordemPreco, setOrdemPreco] = useState<'none' | 'asc' | 'desc'>('none');
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

    if (ordemPreco === 'asc') {
      filtrados.sort((a, b) => (a.preco ?? 0) - (b.preco ?? 0));
    } else if (ordemPreco === 'desc') {
      filtrados.sort((a, b) => (b.preco ?? 0) - (a.preco ?? 0));
    } else if (ordemPreco === 'none') {
      filtrados = filtrados.sort(() => Math.random() - 0.5);
    }

    if (ordemAlfabetica === 'asc') {
      filtrados.sort((a, b) => a.titulo.localeCompare(b.titulo));
    } else if (ordemAlfabetica === 'desc') {
      filtrados.sort((a, b) => b.titulo.localeCompare(a.titulo));
    } else if (ordemAlfabetica === 'none') {
      filtrados = filtrados.sort(() => Math.random() - 0.5);
    }

    onFilterResult(filtrados, categoria);
    setOpen(false);
  }

  function handleAlfabeticaClick() {
    setOrdemAlfabetica((prev) => {
      if (prev === 'none') return 'asc';
      if (prev === 'asc') return 'desc';
      return 'none';
    });
  }

  function handlePrecoClick() {
    setOrdemPreco((prev) => {
      if (prev === 'none') return 'asc';
      if (prev === 'asc') return 'desc';
      return 'none';
    });
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
          onSubmit={handleFilter}
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
              onChange={handleFilter}
            >
              <option value="todos">Todos os produtos</option>
              {[...new Set(produtos.map((p) => p.categoria))].map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-4 flex justify-center items-center gap-4 w-full">
            <button
              type="button"
              className={`btn-filter-ordem-preco flex items-center gap-1 px-4 py-2 rounded border border-gray-300 shadow text-black text-lg transition font-semibold
                ${ordemPreco === 'none' ? 'bg-[#f7ecd6] hover:bg-[#f7d6a6]' : 'bg-[#D9A76B] hover:bg-[#b88a4a] text-white'}`}
              onClick={() => {
                handlePrecoClick();
                setTimeout(() => setOpen(false), 100);
              }}
              aria-label="Ordenar por preço"
            >
              <span className="font-semibold mr-1">R$</span>
              <span className="flex flex-col">
                <i className={`bi bi-arrow-down ${ordemPreco === 'asc' ? 'text-yellow-700 font-bold' : 'text-gray-400'}`}></i>
                <i className={`bi bi-arrow-up ${ordemPreco === 'desc' ? 'text-yellow-700 font-bold' : 'text-gray-400'}`}></i>
              </span>
            </button>
            <button
              type="button"
              className={`btn-filter-ordem-alfabetica flex items-center gap-1 px-4 py-2 rounded border border-gray-300 shadow text-black text-lg transition font-semibold
                ${ordemAlfabetica === 'none' ? 'bg-[#f7ecd6] hover:bg-[#f7d6a6]' : 'bg-[#D9A76B] hover:bg-[#b88a4a] text-white'}`}
              onClick={() => {
                handleAlfabeticaClick();
                setTimeout(() => setOpen(false), 100);
              }}
              aria-label="Ordenar alfabeticamente"
            >
              <span className="font-semibold mr-1">AZ</span>
              <span className="flex flex-col">
                <i className={`bi bi-arrow-down ${ordemAlfabetica === 'asc' ? 'text-yellow-700 font-bold' : 'text-gray-400'}`}></i>
                <i className={`bi bi-arrow-up ${ordemAlfabetica === 'desc' ? 'text-yellow-700 font-bold' : 'text-gray-400'}`}></i>
              </span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Filter;

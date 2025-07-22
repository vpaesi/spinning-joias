import { useState, useRef, useEffect } from "react";
import { Produto } from "../hooks/useProdutos";

interface FilterProps {
  produtos: Produto[];
  categoriaSelecionada: string;
  onFilterResult: (resultados: Produto[], categoria: string) => void;
  todasCategorias: string[];
}

function Filter({
  produtos,
  categoriaSelecionada,
  onFilterResult,
  todasCategorias,
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

  function filtraEOrdena(categoria: string, ordemPrecoAtual = ordemPreco, ordemAlfabeticaAtual = ordemAlfabetica) {
    let filtrados = [...produtos];
    if (categoria !== "todos") {
      filtrados = filtrados.filter(
        (produto) => produto.categoria === categoria
      );
    }
    // Ordenação combinada
    filtrados.sort((a, b) => {
      // Ordenação por preço
      let precoComp = 0;
      if (ordemPrecoAtual === 'asc') {
        precoComp = (a.preco ?? 0) - (b.preco ?? 0);
      } else if (ordemPrecoAtual === 'desc') {
        precoComp = (b.preco ?? 0) - (a.preco ?? 0);
      }
      // Ordenação por título
      let tituloComp = 0;
      if (ordemAlfabeticaAtual === 'asc') {
        tituloComp = a.titulo.localeCompare(b.titulo);
      } else if (ordemAlfabeticaAtual === 'desc') {
        tituloComp = b.titulo.localeCompare(a.titulo);
      }
      // Se ambos ativos, prioriza preço, depois título
      if (ordemPrecoAtual !== 'none' && ordemAlfabeticaAtual !== 'none') {
        return precoComp !== 0 ? precoComp : tituloComp;
      }
      // Só preço
      if (ordemPrecoAtual !== 'none') return precoComp;
      // Só título
      if (ordemAlfabeticaAtual !== 'none') return tituloComp;
      // Nenhum: ordem aleatória
      return Math.random() - 0.5;
    });
    onFilterResult(filtrados, categoria);
  }

  function handleFilter(e: React.ChangeEvent<HTMLSelectElement>) {
    const categoria = e.target.value;
    filtraEOrdena(categoria);
    setOpen(false);
  }

  function handleAlfabeticaClick() {
    setOrdemAlfabetica((prev) => {
      let next: typeof prev;
      if (prev === 'none') next = 'asc';
      else if (prev === 'asc') next = 'desc';
      else next = 'none';
      // Aplica ordenação imediatamente
      filtraEOrdena(categoriaSelecionada, ordemPreco, next);
      return next;
    });
  }

  function handlePrecoClick() {
    setOrdemPreco((prev) => {
      let next: typeof prev;
      if (prev === 'none') next = 'asc';
      else if (prev === 'asc') next = 'desc';
      else next = 'none';
      // Aplica ordenação imediatamente
      filtraEOrdena(categoriaSelecionada, next, ordemAlfabetica);
      return next;
    });
  }

  return (
    <div className="relative flex flex-row items-center justify-center gap-4" ref={filtroRef}>
      <button
        type="button"
        className={`btn-filter flex items-center gap-2 px-4 py-2 rounded border border-gray-300 shadow text-black text-lg transition font-semibold${open ? ' bg-[#a8743d] text-white' : ' bg-[#f7ecd6] hover:bg-[#f7d6a6]'}`}
        style={{ minHeight: 0, minWidth: 0, height: 'auto' }}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="filtro-modal"
      >
        <span className="filtro-icone" style={{ display: 'flex', alignItems: 'center', fontSize: 20 }}>
          <i className="bi bi-funnel"></i>
        </span>
        Categorias
      </button>

      <label className="text-lg font-semibold">
        Ordenar por:
      </label>
      <button
        type="button"
        className={`btn-filter-ordem-preco flex items-center gap-2 px-4 py-2 rounded border border-gray-300 shadow text-black text-lg transition font-semibold${ordemPreco !== 'none' ? ' bg-[#a8743d] text-white' : ' bg-[#f7ecd6] hover:bg-[#f7d6a6]'}`}
        onClick={handlePrecoClick}
        aria-label="Ordenar por preço"
      >
        <span className="font-semibold">R$</span>
        <span className="flex gap-1 items-center">
          <i className={`bi bi-arrow-down ${ordemPreco === 'asc' ? 'text-yellow-700 font-bold' : 'text-gray-400'}`}></i>
          <i className={`bi bi-arrow-up ${ordemPreco === 'desc' ? 'text-yellow-700 font-bold' : 'text-gray-400'}`}></i>
        </span>
      </button>

      <button
        type="button"
        className={`btn-filter-ordem-alfabetica flex items-center gap-2 px-4 py-2 rounded border border-gray-300 shadow text-black text-lg transition font-semibold${ordemAlfabetica !== 'none' ? ' bg-[#a8743d] text-white' : ' bg-[#f7ecd6] hover:bg-[#f7d6a6]'}`}
        onClick={handleAlfabeticaClick}
        aria-label="Ordenar alfabeticamente"
      >
        <span className="font-semibold">AZ</span>
        <span className="flex gap-1 items-center">
          <i className={`bi bi-arrow-down ${ordemAlfabetica === 'asc' ? 'text-yellow-700 font-bold' : 'text-gray-400'}`}></i>
          <i className={`bi bi-arrow-up ${ordemAlfabetica === 'desc' ? 'text-yellow-700 font-bold' : 'text-gray-400'}`}></i>
        </span>
      </button>

      {open && (
        <form
          id="filtro-modal"
          className="filtro-modal absolute z-20 mt-3 left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0"
          style={{ top: "100%", position: "absolute" }}
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
              {todasCategorias.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </form>
      )}
    </div>
  );
}

export default Filter;

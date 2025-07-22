import { useState, useRef, useEffect } from "react";

interface FilterProps {
  categoriaSelecionada: string;
  todasCategorias: string[];
  ordemAlfabetica: 'none' | 'asc' | 'desc';
  ordemPreco: 'none' | 'asc' | 'desc';
  onCategoriaChange: (categoria: string) => void;
  onOrdemAlfabeticaChange: (ordem: 'none' | 'asc' | 'desc') => void;
  onOrdemPrecoChange: (ordem: 'none' | 'asc' | 'desc') => void;
}

function Filter({
  categoriaSelecionada,
  todasCategorias,
  ordemAlfabetica,
  ordemPreco,
  onCategoriaChange,
  onOrdemAlfabeticaChange,
  onOrdemPrecoChange,
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


  function handleFilter(e: React.ChangeEvent<HTMLSelectElement>) {
    const categoria = e.target.value;
    onCategoriaChange(categoria);
    setOpen(false);
  }

  function handleAlfabeticaClick() {
    let next: typeof ordemAlfabetica;
    if (ordemAlfabetica === 'none') next = 'asc';
    else if (ordemAlfabetica === 'asc') next = 'desc';
    else next = 'none';
    onOrdemAlfabeticaChange(next);
  }

  function handlePrecoClick() {
    let next: typeof ordemPreco;
    if (ordemPreco === 'none') next = 'asc';
    else if (ordemPreco === 'asc') next = 'desc';
    else next = 'none';
    onOrdemPrecoChange(next);
  }

  return (
    <div className="relative flex flex-col md:flex-row items-center justify-center gap-4 w-full">
      <div
        className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 w-full md:w-auto"
        ref={filtroRef}
      >
        <button
          type="button"
          className={`btn-filter flex items-center px-4 py-2 rounded border border-gray-300 shadow text-black text-base md:text-lg transition font-semibold`}
          style={{ minHeight: 0, minWidth: 0, height: 'auto' }}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="filtro-modal"
        >
          <span className="filtro-icone" style={{ display: 'flex', alignItems: 'center', fontSize: 20 }}>
            <i className="bi bi-funnel"></i>
          </span>
          <span className="hidden sm:inline">Categorias</span>
          <span className="inline sm:hidden">Cat.</span>
        </button>

        <label className="text-base md:text-lg font-semibold whitespace-nowrap">
          Ordenar por:
        </label>
        <button
          type="button"
          className={`btn-filter-ordem-preco flex items-center gap-2 px-3 py-2 rounded border border-gray-300 shadow text-black text-base md:text-lg transition font-semibold`}
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
          className={`btn-filter-ordem-alfabetica flex items-center gap-2 px-3 py-2 rounded border border-gray-300 shadow text-black text-base md:text-lg transition font-semibold`}
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
            className="filtro-modal absolute z-20 mt-3 left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 w-[90vw] max-w-xs sm:max-w-sm md:max-w-md"
            style={{ top: "100%", position: "absolute" }}
          >
            <div className="flex flex-col gap-2">
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
      <div className="flex-1 mt-2 md:mt-0"></div>
      <a
        href="/"
        className="btn-pg-inicial ml-0 md:ml-8 flex items-center gap-2 px-4 py-2 rounded border border-gray-300 shadow text-black text-base md:text-lg transition font-semibold"
        style={{ minHeight: 0, minWidth: 0, height: 'auto' }}
        aria-label="Voltar para home"
      >
        <i className="bi bi-house-door"></i>
        <span className="hidden sm:inline">Página inicial</span>
      </a>
    </div>
  );
}

export default Filter;

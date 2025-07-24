import { useState, useRef, useEffect } from "react";

interface FilterProps {
  categoriaSelecionada: string;
  todasCategorias: string[];
  ordemAlfabetica: "none" | "asc" | "desc";
  ordemPreco: "none" | "asc" | "desc";
  onCategoriaChange: (categoria: string) => void;
  onOrdemAlfabeticaChange: (ordem: "none" | "asc" | "desc") => void;
  onOrdemPrecoChange: (ordem: "none" | "asc" | "desc") => void;
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
    if (ordemAlfabetica === "none") next = "asc";
    else if (ordemAlfabetica === "asc") next = "desc";
    else next = "none";
    onOrdemAlfabeticaChange(next);
  }

  function handlePrecoClick() {
    let next: typeof ordemPreco;
    if (ordemPreco === "none") next = "asc";
    else if (ordemPreco === "asc") next = "desc";
    else next = "none";
    onOrdemPrecoChange(next);
  }

  return (
    <div className="relative flex flex-col items-center justify-center gap-4 w-full max-w-full overflow-visible px-4 sm:px-0">
      <div className="btn-filter-container flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
        {/* Grupo de botões principais - esquerda no desktop */}
        <div
          className="flex flex-row items-center gap-2 justify-center sm:justify-start"
          ref={filtroRef}
        >
          <button
            type="button"
            className="btn-filter flex items-center px-2 sm:px-4 py-2 rounded border border-gray-300 shadow text-black dark:text-white bg-white text-sm sm:text-base md:text-lg transition font-semibold hover:bg-gray-50"
            style={{ minHeight: "44px", height: "44px" }}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="filtro-modal"
          >
            <span className="filtro-icone flex items-center" style={{ fontSize: 16 }}>
              <i className="bi bi-funnel"></i>
            </span>
            <span className="ml-2">Categoria</span>
          </button>

          <span className="text-sm sm:text-base md:text-lg font-semibold whitespace-nowrap text-black dark:text-white">
            Ordenar:
          </span>

          <button
            type="button"
            className="btn-filter-ordem-preco flex items-center gap-1 px-2 sm:px-3 py-2 rounded border border-gray-300 shadow text-black bg-white text-sm sm:text-base md:text-lg transition font-semibold hover:bg-gray-50"
            style={{ minHeight: "44px", height: "44px" }}
            onClick={handlePrecoClick}
            aria-label="Ordenar por preço"
          >
            <span className="font-semibold">R$</span>
            <span className="flex gap-1 items-center">
              <i
                className={`bi bi-arrow-down ${
                  ordemPreco === "asc"
                    ? "text-yellow-700 dark:text-yellow-400 font-bold"
                    : "text-gray-400"
                }`}
              ></i>
              <i
                className={`bi bi-arrow-up ${
                  ordemPreco === "desc"
                    ? "text-yellow-700 dark:text-yellow-400 font-bold"
                    : "text-gray-400"
                }`}
              ></i>
            </span>
          </button>

          <button
            type="button"
            className="btn-filter-ordem-alfabetica flex items-center gap-1 px-2 sm:px-3 py-2 rounded border border-gray-300 shadow text-black bg-white text-sm sm:text-base md:text-lg transition font-semibold hover:bg-gray-50"
            style={{ minHeight: "44px", height: "44px" }}
            onClick={handleAlfabeticaClick}
            aria-label="Ordenar alfabeticamente"
          >
            <span className="font-semibold">AZ</span>
            <span className="flex gap-1 items-center">
              <i
                className={`bi bi-arrow-down ${
                  ordemAlfabetica === "asc"
                    ? "text-yellow-700 dark:text-yellow-400 font-bold"
                    : "text-gray-400"
                }`}
              ></i>
              <i
                className={`bi bi-arrow-up ${
                  ordemAlfabetica === "desc"
                    ? "text-yellow-700 dark:text-yellow-400 font-bold"
                    : "text-gray-400"
                }`}
              ></i>
            </span>
          </button>
        </div>

        {/* Botão Página inicial - direita no desktop */}
        <div className="hidden sm:flex justify-end">
          <a
            href="/"
            className="btn-pg-inicial flex items-center gap-2 px-4 py-2 rounded border border-gray-300 shadow text-black dark:text-white bg-white text-base md:text-lg transition font-semibold hover:bg-gray-50"
            style={{ minHeight: "44px", height: "44px" }}
            aria-label="Voltar para home"
          >
            <i className="bi bi-house-door"></i>
            <span>Página inicial</span>
          </a>
        </div>

        {/* Modal */}
        {open && (
          <div
            id="filtro-modal"
            className="fixed inset-0 z-50 flex items-start justify-center pt-20 md:pt-16"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
            onClick={() => setOpen(false)}
          >
            <form
              className="filtro-modal bg-white rounded-lg shadow-xl border border-gray-200 p-6 mx-4 w-full max-w-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col gap-4">
                <label
                  htmlFor="categoria"
                  className="text-lg font-semibold text-gray-800 dark:text-white"
                >
                  Escolha a categoria do produto:
                </label>
                <select
                  id="categoria"
                  name="categoria"
                  className="border border-gray-300 rounded px-3 py-2 bg-white text-gray-800 dark:text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  value={categoriaSelecionada}
                  onChange={handleFilter}
                >
                  <option value="todos">Todos os produtos</option>
                  {todasCategorias.map((categoria) => (
                    <option key={categoria} value={categoria}>
                      {categoria}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  className="mt-2 px-4 py-2 bg-yellow-700 text-white rounded hover:bg-yellow-800 transition"
                  onClick={() => setOpen(false)}
                >
                  Fechar
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Filter;

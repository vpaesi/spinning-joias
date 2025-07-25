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

export default function Filter({
  todasCategorias,
  ordemAlfabetica,
  ordemPreco,
  onCategoriaChange,
  onOrdemAlfabeticaChange,
  onOrdemPrecoChange,
}: FilterProps) {
  const [open, setOpen] = useState(false);
  const filtroRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        filtroRef.current &&
        !filtroRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

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
      <div
        className="btn-filter-container flex flex-col sm:flex-row items-center justify-between gap-4 mt-4 w-full"
        ref={filtroRef}
      >
        {/* Grupo de botões principais - esquerda no desktop */}
        <div className="flex flex-row items-center gap-2 justify-center sm:justify-start">
          <button
            type="button"
            className="btn-filter flex items-center px-2 sm:px-4 py-2 rounded border border-gray-300 shadow text-black dark:text-white bg-white text-sm sm:text-base md:text-lg transition font-semibold hover:bg-gray-50"
            style={{ minHeight: "44px", height: "44px" }}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="filtro-dropdown"
          >
            <span
              className="flex items-center"
              style={{ fontSize: "1.7rem", marginRight: "0.5rem" }}
            >
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

        {/* Dropdown de categorias */}
        {open && (
          <div
            id="filtro-dropdown"
            className="absolute left-0 top-full mt-2 z-50 w-max min-w-[220px] bg-white shadow-lg border-2 rounded-lg"
          >
            <ul>
              <li>
                <button
                  className="btn-dropdown block w-full text-left px-6 py-2"
                  onClick={() => {
                    onCategoriaChange("todos");
                    setOpen(false);
                  }}
                >
                  Todos os produtos
                </button>
              </li>
              {todasCategorias.map((categoria) => (
                <li key={categoria}>
                  <button
                    className="btn-dropdown block w-full text-left px-6 py-2"
                    onClick={() => {
                      onCategoriaChange(categoria);
                      setOpen(false);
                    }}
                  >
                    {categoria}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

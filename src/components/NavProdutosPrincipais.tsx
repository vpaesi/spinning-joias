import { scrollToElement } from "../utils/scrollToElement";

interface NavProdutosPrincipaisProps {
  onCategoriaSelect: (categoria: string) => void;
}

function NavProdutosPrincipais({
  onCategoriaSelect,
}: NavProdutosPrincipaisProps) {
  const handleClick = (categoria: string) => {
    onCategoriaSelect(categoria);
    scrollToElement("lista-colecao");
  };

  return (
    <div
      className="nav-top py-2 text-center text-yellow-800 font-semibold w-full"
    >
      <nav className="flex flex-wrap justify-center md:gap-10 lg:gap-40 w-full">
        <button
          className="hover:text-yellow-900 transition-colors bg-transparent border-none cursor-pointer text-base md:text-lg px-2 py-1"
          onClick={() => handleClick("Brincos")}
        >
          Brincos & Argolas
        </button>
        <button
          className="hover:text-yellow-900 transition-colors bg-transparent border-none cursor-pointer text-base md:text-lg px-2 py-1"
          onClick={() => handleClick("Colares")}
        >
          Colares
        </button>
        <button
          className="hover:text-yellow-900 transition-colors bg-transparent border-none cursor-pointer text-base md:text-lg px-2 py-1"
          onClick={() => handleClick("Berloques")}
        >
          Berloques
        </button>
        <button
          className="hover:text-yellow-900 transition-colors bg-transparent border-none cursor-pointer text-base md:text-lg px-2 py-1"
          onClick={() => handleClick("Diversos")}
        >
          Diversos
        </button>
      </nav>
    </div>
  );
}

export default NavProdutosPrincipais;

interface NavProdutosPrincipaisProps {
  onCategoriaSelect: (categoria: string) => void;
}

function NavProdutosPrincipais({ onCategoriaSelect }: NavProdutosPrincipaisProps) {
  return (
    <div className="bg-yellow-100 py-2 text-center text-yellow-800 font-semibold">
      <nav className="flex justify-center gap-4">
        <button
          className="hover:text-yellow-900 transition-colors bg-transparent border-none cursor-pointer"
          onClick={() => onCategoriaSelect("Brincos")}
        >
          Brincos
        </button>
        <button
          className="hover:text-yellow-900 transition-colors bg-transparent border-none cursor-pointer"
          onClick={() => onCategoriaSelect("Colares")}
        >
          Colares
        </button>
        <button
          className="hover:text-yellow-900 transition-colors bg-transparent border-none cursor-pointer"
          onClick={() => onCategoriaSelect("Pulseiras")}
        >
          Pulseiras
        </button>
        <button
          className="hover:text-yellow-900 transition-colors bg-transparent border-none cursor-pointer"
          onClick={() => onCategoriaSelect("Berloques")}
        >
          Berloques
        </button>
      </nav>
    </div>
  );
}

export default NavProdutosPrincipais;

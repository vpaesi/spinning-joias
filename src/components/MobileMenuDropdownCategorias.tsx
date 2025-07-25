import { Link } from "react-router-dom";
import dadosLoja from "../utils/DadosSpinning";
import { scrollToElement } from "../utils/scrollToElement";

interface MobileMenuDropdownCategoriasProps {
  onCategoriaSelect: (categoria: string) => void;
  onClose: () => void;
}

const categorias = [
  "Aneis",
  "Berloques",
  "Brincos & Argolas",
  "Colares",
  "Diversos",
];

function MobileMenuDropdownCategorias({
  onCategoriaSelect,
  onClose,
}: MobileMenuDropdownCategoriasProps) {
  return (
    <div className="btn-menu-dropdown fixed left-2 top-[60px] z-[9999] w-max min-w-[220px] bg-white shadow-lg border-2 rounded-lg md:hidden">
      {categorias.map((cat) => (
        <button
          key={cat}
          className="btn-dropdown block w-full text-left px-6 py-2"
          onClick={() => {
            onCategoriaSelect(cat);
            onClose();
            scrollToElement("lista-colecao");
          }}
        >
          {cat}
        </button>
      ))}
      <hr className="my-2" />
      <Link
        to="/about"
        className="block px-6 py-2 hover:bg-yellow-100"
        onClick={onClose}
      >
        Sobre a {`${dadosLoja.nomeDaLoja}`}
      </Link>
      <Link
        to="/faq"
        className="block px-6 py-2 hover:bg-yellow-100"
        onClick={onClose}
      >
        Perguntas Frequentes (FAQ)
      </Link>
    </div>
  );
}

export default MobileMenuDropdownCategorias;

import personalInfo from "../utils/DadosSpinning";
import { scrollToElement } from "../utils/scrollToElement";

interface MenuDropdownProps {
  onCategoriaSelect: (categoria: string) => void;
  onClose: () => void;
}

const categorias = ["Aneis", "Berloques", "Brincos & Argolas", "Colares", "Diversos"];

function MenuDropdown({ onCategoriaSelect, onClose }: MenuDropdownProps) {
  return (
    <div className="absolute left-2 top-14 bg-white shadow-lg border-2 rounded z-50 min-w-[220px] py-2">
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
      <a href="/about" className="block px-6 py-2 hover:bg-yellow-100">
        Sobre a {`${personalInfo.nomeDaLoja}`}
      </a>
      <a href="/faq" className="block px-6 py-2 hover:bg-yellow-100">
        Perguntas Frequentes (FAQ)
      </a>
    </div>
  );
}

export default MenuDropdown;

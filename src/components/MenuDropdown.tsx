interface MenuDropdownProps {
  onCategoriaSelect: (categoria: string) => void;
  onClose: () => void;
}

const categorias = [
  "Anéis",
  "Berloques",
  "Brincos",
  "Colares",
  "Diversos",
];

function MenuDropdown({ onCategoriaSelect, onClose }: MenuDropdownProps) {
  return (
    <div className="absolute left-2 top-14 bg-white shadow-lg rounded z-50 min-w-[220px] py-2">
      {categorias.map((cat) => (
        <button
          key={cat}
          className="block w-full text-left px-6 py-2 hover:bg-yellow-100"
          onClick={() => {
            onCategoriaSelect(cat);
            onClose();
          }}
        >
          {cat}
        </button>
      ))}
      <hr className="my-2" />
      <a href="/carrinho" className="block px-6 py-2 hover:bg-yellow-100">Meu carrinho</a>
      <a href="/sobre" className="block px-6 py-2 hover:bg-yellow-100">Sobre a Spinning</a>
      <a href="/faq" className="block px-6 py-2 hover:bg-yellow-100">Perguntas Frequentes (FAQ)</a>
    </div>
  );
}

export default MenuDropdown;

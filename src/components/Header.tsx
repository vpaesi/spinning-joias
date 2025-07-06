import MenuHamburguer from "./MenuHamburguer";

interface HeaderProps {
  onCategoriaSelect: (categoria: string) => void;
}

function Header({ onCategoriaSelect }: HeaderProps) {
  return (
    <header className="bg-white shadow p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
      <div className="flex items-center gap-4">
        <MenuHamburguer onCategoriaSelect={onCategoriaSelect} />
        <h1 className="text-2xl font-bold text-yellow-700">
          <a
            href="/"
            className="no-underline text-yellow-700 hover:text-yellow-800"
          >
            <b>Spinning</b> Joias
          </a>
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <button className="bg-yellow-700 text-white px-4 py-2 rounded hover:bg-yellow-800 transition-colors">
          Login
        </button>
        <p>Não tem uma conta?</p>
      </div>
    </header>
  );
}

export default Header;

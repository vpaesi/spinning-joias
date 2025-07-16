import MenuHamburguer from "./MenuHamburguer";
import Search from "./Search";

import { Produto } from "../hooks/useProdutos";
import personalInfo from "../utils/DadosSpinning";

interface HeaderProps {
  onCategoriaSelect: (categoria: string) => void;
  produtos: Produto[];
  onSearchResult: (resultados: Produto[], termo: string) => void;
}

function Header({ onCategoriaSelect, produtos, onSearchResult }: HeaderProps) {
  return (
    <header className="bg-white px-12 py-4 flex flex-col md:flex-row gap-4 items-center justify-between">
      <div className="flex items-center gap-4 w-full md:w-auto">
        <MenuHamburguer onCategoriaSelect={onCategoriaSelect} />
        <h1 className="text-2xl font-bold text-yellow-700 whitespace-nowrap ">
          <a
            href="/"
            className="no-underline text-yellow-700 hover:text-yellow-800"
          >
            {`${personalInfo.nomeDaLoja}`}
          </a>
        </h1>
        {/* Visiveis apenas no desktop */}
        <div className="hidden md:block flex-1 ml-4" style={{ width: "100vw" }}>
          <Search produtos={produtos} onSearchResult={onSearchResult} />
        </div>
        <div className="hidden md:block flex-1 ml-4">
          <a
            href="/about"
            className="text-yellow-700 hover:text-yellow-800 transition-colors font-medium"
          >
            Sobre a Spinning
          </a>
          <a
            href="/faq"
            className="ml-4 text-yellow-700 hover:text-yellow-800 transition-colors font-medium"
          >
            FAQ
          </a>
        </div>
      </div>
      {/* Barra de pesquisa visível no mobile */}
      <div className="block md:hidden w-full">
        <Search produtos={produtos} onSearchResult={onSearchResult} />
      </div>
      {/* TODO: Descomentar quando tiver autenticação */}
      {/* <div className="flex items-center gap-4">
        <button className="bg-yellow-700 text-white px-4 py-2 rounded hover:bg-yellow-800 transition-colors">
          Login
        </button>
        <p>Não tem uma conta?</p>
      </div>  */}
    </header>
  );
}

export default Header;

import { Link } from "react-router-dom";
import MobileMenuHamburgerButton from "./MobileMenuHamburgerButton";
import Search from "./Search";
import { scrollToElement } from "../utils/scrollToElement";
import { Produto } from "../hooks/useProdutos";
import dadosLoja from "../utils/DadosSpinning";
import ThemeToggle from "./ThemeToggle";
import { useCarrinho } from "../context/CarrinhoContext";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  onCategoriaSelect: (categoria: string) => void;
  produtos: Produto[];
  onSearchResult: (resultados: Produto[], termo: string) => void;
}

import { useState } from "react";

function Header({ onCategoriaSelect, produtos, onSearchResult }: HeaderProps) {
  const [valorBusca, setValorBusca] = useState("");
  const { itens } = useCarrinho();
  const navigate = useNavigate();
  const totalQtd = itens.reduce((acc, item) => acc + item.quantidade, 0);

  // Limpa busca ao filtrar por categoria/nav/menu
  function handleCategoriaSelect(categoria: string) {
    setValorBusca("");
    onCategoriaSelect(categoria);
  }

  return (
    <header className="bg-white px-2 md:px-12 py-4 flex flex-col md:flex-row gap-4 items-center justify-between max-w-full overflow-x-hidden">
      <div className="flex items-center justify-center gap-2 md:gap-4 w-full md:w-auto">
        <MobileMenuHamburgerButton onCategoriaSelect={handleCategoriaSelect} />
        <h1 className="text-2xl font-bold text-yellow-700 whitespace-nowrap flex items-center">
          <a
            href="/"
            className="no-underline text-yellow-700 hover:text-yellow-800"
          >
            {`${dadosLoja.nomeDaLoja}`}
          </a>
          {/* Theme toggle no mobile */}
          <span className="inline md:hidden ml-2">
            <ThemeToggle />
          </span>
        </h1>
        {/* Visiveis apenas no desktop */}
        <div className="hidden md:block flex-1 ml-4" style={{ width: "100vw" }}>
          <Search
            produtos={produtos}
            valorBusca={valorBusca}
            setValorBusca={setValorBusca}
            onSearchResult={(resultados, termo) => {
              onSearchResult(resultados, termo);
              setValorBusca(termo);
              setTimeout(() => scrollToElement("lista-colecao"), 100);
            }}
          />
        </div>
        {/* Theme toggle no desktop */}
        <div className="hidden md:flex items-center">
          <ThemeToggle />
          <button
            className="relative ml-4"
            aria-label="Ver carrinho"
            onClick={() => navigate("/carrinho")}
            type="button"
          >
            <i className="bi bi-bag text-2xl"></i>
            {totalQtd > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {totalQtd}
              </span>
            )}
          </button>
        </div>
        <div className="hidden md:block flex-1 ml-4">
          <Link
            to="/about"
            className="text-yellow-700 hover:text-yellow-800 transition-colors font-medium"
          >
            Sobre a Spinning
          </Link>
          <Link
            to="/faq"
            className="ml-4 text-yellow-700 hover:text-yellow-800 transition-colors font-medium"
          >
            FAQ
          </Link>
        </div>
      </div>
      {/* Barra de pesquisa visível no mobile */}
      <div className="block md:hidden w-full">
        <Search
          produtos={produtos}
          valorBusca={valorBusca}
          setValorBusca={setValorBusca}
          onSearchResult={(resultados, termo) => {
            onSearchResult(resultados, termo);
            setValorBusca(termo);
            setTimeout(() => scrollToElement("produtos"), 100);
          }}
        />
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

import MobileMenuHamburgerButton from "./menu-hamburger/MenuHamburgerButton";
import Search from "./Search";
import { scrollToElement } from "../utils/scrollToElement";
import { Produto } from "../hooks/useProdutos";
import dadosLoja from "../utils/DadosSpinning";
import ThemeToggle from "./ThemeToggle";

interface HeaderProps {
  onCategoriaSelect: (categoria: string) => void;
  produtos: Produto[];
  onSearchResult: (resultados: Produto[], termo: string) => void;
}

import { useState } from "react";

export default function Header({
  onCategoriaSelect,
  produtos,
  onSearchResult,
}: HeaderProps) {
  const [valorBusca, setValorBusca] = useState("");

  function handleCategoriaSelect(categoria: string) {
    setValorBusca("");
    onCategoriaSelect(categoria);
  }

  return (
    <header className="bg-white px-2 md:px-12 py-4 flex flex-col md:flex-row gap-4 items-center justify-between max-w-full overflow-x-hidden">
      <div className="flex items-center justify-center gap-2 md:gap-4 w-full md:w-auto flex-1">
        <MobileMenuHamburgerButton onCategoriaSelect={handleCategoriaSelect} />
        <h1 className="text-3xl mx-3 font-bold text-yellow-700 whitespace-nowrap flex items-center">
          <a
            href="/"
            className="no-underline text-yellow-700 hover:text-yellow-800"
          >
            {`${dadosLoja.nomeDaLoja}`}
          </a>
          <span className="inline md:hidden ml-2">
            <ThemeToggle />
          </span>
        </h1>
        <div className="hidden md:block flex-1 ml-4">
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
        <div className="hidden md:flex items-center">
          <ThemeToggle />
        </div>
      </div>

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
    </header>
  );
}

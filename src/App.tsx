import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import BtnBackToTop from "./components/BtnBackToTop";
import Home from "./pages/Home";
import { useProdutos, Produto } from "./hooks/useProdutos";
import About from "./pages/About";
import FAQ from "./pages/Faq";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  const { produtos } = useProdutos();

  const [produtosBusca, setProdutosBusca] = useState<Produto[]>(produtos);
  const [produtosFiltrados, setProdutosFiltrados] =
    useState<Produto[]>(produtos);
  const [categoriaSelecionada, setCategoriaSelecionada] =
    useState<string>("todos");

  useEffect(() => {
    setProdutosBusca(produtos);
    setProdutosFiltrados(produtos);
  }, [produtos]);

  // Função para selecionar categoria (menu/nav)
  function handleCategoriaMenu(categoria: string) {
    setCategoriaSelecionada(categoria);
    const filtrados =
      categoria === "todos"
        ? produtos
        : produtos.filter(
            (p) => p.categoria.toLowerCase() === categoria.toLowerCase()
          );
    setProdutosBusca(filtrados);
    setProdutosFiltrados(filtrados);
  }

  return (
    <>
      <Header
        onCategoriaSelect={handleCategoriaMenu}
        produtos={produtos}
        onSearchResult={(resultados) => {
          setProdutosFiltrados(resultados);
          setProdutosBusca(resultados);
          setCategoriaSelecionada("todos");
        }}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home
            produtosFiltrados={produtosFiltrados}
            loading={false}
            erro={null}
            categoriaSelecionada={categoriaSelecionada}
            setProdutosFiltrados={setProdutosFiltrados}
            setCategoriaSelecionada={setCategoriaSelecionada}
            produtosBusca={produtosBusca}
            setProdutosBusca={setProdutosBusca}
            produtos={produtos}
          />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
        </Routes>
      </BrowserRouter>
      <BtnBackToTop />
      <Footer />
    </>
  );
}

export default App;

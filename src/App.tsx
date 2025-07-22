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
  const [produtosFiltrados, setProdutosFiltrados] = useState<Produto[]>(produtos);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string>("todos");
  const [termoBusca, setTermoBusca] = useState<string>("");

  useEffect(() => {
    setProdutosBusca(produtos);
    setProdutosFiltrados(produtos);
    setTermoBusca("");
  }, [produtos]);

  // Função para selecionar categoria (menu/nav/filtro)
  function handleCategoriaMenu(categoria: string) {
    setCategoriaSelecionada(categoria);
    setTermoBusca("");
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
        onSearchResult={(resultados, termo) => {
          setProdutosFiltrados(resultados);
          setProdutosBusca(resultados);
          setCategoriaSelecionada("todos");
          setTermoBusca(termo);
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
            termoBusca={termoBusca}
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

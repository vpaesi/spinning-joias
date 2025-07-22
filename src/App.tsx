import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import BtnBackToTop from "./components/BtnBackToTop";
import Home from "./pages/Home";
import { useProdutos, Produto } from "./hooks/useProdutos";
import About from "./pages/About";
import FAQ from "./pages/Faq";
import "bootstrap-icons/font/bootstrap-icons.css";



function AppRoutes() {
  const { produtos } = useProdutos();
  const [produtosFiltrados, setProdutosFiltrados] = useState<Produto[]>(produtos);
  const [categoriaSelecionada] = useState<string>("todos");
  const [termoBusca, setTermoBusca] = useState<string>("");

  useEffect(() => {
    setProdutosFiltrados(produtos);
    setTermoBusca("");
  }, [produtos]);

  const navigate = useNavigate();

  function atualizarURL(categoria: string, busca: string) {
    const params = new URLSearchParams();
    if (categoria && categoria !== "todos") params.set("categoria", categoria);
    if (busca) params.set("busca", busca);
    const search = params.toString();
    navigate({ pathname: "/", search: search ? `?${search}` : "" }, { replace: false });
  }

  function handleCategoriaMenu(categoria: string) {
    setTermoBusca("");
    atualizarURL(categoria, "");
    const filtrados =
      categoria === "todos"
        ? produtos
        : produtos.filter(
            (p) => p.categoria.toLowerCase() === categoria.toLowerCase()
          );
    setProdutosFiltrados(filtrados);
  }

  return (
    <>
      <Header
        onCategoriaSelect={handleCategoriaMenu}
        produtos={produtos}
        onSearchResult={(resultados, termo) => {
          setProdutosFiltrados(resultados);
          // Removido: setProdutosBusca(resultados); setCategoriaSelecionada("todos");
          setTermoBusca(termo);
          atualizarURL("todos", termo);
        }}
      />
      <Routes>
        <Route path="/" element={<Home
          produtosFiltrados={produtosFiltrados}
          loading={false}
          erro={null}
          setProdutosFiltrados={setProdutosFiltrados}
          produtos={produtos}
          termoBusca={termoBusca}
          categoriaSelecionada={categoriaSelecionada}
          onCategoriaSelect={handleCategoriaMenu}
        />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
      </Routes>
      <BtnBackToTop />
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;

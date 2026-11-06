import { useState, useEffect, useRef } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "bootstrap-icons/font/bootstrap-icons.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import BtnBackToTop from "../components/BtnBackToTop";
import Home from "../pages/Home";
import ProdutoDetalhes from "../pages/ProdutoDetalhes";
import { useProdutos, Produto } from "../hooks/useProdutos";
import { getProdutosFiltradosOrdenados } from "../utils/produtosUtils";
import About from "../pages/About";
import FAQ from "../pages/Faq";
function CarrinhoRedirect() {
  const navigate = useNavigate();
  const redirectStarted = useRef(false);

  useEffect(() => {
    if (redirectStarted.current) return;
    redirectStarted.current = true;
    toast.info("O catálogo não possui carrinho.", {
      toastId: "catalogo-sem-carrinho",
    });
    navigate("/", { replace: true });
  }, [navigate]);

  return null;
}

function AppRoutes() {
  const { produtos, loading, erro } = useProdutos();
  const [categoriaSelecionada, setCategoriaSelecionada] =
    useState<string>("todos");
  const [termoBusca, setTermoBusca] = useState<string>("");
  const [ordemAlfabetica, setOrdemAlfabetica] = useState<
    "none" | "asc" | "desc"
  >("none");
  const [ordemPreco, setOrdemPreco] = useState<"none" | "asc" | "desc">("none");
  
  const navigate = useNavigate();
  const location = useLocation();
  const isInitialized = useRef(false);

  useEffect(() => {
    if (location.pathname === "/" && !isInitialized.current) {
      const params = new URLSearchParams(location.search);
      const categoria = params.get("categoria");
      const busca = params.get("busca");
      
      if (categoria) {
        setCategoriaSelecionada(categoria);
      }
      
      if (busca) {
        setTermoBusca(busca);
      }
      
      isInitialized.current = true;
    }
  }, [location.pathname, location.search]);

  function getProdutosFiltrados() {
    return getProdutosFiltradosOrdenados(
      produtos,
      categoriaSelecionada,
      termoBusca,
      ordemPreco,
      ordemAlfabetica
    );
  }

  useEffect(() => {
    if (location.pathname === "/" && isInitialized.current) {
      const params = new URLSearchParams();
      if (categoriaSelecionada && categoriaSelecionada !== "todos")
        params.set("categoria", categoriaSelecionada);
      if (termoBusca) params.set("busca", termoBusca);
      
      const search = params.toString();
      const newSearch = search ? `?${search}` : "";
      
      if (location.search !== newSearch) {
        navigate({ pathname: "/", search: newSearch }, { replace: true });
      }
    }
  }, [categoriaSelecionada, termoBusca, navigate, location.pathname, location.search]);

  function handleCategoriaChange(categoria: string) {
    setCategoriaSelecionada(categoria);
    setTermoBusca("");
  }

  function handleOrdemAlfabeticaChange(ordem: "none" | "asc" | "desc") {
    setOrdemAlfabetica(ordem);
  }

  function handleOrdemPrecoChange(ordem: "none" | "asc" | "desc") {
    setOrdemPreco(ordem);
  }

  function handleSearchResult(_: Produto[], termo: string) {
    setTermoBusca(termo);
    setCategoriaSelecionada("todos");
  }

  return (
    <>
      <Header
        onCategoriaSelect={handleCategoriaChange}
        produtos={produtos}
        onSearchResult={handleSearchResult}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              produtosFiltrados={getProdutosFiltrados()}
              loading={loading}
              erro={erro}
              produtos={produtos}
              termoBusca={termoBusca}
              categoriaSelecionada={categoriaSelecionada}
              ordemAlfabetica={ordemAlfabetica}
              ordemPreco={ordemPreco}
              onCategoriaChange={handleCategoriaChange}
              onOrdemAlfabeticaChange={handleOrdemAlfabeticaChange}
              onOrdemPrecoChange={handleOrdemPrecoChange}
            />
          }
        />
        <Route path="/produto/:id" element={<ProdutoDetalhes />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
        <Route
          path="/carrinho"
          element={<CarrinhoRedirect />}
        />
      </Routes>
      <BtnBackToTop />
      <Footer onHome={() => handleCategoriaChange("todos")} />
    </>
  );
}

export default AppRoutes;

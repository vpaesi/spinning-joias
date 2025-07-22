import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import BtnBackToTop from "../components/BtnBackToTop";
import Home from "../pages/Home";
import { useProdutos, Produto } from "../hooks/useProdutos";
import { getProdutosFiltradosOrdenados } from "../utils/produtosUtils";
import About from "../pages/About";
import FAQ from "../pages/Faq";
import "bootstrap-icons/font/bootstrap-icons.css";

function AppRoutes() {
  const { produtos } = useProdutos();
  const [categoriaSelecionada, setCategoriaSelecionada] =
    useState<string>("todos");
  const [termoBusca, setTermoBusca] = useState<string>("");
  const [ordemAlfabetica, setOrdemAlfabetica] = useState<
    "none" | "asc" | "desc"
  >("none");
  const [ordemPreco, setOrdemPreco] = useState<"none" | "asc" | "desc">("none");

  const navigate = useNavigate();

  // Aplica filtro, busca e ordenação centralizados
  function getProdutosFiltrados() {
    return getProdutosFiltradosOrdenados(
      produtos,
      categoriaSelecionada,
      termoBusca,
      ordemPreco,
      ordemAlfabetica
    );
  }

  // Atualiza URL sempre que categoria ou busca mudam
  useEffect(() => {
    const params = new URLSearchParams();
    if (categoriaSelecionada && categoriaSelecionada !== "todos")
      params.set("categoria", categoriaSelecionada);
    if (termoBusca) params.set("busca", termoBusca);
    const search = params.toString();
    navigate(
      { pathname: "/", search: search ? `?${search}` : "" },
      { replace: false }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoriaSelecionada, termoBusca]);

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
              loading={false}
              erro={null}
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
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
      </Routes>
      <BtnBackToTop />
      <Footer />
    </>
  );
}

export default AppRoutes;

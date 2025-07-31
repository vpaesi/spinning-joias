import { filtrarPorCategoria, filtrarPorBusca, ordenarProdutos, getProdutosFiltradosOrdenados } from "../utils/produtosUtils";

describe("produtosUtils", () => {
  const produtos = [
    { id: 1, titulo: "Anel Ouro", descricao: "desc", preco: 100, categoria: "Anéis", fotoDestaque: "", cores: [], informacoes_extras: "" },
    { id: 2, titulo: "Colar Prata", descricao: "desc", preco: 200, categoria: "Colares", fotoDestaque: "", cores: [], informacoes_extras: "" },
    { id: 3, titulo: "Pulseira", descricao: "desc", preco: 150, categoria: "Pulseiras", fotoDestaque: "", cores: [], informacoes_extras: "" },
  ];
  it("deve filtrar por categoria", () => {
    expect(filtrarPorCategoria(produtos, "Anéis").length).toBe(1);
    expect(filtrarPorCategoria(produtos, "todos").length).toBe(3);
    expect(filtrarPorCategoria(produtos, "").length).toBe(3);
  });
  it("deve filtrar por busca", () => {
    expect(filtrarPorBusca(produtos, "ouro").length).toBe(1);
    expect(filtrarPorBusca(produtos, "desc").length).toBe(3);
    expect(filtrarPorBusca(produtos, "").length).toBe(3);
  });
  it("deve ordenar produtos por ordem alfabética", () => {
    const ordenados = ordenarProdutos(produtos, "asc", "none");
    expect(ordenados[0].preco).toBe(100);
    const ordenadosDesc = ordenarProdutos(produtos, "desc", "none");
    expect(ordenadosDesc[0].preco).toBe(200);
    const alf = ordenarProdutos(produtos, "none", "asc");
    expect(alf[0].titulo).toBe("Anel Ouro");
  });
  it("deve filtrar e ordenar produtos", () => {
    const result = getProdutosFiltradosOrdenados(produtos, "Colares", "prata", "none", "none");
    expect(result.length).toBe(1);
  });
});

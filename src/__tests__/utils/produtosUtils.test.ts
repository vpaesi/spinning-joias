import { filtrarPorCategoria, filtrarPorBusca, ordenarProdutos, getProdutosFiltradosOrdenados } from "../../utils/produtosUtils";

const produtos = [
  { id: 1, titulo: "Anel Ouro", descricao: "desc", preco: 100, categoria: "Anéis", fotoDestaque: "", cores: [], informacoes_extras: "" },
  { id: 2, titulo: "Colar Prata", descricao: "desc", preco: 200, categoria: "Colares", fotoDestaque: "", cores: [], informacoes_extras: "" },
  { id: 3, titulo: "Pulseira", descricao: "desc", preco: 150, categoria: "Pulseiras", fotoDestaque: "", cores: [], informacoes_extras: "" },
];

describe("filtrarPorCategoria", () => {
  it("deve retornar todos os produtos se o filtro de categoria estiver vazia", () => {
    expect(filtrarPorCategoria(produtos, "")).toEqual(produtos);
    expect(filtrarPorCategoria(produtos, "todos")).toEqual(produtos);
  });
  it("deve filtrar corretamente as categorias", () => {
    expect(filtrarPorCategoria(produtos, "Anéis")).toEqual([produtos[0]]);
  });
});

describe("filtrarPorBusca", () => {
  it("deve retornar todos os produtos se o termo de busca estiver vazio", () => {
    expect(filtrarPorBusca(produtos, "")).toEqual(produtos);
  });
  it("deve buscar por título", () => {
    expect(filtrarPorBusca(produtos, "ouro")).toEqual([produtos[0]]);
  });
  it("deve buscar por descrição", () => {
    expect(filtrarPorBusca(produtos, "desc")).toHaveLength(3);
  });
  it("deve buscar por categoria", () => {
    expect(filtrarPorBusca(produtos, "colares")).toEqual([produtos[1]]);
  });
});

describe("ordenarProdutos", () => {
  it("deve ordena por preço asc", () => {
    const ordenados = ordenarProdutos(produtos, "asc", "none");
    expect(ordenados[0].preco).toBe(100);
  });
  it("ordena por preço desc", () => {
    const ordenados = ordenarProdutos(produtos, "desc", "none");
    expect(ordenados[0].preco).toBe(200);
  });
  it("ordena por título asc", () => {
    const ordenados = ordenarProdutos(produtos, "none", "asc");
    expect(ordenados[0].titulo).toBe("Anel Ouro");
  });
  it("ordena por título desc", () => {
    const ordenados = ordenarProdutos(produtos, "none", "desc");
    expect(ordenados[0].titulo).toBe("Pulseira");
  });
  it("ordena por ambos, priorizando preço", () => {
    const ordenados = ordenarProdutos(produtos, "asc", "desc");
    expect(ordenados[0].preco).toBe(100);
  });
  it("retorna igual se ambos none", () => {
    expect(ordenarProdutos(produtos, "none", "none")).toEqual(produtos);
  });
});

describe("getProdutosFiltradosOrdenados", () => {
  it("filtra e ordena corretamente", () => {
    const result = getProdutosFiltradosOrdenados(produtos, "Colares", "prata", "none", "none");
    expect(result.length).toBe(1);
    expect(result[0].titulo).toBe("Colar Prata");
  });
});

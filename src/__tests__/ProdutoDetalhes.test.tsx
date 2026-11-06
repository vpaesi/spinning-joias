import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ProdutoDetalhes from "../pages/ProdutoDetalhes";
import { useProdutos } from "../hooks/useProdutos";

jest.mock("../hooks/useProdutos", () => ({
  useProdutos: jest.fn(),
}));

const produto = {
  id: 7,
  titulo: "Colar de teste",
  descricao: "Colar em prata 925.",
  categoria: "Colares",
  preco: 125,
  fotoDestaque: "/images/produtos/colar-base.jpg",
  fotosAdicionais: ["/images/produtos/colar-detalhe.jpg"],
  cores: [
    {
      nome: "Ruby",
      codigo: "#ff0000",
      fotoCor: ["/images/produtos/colar-ruby.jpg"],
    },
  ],
};

describe("ProdutoDetalhes", () => {
  beforeEach(() => {
    (useProdutos as jest.Mock).mockReturnValue({
      produtos: [produto],
      loading: false,
      erro: null,
    });
    Object.defineProperty(window, "scrollTo", {
      configurable: true,
      value: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  function renderDetalhes() {
    return render(
      <MemoryRouter
        initialEntries={["/produto/7"]}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <Routes>
          <Route path="/produto/:id" element={<ProdutoDetalhes />} />
        </Routes>
      </MemoryRouter>
    );
  }

  it("exibe o preço, permite consultar galeria e cor, sem ações de compra", () => {
    const { container } = renderDetalhes();

    expect(screen.getByText(/R\$\s*125,00/)).toBeInTheDocument();
    expect(container.querySelector(".line-through")).toBeNull();
    expect(screen.getByRole("img", { name: produto.titulo })).toHaveAttribute(
      "src",
      produto.fotoDestaque
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Ver foto 3 de 3 de Colar de teste" })
    );
    expect(screen.getByRole("img", { name: produto.titulo })).toHaveAttribute(
      "src",
      produto.fotosAdicionais[0]
    );

    fireEvent.click(screen.getByRole("button", { name: "Selecionar cor Ruby" }));
    expect(screen.getByRole("img", { name: produto.titulo })).toHaveAttribute(
      "src",
      produto.cores[0].fotoCor[0]
    );
    expect(
      screen.queryByRole("button", { name: /carrinho|adicionar|finalizar compra/i })
    ).not.toBeInTheDocument();
  });

  it("informa que os dados do produto ainda estão carregando", () => {
    (useProdutos as jest.Mock).mockReturnValue({
      produtos: [],
      loading: true,
      erro: null,
    });

    renderDetalhes();

    expect(screen.getByRole("status")).toHaveTextContent("Carregando produto");
    expect(screen.queryByText("Produto não encontrado")).not.toBeInTheDocument();
  });

  it("exibe o erro do catálogo quando não foi possível carregar os dados", () => {
    (useProdutos as jest.Mock).mockReturnValue({
      produtos: [],
      loading: false,
      erro: "Erro ao carregar produtos",
    });

    renderDetalhes();

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Não foi possível carregar o catálogo. Erro ao carregar produtos"
    );
  });

  it("identifica um produto inexistente depois de carregar o catálogo", () => {
    (useProdutos as jest.Mock).mockReturnValue({
      produtos: [],
      loading: false,
      erro: null,
    });

    renderDetalhes();

    expect(screen.getByRole("heading", { name: "Produto não encontrado" })).toBeInTheDocument();
  });
});

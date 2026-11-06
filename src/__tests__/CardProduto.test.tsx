import { fireEvent, render, screen } from "@testing-library/react";
import CardProduto from "../components/produto/CardProduto";

const produto = {
  id: 1,
  titulo: "Colar de teste",
  descricao: "Colar em prata 925.",
  categoria: "Colares",
  preco: 100,
  fotoDestaque: "/images/produtos/colar-teste.jpg",
};

describe("CardProduto", () => {
  it("mostra o preço do catálogo e oferece apenas acesso aos detalhes", () => {
    const onDetalhes = jest.fn();
    const { container } = render(
      <CardProduto produto={produto} onDetalhes={onDetalhes} />
    );

    expect(screen.getByText(/R\$\s*100,00/)).toBeInTheDocument();
    expect(container.querySelector(".line-through")).toBeNull();
    expect(screen.getByRole("img", { name: produto.titulo })).toHaveAttribute(
      "src",
      produto.fotoDestaque
    );
    expect(
      screen.queryByRole("button", { name: /carrinho|finalizar compra/i })
    ).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Ver produto" }));
    expect(onDetalhes).toHaveBeenCalledTimes(1);
  });
});

import { fireEvent, render, screen, within } from "@testing-library/react";
import ProdutosPorPaginaSelect from "../components/produto/ProdutosPorPaginaSelect";

describe("ProdutosPorPaginaSelect", () => {
  it("limita as opções ao total de produtos disponível", () => {
    render(
      <ProdutosPorPaginaSelect
        pageSize={8}
        setPageSize={jest.fn()}
        setPage={jest.fn()}
        totalProdutos={3}
      />
    );

    const select = screen.getByRole("combobox", {
      name: "Produtos por página:",
    });
    expect(select).toHaveValue("3");
    expect(within(select).getAllByRole("option").map((option) => option.value)).toEqual([
      "3",
    ]);
  });

  it("inclui o total filtrado como opção e reinicia a página ao mudar", () => {
    const setPageSize = jest.fn();
    const setPage = jest.fn();
    render(
      <ProdutosPorPaginaSelect
        pageSize={16}
        setPageSize={setPageSize}
        setPage={setPage}
        totalProdutos={10}
      />
    );

    const select = screen.getByRole("combobox", {
      name: "Produtos por página:",
    });
    expect(select).toHaveValue("10");
    expect(within(select).getAllByRole("option").map((option) => option.value)).toEqual([
      "8",
      "10",
    ]);

    fireEvent.change(select, { target: { value: "8" } });
    expect(setPageSize).toHaveBeenCalledWith(8);
    expect(setPage).toHaveBeenCalledWith(1);
  });

  it("não aparece quando o filtro não retorna produtos", () => {
    render(
      <ProdutosPorPaginaSelect
        pageSize={8}
        setPageSize={jest.fn()}
        setPage={jest.fn()}
        totalProdutos={0}
      />
    );

    expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
  });
});

import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router-dom";
import Filter from "../components/home/Filter";

function CurrentLocation() {
  const location = useLocation();
  return <output data-testid="location">{location.pathname}{location.search}</output>;
}

describe("Filter", () => {
  it("limpa o filtro de categoria ao voltar à página inicial", () => {
    const onCategoriaChange = jest.fn();
    render(
      <MemoryRouter
        initialEntries={["/?categoria=Colares"]}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <Filter
          categoriaSelecionada="Colares"
          todasCategorias={["Colares", "Brincos"]}
          ordemAlfabetica="none"
          ordemPreco="none"
          onCategoriaChange={onCategoriaChange}
          onOrdemAlfabeticaChange={jest.fn()}
          onOrdemPrecoChange={jest.fn()}
          pageSize={8}
          setPageSize={jest.fn()}
          setPage={jest.fn()}
          totalProdutos={2}
        />
        <CurrentLocation />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("link", { name: "Página inicial" }));

    expect(onCategoriaChange).toHaveBeenCalledWith("todos");
    expect(screen.getByTestId("location")).toHaveTextContent("/");
  });
});

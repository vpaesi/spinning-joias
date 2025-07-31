import { render, screen, fireEvent } from "@testing-library/react";
import NavProdutosPrincipais from "../../../components/home/NavProdutosPrincipais";

describe("NavProdutosPrincipais", () => {
  it("chama onCategoriaSelect para todas as categorias", () => {
    const onCategoriaSelect = jest.fn();
    render(<NavProdutosPrincipais onCategoriaSelect={onCategoriaSelect} />);
    fireEvent.click(screen.getByText(/Brincos & Argolas/i));
    expect(onCategoriaSelect).toHaveBeenCalledWith("Brincos");
    fireEvent.click(screen.getByText(/Colares/i));
    expect(onCategoriaSelect).toHaveBeenCalledWith("Colares");
    fireEvent.click(screen.getByText(/Berloques/i));
    expect(onCategoriaSelect).toHaveBeenCalledWith("Berloques");
    fireEvent.click(screen.getByText(/Diversos/i));
    expect(onCategoriaSelect).toHaveBeenCalledWith("Diversos");
  });
});

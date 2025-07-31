import { render, screen, fireEvent } from "@testing-library/react";
import ModalSelecionaCor from "../components/produto/ModalSelecionaCor";

const produto = {
  id: 1,
  titulo: "Produto Teste",
  fotoDestaque: "",
  descricao: "",
  preco: 10,
  categoria: "Categoria",
  cores: [
    { nome: "Azul", codigo: "#00f", fotoCor: ["img1.jpg"] },
    { nome: "Vermelho", codigo: "#f00" }
  ]
};

describe("ModalSelecionaCor", () => {
  it("renderiza todas as variações e chama onSelecionar", () => {
    const onSelecionar = jest.fn();
    const onClose = jest.fn();
    render(
      <ModalSelecionaCor
        produto={produto as any}
        onClose={onClose}
        onSelecionar={onSelecionar}
      />
    );
    expect(screen.getByText(/selecione a cor/i)).toBeInTheDocument();
    expect(screen.getByText(/azul/i)).toBeInTheDocument();
    expect(screen.getByText(/vermelho/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/azul/i));
    expect(onSelecionar).toHaveBeenCalled();
    fireEvent.click(screen.getByText(/cancelar/i));
    expect(onClose).toHaveBeenCalled();
  });
});

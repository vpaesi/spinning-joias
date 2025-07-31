import { render, screen, fireEvent } from "@testing-library/react";
import InputFormCarrinho from "../components/carrinho/InputFormCarrinho";

describe("InputFormCarrinho", () => {
  it("deve mostrar erro se digitado caracteres fora do esperado no formulário do carrinho", () => {
    const onChange = jest.fn();
    render(
      <InputFormCarrinho
        label="Nome"
        placeholder="Digite"
        value=""
        onChange={onChange}
        erro="Campo obrigatório"
      />
    );
    expect(screen.getByText(/campo obrigatório/i)).toBeInTheDocument();
    fireEvent.change(screen.getByPlaceholderText(/digite/i), {
      target: { value: "Novo" },
    });
    expect(onChange).toHaveBeenCalledWith("Novo");
  });
});

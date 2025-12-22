import { render, screen, fireEvent } from "@testing-library/react";
import PagamentoRadio from "../components/carrinho/PagamentoRadio";

describe("PagamentoRadio", () => {
  it("deve selecionar Transferência no modo de pagamento", () => {
    const onChange = jest.fn();
    render(<PagamentoRadio value="pix" onChange={onChange} />);
    fireEvent.click(screen.getByLabelText(/Transferência/i));
    expect(onChange).toHaveBeenCalledWith("transferencia");
  });

  it("deve selecionar Pix no modo de pagamento", () => {
    const onChange = jest.fn();
    render(<PagamentoRadio value="transferencia" onChange={onChange} />);
    fireEvent.click(screen.getByLabelText(/Pix/i));
    expect(onChange).toHaveBeenCalledWith("pix");
  });
});

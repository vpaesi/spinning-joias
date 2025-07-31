import { render, screen, fireEvent } from "@testing-library/react";
import BtnLimparCarrinho from "../components/carrinho/BtnLimparCarrinho";

describe("BtnLimparCarrinho", () => {
  let originalConfirm: () => boolean;

  beforeEach(() => {
    originalConfirm = global.confirm;
    global.confirm = jest.fn(() => true);
  });

  afterEach(() => {
    global.confirm = originalConfirm;
  });

  it("deve limpar o carrinho ao confirmar", () => {
    const onLimpar = jest.fn();
    render(<BtnLimparCarrinho onLimpar={onLimpar} />);
    fireEvent.click(screen.getByText(/limpar carrinho/i));
    expect(onLimpar).toHaveBeenCalled();
  });

  it("não deve limpar o carrinho se cancelar o confirm", () => {
    global.confirm = jest.fn(() => false);
    const onLimpar = jest.fn();
    render(<BtnLimparCarrinho onLimpar={onLimpar} />);
    fireEvent.click(screen.getByText(/limpar carrinho/i));
    expect(onLimpar).not.toHaveBeenCalled();
  });
});

import { useCarrinhoTotal, useCarrinhoQuantidadeTotal } from "../hooks/useCarrinhoTotal";

describe("useCarrinhoTotal", () => {
  it("deve retornar 0 para carrinho vazio", () => {
    expect(useCarrinhoTotal([])).toBe(0);
  });
  it("deve calcular o total corretamente", () => {
    const itens = [
      { produto: { preco: 10 }, quantidade: 2 },
      { produto: { preco: 5 }, quantidade: 3 },
    ] as any;
    expect(useCarrinhoTotal(itens)).toBe(10 * 2 + 5 * 3);
  });
  it("deve ignorar produtos sem preço", () => {
    const itens = [
      { produto: {}, quantidade: 2 },
      { produto: { preco: 5 }, quantidade: 1 },
    ] as any;
    expect(useCarrinhoTotal(itens)).toBe(5 * 1);
  });
});

describe("useCarrinhoQuantidadeTotal", () => {
  it("deve retornar 0 para carrinho vazio", () => {
    expect(useCarrinhoQuantidadeTotal([])).toBe(0);
  });
  it("deve somar as quantidades corretamente", () => {
    const itens = [
      { quantidade: 2 },
      { quantidade: 3 },
    ] as any;
    expect(useCarrinhoQuantidadeTotal(itens)).toBe(5);
  });
});

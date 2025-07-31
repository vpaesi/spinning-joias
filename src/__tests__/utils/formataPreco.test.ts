import { formatoDoPreco, formatoDoPrecoSemDesconto } from "../../utils/formataPreco";

describe("formatoDoPreco", () => {
  it("deve formatar preço corretamente", () => {
    expect(formatoDoPreco(10)).toBe("R$ 10,00");
  });
  it("deve retornar -- para preço inválido", () => {
    expect(formatoDoPreco(undefined)).toBe("--");
    expect(formatoDoPreco("abc" as any)).toBe("--");
  });
});

describe("formatoDoPrecoSemDesconto", () => {
  it("deve formatar preço com desconto padrão", () => {
    expect(formatoDoPrecoSemDesconto(10)).toBe("R$ 11,00");
  });
  it("deve formatar preço com desconto customizado", () => {
    expect(formatoDoPrecoSemDesconto(10, 0.5)).toBe("R$ 15,00");
  });
  it("deve retornar -- para valor inválido", () => {
    expect(formatoDoPrecoSemDesconto(undefined)).toBe("--");
    expect(formatoDoPrecoSemDesconto("abc" as any)).toBe("--");
  });
});

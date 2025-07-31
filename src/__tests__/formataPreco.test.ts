import { formatoDoPreco, formatoDoPrecoSemDesconto } from "../utils/formataPreco";

describe("formatoDoPreco", () => {
  it("deve formatar o preço corretamente", () => {
    expect(formatoDoPreco(10)).toMatch(/^R\$[\s\u00A0]?10,00$/);
    expect(formatoDoPreco(undefined)).toBe("--");
  });
});

describe("formatoDoPrecoSemDesconto", () => {
  it("deve formatar o preço com desconto corretamente", () => {
    expect(formatoDoPrecoSemDesconto(10)).toMatch(/^R\$[\s\u00A0]?11,00$/);
    expect(formatoDoPrecoSemDesconto(undefined)).toBe("--");
  });
});

import { formatoDoPreco } from "../utils/formataPreco";

describe("formatoDoPreco", () => {
  it("deve formatar preço corretamente", () => {
    expect(formatoDoPreco(10)).toBe("R$ 10,00");
  });
  it("deve retornar -- para preço inválido", () => {
    expect(formatoDoPreco(undefined)).toBe("--");
    expect(formatoDoPreco("abc")).toBe("--");
  });
});

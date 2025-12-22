import { QUANTIDADE_MAXIMA_PRODUTO, QUANTIDADE_MINIMA_PRODUTO, PAGE_SIZE_OPTIONS, CAMPOS_OBRIGATORIOS_CARRINHO } from "../utils/constants";

describe("constants", () => {
  it("deve ter valores de constantes", () => {
    expect(QUANTIDADE_MAXIMA_PRODUTO).toBe(10);
    expect(QUANTIDADE_MINIMA_PRODUTO).toBe(1);
    expect(PAGE_SIZE_OPTIONS).toContain(8);
    expect(CAMPOS_OBRIGATORIOS_CARRINHO).toContain("nome");
  });
});

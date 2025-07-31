import { clampQuantity } from "../utils/validacoes";

describe("clampQuantity", () => {
  it("deve retornar valor mínimo se menor que o mínimo", () => {
    expect(clampQuantity(0)).toBe(1);
  });
  it("deve retornar valor máximo se maior que o máximo", () => {
    expect(clampQuantity(100)).toBe(10);
  });
  it("deve retornar valor se dentro do intervalo", () => {
    expect(clampQuantity(5)).toBe(5);
  });
});

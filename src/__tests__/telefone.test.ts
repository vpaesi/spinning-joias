import { extrairNumeroDeUrlWhatsApp } from "../utils/telefone";

describe("extrairNumeroDeUrlWhatsApp", () => {
  it("deve extrair número da url do whats corretamente", () => {
    expect(extrairNumeroDeUrlWhatsApp("https://wa.me/5551999999999")).toBe("5551999999999");
    expect(extrairNumeroDeUrlWhatsApp("")).toBe("");
  });
});

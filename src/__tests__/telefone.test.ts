import { extrairNumeroTelefone, extrairNumeroDeUrlWhatsApp } from "../utils/telefone";

describe("extrairNumeroTelefone", () => {
  it("deve extrair apenas números da url do whatsapp", () => {
    expect(extrairNumeroTelefone("(51) 99999-9999")).toBe("51999999999");
    expect(extrairNumeroTelefone("abc123")).toBe("123");
    expect(extrairNumeroTelefone("")).toBe("");
  });
});

describe("extrairNumeroDeUrlWhatsApp", () => {
  it("deve extrair número de url wa.me", () => {
    expect(extrairNumeroDeUrlWhatsApp("https://wa.me/5551999999999")).toBe("5551999999999");
  });
  it("deve extrair número de string sem url", () => {
    expect(extrairNumeroDeUrlWhatsApp("51999999999")).toBe("51999999999");
  });
  it("deve retornar vazio se string vazia", () => {
    expect(extrairNumeroDeUrlWhatsApp("")).toBe("");
  });
});

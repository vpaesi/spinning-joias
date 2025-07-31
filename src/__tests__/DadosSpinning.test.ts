import dadosLoja from "../utils/DadosSpinning";

describe("dadosLoja", () => {
  it("deve possuir dados básicos", () => {
    expect(dadosLoja).toHaveProperty("socialMedia");
    expect(dadosLoja).toHaveProperty("nomeDaLoja");
  });
});

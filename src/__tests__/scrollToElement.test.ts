import { scrollToElement } from "../utils/scrollToElement";

describe("scrollToElement", () => {
  it("não deve scrollar para o elemento se ele não existe", () => {
    expect(() => scrollToElement("nao-existe")).not.toThrow();
  });
});

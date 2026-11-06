import { scrollToElement } from "../utils/scrollToElement";

describe("scrollToElement", () => {
  it("não deve scrollar para o elemento se ele não existe", () => {
    Object.defineProperty(window, "scrollTo", {
      configurable: true,
      value: jest.fn(),
    });

    expect(() => scrollToElement("nao-existe")).not.toThrow();
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
  });
});

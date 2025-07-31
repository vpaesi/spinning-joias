import { padronizaTextoDaPesquisa } from "../utils/padronizaTextoDaPesquisa";

describe("padronizaTextoDaPesquisa", () => {
  it("deve formatar o texto da caixa de pesquisa", () => {
    expect(padronizaTextoDaPesquisa("Árvore")).toBe("arvore");
    expect(padronizaTextoDaPesquisa("João")).toBe("joao");
    expect(padronizaTextoDaPesquisa("")).toBe("");
  });
});

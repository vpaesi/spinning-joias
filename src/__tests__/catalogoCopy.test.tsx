import { readFileSync } from "fs";
import { resolve } from "path";
import { render, screen } from "@testing-library/react";
import About from "../pages/About";

describe("textos do modelo catálogo", () => {
  it("orienta a confirmar diferenças de variação diretamente com a loja", () => {
    const produtos = JSON.parse(
      readFileSync(resolve(process.cwd(), "public/produtos.json"), "utf8")
    ) as Array<{ id: number; informacoes_extras?: string }>;
    const orientacoes = produtos
      .filter((produto) => produto.id === 1 || produto.id === 2)
      .map((produto) => produto.informacoes_extras ?? "");

    expect(orientacoes).toHaveLength(2);
    orientacoes.forEach((orientacao) => {
      expect(orientacao).toMatch(/^Consulte a loja/);
      expect(orientacao).not.toMatch(/no ato da compra/i);
    });
  });

  it("descreve o site como catálogo e atendimento, sem prometer compra online", () => {
    render(<About />);

    expect(
      screen.getAllByText(/consulta ao catálogo e atendimento/i)
    ).toHaveLength(2);
    expect(screen.queryByText(/experiência de compra/i)).not.toBeInTheDocument();
  });
});

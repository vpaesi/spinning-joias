import { existsSync, readFileSync } from "fs";
import { resolve } from "path";

interface ProdutoCatalogo {
  fotoDestaque?: string;
  fotosAdicionais?: string[];
  cores?: Array<{
    fotoDestaque?: string;
    fotoCor?: string[];
  }>;
}

describe("imagens locais do catálogo", () => {
  it("tem um arquivo correspondente para cada referência local do JSON", () => {
    const catalogo = JSON.parse(
      readFileSync(resolve(process.cwd(), "public/produtos.json"), "utf8")
    ) as ProdutoCatalogo[];

    const referencias = catalogo.flatMap((produto) => [
      produto.fotoDestaque,
      ...(produto.fotosAdicionais ?? []),
      ...(produto.cores ?? []).flatMap((cor) => [
        cor.fotoDestaque,
        ...(cor.fotoCor ?? []),
      ]),
    ]);
    const caminhosLocais = referencias.filter(
      (caminho): caminho is string =>
        typeof caminho === "string" && caminho.startsWith("/images/produtos/")
    );

    expect(caminhosLocais.length).toBeGreaterThan(0);
    caminhosLocais.forEach((caminho) => {
      expect(existsSync(resolve(process.cwd(), "public", caminho.slice(1)))).toBe(
        true
      );
    });
  });
});

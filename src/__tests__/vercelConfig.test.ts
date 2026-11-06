import { readFileSync } from "fs";
import { resolve } from "path";

describe("configuração de rotas da Vercel", () => {
  it("serve o app SPA nas rotas de cliente sem interceptar arquivos existentes", () => {
    const config = JSON.parse(
      readFileSync(resolve(process.cwd(), "vercel.json"), "utf8")
    ) as {
      rewrites?: Array<{ source: string; destination: string }>;
    };

    expect(config.rewrites).toContainEqual({
      source: "/(.*)",
      destination: "/index.html",
    });
  });
});

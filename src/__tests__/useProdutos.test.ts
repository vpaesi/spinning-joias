import { renderHook, waitFor } from "@testing-library/react";
import { useProdutos } from "../hooks/useProdutos";

describe("useProdutos", () => {
  afterEach(() => {
    delete (global as typeof globalThis & { fetch?: typeof fetch }).fetch;
  });

  it("carrega os produtos do JSON servido pelo próprio site", async () => {
    const produtos = [
      {
        id: 1,
        titulo: "Colar de teste",
        descricao: "Colar em prata 925.",
        categoria: "Colares",
        fotoDestaque: "/images/produtos/colar-teste.jpg",
      },
    ];
    const fetchMock = jest.fn().mockResolvedValue({
      json: async () => produtos,
    });
    Object.defineProperty(global, "fetch", {
      configurable: true,
      value: fetchMock,
    });

    const { result } = renderHook(() => useProdutos());

    expect(result.current.loading).toBe(true);
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(fetchMock).toHaveBeenCalledWith("/produtos.json");
    expect(result.current.produtos).toEqual(produtos);
    expect(result.current.erro).toBeNull();
  });

  it("expõe um erro compreensível quando o JSON não carrega", async () => {
    Object.defineProperty(global, "fetch", {
      configurable: true,
      value: jest.fn().mockRejectedValue(new Error("offline")),
    });

    const { result } = renderHook(() => useProdutos());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.produtos).toEqual([]);
    expect(result.current.erro).toBe("Erro ao carregar produtos");
  });
});

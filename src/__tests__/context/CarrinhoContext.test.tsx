import { renderHook, act } from "@testing-library/react";
import { CarrinhoProvider, useCarrinho } from "../../context/CarrinhoContext";

const wrapper = ({ children }: any) => <CarrinhoProvider>{children}</CarrinhoProvider>;

const produto = {
  id: 1,
  titulo: "Produto Teste",
  fotoDestaque: "",
  descricao: "",
  preco: 10,
  categoria: "Categoria",
};

describe("CarrinhoContext", () => {
  it("adiciona, atualiza, remove e limpa itens", () => {
    const { result } = renderHook(() => useCarrinho(), { wrapper });
    act(() => {
      result.current.adicionar(produto as any, undefined, 2);
    });
    expect(result.current.itens.length).toBe(1);
    act(() => {
      result.current.atualizarQuantidade(produto.id, 5);
    });
    expect(result.current.itens[0].quantidade).toBe(5);
    act(() => {
      result.current.remover(produto.id);
    });
    expect(result.current.itens.length).toBe(0);
    act(() => {
      result.current.adicionar(produto as any, undefined, 1);
      result.current.limpar();
    });
    expect(result.current.itens.length).toBe(0);
  });

  it("lança erro se usar useCarrinho fora do provider", () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});
    expect(() => renderHook(() => useCarrinho())).toThrow();
    spy.mockRestore();
  });
});

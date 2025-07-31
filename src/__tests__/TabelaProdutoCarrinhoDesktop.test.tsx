import { render, screen, fireEvent } from "@testing-library/react";
import TabelaProdutoCarrinhoDesktop from "../components/carrinho/TabelaProdutoCarrinhoDesktop";
import { BrowserRouter } from "react-router-dom";

const mockProduto = {
  id: 1,
  titulo: "Produto Teste",
  fotoDestaque: "https://img.com/produto.jpg",
  descricao: "Descrição",
  preco: 100,
  categoria: "Categoria",
  cores: [{ nome: "Azul", codigo: "#00f", fotoCor: [] }],
  fotosAdicionais: [],
};

const mockItem = {
  id: 1,
  produto: mockProduto,
  quantidade: 2,
  corSelecionada: { nome: "Azul", codigo: "#00f", fotoCor: [] },
};

describe("TabelaProdutoCarrinhoDesktop", () => {
  it("deve renderizar itens do carrinho (desktop)", () => {
    const remover = jest.fn();
    const atualizarQuantidade = jest.fn();
    const adicionar = jest.fn();
    render(
      <BrowserRouter>
        <TabelaProdutoCarrinhoDesktop
          itens={[mockItem]}
          remover={remover}
          atualizarQuantidade={atualizarQuantidade}
          adicionar={adicionar}
        />
      </BrowserRouter>
    );
    expect(screen.getAllByText(/produto teste/i).length).toBeGreaterThan(0);
  });
  it("deve permitir mudar variação e quantidade do produto no carrinho", () => {
    const remover = jest.fn();
    const atualizarQuantidade = jest.fn();
    const adicionar = jest.fn();
    render(
      <BrowserRouter>
        <TabelaProdutoCarrinhoDesktop
          itens={[mockItem]}
          remover={remover}
          atualizarQuantidade={atualizarQuantidade}
          adicionar={adicionar}
        />
      </BrowserRouter>
    );
    fireEvent.change(screen.getByDisplayValue("Azul"), { target: { value: "Azul" } });
    fireEvent.click(screen.getByText("+"));
    expect(atualizarQuantidade).toHaveBeenCalled();
    fireEvent.click(screen.getByText("-"));
    expect(atualizarQuantidade).toHaveBeenCalled();
  });
});

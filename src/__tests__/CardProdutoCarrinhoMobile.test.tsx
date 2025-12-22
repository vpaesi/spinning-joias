import { render, screen } from "@testing-library/react";
import CardProdutoCarrinhoMobile from "../components/carrinho/TabelaProdutoCarrinhoMobile";
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

describe("CardProdutoCarrinhoMobile", () => {
  it("deve renderizar os itens da tabela no carrinho no mobile", () => {
    const remover = jest.fn();
    const atualizarQuantidade = jest.fn();
    const adicionar = jest.fn();
    render(
      <BrowserRouter>
        <CardProdutoCarrinhoMobile
          itens={[mockItem]}
          remover={remover}
          atualizarQuantidade={atualizarQuantidade}
          adicionar={adicionar}
        />
      </BrowserRouter>
    );
    expect(screen.getByText(/produto teste/i)).toBeInTheDocument();
  });
});

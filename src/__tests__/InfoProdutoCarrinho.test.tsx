import { render, screen } from "@testing-library/react";
import InfoProdutoCarrinho from "../components/carrinho/InfoProdutoCarrinho";
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

describe("InfoProdutoCarrinho", () => {
  it("deve renderizar a tabela de produtos no carrinho", () => {
    const remover = jest.fn();
    const atualizarQuantidade = jest.fn();
    const adicionar = jest.fn();
    render(
      <BrowserRouter>
        <InfoProdutoCarrinho
          itens={[mockItem]}
          remover={remover}
          atualizarQuantidade={atualizarQuantidade}
          adicionar={adicionar}
        />
      </BrowserRouter>
    );
    expect(screen.getAllByText(/produto teste/i).length).toBeGreaterThan(0);
  });
});

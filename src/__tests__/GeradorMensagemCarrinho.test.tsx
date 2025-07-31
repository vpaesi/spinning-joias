import { render, screen } from "@testing-library/react";
import GeradorMensagemCarrinho from "../components/carrinho/GeradorMensagemCarrinho";
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

describe("GeradorMensagemCarrinho", () => {
  it("deve gerar a mensagem automatica ao preencher o formulário e mostrar o botão de WhatsApp", () => {
    const setMensagem = jest.fn();
    render(
      <BrowserRouter>
        <GeradorMensagemCarrinho
          itens={[mockItem]}
          total={200}
          form={{
            nome: "Fulano",
            cpf: "123.456.789-10",
            endereco: "Rua X",
            complemento: "",
            cidade: "Cidade",
            uf: "UF",
            cep: "00000-000",
            celular: "99999-9999",
            numero: "123",
          }}
          pagamento="pix"
          mensagem="mensagem teste"
          setMensagem={setMensagem}
          erros={{}}
        />
      </BrowserRouter>
    );
    expect(screen.getByText(/mensagem para whatsapp/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /finalizar compra/i })).toBeInTheDocument();
  });
  it("deve desabilitar botão de Finalizar Compra se a mensagem estiver vazia", () => {
    const setMensagem = jest.fn();
    render(
      <BrowserRouter>
        <GeradorMensagemCarrinho
          itens={[mockItem]}
          total={200}
          form={{
            nome: "",
            cpf: "",
            endereco: "",
            complemento: "",
            cidade: "",
            uf: "",
            cep: "",
            celular: "",
            numero: "",
          }}
          pagamento="pix"
          mensagem=""
          setMensagem={setMensagem}
          erros={{}}
        />
      </BrowserRouter>
    );
    expect(screen.getByRole("button", { name: /finalizar compra/i })).toBeDisabled();
  });
});

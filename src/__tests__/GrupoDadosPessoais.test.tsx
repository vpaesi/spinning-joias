import { render, screen } from "@testing-library/react";
import GrupoDadosPessoais from "../components/carrinho/GrupoDadosPessoais";

describe("GrupoDadosPessoais", () => {
  it("deve renderizar os campos pessoais no formulário do carrinho", () => {
    const onChange = jest.fn();
    render(
      <GrupoDadosPessoais
        form={{ nome: "", celular: "", cpf: "" }}
        erros={{ nome: null, celular: null, cpf: null }}
        onChange={onChange}
      />
    );
    expect(screen.getByPlaceholderText(/nome completo/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/\(51\) 99999-9999/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/123\.456\.789-10/i)).toBeInTheDocument();
  });
});

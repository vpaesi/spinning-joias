import { render, screen, fireEvent } from "@testing-library/react";
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

  it("exibe erros e chama onChange", () => {
    const onChange = jest.fn();
    render(
      <GrupoDadosPessoais
        form={{ nome: "", celular: "", cpf: "" }}
        erros={{ nome: "Erro nome", celular: "Erro celular", cpf: "Erro cpf" }}
        onChange={onChange}
      />
    );
    expect(screen.getByText(/erro nome/i)).toBeInTheDocument();
    expect(screen.getByText(/erro celular/i)).toBeInTheDocument();
    expect(screen.getByText(/erro cpf/i)).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText(/nome completo/i), { target: { value: "Novo Nome" } });
    expect(onChange).toHaveBeenCalledWith("nome", "Novo Nome");
    fireEvent.change(screen.getByPlaceholderText(/\(51\) 99999-9999/i), { target: { value: "99999-9999" } });
    expect(onChange).toHaveBeenCalledWith("celular", "99999-9999");
    fireEvent.change(screen.getByPlaceholderText(/123\.456\.789-10/i), { target: { value: "123.456.789-10" } });
    expect(onChange).toHaveBeenCalledWith("cpf", "123.456.789-10");
  });
});

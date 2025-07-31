import { render, screen } from "@testing-library/react";
import GrupoEndereco from "../components/carrinho/GrupoEndereco";

describe("GrupoEndereco", () => {
  it("deve renderizar os campos de endereço com o viaCep", () => {
    const onChange = jest.fn();
    const buscarViaCep = jest.fn();
    render(
      <GrupoEndereco
        form={{
          cep: "",
          uf: "",
          cidade: "",
          endereco: "",
          numero: "",
          complemento: "",
        }}
        erros={{}}
        onChange={onChange}
        buscarViaCep={buscarViaCep}
      />
    );
    expect(screen.getByPlaceholderText("01001-000")).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/uf/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/municipio/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/rua\/avenida\/acesso\/praça/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/número/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/complemento/i)).toBeInTheDocument();
  });
});

import { render, screen, fireEvent } from "@testing-library/react";
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

  it("chama onChange e buscarViaCep ao alterar CEP", () => {
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
    fireEvent.change(screen.getByPlaceholderText("01001-000"), { target: { value: "90000-000" } });
    expect(onChange).toHaveBeenCalledWith("cep", "90000-000");
    expect(buscarViaCep).toHaveBeenCalledWith("90000-000");
  });

  it("chama onChange para outros campos", () => {
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
    fireEvent.change(screen.getByPlaceholderText(/uf/i), { target: { value: "rs" } });
    expect(onChange).toHaveBeenCalledWith("uf", "RS");
    fireEvent.change(screen.getByPlaceholderText(/municipio/i), { target: { value: "Porto Alegre" } });
    expect(onChange).toHaveBeenCalledWith("cidade", "Porto Alegre");
    fireEvent.change(screen.getByPlaceholderText(/rua\/avenida\/acesso\/praça/i), { target: { value: "Rua X" } });
    expect(onChange).toHaveBeenCalledWith("endereco", "Rua X");
    fireEvent.change(screen.getByPlaceholderText(/número/i), { target: { value: "123" } });
    expect(onChange).toHaveBeenCalledWith("numero", "123");
    fireEvent.change(screen.getByPlaceholderText(/complemento/i), { target: { value: "Apto 1" } });
    expect(onChange).toHaveBeenCalledWith("complemento", "Apto 1");
  });
});

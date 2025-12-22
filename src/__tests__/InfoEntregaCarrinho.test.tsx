import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import InfoEntregaCarrinho from "../components/carrinho/InfoEntregaCarrinho";

describe("InfoEntregaCarrinho", () => {
  it("deve renderizar o formulário de entrega", () => {
    const setForm = jest.fn();
    const setErros = jest.fn();
    render(
      <InfoEntregaCarrinho
        form={{
          celular: "",
          numero: "",
          nome: "",
          cpf: "",
          endereco: "",
          complemento: "",
          cidade: "",
          uf: "",
          cep: "",
        }}
        setForm={setForm}
        erros={{}}
        setErros={setErros}
      />
    );
    expect(screen.getByText(/informações de entrega/i)).toBeInTheDocument();
  });

  it("deve preencher endereço ao buscar via CEP", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            logradouro: "Rua Teste",
            localidade: "Cidade Teste",
            uf: "RS",
            complemento: "Apto 1",
          }),
      })
    ) as jest.Mock;
    const setForm = jest.fn();
    const setErros = jest.fn();
    render(
      <InfoEntregaCarrinho
        form={{
          celular: "",
          numero: "",
          nome: "",
          cpf: "",
          endereco: "",
          complemento: "",
          cidade: "",
          uf: "",
          cep: "",
        }}
        setForm={setForm}
        erros={{}}
        setErros={setErros}
      />
    );
    fireEvent.change(screen.getByPlaceholderText("01001-000"), {
      target: { value: "90000000" },
    });
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
  });
});

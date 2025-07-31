import { validarNome, validarCPF, validarCEP, validarUF } from "../../utils/validacoesForm";

describe("validarNome", () => {
  it("deve retornar erro para nome curto", () => {
    expect(validarNome("Ana")).toBe("Nome muito curto");
  });
  it("deve retornar erro para nome com número", () => {
    expect(validarNome("João1")).toBe("Nome não pode conter números ou caracteres especiais");
  });
  it("deve retornar erro para nome com caractere especial", () => {
    expect(validarNome("João!")).toBe("Nome não pode conter números ou caracteres especiais");
  });
  it("deve retornar erro null para nome válido", () => {
    expect(validarNome("João Silva")).toBeNull();
  });
});

describe("validarCPF", () => {
  it("deve retornar false para CPF com menos de 11 dígitos", () => {
    expect(validarCPF("123.456.789-0")).toBe(false);
  });
  it("deve retornar false para CPF com todos dígitos iguais", () => {
    expect(validarCPF("111.111.111-11")).toBe(false);
  });
  it("deve retornar false para CPF inválido", () => {
    expect(validarCPF("123.456.789-10")).toBe(false);
  });
  it("deve retornar true para CPF válido", () => {
    expect(validarCPF("390.533.447-05")).toBe(true);
  });
});

describe("validarCEP", () => {
  it("deve retornar true para CEP com hífen", () => {
    expect(validarCEP("90000-000")).toBe(true);
  });
  it("deve retornar true para CEP sem hífen", () => {
    expect(validarCEP("90000000")).toBe(true);
  });
  it("deve retornar false para CEP inválido", () => {
    expect(validarCEP("90000-00")).toBe(false);
  });
});

describe("validarUF", () => {
  it("deve retornar true para UF válida", () => {
    expect(validarUF("RS")).toBe(true);
  });
  it("deve retornar false para UF minúscula", () => {
    expect(validarUF("rs")).toBe(false);
  });
  it("deve retornar false para UF com 1 letra", () => {
    expect(validarUF("R")).toBe(false);
  });
  it("deve retornar false para UF com 3 letras", () => {
    expect(validarUF("RSC")).toBe(false);
  });
});

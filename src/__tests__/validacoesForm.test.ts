import { validarNome, validarCPF, validarCEP, validarUF } from "../utils/validacoesForm";

describe("validacoesForm", () => {
  it("deve validar nome corretamente", () => {
    expect(validarNome("Jo")).toBe("Nome muito curto");
    expect(validarNome("João1")).toBe("Nome não pode conter números ou caracteres especiais");
    expect(validarNome("João Silva")).toBeNull();
  });
  it("deve validar CPF corretamente", () => {
    expect(validarCPF("000.000.000-00")).toBe(false);
    expect(validarCPF("390.533.447-05")).toBe(true);
  });
  it("deve validar CEP corretamente", () => {
    expect(validarCEP("90000-000")).toBe(true);
    expect(validarCEP("90000000")).toBe(true);
    expect(validarCEP("90000-00")).toBe(false);
  });
  it("deve validar UF corretamente", () => {
    expect(validarUF("RS")).toBe(true);
    expect(validarUF("rs")).toBe(false);
    expect(validarUF("R")).toBe(false);
  });
});

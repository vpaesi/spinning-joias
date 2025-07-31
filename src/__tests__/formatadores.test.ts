import { formatarCPF, formatarCEP, formatarCelular } from "../utils/formatadores";

describe("formatarCPF", () => {
  it("deve formatar o CPF corretamente", () => {
    expect(formatarCPF("12345678901")).toBe("123.456.789-01");
    expect(formatarCPF("")).toBe("");
  });
});

describe("formatarCEP", () => {
  it("deve formatar o CEP corretamente", () => {
    expect(formatarCEP("90000000")).toBe("90000-000");
    expect(formatarCEP("")).toBe("");
  });
});

describe("formatarCelular", () => {
  it("deve formatar o celular corretamente", () => {
    expect(formatarCelular("51999999999")).toMatch(/\(\d{2}\) \d{5}-\d{4}/);
    expect(formatarCelular("")).toBe("");
  });
});

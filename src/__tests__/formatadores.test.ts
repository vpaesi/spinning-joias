import { formatarCPF, formatarCEP, formatarCelular } from "../utils/formatadores";

describe("formatarCPF", () => {
  it("deve formatar CPF conforme digitado", () => {
    expect(formatarCPF("1")).toBe("1");
    expect(formatarCPF("123")).toBe("123");
    expect(formatarCPF("1234")).toBe("123.4");
    expect(formatarCPF("123456")).toBe("123.456");
    expect(formatarCPF("123456789")).toBe("123.456.789");
    expect(formatarCPF("12345678901")).toBe("123.456.789-01");
    expect(formatarCPF("123.456.789-01")).toBe("123.456.789-01");
  });
});

describe("formatarCEP", () => {
  it("deve formatar CEP conforme digitado", () => {
    expect(formatarCEP("1")).toBe("1");
    expect(formatarCEP("12345")).toBe("12345");
    expect(formatarCEP("12345678")).toBe("12345-678");
    expect(formatarCEP("12345-678")).toBe("12345-678");
  });
});

describe("formatarCelular", () => {
  it("deve formatar celular conforme digitado", () => {
    expect(formatarCelular("1")).toBe("1");
    expect(formatarCelular("519")).toBe("(51) 9");
    expect(formatarCelular("51999999999")).toBe("(51) 99999-9999");
    expect(formatarCelular("(51) 99999-9999")).toBe("(51) 99999-9999");
  });
});

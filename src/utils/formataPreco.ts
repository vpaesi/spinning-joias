export function formatoDoPreco(preco: unknown): string {
  if (typeof preco === "number") {
    return preco.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }
  return "--";
}

export function formatoDoPrecoSemDesconto(preco: unknown, desconto: number = 0.1): string {
  if (typeof preco === "number") {
    return (preco * (1 + desconto)).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }
  return "--";
}

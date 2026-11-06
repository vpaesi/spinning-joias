export function formatoDoPreco(preco: unknown): string {
  if (typeof preco === "number") {
    return preco.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }
  return "--";
}

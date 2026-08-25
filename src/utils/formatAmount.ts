const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function formatAmount(value: string) {
  const amount = Number(value);

  return Number.isFinite(amount) ? currencyFormatter.format(amount) : value;
}

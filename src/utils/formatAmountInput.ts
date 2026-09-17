export function formatAmountInput(value: string) {
  const digits = value.replace(/\D/g, "");

  if (!digits) {
    return "";
  }

  const amountInCents = digits.padStart(3, "0");
  const integerPart = amountInCents.slice(0, -2).replace(/^0+(?=\d)/, "");
  const decimalPart = amountInCents.slice(-2);

  return `${integerPart},${decimalPart}`;
}

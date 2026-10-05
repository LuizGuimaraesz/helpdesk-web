import type { TicketApi } from "../types/ticket";

export function getTicketTotal(
  ticket: Pick<TicketApi, "initialService" | "additionalServices">,
) {
  const amounts = [
    ticket.initialService.amount,
    ...(ticket.additionalServices ?? []).map((service) => service.amount),
  ];

  const totalInCents = amounts.reduce((total, amount) => {
    const cents = Math.round(Number(amount) * 100);

    return Number.isFinite(cents) ? total + cents : total;
  }, 0);

  return totalInCents / 100;
}

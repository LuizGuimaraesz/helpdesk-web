import type { TicketApi, TicketDetails } from "../types/ticket";
import { formatAmount } from "./formatAmount";
import { formatDate } from "./formatDate";
import { getTicketTotal } from "./getTicketTotal";

export function toTicketDetails(ticket: TicketApi): TicketDetails {
  return {
    id: ticket.id,
    number: String(ticket.number).padStart(5, "0"),
    title: ticket.title,
    description: ticket.description,
    category: ticket.initialService.title,
    createdAt: formatDate(ticket.createdAt),
    updatedAt: formatDate(ticket.updatedAt),
    client: ticket.client.name,
    technician: {
      name: ticket.technician?.name ?? "Sem técnico responsável",
      email: ticket.technician?.email ?? "Não atribuído",
    },
    baseAmount: formatAmount(ticket.initialService.amount),
    additionalServices: (ticket.additionalServices ?? []).map((service) => ({
      ...service,
      amount: formatAmount(service.amount),
    })),
    totalAmount: formatAmount(String(getTicketTotal(ticket))),
    status: ticket.status,
  };
}

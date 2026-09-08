import type { Ticket, TicketApi } from "../types/ticket";
import { formatAmount } from "./formatAmount";
import { formatDate } from "./formatDate";

export function toTicketListItem(ticket: TicketApi): Ticket {
  return {
    id: ticket.id,
    number: String(ticket.number).padStart(5, "0"),
    updatedAt: formatDate(ticket.updatedAt),
    title: ticket.title,
    service: ticket.initialService.title,
    total: formatAmount(ticket.initialService.amount),
    client: ticket.client.name,
    technician: ticket.technician?.name ?? "Sem técnico",
    status: ticket.status,
  };
}

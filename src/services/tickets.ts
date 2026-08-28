import type {
  TicketResponse,
  TicketsResponse,
  TicketStatus,
} from "../types/ticket";
import { api } from "./api";

export async function getTickets() {
  const response = await api.get<TicketsResponse>("/tickets");

  return response.data;
}

export async function getTicket(id: string) {
  const response = await api.get<TicketResponse>(`/tickets/${id}`);

  return response.data;
}

export async function updateTicketStatus(id: string, status: TicketStatus) {
  await api.patch(`/tickets/${id}/status`, { status });
}

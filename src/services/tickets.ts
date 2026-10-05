import type {
  TicketResponse,
  TicketsResponse,
  TicketStatus,
  CreateTicket,
  TicketAdditionalService,
} from "../types/ticket";
import { api } from "./api";

export async function createTicket({
  title,
  description,
  initialServiceId,
}: CreateTicket) {
  const response = await api.post<TicketResponse>("/tickets", {
    title,
    description,
    initialServiceId,
  });

  return response.data.ticket;
}

export async function getTickets(signal?: AbortSignal) {
  const response = await api.get<TicketsResponse>("/tickets", { signal });

  return response.data;
}

export async function getTicket(id: string, signal?: AbortSignal) {
  const response = await api.get<TicketResponse>(`/tickets/${id}`, { signal });

  return response.data;
}

export async function updateTicketStatus(id: string, status: TicketStatus) {
  const response = await api.patch<TicketResponse>(`/tickets/${id}/status`, {
    status,
  });

  return response.data.ticket;
}

export async function createAdditionalService(
  ticketId: string,
  data: Pick<TicketAdditionalService, "title"> & { amount: number },
) {
  const response = await api.post<{ service: TicketAdditionalService }>(
    `/tickets/${ticketId}/services`,
    data,
  );

  return response.data.service;
}

export async function deleteAdditionalService(
  ticketId: string,
  serviceId: string,
) {
  await api.delete(`/tickets/${ticketId}/services/${serviceId}`);
}

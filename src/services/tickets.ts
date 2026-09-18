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
  await api.post("/tickets", { title, description, initialServiceId });
}

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

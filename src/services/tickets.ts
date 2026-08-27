import type { TicketsResponse } from "../types/ticket";
import { api } from "./api";

export async function getTickets() {
  const response = await api.get<TicketsResponse>("/tickets");

  return response.data;
}

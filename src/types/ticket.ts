export type TicketStatus = "open" | "in_progress" | "closed";

export type Ticket = {
  id: string;
  updatedAt: string;
  title: string;
  service: string;
  total: string;
  client: string;
  technician: string;
  status: TicketStatus;
};

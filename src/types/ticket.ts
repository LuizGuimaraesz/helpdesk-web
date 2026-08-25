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

export type TicketApi = {
  id: string;
  number: number;
  updatedAt: string;
  title: string;
  status: TicketStatus;
  clientId: string;
  technicianId: string | null;
  initialService: {
    title: string;
    amount: string;
  };
};

export type TicketsResponse = {
  tickets: TicketApi[];
};

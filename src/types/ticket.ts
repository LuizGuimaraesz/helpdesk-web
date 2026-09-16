export type TicketStatus = "open" | "in_progress" | "closed";

export type Ticket = {
  id: string;
  number: string;
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
  title: string;
  description: string;
  status: TicketStatus;
  createdAt: string;
  updatedAt: string;

  client: {
    id: string;
    name: string;
  };

  technician: {
    id: string;
    name: string;
    email: string;
  } | null;

  initialService: {
    serviceId: string;
    title: string;
    amount: string;
  };
};

export type TicketsResponse = {
  tickets: TicketApi[];
};

export type TicketResponse = {
  ticket: TicketApi;
};

export type CreateTicket = {
  title: string;
  description: string;
  initialServiceId: string;
};

export type TicketAdditionalService = {
  id: string;
  description: string;
  amount: string;
};

export type TicketDetails = {
  id: string;
  number: string;
  title: string;
  description: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  client: string;
  technician: {
    name: string;
    email: string;
  };
  baseAmount: string;
  additionalServices: TicketAdditionalService[];
  totalAmount: string;
  status: TicketStatus;
};

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

  client: {
    id: string;
    name: string;
  };

  technician: {
    id: string;
    name: string;
  } | null;

  initialService: {
    title: string;
    amount: string;
  };
};

export type TicketsResponse = {
  tickets: TicketApi[];
};

export type TicketAdditionalService = {
  id: string;
  title: string;
  amount: string;
};

export type TicketDetails = {
  id: string;
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

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TicketsList } from "../components/tickets/TicketsList";
import { ListHeader } from "../components/ui/ListHeader";
import { useAuth } from "../hooks/useAuth";
import { getTickets } from "../services/tickets";
import type { Ticket } from "../types/ticket";
import { getErrorMessage } from "../utils/getErrorMessage";
import { toTicketListItem } from "../utils/toTicketListItem";

type TicketsPageProps = {
  actionVariant: "edit" | "view";
  title: string;
};

export function TicketsPage({ actionVariant, title }: TicketsPageProps) {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const { isLoading, session } = useAuth();
  const navigate = useNavigate();

  async function loadTickets() {
    try {
      const data = await getTickets();

      setTickets(data.tickets.map(toTicketListItem));
    } catch (error) {
      alert(getErrorMessage(error, "Falha ao carregar os chamados."));
    }
  }

  useEffect(() => {
    if (isLoading || !session) {
      return;
    }

    loadTickets();
  }, [isLoading, session]);

  return (
    <section
      aria-labelledby="tickets-title"
      className="flex min-w-0 flex-col gap-6"
    >
      <ListHeader title={title} titleId="tickets-title" />

      <TicketsList
        tickets={tickets}
        actionVariant={actionVariant}
        onClickTicket={(ticket) => navigate(`/tickets/${ticket.id}`)}
      />
    </section>
  );
}

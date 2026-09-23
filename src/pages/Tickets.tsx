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
  mobileCompact?: boolean;
};

export function TicketsPage({
  actionVariant,
  title,
  mobileCompact = false,
}: TicketsPageProps) {
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
      className={
        mobileCompact ? "flex min-w-0 flex-col gap-5 md:gap-6" : "flex min-w-0 flex-col gap-6"
      }
    >
      <ListHeader title={title} titleId="tickets-title" />

      <TicketsList
        tickets={tickets}
        actionVariant={actionVariant}
        mobileCompact={mobileCompact}
        onClickTicket={(ticket) => navigate(`/tickets/${ticket.id}`)}
      />
    </section>
  );
}

import { useEffect, useState } from "react";
import { TicketsList } from "../../components/tickets/TicketsList";
import type { Ticket } from "../../types/ticket";
import { useAuth } from "../../hooks/useAuth";
import { formatAmount } from "../../utils/formatAmount";
import { formatDate } from "../../utils/formatDate";
import { getTickets } from "../../services/tickets";
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { ListHeader } from "../../components/ui/ListHeader";

export function TicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const { isLoading, session } = useAuth();
  const navigate = useNavigate();

  async function loadTickets() {
    try {
      const data = await getTickets();

      setTickets(
        data.tickets.map((ticket) => ({
          id: ticket.id,
          number: String(ticket.number).padStart(5, "0"),
          updatedAt: formatDate(ticket.updatedAt),
          title: ticket.title,
          service: ticket.initialService.title,
          total: formatAmount(ticket.initialService.amount),
          client: ticket.client.name,
          technician: ticket.technician?.name ?? "Sem técnico",
          status: ticket.status,
        })),
      );
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
      <ListHeader title="Chamados" titleId="tickets-title" />

      <TicketsList
        tickets={tickets}
        onEditTicket={(ticket) => navigate(`/tickets/${ticket.id}`)}
      />
    </section>
  );
}

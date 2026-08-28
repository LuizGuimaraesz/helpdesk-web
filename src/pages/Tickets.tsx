import { useEffect, useState } from "react";
import { TicketsList } from "../components/tickets/TicketsList";
import type { Ticket } from "../types/ticket";
import { AxiosError } from "axios";
import { useAuth } from "../hooks/useAuth";
import { formatAmount } from "../utils/formatAmount";
import { formatDate } from "../utils/formatDate";
import { getTickets } from "../services/tickets";
import { useNavigate } from "react-router-dom";

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
      if (error instanceof AxiosError) {
        return alert(
          error.response?.data?.error ??
            error.response?.data?.message ??
            "Falha ao carregar os chamados.",
        );
      }

      alert("Não foi possivel carregar");
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
      <h1
        id="tickets-title"
        className="text-brand text-2xl leading-[1.4] font-bold"
      >
        Chamados
      </h1>

      <TicketsList
        tickets={tickets}
        onEditTicket={(ticket) => navigate(`/tickets/${ticket.id}`)}
      />
    </section>
  );
}

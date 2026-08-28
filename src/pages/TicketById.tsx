import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { Link, useParams } from "react-router-dom";
import { TicketActions } from "../components/tickets/TicketActions";
import { TicketCostsCard } from "../components/tickets/TicketCostCard";
import { TicketDetailsCard } from "../components/tickets/TicketDetailsCard";
import { useAuth } from "../hooks/useAuth";
import { getTicket } from "../services/tickets";
import type { TicketApi, TicketDetails, TicketStatus } from "../types/ticket";
import { formatAmount } from "../utils/formatAmount";
import { formatDate } from "../utils/formatDate";

function toTicketDetails(ticket: TicketApi): TicketDetails {
  const baseAmount = formatAmount(ticket.initialService.amount);

  return {
    id: ticket.id,
    number: String(ticket.number).padStart(5, "0"),
    title: ticket.title,
    description: ticket.description,
    category: ticket.initialService.title,
    createdAt: formatDate(ticket.createdAt),
    updatedAt: formatDate(ticket.updatedAt),
    client: ticket.client.name,
    technician: {
      name: ticket.technician?.name ?? "Sem técnico responsável",
      email: ticket.technician?.email ?? "Não atribuído",
    },
    baseAmount,
    additionalServices: [],
    totalAmount: baseAmount,
    status: ticket.status,
  };
}

export function TicketByIdPage() {
  const { ticketId } = useParams<{ ticketId: string }>();
  const { isLoading: isAuthLoading, session } = useAuth();
  const [ticket, setTicket] = useState<TicketDetails | null>(null);

  async function loadTicket(id: string) {
    try {
      const data = await getTicket(id);

      setTicket(toTicketDetails(data.ticket));
    } catch (error) {
      if (error instanceof AxiosError) {
        return alert(
          error.response?.data?.error ??
            error.response?.data?.message ??
            "Falha ao carregar o chamado.",
        );
      } else {
        alert("Não foi possível carregar o chamado.");
      }
    }
  }

  function handleChangeStatus(status: TicketStatus) {
    setTicket((currentTicket) =>
      currentTicket ? { ...currentTicket, status } : currentTicket,
    );
  }

  useEffect(() => {
    if (isAuthLoading || !session || !ticketId) {
      return;
    }

    loadTicket(ticketId);
  }, [isAuthLoading, session, ticketId]);

  return (
    <section
      aria-labelledby="ticket-details-title"
      className="flex w-full max-w-[900px] min-w-0 flex-col gap-6"
    >
      <header className="flex flex-wrap items-end justify-between gap-5">
        <div className="flex flex-col gap-3">
          <Link
            to="/tickets"
            className="text-muted hover:text-foreground focus-visible:outline-brand inline-flex w-fit items-center gap-2 text-xs leading-[1.4] transition-colors focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <ArrowLeft aria-hidden="true" className="size-3.5" />
            Voltar
          </Link>

          <h1
            id="ticket-details-title"
            className="text-brand text-2xl leading-[1.4] font-bold"
          >
            Chamado detalhado
          </h1>
        </div>

        {ticket && (
          <TicketActions
            status={ticket.status}
            onChangeStatus={handleChangeStatus}
          />
        )}
      </header>

      {ticket && (
        <div className="grid min-w-0 items-start gap-5 lg:grid-cols-[minmax(0,1.62fr)_minmax(245px,1fr)]">
          <TicketDetailsCard ticket={ticket} />
          <TicketCostsCard ticket={ticket} />
        </div>
      )}
    </section>
  );
}

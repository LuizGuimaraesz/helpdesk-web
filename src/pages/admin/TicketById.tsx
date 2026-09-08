import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { TicketActions } from "../../components/tickets/TicketActions";
import { TicketCostsCard } from "../../components/tickets/TicketCostCard";
import { TicketDetailsCard } from "../../components/tickets/TicketDetailsCard";
import { useAuth } from "../../hooks/useAuth";
import { getTicket, updateTicketStatus } from "../../services/tickets";
import type { TicketApi, TicketDetails, TicketStatus } from "../../types/ticket";
import { formatAmount } from "../../utils/formatAmount";
import { formatDate } from "../../utils/formatDate";
import { getErrorMessage } from "../../utils/getErrorMessage";

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
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  async function loadTicket(id: string) {
    try {
      const data = await getTicket(id);

      setTicket(toTicketDetails(data.ticket));
    } catch (error) {
      alert(getErrorMessage(error, "Falha ao carregar o chamado."));
    }
  }

  async function handleChangeStatus(status: TicketStatus) {
    if (!ticket) {
      return;
    }

    try {
      setIsUpdatingStatus(true);
      await updateTicketStatus(ticket.id, status);

      setTicket((currentTicket) =>
        currentTicket ? { ...currentTicket, status } : currentTicket,
      );
    } catch (error) {
      alert(
        getErrorMessage(error, "Falha ao atualizar o status do chamado."),
      );
    } finally {
      setIsUpdatingStatus(false);
    }
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
      className="mx-auto flex w-full max-w-[900px] min-w-0 flex-col gap-6"
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
            isUpdating={isUpdatingStatus}
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

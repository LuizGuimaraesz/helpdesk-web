import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TechnicianTicketCard } from "../../components/technicians/TechnicianTicketCard";
import { TicketStatus } from "../../components/tickets/TicketStatus";
import { ListHeader } from "../../components/ui/ListHeader";
import { useAuth } from "../../hooks/useAuth";
import { getTickets, updateTicketStatus } from "../../services/tickets";
import type { TicketApi, TicketStatus as Status } from "../../types/ticket";
import { getErrorMessage } from "../../utils/getErrorMessage";

const sections: { status: Status; title: string }[] = [
  { status: "open", title: "Aberto" },
  { status: "in_progress", title: "Em atendimento" },
  { status: "closed", title: "Encerrado" },
];

export function TechnicianTicketsPage() {
  const { isLoading: isLoadingSession, session } = useAuth();
  const navigate = useNavigate();
  const [tickets, setTickets] = useState<TicketApi[]>([]);
  const [isLoadingTickets, setIsLoadingTickets] = useState(true);
  const [updatingTicketId, setUpdatingTicketId] = useState<string | null>(null);

  async function loadTickets(technicianId: string) {
    try {
      const data = await getTickets();
      setTickets(
        data.tickets.filter((ticket) => ticket.technician?.id === technicianId),
      );
    } catch (error) {
      alert(getErrorMessage(error, "Falha ao carregar os chamados."));
    } finally {
      setIsLoadingTickets(false);
    }
  }

  async function handleChangeStatus(ticketId: string, status: Status) {
    if (updatingTicketId) {
      return;
    }

    try {
      setUpdatingTicketId(ticketId);
      await updateTicketStatus(ticketId, status);
      setTickets((currentTickets) =>
        currentTickets.map((ticket) =>
          ticket.id === ticketId ? { ...ticket, status } : ticket,
        ),
      );
    } catch (error) {
      alert(getErrorMessage(error, "Falha ao atualizar o status do chamado."));
    } finally {
      setUpdatingTicketId(null);
    }
  }

  useEffect(() => {
    if (isLoadingSession || !session) {
      return;
    }

    loadTickets(session.user.id);
  }, [isLoadingSession, session]);

  return (
    <section
      aria-labelledby="technician-tickets-title"
      className="flex min-w-0 flex-col gap-6"
    >
      <ListHeader title="Meus chamados" titleId="technician-tickets-title" />

      {isLoadingTickets ? (
        <p role="status" className="text-muted text-sm">
          Carregando chamados...
        </p>
      ) : (
        <div className="flex min-w-0 flex-col gap-5">
          {sections.map(({ status, title }) => {
            const sectionTickets = tickets.filter(
              (ticket) => ticket.status === status,
            );

            return (
              <section
                key={status}
                aria-label={`Chamados ${title.toLowerCase()}`}
              >
                <div className="mb-3">
                  <TicketStatus status={status} />
                </div>
                <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,290px),1fr))] gap-4">
                  {sectionTickets.map((ticket) => (
                    <TechnicianTicketCard
                      key={ticket.id}
                      ticket={ticket}
                      isUpdating={updatingTicketId === ticket.id}
                      onEdit={() => navigate(`/tickets/${ticket.id}`)}
                      onChangeStatus={(nextStatus) =>
                        handleChangeStatus(ticket.id, nextStatus)
                      }
                    />
                  ))}
                </div>
                {sectionTickets.length === 0 && (
                  <p className="text-muted text-sm mb-4">
                    Nenhum chamado nesta etapa.
                  </p>
                )}
              </section>
            );
          })}
        </div>
      )}
    </section>
  );
}

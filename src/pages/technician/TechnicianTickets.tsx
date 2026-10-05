import { useEffect, useRef, useState } from "react";
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
  const userId = session?.user.id;
  const navigate = useNavigate();
  const [tickets, setTickets] = useState<TicketApi[]>([]);
  const [isLoadingTickets, setIsLoadingTickets] = useState(true);
  const [updatingTicketId, setUpdatingTicketId] = useState<string | null>(null);
  const loadControllerRef = useRef<AbortController | null>(null);
  const isUpdatingRef = useRef(false);

  async function handleChangeStatus(ticketId: string, status: Status) {
    const controller = loadControllerRef.current;
    if (
      isUpdatingRef.current ||
      isLoadingTickets ||
      !controller ||
      controller.signal.aborted
    ) {
      return;
    }

    isUpdatingRef.current = true;
    try {
      setUpdatingTicketId(ticketId);
      const updatedTicket = await updateTicketStatus(ticketId, status);

      if (!controller.signal.aborted) {
        setTickets((currentTickets) =>
          currentTickets.map((ticket) =>
            ticket.id === ticketId ? updatedTicket : ticket,
          ),
        );
      }
    } catch (error) {
      if (!controller.signal.aborted) {
        alert(getErrorMessage(error, "Falha ao atualizar o status do chamado."));
      }
    } finally {
      if (!controller.signal.aborted) {
        isUpdatingRef.current = false;
        setUpdatingTicketId(null);
      }
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    loadControllerRef.current = controller;
    isUpdatingRef.current = false;
    setUpdatingTicketId(null);
    setTickets([]);

    if (isLoadingSession || !userId) {
      setIsLoadingTickets(isLoadingSession);
      return () => controller.abort();
    }

    const technicianId = userId;
    setIsLoadingTickets(true);

    async function loadTickets() {
      try {
        const data = await getTickets(controller.signal);
        if (!controller.signal.aborted) {
          setTickets(
            data.tickets.filter((ticket) => ticket.technician?.id === technicianId),
          );
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          alert(getErrorMessage(error, "Falha ao carregar os chamados."));
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoadingTickets(false);
        }
      }
    }

    loadTickets();
    return () => controller.abort();
  }, [isLoadingSession, userId]);

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
                      isUpdating={updatingTicketId !== null}
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

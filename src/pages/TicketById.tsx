import { ArrowLeft } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { TicketActions } from "../components/tickets/TicketActions";
import { ServiceForm } from "../components/services/ServiceForm";
import { TicketAdditionalServices } from "../components/tickets/TicketAdditionalServices";
import { TicketCostsCard } from "../components/tickets/TicketCostCard";
import { TicketDetailsCard } from "../components/tickets/TicketDetailsCard";
import { useAuth } from "../hooks/useAuth";
import {
  createAdditionalService,
  deleteAdditionalService,
  getTicket,
  updateTicketStatus,
} from "../services/tickets";
import type { TicketApi, TicketStatus } from "../types/ticket";
import { getErrorMessage } from "../utils/getErrorMessage";
import { toTicketDetails } from "../utils/toTicketDetails";

type TicketByIdPageProps = {
  backTo?: string;
  showActions?: boolean;
};

type TicketAction = "status" | "add" | { deletingServiceId: string };

export function TicketByIdPage({
  backTo = "/tickets",
  showActions = true,
}: TicketByIdPageProps) {
  const { ticketId } = useParams<{ ticketId: string }>();
  const { isLoading: isAuthLoading, session } = useAuth();
  const userId = session?.user.id;
  const [ticketData, setTicketData] = useState<TicketApi | null>(null);
  const [isLoadingTicket, setIsLoadingTicket] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [pendingAction, setPendingAction] = useState<TicketAction | null>(null);
  const [isAdditionalServiceModalOpen, setIsAdditionalServiceModalOpen] =
    useState(false);
  const loadControllerRef = useRef<AbortController | null>(null);
  const isMutatingRef = useRef(false);
  const ticket =
    ticketData && ticketData.id === ticketId ? toTicketDetails(ticketData) : null;

  useEffect(() => {
    const controller = new AbortController();
    loadControllerRef.current = controller;
    isMutatingRef.current = false;
    setPendingAction(null);
    setIsAdditionalServiceModalOpen(false);
    setTicketData(null);
    setErrorMessage(null);

    if (isAuthLoading || !userId || !ticketId) {
      setIsLoadingTicket(isAuthLoading);
      return () => controller.abort();
    }

    const id = ticketId;
    setIsLoadingTicket(true);

    async function loadTicket() {
      try {
        const data = await getTicket(id, controller.signal);

        if (!controller.signal.aborted) {
          setTicketData(data.ticket);
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          setErrorMessage(getErrorMessage(error, "Falha ao carregar o chamado."));
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoadingTicket(false);
        }
      }
    }

    loadTicket();
    return () => controller.abort();
  }, [isAuthLoading, userId, ticketId]);

  function beginAction(action: TicketAction) {
    const controller = loadControllerRef.current;

    if (
      !ticket ||
      !controller ||
      controller.signal.aborted ||
      isMutatingRef.current
    ) {
      return null;
    }

    isMutatingRef.current = true;
    setPendingAction(action);
    return controller;
  }

  function finishAction(controller: AbortController) {
    if (!controller.signal.aborted) {
      isMutatingRef.current = false;
      setPendingAction(null);
    }
  }

  async function handleChangeStatus(status: TicketStatus) {
    if (!ticket) {
      return;
    }

    const controller = beginAction("status");
    if (!controller) {
      return;
    }

    try {
      const updatedTicket = await updateTicketStatus(ticket.id, status);

      if (!controller.signal.aborted) {
        setTicketData(updatedTicket);
      }
    } catch (error) {
      if (!controller.signal.aborted) {
        alert(getErrorMessage(error, "Falha ao atualizar o status do chamado."));
      }
    } finally {
      finishAction(controller);
    }
  }

  async function handleAddAdditionalService(title: string, amount: number) {
    if (!ticket || session?.user.role !== "technician") {
      return;
    }

    const controller = beginAction("add");
    if (!controller) {
      return;
    }

    try {
      const service = await createAdditionalService(ticket.id, { title, amount });

      if (!controller.signal.aborted) {
        setTicketData((currentTicket) =>
          currentTicket?.id === ticket.id
            ? {
                ...currentTicket,
                additionalServices: [
                  ...(currentTicket.additionalServices ?? []),
                  service,
                ],
              }
            : currentTicket,
        );
        setIsAdditionalServiceModalOpen(false);
      }
    } catch (error) {
      if (!controller.signal.aborted) {
        throw error;
      }
    } finally {
      finishAction(controller);
    }
  }

  async function handleDeleteAdditionalService(serviceId: string) {
    if (!ticket || session?.user.role !== "technician") {
      return;
    }

    const controller = beginAction({ deletingServiceId: serviceId });
    if (!controller) {
      return;
    }

    try {
      await deleteAdditionalService(ticket.id, serviceId);

      if (!controller.signal.aborted) {
        setTicketData((currentTicket) =>
          currentTicket?.id === ticket.id
            ? {
                ...currentTicket,
                additionalServices: (
                  currentTicket.additionalServices ?? []
                ).filter((service) => service.id !== serviceId),
              }
            : currentTicket,
        );
      }
    } catch (error) {
      if (!controller.signal.aborted) {
        alert(
          getErrorMessage(error, "Não foi possível excluir o serviço adicional."),
        );
      }
    } finally {
      finishAction(controller);
    }
  }

  return (
    <section
      aria-labelledby="ticket-details-title"
      className="mx-auto flex w-full max-w-[900px] min-w-0 flex-col gap-6"
    >
      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-5">
        <div className="flex flex-col gap-3">
          <Link
            to={backTo}
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

        {showActions && ticket && (
          <TicketActions
            status={ticket.status}
            isUpdating={pendingAction !== null}
            onChangeStatus={handleChangeStatus}
          />
        )}
      </header>

      {isLoadingTicket && (
        <p role="status" className="text-muted text-sm">
          Carregando chamado...
        </p>
      )}
      {errorMessage && (
        <p role="alert" className="text-feedback-error text-sm font-medium">
          {errorMessage}
        </p>
      )}

      {ticket && (
        <div className="grid min-w-0 items-start gap-5 lg:grid-cols-[minmax(0,1.62fr)_minmax(245px,1fr)]">
          <div className="flex min-w-0 flex-col gap-5">
            <TicketDetailsCard ticket={ticket} />
            {session?.user.role === "technician" && (
              <TicketAdditionalServices
                services={ticket.additionalServices}
                deletingServiceId={
                  typeof pendingAction === "object" && pendingAction
                    ? pendingAction.deletingServiceId
                    : null
                }
                isDisabled={pendingAction !== null}
                onAdd={() => setIsAdditionalServiceModalOpen(true)}
                onDelete={handleDeleteAdditionalService}
              />
            )}
          </div>
          <TicketCostsCard ticket={ticket} />
        </div>
      )}

      {session?.user.role === "technician" && (
        <ServiceForm
          purpose="additional"
          isOpen={Boolean(ticket) && isAdditionalServiceModalOpen}
          isSaving={pendingAction === "add"}
          onClose={() => {
            if (!isMutatingRef.current) {
              setIsAdditionalServiceModalOpen(false);
            }
          }}
          onCreate={handleAddAdditionalService}
          createModalTitle="Serviço adicional"
        />
      )}
    </section>
  );
}

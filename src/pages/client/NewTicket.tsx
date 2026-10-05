import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TicketForm } from "../../components/tickets/TicketForm";
import { ListHeader } from "../../components/ui/ListHeader";
import { useAuth } from "../../hooks/useAuth";
import { getServices } from "../../services/services";
import { createTicket } from "../../services/tickets";
import type { Service } from "../../types/service";
import type { CreateTicket } from "../../types/ticket";
import { getErrorMessage } from "../../utils/getErrorMessage";

export function NewTicketPage() {
  const navigate = useNavigate();
  const { isLoading: isLoadingSession, session } = useAuth();
  const userId = session?.user.id;
  const [services, setServices] = useState<Service[]>([]);
  const [isLoadingServices, setIsLoadingServices] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const loadControllerRef = useRef<AbortController | null>(null);
  const isSubmittingRef = useRef(false);

  async function handleCreateTicket(data: CreateTicket) {
    const controller = loadControllerRef.current;
    if (
      isSubmittingRef.current ||
      isLoadingServices ||
      !controller ||
      controller.signal.aborted
    ) {
      return;
    }

    isSubmittingRef.current = true;
    try {
      setIsSubmitting(true);
      setErrorMessage(null);
      await createTicket(data);

      if (!controller.signal.aborted) {
        navigate("/tickets");
      }
    } catch (error) {
      if (!controller.signal.aborted) {
        setErrorMessage(
          getErrorMessage(error, "Não foi possível criar o chamado."),
        );
      }
    } finally {
      if (!controller.signal.aborted) {
        isSubmittingRef.current = false;
        setIsSubmitting(false);
      }
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    loadControllerRef.current = controller;
    isSubmittingRef.current = false;
    setIsSubmitting(false);
    setServices([]);
    setErrorMessage(null);

    if (isLoadingSession || !userId) {
      setIsLoadingServices(isLoadingSession);
      return () => controller.abort();
    }

    setIsLoadingServices(true);

    async function loadServices() {
      try {
        const data = await getServices(controller.signal);
        if (!controller.signal.aborted) {
          setServices(data.services.filter((service) => service.active));
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          setErrorMessage(
            getErrorMessage(error, "Falha ao carregar as categorias de serviço."),
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoadingServices(false);
        }
      }
    }

    loadServices();
    return () => controller.abort();
  }, [isLoadingSession, userId]);

  if (isLoadingSession) {
    return <p className="text-muted text-sm">Carregando categorias...</p>;
  }

  return (
    <section
      aria-labelledby="new-ticket-title"
      className="mx-auto flex w-full max-w-[960px] min-w-0 flex-col gap-7"
    >
      <ListHeader title="Novo chamado" titleId="new-ticket-title" />

      <TicketForm
        services={services}
        isLoadingServices={isLoadingServices}
        isSubmitting={isSubmitting}
        errorMessage={errorMessage}
        onSubmit={handleCreateTicket}
      />
    </section>
  );
}

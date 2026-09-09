import { useEffect, useState } from "react";
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
  const [services, setServices] = useState<Service[]>([]);
  const [isLoadingServices, setIsLoadingServices] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function loadServices() {
    try {
      setIsLoadingServices(true);
      setErrorMessage(null);
      const data = await getServices();

      setServices(data.services.filter((service) => service.active));
    } catch (error) {
      setErrorMessage(
        getErrorMessage(error, "Falha ao carregar as categorias de serviço."),
      );
    } finally {
      setIsLoadingServices(false);
    }
  }

  async function handleCreateTicket(data: CreateTicket) {
    try {
      setIsSubmitting(true);
      setErrorMessage(null);
      await createTicket(data);

      navigate("/tickets");
    } catch (error) {
      setErrorMessage(getErrorMessage(error, "Não foi possível criar o chamado."));
    } finally {
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    if (isLoadingSession) {
      return;
    }

    if (!session) {
      setIsLoadingServices(false);
      return;
    }

    loadServices();
  }, [isLoadingSession, session]);

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

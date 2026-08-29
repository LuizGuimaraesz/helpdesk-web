import { Plus } from "lucide-react";
import { useState } from "react";
import { AxiosError } from "axios";
import { ServicesList } from "../components/services/ServicesList";
import { servicesMock } from "../data/services";
import { updateServiceStatus } from "../services/services";

export function ServicesPage() {
  const [services, setServices] = useState(servicesMock);
  const [updatingServiceId, setUpdatingServiceId] = useState<string | null>(
    null,
  );

  async function handleToggleServiceStatus(serviceId: string) {
    const service = services.find((currentService) => currentService.id === serviceId);

    if (!service) {
      return;
    }

    try {
      setUpdatingServiceId(serviceId);
      await updateServiceStatus(serviceId, !service.active);

      setServices((currentServices) =>
        currentServices.map((currentService) =>
          currentService.id === serviceId
            ? { ...currentService, active: !currentService.active }
            : currentService,
        ),
      );
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(
          error.response?.data?.error ??
            error.response?.data?.message ??
            "Falha ao atualizar o status do serviço.",
        );
      } else {
        alert("Não foi possível atualizar o status do serviço.");
      }
    } finally {
      setUpdatingServiceId(null);
    }
  }

  return (
    <section
      aria-labelledby="services-title"
      className="flex min-w-0 flex-col gap-6"
    >
      <header className="flex items-center justify-between gap-4">
        <h1
          id="services-title"
          className="text-brand text-2xl leading-[1.4] font-bold"
        >
          Serviços
        </h1>

        <button
          type="button"
          className="bg-foreground text-surface hover:bg-page focus-visible:outline-brand inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-[5px] px-4 text-sm leading-[1.4] font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <Plus aria-hidden="true" className="size-4" />
          Novo
        </button>
      </header>

      <ServicesList
        services={services}
        updatingServiceId={updatingServiceId}
        onToggleServiceStatus={(service) =>
          handleToggleServiceStatus(service.id)
        }
      />
    </section>
  );
}

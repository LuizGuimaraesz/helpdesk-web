import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { ServicesList } from "../components/services/ServicesList";
import { ServiceForm } from "../components/services/ServiceForm";
import { Button } from "../components/ui/Button";
import type { Service } from "../types/service";
import { getServices, updateServiceStatus } from "../services/services";
import { useAuth } from "../hooks/useAuth";

export function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [updatingServiceId, setUpdatingServiceId] = useState<string | null>(
    null,
  );
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const { isLoading, session } = useAuth();

  function handleOpenCreateServiceModal() {
    setSelectedService(null);
    setIsServiceModalOpen(true);
  }

  function handleOpenEditServiceModal(service: Service) {
    setSelectedService(service);
    setIsServiceModalOpen(true);
  }

  function handleCloseServiceModal() {
    setIsServiceModalOpen(false);
    setSelectedService(null);
  }

  async function loadServices() {
    try {
      const data = await getServices();

      setServices(data.services);
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(
          error.response?.data?.error ??
            error.response?.data?.message ??
            "Falha ao carregar os serviços.",
        );
        return;
      }

      alert("Não foi possível carregar os serviços.");
    }
  }

  useEffect(() => {
    if (isLoading || !session) {
      return;
    }

    loadServices();
  }, [isLoading, session]);

  async function handleToggleServiceStatus(serviceId: string) {
    const service = services.find(
      (currentService) => currentService.id === serviceId,
    );

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

        <Button onClick={handleOpenCreateServiceModal} />
      </header>

      <ServicesList
        services={services}
        updatingServiceId={updatingServiceId}
        onEditService={handleOpenEditServiceModal}
        onToggleServiceStatus={(service) =>
          handleToggleServiceStatus(service.id)
        }
      />

      <ServiceForm
        isOpen={isServiceModalOpen}
        service={selectedService}
        onClose={handleCloseServiceModal}
      />
    </section>
  );
}

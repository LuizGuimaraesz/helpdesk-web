import { useEffect, useState } from "react";
import { ServicesList } from "../components/services/ServicesList";
import { ServiceForm } from "../components/services/ServiceForm";
import { Button } from "../components/ui/Button";
import { ListHeader } from "../components/ui/ListHeader";
import type { Service } from "../types/service";
import {
  createService,
  getServices,
  updateService,
  updateServiceStatus,
} from "../services/services";
import { useAuth } from "../hooks/useAuth";
import { getErrorMessage } from "../utils/getErrorMessage";

export function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [updatingServiceId, setUpdatingServiceId] = useState<string | null>(
    null,
  );
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isSavingService, setIsSavingService] = useState(false);
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
      alert(getErrorMessage(error, "Falha ao carregar os serviços."));
    }
  }

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
      alert(getErrorMessage(error, "Falha ao atualizar o status do serviço."));
    } finally {
      setUpdatingServiceId(null);
    }
  }

  async function handleCreateService(title: string, amount: number) {
    try {
      setIsSavingService(true);
      await createService(title, amount);

      handleCloseServiceModal();
      await loadServices();
    } finally {
      setIsSavingService(false);
    }
  }

  async function handleUpdateService(
    id: string,
    title: string,
    amount: number,
  ) {
    try {
      setIsSavingService(true);
      await updateService(id, title, amount);

      handleCloseServiceModal();
      await loadServices();
    } finally {
      setIsSavingService(false);
    }
  }

  useEffect(() => {
    if (isLoading || !session) {
      return;
    }

    loadServices();
  }, [isLoading, session]);

  return (
    <section
      aria-labelledby="services-title"
      className="flex min-w-0 flex-col gap-6"
    >
      <ListHeader title="Serviços" titleId="services-title">
        <Button variant="plus" onClick={handleOpenCreateServiceModal} />
      </ListHeader>

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
        onCreate={handleCreateService}
        onUpdate={handleUpdateService}
        isSaving={isSavingService}
      />
    </section>
  );
}

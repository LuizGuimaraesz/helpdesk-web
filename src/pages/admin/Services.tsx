import { useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";
import { ServicesList } from "../../components/services/ServicesList";
import { ServiceForm } from "../../components/services/ServiceForm";
import { Button } from "../../components/ui/Button";
import { ListHeader } from "../../components/ui/ListHeader";
import type { Service } from "../../types/service";
import {
  createService,
  getServices,
  updateService,
  updateServiceStatus,
} from "../../services/services";
import { useAuth } from "../../hooks/useAuth";
import { getErrorMessage } from "../../utils/getErrorMessage";

export function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [updatingServiceId, setUpdatingServiceId] = useState<string | null>(null);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isSavingService, setIsSavingService] = useState(false);
  const [isLoadingServices, setIsLoadingServices] = useState(true);
  const { isLoading, session } = useAuth();
  const userId = session?.user.id;
  const loadControllerRef = useRef<AbortController | null>(null);
  const isMutatingRef = useRef(false);
  const isBusy =
    isLoadingServices || isSavingService || updatingServiceId !== null;

  function handleOpenCreateServiceModal() {
    if (isBusy || isMutatingRef.current) {
      return;
    }
    setSelectedService(null);
    setIsServiceModalOpen(true);
  }

  function handleOpenEditServiceModal(service: Service) {
    if (isBusy || isMutatingRef.current) {
      return;
    }
    setSelectedService(service);
    setIsServiceModalOpen(true);
  }

  function handleCloseServiceModal() {
    setIsServiceModalOpen(false);
    setSelectedService(null);
  }

  function beginMutation() {
    const controller = loadControllerRef.current;
    if (
      isLoadingServices ||
      isMutatingRef.current ||
      !controller ||
      controller.signal.aborted
    ) {
      return null;
    }
    isMutatingRef.current = true;
    return controller;
  }

  function finishMutation(controller: AbortController) {
    if (!controller.signal.aborted) {
      isMutatingRef.current = false;
      setUpdatingServiceId(null);
      setIsSavingService(false);
    }
  }

  async function handleToggleServiceStatus(serviceId: string) {
    const service = services.find(
      (currentService) => currentService.id === serviceId,
    );
    if (!service) {
      return;
    }
    const controller = beginMutation();
    if (!controller) {
      return;
    }

    try {
      setUpdatingServiceId(serviceId);
      const updatedService = await updateServiceStatus(
        serviceId,
        !service.active,
      );

      if (!controller.signal.aborted) {
        setServices((currentServices) =>
          currentServices.map((currentService) =>
            currentService.id === serviceId ? updatedService : currentService,
          ),
        );
      }
    } catch (error) {
      if (!controller.signal.aborted) {
        alert(getErrorMessage(error, "Falha ao atualizar o status do serviço."));
      }
    } finally {
      finishMutation(controller);
    }
  }

  async function handleCreateService(title: string, amount: number) {
    const controller = beginMutation();
    if (!controller) {
      return;
    }

    try {
      setIsSavingService(true);
      const service = await createService(title, amount);

      if (!controller.signal.aborted) {
        setServices((currentServices) => [...currentServices, service]);
        handleCloseServiceModal();
      }
    } catch (error) {
      if (!controller.signal.aborted) {
        throw error;
      }
    } finally {
      finishMutation(controller);
    }
  }

  async function handleUpdateService(id: string, title: string, amount: number) {
    const controller = beginMutation();
    if (!controller) {
      return;
    }

    try {
      setIsSavingService(true);
      const updatedService = await updateService(id, title, amount);

      if (!controller.signal.aborted) {
        setServices((currentServices) =>
          currentServices.map((service) =>
            service.id === id ? updatedService : service,
          ),
        );
        handleCloseServiceModal();
      }
    } catch (error) {
      if (!controller.signal.aborted) {
        throw error;
      }
    } finally {
      finishMutation(controller);
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    loadControllerRef.current = controller;
    isMutatingRef.current = false;
    setUpdatingServiceId(null);
    setIsSavingService(false);
    setServices([]);
    handleCloseServiceModal();

    if (isLoading || !userId) {
      setIsLoadingServices(isLoading);
      return () => controller.abort();
    }

    setIsLoadingServices(true);
    async function loadServices() {
      try {
        const data = await getServices(controller.signal);
        if (!controller.signal.aborted) {
          setServices(data.services);
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          alert(getErrorMessage(error, "Falha ao carregar os serviços."));
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoadingServices(false);
        }
      }
    }

    loadServices();
    return () => controller.abort();
  }, [isLoading, userId]);

  return (
    <section
      aria-labelledby="services-title"
      className="flex min-w-0 flex-col gap-5 md:gap-6"
    >
      <ListHeader title="Serviços" titleId="services-title">
        <Button
          icon={Plus}
          iconOnlyMobile
          className="w-auto max-md:size-10"
          aria-label="Novo serviço"
          disabled={isBusy}
          onClick={handleOpenCreateServiceModal}
        >
          Novo
        </Button>
      </ListHeader>

      {isLoadingServices && (
        <p role="status" className="text-muted text-sm">
          Carregando serviços...
        </p>
      )}

      <ServicesList
        services={services}
        updatingServiceId={updatingServiceId}
        isDisabled={isBusy}
        onEditService={handleOpenEditServiceModal}
        onToggleServiceStatus={(service) =>
          handleToggleServiceStatus(service.id)
        }
      />

      <ServiceForm
        isOpen={isServiceModalOpen}
        service={selectedService}
        onClose={() => {
          if (!isMutatingRef.current) {
            handleCloseServiceModal();
          }
        }}
        onCreate={handleCreateService}
        onUpdate={handleUpdateService}
        isSaving={isSavingService}
      />
    </section>
  );
}

import { useEffect, useRef, useState } from "react";
import { ClientForm } from "../../components/clients/ClientForm";
import { ClientsList } from "../../components/clients/ClientsList";
import { DeleteModal } from "../../components/ui/DeleteModal";
import { ListHeader } from "../../components/ui/ListHeader";
import { useAuth } from "../../hooks/useAuth";
import { deleteUser, getUsers, updateUser } from "../../services/users";
import type { User } from "../../types/user";
import { getErrorMessage } from "../../utils/getErrorMessage";

type ClientModal = "edit" | "delete" | null;

export function ClientsPage() {
  const [clients, setClients] = useState<User[]>([]);
  const [selectedClient, setSelectedClient] = useState<User | null>(null);
  const [activeModal, setActiveModal] = useState<ClientModal>(null);
  const [isSavingClient, setIsSavingClient] = useState(false);
  const [isDeletingClient, setIsDeletingClient] = useState(false);
  const [isLoadingClients, setIsLoadingClients] = useState(true);
  const { isLoading, session } = useAuth();
  const userId = session?.user.id;
  const loadControllerRef = useRef<AbortController | null>(null);
  const isMutatingRef = useRef(false);
  const isBusy = isLoadingClients || isSavingClient || isDeletingClient;

  function handleOpenEditClientModal(client: User) {
    if (isBusy || isMutatingRef.current) {
      return;
    }
    setSelectedClient(client);
    setActiveModal("edit");
  }

  function handleOpenDeleteClientModal(client: User) {
    if (isBusy || isMutatingRef.current) {
      return;
    }
    setSelectedClient(client);
    setActiveModal("delete");
  }

  function handleCloseClientModal() {
    setActiveModal(null);
    setSelectedClient(null);
  }

  function handleRequestCloseClientModal() {
    if (!isMutatingRef.current) {
      handleCloseClientModal();
    }
  }

  function beginMutation() {
    const controller = loadControllerRef.current;
    if (
      isLoadingClients ||
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
      setIsSavingClient(false);
      setIsDeletingClient(false);
    }
  }

  async function handleUpdateClient(
    id: string,
    name: string,
    email: string,
  ) {
    const controller = beginMutation();
    if (!controller) {
      return;
    }

    try {
      setIsSavingClient(true);
      const updatedClient = await updateUser(id, name, email);

      if (!controller.signal.aborted) {
        setClients((currentClients) =>
          currentClients.map((client) =>
            client.id === id ? updatedClient : client,
          ),
        );
        handleCloseClientModal();
      }
    } catch (error) {
      if (!controller.signal.aborted) {
        throw error;
      }
    } finally {
      finishMutation(controller);
    }
  }

  async function handleDeleteClient(id: string) {
    const controller = beginMutation();
    if (!controller) {
      return;
    }

    try {
      setIsDeletingClient(true);
      await deleteUser(id);

      if (!controller.signal.aborted) {
        setClients((currentClients) =>
          currentClients.filter((client) => client.id !== id),
        );
        handleCloseClientModal();
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
    setIsSavingClient(false);
    setIsDeletingClient(false);
    setClients([]);
    handleCloseClientModal();

    if (isLoading || !userId) {
      setIsLoadingClients(isLoading);
      return () => controller.abort();
    }

    setIsLoadingClients(true);
    async function loadClients() {
      try {
        const data = await getUsers("client", controller.signal);
        if (!controller.signal.aborted) {
          setClients(data.users);
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          alert(getErrorMessage(error, "Falha ao carregar os clientes."));
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoadingClients(false);
        }
      }
    }

    loadClients();
    return () => controller.abort();
  }, [isLoading, userId]);

  return (
    <section
      aria-labelledby="clients-title"
      className="flex min-w-0 flex-col gap-5 md:gap-6"
    >
      <ListHeader title="Clientes" titleId="clients-title" />

      {isLoadingClients && (
        <p role="status" className="text-muted text-sm">
          Carregando clientes...
        </p>
      )}

      <ClientsList
        clients={clients}
        isDisabled={isBusy}
        onEditClient={handleOpenEditClientModal}
        onDeleteClient={handleOpenDeleteClientModal}
      />

      <ClientForm
        client={selectedClient}
        isOpen={activeModal === "edit"}
        isSaving={isSavingClient}
        onClose={handleRequestCloseClientModal}
        onUpdate={handleUpdateClient}
      />

      <DeleteModal
        item={selectedClient}
        title="Excluir cliente"
        warningMessage="Ao excluir, todos os chamados deste cliente serão removidos e esta ação não poderá ser desfeita."
        deleteErrorMessage="Não foi possível excluir o cliente."
        isOpen={activeModal === "delete"}
        isDeleting={isDeletingClient}
        onClose={handleRequestCloseClientModal}
        onDelete={handleDeleteClient}
      />
    </section>
  );
}

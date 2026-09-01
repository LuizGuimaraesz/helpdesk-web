import { useEffect, useState } from "react";
import { ClientForm } from "../components/clients/ClientForm";
import { ClientsList } from "../components/clients/ClientsList";
import { DeleteClientModal } from "../components/clients/DeleteClientModal";
import { ListHeader } from "../components/ui/ListHeader";
import { useAuth } from "../hooks/useAuth";
import { deleteUser, getUsers, updateUser } from "../services/users";
import type { User } from "../types/user";
import { getErrorMessage } from "../utils/getErrorMessage";

type ClientModal = "edit" | "delete" | null;

export function ClientsPage() {
  const [clients, setClients] = useState<User[]>([]);
  const [selectedClient, setSelectedClient] = useState<User | null>(null);
  const [activeModal, setActiveModal] = useState<ClientModal>(null);
  const [isSavingClient, setIsSavingClient] = useState(false);
  const [isDeletingClient, setIsDeletingClient] = useState(false);
  const { isLoading, session } = useAuth();

  function handleOpenEditClientModal(client: User) {
    setSelectedClient(client);
    setActiveModal("edit");
  }

  function handleOpenDeleteClientModal(client: User) {
    setSelectedClient(client);
    setActiveModal("delete");
  }

  function handleCloseClientModal() {
    setActiveModal(null);
    setSelectedClient(null);
  }

  async function loadClients() {
    try {
      const data = await getUsers("client");

      setClients(data.users);
    } catch (error) {
      alert(getErrorMessage(error, "Falha ao carregar os clientes."));
    }
  }

  async function handleUpdateClient(
    id: string,
    name: string,
    email: string,
  ) {
    try {
      setIsSavingClient(true);
      await updateUser(id, name, email);

      handleCloseClientModal();
      await loadClients();
    } finally {
      setIsSavingClient(false);
    }
  }

  async function handleDeleteClient(id: string) {
    try {
      setIsDeletingClient(true);
      await deleteUser(id);

      handleCloseClientModal();
      await loadClients();
    } finally {
      setIsDeletingClient(false);
    }
  }

  useEffect(() => {
    if (isLoading || !session) {
      return;
    }

    loadClients();
  }, [isLoading, session]);

  return (
    <section
      aria-labelledby="clients-title"
      className="flex min-w-0 flex-col gap-6"
    >
      <ListHeader title="Clientes" titleId="clients-title" />

      <ClientsList
        clients={clients}
        onEditClient={handleOpenEditClientModal}
        onDeleteClient={handleOpenDeleteClientModal}
      />

      <ClientForm
        client={selectedClient}
        isOpen={activeModal === "edit"}
        isSaving={isSavingClient}
        onClose={handleCloseClientModal}
        onUpdate={handleUpdateClient}
      />

      <DeleteClientModal
        client={selectedClient}
        isOpen={activeModal === "delete"}
        isDeleting={isDeletingClient}
        onClose={handleCloseClientModal}
        onDelete={handleDeleteClient}
      />
    </section>
  );
}

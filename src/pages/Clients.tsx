import { useEffect, useState } from "react";
import { ClientsList } from "../components/clients/ClientsList";
import { ListHeader } from "../components/ui/ListHeader";
import { useAuth } from "../hooks/useAuth";
import { getUsers } from "../services/users";
import type { User } from "../types/user";
import { getErrorMessage } from "../utils/getErrorMessage";

export function ClientsPage() {
  const [clients, setClients] = useState<User[]>([]);
  const { isLoading, session } = useAuth();

  async function loadClients() {
    try {
      const data = await getUsers("client");

      setClients(data.users);
    } catch (error) {
      alert(getErrorMessage(error, "Falha ao carregar os clientes."));
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
      <ClientsList clients={clients} />
    </section>
  );
}

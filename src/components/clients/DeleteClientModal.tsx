import { useEffect, useState } from "react";
import type { User } from "../../types/user";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { Button } from "../ui/Button";
import { Modal } from "../ui/Modal";

type DeleteClientModalProps = {
  client?: User | null;
  isDeleting?: boolean;
  isOpen: boolean;
  onClose: () => void;
  onDelete: (id: string) => Promise<void>;
};

export function DeleteClientModal({
  client = null,
  isDeleting = false,
  isOpen,
  onClose,
  onDelete,
}: DeleteClientModalProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setErrorMessage(null);
    }
  }, [client, isOpen]);

  async function handleDelete() {
    if (!client) {
      return;
    }

    setErrorMessage(null);

    try {
      await onDelete(client.id);
    } catch (error) {
      setErrorMessage(
        getErrorMessage(error, "Não foi possível excluir o cliente."),
      );
    }
  }

  return (
    <Modal isOpen={isOpen} title="Excluir cliente" onClose={onClose}>
      <div className="p-6 text-base leading-[1.4]">
        <p className="text-foreground">
          Deseja realmente excluir <strong>{client?.name}</strong>?
        </p>
        <p className="text-foreground mt-6">
          Ao excluir, todos os chamados deste cliente serão removidos e esta
          ação não poderá ser desfeita.
        </p>

        {errorMessage && (
          <p className="text-feedback-error mt-4 text-sm font-medium">
            {errorMessage}
          </p>
        )}
      </div>

      <footer className="border-border flex gap-2 border-t p-6">
        <Button variant="white" disabled={isDeleting} onClick={onClose}>
          Cancelar
        </Button>
        <Button isLoading={isDeleting} onClick={handleDelete}>
          Sim, excluir
        </Button>
      </footer>
    </Modal>
  );
}

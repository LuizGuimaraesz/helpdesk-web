import { useEffect, useState } from "react";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { Button } from "./Button";
import { Modal } from "./Modal";

type DeletableItem = {
  id: string;
  name: string;
};

type DeleteModalProps = {
  item?: DeletableItem | null;
  title: string;
  warningMessage: string;
  deleteErrorMessage?: string;
  isDeleting?: boolean;
  isOpen: boolean;
  onClose: () => void;
  onDelete: (id: string) => Promise<void>;
};

export function DeleteModal({
  item = null,
  title,
  warningMessage,
  deleteErrorMessage = "Não foi possível excluir este item.",
  isDeleting = false,
  isOpen,
  onClose,
  onDelete,
}: DeleteModalProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setErrorMessage(null);
    }
  }, [item, isOpen]);

  async function handleDelete() {
    if (!item) {
      return;
    }

    setErrorMessage(null);

    try {
      await onDelete(item.id);
    } catch (error) {
      setErrorMessage(getErrorMessage(error, deleteErrorMessage));
    }
  }

  return (
    <Modal isOpen={isOpen} title={title} onClose={onClose}>
      <div className="p-6 text-base leading-[1.4]">
        <p className="text-foreground">
          Deseja realmente excluir <strong>{item?.name}</strong>?
        </p>
        <p className="text-foreground mt-6">{warningMessage}</p>

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

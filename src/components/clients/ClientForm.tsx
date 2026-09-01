import { useEffect, useState, type FormEvent } from "react";
import { z } from "zod";
import type { User } from "../../types/user";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Modal } from "../ui/Modal";
import { UserInfo } from "../ui/UserInfo";

const clientSchema = z.object({
  name: z.string().trim().min(2, "Nome é obrigatório."),
  email: z.email("Informe um e-mail válido.").trim(),
});

type ClientFormProps = {
  client?: User | null;
  isOpen: boolean;
  isSaving?: boolean;
  onClose: () => void;
  onUpdate: (id: string, name: string, email: string) => Promise<void>;
};

export function ClientForm({
  client = null,
  isOpen,
  isSaving = false,
  onClose,
  onUpdate,
}: ClientFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen || !client) {
      return;
    }

    setName(client.name);
    setEmail(client.email);
    setErrorMessage(null);
  }, [client, isOpen]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);

    if (!client) {
      return;
    }

    const result = clientSchema.safeParse({ name, email });

    if (!result.success) {
      setErrorMessage(
        getErrorMessage(result.error, "Informe os dados do cliente."),
      );
      return;
    }

    try {
      await onUpdate(client.id, result.data.name, result.data.email);
    } catch (error) {
      setErrorMessage(
        getErrorMessage(error, "Não foi possível atualizar o cliente."),
      );
    }
  }

  return (
    <Modal isOpen={isOpen} title="Cliente" onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <div className="p-6 pb-[34px]">
          {client && (
            <div className="mb-5">
              <UserInfo
                name={client.name}
                showName={false}
                avatarSize="large"
              />
            </div>
          )}

          <Input
            label="Nome"
            placeholder="Nome do cliente"
            value={name}
            onChange={(event) => setName(event.target.value)}
            containerClassName="border-border border-b pt-0 pb-3"
            required
          />

          <Input
            label="E-mail"
            type="email"
            placeholder="E-mail do cliente"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            containerClassName="border-border border-b py-3"
            required
          />

          {errorMessage && (
            <p className="text-feedback-error mt-3 text-sm font-medium">
              {errorMessage}
            </p>
          )}
        </div>

        <footer className="border-border border-t p-6">
          <Button type="submit" isLoading={isSaving}>
            Salvar
          </Button>
        </footer>
      </form>
    </Modal>
  );
}

import { useEffect, useState, type FormEvent } from "react";
import { z } from "zod";
import { changePassword } from "../../services/users";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Modal } from "../ui/Modal";

type ChangePasswordFormProps = {
  isOpen: boolean;
  onClose: () => void;
};

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Informe a senha atual."),
  newPassword: z.string().min(6, "A nova senha deve ter pelo menos 6 dígitos."),
});

export function ChangePasswordForm({
  isOpen,
  onClose,
}: ChangePasswordFormProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCurrentPassword("");
      setNewPassword("");
      setErrorMessage(null);
    }
  }, [isOpen]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);

    try {
      const data = changePasswordSchema.parse({
        currentPassword,
        newPassword,
      });

      setIsSaving(true);
      await changePassword(data.currentPassword, data.newPassword);
      onClose();
    } catch (error) {
      setErrorMessage(
        getErrorMessage(error, "Não foi possível alterar a senha."),
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <Modal isOpen={isOpen} title="Alterar senha" onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <div className="p-6 pb-5">
          <Input
            label="Senha atual"
            type="password"
            value={currentPassword}
            onChange={(event) => setCurrentPassword(event.target.value)}
            autoComplete="current-password"
            disabled={isSaving}
            containerClassName="pt-0 pb-3"
          />
          <Input
            label="Nova senha"
            type="password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            autoComplete="new-password"
            disabled={isSaving}
          />

          {errorMessage && (
            <p className="text-feedback-error mt-4 text-sm font-medium">
              {errorMessage}
            </p>
          )}
        </div>

        <footer className="border-border border-t p-6">
          <Button type="submit" className="font-normal" isLoading={isSaving}>
            Salvar
          </Button>
        </footer>
      </form>
    </Modal>
  );
}

import { Upload } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { z } from "zod";
import { useAuth } from "../../hooks/useAuth";
import { updateUser } from "../../services/users";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { Button } from "../ui/Button";
import { EditButton } from "../ui/EditButton";
import { Input } from "../ui/Input";
import { Modal } from "../ui/Modal";
import { UserInfo } from "../ui/UserInfo";

type ProfileFormProps = {
  isOpen: boolean;
  onClose: () => void;
  onChangePassword: () => void;
  name: string;
  email: string;
  avatarUrl?: string | null;
};

const profileSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome."),
  email: z.email("Informe um e-mail válido.").trim(),
});

export function ProfileForm({
  isOpen,
  onClose,
  onChangePassword,
  name: initialName,
  email: initialEmail,
  avatarUrl,
}: ProfileFormProps) {
  const { session, save } = useAuth();
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setName(initialName);
      setEmail(initialEmail);
      setErrorMessage(null);
    }
  }, [isOpen, initialName, initialEmail]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);

    if (!session) {
      setErrorMessage("Não foi possível identificar o usuário autenticado.");
      return;
    }

    try {
      const data = profileSchema.parse({ name, email });

      setIsSaving(true);
      await updateUser(session.user.id, data.name, data.email);

      save({
        ...session,
        user: {
          ...session.user,
          ...data,
        },
      });

      onClose();
    } catch (error) {
      setErrorMessage(
        getErrorMessage(error, "Não foi possível atualizar o perfil."),
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <Modal isOpen={isOpen} title="Perfil" onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <div className="p-6 pb-5">
          <div className="mb-5 flex items-center gap-2">
            <UserInfo
              name={initialName}
              avatarUrl={avatarUrl}
              showName={false}
              avatarSize="large"
            />
            <Button
              variant="white"
              icon={Upload}
              className="h-7 w-auto gap-1.5 px-2 text-xs font-normal"
            >
              Nova imagem
            </Button>
            <EditButton
              variant="delete"
              aria-label="Remover imagem do perfil"
              className="mx-0"
            />
          </div>

          <Input
            label="Nome"
            value={name}
            onChange={(event) => setName(event.target.value)}
            disabled={isSaving}
            containerClassName="pt-0 pb-3"
          />
          <Input
            label="E-mail"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={isSaving}
          />
          <div className="relative">
            <Input
              label="Senha"
              type="password"
              placeholder="••••••••"
              readOnly
              disabled={isSaving}
              className="pr-16 placeholder:text-foreground"
            />
            <Button
              variant="white"
              onClick={onChangePassword}
              disabled={isSaving}
              className="absolute right-0 bottom-3 h-7 w-auto px-2 text-xs font-normal"
            >
              Alterar
            </Button>
          </div>

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

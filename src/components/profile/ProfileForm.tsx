import { Upload } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { Button } from "../ui/Button";
import { EditButton } from "../ui/EditButton";
import { Input } from "../ui/Input";
import { Modal } from "../ui/Modal";
import { UserInfo } from "../ui/UserInfo";

type ProfileFormProps = {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  email: string;
  avatarUrl?: string | null;
};

export function ProfileForm({
  isOpen,
  onClose,
  name: initialName,
  email: initialEmail,
  avatarUrl,
}: ProfileFormProps) {
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);

  useEffect(() => {
    if (isOpen) {
      setName(initialName);
      setEmail(initialEmail);
    }
  }, [isOpen, initialName, initialEmail]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
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
            containerClassName="pt-0 pb-3"
          />
          <Input
            label="E-mail"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <div className="relative">
            <Input
              label="Senha"
              type="password"
              placeholder="••••••••"
              readOnly
              className="pr-16 placeholder:text-foreground"
            />
            <Button
              variant="white"
              className="absolute right-0 bottom-3 h-7 w-auto px-2 text-xs font-normal"
            >
              Alterar
            </Button>
          </div>
        </div>

        <footer className="border-border border-t p-6">
          <Button type="submit" className="font-normal">
            Salvar
          </Button>
        </footer>
      </form>
    </Modal>
  );
}

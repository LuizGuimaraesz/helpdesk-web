import { ArrowLeft } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { z } from "zod";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { ListHeader } from "../ui/ListHeader";
import { UserInfo } from "../ui/UserInfo";
import { AvailabilitySelector } from "./AvailabilitySelector";

const technicianSchema = z.object({
  name: z.string().trim().min(2, "Nome é obrigatório."),
  email: z.email("Informe um e-mail válido.").trim(),
  hours: z.array(z.string()),
});

const createTechnicianSchema = technicianSchema.extend({
  password: z.string().min(6, "A senha deve ter pelo menos 6 dígitos."),
});

export type TechnicianFormValues = {
  name: string;
  email: string;
  password?: string;
  hours: string[];
};

export type TechnicianFormInitialValues = {
  name: string;
  email: string;
  hours: string[];
};

type TechnicianFormProps = {
  mode: "create" | "edit";
  initialValues?: TechnicianFormInitialValues;
  avatarUrl?: string | null;
  isLoading?: boolean;
  errorMessage?: string | null;
  onCancel: () => void;
  onSubmit: (values: TechnicianFormValues) => Promise<void>;
};

export function TechnicianForm({
  mode,
  initialValues,
  avatarUrl = null,
  isLoading = false,
  errorMessage = null,
  onCancel,
  onSubmit,
}: TechnicianFormProps) {
  const [name, setName] = useState(initialValues?.name ?? "");
  const [email, setEmail] = useState(initialValues?.email ?? "");
  const [password, setPassword] = useState("");
  const [hours, setHours] = useState(initialValues?.hours ?? []);
  const [validationMessage, setValidationMessage] = useState<string | null>(
    null,
  );
  const isCreate = mode === "create";
  const pageTitle = isCreate ? "Novo técnico" : "Perfil de técnico";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setValidationMessage(null);

    const values = { name, email, password, hours };
    const result = isCreate
      ? createTechnicianSchema.safeParse(values)
      : technicianSchema.safeParse(values);

    if (!result.success) {
      setValidationMessage(
        getErrorMessage(result.error, "Informe os dados do técnico."),
      );
      return;
    }

    await onSubmit({
      name: result.data.name,
      email: result.data.email,
      hours: result.data.hours,
      password: isCreate ? password : undefined,
    });
  }

  useEffect(() => {
    setName(initialValues?.name ?? "");
    setEmail(initialValues?.email ?? "");
    setPassword("");
    setHours(initialValues?.hours ?? []);
    setValidationMessage(null);
  }, [initialValues, mode]);

  return (
    <form
      onSubmit={handleSubmit}
      aria-labelledby="technician-form-title"
      className="flex min-w-0 flex-col"
    >
      <button
        type="button"
        onClick={onCancel}
        className="text-muted hover:text-foreground focus-visible:outline-brand mb-2 inline-flex w-fit cursor-pointer items-center gap-2 rounded-sm text-xs leading-[1.4] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        <ArrowLeft aria-hidden="true" className="size-3.5" />
        Voltar
      </button>

      <ListHeader title={pageTitle} titleId="technician-form-title">
        <div className="flex items-center gap-2">
          <div className="w-[76px]">
            <Button variant="white" disabled={isLoading} onClick={onCancel}>
              Cancelar
            </Button>
          </div>
          <div className="w-16">
            <Button type="submit" isLoading={isLoading}>
              Salvar
            </Button>
          </div>
        </div>
      </ListHeader>

      <div className="mt-6 grid min-w-0 gap-5 lg:grid-cols-[236px_minmax(0,1fr)]">
        <section className="border-border rounded-[10px] border p-5">
          <h2 className="text-foreground text-base leading-[1.4] font-bold">
            Dados pessoais
          </h2>
          <p className="text-muted mt-1 text-xs leading-[1.4]">
            Defina as informações do perfil de técnico
          </p>

          {!isCreate && (
            <div className="mt-5">
              <UserInfo
                name={name}
                avatarUrl={avatarUrl}
                showName={false}
                avatarSize="large"
              />
            </div>
          )}

          <div className={isCreate ? "mt-6" : "mt-5"}>
            <Input
              id="technician-name"
              label="Nome"
              placeholder="Nome do técnico"
              value={name}
              onChange={(event) => setName(event.target.value)}
              containerClassName="pt-0 pb-3"
              required
            />

            <Input
              id="technician-email"
              label="E-mail"
              type="email"
              placeholder="E-mail do técnico"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />

            {isCreate && (
              <>
                <Input
                  id="technician-password"
                  label="Senha"
                  type="password"
                  placeholder="Crie uma senha"
                  autoComplete="new-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
                <p className="text-placeholder mt-2 text-sm italic">
                  Mínimo de 6 dígitos
                </p>
              </>
            )}
          </div>
        </section>

        <AvailabilitySelector value={hours} onChange={setHours} />
      </div>

      {(validationMessage || errorMessage) && (
        <p className="text-feedback-error mt-4 text-sm font-medium">
          {validationMessage ?? errorMessage}
        </p>
      )}
    </form>
  );

  useEffect(() => {
    setName(initialValues?.name ?? "");
    setEmail(initialValues?.email ?? "");
    setPassword("");
    setHours(initialValues?.hours ?? []);
    setValidationMessage(null);
  }, [initialValues, mode]);
}

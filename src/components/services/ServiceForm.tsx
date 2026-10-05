import { useEffect, useState, type FormEvent } from "react";
import { z } from "zod";
import type { Service } from "../../types/service";
import { formatAmountInput } from "../../utils/formatAmountInput";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { Input } from "../ui/Input";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";

const serviceSchema = z.object({
  title: z.string().trim().min(1, "Informe o título do serviço."),
  amount: z
    .string()
    .min(1, "Informe um valor válido para o serviço.")
    .transform((value) => Number(value.replace(",", ".")))
    .pipe(
      z
        .number()
        .finite("Informe um valor válido para o serviço.")
        .positive("O valor deve ser maior que zero."),
    ),
});

type ServiceFormProps = {
  isOpen: boolean;
  service?: Service | null;
  createModalTitle?: string;
  onClose: () => void;
  onCreate: (title: string, amount: number) => Promise<void>;
  onUpdate?: (id: string, title: string, amount: number) => Promise<void>;
  isSaving?: boolean;
};

export function ServiceForm({
  isOpen,
  service = null,
  createModalTitle = "Cadastro de serviço",
  onClose,
  onCreate,
  onUpdate,
  isSaving = false,
}: ServiceFormProps) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setTitle(service?.title ?? "");
    setAmount(service?.amount.replace(".", ",") ?? "");
    setErrorMessage(null);
  }, [isOpen, service]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSaving) {
      return;
    }
    setErrorMessage(null);

    const result = serviceSchema.safeParse({ title, amount });

    if (!result.success) {
      setErrorMessage(
        getErrorMessage(result.error, "Informe os dados do serviço."),
      );
      return;
    }

    try {
      if (service && onUpdate) {
        await onUpdate(service.id, result.data.title, result.data.amount);
        return;
      }

      await onCreate(result.data.title, result.data.amount);
    } catch (error) {
      setErrorMessage(
        getErrorMessage(error, "Não foi possível salvar o serviço."),
      );
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      title={service ? "Serviço" : createModalTitle}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit}>
        <div className="p-6 pb-[34px]">
          <Input
            label={"Título"}
            placeholder={"Nome do serviço"}
            value={title}
            disabled={isSaving}
            onChange={(event) => setTitle(event.target.value)}
            containerClassName="pt-0"
            required
          />

          <Input
            label="Valor"
            placeholder="0,00"
            value={amount}
            disabled={isSaving}
            onChange={(event) =>
              setAmount(formatAmountInput(event.target.value))
            }
            inputMode="numeric"
            prefix="R$"
            className="text-lg placeholder:text-sm"
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

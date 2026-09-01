import { useEffect, useState, type FormEvent } from "react";
import { z } from "zod";
import type { Service } from "../../types/service";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { Input } from "../ui/Input";
import { Modal } from "../ui/Modal";

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
        .min(0, "Informe um valor válido para o serviço."),
    ),
});

function formatAmountInput(value: string) {
  const digits = value.replace(/\D/g, "");

  if (!digits) {
    return "";
  }

  const amountInCents = digits.padStart(3, "0");
  const integerPart = amountInCents
    .slice(0, -2)
    .replace(/^0+(?=\d)/, "");
  const decimalPart = amountInCents.slice(-2);

  return `${integerPart},${decimalPart}`;
}

type ServiceFormProps = {
  isOpen: boolean;
  service?: Service | null;
  onClose: () => void;
  onCreate: (title: string, amount: number) => Promise<void>;
  onUpdate: (id: string, title: string, amount: number) => Promise<void>;
  isSaving?: boolean;
};

export function ServiceForm({
  isOpen,
  service = null,
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
    setErrorMessage(null);

    const result = serviceSchema.safeParse({ title, amount });

    if (!result.success) {
      setErrorMessage(
        getErrorMessage(result.error, "Informe os dados do serviço."),
      );
      return;
    }

    try {
      if (service) {
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
      title={service ? "Serviço" : "Cadastro de serviço"}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="p-6">
        <Input
          label={"Título"}
          placeholder={"Nome do serviço"}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          containerClassName="pt-0"
          required
        />

        <Input
          label="Valor"
          placeholder="0,00"
          value={amount}
          onChange={(event) => setAmount(formatAmountInput(event.target.value))}
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

        <button
          type="submit"
          disabled={isSaving}
          className="bg-foreground text-surface hover:bg-page focus-visible:outline-brand mt-[54px] flex h-[42px] w-full cursor-pointer items-center justify-center rounded-[4.5px] text-[13.5px] leading-[1.4] font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          Salvar
        </button>
      </form>
    </Modal>
  );
}

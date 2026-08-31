import { useEffect, useState, type FormEvent } from "react";
import type { Service } from "../../types/service";
import { Input } from "../ui/Input";
import { Modal } from "../ui/Modal";

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
  isCreating?: boolean;
};

export function ServiceForm({
  isOpen,
  service = null,
  onClose,
  onCreate,
  isCreating = false,
}: ServiceFormProps) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setTitle(service?.title ?? "");
    setAmount(service?.amount.replace(".", ",") ?? "");
  }, [isOpen, service]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (service) {
      return;
    }

    const parsedAmount = Number(amount.replace(",", "."));

    if (!title.trim() || !Number.isFinite(parsedAmount) || parsedAmount < 0) {
      alert("Informe um título e um valor válido para o serviço.");
      return;
    }

    await onCreate(title.trim(), parsedAmount);
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

        <button
          type="submit"
          disabled={isCreating || Boolean(service)}
          className="bg-foreground text-surface hover:bg-page focus-visible:outline-brand mt-[54px] flex h-[42px] w-full cursor-pointer items-center justify-center rounded-[4.5px] text-[13.5px] leading-[1.4] font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          Salvar
        </button>
      </form>
    </Modal>
  );
}

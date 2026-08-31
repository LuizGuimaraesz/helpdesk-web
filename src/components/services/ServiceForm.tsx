import { useEffect, useState, type FormEvent } from "react";
import type { Service } from "../../types/service";
import { Input } from "../ui/Input";
import { Modal } from "../ui/Modal";

type ServiceFormProps = {
  isOpen: boolean;
  service?: Service | null;
  onClose: () => void;
};

export function ServiceForm({
  isOpen,
  service = null,
  onClose,
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

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
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
        />

        <Input
          label="Valor"
          placeholder="0,00"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          inputMode="decimal"
          prefix="R$"
          className="text-lg placeholder:text-sm"
        />

        <button
          type="submit"
          className="bg-foreground text-surface hover:bg-page focus-visible:outline-brand mt-[54px] flex h-[42px] w-full cursor-pointer items-center justify-center rounded-[4.5px] text-[13.5px] leading-[1.4] font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          Salvar
        </button>
      </form>
    </Modal>
  );
}

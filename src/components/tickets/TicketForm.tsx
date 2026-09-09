import { ChevronDown } from "lucide-react";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import type { CreateTicket } from "../../types/ticket";
import type { Service } from "../../types/service";
import { classMerge } from "../../utils/classMerge";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { Input } from "../ui/Input";
import { TicketSummary } from "./TicketSummary";

const ticketSchema = z.object({
  title: z.string().trim().min(2, "Título é obrigatório."),
  description: z.string().trim().min(2, "Descrição é obrigatória."),
  initialServiceId: z.string().min(1, "Selecione uma categoria de serviço."),
});

type TicketFormProps = {
  services: Service[];
  isLoadingServices?: boolean;
  isSubmitting?: boolean;
  errorMessage?: string | null;
  onSubmit: (data: CreateTicket) => Promise<void>;
};

export function TicketForm({
  services,
  isLoadingServices = false,
  isSubmitting = false,
  errorMessage = null,
  onSubmit,
}: TicketFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [initialServiceId, setInitialServiceId] = useState("");
  const [validationMessage, setValidationMessage] = useState<string | null>(
    null,
  );
  const selectedService =
    services.find((service) => service.id === initialServiceId) ?? null;

  const isDisabled = isSubmitting || isLoadingServices;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setValidationMessage(null);

    const result = ticketSchema.safeParse({
      title,
      description,
      initialServiceId,
    });

    if (!result.success) {
      setValidationMessage(
        getErrorMessage(result.error, "Informe os dados do chamado."),
      );
      return;
    }

    await onSubmit(result.data);
  }

  return (
    <form
      onSubmit={handleSubmit}
      aria-labelledby="new-ticket-title"
      className="flex min-w-0 flex-col gap-4"
    >
      <div className="grid min-w-0 items-start gap-7 lg:grid-cols-[minmax(0,1.62fr)_minmax(300px,1fr)]">
        <section className="border-border flex min-h-[540px] min-w-0 flex-col rounded-[10px] border p-5 sm:p-9">
          <div>
            <h2 className="text-foreground text-xl leading-[1.4] font-bold">
              Informações
            </h2>
            <p className="text-muted mt-1 max-w-[440px] text-sm leading-[1.4]">
              Descreva o problema e selecione a categoria de atendimento
            </p>
          </div>

          <div className="mt-6 flex flex-col">
            <Input
              id="ticket-title"
              label="Título"
              placeholder="Digite um título para o chamado"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              containerClassName="py-3"
              disabled={isDisabled}
              required
            />

            <div className="border-border border-b py-3">
              <label
                htmlFor="ticket-description"
                className="text-muted block text-xs leading-[1.4] font-bold uppercase"
              >
                Descrição
              </label>
              <textarea
                id="ticket-description"
                placeholder="Descreva o que está acontecendo"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                disabled={isDisabled}
                className="text-foreground placeholder:text-placeholder mt-1.5 min-h-[152px] w-full resize-none border-0 bg-transparent p-0 text-base leading-[1.4] outline-none disabled:cursor-not-allowed disabled:opacity-50"
                required
              />
            </div>
          </div>

          <div className="border-border mt-auto border-t pt-5">
            <label
              htmlFor="ticket-service"
              className="text-muted block text-xs leading-[1.4] font-bold uppercase"
            >
              Categoria de serviço
            </label>

            <div className="border-border relative mt-1.5 border-b">
              <select
                id="ticket-service"
                value={initialServiceId}
                onChange={(event) => setInitialServiceId(event.target.value)}
                disabled={isDisabled}
                className={classMerge(
                  "focus-visible:outline-brand h-10 w-full cursor-pointer appearance-none bg-transparent pr-10 text-base leading-[1.4] outline-none focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                  initialServiceId ? "text-foreground" : "text-placeholder",
                )}
                required
              >
                <option value="" disabled>
                  {isLoadingServices
                    ? "Carregando categorias..."
                    : "Selecione a categoria de atendimento"}
                </option>
                {services.map((service) => (
                  <option
                    key={service.id}
                    value={service.id}
                    className="text-foreground pl-2"
                  >
                    {service.title}
                  </option>
                ))}
              </select>
              <ChevronDown
                aria-hidden="true"
                className="text-placeholder pointer-events-none absolute top-1/2 right-1 size-5 -translate-y-1/2"
              />
            </div>
          </div>
        </section>

        <TicketSummary
          selectedService={selectedService}
          isLoadingServices={isLoadingServices}
          isSubmitting={isSubmitting}
        />
      </div>

      {(validationMessage || errorMessage) && (
        <p className="text-feedback-error text-sm font-medium">
          {validationMessage ?? errorMessage}
        </p>
      )}
    </form>
  );
}

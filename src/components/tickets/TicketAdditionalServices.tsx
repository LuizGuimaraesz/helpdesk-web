import { Plus } from "lucide-react";
import type { TicketAdditionalService } from "../../types/ticket";
import { Button } from "../ui/Button";
import { EditButton } from "../ui/EditButton";

type TicketAdditionalServicesProps = {
  services: TicketAdditionalService[];
  onAdd: () => void;
};

export function TicketAdditionalServices({
  services,
  onAdd,
}: TicketAdditionalServicesProps) {
  return (
    <section className="border-border min-w-0 rounded-[10px] border p-5 sm:p-6">
      <header className="flex items-center justify-between gap-4">
        <h2 className="text-placeholder text-xs leading-[1.4] font-bold">
          Serviços adicionais
        </h2>
        <Button
          icon={Plus}
          aria-label="Adicionar serviço ao chamado"
          onClick={onAdd}
          className="h-7 w-7 shrink-0 p-0"
        />
      </header>

      {services.length > 0 ? (
        <ul className="mt-5">
          {services.map((service) => (
            <li
              key={service.id}
              className="border-border flex min-w-0 items-center gap-3 border-b py-2.5 first:pt-0 last:border-b-0 last:pb-0"
            >
              <span className="text-foreground min-w-0 flex-1 text-sm leading-[1.4] font-bold">
                {service.title}
              </span>
              <span className="text-foreground shrink-0 text-sm leading-[1.4]">
                {service.amount}
              </span>
              <EditButton
                variant="delete"
                aria-label={`Excluir serviço adicional ${service.title}`}
                className="ml-2 shrink-0"
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted mt-4 text-sm">Nenhum adicional</p>
      )}
    </section>
  );
}

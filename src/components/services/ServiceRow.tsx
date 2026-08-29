import { Ban, CircleCheck, PencilLine } from "lucide-react";
import type { Service } from "../../types/service";
import { formatAmount } from "../../utils/formatAmount";
import { ServiceStatus } from "./ServiceStatus";

type ServiceRowProps = {
  service: Service;
  isUpdatingStatus?: boolean;
  onEdit?: (service: Service) => void;
  onToggleStatus?: (service: Service) => Promise<void>;
};

export function ServiceRow({
  service,
  isUpdatingStatus = false,
  onEdit,
  onToggleStatus,
}: ServiceRowProps) {
  return (
    <tr className="border-border h-16 border-b last:border-b-0">
      <td className="text-foreground min-w-0 px-3 text-sm leading-[1.4] font-bold">
        <p className="truncate">{service.title}</p>
      </td>

      <td className="text-foreground px-3 text-sm leading-[1.4] whitespace-nowrap">
        {formatAmount(service.amount)}
      </td>

      <td className="px-3">
        <ServiceStatus active={service.active} />
      </td>

      <td className="px-3">
        <button
          type="button"
          disabled={isUpdatingStatus}
          className="text-muted hover:text-foreground focus-visible:outline-brand inline-flex cursor-pointer items-center gap-2 rounded-sm text-xs leading-[1.4] whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          aria-label={`${service.active ? "Desativar" : "Reativar"} o serviço ${service.title}`}
          onClick={
            onToggleStatus ? () => onToggleStatus(service) : undefined
          }
        >
          {service.active ? (
            <Ban aria-hidden="true" className="size-4 shrink-0" />
          ) : (
            <CircleCheck aria-hidden="true" className="size-4 shrink-0" />
          )}
          {service.active ? "Desativar" : "Reativar"}
        </button>
      </td>

      <td className="px-3 text-center">
        <button
          type="button"
          className="bg-border hover:bg-secondary-hover focus-visible:outline-brand mx-auto flex size-7 cursor-pointer items-center justify-center overflow-hidden rounded-[5px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
          aria-label={`Editar o serviço ${service.title}`}
          onClick={onEdit ? () => onEdit(service) : undefined}
        >
          <PencilLine aria-hidden="true" className="size-3.5" />
        </button>
      </td>
    </tr>
  );
}

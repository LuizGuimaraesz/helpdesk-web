import { Ban, CircleCheck } from "lucide-react";
import type { Service } from "../../types/service";
import { formatAmount } from "../../utils/formatAmount";
import { EditButton } from "../ui/EditButton";
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
    <tr className="border-border h-12 border-b last:border-b-0 md:h-16">
      <td className="text-foreground min-w-0 px-1.5 text-xs leading-[1.4] font-bold md:px-3 md:text-sm">
        <p className="block max-w-full truncate" title={service.title}>
          {service.title}
        </p>
      </td>

      <td className="text-foreground truncate px-1.5 text-xs leading-[1.4] whitespace-nowrap md:px-3 md:text-sm">
        {formatAmount(service.amount)}
      </td>

      <td className="px-1 text-center md:px-3">
        <ServiceStatus active={service.active} />
      </td>

      <td className="px-1 text-center md:px-3">
        <button
          type="button"
          disabled={isUpdatingStatus}
          className="text-muted hover:text-foreground focus-visible:outline-brand mx-auto inline-flex cursor-pointer items-center gap-2 rounded-sm text-xs leading-[1.4] whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
          <span className="hidden md:inline">
            {service.active ? "Desativar" : "Reativar"}
          </span>
        </button>
      </td>

      <td className="px-1.5 text-center md:px-3">
        <EditButton
          aria-label={`Editar o serviço ${service.title}`}
          onClick={onEdit ? () => onEdit(service) : undefined}
          className="size-7"
        />
      </td>
    </tr>
  );
}

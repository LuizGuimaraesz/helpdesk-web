import {
  CircleCheckBig,
  CircleHelp,
  Clock2,
  type LucideIcon,
} from "lucide-react";
import type { TicketStatus } from "../../types/ticket";

type TicketStatusProps = {
  status: TicketStatus;
};

const statusDetails: Record<
  TicketStatus,
  { className: string; icon: LucideIcon; label: string }
> = {
  open: {
    label: "Aberto",
    icon: CircleHelp,
    className: "bg-status-open-background text-status-open",
  },
  in_progress: {
    label: "Em atendimento",
    icon: Clock2,
    className: "bg-status-progress-background text-status-progress",
  },
  closed: {
    label: "Encerrado",
    icon: CircleCheckBig,
    className: "bg-status-closed-background text-status-closed",
  },
};

export function TicketStatus({ status }: TicketStatusProps) {
  const details = statusDetails[status];
  const Icon = details.icon;

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full p-1.5 text-xs leading-[1.4] font-bold ${details.className}`}
    >
      <Icon aria-hidden="true" className="size-4 shrink-0" />
      <span className="flex h-4 items-center justify-center px-1.5 whitespace-nowrap">
        {details.label}
      </span>
    </span>
  );
}

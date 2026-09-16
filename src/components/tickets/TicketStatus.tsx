import {
  CircleCheckBig,
  CircleHelp,
  Clock2,
  type LucideIcon,
} from "lucide-react";
import type { TicketStatus } from "../../types/ticket";
import {
  StatusBadge,
  type StatusBadgeVariant,
} from "../ui/StatusBadge";

type TicketStatusProps = {
  status: TicketStatus;
  showLabel?: boolean;
};

const statusDetails: Record<
  TicketStatus,
  { icon: LucideIcon; label: string; variant: StatusBadgeVariant }
> = {
  open: {
    label: "Aberto",
    icon: CircleHelp,
    variant: "open",
  },
  in_progress: {
    label: "Em atendimento",
    icon: Clock2,
    variant: "progress",
  },
  closed: {
    label: "Encerrado",
    icon: CircleCheckBig,
    variant: "closed",
  },
};

export function TicketStatus({ status, showLabel = true }: TicketStatusProps) {
  const details = statusDetails[status];

  return (
    <StatusBadge
      label={details.label}
      variant={details.variant}
      icon={details.icon}
      showLabel={showLabel}
    />
  );
}

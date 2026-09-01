import { CircleCheckBig, Clock3 } from "lucide-react";
import type { TicketStatus } from "../../types/ticket";
import { Button } from "../ui/Button";

type TicketActionsProps = {
  status: TicketStatus;
  isUpdating: boolean;
  onChangeStatus: (status: TicketStatus) => Promise<void>;
};

export function TicketActions({
  status,
  isUpdating,
  onChangeStatus,
}: TicketActionsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button
        variant="secondary"
        icon={Clock3}
        disabled={status !== "open" || isUpdating}
        onClick={() => onChangeStatus("in_progress")}
      >
        Em atendimento
      </Button>

      <Button
        variant="secondary"
        icon={CircleCheckBig}
        disabled={status === "closed" || isUpdating}
        onClick={() => onChangeStatus("closed")}
      >
        Encerrado
      </Button>
    </div>
  );
}

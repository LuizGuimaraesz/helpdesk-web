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
    <div className="grid w-full grid-cols-2 gap-2 md:flex md:w-auto md:flex-wrap md:items-center">
      <Button
        variant="white"
        icon={CircleCheckBig}
        disabled={status === "closed" || isUpdating}
        onClick={() => onChangeStatus("closed")}
        className="w-full md:w-auto"
      >
        Encerrar
      </Button>

      <Button
        variant="black"
        icon={Clock3}
        disabled={status !== "open" || isUpdating}
        onClick={() => onChangeStatus("in_progress")}
        className="w-full md:w-auto"
      >
        Iniciar atendimento
      </Button>
    </div>
  );
}

import { CircleCheckBig, Clock3 } from "lucide-react";
import type { TicketStatus } from "../../types/ticket";

type TicketActionsProps = {
  status: TicketStatus;
  onChangeStatus: (status: TicketStatus) => void;
};

export function TicketActions({
  status,
  onChangeStatus,
}: TicketActionsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        disabled={status !== "open"}
        onClick={() => onChangeStatus("in_progress")}
        className="bg-border text-foreground hover:bg-secondary-hover focus-visible:outline-brand flex h-9 cursor-pointer items-center justify-center gap-2 rounded-[5px] px-4 text-xs leading-[1.4] font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Clock3 aria-hidden="true" className="text-muted size-4" />
        Em atendimento
      </button>

      <button
        type="button"
        disabled={status === "closed"}
        onClick={() => onChangeStatus("closed")}
        className="bg-border text-foreground hover:bg-secondary-hover focus-visible:outline-brand flex h-9 cursor-pointer items-center justify-center gap-2 rounded-[5px] px-4 text-xs leading-[1.4] font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <CircleCheckBig aria-hidden="true" className="text-muted size-4" />
        Encerrado
      </button>
    </div>
  );
}

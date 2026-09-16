import { CircleCheckBig, Clock3 } from "lucide-react";
import type { TicketApi, TicketStatus as Status } from "../../types/ticket";
import { formatAmount } from "../../utils/formatAmount";
import { formatDate } from "../../utils/formatDate";
import { TicketStatus } from "../tickets/TicketStatus";
import { Button } from "../ui/Button";
import { EditButton } from "../ui/EditButton";
import { UserInfo } from "../ui/UserInfo";

type TechnicianTicketCardProps = {
  ticket: TicketApi;
  isUpdating: boolean;
  onEdit: () => void;
  onChangeStatus: (status: Status) => void;
};

export function TechnicianTicketCard({
  ticket,
  isUpdating,
  onEdit,
  onChangeStatus,
}: TechnicianTicketCardProps) {
  const nextStatus = ticket.status === "open" ? "in_progress" : "closed";

  return (
    <article className="border-border bg-surface flex min-w-0  flex-col rounded-[9px] border p-4">
      <div className="flex items-start justify-between gap-2">
        <span className="text-muted pt-1 text-xs leading-[1.4]">
          {String(ticket.number).padStart(5, "0")}
        </span>
        <div className="flex shrink-0 items-center gap-1">
          <EditButton
            aria-label={`Editar o chamado ${ticket.number}`}
            onClick={onEdit}
            className="size-7"
          />
          {ticket.status !== "closed" && (
            <Button
              icon={ticket.status === "open" ? Clock3 : CircleCheckBig}
              disabled={isUpdating}
              onClick={() => onChangeStatus(nextStatus)}
              className="h-7 w-auto gap-1 px-2 text-xs font-normal"
            >
              {ticket.status === "open" ? "Iniciar" : "Encerrar"}
            </Button>
          )}
        </div>
      </div>

      <h2 className="text-foreground mt-1 truncate text-sm leading-[1.4] font-bold">
        {ticket.title}
      </h2>
      <p className="text-foreground truncate text-xs leading-[1.4]">
        {ticket.initialService?.title ?? "Serviço não informado"}
      </p>

      <div className="text-foreground mt-4 flex items-center justify-between gap-2 text-xs leading-[1.4]">
        <time dateTime={ticket.createdAt}>{formatDate(ticket.createdAt)}</time>
        <span className="shrink-0">
          {formatAmount(ticket.initialService?.amount ?? "0")}
        </span>
      </div>

      <div className="border-border mt-3 flex items-center justify-between gap-2 border-t pt-4">
        <UserInfo name={ticket.client.name} />
        <TicketStatus status={ticket.status} showLabel={false} />
      </div>
    </article>
  );
}

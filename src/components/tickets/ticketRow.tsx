import type { Ticket } from "../../types/ticket";
import { TicketStatus } from "./TicketStatus";
import { EditButton } from "../ui/EditButton";
import { UserInfo } from "../ui/UserInfo";

type TicketRowProps = {
  onClickTicket?: (ticket: Ticket) => void;
  actionVariant?: "edit" | "view";
  ticket: Ticket;
};

export function TicketRow({
  onClickTicket,
  actionVariant,
  ticket,
}: TicketRowProps) {
  const showAction = Boolean(onClickTicket || actionVariant);
  const variant = actionVariant ?? "edit";

  return (
    <tr className="border-border h-16 border-b last:border-b-0">
      <td className="text-foreground px-3 text-xs leading-[1.4] whitespace-nowrap">
        {ticket.updatedAt}
      </td>
      <td className="text-foreground px-3 text-xs leading-[1.4] font-bold whitespace-nowrap">
        {ticket.number}
      </td>
      <td className="text-foreground min-w-0 px-3 leading-[1.4]">
        <p className="truncate text-sm font-bold">{ticket.title}</p>
        <p className="truncate text-xs">{ticket.service}</p>
      </td>
      <td className="text-foreground px-3 text-sm leading-[1.4] whitespace-nowrap">
        {ticket.total}
      </td>
      <td className="px-3">
        <UserInfo name={ticket.client} />
      </td>
      <td className="px-3">
        <UserInfo name={ticket.technician} />
      </td>
      <td className="px-3">
        <TicketStatus status={ticket.status} />
      </td>
      {showAction && (
        <td className="px-3 text-center">
          <EditButton
            variant={variant}
            aria-label={`${variant === "view" ? "Visualizar" : "Editar"} o chamado ${ticket.number}`}
            onClick={onClickTicket ? () => onClickTicket(ticket) : undefined}
          />
        </td>
      )}
    </tr>
  );
}

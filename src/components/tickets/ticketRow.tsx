import type { Ticket } from "../../types/ticket";
import { TicketStatus } from "./TicketStatus";
import { EditButton } from "../ui/EditButton";
import { UserInfo } from "../ui/UserInfo";

type TicketRowProps = {
  onClickTicket?: (ticket: Ticket) => void;
  actionVariant?: "edit" | "view";
  ticket: Ticket;
  mobileCompact?: boolean;
};

export function TicketRow({
  onClickTicket,
  actionVariant,
  ticket,
  mobileCompact = false,
}: TicketRowProps) {
  const showAction = Boolean(onClickTicket || actionVariant);
  const variant = actionVariant ?? "edit";
  const [updatedDate, updatedTime] = ticket.updatedAt.split(", ");

  return (
    <tr className="border-border h-16 border-b last:border-b-0">
      <td
        className={
          mobileCompact
            ? "text-foreground px-2.5 text-xs leading-[1.35] whitespace-nowrap md:px-3 md:leading-[1.4]"
            : "text-foreground px-3 text-xs leading-[1.4] whitespace-nowrap"
        }
      >
        {mobileCompact ? (
          <>
            <span className="block md:inline">{updatedDate}</span>
            {updatedTime && <span className="block md:hidden">{updatedTime}</span>}
            {updatedTime && <span className="hidden md:inline">, {updatedTime}</span>}
          </>
        ) : (
          ticket.updatedAt
        )}
      </td>
      <td className="text-foreground px-3 text-xs leading-[1.4] font-bold whitespace-nowrap">
        {ticket.number}
      </td>
      <td
        className={
          mobileCompact
            ? "text-foreground min-w-0 px-2 leading-[1.35] md:px-3 md:leading-[1.4]"
            : "text-foreground min-w-0 px-3 leading-[1.4]"
        }
      >
        <p className="truncate text-sm font-bold" title={ticket.title}>{ticket.title}</p>
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
      <td className={mobileCompact ? "px-1 text-center md:px-3 md:text-left" : "px-3"}>
        <span className={mobileCompact ? "md:hidden" : "hidden"}>
          <TicketStatus status={ticket.status} showLabel={false} />
        </span>
        <span className={mobileCompact ? "hidden md:inline" : "inline"}>
          <TicketStatus status={ticket.status} />
        </span>
      </td>
      {showAction && (
        <td className={mobileCompact ? "px-1.5 text-center md:px-3" : "px-3 text-center"}>
          <EditButton
            variant={variant}
            aria-label={`${variant === "view" ? "Visualizar" : "Editar"} o chamado ${ticket.number}`}
            onClick={onClickTicket ? () => onClickTicket(ticket) : undefined}
            className={mobileCompact ? "size-7" : undefined}
          />
        </td>
      )}
    </tr>
  );
}

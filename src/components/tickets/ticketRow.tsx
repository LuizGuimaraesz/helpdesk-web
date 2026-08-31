import { PencilLine } from "lucide-react";
import type { Ticket } from "../../types/ticket";
import { TicketStatus } from "./TicketStatus";
import { UserInfo } from "../ui/UserInfo";

type TicketRowProps = {
  onEdit?: (ticket: Ticket) => void;
  ticket: Ticket;
};

export function TicketRow({ onEdit, ticket }: TicketRowProps) {
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
      <td className="px-3 text-center">
        <button
          type="button"
          className="bg-border hover:bg-secondary-hover focus-visible:outline-brand mx-auto flex size-7 cursor-pointer items-center justify-center overflow-hidden rounded-[5px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
          onClick={onEdit ? () => onEdit(ticket) : undefined}
        >
          <PencilLine aria-hidden="true" className="size-3.5" />
        </button>
      </td>
    </tr>
  );
}

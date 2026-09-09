import type { Ticket } from "../../types/ticket";
import { TicketRow } from "./TicketRow";

type TicketsListProps = {
  tickets: Ticket[];
  onClickTicket?: (ticket: Ticket) => void;
  actionVariant?: "edit" | "view";
};

export function TicketsList({
  tickets,
  onClickTicket,
  actionVariant,
}: TicketsListProps) {
  const showAction = Boolean(onClickTicket || actionVariant);

  return (
    <div className="border-border w-full min-w-0 max-w-full overflow-x-auto rounded-[10px] border">
      <table className="w-full min-w-[1068px] table-fixed border-collapse">
        <caption className="sr-only">Lista de chamados</caption>
        <colgroup>
          <col className="w-[112px]" />
          <col className="w-16" />
          <col />
          <col className="w-[104px]" />
          <col className="w-40" />
          <col className="w-40" />
          <col className="w-[152px]" />
          {showAction && <col className="w-[52px]" />}
        </colgroup>
        <thead>
          <tr className="border-border text-placeholder h-12 border-b text-left text-sm leading-[1.4] font-bold">
            <th scope="col" className="px-3 whitespace-nowrap">
              Atualizado em
            </th>
            <th scope="col" className="px-3">
              Id
            </th>
            <th scope="col" className="px-3">
              Título e Serviço
            </th>
            <th scope="col" className="px-3 whitespace-nowrap">
              Valor total
            </th>
            <th scope="col" className="px-3">
              Cliente
            </th>
            <th scope="col" className="px-3">
              Técnico
            </th>
            <th scope="col" className="px-3">
              Status
            </th>
            {showAction && (
              <th scope="col">
                <span className="sr-only">Ação</span>
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <TicketRow
              key={ticket.id}
              ticket={ticket}
              onClickTicket={onClickTicket}
              actionVariant={actionVariant}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

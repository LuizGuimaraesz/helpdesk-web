import type { Ticket } from "../../types/ticket";
import { TicketRow } from "./ticketRow";

type TicketsListProps = {
  tickets: Ticket[];
  onClickTicket?: (ticket: Ticket) => void;
  actionVariant?: "edit" | "view";
  mobileCompact?: boolean;
};

export function TicketsList({
  tickets,
  onClickTicket,
  actionVariant,
  mobileCompact = false,
}: TicketsListProps) {
  const showAction = Boolean(onClickTicket || actionVariant);

  return (
    <div className="border-border w-full min-w-0 max-w-full overflow-x-auto rounded-[10px] border">
      <table
        className={
          mobileCompact
            ? "w-full min-w-0 table-fixed border-collapse max-md:[&_th:nth-child(2)]:hidden max-md:[&_th:nth-child(4)]:hidden max-md:[&_th:nth-child(5)]:hidden max-md:[&_th:nth-child(6)]:hidden max-md:[&_td:nth-child(2)]:hidden max-md:[&_td:nth-child(4)]:hidden max-md:[&_td:nth-child(5)]:hidden max-md:[&_td:nth-child(6)]:hidden md:min-w-[1068px]"
            : "w-full min-w-[1068px] table-fixed border-collapse"
        }
      >
        <caption className="sr-only">Lista de chamados</caption>
        <colgroup>
          <col
            className={mobileCompact ? "w-[84px] md:w-[112px]" : "w-[112px]"}
          />
          <col
            className={mobileCompact ? "max-md:hidden md:w-16" : "w-16"}
          />
          <col />
          <col
            className={
              mobileCompact ? "max-md:hidden md:w-[104px]" : "w-[104px]"
            }
          />
          <col
            className={mobileCompact ? "max-md:hidden md:w-40" : "w-40"}
          />
          <col
            className={mobileCompact ? "max-md:hidden md:w-40" : "w-40"}
          />
          <col
            className={mobileCompact ? "w-11 md:w-[152px]" : "w-[152px]"}
          />
          {showAction && (
            <col
              className={mobileCompact ? "w-10 md:w-[52px]" : "w-[52px]"}
            />
          )}
        </colgroup>
        <thead>
          <tr
            className={
              mobileCompact
                ? "border-border text-placeholder h-10 border-b text-left text-xs leading-[1.4] font-normal md:h-12 md:text-sm md:font-bold"
                : "border-border text-placeholder h-12 border-b text-left text-sm leading-[1.4] font-bold"
            }
          >
            <th
              scope="col"
              className={
                mobileCompact
                  ? "truncate px-2.5 whitespace-nowrap md:px-3"
                  : "px-3 whitespace-nowrap"
              }
            >
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
              mobileCompact={mobileCompact}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

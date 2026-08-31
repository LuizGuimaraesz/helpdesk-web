import type { TicketDetails } from "../../types/ticket";
import { TicketStatus } from "./TicketStatus";
import { UserInfo } from "../ui/UserInfo";

type TicketDetailsCardProps = {
  ticket: TicketDetails;
};

type DetailProps = {
  label: string;
  value: string;
};

function Detail({ label, value }: DetailProps) {
  return (
    <div className="flex min-w-0 flex-col gap-1">
      <dt className="text-placeholder text-xs leading-[1.4]">{label}</dt>
      <dd className="text-foreground m-0 text-sm leading-[1.4]">{value}</dd>
    </div>
  );
}

export function TicketDetailsCard({ ticket }: TicketDetailsCardProps) {
  return (
    <article className="border-border min-w-0 rounded-[10px] border p-5 sm:p-6">
      <header className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-muted text-xs leading-[1.4]">{ticket.number}</p>
          <h2 className="text-foreground mt-2 text-base leading-[1.4] font-bold">
            {ticket.title}
          </h2>
        </div>

        <TicketStatus status={ticket.status} />
      </header>

      <dl className="mt-6 flex flex-col gap-5">
        <Detail label="Descrição" value={ticket.description} />
        <Detail label="Categoria" value={ticket.category} />

        <div className="grid gap-5 sm:grid-cols-2">
          <Detail label="Criado em" value={ticket.createdAt} />
          <Detail label="Atualizado em" value={ticket.updatedAt} />
        </div>

        <div className="flex min-w-0 flex-col gap-2">
          <dt className="text-placeholder text-xs leading-[1.4]">Cliente</dt>
          <dd className="m-0">
            <UserInfo name={ticket.client} />
          </dd>
        </div>
      </dl>
    </article>
  );
}

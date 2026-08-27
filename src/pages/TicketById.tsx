import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { TicketActions } from "../components/tickets/TicketActions";
import { TicketCostsCard } from "../components/tickets/TicketCostCard";
import { TicketDetailsCard } from "../components/tickets/TicketDetailsCard";
import { ticketDetailsMock } from "../data/ticketDetails";
import type { TicketStatus } from "../types/ticket";

export function TicketByIdPage() {
  const [status, setStatus] = useState<TicketStatus>(ticketDetailsMock.status);
  const ticket = { ...ticketDetailsMock, status };

  return (
    <section
      aria-labelledby="ticket-details-title"
      className="flex w-full max-w-[900px] min-w-0 flex-col gap-6"
    >
      <header className="flex flex-wrap items-end justify-between gap-5">
        <div className="flex flex-col gap-3">
          <Link
            to="/tickets"
            className="text-muted hover:text-foreground focus-visible:outline-brand inline-flex w-fit items-center gap-2 text-xs leading-[1.4] transition-colors focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <ArrowLeft aria-hidden="true" className="size-3.5" />
            Voltar
          </Link>

          <h1
            id="ticket-details-title"
            className="text-brand text-2xl leading-[1.4] font-bold"
          >
            Chamado detalhado
          </h1>
        </div>

        <TicketActions status={status} onChangeStatus={setStatus} />
      </header>

      <div className="grid min-w-0 items-start gap-5 lg:grid-cols-[minmax(0,1.62fr)_minmax(245px,1fr)]">
        <TicketDetailsCard ticket={ticket} />
        <TicketCostsCard ticket={ticket} />
      </div>
    </section>
  );
}

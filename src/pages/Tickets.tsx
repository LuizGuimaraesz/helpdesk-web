import { TicketsList } from "../components/tickets/TicketsList";
import { ticketsMock } from "../data/tickets";

export function TicketsPage() {
  return (
    <section
      aria-labelledby="tickets-title"
      className="flex min-w-0 flex-col gap-6"
    >
      <h1
        id="tickets-title"
        className="text-brand text-2xl leading-[1.4] font-bold"
      >
        Chamados
      </h1>

      <TicketsList tickets={ticketsMock} />
    </section>
  );
}

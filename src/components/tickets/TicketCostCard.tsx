import type { TicketDetails } from "../../types/ticket";
import { getInitials } from "../../utils/getInitials";

type TicketCostsCardProps = {
  ticket: TicketDetails;
};

type AmountRowProps = {
  label: string;
  amount: string;
  emphasized?: boolean;
};

function AmountRow({ label, amount, emphasized = false }: AmountRowProps) {
  return (
    <div
      className={`flex items-start justify-between gap-4 ${
        emphasized ? "text-sm font-bold" : "text-xs"
      }`}
    >
      <dt className="min-w-0 leading-[1.4]">{label}</dt>
      <dd className="m-0 shrink-0 leading-[1.4]">{amount}</dd>
    </div>
  );
}

export function TicketCostsCard({ ticket }: TicketCostsCardProps) {
  return (
    <aside className="border-border min-w-0 rounded-[10px] border p-5 sm:p-6">
      <section aria-labelledby="ticket-technician-title">
        <h2
          id="ticket-technician-title"
          className="text-placeholder text-xs leading-[1.4]"
        >
          Técnico responsável
        </h2>

        <div className="mt-3 flex min-w-0 items-center gap-2.5">
          <span className="bg-brand text-surface flex size-7 shrink-0 items-center justify-center rounded-full text-[10px] leading-[1.4] tracking-[1px]">
            {getInitials(ticket.technician.name)}
          </span>
          <div className="flex min-w-0 flex-col">
            <span className="text-foreground truncate text-sm leading-[1.4]">
              {ticket.technician.name}
            </span>
            <span className="text-muted truncate text-xs leading-[1.4]">
              {ticket.technician.email}
            </span>
          </div>
        </div>
      </section>

      <section aria-labelledby="ticket-values-title" className="mt-8">
        <h2
          id="ticket-values-title"
          className="text-placeholder text-xs leading-[1.4]"
        >
          Valores
        </h2>

        <dl className="text-foreground mt-4 flex flex-col gap-5">
          <AmountRow label="Preço base" amount={ticket.baseAmount} />

          <div className="flex flex-col gap-2">
            <dt className="text-placeholder text-xs leading-[1.4]">
              Adicionais
            </dt>
            <dd className="m-0">
              <dl className="flex flex-col gap-1.5">
                {ticket.additionalServices.map((service) => (
                  <AmountRow
                    key={service.id}
                    label={service.title}
                    amount={service.amount}
                  />
                ))}
              </dl>
            </dd>
          </div>

          <div className="border-border border-t pt-4">
            <AmountRow
              label="Total"
              amount={ticket.totalAmount}
              emphasized
            />
          </div>
        </dl>
      </section>
    </aside>
  );
}

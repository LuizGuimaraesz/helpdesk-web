import { Button } from "../ui/Button";
import type { Service } from "../../types/service";
import { formatAmount } from "../../utils/formatAmount";

type TicketSummaryProps = {
  selectedService: Service | null;
  isLoadingServices: boolean;
  isSubmitting: boolean;
};

export function TicketSummary({
  selectedService,
  isLoadingServices,
  isSubmitting,
}: TicketSummaryProps) {
  return (
    <aside className="border-border min-w-0 self-start rounded-[10px] border p-7">
      <h2 className="text-foreground text-xl leading-[1.4] font-bold">
        Resumo
      </h2>
      <p className="text-muted mt-1 text-sm leading-[1.4]">
        Valores e detalhes
      </p>

      <dl className="mt-7 flex flex-col gap-6">
        <div>
          <dt className="text-placeholder text-sm leading-[1.4] font-bold">
            Categoria de serviço
          </dt>
          <dd className="text-foreground mt-1 text-base leading-[1.4]">
            {isLoadingServices
              ? "Carregando..."
              : (selectedService?.title ?? "Não selecionada")}
          </dd>
        </div>

        <div>
          <dt className="text-placeholder text-sm leading-[1.4] font-bold">
            Custo inicial
          </dt>
          <dd className="text-foreground mt-1 text-2xl leading-[1.4] font-bold">
            {selectedService ? formatAmount(selectedService.amount) : "R$ 0,00"}
          </dd>
        </div>
      </dl>

      <p className="text-muted mt-7 mb-7 text-sm leading-[1.4]">
        O chamado será automaticamente atribuído a um técnico disponível
      </p>

      <Button
        type="submit"
        isLoading={isSubmitting}
        disabled={!selectedService || isLoadingServices}
        className="font-normal"
      >
        Criar chamado
      </Button>
    </aside>
  );
}

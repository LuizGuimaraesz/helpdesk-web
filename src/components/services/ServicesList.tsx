import type { Service } from "../../types/service";
import { ServiceRow } from "./ServiceRow";

type ServicesListProps = {
  services: Service[];
  updatingServiceId?: string | null;
  onEditService?: (service: Service) => void;
  onToggleServiceStatus?: (service: Service) => Promise<void>;
};

export function ServicesList({
  services,
  updatingServiceId,
  onEditService,
  onToggleServiceStatus,
}: ServicesListProps) {
  return (
    <div className="border-border w-full min-w-0 max-w-full overflow-x-auto rounded-[10px] border">
      <table className="w-full min-w-[760px] table-fixed border-collapse">
        <caption className="sr-only">Lista de serviços</caption>

        <colgroup>
          <col />
          <col className="w-[32%]" />
          <col className="w-[76px]" />
          <col className="w-24" />
          <col className="w-[52px]" />
        </colgroup>

        <thead>
          <tr className="border-border text-placeholder h-12 border-b text-left text-sm leading-[1.4] font-bold">
            <th scope="col" className="px-3">
              Título
            </th>
            <th scope="col" className="px-3">
              Valor
            </th>
            <th scope="col" className="px-3">
              Status
            </th>
            <th scope="col">
              <span className="sr-only">Alterar status</span>
            </th>
            <th scope="col">
              <span className="sr-only">Editar</span>
            </th>
          </tr>
        </thead>

        <tbody>
          {services.map((service) => (
            <ServiceRow
              key={service.id}
              service={service}
              isUpdatingStatus={service.id === updatingServiceId}
              onEdit={onEditService}
              onToggleStatus={onToggleServiceStatus}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

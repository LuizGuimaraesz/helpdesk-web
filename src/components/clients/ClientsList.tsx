import type { User } from "../../types/user";
import { ClientRow } from "./ClientRow";

type ClientsListProps = {
  clients: User[];
  isDisabled?: boolean;
  onDeleteClient?: (client: User) => void;
  onEditClient?: (client: User) => void;
};

export function ClientsList({
  clients,
  isDisabled = false,
  onDeleteClient,
  onEditClient,
}: ClientsListProps) {
  return (
    <div className="border-border w-full min-w-0 max-w-full overflow-x-auto rounded-[10px] border">
      <table className="w-full min-w-0 table-fixed border-collapse md:min-w-[640px]">
        <caption className="sr-only">Lista de clientes</caption>

        <colgroup>
          <col />
          <col className="w-[40%] md:w-[42%]" />
          <col className="w-20 md:w-24" />
        </colgroup>

        <thead>
          <tr className="border-border text-placeholder h-10 border-b text-left text-xs leading-[1.4] font-normal md:h-12 md:text-sm md:font-bold">
            <th scope="col" className="px-2 md:px-3">
              Nome
            </th>
            <th scope="col" className="px-2 md:px-3">
              E-mail
            </th>
            <th scope="col">
              <span className="sr-only">Ações</span>
            </th>
          </tr>
        </thead>

        <tbody>
          {clients.map((client) => (
            <ClientRow
              key={client.id}
              client={client}
              isDisabled={isDisabled}
              onDelete={onDeleteClient}
              onEdit={onEditClient}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

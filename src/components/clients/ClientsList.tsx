import type { User } from "../../types/user";
import { ClientRow } from "./ClientRow";

type ClientsListProps = {
  clients: User[];
  onDeleteClient?: (client: User) => void;
  onEditClient?: (client: User) => void;
};

export function ClientsList({
  clients,
  onDeleteClient,
  onEditClient,
}: ClientsListProps) {
  return (
    <div className="border-border w-full min-w-0 max-w-full overflow-x-auto rounded-[10px] border">
      <table className="w-full min-w-[640px] table-fixed border-collapse">
        <caption className="sr-only">Lista de clientes</caption>

        <colgroup>
          <col />
          <col className="w-[42%]" />
          <col className="w-24" />
        </colgroup>

        <thead>
          <tr className="border-border text-placeholder h-12 border-b text-left text-sm leading-[1.4] font-bold">
            <th scope="col" className="px-3">
              Nome
            </th>
            <th scope="col" className="px-3">
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
              onDelete={onDeleteClient}
              onEdit={onEditClient}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

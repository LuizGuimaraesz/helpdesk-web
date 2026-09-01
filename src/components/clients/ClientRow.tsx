import type { User } from "../../types/user";
import { EditButton } from "../ui/EditButton";
import { UserInfo } from "../ui/UserInfo";

type ClientRowProps = {
  client: User;
  onDelete?: (client: User) => void;
  onEdit?: (client: User) => void;
};

export function ClientRow({ client, onDelete, onEdit }: ClientRowProps) {
  return (
    <tr className="border-border h-16 border-b last:border-b-0">
      <td className="px-3">
        <UserInfo name={client.name} />
      </td>

      <td className="text-foreground px-3 text-sm leading-[1.4]">
        <p className="truncate">{client.email}</p>
      </td>

      <td className="px-3">
        <div className="flex items-center justify-end gap-2">
          <EditButton
            variant="delete"
            aria-label={`Excluir o cliente ${client.name}`}
            onClick={onDelete ? () => onDelete(client) : undefined}
          />
          <EditButton
            aria-label={`Editar o cliente ${client.name}`}
            onClick={onEdit ? () => onEdit(client) : undefined}
          />
        </div>
      </td>
    </tr>
  );
}

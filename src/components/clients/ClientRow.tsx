import type { User } from "../../types/user";
import { EditButton } from "../ui/EditButton";
import { UserInfo } from "../ui/UserInfo";

type ClientRowProps = {
  client: User;
  isDisabled?: boolean;
  onDelete?: (client: User) => void;
  onEdit?: (client: User) => void;
};

export function ClientRow({
  client,
  isDisabled = false,
  onDelete,
  onEdit,
}: ClientRowProps) {
  return (
    <tr className="border-border h-14 border-b last:border-b-0 md:h-16">
      <td className="min-w-0 px-2 md:px-3">
        <UserInfo name={client.name} />
      </td>

      <td className="text-foreground min-w-0 px-2 text-xs leading-[1.4] md:px-3 md:text-sm">
        <p className="truncate">{client.email}</p>
      </td>

      <td className="px-1.5 text-center md:px-3">
        <div className="flex items-center justify-end gap-1 md:gap-2">
          <EditButton
            variant="delete"
            aria-label={`Excluir o cliente ${client.name}`}
            disabled={isDisabled}
            onClick={onDelete ? () => onDelete(client) : undefined}
            className="size-7"
          />
          <EditButton
            aria-label={`Editar o cliente ${client.name}`}
            disabled={isDisabled}
            onClick={onEdit ? () => onEdit(client) : undefined}
            className="size-7"
          />
        </div>
      </td>
    </tr>
  );
}

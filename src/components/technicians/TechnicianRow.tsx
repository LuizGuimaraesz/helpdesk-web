import type { User } from "../../types/user";
import { EditButton } from "../ui/EditButton";
import { UserInfo } from "../ui/UserInfo";
import { Availability } from "./Availability";

type TechnicianRowProps = {
  technician: User;
  onDelete?: (technician: User) => void;
  onEdit?: (technician: User) => void;
};

export function TechnicianRow({
  technician,
  onDelete,
  onEdit,
}: TechnicianRowProps) {
  return (
    <tr className="border-border h-16 border-b last:border-b-0 md:h-14">
      <td className="px-2 md:px-3">
        <UserInfo name={technician.name} />
      </td>

      <td className="text-foreground hidden px-3 text-sm leading-[1.4] md:table-cell">
        <p className="truncate">{technician.email}</p>
      </td>

      <td className="min-w-0 px-2 md:px-3">
        <Availability hours={technician.hours ?? []} />
      </td>

      <td className="px-1.5 text-center md:px-3">
        <div className="flex items-center justify-end gap-1 md:gap-2">
          <EditButton
            variant="delete"
            aria-label={`Excluir o técnico ${technician.name}`}
            onClick={onDelete ? () => onDelete(technician) : undefined}
            className="size-7"
          />
          <EditButton
            aria-label={`Editar o técnico ${technician.name}`}
            onClick={onEdit ? () => onEdit(technician) : undefined}
            className="size-7"
          />
        </div>
      </td>
    </tr>
  );
}

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
    <tr className="border-border h-14 border-b last:border-b-0">
      <td className="px-3">
        <UserInfo name={technician.name} />
      </td>

      <td className="text-foreground px-3 text-sm leading-[1.4]">
        <p className="truncate">{technician.email}</p>
      </td>

      <td className="min-w-0 px-3">
        <Availability hours={technician.hours ?? []} />
      </td>

      <td className="px-3">
        <div className="flex items-center justify-end gap-2">
          <EditButton
            variant="delete"
            aria-label={`Excluir o t\u00e9cnico ${technician.name}`}
            onClick={onDelete ? () => onDelete(technician) : undefined}
          />
          <EditButton
            aria-label={`Editar o t\u00e9cnico ${technician.name}`}
            onClick={onEdit ? () => onEdit(technician) : undefined}
          />
        </div>
      </td>
    </tr>
  );
}

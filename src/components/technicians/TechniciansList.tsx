import type { User } from "../../types/user";
import { TechnicianRow } from "./TechnicianRow";

type TechniciansListProps = {
  technicians: User[];
  onDeleteTechnician?: (technician: User) => void;
  onEditTechnician?: (technician: User) => void;
};

export function TechniciansList({
  technicians,
  onDeleteTechnician,
  onEditTechnician,
}: TechniciansListProps) {
  return (
    <div className="border-border w-full min-w-0 max-w-full overflow-x-auto rounded-[10px] border">
      <table className="w-full min-w-[680px] table-fixed border-collapse">
        <caption className="sr-only">Lista de técnicos</caption>

        <colgroup>
          <col className="w-[37%]" />
          <col className="w-[27%]" />
          <col />
          <col className="w-[84px]" />
        </colgroup>

        <thead>
          <tr className="border-border text-placeholder h-10 border-b text-left text-sm leading-[1.4] font-bold">
            <th scope="col" className="px-3">
              Nome
            </th>
            <th scope="col" className="px-3">
              E-mail
            </th>
            <th scope="col" className="px-3">
              Disponibilidade
            </th>
            <th scope="col">
              <span className="sr-only">Ações</span>
            </th>
          </tr>
        </thead>

        <tbody>
          {technicians.map((technician) => (
            <TechnicianRow
              key={technician.id}
              technician={technician}
              onDelete={onDeleteTechnician}
              onEdit={onEditTechnician}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

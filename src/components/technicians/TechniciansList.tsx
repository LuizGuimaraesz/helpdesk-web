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
      <table className="w-full min-w-0 table-fixed border-collapse md:min-w-[680px]">
        <caption className="sr-only">Lista de técnicos</caption>

        <colgroup>
          <col className="w-[38%] md:w-[37%]" />
          <col className="max-md:hidden md:w-[27%]" />
          <col />
          <col className="w-20 md:w-[84px]" />
        </colgroup>

        <thead>
          <tr className="border-border text-placeholder h-10 border-b text-left text-xs leading-[1.4] font-normal md:text-sm md:font-bold">
            <th scope="col" className="px-2 md:px-3">
              Nome
            </th>
            <th scope="col" className="hidden px-3 md:table-cell">
              E-mail
            </th>
            <th scope="col" className="px-2 md:px-3">
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

import { Ban, CircleCheck } from "lucide-react";
import { StatusBadge } from "../ui/StatusBadge";

type ServiceStatusProps = {
  active: boolean;
};

export function ServiceStatus({ active }: ServiceStatusProps) {
  return (
    <>
      <StatusBadge
        label={active ? "Ativo" : "Inativo"}
        variant={active ? "closed" : "open"}
        icon={active ? CircleCheck : Ban}
        showLabel={false}
        className="p-1.5 [&_svg]:size-3.5 md:hidden"
      />
      <StatusBadge
        label={active ? "Ativo" : "Inativo"}
        variant={active ? "closed" : "open"}
        className="hidden md:inline-flex"
      />
    </>
  );
}

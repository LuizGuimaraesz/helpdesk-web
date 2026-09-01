import { StatusBadge } from "../ui/StatusBadge";

type ServiceStatusProps = {
  active: boolean;
};

export function ServiceStatus({ active }: ServiceStatusProps) {
  return (
    <StatusBadge
      label={active ? "Ativo" : "Inativo"}
      variant={active ? "closed" : "open"}
    />
  );
}

type ServiceStatusProps = {
  active: boolean;
};

export function ServiceStatus({ active }: ServiceStatusProps) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full px-2 py-1 text-xs leading-[1.4] font-bold whitespace-nowrap ${
        active
          ? "bg-status-closed-background text-status-closed"
          : "bg-status-open-background text-status-open"
      }`}
    >
      {active ? "Ativo" : "Inativo"}
    </span>
  );
}

import type { LucideIcon } from "lucide-react";
import { classMerge } from "../../utils/classMerge";

export type StatusBadgeVariant = "open" | "progress" | "closed";

type StatusBadgeProps = {
  label: string;
  variant: StatusBadgeVariant;
  icon?: LucideIcon;
  className?: string;
};

const variants: Record<StatusBadgeVariant, string> = {
  open: "bg-status-open-background text-status-open",
  progress: "bg-status-progress-background text-status-progress",
  closed: "bg-status-closed-background text-status-closed",
};

export function StatusBadge({
  label,
  variant,
  icon: Icon,
  className,
}: StatusBadgeProps) {
  return (
    <span
      className={classMerge(
        "inline-flex items-center justify-center rounded-full text-xs leading-[1.4] font-bold whitespace-nowrap",
        Icon ? "p-1.5" : "px-2 py-1",
        variants[variant],
        className,
      )}
    >
      {Icon && <Icon aria-hidden="true" className="size-4 shrink-0" />}
      {Icon ? (
        <span className="flex h-4 items-center justify-center px-1.5">
          {label}
        </span>
      ) : (
        label
      )}
    </span>
  );
}

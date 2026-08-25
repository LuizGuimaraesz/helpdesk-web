import type { LucideIcon } from "lucide-react";
import { NavLink } from "react-router-dom";
import { classMerge } from "../../utils/classMerge";

type NavItemProps = {
  icon: LucideIcon;
  label: string;
  to: string;
};

export function NavItem({ icon, label, to }: NavItemProps) {
  const Icon = icon;

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        classMerge(
          "flex w-full items-center gap-3 rounded-[5px] p-3 text-sm leading-[1.4] transition-colors",
          isActive
            ? "bg-brand text-surface"
            : "text-placeholder hover:bg-foreground hover:text-surface",
        )
      }
    >
      <Icon aria-hidden="true" className="size-5 shrink-0" />
      <span className="min-w-0 flex-1 truncate">{label}</span>
    </NavLink>
  );
}

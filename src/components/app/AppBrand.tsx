import logoSymbolBase from "../../assets/logo-symbol-base.svg";
import logoSymbolDetail from "../../assets/logo-symbol-detail.svg";
import type { UserRole } from "../../types/user";
import { classMerge } from "../../utils/classMerge";

type AppBrandProps = {
  role: UserRole;
  compact?: boolean;
};

export function AppBrand({ role, compact = false }: AppBrandProps) {
  return (
    <div className={classMerge("flex min-w-0 items-center gap-3", compact && "gap-2.5")}>
      <span
        aria-hidden="true"
        className={classMerge("relative size-11 shrink-0", compact && "size-10")}
      >
        <img src={logoSymbolBase} alt="" className="absolute inset-0 size-full" />
        <img
          src={logoSymbolDetail}
          alt=""
          className={classMerge(
            "absolute top-1/2 left-1/2 size-[32.5px] -translate-x-1/3 -translate-y-1/2",
            compact && "size-7",
          )}
        />
      </span>

      <div className="flex min-w-0 flex-col justify-center font-bold leading-[1.4]">
        <span className={classMerge("text-surface text-xl", compact && "text-lg")}>
          HelpDesk
        </span>
        <span
          className={classMerge(
            "text-brand-light text-[10px] tracking-[0.6px] uppercase",
            compact && "text-[10px]",
          )}
        >
          {role}
        </span>
      </div>
    </div>
  );
}

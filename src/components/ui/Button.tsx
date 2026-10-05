import { classMerge } from "../../utils/classMerge";
import type { ButtonHTMLAttributes } from "react";
import type { LucideIcon } from "lucide-react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
  variant?: "black" | "white";
  icon?: LucideIcon;
  iconOnlyMobile?: boolean;
};

const variants = {
  black: "bg-foreground text-surface hover:bg-page",
  white: "bg-border text-foreground hover:bg-secondary-hover",
};

export function Button({
  children,
  className,
  isLoading = false,
  disabled = false,
  type = "button",
  variant = "black",
  icon: Icon,
  iconOnlyMobile = false,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={classMerge(
        "focus-visible:outline-brand flex h-10 w-full cursor-pointer items-center justify-center rounded-[5px] px-4 text-sm leading-[1.4] font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 transition ease-linear disabled:opacity-50 gap-1",
        variants[variant],
        iconOnlyMobile && "max-md:size-8 max-md:gap-0 max-md:p-0",
        className,
      )}
      {...props}
    >
      {Icon && <Icon aria-hidden="true" className="size-4" />}
      {children && (
        <span className={iconOnlyMobile ? "max-md:sr-only" : undefined}>
          {children}
        </span>
      )}
    </button>
  );
}

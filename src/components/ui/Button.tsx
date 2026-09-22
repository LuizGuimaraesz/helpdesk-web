import { classMerge } from "../../utils/classMerge";
import type { ButtonHTMLAttributes } from "react";
import { Plus, type LucideIcon } from "lucide-react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
  variant?: "black" | "white" | "plus" | "secondary";
  icon?: LucideIcon;
  iconOnlyMobile?: boolean;
};

const variants = {
  button: {
    black: "bg-foreground text-surface hover:bg-page",
    white: "bg-border text-foreground hover:bg-secondary-hover",
    plus: "bg-foreground text-surface hover:bg-page w-auto gap-2",
    secondary:
      "bg-border text-foreground hover:bg-secondary-hover h-9 w-auto gap-2 px-4 text-xs",
  },
};

export function Button({
  children,
  className,
  isLoading = false,
  type = "button",
  variant = "black",
  icon: Icon,
  iconOnlyMobile = false,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={isLoading}
      className={classMerge(
        "focus-visible:outline-brand flex h-10 w-full cursor-pointer items-center justify-center rounded-[5px] px-4 text-sm leading-[1.4] font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 transition ease-linear disabled:opacity-50",
        variants.button[variant],
        iconOnlyMobile && "max-md:size-8 max-md:gap-0 max-md:p-0",
        className,
      )}
      {...props}
    >
      {variant === "plus" ? (
        <>
          <Plus aria-hidden="true" className="size-4" />
          <span className={iconOnlyMobile ? "max-md:sr-only" : undefined}>
            Novo
          </span>
        </>
      ) : (
        <>
          {Icon && (
            <Icon
              aria-hidden="true"
              className={classMerge("size-4", variant === "secondary" && "text-muted")}
            />
          )}
          {children}
        </>
      )}
    </button>
  );
}

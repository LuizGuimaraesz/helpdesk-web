import type { ButtonHTMLAttributes } from "react";
import { Plus } from "lucide-react";
import { classMerge } from "../../utils/classMerge";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  children,
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={classMerge(
        "bg-foreground text-surface hover:bg-page focus-visible:outline-brand inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-[5px] px-4 text-sm leading-[1.4] font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <Plus aria-hidden="true" className="size-4" />
      Novo
    </button>
  );
}

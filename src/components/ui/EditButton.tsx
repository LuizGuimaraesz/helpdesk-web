import { PencilLine } from "lucide-react";
import type { ButtonHTMLAttributes } from "react";
import { classMerge } from "../../utils/classMerge";

type EditButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function EditButton({
  "aria-label": ariaLabel = "Editar",
  className,
  type = "button",
  ...props
}: EditButtonProps) {
  return (
    <button
      type={type}
      aria-label={ariaLabel}
      className={classMerge(
        "bg-border hover:bg-secondary-hover focus-visible:outline-brand mx-auto flex size-7 cursor-pointer items-center justify-center overflow-hidden rounded-[5px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <PencilLine aria-hidden="true" className="size-3.5" />
    </button>
  );
}

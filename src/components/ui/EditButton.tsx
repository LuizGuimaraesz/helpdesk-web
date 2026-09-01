import { PencilLine, Trash2 } from "lucide-react";
import type { ButtonHTMLAttributes } from "react";
import { classMerge } from "../../utils/classMerge";

type EditButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "edit" | "delete";
};

const variants = {
  edit: "text-foreground",
  delete: "text-feedback-error",
};

export function EditButton({
  "aria-label": ariaLabel,
  className,
  type = "button",
  variant = "edit",
  ...props
}: EditButtonProps) {
  const Icon = variant === "delete" ? Trash2 : PencilLine;

  return (
    <button
      type={type}
      aria-label={ariaLabel ?? (variant === "delete" ? "Excluir" : "Editar")}
      className={classMerge(
        "bg-border hover:bg-secondary-hover focus-visible:outline-brand mx-auto flex size-7 cursor-pointer items-center justify-center overflow-hidden rounded-[5px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        className,
      )}
      {...props}
    >
      <Icon aria-hidden="true" className="size-3.5" />
    </button>
  );
}

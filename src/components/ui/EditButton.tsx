import { Eye, PencilLine, Trash2 } from "lucide-react";
import type { ButtonHTMLAttributes } from "react";
import { classMerge } from "../../utils/classMerge";

type EditButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "edit" | "delete" | "view";
};

const variants = {
  edit: "text-foreground",
  delete: "text-feedback-error",
  view: "text-foreground",
};

const icons = {
  edit: PencilLine,
  delete: Trash2,
  view: Eye,
};

const labels = {
  edit: "Editar",
  delete: "Excluir",
  view: "Visualizar",
};

export function EditButton({
  "aria-label": ariaLabel,
  className,
  type = "button",
  variant = "edit",
  ...props
}: EditButtonProps) {
  const Icon = icons[variant];

  return (
    <button
      type={type}
      aria-label={ariaLabel ?? labels[variant]}
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

import { useId, type InputHTMLAttributes, type ReactNode } from "react";
import { classMerge } from "../../utils/classMerge";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  prefix?: ReactNode;
  containerClassName?: string;
};

export function Input({
  id,
  label,
  prefix,
  className,
  containerClassName,
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div
      className={classMerge(
        "border-border border-b py-3",
        containerClassName,
      )}
    >
      <label
        htmlFor={inputId}
        className="text-muted block text-xs leading-[1.4] font-bold uppercase"
      >
        {label}
      </label>

      <div className="mt-1.5 flex items-center gap-1.5">
        {prefix && (
          <span aria-hidden="true" className="text-foreground text-lg">
            {prefix}
          </span>
        )}

        <input
          id={inputId}
          className={classMerge(
            "text-foreground placeholder:text-placeholder min-w-0 flex-1 border-0 bg-transparent p-0 text-base leading-[1.4] outline-none",
            className,
          )}
          {...props}
        />
      </div>
    </div>
  );
}

import { useId, type InputHTMLAttributes, type ReactNode } from "react";
import { classMerge } from "../../utils/classMerge";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  variant?: "auth" | "inline";
  prefix?: ReactNode;
  containerClassName?: string;
};

const variants = {
  auth: {
    container: "flex w-full flex-col justify-center",
    label:
      "text-muted overflow-hidden text-[10px] leading-[1.4] font-bold tracking-[0.6px] text-ellipsis whitespace-nowrap uppercase",
    inputContainer: "flex",
    input:
      "border-border text-foreground placeholder:text-placeholder focus:border-brand h-10 w-full border-0 border-b border-solid bg-transparent py-2 text-base leading-[1.4] outline-none",
  },
  inline: {
    container: "border-border border-b py-3",
    label: "text-muted block text-xs leading-[1.4] font-bold uppercase",
    inputContainer: "mt-1.5 flex items-center gap-1.5",
    input:
      "text-foreground placeholder:text-placeholder min-w-0 flex-1 border-0 bg-transparent p-0 text-base leading-[1.4] outline-none",
  },
};

export function Input({
  id,
  label,
  variant = "inline",
  prefix,
  className,
  containerClassName,
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const styles = variants[variant];

  return (
    <div
      className={classMerge(styles.container, containerClassName)}
    >
      <label htmlFor={inputId} className={styles.label}>
        {label}
      </label>

      <div className={styles.inputContainer}>
        {prefix && (
          <span aria-hidden="true" className="text-foreground text-lg">
            {prefix}
          </span>
        )}

        <input
          id={inputId}
          className={classMerge(
            styles.input,
            className,
          )}
          {...props}
        />
      </div>
    </div>
  );
}

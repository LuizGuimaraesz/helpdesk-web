import type { InputHTMLAttributes } from "react";

type FormFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
};

export function FormField({ id, label, className, ...props }: FormFieldProps) {
  return (
    <div className="flex w-full flex-col justify-center">
      <label
        htmlFor={id}
        className="text-muted overflow-hidden text-[10px] leading-[1.4] font-bold tracking-[0.6px] text-ellipsis whitespace-nowrap uppercase"
      >
        {label}
      </label>

      <input
        id={id}
        className={`border-border text-foreground placeholder:text-placeholder focus:border-brand h-10 w-full border-0 border-b border-solid bg-transparent py-2 text-base leading-[1.4] outline-none ${className ?? ""}`}
        {...props}
      />
    </div>
  );
}

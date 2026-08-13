import { classMerge } from "../utils/classMerge";
import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
  variant?: "black" | "white";
};

const variants = {
  button: {
    black: "bg-foreground text-surface hover:bg-page",
    white: "bg-border text-foreground hover:bg-secondary-hover",
  },
};

export function Button({
  className,
  isLoading = false,
  type = "button",
  variant = "black",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={isLoading}
      className={classMerge(
        "focus-visible:outline-brand flex h-10 w-full cursor-pointer items-center justify-center rounded-[5px] px-4 text-sm leading-[1.4] font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 transition ease-linear disabled:opacity-50",
        variants.button[variant],
      )}
      {...props}
    />
  );
}

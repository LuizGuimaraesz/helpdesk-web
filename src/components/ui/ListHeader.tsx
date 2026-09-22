import type { ReactNode } from "react";
import { classMerge } from "../../utils/classMerge";

type ListHeaderProps = {
  title: string;
  titleId?: string;
  children?: ReactNode;
  titleClassName?: string;
};

export function ListHeader({
  title,
  titleId,
  children,
  titleClassName,
}: ListHeaderProps) {
  return (
    <header className="flex items-center justify-between gap-4">
      <h1
        id={titleId}
        className={classMerge(
          "text-brand text-2xl leading-[1.4] font-bold",
          titleClassName,
        )}
      >
        {title}
      </h1>

      {children}
    </header>
  );
}

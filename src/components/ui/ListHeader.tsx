import type { ReactNode } from "react";

type ListHeaderProps = {
  title: string;
  titleId?: string;
  children?: ReactNode;
};

export function ListHeader({
  title,
  titleId,
  children,
}: ListHeaderProps) {
  return (
    <header className="flex items-center justify-between gap-4">
      <h1
        id={titleId}
        className="text-brand text-lg leading-[1.4] font-bold md:text-2xl"
      >
        {title}
      </h1>

      {children}
    </header>
  );
}

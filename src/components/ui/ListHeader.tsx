import type { ReactNode } from "react";

type ListHeaderProps = {
  title: string;
  titleId?: string;
  children?: ReactNode;
};

export function ListHeader({ title, titleId, children }: ListHeaderProps) {
  return (
    <header className="flex items-center justify-between gap-4">
      <h1
        id={titleId}
        className="text-brand text-2xl leading-[1.4] font-bold"
      >
        {title}
      </h1>

      {children}
    </header>
  );
}

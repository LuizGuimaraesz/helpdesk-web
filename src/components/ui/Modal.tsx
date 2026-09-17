import { X } from "lucide-react";
import { useEffect, useId, type ReactNode } from "react";
import { classMerge } from "../../utils/classMerge";

type ModalProps = {
  isOpen: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
  className?: string;
};

export function Modal({
  isOpen,
  title,
  children,
  onClose,
  className,
}: ModalProps) {
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4"
      onMouseDown={onClose}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={classMerge(
          "bg-surface w-full max-w-[432px] overflow-hidden rounded-[7.5px] shadow-lg",
          className,
        )}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="border-border flex h-[60px] items-center justify-between border-b px-6">
          <h2
            id={titleId}
            className="text-foreground text-base leading-[1.4] font-bold"
          >
            {title}
          </h2>

          <button
            type="button"
            aria-label={`Fechar modal ${title}`}
            onClick={onClose}
            className="text-muted hover:text-foreground focus-visible:outline-brand inline-flex size-9 cursor-pointer items-center justify-center rounded-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <X aria-hidden="true" className="size-6" />
          </button>
        </header>

        {children}
      </section>
    </div>
  );
}

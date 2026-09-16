import { CircleUserRound, LogOut } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { getInitials } from "../../utils/getInitials";

type UserProfileProps = {
  email?: string;
  name?: string;
};

export function UserProfile({ email, name }: UserProfileProps) {
  const navigate = useNavigate();
  const { remove } = useAuth();
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const displayName = name?.trim() || "Usuário";
  const displayEmail = email ?? "";

  function handleLogout() {
    remove();
    navigate("/login");
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!profileRef.current?.contains(event.target as Node)) {
        setIsOptionsOpen(false);
      }
    }

    if (isOptionsOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOptionsOpen]);

  return (
    <div ref={profileRef} className="relative">
      <button
        type="button"
        aria-expanded={isOptionsOpen}
        aria-haspopup="menu"
        aria-label="Abrir opções do perfil"
        onClick={() => setIsOptionsOpen((isOpen) => !isOpen)}
        className="border-foreground hover:bg-foreground/40 focus-visible:outline-brand flex w-full cursor-pointer items-center gap-3 border-t px-4 py-5 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px]"
      >
        <span className="bg-brand text-surface flex size-8 shrink-0 items-center justify-center rounded-full text-sm leading-[1.2] tracking-[1.4px]">
          {getInitials(displayName)}
        </span>

        <span className="min-w-0 flex-1 leading-[1.4]">
          <span className="text-surface block truncate text-sm">
            {displayName}
          </span>
          <span className="text-placeholder block truncate text-xs">
            {displayEmail}
          </span>
        </span>
      </button>

      {isOptionsOpen && (
        <div
          role="menu"
          aria-label="Opções do perfil"
          className="bg-page absolute bottom-4 left-[calc(100%+12px)] z-20 w-[238px] rounded-[10px] px-4 py-5 shadow-lg"
        >
          <p className="text-placeholder text-xs font-bold tracking-[0.6px] uppercase">
            Opções
          </p>

          <div className="mt-5 flex flex-col gap-1 ">
            <button
              type="button"
              role="menuitem"
              onClick={() => setIsOptionsOpen(false)}
              className="text-surface hover:bg-foreground focus-visible:outline-brand flex w-full cursor-pointer items-center gap-3 rounded-[5px] px-1 py-2 text-left text-lg leading-[1.4] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <CircleUserRound aria-hidden="true" className="size-5" />
              Perfil
            </button>

            <button
              type="button"
              role="menuitem"
              onClick={handleLogout}
              className="text-feedback-error hover:bg-foreground focus-visible:outline-feedback-error flex w-full cursor-pointer items-center gap-3 rounded-[5px] px-1 py-2 text-left text-lg leading-[1.4] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <LogOut aria-hidden="true" className="size-5" />
              Sair
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

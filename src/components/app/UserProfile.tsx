import { CircleUserRound, LogOut } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ChangePasswordForm } from "../profile/ChangePasswordForm";
import { ProfileForm } from "../profile/ProfileForm";
import { useAuth } from "../../hooks/useAuth";
import { getInitials } from "../../utils/getInitials";
import type { UserProfileProps } from "../../types/user";
import { classMerge } from "../../utils/classMerge";

export function UserProfile({
  email,
  name,
  avatarUrl,
  compact = false,
}: UserProfileProps & { compact?: boolean }) {
  const { remove } = useAuth();
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  function handleLogout() {
    remove();
  }

  function handleOpenProfile() {
    setIsProfileOpen(true);
  }

  function handleCloseProfile() {
    setIsProfileOpen(false);
    setIsOptionsOpen(false);
  }

  function handleOpenChangePassword() {
    setIsProfileOpen(false);
    setIsChangePasswordOpen(true);
  }

  function handleCloseChangePassword() {
    setIsChangePasswordOpen(false);

    setIsProfileOpen(true);
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
        className={classMerge(
          "border-foreground hover:bg-foreground/40 focus-visible:outline-brand flex w-full cursor-pointer items-center gap-3 border-t px-4 py-5 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px]",
          compact && "size-11 justify-center gap-0 rounded-full border-0 p-0",
        )}
      >
        {compact && avatarUrl ? (
          <img
            src={avatarUrl}
            alt=""
            className="size-11 shrink-0 rounded-full object-cover"
          />
        ) : (
          <span
            className={classMerge(
              "bg-brand text-surface flex size-8 shrink-0 items-center justify-center rounded-full text-sm leading-[1.2] tracking-[1.4px]",
              compact && "size-11 text-base",
            )}
          >
            {getInitials(name)}
          </span>
        )}

        <span className={classMerge("min-w-0 flex-1 leading-[1.4]", compact && "sr-only")}>
          <span className="text-surface block truncate text-sm">{name}</span>
          <span className="text-placeholder block truncate text-xs">
            {email}
          </span>
        </span>
      </button>

      {isOptionsOpen && (
        <div
          role="menu"
          aria-label="Opções do perfil"
          className={classMerge(
            "bg-page absolute bottom-4 left-[calc(100%+12px)] z-20 w-[238px] rounded-[10px] px-4 py-5 shadow-lg",
            compact && "top-full right-0 bottom-auto left-auto mt-2",
          )}
        >
          <p className="text-placeholder text-xs font-bold tracking-[0.6px] uppercase">
            Opções
          </p>

          <div className="mt-5 flex flex-col gap-1 ">
            <button
              type="button"
              role="menuitem"
              onClick={handleOpenProfile}
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

      <ProfileForm
        isOpen={isProfileOpen}
        onClose={handleCloseProfile}
        onChangePassword={handleOpenChangePassword}
        name={name}
        email={email}
        avatarUrl={avatarUrl}
      />

      <ChangePasswordForm
        isOpen={isChangePasswordOpen}
        onClose={handleCloseChangePassword}
      />
    </div>
  );
}

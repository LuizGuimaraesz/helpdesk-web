import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { AppBrand } from "./AppBrand";
import { Sidebar } from "./Sidebar";
import { UserProfile } from "./UserProfile";

export function AppLayout() {
  const { session } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  if (!session) {
    return null;
  }

  return (
    <div className="bg-page flex h-dvh min-w-[320px] flex-col overflow-hidden md:flex-row md:items-stretch md:pt-3">
      <header className="bg-page relative z-30 flex h-[72px] shrink-0 items-center gap-3 px-4 md:hidden">
        <button
          type="button"
          aria-label="Abrir navegação"
          aria-controls="mobile-navigation"
          aria-expanded={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen(true)}
          className="text-surface hover:bg-foreground focus-visible:outline-brand flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-[5px] focus-visible:outline-2"
        >
          <Menu aria-hidden="true" className="size-5" />
        </button>
        <AppBrand role={session.user.role} compact />
        <div className="ml-auto">
          <UserProfile
            name={session.user.name}
            email={session.user.email}
            avatarUrl={session.user.avatarUrl}
            compact
          />
        </div>
      </header>

      <Sidebar
        role={session.user.role}
        name={session.user.name}
        email={session.user.email}
        avatarUrl={session.user.avatarUrl}
      />

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden" id="mobile-navigation">
          <div className="relative z-10 h-full shadow-xl">
            <Sidebar
              role={session.user.role}
              name={session.user.name}
              email={session.user.email}
              avatarUrl={session.user.avatarUrl}
              mobile
              onNavigate={() => setIsMobileMenuOpen(false)}
            />
          </div>
          <button
            type="button"
            aria-label="Fechar navegação"
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute inset-0 cursor-pointer bg-black/60"
          />
          <button
            type="button"
            aria-label="Fechar navegação"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-surface absolute top-3 right-3 z-10 flex size-9 cursor-pointer items-center justify-center rounded-[5px]"
          >
            <X aria-hidden="true" className="size-5" />
          </button>
        </div>
      )}

      <main className="bg-surface min-h-0 min-w-0 flex-1 overflow-y-auto overscroll-contain rounded-t-[20px] px-3 pt-5 pb-8 sm:px-4 md:rounded-none md:rounded-tl-[20px] md:px-8 md:pt-8 md:pb-12 lg:px-12 lg:pt-[52px]">
        <Outlet />
      </main>
    </div>
  );
}

import { Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Sidebar } from "./Sidebar";

export function AppLayout() {
  const { session } = useAuth();

  if (!session) {
    return null;
  }

  return (
    <div className="bg-page flex h-dvh min-w-[320px] items-stretch overflow-hidden pt-3">
      <Sidebar role={session.user.role} user={session.user} />

      <main className="bg-surface min-w-0 flex-1 overflow-y-auto rounded-tl-[20px] px-6 pt-8 pb-12 sm:px-8 lg:px-12 lg:pt-[52px]">
        <Outlet />
      </main>
    </div>
  );
}

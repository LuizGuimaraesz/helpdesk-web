import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";

const adminMock: UserAPIResponse["user"] = {
  id: "preview-admin",
  name: "Usuário Adm",
  email: "user.adm@test.com",
  role: "admin",
};

export function AppLayout() {
  return (
    <div className="bg-page flex h-dvh min-w-[320px] items-stretch overflow-hidden pt-3">
      <Sidebar role={adminMock.role} user={adminMock} />

      <main className="bg-surface min-w-0 flex-1 overflow-y-auto rounded-tl-[20px] px-6 pt-8 pb-12 sm:px-8 lg:px-12 lg:pt-[52px]">
        <Outlet />
      </main>
    </div>
  );
}

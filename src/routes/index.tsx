import { BrowserRouter } from "react-router-dom";
import { Loading } from "../components/ui/Loading";
import { useAuth } from "../hooks/useAuth";
import type { UserRole } from "../types/user";
import { AdminRoutes } from "./Admin-routes";
import { AuthRoutes } from "./Auth-routes";
import { ClientRoutes } from "./Client-routes";
import { TechnicianRoutes } from "./Technician-routes";

function RouteByRole({ role }: { role?: UserRole }) {
  switch (role) {
    case "admin":
      return <AdminRoutes />;
    case "client":
      return <ClientRoutes />;
    case "technician":
      return <TechnicianRoutes />;
    default:
      return <AuthRoutes />;
  }
}

export function AppRoutes() {
  const { session, isLoading } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <BrowserRouter>
      <RouteByRole role={session?.user.role} />
    </BrowserRouter>
  );
}

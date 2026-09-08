import { BrowserRouter } from "react-router-dom";
import { Loading } from "../components/ui/Loading";
import { useAuth } from "../hooks/useAuth";
import { AdminRoutes } from "./Admin-routes";
import { AuthRoutes } from "./Auth-routes";
import { ClientRoutes } from "./Client-routes";
import { TechnicianRoutes } from "./Technician-routes";

export function AppRoutes() {
  const { session, isLoading } = useAuth();

  function RouteByRole() {
    switch (session?.user.role) {
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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <BrowserRouter>
      <RouteByRole />
    </BrowserRouter>
  );
}

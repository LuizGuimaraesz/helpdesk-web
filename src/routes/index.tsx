import { BrowserRouter } from "react-router-dom";
import { AuthRoutes } from "./Auth-routes";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <AuthRoutes />
    </BrowserRouter>
  );
}

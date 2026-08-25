import { Route } from "react-router-dom";
import { AppLayout } from "../components/layout/AppLayout";
import { AdminPlaceholder} from "../pages/AdminPlaceholder";

export const adminRoute = (
  <Route element={<AppLayout />}>
    <Route
      path="/tickets"
      element={<AdminPlaceholder title="Chamados" />}
    />
    <Route
      path="/technicians"
      element={<AdminPlaceholder title="Técnicos" />}
    />
    <Route
      path="/clients"
      element={<AdminPlaceholder title="Clientes" />}
    />
    <Route
      path="/services"
      element={<AdminPlaceholder title="Serviços" />}
    />
  </Route>
);

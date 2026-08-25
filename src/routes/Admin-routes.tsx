import { Route } from "react-router-dom";
import { AppLayout } from "../components/layout/AppLayout";
import { AdminPlaceholder } from "../pages/AdminPlaceholder";
import { TicketsPage } from "../pages/Tickets";

export const adminRoute = (
  <Route element={<AppLayout />}>
    <Route path="/tickets" element={<TicketsPage />} />
    <Route
      path="/technicians"
      element={<AdminPlaceholder title="Técnicos" />}
    />
    <Route path="/clients" element={<AdminPlaceholder title="Clientes" />} />
    <Route path="/services" element={<AdminPlaceholder title="Serviços" />} />
  </Route>
);

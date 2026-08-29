import { Route } from "react-router-dom";
import { AppLayout } from "../components/layout/AppLayout";
import { AdminPlaceholder } from "../pages/AdminPlaceholder";
import { ServicesPage } from "../pages/Services";
import { TicketByIdPage } from "../pages/TicketById";
import { TicketsPage } from "../pages/Tickets";

export const adminRoute = (
  <Route element={<AppLayout />}>
    <Route path="/tickets" element={<TicketsPage />} />
    <Route path="/tickets/:ticketId" element={<TicketByIdPage />} />
    <Route
      path="/technicians"
      element={<AdminPlaceholder title="Técnicos" />}
    />
    <Route path="/clients" element={<AdminPlaceholder title="Clientes" />} />
    <Route path="/services" element={<ServicesPage />} />
  </Route>
);

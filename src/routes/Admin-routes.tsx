import { Route } from "react-router-dom";
import { AppLayout } from "../components/layout/AppLayout";
import { ClientsPage } from "../pages/Clients";
import { EditTechnicianPage } from "../pages/EditTechnician";
import { NewTechnicianPage } from "../pages/NewTechnician";
import { ServicesPage } from "../pages/Services";
import { TechniciansPage } from "../pages/Technicians";
import { TicketByIdPage } from "../pages/TicketById";
import { TicketsPage } from "../pages/Tickets";

export const adminRoute = (
  <Route element={<AppLayout />}>
    <Route path="/tickets" element={<TicketsPage />} />
    <Route path="/tickets/:ticketId" element={<TicketByIdPage />} />
    <Route path="/technicians" element={<TechniciansPage />} />
    <Route path="/technicians/new" element={<NewTechnicianPage />} />
    <Route path="/technicians/:id" element={<EditTechnicianPage />} />
    <Route path="/clients" element={<ClientsPage />} />
    <Route path="/services" element={<ServicesPage />} />
  </Route>
);

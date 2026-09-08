import { Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "../components/layout/AppLayout";
import { ClientsPage } from "../pages/admin/Clients";
import { EditTechnicianPage } from "../pages/admin/EditTechnician";
import { NewTechnicianPage } from "../pages/admin/NewTechnician";
import { ServicesPage } from "../pages/admin/Services";
import { TechniciansPage } from "../pages/admin/Technicians";
import { TicketByIdPage } from "../pages/admin/TicketById";
import { TicketsPage } from "../pages/admin/Tickets";

export function AdminRoutes() {
  return (
    <Routes>
    <Route element={<AppLayout />}>
      <Route path="/tickets" element={<TicketsPage />} />
      <Route path="/tickets/:ticketId" element={<TicketByIdPage />} />
      <Route path="/technicians" element={<TechniciansPage />} />
      <Route path="/technicians/new" element={<NewTechnicianPage />} />
      <Route path="/technicians/:id" element={<EditTechnicianPage />} />
      <Route path="/clients" element={<ClientsPage />} />
      <Route path="/services" element={<ServicesPage />} />
    </Route>

      <Route path="*" element={<Navigate to="/tickets" replace />} />
    </Routes>
  );
}

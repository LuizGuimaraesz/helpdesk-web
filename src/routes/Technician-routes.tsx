import { Navigate, Route, Routes } from "react-router-dom";
import { TechnicianTicketsPage } from "../pages/technician/TechnicianTickets";
import { TicketByIdPage } from "../pages/TicketById";
import { AppLayout } from "../components/layout/AppLayout";

export function TechnicianRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/tickets" element={<TechnicianTicketsPage />} />
        <Route
          path="/tickets/:ticketId"
          element={<TicketByIdPage backTo="/tickets" showActions />}
        />
        <Route path="/technician" element={<Navigate to="/tickets" replace />} />
        <Route path="*" element={<Navigate to="/tickets" replace />} />
      </Route>
    </Routes>
  );
}

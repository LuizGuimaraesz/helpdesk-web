import { Navigate, Route, Routes } from "react-router-dom";
import { TicketByIdPage } from "../pages/TicketById";
import { AppLayout } from "../components/layout/AppLayout";
import { TicketsPage } from "../pages/Tickets";

export function ClientRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route
          path="/tickets"
          element={<TicketsPage title="Meus chamados" actionVariant="view" />}
        />
        <Route
          path="/tickets/:ticketId"
          element={<TicketByIdPage backTo="/tickets" showActions={false} />}
        />
        <Route path="*" element={<Navigate to="/tickets" replace />} />
      </Route>
    </Routes>
  );
}

import { Navigate, Route, Routes } from "react-router-dom";
import { ClientPage } from "../pages/client/ClientPage";
import { AppLayout } from "../components/layout/AppLayout";

export function ClientRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/client" element={<ClientPage />} />
        <Route path="*" element={<Navigate to="/client" replace />} />
      </Route>
    </Routes>
  );
}

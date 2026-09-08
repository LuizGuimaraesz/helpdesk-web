import { Navigate, Route, Routes } from "react-router-dom";
import { TechnicianPage } from "../pages/technician/TechnicianPage";
import { AppLayout } from "../components/layout/AppLayout";

export function TechnicianRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/technician" element={<TechnicianPage />} />
        <Route path="*" element={<Navigate to="/technician" replace />} />
      </Route>
    </Routes>
  );
}

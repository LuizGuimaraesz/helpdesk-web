import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { adminRoute } from "./Admin-routes";
import { authRoute } from "./Auth-routes";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {authRoute}
        {adminRoute}

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

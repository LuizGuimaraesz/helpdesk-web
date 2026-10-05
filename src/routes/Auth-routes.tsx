import { Navigate, Route, Routes } from "react-router-dom";
import { AuthLayout } from "../components/auth/AuthLayout";
import { LoginPage } from "../pages/auth/Login";
import { RegisterPage } from "../pages/auth/Register";

export function AuthRoutes() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<Navigate to="/" replace />} />
        <Route path="/signup" element={<RegisterPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

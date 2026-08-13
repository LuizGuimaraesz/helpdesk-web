import { Navigate, Route, Routes } from "react-router-dom";
import { AuthLayout } from "../components/AuthLayout";
import { LoginPage } from "../pages/Login";
import { RegisterPage } from "../pages/Register";

export function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route index element={<Navigate to="/login" replace />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="cadastro" element={<RegisterPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

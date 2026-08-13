import { Navigate, Route, Routes } from "react-router-dom";
import { AuthLayout } from "../components/AuthLayout";
import { LoginPage } from "../pages/Login";
import { RegisterPage } from "../pages/Register";

export function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

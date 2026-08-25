import { Route } from "react-router-dom";
import { AuthLayout } from "../components/login/register/AuthLayout";
import { LoginPage } from "../pages/Login";
import { RegisterPage } from "../pages/Register";

export const authRoute = (
  <Route element={<AuthLayout />}>
    <Route index element={<LoginPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/signup" element={<RegisterPage />} />
  </Route>
);

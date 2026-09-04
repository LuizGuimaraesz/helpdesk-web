import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TechnicianForm,
  type TechnicianFormValues,
} from "../components/technicians/TechnicianForm";
import { createTechnician } from "../services/technicians";
import { getErrorMessage } from "../utils/getErrorMessage";

export function NewTechnicianPage() {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleCreateTechnician(values: TechnicianFormValues) {
    try {
      setIsSaving(true);
      setErrorMessage(null);
      await createTechnician({
        name: values.name,
        email: values.email,
        password: values.password ?? "",
        hours: values.hours,
      });

      navigate("/technicians");
    } catch (error) {
      setErrorMessage(
        getErrorMessage(error, "Não foi possível criar o técnico."),
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <TechnicianForm
      mode="create"
      isLoading={isSaving}
      errorMessage={errorMessage}
      onCancel={() => navigate("/technicians")}
      onSubmit={handleCreateTechnician}
    />
  );
}

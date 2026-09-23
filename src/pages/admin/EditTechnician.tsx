import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  TechnicianForm,
  type TechnicianFormValues,
} from "../../components/technicians/TechnicianForm";
import { useAuth } from "../../hooks/useAuth";
import { getUserById, updateUser } from "../../services/users";
import { updateTechnicianHours } from "../../services/technicians";
import type { User } from "../../types/user";
import { getErrorMessage } from "../../utils/getErrorMessage";

type Technician = Omit<User, "hours"> & {
  hours: string[];
};

export function EditTechnicianPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isLoading: isLoadingSession, session } = useAuth();
  const [technician, setTechnician] = useState<Technician | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function loadTechnician(technicianId: string) {
    try {
      setIsLoading(true);
      setErrorMessage(null);
      const data = await getUserById(technicianId);

      setTechnician({ ...data, hours: data.hours ?? [] });
    } catch (error) {
      setErrorMessage(getErrorMessage(error, "Falha ao carregar o técnico."));
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (isLoadingSession) {
      return;
    }

    if (!session || !id) {
      setIsLoading(false);
      return;
    }

    loadTechnician(id);
  }, [id, isLoadingSession, session]);

  async function handleUpdateTechnician(values: TechnicianFormValues) {
    if (!id) {
      return;
    }

    try {
      setIsSaving(true);
      setErrorMessage(null);

      await updateUser(id, values.name, values.email);
      await updateTechnicianHours(id, values.hours);

      navigate("/technicians");
    } catch (error) {
      setErrorMessage(
        getErrorMessage(error, "Não foi possível atualizar o técnico."),
      );
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoadingSession || isLoading) {
    return <p className="text-muted text-sm">Carregando técnico...</p>;
  }

  if (!technician) {
    return errorMessage ? (
      <p className="text-feedback-error text-sm font-medium">{errorMessage}</p>
    ) : null;
  }

  return (
    <TechnicianForm
      mode="edit"
      initialValues={technician}
      avatarUrl={technician.avatarUrl}
      isLoading={isSaving}
      errorMessage={errorMessage}
      onCancel={() => navigate("/technicians")}
      onSubmit={handleUpdateTechnician}
    />
  );
}

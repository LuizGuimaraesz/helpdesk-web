import { useEffect, useRef, useState } from "react";
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
  const userId = session?.user.id;
  const [technician, setTechnician] = useState<Technician | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const loadControllerRef = useRef<AbortController | null>(null);
  const isSavingRef = useRef(false);

  useEffect(() => {
    const controller = new AbortController();
    loadControllerRef.current = controller;
    isSavingRef.current = false;
    setIsSaving(false);
    setTechnician(null);
    setErrorMessage(null);

    if (isLoadingSession || !userId || !id) {
      setIsLoading(isLoadingSession);
      return () => controller.abort();
    }

    const technicianId = id;
    setIsLoading(true);

    async function loadTechnician() {
      try {
        const data = await getUserById(technicianId, controller.signal);
        if (!controller.signal.aborted) {
          setTechnician({ ...data, hours: data.hours ?? [] });
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          setErrorMessage(getErrorMessage(error, "Falha ao carregar o técnico."));
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadTechnician();
    return () => controller.abort();
  }, [id, isLoadingSession, userId]);

  async function handleUpdateTechnician(values: TechnicianFormValues) {
    const controller = loadControllerRef.current;
    if (
      !id ||
      technician?.id !== id ||
      !controller ||
      controller.signal.aborted ||
      isSavingRef.current
    ) {
      return;
    }

    isSavingRef.current = true;
    try {
      setIsSaving(true);
      setErrorMessage(null);

      await updateUser(id, values.name, values.email);
      await updateTechnicianHours(id, values.hours);

      if (!controller.signal.aborted) {
        navigate("/technicians");
      }
    } catch (error) {
      if (!controller.signal.aborted) {
        setErrorMessage(
          getErrorMessage(error, "Não foi possível atualizar o técnico."),
        );
      }
    } finally {
      if (!controller.signal.aborted) {
        isSavingRef.current = false;
        setIsSaving(false);
      }
    }
  }

  if (
    isLoadingSession ||
    isLoading ||
    (technician && technician.id !== id)
  ) {
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

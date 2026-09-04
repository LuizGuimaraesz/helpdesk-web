import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TechniciansList } from "../components/technicians/TechniciansList";
import { Button } from "../components/ui/Button";
import { ListHeader } from "../components/ui/ListHeader";
import { useAuth } from "../hooks/useAuth";
import { getUsers } from "../services/users";
import type { User } from "../types/user";
import { getErrorMessage } from "../utils/getErrorMessage";

export function TechniciansPage() {
  const navigate = useNavigate();
  const [technicians, setTechnicians] = useState<User[]>([]);
  const { isLoading, session } = useAuth();

  async function loadTechnicians() {
    try {
      const data = await getUsers("technician");

      setTechnicians(data.users);
    } catch (error) {
      alert(getErrorMessage(error, "Falha ao carregar os técnicos."));
    }
  }

  useEffect(() => {
    if (isLoading || !session) {
      return;
    }

    loadTechnicians();
  }, [isLoading, session]);

  return (
    <section
      aria-labelledby="technicians-title"
      className="flex min-w-0 flex-col gap-6"
    >
      <ListHeader title="Técnicos" titleId="technicians-title">
        <Button
          variant="plus"
          onClick={() => navigate("/technicians/new")}
        />
      </ListHeader>

      <TechniciansList
        technicians={technicians}
        onEditTechnician={(technician) =>
          navigate(`/technicians/${technician.id}`)
        }
      />
    </section>
  );
}

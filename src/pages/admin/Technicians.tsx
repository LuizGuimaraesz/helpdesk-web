import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { TechniciansList } from "../../components/technicians/TechniciansList";
import { Button } from "../../components/ui/Button";
import { DeleteModal } from "../../components/ui/DeleteModal";
import { ListHeader } from "../../components/ui/ListHeader";
import { useAuth } from "../../hooks/useAuth";
import { deleteUser, getUsers } from "../../services/users";
import type { User } from "../../types/user";
import { getErrorMessage } from "../../utils/getErrorMessage";

export function TechniciansPage() {
  const navigate = useNavigate();
  const [technicians, setTechnicians] = useState<User[]>([]);
  const [selectedTechnician, setSelectedTechnician] = useState<User | null>(
    null,
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeletingTechnician, setIsDeletingTechnician] = useState(false);
  const { isLoading, session } = useAuth();

  function handleOpenDeleteTechnicianModal(technician: User) {
    setSelectedTechnician(technician);
    setIsDeleteModalOpen(true);
  }

  function handleCloseDeleteTechnicianModal() {
    setSelectedTechnician(null);
    setIsDeleteModalOpen(false);
  }

  async function loadTechnicians() {
    try {
      const data = await getUsers("technician");

      setTechnicians(data.users);
    } catch (error) {
      alert(getErrorMessage(error, "Falha ao carregar os técnicos."));
    }
  }

  async function handleDeleteTechnician(id: string) {
    try {
      setIsDeletingTechnician(true);
      await deleteUser(id);

      handleCloseDeleteTechnicianModal();
      await loadTechnicians();
    } finally {
      setIsDeletingTechnician(false);
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
          icon={Plus}
          className="w-auto"
          onClick={() => navigate("/technicians/new")}
        >
          Novo
        </Button>
      </ListHeader>

      <TechniciansList
        technicians={technicians}
        onDeleteTechnician={handleOpenDeleteTechnicianModal}
        onEditTechnician={(technician) =>
          navigate(`/technicians/${technician.id}`)
        }
      />

      <DeleteModal
        item={selectedTechnician}
        title="Excluir técnico"
        warningMessage="Os chamados deste técnico serão mantidos e ficarão sem responsável até uma nova atribuição. Esta ação não poderá ser desfeita."
        deleteErrorMessage="Não foi possível excluir o técnico."
        isOpen={isDeleteModalOpen}
        isDeleting={isDeletingTechnician}
        onClose={handleCloseDeleteTechnicianModal}
        onDelete={handleDeleteTechnician}
      />
    </section>
  );
}

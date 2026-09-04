import { api } from "./api";

type CreateTechnicianParams = {
  name: string;
  email: string;
  password: string;
  hours: string[];
};

export async function createTechnician(data: CreateTechnicianParams) {
  await api.post("/technicians", data);
}

export async function updateTechnicianAvailabilities(
  id: string,
  hours: string[],
) {
  await api.put(`/technicians/${id}/availabilities`, { hours });
}

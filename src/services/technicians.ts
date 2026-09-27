import { api } from "./api";
import type { TechnicianResponse } from "../types/user";

type CreateTechnicianParams = {
  name: string;
  email: string;
  password: string;
  hours: string[];
};

export async function createTechnician(data: CreateTechnicianParams) {
  const response = await api.post<TechnicianResponse>("/technicians", data);

  return response.data.technician;
}

export async function updateTechnicianHours(
  id: string,
  hours: string[],
) {
  const response = await api.put<TechnicianResponse>(
    `/technicians/${id}/hours`,
    { hours },
  );

  return response.data.technician;
}

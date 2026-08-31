import { api } from "./api";
import type { ServicesResponse } from "../types/service";

export async function getServices() {
  const response = await api.get<ServicesResponse>("/services");

  return response.data;
}

export async function updateServiceStatus(id: string, active: boolean) {
  await api.patch(`/services/${id}/status`, { active });
}

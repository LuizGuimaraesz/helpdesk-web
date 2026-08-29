import { api } from "./api";

export async function updateServiceStatus(id: string, active: boolean) {
  await api.patch(`/services/${id}/status`, { active });
}

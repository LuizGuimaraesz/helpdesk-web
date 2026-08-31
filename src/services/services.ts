import { api } from "./api";
import type { ServicesResponse } from "../types/service";

export async function createService(title: string, amount: number) {
  const response = await api.post("/services", { title, amount });

  return response.data;
}

export async function getServices() {
  const response = await api.get<ServicesResponse>("/services");

  return response.data;
}

export async function updateServiceStatus(id: string, active: boolean) {
  await api.patch(`/services/${id}/status`, { active });
}

export async function updateService(id: string, title: string, amount: number) {
  await api.patch(`/services/${id}`, { title, amount });
}

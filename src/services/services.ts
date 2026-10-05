import { api } from "./api";
import type { ServiceResponse, ServicesResponse } from "../types/service";

export async function createService(title: string, amount: number) {
  const response = await api.post<ServiceResponse>("/services", {
    title,
    amount,
  });

  return response.data.service;
}

export async function getServices(signal?: AbortSignal) {
  const response = await api.get<ServicesResponse>("/services", { signal });

  return response.data;
}

export async function updateServiceStatus(id: string, active: boolean) {
  const response = await api.patch<ServiceResponse>(`/services/${id}/status`, {
    active,
  });

  return response.data.service;
}

export async function updateService(id: string, title: string, amount: number) {
  const response = await api.patch<ServiceResponse>(`/services/${id}`, {
    title,
    amount,
  });

  return response.data.service;
}

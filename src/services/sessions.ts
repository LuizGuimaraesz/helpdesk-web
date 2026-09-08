import { api } from "./api";
import type { UserAPIResponse } from "../types/user";

type CreateSession = {
  email: string;
  password: string;
};

export async function createSession(data: CreateSession) {
  const response = await api.post<UserAPIResponse>("/sessions", data);

  return response.data;
}

import { api } from "./api";

type CreateSession = {
  email: string;
  password: string;
};

export async function createSession(data: CreateSession) {
  const response = await api.post<UserAPIResponse>("/sessions", data);

  return response.data;
}

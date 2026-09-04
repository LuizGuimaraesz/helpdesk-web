import { api } from "./api";
import type { User, UsersResponse } from "../types/user";

type CreateUserParams = {
  name: string;
  email: string;
  password: string;
};

export async function createUser(data: CreateUserParams) {
  await api.post("/users", data);
}

export async function getUsers(role: "client" | "technician") {
  const response = await api.get<UsersResponse>("/users", {
    params: { role },
  });

  return response.data;
}

export async function getUserById(id: string) {
  const response = await api.get<{ user: User }>(`/users/${id}`);

  return response.data.user;
}

export async function updateUser(id: string, name: string, email: string) {
  await api.patch(`/users/${id}`, { name, email });
}

export async function deleteUser(id: string) {
  await api.delete(`/users/${id}`);
}

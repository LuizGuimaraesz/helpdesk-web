import { api } from "./api";
import type { UserResponse, UsersResponse } from "../types/user";

type CreateUserParams = {
  name: string;
  email: string;
  password: string;
};

export async function createUser(data: CreateUserParams) {
  const response = await api.post<UserResponse>("/users", data);

  return response.data.user;
}

export async function getUsers(role: "client" | "technician") {
  const response = await api.get<UsersResponse>("/users", {
    params: { role },
  });

  return response.data;
}

export async function getUserById(id: string) {
  const response = await api.get<UserResponse>(`/users/${id}`);

  return response.data.user;
}

export async function updateUser(id: string, name: string, email: string) {
  const response = await api.patch<UserResponse>(`/users/${id}`, {
    name,
    email,
  });

  return response.data.user;
}

export async function deleteUser(id: string) {
  await api.delete(`/users/${id}`);
}

export async function changePassword(
  currentPassword: string,
  newPassword: string,
) {
  await api.patch("/users/password", { currentPassword, newPassword });
}

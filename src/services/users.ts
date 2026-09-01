import { api } from "./api";
import type { UsersResponse } from "../types/user";

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

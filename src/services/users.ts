import { api } from "./api";

type CreateUserParams = {
  name: string;
  email: string;
  password: string;
};

export async function createUser(data: CreateUserParams) {
  await api.post("/users", data);
}

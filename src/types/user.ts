export type UserRole = "client" | "technician" | "admin";

export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
};

export type UsersResponse = {
  users: User[];
};

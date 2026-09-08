export type UserRole = "client" | "technician" | "admin";

export type UserAPIResponse = {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
  };
};

export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
  hours?: string[];
};

export type UsersResponse = {
  users: User[];
};

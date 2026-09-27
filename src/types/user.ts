export type UserRole = "client" | "technician" | "admin";

export type UserAPIResponse = {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    avatarUrl?: string | null;
    hours?: string[];
  };
};

export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string | null;
  hours?: string[];
};

export type UsersResponse = {
  users: User[];
};

export type UserResponse = {
  user: User;
};

export type TechnicianResponse = {
  technician: User;
};

export type UserProfileProps = {
  name: string;
  email: string;
  avatarUrl?: string | null;
};

export type SidebarProps = UserProfileProps & {
  role: UserRole;
};

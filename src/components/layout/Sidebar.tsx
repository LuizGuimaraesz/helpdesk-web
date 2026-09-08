import logoSymbolBase from "../../assets/logo-symbol-base.svg";
import logoSymbolDetail from "../../assets/logo-symbol-detail.svg";
import {
  BriefcaseBusiness,
  ClipboardList,
  Plus,
  Users,
  Wrench,
} from "lucide-react";
import type { UserRole } from "../../types/user";
import { NavItem } from "./NavItem";
import { UserProfile } from "./UserProfile";

type SidebarProps = {
  role: UserRole;
  user: {
    email: string;
    name: string;
  };
};

const adminNavigation = [
  { icon: ClipboardList, label: "Chamados", to: "/tickets" },
  { icon: Users, label: "Técnicos", to: "/technicians" },
  { icon: BriefcaseBusiness, label: "Clientes", to: "/clients" },
  { icon: Wrench, label: "Serviços", to: "/services" },
];

const techNavigation = [
  { icon: ClipboardList, label: "Meus chamados", to: "/tickets" },
];

const clientNavigation = [
  { icon: ClipboardList, label: "Meus chamados", to: "/tickets" },
  { icon: Plus, label: "Criar chamado", to: "/tickets/new" },
];

export function Sidebar({ role, user }: SidebarProps) {
  const navigation =
    role === "admin"
      ? adminNavigation
      : role === "technician"
        ? techNavigation
        : clientNavigation;

  return (
    <aside className="bg-page flex h-full w-[200px] shrink-0 flex-col">
      <header className="border-foreground flex w-full items-center gap-3 border-b px-5 py-6">
        <span aria-hidden="true" className="relative size-11 shrink-0">
          <img
            src={logoSymbolBase}
            alt=""
            className="absolute inset-0 size-full"
          />
          <img
            src={logoSymbolDetail}
            alt=""
            className="absolute top-1/2 left-1/2 size-[32.5px] -translate-x-1/3 -translate-y-1/2"
          />
        </span>

        <div className="flex min-w-0 flex-col justify-center font-bold leading-[1.4]">
          <span className="text-surface text-xl">HelpDesk</span>
          <span className="text-brand-light text-[10px] tracking-[0.6px] uppercase">
            {role}
          </span>
        </div>
      </header>

      <nav aria-label="Navegação principal" className="flex-1 px-4 py-5">
        <div className="flex flex-col gap-1">
          {navigation.map((item) => (
            <NavItem key={item.to} {...item} />
          ))}
        </div>
      </nav>

      <UserProfile name={user.name} email={user.email} />
    </aside>
  );
}

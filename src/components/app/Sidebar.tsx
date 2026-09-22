import {
  BriefcaseBusiness,
  ClipboardList,
  Plus,
  Users,
  Wrench,
} from "lucide-react";
import { UserProfile } from "./UserProfile";
import type { SidebarProps } from "../../types/user";
import { classMerge } from "../../utils/classMerge";
import { AppBrand } from "./AppBrand";
import { NavItem } from "./NavItem";

type SidebarComponentProps = SidebarProps & {
  mobile?: boolean;
  onNavigate?: () => void;
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

export function Sidebar({
  role,
  name,
  email,
  avatarUrl,
  mobile = false,
  onNavigate,
}: SidebarComponentProps) {
  const navigation =
    role === "admin"
      ? adminNavigation
      : role === "technician"
        ? techNavigation
        : clientNavigation;

  return (
    <aside
      className={classMerge(
        "bg-page h-full shrink-0 flex-col",
        mobile ? "flex w-[min(80vw,280px)] md:hidden" : "hidden w-[200px] md:flex",
      )}
    >
      <header className="border-foreground flex w-full items-center gap-3 border-b px-5 py-6">
        <AppBrand role={role} />
      </header>

      <nav aria-label="Navegação principal" className="flex-1 px-4 py-5">
        <div className="flex flex-col gap-1">
          {navigation.map((item) => (
            <NavItem key={item.to} {...item} onClick={onNavigate} />
          ))}
        </div>
      </nav>

      {!mobile && <UserProfile email={email} name={name} avatarUrl={avatarUrl} />}
    </aside>
  );
}

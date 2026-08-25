import { getInitials } from "../../utils/getInitials";

type UserProfileProps = {
  email?: string;
  name?: string;
};

export function UserProfile({ email, name }: UserProfileProps) {
  const displayName = name?.trim() || "Usuário";
  const displayEmail = email ?? "";

  return (
    <div className="border-foreground flex w-full items-center gap-3 border-t px-4 py-5">
      <span className="bg-brand text-surface flex size-8 shrink-0 items-center justify-center rounded-full text-sm leading-[1.2] tracking-[1.4px]">
        {getInitials(displayName)}
      </span>

      <div className="min-w-0 flex-1 leading-[1.4]">
        <p className="text-surface truncate text-sm">{displayName}</p>
        <p className="text-placeholder truncate text-xs">{displayEmail}</p>
      </div>
    </div>
  );
}

import { getInitials } from "../../utils/getInitials";

type UserInfoProps = {
  name: string;
};

export function UserInfo({ name }: UserInfoProps) {
  return (
    <div className="flex min-w-0 items-center gap-2">
      <span className="bg-brand text-surface flex size-5 shrink-0 items-center justify-center rounded-full text-[8.75px] leading-[1.4] tracking-[0.875px]">
        {getInitials(name)}
      </span>
      <span className="text-foreground min-w-0 flex-1 truncate text-sm leading-[1.4]">
        {name}
      </span>
    </div>
  );
}

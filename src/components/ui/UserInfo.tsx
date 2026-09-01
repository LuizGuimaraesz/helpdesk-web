import { getInitials } from "../../utils/getInitials";

type UserInfoProps = {
  name: string;
  showName?: boolean;
  avatarSize?: "small" | "large";
};

const avatarSizes = {
  small: "size-5 text-[8.75px] tracking-[0.875px]",
  large: "size-12 text-lg tracking-[1.5px]",
};

export function UserInfo({
  name,
  showName = true,
  avatarSize = "small",
}: UserInfoProps) {
  return (
    <div className="flex min-w-0 items-center gap-2">
      <span
        className={`bg-brand text-surface flex shrink-0 items-center justify-center rounded-full leading-[1.4] ${avatarSizes[avatarSize]}`}
      >
        {getInitials(name)}
      </span>
      {showName && (
        <span className="text-foreground min-w-0 flex-1 truncate text-sm leading-[1.4]">
          {name}
        </span>
      )}
    </div>
  );
}

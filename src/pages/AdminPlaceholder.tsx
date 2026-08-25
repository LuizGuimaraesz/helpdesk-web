type AdminPlaceholderProps = {
  title: string;
};

export function AdminPlaceholder({ title }: AdminPlaceholderProps) {
  return (
    <h1 className="text-brand text-2xl leading-[1.4] font-bold">{title}</h1>
  );
}

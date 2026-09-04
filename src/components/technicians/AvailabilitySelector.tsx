import { X } from "lucide-react";
import { classMerge } from "../../utils/classMerge";

type AvailabilitySelectorProps = {
  value: string[];
  onChange: (hours: string[]) => void;
};

const periods = [
  {
    label: "MANHÃ",
    hours: ["07:00", "08:00", "09:00", "10:00", "11:00", "12:00"],
  },
  {
    label: "TARDE",
    hours: ["13:00", "14:00", "15:00", "16:00", "17:00", "18:00"],
  },
  {
    label: "NOITE",
    hours: ["19:00", "20:00", "21:00", "22:00", "23:00"],
  },
];

export function AvailabilitySelector({
  value,
  onChange,
}: AvailabilitySelectorProps) {
  function handleToggleHour(hour: string) {
    if (value.includes(hour)) {
      onChange(value.filter((selectedHour) => selectedHour !== hour));
      return;
    }

    onChange(
      [...value, hour].sort((first, second) => first.localeCompare(second)),
    );
  }

  return (
    <section className="border-border min-w-0 rounded-[10px] border p-5">
      <h2 className="text-foreground text-base leading-[1.4] font-bold">
        Horários de atendimento
      </h2>
      <p className="text-muted mt-1 text-xs leading-[1.4]">
        Selecione os horários de disponibilidade do técnico para atendimento
      </p>

      <div className="mt-6 flex flex-col gap-5">
        {periods.map((period) => (
          <fieldset key={period.label} className="min-w-0">
            <legend className="text-muted text-[10px] leading-[1.4] font-bold tracking-[0.6px]">
              {period.label}
            </legend>

            <div className="mt-2 flex flex-wrap gap-2">
              {period.hours.map((hour) => {
                const isSelected = value.includes(hour);

                return (
                  <button
                    key={hour}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => handleToggleHour(hour)}
                    className={classMerge(
                      "focus-visible:outline-brand inline-flex h-7 min-w-11 cursor-pointer items-center justify-center rounded-full border px-2.5 text-xs leading-none transition-colors focus-visible:outline-2 focus-visible:outline-offset-2",
                      isSelected
                        ? "border-brand-base bg-brand-base text-surface gap-1"
                        : "border-placeholder text-foreground hover:border-brand hover:text-brand bg-transparent",
                    )}
                  >
                    {hour}
                    {isSelected && (
                      <X aria-hidden="true" className="size-3" />
                    )}
                  </button>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>
    </section>
  );
}

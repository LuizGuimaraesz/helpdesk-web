import { useLayoutEffect, useRef, useState } from "react";

type AvailabilityProps = {
  hours: string[];
};

const GAP = 8;

const hourClassName =
  "border-border text-placeholder inline-flex h-7 min-w-12 shrink-0 items-center justify-center rounded-full border px-2 text-xs leading-none whitespace-nowrap";

const moreClassName =
  "border-border text-placeholder inline-flex h-7 min-w-9 shrink-0 items-center justify-center rounded-full border px-2 text-xs leading-none whitespace-nowrap";

export function Availability({ hours }: AvailabilityProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hourRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const moreRef = useRef<HTMLSpanElement>(null);
  const [visibleCount, setVisibleCount] = useState(hours.length);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const more = moreRef.current;

    if (!container || !more) {
      return;
    }

    function updateVisibleHours() {
      const currentContainer = containerRef.current;
      const currentMore = moreRef.current;

      if (!currentContainer || !currentMore) {
        return;
      }

      const availableWidth = currentContainer.clientWidth;

      const hourWidths = hourRefs.current
        .slice(0, hours.length)
        .map((element) => element?.offsetWidth ?? 0);

      const allHoursWidth =
        hourWidths.reduce((total, width) => total + width, 0) +
        Math.max(0, hours.length - 1) * GAP;

      if (allHoursWidth <= availableWidth) {
        setVisibleCount(hours.length);
        return;
      }

      let bestFit = 0;

      for (let count = 0; count < hours.length; count += 1) {
        const hiddenCount = hours.length - count;
        currentMore.textContent = `+${hiddenCount}`;

        const visibleHoursWidth = hourWidths
          .slice(0, count)
          .reduce((total, width) => total + width, 0);
        const requiredWidth =
          visibleHoursWidth + count * GAP + currentMore.offsetWidth;

        if (requiredWidth <= availableWidth) {
          bestFit = count;
        }
      }

      setVisibleCount(bestFit);
    }

    updateVisibleHours();

    const resizeObserver = new ResizeObserver(updateVisibleHours);
    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, [hours]);

  if (hours.length === 0) {
    return (
      <span className="text-placeholder text-xs whitespace-nowrap">
        {"Sem horários"}
      </span>
    );
  }

  const hiddenCount = hours.length - visibleCount;

  return (
    <div ref={containerRef} className="relative w-full min-w-0 overflow-hidden">
      <div className="flex items-center gap-2">
        {hours.slice(0, visibleCount).map((hour, index) => (
          <span key={`${hour}-${index}`} className={hourClassName}>
            {hour}
          </span>
        ))}

        {hiddenCount > 0 && (
          <span className={moreClassName}>+{hiddenCount}</span>
        )}
      </div>

      <div
        aria-hidden="true"
        className="invisible absolute top-0 left-0 flex items-center gap-2"
      >
        {hours.map((hour, index) => (
          <span
            key={`${hour}-measure-${index}`}
            ref={(element) => {
              hourRefs.current[index] = element;
            }}
            className={hourClassName}
          >
            {hour}
          </span>
        ))}
        <span ref={moreRef} className={moreClassName} />
      </div>
    </div>
  );
}

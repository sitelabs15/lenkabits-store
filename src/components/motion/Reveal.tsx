import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Delay before the reveal starts, in milliseconds. */
  delay?: number;
  /** Initial vertical offset, in pixels. */
  y?: number;
  /** Initial horizontal offset, in pixels. */
  x?: number;
  /** Initial scale, e.g. 1.03 for a subtle image reveal. */
  scale?: number;
  /** Keep observing and re-hide when the element leaves the viewport. */
  once?: boolean;
  style?: CSSProperties;
};

/**
 * Reveals its children once they enter the viewport.
 *
 * Progressive enhancement: the server renders the content visible and it is
 * only hidden after hydration, so a failed script never leaves a blank page.
 * Users who prefer reduced motion see the final state immediately.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 18,
  x = 0,
  scale = 1,
  once = true,
  style,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    setArmed(true);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            if (once) observer.disconnect();
          } else if (!once) {
            setShown(false);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  const hidden = armed && !shown;

  return (
    <div
      ref={ref}
      className={cn(
        armed && "transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
        hidden && "opacity-0 will-change-[opacity,transform]",
        className,
      )}
      style={{
        transform: hidden ? `translate3d(${x}px, ${y}px, 0) scale(${scale})` : undefined,
        transitionDelay: delay ? `${delay}ms` : undefined,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

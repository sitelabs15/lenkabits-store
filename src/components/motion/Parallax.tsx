import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type ScrollParallaxProps = {
  children: ReactNode;
  className?: string;
  /** Fraction of the scroll distance applied as vertical offset. Keep it small. */
  speed?: number;
};

/**
 * Very light scroll parallax. Disabled on small screens and when the user
 * prefers reduced motion. Only `transform` is touched, inside a rAF frame.
 */
export function ScrollParallax({ children, className, speed = 0.05 }: ScrollParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.innerWidth < 768) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * -speed;
      el.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      el.style.transform = "";
    };
  }, [speed]);

  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}

import { Link } from "@tanstack/react-router";
import logo from "@/assets/lenkabits-logo.png";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link to="/" aria-label="Lenkabits Store — inicio" className={cn("inline-flex shrink-0", className)}>
      <img src={logo} alt="Lenkabits" width={1850} height={543} className="h-9 w-auto md:h-10" />
    </Link>
  );
}

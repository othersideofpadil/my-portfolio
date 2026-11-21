import { cn } from "../../lib/utils";
import type { IconType } from "react-icons";

type TechChipProps = { name: string; icon?: IconType; className?: string };

export const TechChip = ({ name, icon: Icon, className }: TechChipProps) => (
  <span
    className={cn(
      "inline-flex items-center gap-1.5 rounded-full border border-line bg-accent-soft px-3 py-1 text-xs font-medium text-ink-soft transition-colors hover:border-accent hover:text-ink",
      className,
    )}
  >
    {Icon && <Icon className="size-3.5 shrink-0" aria-hidden />}
    {name}
  </span>
);

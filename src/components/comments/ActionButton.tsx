import { cn } from "../../lib/utils";
import type { ComponentProps } from "react";
import type { LucideIcon } from "lucide-react";

const TONES = {
  default: "text-ink-soft hover:bg-accent-soft hover:text-ink",
  accent: "text-accent hover:bg-accent-soft",
  danger: "text-red-600 hover:bg-red-50",
} as const;

type ActionButtonProps = ComponentProps<"button"> & {
  icon?: LucideIcon;
  tone?: keyof typeof TONES;
};

const ActionButton = ({
  icon: Icon,
  tone = "default",
  className,
  children,
  ...props
}: ActionButtonProps) => (
  <button
    type="button"
    {...props}
    className={cn(
      "inline-flex min-h-11 cursor-pointer items-center gap-1.5 rounded-md px-2 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-50 sm:min-h-8",
      TONES[tone],
      className,
    )}
  >
    {Icon && <Icon className="size-3.5" aria-hidden />}
    {children}
  </button>
);

export default ActionButton;

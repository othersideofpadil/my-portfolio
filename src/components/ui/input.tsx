import { cn } from "../../lib/utils";
import type { ComponentProps } from "react";

// 16px on mobile keeps iOS from zooming into the field.
const fieldClass =
  "w-full rounded-xl border border-line bg-paper px-4 py-3 text-base text-ink transition-colors placeholder:text-ink-mute focus:border-accent focus:bg-card focus:ring-4 focus:ring-accent/15 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm";

export const Input = ({ className, ...props }: ComponentProps<"input">) => (
  <input className={cn(fieldClass, className)} {...props} />
);

export const Textarea = ({ className, ...props }: ComponentProps<"textarea">) => (
  <textarea className={cn(fieldClass, "resize-none", className)} {...props} />
);

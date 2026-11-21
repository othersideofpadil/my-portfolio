import { cva } from "class-variance-authority";
import { LoaderCircle } from "lucide-react";
import { cn } from "../../lib/utils";
import type { VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

/** Use on `<a>` too: `<a className={buttonVariants({ variant: "outline" })}>`. */
export const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed motion-safe:active:scale-[0.98] [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-card shadow-sm hover:bg-accent-strong hover:shadow-md disabled:bg-line disabled:text-ink-mute disabled:shadow-none",
        outline:
          "border border-line bg-card text-ink-soft hover:border-accent hover:bg-accent-soft hover:text-ink disabled:opacity-50",
        ghost: "text-ink-soft hover:bg-accent-soft hover:text-ink disabled:opacity-50",
        accent: "text-accent hover:bg-accent-soft disabled:opacity-50",
        danger: "text-destructive hover:bg-destructive/10 disabled:opacity-50",
      },
      size: {
        sm: "min-h-11 px-3 text-xs sm:min-h-8 [&_svg]:size-3.5",
        md: "min-h-11 px-5 text-sm sm:min-h-10 [&_svg]:size-4",
        lg: "min-h-12 px-7 text-sm font-semibold [&_svg]:size-4",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { loading?: boolean };

export const Button = ({
  variant,
  size,
  loading = false,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) => (
  <button
    type="button"
    {...props}
    disabled={disabled || loading}
    aria-busy={loading || undefined}
    className={cn(buttonVariants({ variant, size }), className)}
  >
    {loading && <LoaderCircle className="animate-spin" aria-hidden />}
    {children}
  </button>
);

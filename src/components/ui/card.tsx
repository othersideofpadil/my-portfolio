import { cva } from "class-variance-authority";

/** Surface used by every card. `interactive` adds the lift-on-hover treatment. */
export const cardVariants = cva("rounded-3xl border border-line bg-card shadow-sm", {
  variants: {
    interactive: {
      true: "transition-[translate,box-shadow,border-color] duration-300 focus-within:border-accent hover:-translate-y-1.5 hover:border-accent hover:shadow-2xl hover:shadow-accent/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
      false: "",
    },
  },
  defaultVariants: { interactive: false },
});

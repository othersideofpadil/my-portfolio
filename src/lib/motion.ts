import type { MotionProps } from "framer-motion";

/** Entrance animation that plays on mount (hero content). */
export const fade = (delay: number): MotionProps => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: "easeOut" },
});

/** Entrance animation that plays once when the element scrolls into view. */
export const reveal = (delay = 0, y = 30): MotionProps => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, delay },
});

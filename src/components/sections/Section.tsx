import { motion } from "framer-motion";
import { reveal } from "../../lib/motion";
import { cn } from "../../lib/utils";
import type { ReactNode } from "react";

const WIDTHS = { "3xl": "max-w-3xl", "4xl": "max-w-4xl", "6xl": "max-w-6xl" } as const;

type SectionProps = {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  width?: keyof typeof WIDTHS;
  children: ReactNode;
};

/** Shared shell for every content section: spacing, max width and heading. */
const Section = ({ id, index, eyebrow, title, width = "6xl", children }: SectionProps) => (
  <section id={id} className="px-4 py-20 sm:py-24">
    <div className={cn("mx-auto", WIDTHS[width])}>
      <motion.div {...reveal(0, 20)} className="mb-12 text-center sm:mb-16">
        <p className="mb-3 text-xs font-semibold tracking-[0.22em] text-ink-soft uppercase sm:text-sm">
          {index} — {eyebrow}
        </p>
        <h2 className="text-4xl text-ink sm:text-5xl">{title}</h2>
      </motion.div>
      {children}
    </div>
  </section>
);

export default Section;

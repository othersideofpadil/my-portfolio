import { motion } from "framer-motion";

type SectionHeadingProps = { index: string; eyebrow: string; title: string };

const SectionHeading = ({ index, eyebrow, title }: SectionHeadingProps) => (
  <motion.div
    className="mb-12 text-center sm:mb-16"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ duration: 0.6 }}
  >
    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#59636E] sm:text-sm">
      {index} — {eyebrow}
    </p>
    <h2 className="font-display text-4xl text-ink sm:text-5xl">{title}</h2>
  </motion.div>
);

export default SectionHeading;

import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

const Footer = () => (
  <motion.footer
    className="border-t border-line py-8"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >
    <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-sm text-ink-mute sm:flex-row">
      <p>© {new Date().getFullYear()} Muhammad Fadhillah. All rights reserved.</p>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-[#D0D7DE] bg-[#FAFBFD] px-3 py-1.5 text-xs font-medium text-[#59636E] transition-colors hover:border-[#0969DA] hover:text-[#0969DA]"
      >
        <ArrowUp className="h-3.5 w-3.5" />
        Back to top
      </button>
    </div>
  </motion.footer>
);

export default Footer;

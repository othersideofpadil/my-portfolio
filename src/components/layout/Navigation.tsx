import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navItems } from "../../data/navigation";
import { scrollToSection } from "../../lib/scroll";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import type { MouseEvent } from "react";

const glass = "border border-line bg-card/80 backdrop-blur-xl";
const linkBase =
  "font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

type NavigationProps = { activeSection: string };

const Navigation = ({ activeSection }: NavigationProps) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onScroll = () => setScrolled(window.scrollY > 20);
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const goTo = (id: string) => (e: MouseEvent) => {
    e.preventDefault();
    scrollToSection(id);
    setOpen(false);
  };

  return (
    <nav aria-label="Main" className="fixed inset-x-0 top-3 z-50 flex flex-col items-center px-4">
      {/* Desktop */}
      <div
        className={cn(
          glass,
          "hidden items-center gap-1 rounded-full p-1.5 transition-shadow md:flex",
          scrolled ? "shadow-lg shadow-black/5" : "shadow-sm",
        )}
      >
        {navItems.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={goTo(id)}
            aria-current={activeSection === id ? "page" : undefined}
            className={cn(
              linkBase,
              "relative rounded-full px-4 py-2 text-sm",
              activeSection === id ? "text-ink" : "text-ink-soft hover:bg-accent-soft hover:text-ink",
            )}
          >
            {activeSection === id && (
              <motion.span
                layoutId="nav-pill"
                className="absolute inset-0 rounded-full bg-accent-soft"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative">{label}</span>
          </a>
        ))}
      </div>

      {/* Mobile */}
      <div className={cn(glass, "flex w-full items-center justify-between rounded-full py-1.5 pr-1.5 pl-5 shadow-sm md:hidden")}>
        <img src="/logo.jpeg" alt="Logo" className="size-10 rounded-full object-cover" />
        <Button
          variant="ghost"
          className="size-11 px-0"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="size-5!" /> : <Menu className="size-5!" />}
        </Button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mt-2 w-full rounded-3xl border border-line bg-card/95 p-2 shadow-xl shadow-black/5 backdrop-blur-xl md:hidden"
          >
            {navItems.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={goTo(id)}
                aria-current={activeSection === id ? "page" : undefined}
                className={cn(
                  linkBase,
                  "block rounded-2xl px-4 py-3 text-sm",
                  activeSection === id ? "bg-accent-soft text-ink" : "text-ink-soft hover:bg-accent-soft hover:text-ink",
                )}
              >
                {label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;

import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { MouseEvent } from "react";

type NavigationProps = { activeSection: string };

const navItems = [
  { id: "about", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "comments", label: "Comments" },
  { id: "contact", label: "Contact" },
];

const Navigation = ({ activeSection }: NavigationProps) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onScroll = () => setScrolled(window.scrollY > 20);
    document.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetId = (e.currentTarget.getAttribute("href") ?? "").slice(1);
    const el = document.getElementById(targetId);
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
    setOpen(false);
  };

  return (
    <nav className="fixed inset-x-0 top-3 z-50 flex flex-col items-center px-4">
      {/* Desktop */}
      <div
        className={`hidden items-center gap-1 rounded-full border border-gray-200 bg-white/80 p-1.5 backdrop-blur-xl transition-shadow md:flex ${
          scrolled ? "shadow-lg shadow-black/5" : "shadow-sm"
        }`}
      >
        {navItems.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={handleNavClick}
            className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              activeSection === id
                ? "text-black"
                : "text-gray-600 hover:bg-gray-100 hover:text-black"
            }`}
          >
            {activeSection === id && (
              <motion.span
                layoutId="nav-pill"
                className="absolute inset-0 rounded-full bg-gray-200"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative">{label}</span>
          </a>
        ))}
      </div>

      {/* Mobile */}
      <div className="flex w-full items-center justify-between rounded-full border border-line bg-white/80 py-1.5 pl-5 pr-1.5 shadow-sm backdrop-blur-xl md:hidden">
        <img
          src="/logo.jpeg"
          alt="Logo"
          className="h-10 w-10 rounded-full object-cover"
        />
        <button
          onClick={() => setOpen(!open)}
          className="rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-black"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mt-2 w-full rounded-3xl border border-gray-200 bg-white/95 p-2 shadow-xl shadow-black/5 backdrop-blur-xl md:hidden"
          >
            {navItems.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={handleNavClick}
                className={`block rounded-2xl px-4 py-3 text-sm font-medium transition-colors ${
                  activeSection === id
                    ? "bg-gray-200 text-black"
                    : "text-gray-600 hover:bg-gray-100 hover:text-black"
                }`}
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

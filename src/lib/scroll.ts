import { NAV_OFFSET } from "../data/navigation";

export const scrollToSection = (id: string) => {
  const section = document.getElementById(id);
  if (!section) return;
  const top = section.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
  window.scrollTo({ top, behavior: "smooth" });
};

export const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

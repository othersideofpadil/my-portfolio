import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { skills, stackTabs } from "../../data/skills";
import { cn } from "../../lib/utils";
import { TechChip } from "../ui/tech-chip";
import type { KeyboardEvent } from "react";
import type { Focus } from "../../data/skills";

const tabId = (id: Focus) => `focus-tab-${id}`;

/** Tabs that filter the tech stack into frontend / backend. */
const StackFilter = () => {
  const [focus, setFocus] = useState<Focus>("all");
  const visibleSkills = skills.filter(({ tags }) => focus === "all" || tags.includes(focus));

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const current = stackTabs.findIndex(({ id }) => id === focus);
    const step = e.key === "ArrowRight" ? 1 : stackTabs.length - 1;
    const next = stackTabs[(current + step) % stackTabs.length];
    setFocus(next.id);
    document.getElementById(tabId(next.id))?.focus();
  };

  return (
    <div className="space-y-4">
      <div
        role="tablist"
        aria-label="Filter tech stack"
        className="inline-flex rounded-full border border-line bg-card p-1 shadow-sm"
        onKeyDown={handleKeyDown}
      >
        {stackTabs.map(({ id, label }) => {
          const selected = focus === id;
          return (
            <button
              key={id}
              id={tabId(id)}
              role="tab"
              aria-selected={selected}
              aria-controls="stack-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => setFocus(id)}
              className={cn(
                "relative cursor-pointer rounded-full px-4 py-1.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                selected ? "text-ink" : "text-ink-soft hover:bg-accent-soft hover:text-ink",
              )}
            >
              {selected && (
                <motion.span
                  layoutId="focus-pill"
                  className="absolute inset-0 rounded-full bg-accent-soft"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative">{label}</span>
            </button>
          );
        })}
      </div>

      <div id="stack-panel" role="tabpanel" aria-labelledby={tabId(focus)}>
        <ul className="flex min-h-32 flex-wrap content-start gap-2">
          <AnimatePresence mode="popLayout" initial={false}>
            {visibleSkills.map(({ name, icon }) => (
              <motion.li
                key={name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25 }}
              >
                <TechChip name={name} icon={icon} className="py-1.5 sm:text-sm" />
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  );
};

export default StackFilter;

import { Download, Github } from "lucide-react";
import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useTransform,
} from "framer-motion";
import { fade, skills, tabs } from "../lib/utils";
import type { Focus } from "../lib/utils";

const AboutSection = () => {
  const [focus, setFocus] = useState<Focus>("all");

  // Spotlight mengikuti kursor
  const mx = useMotionValue(-500);
  const my = useMotionValue(-500);
  const spotlight = useMotionTemplate`radial-gradient(480px circle at ${mx}px ${my}px, rgba(79,70,229,0.08), transparent 70%)`;

  // Tilt 3D pada foto
  const tx = useMotionValue(0);
  const ty = useMotionValue(0);
  const rotateY = useSpring(useTransform(tx, [-0.5, 0.5], [-8, 8]), {
    stiffness: 160,
    damping: 18,
  });
  const rotateX = useSpring(useTransform(ty, [-0.5, 0.5], [8, -8]), {
    stiffness: 160,
    damping: 18,
  });

  const reduceMotion = useReducedMotion();

  return (
    <section
      id="about"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-28 sm:px-6 lg:px-8"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(e.clientX - r.left);
        my.set(e.clientY - r.top);
      }}
    >
      <div className="bg-dots pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ background: spotlight }}
      />

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="order-2 space-y-7 lg:order-1">
          <motion.div
            {...fade(0.05)}
            className="inline-flex items-center gap-2 rounded-full border border-[#D0D7DE] bg-[#FAFBFD] px-4 py-1.5 text-sm font-medium text-[#59636E] shadow-sm"
          >
            Hi there 👋{" "}
            <span className="text-[#59636E]">welcome to my portfolio</span>
          </motion.div>

          <motion.h1
            {...fade(0.15)}
            className="font-display text-5xl leading-[1.05] text-[#1F2328] sm:text-6xl lg:text-7xl"
          >
            I'm Muhammad{" "}
            <span className="italic text-[#0969DA]">Fadhillah</span>
          </motion.h1>

          <motion.p
            {...fade(0.25)}
            className="text-lg font-medium text-[#59636E] sm:text-xl"
          >
            Passionate about being a{" "}
            <span className="font-semibold text-[#1F2328]">Web Developer</span>
          </motion.p>

          <motion.p
            {...fade(0.35)}
            className="max-w-xl text-base leading-relaxed text-[#59636E] sm:text-lg"
          >
            Passionate fullstack web developer who enjoys building modern web
            applications with clean code and thoughtful user experience.
            Specialized in React, and modern technologies!
          </motion.p>

          <motion.div {...fade(0.45)} className="space-y-4">
            <div
              role="tablist"
              aria-label="Filter tech stack"
              className="inline-flex rounded-full border border-[#D0D7DE] bg-[#FAFBFD] p-1 shadow-sm"
              onKeyDown={(e) => {
                if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
                e.preventDefault();
                const i = tabs.findIndex((t) => t.id === focus);
                const step = e.key === "ArrowRight" ? 1 : tabs.length - 1;
                const next = tabs[(i + step) % tabs.length];
                setFocus(next.id);
                document.getElementById(`focus-tab-${next.id}`)?.focus();
              }}
            >
              {tabs.map((t) => (
                <button
                  key={t.id}
                  id={`focus-tab-${t.id}`}
                  role="tab"
                  aria-selected={focus === t.id}
                  aria-controls="stack-panel"
                  tabIndex={focus === t.id ? 0 : -1}
                  onClick={() => setFocus(t.id)}
                  className={`relative cursor-pointer rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                    focus === t.id
                      ? "text-[#1F2328]"
                      : "text-[#59636E] hover:bg-[#E9EEF2] hover:text-[#1F2328]"
                  }`}
                >
                  {focus === t.id && (
                    <motion.span
                      layoutId="focus-pill"
                      className="absolute inset-0 rounded-full bg-[#E9EEF2]"
                      transition={
                        reduceMotion
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 380, damping: 30 }
                      }
                    />
                  )}
                  <span className="relative">{t.label}</span>
                </button>
              ))}
            </div>

            <div
              id="stack-panel"
              role="tabpanel"
              aria-labelledby={`focus-tab-${focus}`}
              className="flex min-h-32 flex-wrap content-start gap-2"
            >
              <AnimatePresence mode="popLayout" initial={false}>
                {skills
                  .filter((sk) => focus === "all" || sk.tags.includes(focus))
                  .map(({ name, icon: Icon }) => (
                    <motion.div
                      key={name}
                      layout={!reduceMotion}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={
                        reduceMotion ? { duration: 0 } : { duration: 0.25 }
                      }
                      className="flex items-center gap-2 rounded-full border border-[#D0D7DE] bg-[#E9EEF2] px-3 py-1.5 text-xs font-medium text-[#59636E] shadow-sm transition-colors hover:border-[#0969DA] hover:text-[#1F2328] sm:text-sm"
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      {name}
                    </motion.div>
                  ))}
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.div
            {...fade(0.55)}
            className="flex flex-col gap-3 pt-2 sm:flex-row"
          >
            <a
              href="/cv/Muhammad%20Fadhillah%20-%20CV.pdf"
              download="Muhammad-Fadhillah-CV.pdf"
              className="group flex items-center justify-center gap-2 rounded-full bg-[#0969DA] px-7 py-3.5 text-sm font-semibold text-[#FAFBFD] shadow-lg shadow-blue-900/10 transition-all hover:-translate-y-0.5 hover:bg-[#0550AE] hover:shadow-xl hover:shadow-blue-900/25"
            >
              <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              Download CV
            </a>
            <a
              href="https://github.com/othersideofpadil"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-full border border-[#D0D7DE] bg-[#FAFBFD] px-7 py-3.5 text-sm font-semibold text-[#1F2328] transition-all hover:-translate-y-0.5 hover:border-[#0969DA]"
            >
              <Github className="h-4 w-4" />
              GitHub Profile
            </a>
          </motion.div>
        </div>

        <motion.div
          className="order-1 flex justify-center lg:order-2 lg:justify-end"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <div
            className="relative h-72 w-72 sm:h-80 sm:w-80 lg:h-[26rem] lg:w-[26rem]"
            style={{ perspective: 1000 }}
            onMouseMove={(e) => {
              e.stopPropagation();
              const r = e.currentTarget.getBoundingClientRect();
              tx.set((e.clientX - r.left) / r.width - 0.5);
              ty.set((e.clientY - r.top) / r.height - 0.5);
            }}
            onMouseLeave={() => {
              tx.set(0);
              ty.set(0);
            }}
          >
            <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-[2rem] bg-accent-soft" />
            <motion.div
              className="relative h-full w-full rounded-[2rem] border border-[#D0D7DE] bg-[#FAFBFD] p-2 shadow-2xl shadow-black/10"
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            >
              <img
                src="/pp.jpeg"
                alt="Muhammad Fadhillah"
                className="h-full w-full rounded-3xl object-cover"
              />
            </motion.div>
            <motion.div
              className="absolute -bottom-5 -left-3 rounded-2xl border border-[#D0D7DE] bg-[#FAFBFD] px-4 py-3 shadow-xl shadow-black/10 sm:-left-8"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-mute">
                Specialized in
              </p>
              <p className="text-sm font-bold text-ink">
                Build Web Applications
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;

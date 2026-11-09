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
import type { MotionProps } from "framer-motion";
import type { IconType } from "react-icons";
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiLaravel,
  SiNodedotjs,
  SiExpress,
  SiTailwindcss,
  SiPostgresql,
  SiMysql,
  SiGit,
  SiFigma,
  SiPhp,
} from "react-icons/si";

type Focus = "all" | "frontend" | "backend";

const tabs: { id: Focus; label: string }[] = [
  { id: "all", label: "All" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
];

const skills: { name: string; icon: IconType; tags: Exclude<Focus, "all">[] }[] = [
  { name: "JavaScript", icon: SiJavascript, tags: ["frontend"] },
  { name: "TypeScript", icon: SiTypescript, tags: ["frontend"] },
  { name: "React", icon: SiReact, tags: ["frontend"] },
  { name: "Next.js", icon: SiNextdotjs, tags: ["frontend"] },
  { name: "Tailwind CSS", icon: SiTailwindcss, tags: ["frontend"] },
  { name: "Figma", icon: SiFigma, tags: ["frontend"] },
  { name: "PHP", icon: SiPhp, tags: ["backend"] },
  { name: "Laravel", icon: SiLaravel, tags: ["backend"] },
  { name: "Node.js", icon: SiNodedotjs, tags: ["backend"] },
  { name: "Express", icon: SiExpress, tags: ["backend"] },
  { name: "PostgreSQL", icon: SiPostgresql, tags: ["backend"] },
  { name: "MySQL", icon: SiMysql, tags: ["backend"] },
  { name: "Git", icon: SiGit, tags: ["frontend", "backend"] },
];

const fade = (delay: number): MotionProps => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: "easeOut" },
});

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
      <motion.div className="pointer-events-none absolute inset-0" style={{ background: spotlight }} />

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="order-2 space-y-7 lg:order-1">
          <motion.div
            {...fade(0.05)}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-1.5 text-sm font-medium text-ink-soft shadow-sm"
          >
            Hi there 👋 <span className="text-ink-mute">welcome to my portfolio</span>
          </motion.div>

          <motion.h1 {...fade(0.15)} className="font-display text-5xl leading-[1.05] text-ink sm:text-6xl lg:text-7xl">
            I'm Muhammad <span className="italic text-accent text-ink">Fadhillah</span>
          </motion.h1>

          <motion.p {...fade(0.25)} className="text-lg font-medium text-ink-soft sm:text-xl">
            Passionate about being a{" "}
            <span className="font-semibold text-black">Software Engineer</span>
          </motion.p>

          <motion.p {...fade(0.35)} className="max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
            Passionate fullstack web developer who enjoys building modern web
            applications with clean code and thoughtful user experience.
            Specialized in React, and modern technologies!
          </motion.p>

          <motion.div {...fade(0.45)} className="space-y-4">
            <div
              role="tablist"
              aria-label="Filter tech stack"
              className="inline-flex rounded-full border border-gray-200 bg-white p-1 shadow-sm"
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
                      ? "text-black"
                      : "text-gray-600 hover:bg-gray-100 hover:text-black"
                  }`}
                >
                  {focus === t.id && (
                    <motion.span
                      layoutId="focus-pill"
                      className="absolute inset-0 rounded-full bg-gray-200"
                      transition={
                        reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 30 }
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
                      transition={reduceMotion ? { duration: 0 } : { duration: 0.25 }}
                      className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm transition-colors hover:border-gray-400 hover:text-black sm:text-sm"
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      {name}
                    </motion.div>
                  ))}
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.div {...fade(0.55)} className="flex flex-col gap-3 pt-2 sm:flex-row">
            <a
              href="/cv/Muhammad%20Fadhillah%20-%20CV.pdf"
              download="Muhammad-Fadhillah-CV.pdf"
              className="group flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-black shadow-lg shadow-black/10 transition-all hover:-translate-y-0.5 hover:bg-accent hover:shadow-xl hover:shadow-accent/25"
            >
              <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              Download CV
            </a>
            <a
              href="https://github.com/othersideofpadil"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-full border border-line bg-white px-7 py-3.5 text-sm font-semibold text-ink transition-all hover:-translate-y-0.5 hover:border-ink"
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
              className="relative h-full w-full rounded-[2rem] border border-line bg-white p-2 shadow-2xl shadow-black/10"
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            >
              <img src="/profile.jpg" alt="Muhammad Fadhillah" className="h-full w-full rounded-3xl object-cover" />
            </motion.div>
            <motion.div
              className="absolute -bottom-5 -left-3 rounded-2xl border border-line bg-white px-4 py-3 shadow-xl shadow-black/10 sm:-left-8"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-mute">Specialized in</p>
              <p className="text-sm font-bold text-ink">Build Web Applications</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
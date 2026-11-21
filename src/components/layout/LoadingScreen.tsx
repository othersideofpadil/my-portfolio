import { useEffect, useState } from "react";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { PROFILE } from "../../data/profile";

const LOAD_SECONDS = 1.8;
const HOLD_SECONDS = 0.3;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18, delayChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
} as const;

const Blob = ({ className, delay = 0 }: { className: string; delay?: number }) => (
  <motion.div
    aria-hidden
    className={`absolute size-96 rounded-full blur-3xl ${className}`}
    animate={{ x: [0, 30, -20, 0], y: [0, -50, 20, 0], scale: [1, 1.1, 0.9, 1] }}
    transition={{ duration: 8, delay, repeat: Infinity, ease: "easeInOut" }}
  />
);

type LoadingScreenProps = {
  onLoadingComplete: () => void;
};

// shortcut: progress is a timed animation, not real asset loading; wire it to real loading if the page gets heavy.
const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [done, setDone] = useState(false);
  const progress = useMotionValue(0);
  const percent = useTransform(progress, (value) => Math.round(value));
  const barScale = useTransform(progress, (value) => value / 100);

  useEffect(() => {
    const controls = animate(progress, 100, {
      duration: LOAD_SECONDS,
      ease: [0.65, 0, 0.35, 1],
      onComplete: () => setDone(true),
    });
    return () => controls.stop();
  }, [progress]);

  // Keep the page behind the overlay from scrolling.
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <motion.div
      role="status"
      aria-label="Loading portfolio"
      className="fixed inset-0 z-100 flex items-center justify-center overflow-hidden bg-paper"
      style={{ pointerEvents: done ? "none" : "auto" }}
      initial={false}
      animate={{ opacity: done ? 0 : 1 }}
      transition={{ duration: 0.5, delay: done ? HOLD_SECONDS : 0 }}
      onAnimationComplete={() => done && onLoadingComplete()}
    >
      <Blob className="-top-24 -left-24 bg-line/60" />
      <Blob className="-right-24 -bottom-24 bg-accent/15" delay={2} />

      <motion.div
        className="relative z-10 flex flex-col items-center gap-8 px-4 text-center"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item}>
          <motion.img
            src="/logo.jpeg"
            alt="Padil logo"
            className="size-28 rounded-3xl object-contain shadow-xl sm:size-36 md:size-44"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        <motion.div variants={item} className="space-y-3">
          <h1 className="text-3xl text-ink sm:text-4xl md:text-5xl lg:text-6xl">{PROFILE.name}</h1>
          <ul className="flex flex-col items-center gap-1 text-sm font-medium text-ink-soft sm:flex-row sm:gap-x-3 sm:text-base md:text-lg">
            {PROFILE.roles.map((role, index) => (
              <li key={role} className="flex items-center gap-3">
                {index > 0 && <span aria-hidden className="hidden size-1 rounded-full bg-ink-mute sm:block" />}
                {role}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div variants={item} className="w-56 sm:w-72 md:w-80">
          <div className="h-1 overflow-hidden rounded-full bg-line">
            <motion.div className="h-full origin-left rounded-full bg-accent" style={{ scaleX: barScale }} />
          </div>
          <p className="mt-3 text-xs font-medium text-ink-soft tabular-nums sm:text-sm">
            <motion.span>{percent}</motion.span>%
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import type { MouseEvent } from "react";

const SPRING = { stiffness: 160, damping: 18 };

/** Profile photo that tilts toward the cursor, with a floating tagline badge. */
const ProfileCard = () => {
  const reduceMotion = useReducedMotion();
  const tx = useMotionValue(0);
  const ty = useMotionValue(0);
  const rotateY = useSpring(useTransform(tx, [-0.5, 0.5], [-8, 8]), SPRING);
  const rotateX = useSpring(useTransform(ty, [-0.5, 0.5], [8, -8]), SPRING);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    tx.set((e.clientX - rect.left) / rect.width - 0.5);
    ty.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const resetTilt = () => {
    tx.set(0);
    ty.set(0);
  };

  return (
    <motion.div
      className="order-1 flex justify-center lg:order-2 lg:justify-end"
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
    >
      <div
        className="relative size-72 sm:size-80 lg:size-104"
        style={{ perspective: 1000 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={resetTilt}
      >
        <div aria-hidden className="absolute inset-0 translate-x-4 translate-y-4 rounded-[2rem] bg-accent-soft" />
        <motion.div
          className="relative size-full rounded-[2rem] border border-line bg-card p-2 shadow-2xl shadow-black/10"
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        >
          <img
            src="/pp.jpeg"
            alt="Muhammad Fadhillah"
            decoding="async"
            className="size-full rounded-3xl object-cover"
          />
        </motion.div>
        <motion.div
          className="absolute -bottom-5 -left-3 rounded-2xl border border-line bg-card px-4 py-3 shadow-xl shadow-black/10 sm:-left-8"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <p className="text-[11px] font-semibold tracking-wider text-ink-mute uppercase">Specialized in</p>
          <p className="text-sm font-bold text-ink">Build Web Applications</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProfileCard;

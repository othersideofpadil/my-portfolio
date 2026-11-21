import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Download, Github } from "lucide-react";
import { PROFILE } from "../../data/profile";
import { fade } from "../../lib/motion";
import { cn } from "../../lib/utils";
import ProfileCard from "../about/ProfileCard";
import StackFilter from "../about/StackFilter";
import { buttonVariants } from "../ui/button";
import type { MouseEvent } from "react";

const ctaLift = "hover:-translate-y-0.5";

const AboutSection = () => {
  const [firstName, ...rest] = PROFILE.name.split(" ");

  // Soft glow that follows the cursor across the section.
  const mx = useMotionValue(-500);
  const my = useMotionValue(-500);
  const spotlight = useMotionTemplate`radial-gradient(480px circle at ${mx}px ${my}px, rgba(9,105,218,0.08), transparent 70%)`;

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
  };

  return (
    <section
      id="about"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-28 sm:px-6 lg:px-8"
      onMouseMove={handleMouseMove}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 size-140 -translate-x-1/2 rounded-full bg-accent/10 blur-3xl"
      />
      <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: spotlight }} />

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="order-2 space-y-7 lg:order-1">
          <motion.p
            {...fade(0.05)}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-4 py-1.5 text-sm font-medium text-ink-soft shadow-sm"
          >
            Hi there 👋 welcome to my portfolio
          </motion.p>

          <motion.h1 {...fade(0.15)} className="text-5xl leading-[1.05] text-ink sm:text-6xl lg:text-7xl">
            I'm {firstName} <span className="text-accent italic">{rest.join(" ")}</span>
          </motion.h1>

          <motion.p {...fade(0.25)} className="text-lg font-medium text-ink-soft sm:text-xl">
            Passionate about being a <span className="font-semibold text-ink">{PROFILE.roles[0]}</span>
          </motion.p>

          <motion.p {...fade(0.35)} className="max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
            Passionate fullstack web developer who enjoys building modern web applications with clean code and
            thoughtful user experience. Specialized in React, and modern technologies!
          </motion.p>

          <motion.div {...fade(0.45)}>
            <StackFilter />
          </motion.div>

          <motion.div {...fade(0.55)} className="flex flex-col gap-3 pt-2 sm:flex-row">
            <a
              href={PROFILE.cv.href}
              download={PROFILE.cv.filename}
              className={cn(buttonVariants({ size: "lg" }), ctaLift, "group")}
            >
              <Download className="transition-transform group-hover:translate-y-0.5" aria-hidden />
              Download CV
            </a>
            <a
              href={PROFILE.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), ctaLift, "text-ink")}
            >
              <Github aria-hidden />
              GitHub Profile
            </a>
          </motion.div>
        </div>

        <ProfileCard />
      </div>
    </section>
  );
};

export default AboutSection;

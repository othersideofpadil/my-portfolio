import { clsx } from "clsx";
import type { ClassValue } from "clsx";
import type { MotionProps } from "framer-motion";
import type { IconType } from "react-icons";
import {
  SiExpress,
  SiFigma,
  SiGit,
  SiJavascript,
  SiLaravel,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPhp,
  SiPostgresql,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const navItems = [
  { id: "about", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "comments", label: "Comments" },
  { id: "contact", label: "Contact" },
];

export type Focus = "all" | "frontend" | "backend";

export const tabs: { id: Focus; label: string }[] = [
  { id: "all", label: "All" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
];

export const skills: {
  name: string;
  icon: IconType;
  tags: Exclude<Focus, "all">[];
}[] = [
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

export const fade = (delay: number): MotionProps => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: "easeOut" },
});

export type Project = {
  title: string;
  description: string;
  image: string;
  tags: string[];
  github: string | { frontend?: string; backend?: string };
};

export const projects: Project[] = [
  {
    title: "Personal Portfolio Website",
    description:
      "My personal portfolio website to showcase my projects and skills.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&h=600&fit=crop",
    tags: ["React", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    github: "https://github.com/othersideofpadil/my-portfolio",
  },
  {
    title: "Cureva - Homecare Physiotherapy",
    description:
      "A homecare physiotherapy service platform connecting patients with therapists.",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=900&h=600&fit=crop",
    tags: ["React", "Express", "Tailwind CSS", "MySQL"],
    github: {
      frontend: "https://github.com/othersideofpadil/front-end-cureva",
      backend: "https://github.com/othersideofpadil/back-end-cureva",
    },
  },
];

export const techIcons: Record<string, IconType> = {
  React: SiReact,
  TypeScript: SiTypescript,
  "Tailwind CSS": SiTailwindcss,
  PostgreSQL: SiPostgresql,
  Express: SiExpress,
  MySQL: SiMysql,
};

export const linksOf = (project: Project) =>
  typeof project.github === "string"
    ? [{ label: "GitHub", href: project.github }]
    : [
        ...(project.github.frontend
          ? [{ label: "Frontend Repo", href: project.github.frontend }]
          : []),
        ...(project.github.backend
          ? [{ label: "Backend Repo", href: project.github.backend }]
          : []),
      ];

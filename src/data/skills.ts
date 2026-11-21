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
import type { IconType } from "react-icons";

export type Focus = "all" | "frontend" | "backend";

export const stackTabs: { id: Focus; label: string }[] = [
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

/** Looks up a tech icon by skill name, so project tags reuse the skills list. */
export const skillIcons: Record<string, IconType | undefined> = Object.fromEntries(
  skills.map(({ name, icon }) => [name, icon]),
);

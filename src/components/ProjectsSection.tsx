import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import type { IconType } from "react-icons";
import {
  SiExpress,
  SiMysql,
  SiPostgresql,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import SectionHeading from "./SectionHeading";

type Project = {
  title: string;
  description: string;
  image: string;
  tags: string[];
  github: string | { frontend?: string; backend?: string };
};

const projects: Project[] = [
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

const techIcons: Record<string, IconType> = {
  React: SiReact,
  TypeScript: SiTypescript,
  "Tailwind CSS": SiTailwindcss,
  PostgreSQL: SiPostgresql,
  Express: SiExpress,
  MySQL: SiMysql,
};

const linksOf = (p: Project) =>
  typeof p.github === "string"
    ? [{ label: "GitHub", href: p.github }]
    : [
        ...(p.github.frontend ? [{ label: "Frontend Repo", href: p.github.frontend }] : []),
        ...(p.github.backend ? [{ label: "Backend Repo", href: p.github.backend }] : []),
      ];

const ProjectsSection = () => (
  <section id="projects" className="px-4 py-20 sm:py-24">
    <div className="mx-auto max-w-6xl">
      <SectionHeading index="01" eyebrow="Selected work" title="Latest Projects" />

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p, i) => (
          <motion.article
            key={p.title}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: i * 0.12 }}
            whileHover={{ y: -6 }}
            className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-shadow duration-300 hover:border-gray-400 hover:shadow-2xl hover:shadow-gray-200"
          >
            <div className="aspect-[3/2] overflow-hidden bg-paper">
              <img
                src={p.image}
                alt={p.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="space-y-4 p-6 sm:p-8">
              <div className="flex flex-wrap gap-2">
                {p.tags.map((t) => {
                  const TechIcon = techIcons[t];

                  return (
                  <span key={t} className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                    <TechIcon className="h-3.5 w-3.5" aria-hidden="true" />
                    {t}
                  </span>
                  );
                })}
              </div>
              <h3 className="font-display text-2xl text-black sm:text-3xl">{p.title}</h3>
              <p className="text-sm leading-relaxed text-gray-600 sm:text-base">{p.description}</p>
              <div className="flex flex-wrap gap-2 pt-2">
                {linksOf(p).map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:border-gray-400 hover:bg-gray-100 hover:text-black"
                  >
                    <Github className="h-4 w-4" />
                    {l.label}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

export default ProjectsSection;

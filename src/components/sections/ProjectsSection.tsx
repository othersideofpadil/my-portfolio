import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { linksOf, projects } from "../../data/projects";
import { skillIcons } from "../../data/skills";
import { reveal } from "../../lib/motion";
import { cn } from "../../lib/utils";
import { buttonVariants } from "../ui/button";
import { cardVariants } from "../ui/card";
import { TechChip } from "../ui/tech-chip";
import Section from "./Section";
import type { Project } from "../../data/projects";

type RepoLinkProps = { label: string; href: string; title: string };

const RepoLink = ({ label, href, title }: RepoLinkProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={`${label}: ${title} (opens in new tab)`}
    className={cn(
      buttonVariants({ variant: "outline" }),
      "group/link gap-1.5 px-3 lg:gap-2 lg:px-4",
    )}
  >
    <Github aria-hidden />
    {label}
    {/* Hidden on small screens: two repo links must fit side by side. */}
    <ArrowUpRight
      className="hidden transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 lg:block"
      aria-hidden
    />
  </a>
);

const ProjectImage = ({ title, src }: { title: string; src: string }) => {
  // Remote images can break, so fall back to the title's initial instead of an empty box.
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative aspect-3/2 overflow-hidden bg-accent-soft">
      {failed ? (
        <span
          aria-hidden
          className="absolute inset-0 grid place-items-center text-7xl font-semibold text-ink-mute/50"
        >
          {title.charAt(0)}
        </span>
      ) : (
        <img
          src={src}
          alt={title}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      )}
    </div>
  );
};

const ProjectCard = ({ project, index }: { project: Project; index: number }) => (
  <motion.article
    // Delay by column, not by index, so cards far down the list don't wait for the ones above.
    {...reveal((index % 2) * 0.12, 32)}
    className={cn(cardVariants({ interactive: true }), "group flex flex-col overflow-hidden")}
  >
    <ProjectImage title={project.title} src={project.image} />

    <div className="flex flex-1 flex-col gap-4 p-6 sm:p-8">
      <ul className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <li key={tag}>
            <TechChip name={tag} icon={skillIcons[tag]} />
          </li>
        ))}
      </ul>

      <h3 className="text-2xl text-ink sm:text-3xl">{project.title}</h3>
      <p className="text-sm leading-relaxed text-ink-soft sm:text-base">{project.description}</p>

      <div className="mt-auto grid grid-cols-2 gap-2 pt-2 lg:flex lg:flex-wrap">
        {linksOf(project).map((link) => (
          <RepoLink key={link.href} {...link} title={project.title} />
        ))}
      </div>
    </div>
  </motion.article>
);

const ProjectsSection = () => (
  <Section id="projects" index="01" eyebrow="Selected work" title="Latest Projects">
    <div className="grid gap-6 md:grid-cols-2">
      {projects.map((project, index) => (
        <ProjectCard key={project.title} project={project} index={index} />
      ))}
    </div>
  </Section>
);

export default ProjectsSection;

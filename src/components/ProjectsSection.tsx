import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { linksOf, projects, techIcons } from "../lib/utils";

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
            className="group overflow-hidden rounded-3xl border border-[#D0D7DE] bg-[#FAFBFD] shadow-sm transition-shadow duration-300 hover:border-[#0969DA] hover:shadow-2xl hover:shadow-blue-100"
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
                  <span key={t} className="inline-flex items-center gap-1.5 rounded-full bg-[#E9EEF2] px-3 py-1 text-xs font-medium text-[#59636E]">
                    <TechIcon className="h-3.5 w-3.5" aria-hidden="true" />
                    {t}
                  </span>
                  );
                })}
              </div>
              <h3 className="font-display text-2xl text-[#1F2328] sm:text-3xl">{p.title}</h3>
              <p className="text-sm leading-relaxed text-[#59636E] sm:text-base">{p.description}</p>
              <div className="flex flex-wrap gap-2 pt-2">
                {linksOf(p).map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-[#D0D7DE] px-4 py-2 text-sm font-medium text-[#59636E] transition-colors hover:border-[#0969DA] hover:bg-[#E9EEF2] hover:text-[#1F2328]"
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

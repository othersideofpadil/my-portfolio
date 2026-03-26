import { motion } from "framer-motion";
import { AnimatedTestimonials } from "./ui/animated-testimonials";
import type { Testimonial } from "./ui/animated-testimonials";

type Project = {
  title: string;
  description: string;
  image: string;
  tags: string[];
  github:
    | string
    | {
        frontend?: string;
        backend?: string;
      };
};

const ProjectsSection = () => {
  const projects: Project[] = [
    {
      title: "Personal Portfolio Website",
      description:
        "My personal portfolio website to showcase my projects and skills.",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop",
      tags: ["React","TypeScript", "Tailwind CSS", "PostgreSQL"],
      github: "https://github.com/othersideofpadil/my-portfolio",
    },

    {
      title: "Cureva - Homecare Physiotherapy",
      description:
        "A homecare physiotherapy service platform connecting patients with therapists.",
      image:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=400&fit=crop",
      tags: ["React", "Express", "Tailwind CSS", "MySQL"],
      github: {
        frontend: "https://github.com/othersideofpadil/front-end-cureva",
        backend: "https://github.com/othersideofpadil/back-end-cureva",
      },
    },

    {
      title: "Arus Kas Lofomo Kopi",
      description:
        "A cash flow web application for Lofomo Kopi, a coffee shop in Depok.",
      image:
        "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=400&fit=crop",
      tags: ["Laravel", "Tailwind CSS", "MySQL"],
      github: "https://github.com/othersideofpadil/arus_kas_lofomo_kopi",
    },

    {
      title: "Glamoura E-commerce Platform",
      description:
        "Glamoura is a e-commerce platform for fashion with seamless user experience and I built it as the frontend.",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      tags: ["React", "Tailwind CSS", "MySQL"],
      github:
        "https://github.com/othersideofpadil/frontend-e-commerce-fashion-app",
    },

    {
      title: "Movie App",
      description: "A movie discovery app that allows users to explore movies.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      tags: ["React", "TMDB API", "CSS Modules"],
      github: "https://github.com/othersideofpadil/frontend2024",
    },
  ];

  const projectCards: Testimonial[] = projects.map((project) => {
    const actions =
      typeof project.github === "string"
        ? [{ label: "View on GitHub", href: project.github }]
        : [
            ...(project.github.frontend
              ? [{ label: "Frontend Repo", href: project.github.frontend }]
              : []),
            ...(project.github.backend
              ? [{ label: "Backend Repo", href: project.github.backend }]
              : []),
          ];

    return {
      src: project.image,
      name: project.title,
      designation: project.tags.join(" • "),
      quote: project.description,
      actions,
    };
  });

  return (
    <motion.section
      id="projects"
      className="py-12 sm:py-16 md:py-20 px-4"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-6xl mx-auto w-full">
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 md:mb-16 bg-linear-to-r from-black to-gray-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Featured Projects
        </motion.h2>

        <div className="rounded-3xl border border-gray-200 bg-white/70 shadow-sm backdrop-blur-sm">
          <AnimatedTestimonials testimonials={projectCards} autoplay />
        </div>
      </div>
    </motion.section>
  );
};

export default ProjectsSection;

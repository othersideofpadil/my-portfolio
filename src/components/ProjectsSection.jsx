import { Github } from "lucide-react";
import {
  SiJavascript,
  SiReact,
  SiLaravel,
  SiExpress,
  SiTailwindcss,
  SiPostgresql,
  SiMysql,
  SiLeaflet,
  SiCss3,
} from "react-icons/si";

const ProjectsSection = () => {
  // Tech icon mapping
  const techIcons = {
    React: SiReact,
    ReactJs: SiReact,
    "Tailwind CSS": SiTailwindcss,
    PostgreSQL: SiPostgresql,
    Express: SiExpress,
    MySQL: SiMysql,
    Laravel: SiLaravel,
    Javascript: SiJavascript,
    LeafletJS: SiLeaflet,
    "CSS Modules": SiCss3,
  };
  const projects = [
    {
      title: "Personal Portfolio Website",
      description:
        "My personal portfolio website to showcase my projects and skills.",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop",
      tags: ["React", "Tailwind CSS", "PostgreSQL"],
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
      title: "Peta GIS Application",
      description:
        "A GIS web application for mapping hospitals in jabodetabek area.",
      image:
        "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop",
      tags: ["Javascript", "Tailwind CSS", "LeafletJS"],
      github:
        "https://github.com/othersideofpadil/Peta-Rumah-Sakit---JABODETABEK",
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

  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-linear-to-r from-black to-gray-600 bg-clip-text text-transparent">
          Featured Projects
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white border border-gray-300 rounded-2xl overflow-hidden hover:scale-[1.02] hover:shadow-xl transition-all duration-300"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-gray-900">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, i) => {
                    const Icon = techIcons[tag];
                    return (
                      <span
                        key={i}
                        className="flex items-center gap-1.5 px-3 py-1 bg-gray-100 border border-gray-300 rounded-full text-xs text-gray-800 font-medium"
                      >
                        {Icon && <Icon className="w-3.5 h-3.5" />}
                        {tag}
                      </span>
                    );
                  })}
                </div>

                {/* GitHub Buttons - Support single or multiple repos */}
                <div className="flex flex-wrap gap-2">
                  {typeof project.github === "string" ? (
                    // Single repository
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg font-semibold text-sm hover:bg-gray-800 transition-all duration-300"
                    >
                      <Github className="w-4 h-4" />
                      View on GitHub
                    </a>
                  ) : (
                    // Multiple repositories (frontend/backend)
                    <>
                      {project.github.frontend && (
                        <a
                          href={project.github.frontend}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg font-semibold text-sm hover:bg-gray-800 transition-all duration-300"
                        >
                          <Github className="w-4 h-4" />
                          Frontend
                        </a>
                      )}
                      {project.github.backend && (
                        <a
                          href={project.github.backend}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg font-semibold text-sm hover:bg-gray-700 transition-all duration-300"
                        >
                          <Github className="w-4 h-4" />
                          Backend
                        </a>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;

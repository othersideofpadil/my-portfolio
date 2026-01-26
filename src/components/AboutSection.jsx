import { Download, Github } from "lucide-react";
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiLaravel,
  SiNodedotjs,
  SiExpress,
  SiTailwindcss,
  SiPostgresql,
  SiMysql,
  SiGit,
  SiFigma,
} from "react-icons/si";

const AboutSection = () => {
  const skills = [
    { name: "JavaScript", icon: SiJavascript },
    { name: "TypeScript", icon: SiTypescript },
    { name: "React", icon: SiReact },
    { name: "Next.js", icon: SiNextdotjs },
    { name: "Laravel", icon: SiLaravel },
    { name: "Node.js", icon: SiNodedotjs },
    { name: "Express", icon: SiExpress },
    { name: "Tailwind CSS", icon: SiTailwindcss },
    { name: "PostgreSQL", icon: SiPostgresql },
    { name: "MySQL", icon: SiMysql },
    { name: "Git", icon: SiGit },
    { name: "Figma", icon: SiFigma },
  ];

  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center px-4 py-20"
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* ================= AVATAR ================= */}
        <div className="mb-10 flex justify-center">
          <div className="relative w-48 h-48">
            {/* Wave Ring */}
            <div className="absolute inset-0 rounded-full wave-ring" />

            {/* Image */}
            <div className="relative w-full h-full rounded-full bg-white p-1">
              <img
                src="/profile.jpg"
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
        </div>

        {/* ================= TITLE ================= */}
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-linear-to-r from-black to-gray-600 bg-clip-text text-transparent">
          Fullstack Web Developer
        </h1>

        <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Hi, I'm a passionate fullstack developer who enjoys building modern
          web applications with clean code and thoughtful user experience.
        </p>

        {/* ================= SKILLS ================= */}
        <div className="mb-14 overflow-hidden">
          <div className="flex animate-scroll">
            {[...skills, ...skills].map((skill, index) => {
              const Icon = skill.icon;
              return (
                <div
                  key={index}
                  className="
                    flex items-center gap-2
                    mx-2 px-4 py-2
                    bg-white border border-gray-200
                    rounded-full
                    text-xs text-gray-700 font-medium
                    shadow-sm
                    hover:border-gray-400
                    hover:bg-gray-50
                    transition-all
                  "
                >
                  <Icon className="w-4 h-4" />
                  <span>{skill.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= BUTTONS ================= */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-7 py-3 bg-black text-white rounded-full text-sm font-semibold hover:bg-gray-800 transition flex items-center gap-2">
            <Download className="w-4 h-4" />
            Download CV
          </button>

          <a
            href="https://github.com/othersideofpadil"
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-3 bg-white border border-gray-300 rounded-full text-sm font-semibold hover:bg-gray-50 transition flex items-center gap-2"
          >
            <Github className="w-4 h-4" />
            GitHub Profile
          </a>
        </div>
      </div>

      {/* ================= STYLE ================= */}
      <style>{`
        /* ===== Skills Scroll ===== */
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .animate-scroll {
          animation: scroll 80s linear infinite;
          width: fit-content;
        }

        /* ===== Wave Avatar Effect ===== */
        @keyframes wave {
          0% {
            transform: scale(1);
            opacity: 0.55;
          }
          50% {
            transform: scale(1.07);
            opacity: 0.25;
          }
          100% {
            transform: scale(1);
            opacity: 0.55;
          }
        }

        .wave-ring {
          background: linear-gradient(
            135deg,
            rgba(75, 85, 99, 0.6),
            rgba(156, 163, 175, 0.4),
            rgba(75, 85, 99, 0.6)
          );
          filter: blur(8px);
          animation: wave 4.5s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default AboutSection;

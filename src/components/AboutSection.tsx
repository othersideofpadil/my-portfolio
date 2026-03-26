import { Download, Github } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
  SiPhp,
} from "react-icons/si";

const AboutSection = () => {
  const skills = [
    { name: "PHP", icon: SiPhp },
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

  // Sliding animation state
  const titles = ["Web Developer", "Frontend Developer", "Backend Developer"];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % titles.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section
      id="about"
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <motion.div
            className="order-2 lg:order-1 space-y-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div>
              {/* Greeting */}
              <div className="text-lg sm:text-xl md:text-2xl lg:text-2xl font-semibold text-gray-700 mb-4">
                <span className="inline-block">Hi there 👋</span>
              </div>

              {/* Sliding Animation in Button */}
              <div className="text-lg sm:text-xl font-medium text-gray-600 leading-relaxed">
                I'm Muhammad Fadhillah, passionate about{" "}
                <span className="inline-flex items-center bg-white border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 rounded-lg shadow-md overflow-hidden relative align-middle whitespace-nowrap">
                  <span className="relative h-7 w-48 overflow-hidden">
                    <span
                      className="absolute inset-0 transition-transform duration-700 ease-in-out"
                      style={{
                        transform: `translateY(-${currentIndex * 100}%)`,
                      }}
                    >
                      {titles.map((title, index) => (
                        <span
                          key={index}
                          className="h-7 flex items-center justify-center text-black font-bold text-base"
                        >
                          {title}
                        </span>
                      ))}
                    </span>
                  </span>
                </span>
              </div>
            </div>
            {/* Description */}
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl">
              Passionate fullstack web developer who enjoys building modern web
              applications with clean code and thoughtful user experience.
              Specialized in React, and modern technologies!
            </p>

            {/* Tech Stack */}
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => {
                  const Icon = skill.icon;
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs sm:text-sm text-gray-700 font-medium shadow-sm hover:border-gray-400 hover:bg-gray-50 hover:shadow-md transition-all cursor-pointer"
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{skill.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button className="px-6 py-3 bg-black text-white rounded-full text-sm font-semibold hover:bg-gray-800 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
                <Download className="w-4 h-4" />
                Download CV
              </button>

              <a
                href="https://github.com/othersideofpadil"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-white border-2 border-gray-300 rounded-full text-sm font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
              >
                <Github className="w-4 h-4" />
                GitHub Profile
              </a>
            </div>
          </motion.div>

          <motion.div
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
              {/* Wave Ring */}
              <div className="absolute inset-0 rounded-3xl wave-ring" />

              {/* Image Container */}
              <div className="relative w-full h-full rounded-3xl bg-linear-to-br from-gray-200 to-gray-300 p-2 shadow-2xl overflow-hidden">
                <img
                  src="/profile.jpg"
                  alt="Profile"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ================= STYLE ================= */}
      <style>{`
        /* ===== Wave Ring Effect ===== */
        @keyframes wave {
          0% {
            transform: scale(1) rotate(0deg);
            opacity: 0.4;
          }
          50% {
            transform: scale(1.05) rotate(180deg);
            opacity: 0.2;
          }
          100% {
            transform: scale(1) rotate(360deg);
            opacity: 0.4;
          }
        }

        .wave-ring {
          background: black radial-gradient(circle, rgba(0, 0, 0, 0.1) 20%, transparent 70%);
          filter: blur(20px);
          animation: wave 8s ease-in-out infinite;
        }
      `}</style>
    </motion.section>
  );
};

export default AboutSection;

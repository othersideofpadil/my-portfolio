import { useState, useEffect, useRef } from "react";
import { GraduationCap, Award, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

const EducationSection = () => {
  const [visibleItems, setVisibleItems] = useState([]);
  const itemRefs = useRef([]);

  const education = [
    {
      period: "2022 – Present",
      title: "Bachelor's Degree Candidate in Informatics Engineering",
      institution: "Sekolah Tinggi Teknologi Terpadu Nurul Fikri",
      description:
        "Currently pursuing a bachelor's degree with a focus on software engineering, web development, and modern application technologies.",
      side: "left",
      icon: GraduationCap,
    },
    {
      period: "2023",
      title: "BNSP Certified Junior Web Developer",
      institution: "Badan Nasional Sertifikasi Profesi (BNSP)",
      description:
        "Nationally recognized certification validating competencies in front-end and back-end web development.",
      side: "right",
      icon: Award,
    },
    {
      period: "2018 – 2021",
      title: "Senior High School",
      institution: "SMAN 14 Kabupaten Tangerang",
      description:
        "Built strong academic foundations with an emphasis on mathematics, science, and foreign languages.",
      side: "left",
      icon: BookOpen,
    },
  ];

  useEffect(() => {
    const observers = itemRefs.current.map((ref, index) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleItems((prev) => [...new Set([...prev, index])]);
            }
          });
        },
        { threshold: 0.2 },
      );

      if (ref) {
        observer.observe(ref);
      }

      return observer;
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <motion.section
      id="education"
      className="py-12 sm:py-16 md:py-20 px-4"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 md:mb-16 bg-linear-to-r from-black to-gray-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Education & Certifications
        </motion.h2>

        <div className="relative">
          {/* Timeline line - Responsive positioning */}
          <div className="absolute left-4 sm:left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-linear-to-b from-gray-800 via-gray-600 to-gray-800 transform md:-translate-x-1/2" />

          {education.map((item, index) => {
            const Icon = item.icon;
            const isVisible = visibleItems.includes(index);

            return (
              <div
                key={index}
                ref={(el) => (itemRefs.current[index] = el)}
                className={`mb-8 sm:mb-10 md:mb-12 relative transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Timeline dot with icon - Responsive sizing */}
                <motion.div
                  className="absolute left-2.5 sm:left-4 md:left-1/2 flex items-center justify-center transform md:-translate-x-1/2"
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-linear-to-br from-black to-gray-700 rounded-full shadow-lg flex items-center justify-center transition-all duration-500 ${
                      isVisible ? "scale-100 rotate-0" : "scale-0 rotate-180"
                    }`}
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                  </div>
                </motion.div>

                {/* Content - Responsive layout */}
                <div
                  className={`ml-14 sm:ml-20 md:ml-0 ${
                    item.side === "left"
                      ? "md:w-[calc(50%-2rem)] md:pr-8 lg:pr-12"
                      : "md:ml-auto md:w-[calc(50%-2rem)] md:pl-8 lg:pl-12"
                  }`}
                >
                  <motion.div
                    className={`bg-white border-2 border-gray-200 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-gray-400 ${
                      isVisible ? "shadow-md" : ""
                    }`}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Period badge */}
                    <div className="inline-block mb-2 sm:mb-3">
                      <span className="px-3 py-1 sm:px-4 sm:py-1.5 bg-linear-to-r from-gray-800 to-gray-600 text-white text-xs sm:text-sm font-semibold rounded-full shadow-md">
                        {item.period}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold mt-2 mb-2 text-gray-900 leading-tight">
                      {item.title}
                    </h3>

                    <p className="text-sm sm:text-base text-gray-600 font-medium mb-3">
                      {item.institution}
                    </p>

                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Decorative corner accent */}
                    <div className="absolute top-0 right-0 w-16 sm:w-20 h-16 sm:h-20 bg-linear-to-br from-gray-100 to-transparent rounded-bl-full opacity-50"></div>
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};

export default EducationSection;

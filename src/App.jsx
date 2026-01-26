import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Navigation from "./components/Navigation";
import AboutSection from "./components/AboutSection";
import EducationSection from "./components/EducationSection";
import ProjectsSection from "./components/ProjectsSection";
import CommentsSection from "./components/CommentsSection";
import ContactSection from "./components/ContactSection";


function App() {
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 },
    );

    document.querySelectorAll("section").forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen text-gray-900 pb-32">
      <Toaster position="top-right" />
      

      <div className="relative z-10">
        <AboutSection />
        <EducationSection />
        <ProjectsSection />
        <CommentsSection />
        <ContactSection />
      </div>

      <Navigation activeSection={activeSection} />
    </div>
  );
}

export default App;

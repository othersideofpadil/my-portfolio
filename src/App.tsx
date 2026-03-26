import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Navigation from "./components/Navigation";
import AboutSection from "./components/AboutSection";
import EducationSection from "./components/EducationSection";
import ProjectsSection from "./components/ProjectsSection";
import CommentsSection from "./components/CommentsSection";
import ContactSection from "./components/ContactSection";
import LoadingScreen from "./components/LoadingScreen";
import Footer from "./components/Footer";

function App() {
  const [activeSection, setActiveSection] = useState<string>("about");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Scroll ke top saat pertama kali load/refresh halaman
    window.scrollTo(0, 0);

    // Remove hash dari URL jika ada (dari OAuth redirect)
    if (window.location.hash) {
      // Use replaceState to remove hash without triggering a page reload
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll<HTMLElement>("section[id]");
      const scrollPos = window.scrollY + 100; // offset untuk navbar

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          setActiveSection(sectionId ?? "about");
        }
      });
    };

    // Set initial active section
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {isLoading && (
        <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
      )}

      <div className="min-h-screen text-gray-900 w-full overflow-x-hidden">
        <Toaster position="top-right" />

        <Navigation activeSection={activeSection} />

        <div className="relative z-10 w-full">
          <AboutSection />
          <EducationSection />
          <ProjectsSection />
          <CommentsSection />
          <ContactSection />
        </div>

        <Footer />
      </div>
    </>
  );
}

export default App;

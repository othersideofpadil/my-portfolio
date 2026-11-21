import { useEffect, useState } from "react";
import { MotionConfig } from "framer-motion";
import { Toaster } from "react-hot-toast";
import Footer from "./components/layout/Footer";
import LoadingScreen from "./components/layout/LoadingScreen";
import Navigation from "./components/layout/Navigation";
import AboutSection from "./components/sections/AboutSection";
import CommentsSection from "./components/sections/CommentsSection";
import ContactSection from "./components/sections/ContactSection";
import ProjectsSection from "./components/sections/ProjectsSection";
import { navItems } from "./data/navigation";
import { useActiveSection } from "./hooks/useActiveSection";

const SECTION_IDS = navItems.map(({ id }) => id);

const toastOptions = {
  style: {
    background: "var(--card)",
    color: "var(--foreground)",
    border: "1px solid var(--border)",
    borderRadius: "1rem",
  },
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const activeSection = useActiveSection(SECTION_IDS);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Drop the hash left by the OAuth redirect without reloading the page.
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  return (
    // reducedMotion="user" turns off transform animations for people who ask the OS for less motion.
    <MotionConfig reducedMotion="user">
      {isLoading && <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />}

      <div className="min-h-screen w-full overflow-x-hidden bg-paper text-ink">
        <a
          href="#about"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-card"
        >
          Skip to content
        </a>
        <Toaster position="top-right" toastOptions={toastOptions} />
        <Navigation activeSection={activeSection} />

        <main className="relative z-10 w-full">
          <AboutSection />
          <ProjectsSection />
          <CommentsSection />
          <ContactSection />
        </main>

        <Footer />
      </div>
    </MotionConfig>
  );
};

export default App;

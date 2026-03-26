import {
  Home,
  GraduationCap,
  Folder,
  MessageSquare,
  Mail,
  Menu,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";
import type { MouseEvent } from "react";

type NavigationProps = {
  activeSection: string;
};

const Navigation = ({ activeSection }: NavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "about", icon: Home, label: "Home" },
    { id: "education", icon: GraduationCap, label: "Education" },
    { id: "projects", icon: Folder, label: "Projects" },
    { id: "comments", icon: MessageSquare, label: "Comments" },
    { id: "contact", icon: Mail, label: "Contact" },
  ];

  // Close mobile menu on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute("href") ?? "";
    const targetId = href.slice(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const offset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }

    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray/80 backdrop-blur-lg ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center md:justify-center h-16 relative">
            {/* Mobile menu button - Absolute positioned on left */}
            <div className="md:hidden absolute left-0">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>

            {/* Desktop Navigation - Centered */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map(({ id, icon: Icon, label }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={handleNavClick}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeSection === id
                      ? "text-white bg-black"
                      : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "max-h-96" : "max-h-0"
          }`}
        >
          <div className="px-4 py-3 space-y-1 backdrop-blur-lg">
            {navItems.map(({ id, icon: Icon, label }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={handleNavClick}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  activeSection === id
                    ? "bg-black text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{label}</span>
                {activeSection === id && (
                  <div className="ml-auto w-2 h-2 backdrop-blur-lg rounded-full" />
                )}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Spacer */}
      <div className="h-16" />
    </>
  );
};

export default Navigation;

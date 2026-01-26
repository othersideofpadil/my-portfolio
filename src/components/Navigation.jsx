import { Home, GraduationCap, Folder, MessageSquare, Mail } from "lucide-react";

const Navigation = ({ activeSection }) => {
  const navItems = [
    { id: "about", icon: Home, label: "Home" },
    { id: "education", icon: GraduationCap, label: "Education" },
    { id: "projects", icon: Folder, label: "Projects" },
    { id: "comments", icon: MessageSquare, label: "Comments" },
    { id: "contact", icon: Mail, label: "Contact" },
  ];

  return (
    <nav className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 px-4 w-full max-w-md">
      <div className="bg-white/85 backdrop-blur-xl border border-gray-200 rounded-full px-6 py-4 flex justify-around items-center shadow-lg">
        {navItems.map(({ id, icon: Icon, label }) => (
          <a
            key={id}
            href={`#${id}`}
            className={`group relative p-3 rounded-full transition-all duration-300 ${
              activeSection === id
                ? "bg-black text-white shadow-lg"
                : "text-gray-600 hover:bg-gray-100 hover:text-black"
            }`}
          >
            <Icon className="w-6 h-6" />
            <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              {label}
            </span>
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;

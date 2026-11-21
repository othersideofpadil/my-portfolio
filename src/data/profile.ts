import { Github, Linkedin, Mail } from "lucide-react";

export const PROFILE = {
  name: "Muhammad Fadhillah",
  roles: ["Web Developer", "Frontend Developer", "Backend Developer"],
  email: "padilajalah88@gmail.com",
  githubHandle: "othersideofpadil",
  githubUrl: "https://github.com/othersideofpadil",
  linkedinUrl: "https://www.linkedin.com/in/muhammad-fadhillah-52bb73254",
  cv: {
    href: "/cv/Muhammad%20Fadhillah%20-%20CV.pdf",
    filename: "Muhammad-Fadhillah-CV.pdf",
  },
} as const;

export const contactLinks = [
  { icon: Mail, label: "Email", value: PROFILE.email, href: `mailto:${PROFILE.email}` },
  { icon: Github, label: "GitHub", value: `@${PROFILE.githubHandle}`, href: PROFILE.githubUrl },
  { icon: Linkedin, label: "LinkedIn", value: PROFILE.name, href: PROFILE.linkedinUrl },
];

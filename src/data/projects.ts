export type Project = {
  title: string;
  description: string;
  image: string;
  tags: string[];
  github: string | { frontend?: string; backend?: string };
};

export const projects: Project[] = [
  {
    title: "Personal Portfolio Website",
    description:
      "My personal portfolio website to showcase my projects and skills.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&h=600&fit=crop",
    tags: ["React", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    github: "https://github.com/othersideofpadil/my-portfolio",
  },
  {
    title: "Cureva - Homecare Physiotherapy",
    description:
      "A homecare physiotherapy service platform connecting patients with therapists.",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=900&h=600&fit=crop",
    tags: ["React", "Express", "Tailwind CSS", "MySQL"],
    github: {
      frontend: "https://github.com/othersideofpadil/front-end-cureva",
      backend: "https://github.com/othersideofpadil/back-end-cureva",
    },
  },
];

const REPO_LABELS = { frontend: "Frontend Repo", backend: "Backend Repo" } as const;

export const linksOf = ({ github }: Project) =>
  typeof github === "string"
    ? [{ label: "GitHub", href: github }]
    : (["frontend", "backend"] as const).flatMap((key) => {
        const href = github[key];
        return href ? [{ label: REPO_LABELS[key], href }] : [];
      });

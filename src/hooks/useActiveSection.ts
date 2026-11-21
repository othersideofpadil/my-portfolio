import { useEffect, useState } from "react";

/** Returns the id of the section currently crossing a thin band near the top of the viewport. */
export const useActiveSection = (ids: readonly string[]) => {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entering = entries.find((entry) => entry.isIntersecting);
        if (entering) setActive(entering.target.id);
      },
      { rootMargin: "-12% 0px -80% 0px" },
    );

    for (const id of ids) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, [ids]);

  return active;
};

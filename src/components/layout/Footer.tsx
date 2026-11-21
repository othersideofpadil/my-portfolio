import { ArrowUp } from "lucide-react";
import { PROFILE } from "../../data/profile";
import { scrollToTop } from "../../lib/scroll";
import { Button } from "../ui/button";

const Footer = () => (
  <footer className="border-t border-line py-8">
    <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-sm text-ink-mute sm:flex-row">
      <p>
        © {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
      </p>
      <Button variant="outline" size="sm" onClick={scrollToTop}>
        <ArrowUp aria-hidden />
        Back to top
      </Button>
    </div>
  </footer>
);

export default Footer;

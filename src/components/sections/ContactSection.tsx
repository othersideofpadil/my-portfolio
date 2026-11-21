import { motion } from "framer-motion";
import { contactLinks } from "../../data/profile";
import { reveal } from "../../lib/motion";
import { cn } from "../../lib/utils";
import ContactForm from "../contact/ContactForm";
import { cardVariants } from "../ui/card";
import Section from "./Section";

const ContactSection = () => (
  <Section id="contact" index="03" eyebrow="Get in touch" title="Let's Work Together" width="4xl">
    <div className="mb-8 grid grid-cols-1 gap-4 sm:mb-10 sm:grid-cols-2 sm:gap-6 md:mb-12 md:grid-cols-3">
      {contactLinks.map(({ icon: Icon, label, value, href }, index) => {
        const external = href.startsWith("http");
        return (
          <motion.a
            key={href}
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            {...reveal(index * 0.1)}
            className={cn(cardVariants({ interactive: true }), "group rounded-2xl p-4 text-center sm:p-6")}
          >
            <span className="mx-auto mb-4 grid size-14 place-items-center rounded-2xl bg-accent-soft transition-transform duration-300 group-hover:scale-105">
              <Icon className="size-7 text-ink-soft transition-colors group-hover:text-accent" aria-hidden />
            </span>
            <h3 className="mb-2 text-lg font-semibold text-ink">{label}</h3>
            <p className="text-sm break-all text-ink-soft">{value}</p>
          </motion.a>
        );
      })}
    </div>

    <ContactForm />
  </Section>
);

export default ContactSection;

import { useState } from "react";
import { Mail, Github, Linkedin, Send } from "lucide-react";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { sendEmail } from "../lib/emailjs";
import toast from "react-hot-toast";
import type { ChangeEvent, FormEvent } from "react";

type ContactFormData = {
  from_name: string;
  from_email: string;
  message: string;
};

const ContactSection = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    from_name: "",
    from_email: "",
    message: "",
  });
  const [sending, setSending] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validasi basic
    if (
      !formData.from_name.trim() ||
      !formData.from_email.trim() ||
      !formData.message.trim()
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    setSending(true);

    try {
      // Kirim email dengan semua parameter yang diperlukan
      await sendEmail({
        from_name: formData.from_name,
        from_email: formData.from_email,
        message: formData.message,
        to_email: import.meta.env.VITE_YOUR_EMAIL,
      });

      toast.success("Message sent successfully! I will get back to you soon.", {
        icon: "✉️",
        duration: 4000,
      });

      // Reset form
      setFormData({ from_name: "", from_email: "", message: "" });
    } catch (error: unknown) {
      console.error("Email error:", error);

      // Error handling yang lebih spesifik
      if (
        typeof error === "object" &&
        error !== null &&
        "text" in error &&
        typeof error.text === "string"
      ) {
        toast.error(`Failed to send: ${error.text}`);
      } else if (
        typeof error === "object" &&
        error !== null &&
        "status" in error &&
        error.status === 400
      ) {
        toast.error(
          "Invalid email configuration. Please contact the site owner.",
        );
      } else {
        toast.error(
          "Failed to send message. Please try emailing me directly at padilajalah88@gmail.com",
        );
      }
    } finally {
      setSending(false);
    }
  };

  const contactLinks = [
    {
      icon: Mail,
      label: "Email",
      value: "padilajalah88@gmail.com",
      href: "mailto:padilajalah88@gmail.com",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "@othersideofpadil",
      href: "https://github.com/othersideofpadil",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "Muhammad Fadhillah",
      href: "https://www.linkedin.com/in/muhammad-fadhillah-52bb73254",
    },
  ];

  return (
    <motion.section
      id="contact"
      className="py-12 sm:py-16 md:py-20 px-4"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-4xl mx-auto">
        <SectionHeading index="03" eyebrow="Get in touch" title="Let's Work Together" />

        {/* Contact Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10 md:mb-12">
          {contactLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <motion.a
                key={index}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  link.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="bg-[#FAFBFD] border border-[#D0D7DE] rounded-2xl p-4 sm:p-6 text-center hover:shadow-xl hover:shadow-blue-100 hover:border-[#0969DA] transition-all duration-300 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div
                  className="w-14 h-14 mx-auto mb-4 bg-[#E9EEF2] rounded-2xl flex items-center justify-center group-hover:bg-[#E9EEF2] group-hover:scale-105 transition-all duration-300"
                >
                  <Icon className="w-7 h-7 text-[#59636E] group-hover:text-[#0969DA]" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-[#1F2328]">
                  {link.label}
                </h3>
                <p className="text-[#59636E] text-sm break-all">{link.value}</p>
              </motion.a>
            );
          })}
        </div>

        {/* Contact Form */}
        <motion.div
          className="bg-[#FAFBFD] border border-[#D0D7DE] rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="from_name"
                className="block text-sm font-semibold mb-2 text-[#1F2328]"
              >
                Name <span className="text-red-500">*</span>
              </label>
              <input
                id="from_name"
                type="text"
                name="from_name"
                value={formData.from_name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#F4F6F8] border border-[#D0D7DE] rounded-xl focus:outline-none focus:border-[#0969DA] focus:ring-4 focus:ring-blue-100 focus:bg-[#FAFBFD] transition-all duration-300"
                placeholder="Your name"
                required
                disabled={sending}
              />
            </div>

            <div>
              <label
                htmlFor="from_email"
                className="block text-sm font-semibold mb-2 text-[#1F2328]"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="from_email"
                type="email"
                name="from_email"
                value={formData.from_email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#F4F6F8] border border-[#D0D7DE] rounded-xl focus:outline-none focus:border-[#0969DA] focus:ring-4 focus:ring-blue-100 focus:bg-[#FAFBFD] transition-all duration-300"
                placeholder="your@email.com"
                required
                disabled={sending}
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-semibold mb-2 text-[#1F2328]"
              >
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-3 bg-[#F4F6F8] border border-[#D0D7DE] rounded-xl focus:outline-none focus:border-[#0969DA] focus:ring-4 focus:ring-blue-100 focus:bg-[#FAFBFD] transition-all duration-300 resize-none"
                placeholder="Your message..."
                required
                disabled={sending}
              />
              <p className="text-xs text-[#59636E] mt-1">
                {formData.message.length} characters
              </p>
            </div>

            <button
              type="submit"
              disabled={sending}
              className="w-full px-8 py-4 bg-[#0969DA] text-[#FAFBFD] rounded-full font-semibold hover:bg-[#0550AE] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-95"
            >
              {sending ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Message
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ContactSection;

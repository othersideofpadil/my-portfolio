import { useState } from "react";
import { Mail, Github, Linkedin, Send } from "lucide-react";
import { motion } from "framer-motion";
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
      gradient: "from-gray-800 to-gray-600",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "@othersideofpadil",
      href: "https://github.com/othersideofpadil",
      gradient: "from-gray-700 to-gray-900",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "Muhammad Fadhillah",
      href: "https://www.linkedin.com/in/muhammad-fadhillah-52bb73254",
      gradient: "from-gray-800 to-gray-600",
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
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 md:mb-16 bg-linear-to-r from-black to-gray-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Let's Work Together!
        </motion.h2>

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
                className="bg-white border border-gray-300 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center hover:shadow-xl transition-all duration-300 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div
                  className={`w-16 h-16 mx-auto mb-4 bg-linear-to-br ${link.gradient} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-gray-900">
                  {link.label}
                </h3>
                <p className="text-gray-600 text-sm break-all">{link.value}</p>
              </motion.a>
            );
          })}
        </div>

        {/* Contact Form */}
        <motion.div
          className="bg-white border border-gray-300 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="from_name"
                className="block text-sm font-semibold mb-2 text-gray-900"
              >
                Name <span className="text-red-500">*</span>
              </label>
              <input
                id="from_name"
                type="text"
                name="from_name"
                value={formData.from_name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-gray-600 focus:bg-white transition-all duration-300"
                placeholder="Your name"
                required
                disabled={sending}
              />
            </div>

            <div>
              <label
                htmlFor="from_email"
                className="block text-sm font-semibold mb-2 text-gray-900"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="from_email"
                type="email"
                name="from_email"
                value={formData.from_email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-gray-600 focus:bg-white transition-all duration-300"
                placeholder="your@email.com"
                required
                disabled={sending}
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-semibold mb-2 text-gray-900"
              >
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-gray-600 focus:bg-white transition-all duration-300 resize-none"
                placeholder="Your message..."
                required
                disabled={sending}
              />
              <p className="text-xs text-gray-500 mt-1">
                {formData.message.length} characters
              </p>
            </div>

            <button
              type="submit"
              disabled={sending}
              className="w-full px-8 py-4 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-95"
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

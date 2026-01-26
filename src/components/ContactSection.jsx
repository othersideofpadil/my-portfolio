import { useState } from "react";
import { Mail, Github, Linkedin, Send } from "lucide-react";
import { sendEmail } from "../lib/emailjs";
import toast from "react-hot-toast";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    from_name: "",
    from_email: "",
    message: "",
  });
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    try {
      await sendEmail({
        ...formData,
        to_email: import.meta.env.VITE_YOUR_EMAIL,
      });

      toast.success("Message sent successfully! I will get back to you soon.");
      setFormData({ from_name: "", from_email: "", message: "" });
    } catch (error) {
      console.error("Email error:", error);
      toast.error(
        "Failed to send message. Please try again or email me directly.",
      );
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
      href: "https://www.linkedin.com/in/muhammad-fadhillah-52bb73254?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      gradient: "from-gray-800 to-gray-600",
    },
  ];

  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-linear-to-r from-black to-gray-600 bg-clip-text text-transparent">
          Let's Work Together!
        </h2>

        {/* Contact Links */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {contactLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <a
                key={index}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  link.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="bg-white border border-gray-300 rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div
                  className={`w-16 h-16 mx-auto mb-4 bg-linear-to-br ${link.gradient} rounded-full flex items-center justify-center`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-gray-900">
                  {link.label}
                </h3>
                <p className="text-gray-600 text-sm">{link.value}</p>
              </a>
            );
          })}
        </div>

        {/* Contact Form */}
        <div className="bg-white border border-gray-300 rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-900">
                Name
              </label>
              <input
                type="text"
                name="from_name"
                value={formData.from_name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-gray-600 focus:bg-white transition-all duration-300"
                placeholder="Your name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-900">
                Email
              </label>
              <input
                type="email"
                name="from_email"
                value={formData.from_email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-gray-600 focus:bg-white transition-all duration-300"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-900">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-gray-600 focus:bg-white transition-all duration-300 resize-none"
                placeholder="Your message..."
                required
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="w-full px-8 py-4 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
              {sending ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

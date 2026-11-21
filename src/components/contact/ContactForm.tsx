import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import toast from "react-hot-toast";
import { PROFILE } from "../../data/profile";
import { sendEmail } from "../../lib/emailjs";
import { reveal } from "../../lib/motion";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { cardVariants } from "../ui/card";
import { Input, Textarea } from "../ui/input";
import type { ChangeEvent, FormEvent, ReactNode } from "react";

type ContactFormData = {
  from_name: string;
  from_email: string;
  message: string;
};

const EMPTY_FORM: ContactFormData = { from_name: "", from_email: "", message: "" };

const getSendErrorMessage = (error: unknown) => {
  if (typeof error === "object" && error !== null) {
    if ("text" in error && typeof error.text === "string") return `Failed to send: ${error.text}`;
    if ("status" in error && error.status === 400) {
      return "Invalid email configuration. Please contact the site owner.";
    }
  }
  return `Failed to send message. Please try emailing me directly at ${PROFILE.email}`;
};

const Field = ({ id, label, children }: { id: string; label: string; children: ReactNode }) => (
  <div>
    <label htmlFor={id} className="mb-2 block text-sm font-semibold text-ink">
      {label} <span className="text-destructive">*</span>
    </label>
    {children}
  </div>
);

const ContactForm = () => {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [sending, setSending] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.values(formData).some((value) => !value.trim())) {
      toast.error("Please fill in all fields");
      return;
    }

    setSending(true);
    try {
      await sendEmail({ ...formData, to_email: import.meta.env.VITE_YOUR_EMAIL });
      toast.success("Message sent successfully! I will get back to you soon.", { icon: "✉️", duration: 4000 });
      setFormData(EMPTY_FORM);
    } catch (error: unknown) {
      console.error("Email error:", error);
      toast.error(getSendErrorMessage(error));
    } finally {
      setSending(false);
    }
  };

  return (
    <motion.form
      {...reveal(0.3)}
      onSubmit={handleSubmit}
      className={cn(cardVariants(), "space-y-6 rounded-2xl p-4 shadow-lg sm:p-6 md:p-8")}
    >
      <Field id="from_name" label="Name">
        <Input
          id="from_name"
          name="from_name"
          type="text"
          value={formData.from_name}
          onChange={handleChange}
          placeholder="Your name"
          autoComplete="name"
          required
          disabled={sending}
        />
      </Field>

      <Field id="from_email" label="Email">
        <Input
          id="from_email"
          name="from_email"
          type="email"
          value={formData.from_email}
          onChange={handleChange}
          placeholder="your@email.com"
          autoComplete="email"
          required
          disabled={sending}
        />
      </Field>

      <Field id="message" label="Message">
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          placeholder="Your message..."
          required
          disabled={sending}
        />
        <p className="mt-1 text-xs text-ink-soft tabular-nums">{formData.message.length} characters</p>
      </Field>

      <Button type="submit" size="lg" loading={sending} className="w-full py-4">
        {!sending && <Send aria-hidden />}
        {sending ? "Sending..." : "Send Message"}
      </Button>
    </motion.form>
  );
};

export default ContactForm;

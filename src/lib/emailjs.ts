import emailjs from "@emailjs/browser";

type EmailTemplateParams = {
  from_name: string;
  from_email: string;
  message: string;
  to_email: string;
};

export const sendEmail = async (templateParams: EmailTemplateParams) => {
  try {
    const response = await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      templateParams,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    );

    return response;
  } catch (error) {
    console.error("EmailJS Error:", error);
    throw error;
  }
};

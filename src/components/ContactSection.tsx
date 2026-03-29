import { motion } from "framer-motion";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react";
import { resumeData } from "@/data/resume";
import { SectionHeader } from "./ExperienceSection";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const { basics } = resumeData;
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const links = [
    { icon: Mail, label: basics.email, href: `mailto:${basics.email}` },
    { icon: Phone, label: basics.phone, href: `tel:${basics.phone}` },
    { icon: MapPin, label: basics.location, href: "#" },
    { icon: Github, label: "GitHub", href: basics.github },
    { icon: Linkedin, label: "LinkedIn", href: basics.linkedin },
  ];

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast({
        title: "Missing fields",
        description: "Please fill in all fields before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const subject = `[Contact] ${formData.name}`;
      const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`;
      const mailto = `mailto:${basics.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      window.location.href = mailto;
      setFormData({ name: "", email: "", message: "" });
      toast({
        title: "Ready to send",
        description: "Your message is now in your email client.",
      });
    } catch (error) {
      toast({
        title: "Unable to send",
        description: "Could not open your email client. Please copy your message manually.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding">
      <div className="max-w-4xl mx-auto text-center">
        <SectionHeader icon={<Mail size={20} />} title="Contact" subtitle="Let's Connect" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 glass p-8 max-w-lg mx-auto"
        >
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Send me a message</h3>
            <p className="text-sm text-muted-foreground">I’ll get back to you as soon as possible.</p>

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <label className="block">
                <span className="text-sm font-medium">Name</span>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-lg border border-stone-700 bg-black/40 p-3 text-white placeholder:text-white/40 outline-none transition focus:border-primary"
                  type="text"
                  placeholder="John Doe"
                  required
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium">Email</span>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-lg border border-stone-700 bg-black/40 p-3 text-white placeholder:text-white/40 outline-none transition focus:border-primary"
                  type="email"
                  placeholder="john@example.com"
                  required
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium">Message</span>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-1 h-32 w-full resize-none rounded-lg border border-stone-700 bg-black/40 p-3 text-white placeholder:text-white/40 outline-none transition focus:border-primary"
                  placeholder="Hello Nitin, I’d like to discuss..."
                  required
                />
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 px-4 py-2 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Submit Message"}
              </button>
            </form>

            <div className="border-t border-white/10 pt-4">
              <p className="text-sm text-muted-foreground">Or reach out via:</p>
              <div className="mt-3 space-y-2">
                {links.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Icon size={18} className="text-primary shrink-0" />
                    <span>{label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-xs text-muted-foreground"
        >
          © {new Date().getFullYear()} {basics.name}. Built with passion.
        </motion.p>
      </div>
    </section>
  );
};

export default ContactSection;

import { motion } from "framer-motion";
import { ArrowDown, Download, Github, Linkedin, Mail } from "lucide-react";
import { resumeData } from "@/data/resume";
import profileImg from "@/assets/profile.jpg";

const HeroSection = () => {
  const { basics } = resumeData;

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center section-padding pt-24"
    >
      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-[1fr_auto] gap-12 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2 }}
          >
            <p className="chip mb-4">Available for Opportunities</p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.1, duration: 0.6 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4"
          >
            {basics.name.split(" ").map((word, i) => (
              <span key={i}>
                {i === 0 ? (
                  <span className="text-gradient">{word} </span>
                ) : (
                  <span>{word} </span>
                )}
              </span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.3 }}
            className="text-lg sm:text-xl text-muted-foreground mb-2 font-mono"
          >
            {basics.title}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.4 }}
            className="text-muted-foreground max-w-lg mb-8 leading-relaxed"
          >
            {basics.summary}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5 }}
            className="flex flex-wrap gap-3 mb-8"
          >
            <button
              onClick={() => scrollTo("experience")}
              className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium flex items-center gap-2 hover:opacity-90 transition-opacity"
            >
              View Experience <ArrowDown size={16} />
            </button>
            <a
              href={basics.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg border border-border text-foreground font-medium flex items-center gap-2 hover:bg-secondary transition-colors"
            >
              <Download size={16} /> Download Resume
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.7 }}
            className="flex gap-3"
          >
            {[
              { icon: Github, href: basics.github, label: "GitHub" },
              { icon: Linkedin, href: basics.linkedin, label: "LinkedIn" },
              { icon: Mail, href: `mailto:${basics.email}`, label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
                aria-label={label}
              >
                <Icon size={18} />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Profile image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.2, duration: 0.6 }}
          className="hidden md:block"
        >
          <div className="relative">
            <div className="w-64 h-64 lg:w-72 lg:h-72 rounded-2xl overflow-hidden border-2 border-primary/30 glow-primary">
              <img
                src={profileImg}
                alt={basics.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-3 -right-3 w-64 h-64 lg:w-72 lg:h-72 rounded-2xl border border-primary/10 -z-10" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

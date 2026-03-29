import { motion } from "framer-motion";
import { Briefcase, ExternalLink } from "lucide-react";
import { resumeData } from "@/data/resume";
import { useState } from "react";

const ExperienceSection = () => {
  return (
    <section id="experience" className="section-padding">
      <div className="max-w-4xl mx-auto">
        <SectionHeader icon={<Briefcase size={20} />} title="Experience" subtitle="Internship & Professional Work" />

        <div className="space-y-6 mt-10">
          {resumeData.experience.map((exp, i) => (
            <ExperienceCard key={i} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ExperienceCard = ({
  exp,
  index,
}: {
  exp: (typeof resumeData.experience)[0];
  index: number;
}) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1 }}
      className="glass p-6 hover:border-primary/30 transition-colors cursor-pointer"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-start justify-between flex-wrap gap-2 mb-3">
        <div>
          <h3 className="text-lg font-semibold">{exp.role}</h3>
          <p className="text-primary font-mono text-sm">{exp.company}</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{exp.dates}</span>
          {exp.githubLink && (
            <a
              href={exp.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-primary hover:text-primary/80"
            >
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>

      {expanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <ul className="space-y-2 mb-4">
            {exp.bullets.map((b, j) => (
              <li key={j} className="flex gap-2 text-sm text-secondary-foreground">
                <span className="text-primary mt-1 shrink-0">▹</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-2">
            {exp.techStack.split(", ").map((tech) => (
              <span key={tech} className="chip text-xs">
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export const SectionHeader = ({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
  >
    <div className="flex items-center gap-3 mb-2">
      <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
        {icon}
      </div>
      <h2 className="text-2xl sm:text-3xl font-bold">{title}</h2>
    </div>
    <p className="text-muted-foreground text-sm ml-[52px]">{subtitle}</p>
  </motion.div>
);

export default ExperienceSection;

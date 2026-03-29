import { motion } from "framer-motion";
import { FolderOpen, ExternalLink } from "lucide-react";
import { resumeData } from "@/data/resume";
import { SectionHeader } from "./ExperienceSection";

const ProjectsSection = () => {
  return (
    <section id="projects" className="section-padding">
      <div className="max-w-4xl mx-auto">
        <SectionHeader icon={<FolderOpen size={20} />} title="Projects" subtitle="Things I've Built" />

        <div className="space-y-8 mt-10">
          {resumeData.projects.map((proj, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.15 }}
              className="glass p-6 hover:border-primary/30 transition-all hover:glow-primary"
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <span className="text-xs uppercase tracking-widest text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                    <div className="space-x-2">
                      {proj.githubLink && (
                        <a
                          href={proj.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-md border border-primary/40 px-3 py-1 text-xs font-medium text-primary hover:bg-primary/10"
                        >
                          <ExternalLink size={12} />
                          Repo
                        </a>
                      )}
                    </div>
                  </div>

                  <h3 className="mt-3 text-2xl font-bold text-white">{proj.title}</h3>
                  <p className="text-xs text-muted-foreground font-mono mt-1">{proj.date}</p>
                  <p className="mt-4 text-sm text-muted-foreground">{proj.summary ?? ""}</p>

                  <ul className="mt-4 space-y-2">
                    {proj.bullets.map((b, j) => (
                      <li key={j} className="flex gap-2 text-sm text-secondary-foreground">
                        <span className="text-primary mt-1 shrink-0">▹</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {proj.techStack.split(", ").map((t) => (
                      <span key={t} className="chip text-xs">{t.trim()}</span>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;

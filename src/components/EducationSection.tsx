import { motion } from "framer-motion";
import { GraduationCap, Award } from "lucide-react";
import { resumeData } from "@/data/resume";
import { SectionHeader } from "./ExperienceSection";

const EducationSection = () => {
  return (
    <section id="education" className="section-padding">
      <div className="max-w-4xl mx-auto">
        <SectionHeader icon={<GraduationCap size={20} />} title="Education" subtitle="Academic Background" />

        <div className="space-y-4 mt-10">
          {resumeData.education.map((edu, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div>
                <h3 className="font-semibold">{edu.institution}</h3>
                <p className="text-sm text-muted-foreground">{edu.degree}</p>
                <p className="text-sm text-primary font-mono">{edu.score}</p>
              </div>
              <div className="text-sm text-muted-foreground text-right">
                <p>{edu.dates}</p>
                <p>{edu.location}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certificates */}
        <div className="mt-16">
          <SectionHeader icon={<Award size={20} />} title="Certificates" subtitle="Professional Certifications" />

          <div className="grid sm:grid-cols-3 gap-4 mt-10">
            {resumeData.certificates.map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass p-5 text-center hover:border-primary/30 transition-colors"
              >
                <Award size={24} className="text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-sm">{cert.title}</h3>
                <p className="text-xs text-primary font-mono mt-1">{cert.issuer}</p>
                <p className="text-xs text-muted-foreground mt-1">{cert.date}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;

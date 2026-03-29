import { motion } from "framer-motion";
import { Code2, GitBranch, Github, Cloud, Database, Package, Zap, Code } from "lucide-react";
import { resumeData } from "@/data/resume";
import { SectionHeader } from "./ExperienceSection";

import { useMemo, useState } from "react";

const skillIconMap: Record<string, React.ReactNode> = {
  // Languages
  "C++": <Code size={24} className="text-primary" />,
  "Python": <Code2 size={24} className="text-primary" />,
  "C": <Code size={24} className="text-primary" />,
  "Java": <Code2 size={24} className="text-primary" />,
  "JavaScript": <Zap size={24} className="text-primary" />,
  "TypeScript": <Zap size={24} className="text-primary" />,
  
  // Tools
  "Git": <GitBranch size={24} className="text-primary" />,
  "GitHub": <Github size={24} className="text-primary" />,
  "AWS": <Cloud size={24} className="text-primary" />,
  "Azure": <Cloud size={24} className="text-primary" />,
  "Docker": <Package size={24} className="text-primary" />,
  "MongoDB": <Database size={24} className="text-primary" />,
  "MySQL": <Database size={24} className="text-primary" />,
  "MS SQL Server": <Database size={24} className="text-primary" />,
  "VS Code": <Code2 size={24} className="text-primary" />,
  "Linux": <Code2 size={24} className="text-primary" />,
  
  // Frameworks
  "React": <Zap size={24} className="text-primary" />,
  "Node.js": <Package size={24} className="text-primary" />,
  "Express": <Package size={24} className="text-primary" />,
};

const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = useMemo(
    () => ["All", ...resumeData.skills.map((group) => group.category)],
    []
  );

  const visibleSkills = useMemo(() => {
    if (activeCategory === "All") {
      return resumeData.skills.flatMap((group) => group.items);
    }
    const group = resumeData.skills.find((g) => g.category === activeCategory);
    return group ? group.items : [];
  }, [activeCategory]);

  return (
    <section id="skills" className="section-padding">
      <div className="max-w-4xl mx-auto">
        <SectionHeader icon={<Code2 size={20} />} title="Skills" subtitle="Technologies & Competencies" />

        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-lg px-4 py-2 text-xs font-medium transition ${
                activeCategory === category
                  ? "bg-primary text-background"
                  : "border border-border bg-background/20 text-muted-foreground hover:bg-background/40"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-8"
        >
          {visibleSkills.map((skill) => (
            <div key={skill} className="glass p-4 h-24 flex flex-col items-center justify-center text-center rounded-xl hover:border-primary/50 transition-all">
              <div className="mb-2">
                {skillIconMap[skill] || <Code2 size={24} className="text-primary" />}
              </div>
              <span className="text-xs font-medium">{skill}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;

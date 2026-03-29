import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { resumeData } from "@/data/resume";
import { SectionHeader } from "./ExperienceSection";
import { useEffect, useState, useRef } from "react";

const AnimatedCounter = ({ target, duration = 2000 }: { target: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            setCount(Math.floor(progress * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count}</span>;
};

const AchievementsSection = () => {
  return (
    <section id="achievements" className="section-padding">
      <div className="max-w-4xl mx-auto">
        <SectionHeader icon={<Trophy size={20} />} title="Achievements" subtitle="Competitions & Recognition" />

        {/* Top Impact Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 glass p-6 glow-primary"
        >
          <div className="flex items-center gap-2 mb-4">
            <Trophy size={16} className="text-primary" />
            <span className="text-sm font-medium text-primary uppercase tracking-wider">Top Impact</span>
          </div>

          {resumeData.achievements.map((a, i) => (
            <div key={i} className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="text-center sm:text-left">
                <div className="text-4xl sm:text-5xl font-bold text-primary font-mono">
                  #<AnimatedCounter target={parseInt(a.metric)} />
                </div>
                <p className="text-sm text-muted-foreground mt-1">{a.metricLabel}</p>
              </div>
              <div className="h-12 w-px bg-border hidden sm:block" />
              <div>
                <h3 className="text-lg font-semibold">{a.title}</h3>
                <p className="text-muted-foreground text-sm">{a.description}</p>
                <p className="text-xs text-muted-foreground font-mono mt-1">{a.date}</p>
                <div className="mt-2">
                  <span className="chip-accent">{a.totalParticipants} participants</span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default AchievementsSection;

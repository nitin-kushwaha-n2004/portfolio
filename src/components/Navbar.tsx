import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const sections = [
  { id: "hero", label: "Home" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "achievements", label: "Achievements" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

const Navbar = () => {
  const [active, setActive] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const offsets = sections.map((s) => {
        const el = document.getElementById(s.id);
        return { id: s.id, top: el?.offsetTop ?? 0 };
      });
      const current = offsets
        .filter((o) => o.top <= window.scrollY + 200)
        .pop();
      if (current) setActive(current.id);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ delay: 1.8, duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? "glass-strong shadow-lg shadow-background/50" : ""
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <button onClick={() => scrollTo("hero")} className="text-primary font-mono font-bold text-lg">
            NK
          </button>

          {/* Desktop */}
          <div className="hidden md:flex gap-1">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  active === s.id
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-foreground p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-16 left-0 right-0 z-30 glass-strong p-4 md:hidden"
          >
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={`block w-full text-left px-4 py-3 rounded-lg text-sm transition-colors ${
                  active === s.id
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground"
                }`}
              >
                {s.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll progress */}
      <ScrollProgress />
    </>
  );
};

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-16 left-0 right-0 z-30 h-0.5 bg-secondary/30">
      <div
        className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-100"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default Navbar;

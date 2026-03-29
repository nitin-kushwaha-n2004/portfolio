import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setShow(false);
            setTimeout(onComplete, 500);
          }, 200);
          return 100;
        }
        return p + 2;
      });
    }, 25);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* Monogram */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative mb-8"
          >
            <div className="w-20 h-20 rounded-2xl border-2 border-primary flex items-center justify-center glow-primary">
              <span className="text-3xl font-bold text-primary font-mono">
                NK
              </span>
            </div>
            <motion.div
              className="absolute inset-0 rounded-2xl border border-primary/30"
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          {/* Name */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-8"
          >
            Nitin Kumar Kushwaha
          </motion.p>

          {/* Progress bar */}
          <div className="w-48 h-0.5 bg-secondary rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;

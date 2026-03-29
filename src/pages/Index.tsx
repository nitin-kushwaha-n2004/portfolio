import { useState } from "react";
import AnimatedBackground from "@/components/AnimatedBackground";
import SplashScreen from "@/components/SplashScreen";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import AchievementsSection from "@/components/AchievementsSection";
import SkillsSection from "@/components/SkillsSection";
import EducationSection from "@/components/EducationSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  const [splashDone, setSplashDone] = useState(false);

  return (
    <>
      <AnimatedBackground />
      {!splashDone && <SplashScreen onComplete={() => setSplashDone(true)} />}
      {splashDone && (
        <>
          <Navbar />
          <main className="relative">
            <HeroSection />
            <ExperienceSection />
            <ProjectsSection />
            <AchievementsSection />
            <SkillsSection />
            <EducationSection />
            <ContactSection />
          </main>
        </>
      )}
    </>
  );
};

export default Index;

"use client";

import { useState } from "react";
import { projects } from "@/lib/data";
import GridLayout from "@/components/ui/GridLayout";
import ProjectCard from "@/components/ui/ProjectCard";
import FloatingModal from "@/components/ui/FloatingModal";
import NoiseOverlay from "@/components/ui/NoiseOverlay";
import LiquidFilter from "@/components/ui/LiquidFilter";
import SectionNavigator from "@/components/ui/SectionNavigator";

// AI Sections
import HeroAI from "@/components/sections/HeroAI";
import QuoteSection from "@/components/sections/QuoteSection";
import EducationSection from "@/components/sections/EducationSection";
import HorizontalExperience from "@/components/sections/HorizontalExperience";
import AchievementsSection from "@/components/sections/AchievementsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ContactSection from "@/components/sections/ContactSection";
// import SignatureFooter from "@/components/ui/SignatureFooter";
import OrbitalFooter from "@/components/ui/OrbitalFooter";

import { Project } from "@/types";

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <main className="min-h-screen bg-background relative selection:bg-accent selection:text-white">
      <NoiseOverlay />
      <LiquidFilter />
      <SectionNavigator />

      <div id="home">
        <HeroAI />
      </div>
      <div id="quote">
        <QuoteSection />
      </div>

      {/* Education Section - The Foundation */}
      <EducationSection />

      {/* Horizontal Experience Section - The Journey */}
      <div id="experience">
        <HorizontalExperience />
      </div>

      {/* Achievements Section - The Impact */}
      <AchievementsSection />

      {/* Skills Section - The Arsenal */}
      <div id="skills">
        <SkillsSection />
      </div>

      {/* Projects Gallery - The Proof */}
      <section id="projects" className="relative z-10 px-4 md:px-8 lg:px-20 mb-32 pt-24 bg-background">
        <h3 className="text-sm font-medium tracking-[0.2em] text-accent mb-12 uppercase text-center md:text-left">
          Selected Works
        </h3>
        <GridLayout
          items={projects}
          renderItem={(project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setSelectedProject(project)}
            />
          )}
        />
      </section>

      <div id="contact">
        <ContactSection />
      </div>

      {/* Signature Footer - Elegant Site Ending */}
      {/* To switch back to orbital: replace SignatureFooter with OrbitalFooter */}
      <OrbitalFooter />

      {/* Floating Modal */}
      <FloatingModal
        selectedProject={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </main>
  );
}

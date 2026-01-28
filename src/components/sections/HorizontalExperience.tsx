"use client";

import { motion, useTransform, useScroll, MotionValue } from "framer-motion";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";
import { ScrollShimmer } from "@/components/ui/MouseShimmer";

const experiences = [
  {
    id: "01",
    role: "AI Software Engineer",
    company: "*astTECS Unified Communication PVT LTD",
    period: "Nov 2024 - Present",
    desc: "Developing cutting-edge AI solutions for unified communication platforms, implementing machine learning models.",
    quote: "Innovation distinguishes between a leader and a follower."
  },
  {
    id: "02",
    role: "AI Trainer",
    company: "Sambhav Foundation",
    period: "Aug 2024 - Nov 2024",
    desc: "Mentored and trained individuals in AI and machine learning concepts, designed comprehensive curriculum.",
    quote: "Teaching is the one profession that creates all other professions."
  },
  {
    id: "03",
    role: "AI Internship",
    company: "Codsoft",
    period: "Aug 2023 - Sep 2023",
    desc: "Gained foundational experience in artificial intelligence and machine learning through practical projects.",
    quote: "Every expert was once a beginner."
  }
];

export default function HorizontalExperience() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // UNIFIED TIMING:
  // 0.00 -> 0.75: Horizontal Scroll (Pan to make Card 3 Center)
  // 0.75: Card 3 finishes border glow
  // 0.75 -> 1.00: Vertical Drop + Camera Follow (Y-shift)
  const x = useTransform(scrollYProgress, [0, 0.75], ["0%", "-62%"]);

  // Camera moves smoothly WITH the drop
  const y = useTransform(scrollYProgress, [0.75, 1], ["0vh", "-100vh"]);

  return (
    <section id="experience" ref={targetRef} className="relative bg-background">
      {/* --- DESKTOP VIEW (Horizontal Scroll) --- */}
      {/* Kept height here to ensure proper scroll tracking only on desktop */}
      <div className="hidden md:block h-[600vh]">
        <div className="sticky top-0 left-0 h-screen w-full flex items-center overflow-hidden">

          {/* Main Moving Track */}
          <motion.div
            style={{ x, y }}
            className="flex items-center pl-[10vw] relative h-full"
          >
            {/* Title Section */}
            <div className="flex-shrink-0 w-[450px] md:w-[500px] relative z-20 pr-12 flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-[2px] bg-accent" />
                <span className="text-accent uppercase tracking-widest text-sm font-medium">Powering Up</span>
              </div>
              <h2 className="text-6xl md:text-8xl font-serif text-foreground leading-none mb-6">
                Career <br /> <span className="text-accent italic">Journey</span>
              </h2>
              <p className="text-muted text-xl max-w-sm">
                A high-voltage journey through AI innovation.
              </p>
            </div>

            {/* Spacer before first card */}
            <div className="w-[15vw] shrink-0" />

            {/* Experience Cards */}
            <div className="flex items-center gap-[30vw] relative z-10">
              {experiences.map((exp, i) => (
                <ExperienceCard
                  key={exp.id}
                  exp={exp}
                  index={i}
                  scrollYProgress={scrollYProgress}
                  isLast={i === experiences.length - 1}
                />
              ))}
            </div>

            {/* Extra space at end */}
            <div className="w-[20vw] shrink-0" />
          </motion.div>
        </div>
      </div>

      {/* --- MOBILE VIEW (Vertical Stack) --- */}
      <div className="md:hidden flex flex-col px-6 py-24 gap-16 min-h-screen">
        {/* Mobile Title */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[2px] bg-accent" />
            <span className="text-accent uppercase tracking-widest text-xs font-medium">Powering Up</span>
          </div>
          <h2 className="text-5xl font-serif text-foreground leading-none mb-4">
            Career <br /> <span className="text-accent italic">Circuit</span>
          </h2>
        </div>

        {/* Mobile Cards */}
        <div className="flex flex-col gap-12">
          {experiences.map((exp) => (
            <div key={exp.id} className="relative">
              {/* Simplistic Vertical Connector Line */}
              <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-accent/20 -translate-x-4"></div>

              <div className="bg-card/50 border border-accent/10 p-8 rounded-3xl relative overflow-hidden">
                <div className="flex justify-between items-start mb-6">
                  <span className="text-5xl font-serif font-bold text-accent/10 select-none">
                    {exp.id}
                  </span>
                  <span className="px-3 py-1 rounded-full border border-accent/20 text-accent text-[10px] uppercase tracking-widest bg-accent/5">
                    {exp.period}
                  </span>
                </div>

                <h3 className="text-2xl font-serif font-medium text-foreground mb-2 leading-tight">
                  {exp.role}
                </h3>
                <p className="text-lg text-accent mb-4 font-light italic">{exp.company}</p>

                <p className="text-sm text-muted/90 leading-relaxed mb-6">
                  {exp.desc}
                </p>

                <div className="pt-6 border-t border-accent/10">
                  <p className="text-xs italic text-muted/70 font-medium">
                    "{exp.quote}"
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({ exp, index, scrollYProgress, isLast }: { exp: any, index: number, scrollYProgress: MotionValue<number>, isLast: boolean }) {
  // Sync activation to finish right at 0.75 for the last card
  // Card 1 & 2 shifted EARLIER to ensure full activation at center
  // Card 1: 0.05 -> 0.20 (Fully active quickly)
  // Card 2: 0.30 -> 0.45 (Fully active quickly)
  // Card 3: 0.60 -> 0.75 (Keeps perfect sync with drop)

  const startPoints = [0.02, 0.25, 0.60];
  const endPoints = [0.10, 0.40, 0.70];

  const start = startPoints[index];
  const end = endPoints[index];

  const isActive = useTransform(scrollYProgress, [start, end], [0.3, 1]);
  const filter = useTransform(scrollYProgress, [start, end], ["grayscale(100%) brightness(0.7)", "grayscale(0%) brightness(1)"]);
  const scale = useTransform(scrollYProgress, [start, end], [0.95, 1]);

  // SVG Path logic
  // M 0 250 (Left Middle)
  const pathData = "M 0 250 L 0 40 Q 0 0 40 0 L 510 0 Q 550 0 550 40 L 550 460 Q 550 500 510 500 L 40 500 Q 0 500 0 460 L 0 250 Z";

  return (
    <div className="relative group">
      {/* --- BORDER CIRCUIT FLOW (SVG) --- */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <svg className="w-full h-full overflow-visible" viewBox="0 0 550 500" preserveAspectRatio="none">
          {/* Static Background Track */}
          <path
            d={pathData}
            className="fill-none stroke-accent/5 stroke-[1px]"
          />

          {/* Glowing Beam - Starts at Left Center (M 0 250) */}
          <motion.path
            d={pathData}
            className="fill-none stroke-accent stroke-[3px]"
            style={{
              pathLength: useTransform(scrollYProgress, [start, end], [0, 1]),
              filter: "drop-shadow(0 0 10px rgba(201,169,97,0.8))",
            }}
          />
          <motion.path
            d={pathData}
            className="fill-none stroke-accent/30 stroke-[6px]"
            style={{
              pathLength: useTransform(scrollYProgress, [start, end], [0, 1]),
              filter: "blur(6px)",
            }}
          />
        </svg>
      </div>

      {/* --- INCOMING CONNECTOR LINE --- */}
      <div className="absolute top-1/2 -left-[30vw] w-[30vw] h-[2px] -translate-y-1/2 z-0 hidden md:block">
        <div className="absolute inset-0 bg-accent/10" />
        {/* Beam coming from previous card or title */}
        <motion.div
          className="absolute inset-0 bg-accent shadow-[0_0_20px_rgba(201,169,97,0.9)]"
          style={{
            scaleX: useTransform(scrollYProgress, [index === 0 ? 0 : endPoints[index - 1], start], [0, 1]),
            originX: 0
          }}
        />
      </div>

      {/* Card Body - Now with scroll-based shimmer effect */}
      <motion.div
        style={{ opacity: isActive, filter, scale }}
        className="relative"
      >
        <ScrollShimmer
          className="w-[450px] md:w-[550px] min-h-[500px] border border-transparent p-10 md:p-14 rounded-[2.5rem] transition-all duration-500 flex flex-col justify-between"
          scrollProgress={scrollYProgress}
          activationRange={[start, end + 0.3]}
        >
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-10">
              <span className="text-7xl font-serif font-bold text-accent/10 select-none">
                {exp.id}
              </span>
              <span className="px-5 py-2 rounded-full border border-accent/20 text-accent text-xs uppercase tracking-widest bg-accent/5">
                {exp.period}
              </span>
            </div>

            <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-foreground mb-4 leading-tight">
              {exp.role}
            </h3>
            <p className="text-xl md:text-2xl text-accent mb-8 font-light italic">{exp.company}</p>

            <p className="text-base md:text-lg text-muted/90 leading-relaxed mb-4">
              {exp.desc}
            </p>
          </div>

          <div className="pt-10 border-t border-accent/10 relative z-10">
            <p className="text-sm md:text-base italic text-muted/70 font-medium leading-relaxed">
              "{exp.quote}"
            </p>
          </div>

          {/* Glow fill when active
          <motion.div
            className="absolute inset-0 bg-[radial-gradient(circle_at_left_center,rgba(192,192,192,0.04)_0%,transparent_70%)] pointer-events-none rounded-[2.5rem]"
            style={{ opacity: useTransform(scrollYProgress, [start, end], [0, 1]) }}
          /> */}
        </ScrollShimmer>
      </motion.div>

      {/* FIXED VERTICAL EXIT: Starts exactly at the bottom border */}
      {isLast ? (
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-[2px] h-[100vh] z-0">
          <div className="absolute inset-0 bg-accent/10" />
          <motion.div
            className="absolute inset-0 bg-accent shadow-[0_0_20px_rgba(201,169,97,1)]"
            style={{
              scaleY: useTransform(scrollYProgress, [end, 1], [0, 1]),
              originY: 0
            }}
          />
          {/* Arrow Head instead of dot */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 text-accent"
            style={{
              top: useTransform(scrollYProgress, [end, 1], ["0%", "100%"]),
              opacity: useTransform(scrollYProgress, [end, end + 0.05], [0, 1]),
              filter: "drop-shadow(0 0 10px rgba(201,169,97,1))"
            }}
          >
            <ChevronDown size={32} strokeWidth={3} />
          </motion.div>
        </div>
      ) : null}
    </div>
  )
}

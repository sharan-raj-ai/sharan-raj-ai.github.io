"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Award, BookOpen } from "lucide-react";

const educationItems = [
    {
        id: "01",
        title: "B.E. in Artificial Intelligence & Machine Learning",
        institution: "AMC Engineering College, Bangalore",
        period: "2020 - 2024",
        achievement: "First Class with Distinction",
        details: "CGPA: 7.97/10",
        icon: GraduationCap,
    },
    {
        id: "02",
        title: "Machine Learning Specialization",
        institution: "Stanford University (Coursera)",
        period: "2024",
        achievement: "Andrew Ng's 3-Course Certification",
        details: "Supervised Learning, Advanced Algorithms, Unsupervised Learning",
        icon: Award,
    },
    {
        id: "03",
        title: "Pre-University (PCMB)",
        institution: "St. Joseph's Indian Composite PU College",
        period: "2018 - 2020",
        achievement: "Science Stream",
        details: "Physics, Chemistry, Mathematics, Biology",
        icon: BookOpen,
    },
];

export default function EducationSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    // The dot position travels from 0% to 100% of the timeline
    const dotPosition = useTransform(scrollYProgress, [0.15, 0.85], ["0%", "100%"]);

    return (
        <section id="education" ref={sectionRef} className="py-32 relative z-10 w-full bg-background overflow-hidden">
            {/* Background gradient */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: `radial-gradient(ellipse 80% 50% at 50% 0%, rgba(201, 169, 97, 0.03) 0%, transparent 70%)`
                }}
            />

            <div className="max-w-7xl mx-auto px-4 md:px-8 relative">
                {/* Header */}
                <div className="mb-20">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-4 mb-6"
                    >
                        <div className="h-px w-12 bg-accent/40" />
                        <p className="text-xs font-semibold tracking-[0.3em] text-accent uppercase">
                            The Foundation
                        </p>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-6xl md:text-8xl font-serif text-foreground leading-none"
                    >
                        Where It <br /><span className="text-accent italic">Began</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-muted text-lg mt-6 max-w-2xl"
                    >
                        A formal education in AI/ML combined with world-class online certifications
                        laid the groundwork for building production-grade intelligent systems.
                    </motion.p>
                </div>

                {/* Vertical Timeline */}
                <div className="relative">
                    {/* Timeline Track (Desktop Only) */}
                    <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 hidden md:block">
                        {/* Static background line */}
                        <div className="absolute inset-0 bg-accent/10" />
                        {/* Glowing animated line that grows */}
                        <motion.div
                            className="absolute top-0 left-0 w-full bg-accent"
                            style={{
                                height: useTransform(scrollYProgress, [0.1, 0.85], ["0%", "100%"]),
                                boxShadow: "0 0 15px rgba(201,169,97,0.8)",
                                originY: 0
                            }}
                        />
                    </div>

                    {/* Single Traveling Dot (Desktop Only) */}
                    <motion.div
                        className="absolute left-1/2 w-5 h-5 rounded-full -translate-x-1/2 hidden md:flex items-center justify-center z-20"
                        style={{
                            top: dotPosition,
                            backgroundColor: "rgb(201,169,97)",
                            boxShadow: "0 0 20px rgba(201,169,97,1), 0 0 40px rgba(201,169,97,0.5)",
                        }}
                    >
                        {/* Inner glow */}
                        <div className="w-2 h-2 rounded-full bg-white/50" />
                    </motion.div>

                    <div className="space-y-12 md:space-y-24">
                        {educationItems.map((item, idx) => (
                            <EducationCard
                                key={item.id}
                                item={item}
                                index={idx}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function EducationCard({ item, index }: {
    item: typeof educationItems[0],
    index: number
}) {
    const Icon = item.icon;
    const isEven = index % 2 === 0;
    const cardRef = useRef<HTMLDivElement>(null);

    // Card-specific scroll tracking for animations
    const { scrollYProgress: cardProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "center center"]
    });

    // Glare/shimmer position synced to scroll
    const glarePosition = useTransform(cardProgress, [0, 1], ["-100%", "200%"]);
    const glareOpacity = useTransform(cardProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

    // SVG border path animation
    const pathLength = useTransform(cardProgress, [0, 0.8], [0, 1]);

    // Accent color for glare
    const accentGlare = "rgba(201, 169, 97, 0.08)";

    // Card path (rounded rectangle)
    const pathData = "M 20 0 L 380 0 Q 400 0 400 20 L 400 280 Q 400 300 380 300 L 20 300 Q 0 300 0 280 L 0 20 Q 0 0 20 0 Z";

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={`relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16`}
        >
            {/* Card */}
            <div className={`${isEven ? 'md:text-right md:pr-16' : 'md:col-start-2 md:pl-16'}`}>
                <div className="relative bg-card/60 border border-accent/10 rounded-2xl p-8 hover:border-accent/30 transition-all duration-500 group overflow-hidden">

                    {/* SVG Glowing Border */}
                    <svg
                        className="absolute inset-0 w-full h-full pointer-events-none z-20"
                        viewBox="0 0 400 300"
                        preserveAspectRatio="none"
                    >
                        {/* Static track */}
                        <path d={pathData} className="fill-none stroke-accent/5 stroke-[1px]" />
                        {/* Glowing animated path */}
                        <motion.path
                            d={pathData}
                            className="fill-none stroke-accent stroke-[2px]"
                            style={{
                                pathLength,
                                filter: "drop-shadow(0 0 8px rgba(201,169,97,0.8))"
                            }}
                        />
                    </svg>

                    {/* Shimmer/Glare Effect */}
                    <motion.div
                        className="absolute inset-0 pointer-events-none z-10"
                        style={{
                            background: `linear-gradient(-45deg,
                                transparent 45%,
                                ${accentGlare} 49%,
                                ${accentGlare} 51%,
                                transparent 55%)`,
                            backgroundSize: "200% 200%",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: useTransform(glarePosition, (pos) => `${pos} ${pos}`),
                            opacity: glareOpacity,
                        }}
                    />

                    {/* Dark gradient base */}
                    <div
                        className="absolute inset-0 pointer-events-none z-0 rounded-2xl"
                        style={{
                            background: `linear-gradient(155deg, rgba(42, 42, 42, 0.5) 0%, rgba(28, 28, 28, 0.8) 100%)`
                        }}
                    />

                    {/* Content */}
                    <div className="relative z-30">
                        {/* Icon and Period */}
                        <div className={`flex items-center gap-4 mb-6 ${isEven ? 'md:justify-end' : ''}`}>
                            <motion.div
                                className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center transition-colors"
                                style={{
                                    backgroundColor: useTransform(cardProgress, [0, 0.5], ["rgba(201,169,97,0.1)", "rgba(201,169,97,0.2)"])
                                }}
                            >
                                <Icon className="w-6 h-6 text-accent" />
                            </motion.div>
                            <span className="px-4 py-1.5 rounded-full border border-accent/20 text-accent text-xs uppercase tracking-widest bg-accent/5">
                                {item.period}
                            </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl md:text-3xl font-serif font-medium text-foreground mb-2 group-hover:text-accent transition-colors">
                            {item.title}
                        </h3>

                        {/* Institution */}
                        <p className="text-lg text-accent/80 mb-4 font-light italic">
                            {item.institution}
                        </p>

                        {/* Achievement Badge */}
                        <div className="inline-block px-4 py-2 bg-accent/10 rounded-lg mb-4">
                            <span className="text-sm font-medium text-accent">
                                {item.achievement}
                            </span>
                        </div>

                        {/* Details */}
                        <p className="text-muted text-sm leading-relaxed">
                            {item.details}
                        </p>
                    </div>
                </div>
            </div>

            {/* Empty space for timeline layout */}
            {isEven && <div className="hidden md:block" />}
        </motion.div>
    );
}

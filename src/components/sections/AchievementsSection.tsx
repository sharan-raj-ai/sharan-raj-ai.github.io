"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Phone, Users, Trophy, ExternalLink, Award, Star, Sparkles } from "lucide-react";
import Image from "next/image";

const achievements = [
    {
        id: "01",
        metric: "90",
        unit: "Channels",
        title: "Concurrent Voice Capacity",
        description: "Production-grade multilingual voicebot handling 90 concurrent calls with real-time STT/TTS processing on completely local infrastructure.",
        icon: Phone,
    },
    {
        id: "02",
        metric: "40-50",
        unit: "% Reduction",
        title: "Workforce Optimization",
        description: "Delivered measurable business impact through intelligent automation, reducing manual workload by 40-50% while improving response times.",
        icon: Users,
    },
    {
        id: "03",
        metric: "1st",
        unit: "in India",
        title: "MCP + IP-PBX Integration",
        description: "Pioneered India's first Model Context Protocol server integration with IP-PBX systems for agentic AI voice announcements.",
        icon: Trophy,
        link: "https://timestech.in/asttecs-launches-next-gen-pa-speakers-with-mcp-server-for-agentic-ai-giving-ai-a-real-voice/",
        linkText: "Featured in TimesTech",
    },
    {
        id: "04",
        metric: "★",
        unit: "2026",
        title: "Star Performer — AI Team",
        description: "Recognized as Star Performer in the AI Team for exceptional contributions to production AI systems, innovation in voice AI infrastructure, and consistent delivery of high-impact solutions.",
        icon: Award,
        badge: "May 2026",
        link: "https://asttecs.com/pdf/astTECS_Annual_Magazine_2026.pdf",
        linkText: "Featured in astTECS Annual Magazine 2026 — Pg 17",
    },
];

function AnimatedNumber({ value, inView }: { value: string, inView: boolean }) {
    const [displayValue, setDisplayValue] = useState("0");

    useEffect(() => {
        if (!inView) return;

        // Handle non-numeric or special values
        if (value === "★" || value.includes("-") || value.includes("st") || value.includes("nd") || value.includes("rd") || value.includes("th")) {
            setDisplayValue(value);
            return;
        }

        const target = parseInt(value);
        if (isNaN(target)) {
            setDisplayValue(value);
            return;
        }

        const duration = 2000;
        const steps = 60;
        const increment = target / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                setDisplayValue(value);
                clearInterval(timer);
            } else {
                setDisplayValue(Math.floor(current).toString());
            }
        }, duration / steps);

        return () => clearInterval(timer);
    }, [value, inView]);

    return <span>{displayValue}</span>;
}

export default function AchievementsSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="achievements" className="py-32 relative z-10 w-full bg-background overflow-hidden">
            {/* Background gradient */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: `radial-gradient(ellipse 60% 40% at 50% 50%, rgba(201, 169, 97, 0.05) 0%, transparent 70%)`
                }}
            />

            <div className="max-w-7xl mx-auto px-4 md:px-8 relative" ref={ref}>
                {/* Header */}
                <div className="mb-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center justify-center gap-4 mb-6"
                    >
                        <div className="h-px w-12 bg-accent/40" />
                        <p className="text-xs font-semibold tracking-[0.3em] text-accent uppercase">
                            Impact & Recognition
                        </p>
                        <div className="h-px w-12 bg-accent/40" />
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-6xl md:text-8xl font-serif text-foreground leading-none"
                    >
                        Real-World <br /><span className="text-accent italic">Results</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-muted text-lg mt-6 max-w-2xl mx-auto"
                    >
                        Measurable results from production deployments. Numbers that came from real systems, not demos.
                    </motion.p>
                </div>

                {/* ── Award Spotlight Banner ── */}
                <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.97 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="mb-12 relative group"
                >
                    <div className="relative overflow-hidden rounded-3xl border border-accent/20 hover:border-accent/40 transition-all duration-700"
                        style={{
                            background: `linear-gradient(135deg, rgba(201, 169, 97, 0.08) 0%, rgba(28, 28, 28, 0.9) 40%, rgba(28, 28, 28, 0.95) 60%, rgba(201, 169, 97, 0.05) 100%)`
                        }}
                    >
                        {/* Animated shimmer overlay */}
                        <div
                            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                            style={{
                                background: `linear-gradient(105deg, transparent 40%, rgba(201, 169, 97, 0.06) 45%, rgba(201, 169, 97, 0.1) 50%, rgba(201, 169, 97, 0.06) 55%, transparent 60%)`,
                                backgroundSize: "200% 100%",
                                animation: "shimmer 3s ease-in-out infinite",
                            }}
                        />

                        {/* Subtle glow orb */}
                        <div
                            className="absolute -top-20 -right-20 w-60 h-60 rounded-full pointer-events-none"
                            style={{
                                background: "radial-gradient(circle, rgba(201, 169, 97, 0.12) 0%, transparent 70%)",
                            }}
                        />

                        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 md:gap-10 p-8 md:p-10">
                            {/* Magazine Page Image */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
                                className="flex-shrink-0 relative"
                            >
                                <a
                                    href="https://asttecs.com/pdf/astTECS_Annual_Magazine_2026.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block relative group/img"
                                >
                                    <div className="relative w-48 md:w-56 rounded-2xl overflow-hidden border-2 border-accent/20 group-hover/img:border-accent/50 transition-all duration-500 shadow-lg shadow-black/30">
                                        <Image
                                            src="/awards/star-performer-magazine.png"
                                            alt="Star Performer Award - astTECS Annual Magazine 2026, Page 17"
                                            width={500}
                                            height={700}
                                            className="w-full h-auto group-hover/img:scale-105 transition-transform duration-500"
                                        />
                                        {/* Hover overlay */}
                                        <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                                            <ExternalLink className="w-6 h-6 text-white opacity-0 group-hover/img:opacity-100 transition-opacity duration-300" />
                                        </div>
                                    </div>
                                    {/* Caption */}
                                    <p className="text-center text-[10px] text-muted mt-2 tracking-wide uppercase">
                                        astTECS Annual Magazine 2026 — Pg 17
                                    </p>
                                </a>
                                {/* Sparkle accents around the image */}
                                <Sparkles className="absolute -top-3 -right-3 w-5 h-5 text-accent/60 animate-pulse" />
                                <Star className="absolute -bottom-2 -left-2 w-4 h-4 text-accent/40 animate-pulse" style={{ animationDelay: "0.5s" }} />
                            </motion.div>

                            {/* Content */}
                            <div className="flex-1 text-center lg:text-left">
                                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-3">
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] border border-accent/30 text-accent bg-accent/10">
                                        <Star className="w-3 h-3" />
                                        Employee Award
                                    </span>
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.15em] border border-emerald-500/30 text-emerald-400 bg-emerald-500/10">
                                        FY 2025–26
                                    </span>
                                </div>

                                <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif font-medium text-foreground mb-2 group-hover:text-accent transition-colors duration-500">
                                    Star Performer
                                </h3>
                                <p className="text-accent/70 text-base md:text-lg font-light italic mb-4">
                                    AI Team — *astTECS Communication Pvt. Ltd.
                                </p>
                                <p className="text-muted text-sm md:text-base leading-relaxed max-w-2xl mb-5">
                                    Recognized for exceptional contributions to production AI systems — including building a 90-channel multilingual voicebot,
                                    pioneering India&apos;s first MCP + IP-PBX integration, and delivering 40-50% workforce optimization through intelligent automation.
                                </p>

                                {/* PDF Link */}
                                <a
                                    href="https://asttecs.com/pdf/astTECS_Annual_Magazine_2026.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors text-sm font-medium"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                    <span className="underline underline-offset-4">View in astTECS Annual Magazine 2026</span>
                                </a>
                            </div>

                            {/* Decorative star cluster (desktop) */}
                            <div className="hidden xl:flex flex-col items-center gap-2 flex-shrink-0 opacity-40">
                                <Star className="w-6 h-6 text-accent" />
                                <Star className="w-4 h-4 text-accent/70" />
                                <Star className="w-3 h-3 text-accent/50" />
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Achievement Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {achievements.map((achievement, idx) => {
                        const Icon = achievement.icon;

                        return (
                            <motion.div
                                key={achievement.id}
                                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.15 }}
                                className="group relative"
                            >
                                <div className="relative h-full bg-card/60 border border-accent/10 rounded-3xl p-8 hover:border-accent/30 transition-all duration-500 overflow-hidden">
                                    {/* Glow effect */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    {/* Icon + Badge Row */}
                                    <div className="relative z-10 flex items-center gap-3 mb-6">
                                        <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                                            <Icon className="w-7 h-7 text-accent" />
                                        </div>
                                        {achievement.badge && (
                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider border border-emerald-500/30 text-emerald-400 bg-emerald-500/10">
                                                <Sparkles className="w-3 h-3" />
                                                New
                                            </span>
                                        )}
                                    </div>

                                    {/* Big Number */}
                                    <div className="relative z-10 mb-4">
                                        <span className="text-6xl md:text-7xl font-serif font-bold text-accent leading-none">
                                            <AnimatedNumber value={achievement.metric} inView={isInView} />
                                        </span>
                                        <span className="text-xl md:text-2xl text-accent/60 ml-2 font-light">
                                            {achievement.unit}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h3 className="relative z-10 text-xl font-serif font-medium text-foreground mb-3 group-hover:text-accent transition-colors">
                                        {achievement.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="relative z-10 text-muted text-sm leading-relaxed mb-4">
                                        {achievement.description}
                                    </p>

                                    {/* External Link (if exists) */}
                                    {achievement.link && (
                                        <a
                                            href={achievement.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="relative z-10 inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors text-sm font-medium group/link"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                            <span className="underline underline-offset-4">{achievement.linkText}</span>
                                        </a>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

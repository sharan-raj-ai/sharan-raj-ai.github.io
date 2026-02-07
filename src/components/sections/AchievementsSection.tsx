"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Phone, Users, Trophy, ExternalLink } from "lucide-react";

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
];

function AnimatedNumber({ value, inView }: { value: string, inView: boolean }) {
    const [displayValue, setDisplayValue] = useState("0");

    useEffect(() => {
        if (!inView) return;

        // Handle non-numeric values like "1st" or "40-50"
        if (value.includes("-") || value.includes("st") || value.includes("nd") || value.includes("rd") || value.includes("th")) {
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
                            The Impact
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
                        Where theory meets production. Measurable outcomes that transformed
                        enterprise communication at scale.
                    </motion.p>
                </div>

                {/* Achievement Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

                                    {/* Icon */}
                                    <div className="relative z-10 w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                                        <Icon className="w-7 h-7 text-accent" />
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

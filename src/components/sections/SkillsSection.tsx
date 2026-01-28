"use client";

import { motion } from "framer-motion";

const skillCategories = [
    {
        title: "AI & ML",
        skills: ["Python", "MCP", "Agentic AI", "Generative AI", "Conversational AI"],
    },
    {
        title: "Data Science",
        skills: ["NumPy", "Pandas", "scikit-learn", "OpenCV", "Matplotlib"],
    },
    {
        title: "Tools & Frameworks",
        skills: ["LangChain", "LangGraph", "Transformers", "TensorFlow", "HuggingFace"],
    }
];

export default function SkillsSection() {
    return (
        <section id="skills" className="py-32 relative z-10 w-full bg-background overflow-hidden">
            {/* Subtle gradient glow in background */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: `radial-gradient(ellipse 80% 50% at 50% 50%, rgba(192, 192, 192, 0.03) 0%, transparent 70%)`
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
                            Technical Arsenal
                        </p>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-6xl md:text-8xl font-serif text-foreground leading-none"
                    >
                        Tools of the <br /><span className="text-accent italic">Machine</span>
                    </motion.h2>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skillCategories.map((category, idx) => (
                        <motion.div
                            key={category.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="relative group bg-card/60 border border-accent/10 rounded-2xl p-8 hover:border-accent/20 transition-all duration-500"
                        >
                            {/* Icon & Title */}
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-2xl font-serif font-medium text-foreground group-hover:text-accent transition-colors">
                                    {category.title}
                                </h3>
                            </div>

                            {/* Skills List */}
                            <div className="space-y-4">
                                {category.skills.map((skill, i) => (
                                    <motion.div
                                        key={skill}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 + i * 0.05 }}
                                        className="flex items-center justify-between group/skill"
                                    >
                                        <span className="text-foreground/70 group-hover/skill:text-foreground transition-colors font-medium text-sm tracking-wide">
                                            {skill}
                                        </span>
                                        <div className="w-1 h-1 rounded-full bg-accent/20 group-hover/skill:bg-accent transition-colors" />
                                    </motion.div>
                                ))}
                            </div>

                            {/* Corner Decoration */}
                            <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-20 transition-opacity">
                                <div className="w-8 h-8 border-t border-r border-accent" />
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}

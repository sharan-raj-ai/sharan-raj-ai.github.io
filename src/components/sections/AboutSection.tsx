"use client";

import { motion } from "framer-motion";

export default function AboutSection() {
    return (
        <section className="py-24 md:py-40 relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* Left: Typography */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-5xl md:text-7xl font-serif font-light leading-tight text-foreground">
                        Building <br /> <span className="italic text-accent">AI</span> <br /> Systems.
                    </h2>
                </motion.div>

                {/* Right: Bio */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="space-y-6 text-lg text-muted md:pl-10"
                >
                    <p>
                        I specialize in AI and machine learning engineering with a focus on systems that ship to production. My background spans voice AI, computer vision, generative AI, and the backend infrastructure that connects them.
                    </p>
                    <p>
                        Currently building at <span className="text-foreground/80 font-medium">*astTECS</span> and co-running <span className="text-foreground/80 font-medium">Voxels Digital Agency</span>. I care about clean architecture, measurable outcomes, and AI that does something useful.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}

"use client";

import { motion } from "framer-motion";

export default function QuoteSection() {
    return (
        <section id="about" className="py-24 relative z-10 w-full max-w-6xl mx-auto px-4 md:px-8">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start"
            >
                {/* Left: Label + Heading */}
                <div>
                    <p className="text-xs font-semibold tracking-[0.3em] text-accent uppercase mb-4">
                        Who I Am
                    </p>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-foreground leading-tight">
                        AI Software<br />
                        <span className="text-accent italic">Engineer</span>
                    </h2>
                </div>

                {/* Right: Factual bio */}
                <div className="space-y-5 text-lg text-muted leading-relaxed pt-2">
                    <p>
                        I work at <span className="text-foreground/80 font-medium">*astTECS</span> building production-grade voice AI systems that handle real calls, real users, and real scale. I also co-founded <span className="text-foreground/80 font-medium">Voxels Digital Agency</span>, where we help businesses integrate AI into their operations.
                    </p>
                    <p>
                        My focus is on building systems that actually work in production: voice agents, LLM pipelines, computer vision models, and the infrastructure that holds it all together.
                    </p>
                </div>
            </motion.div>
        </section>
    );
}

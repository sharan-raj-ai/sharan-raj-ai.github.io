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
                        Designing <br /> <span className="italic text-accent">Digital</span> <br /> Dreams.
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
                        I am a multidisciplinary designer and developer obsessed with the finer details.
                        My work exists at the intersection of logic and aesthetics, where code becomes canvas.
                    </p>
                    <p>
                        With a background in both traditional graphic design and modern web technologies,
                        I craft experiences that are not just functional, but emotional.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}

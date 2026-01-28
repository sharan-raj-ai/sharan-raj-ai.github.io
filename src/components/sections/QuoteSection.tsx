"use client";

import { motion } from "framer-motion";

export default function QuoteSection() {
    return (
        <section id="about" className="py-24 relative z-10 w-full max-w-6xl mx-auto px-4 md:px-8 text-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut" }}
            >
                <span className="text-3xl text-accent/20 font-serif block mb-[-1rem]">"</span>
                <h2 className="text-2xl md:text-3xl lg:text-3xl font-serif italic text-foreground leading-tight mb-8">
                    The best way to <br /> predict the future is <br /> to <span className="text-accent">invent it</span>.
                </h2>

                <div className="max-w-8xl mx-auto text-left md:text-center grid grid-cols-1 gap-8">
                    <p className="text-lg md:text-4xl text-muted leading-relaxed">
                        I am an AI Engineer passionate about building systems that learn, adapt, and scale.
                        With a deep foundation in neural networks and a creative approach to problem-solving,
                        I transform complex data architectures into intuitive user experiences.
                    </p>
                </div>
            </motion.div>
        </section>
    );
}

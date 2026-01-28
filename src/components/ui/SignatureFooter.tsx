"use client";

import { motion } from "framer-motion";

export default function SignatureFooter() {
    const currentYear = new Date().getFullYear();

    // SVG path for signature animation - elegant handwritten style
    const signaturePath = "M 10 50 Q 20 20, 40 50 T 80 50 Q 90 30, 100 50 L 110 40 Q 120 55, 140 45 L 160 50 Q 175 35, 190 50";

    // Draw animation variants
    const pathVariants = {
        hidden: {
            pathLength: 0,
            opacity: 0
        },
        visible: {
            pathLength: 1,
            opacity: 1,
            transition: {
                pathLength: { duration: 2, ease: "easeInOut" as const },
                opacity: { duration: 0.5 }
            }
        }
    };

    return (
        <footer className="relative w-full bg-background pt-16 pb-24 overflow-hidden">
            <div className="relative z-10 flex flex-col items-center justify-center">

                {/* Signature Container */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-8"
                >
                    {/* Elegant Name in Script/Serif Style */}
                    <div className="relative">
                        {/* Main Signature Text */}
                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="text-5xl md:text-6xl font-serif italic text-accent/90 tracking-wide"
                            style={{
                                fontFamily: "'Fraunces', serif",
                                textShadow: "0 0 40px rgba(192, 192, 192, 0.15)"
                            }}
                        >
                            Sharan Raj
                        </motion.h2>

                        {/* Decorative underline flourish */}
                        <motion.svg
                            viewBox="0 0 200 20"
                            className="w-48 md:w-64 h-6 mt-2 mx-auto"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <motion.path
                                d={signaturePath}
                                fill="none"
                                stroke="rgba(192, 192, 192, 0.4)"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                variants={pathVariants}
                            />
                        </motion.svg>
                    </div>
                </motion.div>

                {/* Tagline */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                    className="text-foreground/30 text-xs tracking-[0.4em] uppercase mb-10"
                >
                    AI & ML Engineer
                </motion.p>

                {/* Silver Pulse Line */}
                <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    whileInView={{ scaleX: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 1.8, ease: "easeOut" }}
                    className="w-24 h-px mb-10"
                    style={{
                        background: `linear-gradient(90deg, transparent 0%, rgba(192, 192, 192, 0.3) 50%, transparent 100%)`
                    }}
                />

                {/* Social Links */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 2, duration: 0.6 }}
                    className="flex items-center gap-8 mb-8"
                >
                    <a
                        href="https://linkedin.com/in/sharan-raj-vk"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground/25 hover:text-accent transition-colors duration-300 text-xs tracking-wider uppercase"
                    >
                        LinkedIn
                    </a>
                    <div className="w-1 h-1 rounded-full bg-accent/20" />
                    <a
                        href="https://github.com/sharan-raj-vk"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground/25 hover:text-accent transition-colors duration-300 text-xs tracking-wider uppercase"
                    >
                        GitHub
                    </a>
                    <div className="w-1 h-1 rounded-full bg-accent/20" />
                    <a
                        href="mailto:vksharanraj@gmail.com"
                        className="text-foreground/25 hover:text-accent transition-colors duration-300 text-xs tracking-wider uppercase"
                    >
                        Email
                    </a>
                </motion.div>

                {/* Copyright */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 2.2, duration: 0.6 }}
                    className="text-foreground/20 text-[10px] tracking-[0.3em] uppercase"
                >
                    © {currentYear} · Crafted with precision
                </motion.p>
            </div>

            {/* Bottom fade for definitive ending */}
            <div
                className="absolute bottom-0 left-0 right-0 h-12 pointer-events-none"
                style={{
                    background: `linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.2) 100%)`
                }}
            />
        </footer>
    );
}

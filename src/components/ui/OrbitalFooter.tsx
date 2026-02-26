"use client";

import { motion } from "framer-motion";

export default function OrbitalFooter() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative w-full bg-background pt-16 pb-20 overflow-hidden">
            {/* No top gradient needed - contact section has clean rounded ending */}

            <div className="relative z-10 flex flex-col items-center justify-center">
                {/* Orbital System */}
                <div className="relative w-40 h-40 mb-12">
                    {/* Center - Initials */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="text-3xl font-serif font-light text-accent tracking-wider"
                        >
                            SR
                        </motion.div>
                    </div>

                    {/* Orbit Ring 1 - Outer */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <svg className="w-full h-full absolute" viewBox="0 0 160 160">
                            <circle
                                cx="80"
                                cy="80"
                                r="70"
                                fill="none"
                                stroke="rgba(192, 192, 192, 0.08)"
                                strokeWidth="1"
                            />
                        </svg>
                        {/* Orbiting Dot 1 - CSS animation */}
                        <div
                            className="w-[140px] h-[140px] absolute animate-[spin_12s_linear_infinite]"
                        >
                            <div
                                className="w-2 h-2 rounded-full bg-accent absolute top-0 left-1/2 -translate-x-1/2"
                                style={{
                                    boxShadow: "0 0 12px rgba(192, 192, 192, 0.6), 0 0 24px rgba(192, 192, 192, 0.3)"
                                }}
                            />
                        </div>
                    </div>

                    {/* Orbit Ring 2 - Middle */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <svg className="w-28 h-28 absolute" viewBox="0 0 112 112">
                            <circle
                                cx="56"
                                cy="56"
                                r="50"
                                fill="none"
                                stroke="rgba(192, 192, 192, 0.06)"
                                strokeWidth="1"
                            />
                        </svg>
                        {/* Orbiting Dot 2 - CSS animation reverse */}
                        <div
                            className="w-[100px] h-[100px] absolute animate-[spin_8s_linear_infinite_reverse]"
                        >
                            <div
                                className="w-1.5 h-1.5 rounded-full bg-accent/80 absolute top-0 left-1/2 -translate-x-1/2"
                                style={{
                                    boxShadow: "0 0 8px rgba(192, 192, 192, 0.5)"
                                }}
                            />
                        </div>
                    </div>

                    {/* Orbit Ring 3 - Inner */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <svg className="w-20 h-20 absolute" viewBox="0 0 80 80">
                            <circle
                                cx="40"
                                cy="40"
                                r="34"
                                fill="none"
                                stroke="rgba(192, 192, 192, 0.04)"
                                strokeWidth="1"
                            />
                        </svg>
                        {/* Orbiting Dot 3 - CSS animation */}
                        <div
                            className="w-[68px] h-[68px] absolute animate-[spin_6s_linear_infinite]"
                        >
                            <div
                                className="w-1 h-1 rounded-full bg-accent/60 absolute top-0 left-1/2 -translate-x-1/2"
                                style={{
                                    boxShadow: "0 0 6px rgba(192, 192, 192, 0.4)"
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Silver Pulse Line */}
                <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    whileInView={{ scaleX: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="w-32 h-px mb-8"
                    style={{
                        background: `linear-gradient(90deg, transparent 0%, rgba(192, 192, 192, 0.4) 50%, transparent 100%)`
                    }}
                />

                {/* Copyright */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="text-foreground/40 text-xs tracking-widest uppercase mb-6"
                >
                    © {currentYear} Sharan Raj VK
                </motion.p>

                {/* Social Links */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="flex items-center gap-8"
                >
                    <a
                        href="https://www.linkedin.com/in/sharan-raj-vk"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground/30 hover:text-accent transition-colors duration-300 text-xs tracking-wider uppercase"
                    >
                        LinkedIn
                    </a>
                    <div className="w-1 h-1 rounded-full bg-accent/30" />
                    <a
                        href="https://github.com/sharan-raj-ai"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground/30 hover:text-accent transition-colors duration-300 text-xs tracking-wider uppercase"
                    >
                        GitHub
                    </a>
                    <div className="w-1 h-1 rounded-full bg-accent/30" />
                    <a
                        href="mailto:vksharanraj@gmail.com"
                        className="text-foreground/30 hover:text-accent transition-colors duration-300 text-xs tracking-wider uppercase"
                    >
                        Email
                    </a>
                </motion.div>

                {/* Tagline */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                    className="mt-8 text-foreground/20 text-[10px] tracking-[0.3em] uppercase"
                >
                    Crafted with precision
                </motion.p>
            </div>

            {/* Bottom fade to pure black for definitive ending */}
            <div
                className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
                style={{
                    background: `linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.3) 100%)`
                }}
            />
        </footer>
    );
}

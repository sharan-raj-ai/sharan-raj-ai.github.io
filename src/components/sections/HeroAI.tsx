"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Github, Linkedin, Mail, MapPin, Download } from "lucide-react";
import { SplineScene } from "@/components/ui/spline";

const qualifications = [
    "AI",
    "ML",
    "Software",
];

export default function HeroAI() {
    const [currentText, setCurrentText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const targetText = qualifications[currentIndex];
        const typingSpeed = isDeleting ? 100 : 150;
        const pauseTime = isDeleting ? 500 : 2000;

        const timeout = setTimeout(() => {
            if (!isDeleting && currentText === targetText) {
                // Pause before deleting
                setTimeout(() => setIsDeleting(true), pauseTime);
            } else if (isDeleting && currentText === "") {
                // Move to next qualification
                setIsDeleting(false);
                setCurrentIndex((prev) => (prev + 1) % qualifications.length);
            } else {
                // Type or delete character
                setCurrentText(
                    isDeleting
                        ? targetText.substring(0, currentText.length - 1)
                        : targetText.substring(0, currentText.length + 1)
                );
            }
        }, typingSpeed);

        return () => clearTimeout(timeout);
    }, [currentText, currentIndex, isDeleting]);

    return (
        <section
            className="relative w-full h-screen flex flex-col justify-center items-center px-6 md:px-12 overflow-hidden"
        >
            {/* 3D Robot in Background - Follows cursor */}
            <div
                className="absolute inset-0 z-0 pointer-events-auto opacity-90"
                style={{
                    transform: 'translateZ(0)',
                    willChange: 'transform'
                }}
            >
                <SplineScene
                    scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                    className="w-full h-full"
                />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center max-w-4xl relative z-10 pointer-events-none"
            >
                {/* Name */}
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-medium text-foreground mb-4 tracking-tight">
                    Sharan Raj VK
                </h1>

                {/* Typing Animation */}
                <div className="h-12 md:h-16 mb-12">
                    <p className="text-2xl md:text-3xl text-accent font-medium">
                        {currentText}<span className="animate-pulse">|</span> Engineer
                    </p>
                </div>

                {/* Resume Button */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="mb-8 pointer-events-auto"
                >
                    <a
                        href="/resume.pdf"
                        download="Sharan_Raj_VK_Resume.pdf"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-accent/10 border border-accent/20 hover:bg-accent/20 hover:border-accent/50 rounded-full transition-all duration-300 hover:scale-105"
                    >
                        <Download className="w-5 h-5 text-accent" />
                        <span className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                            Download Resume
                        </span>
                    </a>
                </motion.div>

                {/* Social Links */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="flex flex-wrap items-center justify-center gap-6 pointer-events-auto"
                >
                    <a
                        href="https://www.linkedin.com/in/sharan-raj-vk"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 px-6 py-3 bg-card border border-accent/20 hover:border-accent/50 rounded-full transition-all duration-300 hover:scale-105"
                    >
                        <Linkedin className="w-5 h-5 text-accent" />
                        <span className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                            LinkedIn
                        </span>
                    </a>

                    <a
                        href="https://github.com/Sai-sharann"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 px-6 py-3 bg-card border border-accent/20 hover:border-accent/50 rounded-full transition-all duration-300 hover:scale-105"
                    >
                        <Github className="w-5 h-5 text-accent" />
                        <span className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                            GitHub
                        </span>
                    </a>
                </motion.div>

                {/* Contact Info & Location */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                    className="mt-12 flex flex-col md:flex-row items-center justify-center gap-6 text-muted pointer-events-auto"
                >
                    <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        <a href="mailto:vksharanraj@gmail.com" className="hover:text-accent transition-colors">
                            vksharanraj@gmail.com
                        </a>
                    </div>
                    <div className="hidden md:block w-1 h-1 rounded-full bg-muted/50" />
                    <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>Bangalore, India</span>
                    </div>
                </motion.div>
            </motion.div>

        </section>
    );
}

"use client";

import { Project } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";
import Lenis from "lenis";

interface FloatingModalProps {
    selectedProject: Project | null;
    onClose: () => void;
}

export default function FloatingModal({ selectedProject, onClose }: FloatingModalProps) {
    // Lock scroll when open
    useEffect(() => {
        if (selectedProject) {
            document.documentElement.classList.add("lenis-stopped");
        } else {
            document.documentElement.classList.remove("lenis-stopped");
        }
        return () => document.documentElement.classList.remove("lenis-stopped");
    }, [selectedProject]);

    if (!selectedProject) return null;

    return (
        <AnimatePresence>
            {selectedProject && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-background/95 backdrop-blur-xl z-40"
                    />

                    {/* Modal Container */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none p-4 md:p-12">
                        <motion.div
                            layoutId={`card-${selectedProject.id}`}
                            className="w-full max-w-5xl h-[85vh] bg-card/90 backdrop-blur-2xl border border-accent/20 rounded-2xl shadow-2xl shadow-accent/10 overflow-hidden pointer-events-auto flex flex-col md:flex-row"
                        >
                            {/* Image Side (Left) */}
                            <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden">
                                <motion.div
                                    layoutId={`image-${selectedProject.id}`}
                                    className="w-full h-full relative"
                                >
                                    <Image
                                        src={selectedProject.image}
                                        alt={selectedProject.title}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                    {/* Close Button Mobile */}
                                    <button
                                        onClick={(e) => { e.stopPropagation(); onClose(); }}
                                        className="absolute top-4 right-4 md:hidden w-10 h-10 bg-accent/20 backdrop-blur-lg rounded-full flex items-center justify-center text-accent hover:bg-accent/30 transition-all z-20 border border-accent/30"
                                    >
                                        ✕
                                    </button>
                                </motion.div>
                                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent md:hidden" />
                                <div className="absolute bottom-6 left-6 md:hidden">
                                    <motion.h2 layoutId={`title-${selectedProject.id}`} className="text-3xl font-serif italic text-foreground">
                                        {selectedProject.title}
                                    </motion.h2>
                                </div>
                            </div>

                            {/* Content Side (Right) */}
                            <div
                                data-lenis-prevent
                                className="w-full md:w-1/2 h-1/2 md:h-full p-8 md:p-12 overflow-y-auto flex flex-col bg-card/50 backdrop-blur-xl"
                            >
                                <button
                                    onClick={onClose}
                                    className="self-end hidden md:flex w-10 h-10 bg-accent/10 backdrop-blur-sm rounded-full items-center justify-center text-accent hover:bg-accent/20 hover:scale-110 transition-all mb-8 border border-accent/20"
                                >
                                    ✕
                                </button>

                                <motion.p
                                    layoutId={`category-${selectedProject.id}`}
                                    className="text-xs uppercase tracking-widest text-accent mb-4 font-medium"
                                >
                                    {selectedProject.category}
                                </motion.p>

                                <motion.h2
                                    layoutId={`title-${selectedProject.id}`}
                                    className="hidden md:block text-5xl font-serif font-medium text-foreground mb-8"
                                >
                                    {selectedProject.title}
                                </motion.h2>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="space-y-6"
                                >
                                    <p className="text-lg text-foreground/70 leading-relaxed">
                                        {selectedProject.description}
                                    </p>

                                    <div className="border-t border-accent/10 pt-6 mt-8">
                                        <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-3">Tech & Tools</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedProject.tags.map(tag => (
                                                <span key={tag} className="px-3 py-1.5 bg-accent/5 text-accent text-sm rounded-full border border-accent/20 hover:bg-accent/10 transition-colors">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="border-t border-accent/10 pt-6 mt-2">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-foreground/70">Year: <span className="text-foreground font-medium">{selectedProject.year}</span></span>
                                            {selectedProject.link && (
                                                <a
                                                    href={selectedProject.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="px-6 py-3 bg-accent text-background rounded-full hover:bg-accent/90 hover:scale-105 transition-all font-medium shadow-lg shadow-accent/20 flex items-center gap-2"
                                                >
                                                    {selectedProject.link.includes("github.com") ? "View Repository" : "View Live Project"}
                                                    <span className="text-xl">→</span>
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}

"use client";

import { Project } from "@/types";
import { motion } from "framer-motion";
import Image from "next/image";

interface ProjectCardProps {
    project: Project;
    onClick: () => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
    return (
        <motion.div
            layoutId={`card-${project.id}`}
            onClick={onClick}
            // Changed: w-full h-full to fill the Grid Cell, removed aspect ratio constraint
            className="relative group cursor-pointer w-full h-full rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-2xl transition-shadow duration-500 ease-out"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
        >
            <div className="relative w-full h-full overflow-hidden">
                <motion.div
                    layoutId={`image-${project.id}`}
                    className="w-full h-full relative"
                >
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </motion.div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 p-6 text-white w-full">
                    <motion.p
                        layoutId={`category-${project.id}`}
                        className="text-xs uppercase tracking-widest text-white/70 mb-2 font-medium"
                    >
                        {project.category}
                    </motion.p>
                    <motion.h3
                        layoutId={`title-${project.id}`}
                        className="text-2xl font-serif font-light italic"
                    >
                        {project.title}
                    </motion.h3>

                    <div className="mt-4 flex items-center text-sm font-medium text-white/0 group-hover:text-white/100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                        Explore <span className="ml-2">→</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

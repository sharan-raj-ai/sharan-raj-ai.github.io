"use client";

import { ReactNode } from "react";
import { motion, useTransform, MotionValue } from "framer-motion";

interface ScrollShimmerProps {
    children: ReactNode;
    className?: string;
    scrollProgress: MotionValue<number>;
    activationRange: [number, number];
}

/**
 * ScrollShimmer - Creates a premium glare effect that sweeps diagonally
 * across the card in sync with scroll position (camera tracking).
 * Color matches the accent border glow.
 */
export function ScrollShimmer({
    children,
    className = "",
    scrollProgress,
    activationRange,
}: ScrollShimmerProps) {
    const [start, end] = activationRange;

    // Glare position moves from -100% to 200% as card scrolls into and through view
    const glarePosition = useTransform(
        scrollProgress,
        [start - 0.1, start, end, end + 0.1],
        ["-100%", "-50%", "150%", "200%"]
    );

    // Subtle fade in and out for smoother appearance
    const glareOpacityValue = useTransform(
        scrollProgress,
        [start - 0.05, start + 0.05, end - 0.05, end + 0.05],
        [0, 1, 1, 0]
    );

    // Accent color (Silver) matching the border glow - rgba format with low opacity
    const accentGlare = "rgba(192, 192, 192, 0.06)";

    return (
        <div className={`relative overflow-hidden ${className}`}>
            {/* Base layer - Premium dark gradient */}
            <div
                className="absolute inset-0 pointer-events-none z-0"
                style={{
                    background: `linear-gradient(
            155deg,
            rgba(42, 42, 42, 1) 0%,
            rgba(28, 28, 28, 1) 40%,
            rgba(32, 32, 32, 1) 70%,
            rgba(36, 36, 36, 1) 100%
          )`
                }}
            />

            {/* Brushed metal texture */}
            <div
                className="absolute inset-0 pointer-events-none z-[1] opacity-15"
                style={{
                    backgroundImage: `
            repeating-linear-gradient(
              135deg,
              transparent 0px,
              transparent 1px,
              rgba(255, 255, 255, 0.015) 1px,
              rgba(255, 255, 255, 0.015) 2px
            )
          `,
                    backgroundSize: "4px 4px"
                }}
            />

            {/* Glare overlay - narrower diagonal sweep synced to scroll */}
            <motion.div
                className="absolute inset-0 pointer-events-none z-[5]"
                style={{
                    background: `linear-gradient(-45deg,
            transparent 45%,
            ${accentGlare} 49%,
            ${accentGlare} 51%,
            transparent 55%)`,
                    backgroundSize: "200% 200%",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: useTransform(
                        glarePosition,
                        (pos) => `${pos} ${pos}`
                    ),
                    opacity: glareOpacityValue,
                }}
            />

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
}

export default ScrollShimmer;

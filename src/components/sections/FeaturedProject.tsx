"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ExternalLink, Phone, BarChart2, Mic, Cpu, Database, Shield, X, ZoomIn } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// UPDATE THESE after each production snapshot
// ─────────────────────────────────────────────────────────────────────────────
const METRICS_DATE          = "Apr 14, 2026";
const TOTAL_CALLS           = "377";
const TRANSFER_SUCCESS_RATE = "61%";
const AVG_HANDLE_TIME       = "51s";
// ─────────────────────────────────────────────────────────────────────────────

const capabilities = [
    { icon: Phone,    label: "Internal Transfer",    detail: `SIP REFER via LiveKit, ${TRANSFER_SUCCESS_RATE} success rate` },
    { icon: BarChart2, label: "CDR Reports",          detail: "By dept / employee, emailed on demand" },
    { icon: Mic,      label: "Post-Call Analysis",   detail: "Sentiment, disposition, intent, AI summary — single LLM call" },
    { icon: Cpu,      label: "Fully Self-Hosted",    detail: "LiveKit, SIP, Egress, LLM, Parakeet STT, Svara TTS" },
    { icon: Database, label: "Observability",        detail: "Langfuse traces per call — STT, LLM, tool, TTS spans" },
    { icon: Shield,   label: "Caller Auth",          detail: "Extension-level access control for CDR queries" },
];

const techStack = [
    "LiveKit Agents", "LiveKit SIP", "LiveKit Egress",
    "Parakeet STT (NVIDIA)", "Svara TTS", "Silero VAD",
    "Ollama LLM", "Langfuse", "SQLite", "Tavily Search", "SMTP", "Python",
];

const metrics = [
    { value: TOTAL_CALLS,           label: "Total calls processed" },
    { value: TRANSFER_SUCCESS_RATE, label: "Transfer success rate" },
    { value: AVG_HANDLE_TIME,       label: "Avg handle time" },
];

// Dashboard screenshots
const dashboardImages = [
    {
        src: "/projects/aipbx-analytics.png",
        alt: "AIPBX call log — per-call entries with sentiment, disposition, recording and transcript access",
        // Blur over the CALLER column (names + extensions)
        blurZones: [
            { top: "30%", left: "16%", width: "24%", height: "64%" },
        ] as { top: string; left: string; width: string; height: string }[],
    },
    {
        src: "/projects/aipbx-calllog.png",
        alt: "AIPBX analytics dashboard — call volume, transfer rate, sentiment distribution, peak hours",
        // Analytics view — no PII
        blurZones: [] as { top: string; left: string; width: string; height: string }[],
    },
];

// ── Simple lightbox ──────────────────────────────────────────────────────────
function Lightbox({
    image,
    onClose,
}: {
    image: (typeof dashboardImages)[0];
    onClose: () => void;
}) {
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, [onClose]);

    return (
        <AnimatePresence>
            <motion.div
                key="lightbox-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={onClose}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 md:p-10"
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                    aria-label="Close"
                >
                    <X className="w-5 h-5 text-white" />
                </button>

                {/* Image container — stop propagation so clicking image doesn't close */}
                <motion.div
                    key="lightbox-image"
                    initial={{ scale: 0.92, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.92, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    onClick={(e) => e.stopPropagation()}
                    className="relative max-w-6xl w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
                >
                    <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-auto block"
                    />
                    {/* Blur zones over sensitive data */}
                    {image.blurZones.map((zone, i) => (
                        <div
                            key={i}
                            className="absolute pointer-events-none"
                            style={{
                                top: zone.top,
                                left: zone.left,
                                width: zone.width,
                                height: zone.height,
                                backdropFilter: "blur(12px)",
                                WebkitBackdropFilter: "blur(12px)",
                                backgroundColor: "rgba(10,10,10,0.35)",
                                borderRadius: "4px",
                            }}
                        />
                    ))}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

// ── Dashboard image card ─────────────────────────────────────────────────────
function DashboardCard({ image, onClick }: { image: (typeof dashboardImages)[0]; onClick: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onClick={onClick}
            className="relative overflow-hidden rounded-2xl border border-accent/10 group cursor-zoom-in"
        >
            <img
                src={image.src}
                alt={image.alt}
                className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />

            {/* Blur overlays over sensitive columns */}
            {image.blurZones.map((zone, i) => (
                <div
                    key={i}
                    className="absolute pointer-events-none"
                    style={{
                        top: zone.top,
                        left: zone.left,
                        width: zone.width,
                        height: zone.height,
                        backdropFilter: "blur(10px)",
                        WebkitBackdropFilter: "blur(10px)",
                        backgroundColor: "rgba(10,10,10,0.3)",
                        borderRadius: "4px",
                    }}
                />
            ))}

            {/* Hover: click to expand hint */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 bg-black/60 text-white text-sm px-4 py-2 rounded-full backdrop-blur-sm">
                    <ZoomIn className="w-4 h-4" />
                    Click to expand
                </div>
            </div>
        </motion.div>
    );
}

// ── Main section ─────────────────────────────────────────────────────────────
export default function FeaturedProject() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [lightboxImage, setLightboxImage] = useState<(typeof dashboardImages)[0] | null>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const lineWidth = useTransform(scrollYProgress, [0.1, 0.5], ["0%", "100%"]);

    return (
        <>
            {/* Lightbox portal */}
            {lightboxImage && (
                <Lightbox image={lightboxImage} onClose={() => setLightboxImage(null)} />
            )}

            <section
                ref={sectionRef}
                id="featured-project"
                className="py-32 relative z-10 w-full bg-background overflow-hidden"
            >
                {/* Subtle radial glow */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: `radial-gradient(ellipse 70% 50% at 50% 60%, rgba(201, 169, 97, 0.04) 0%, transparent 70%)`,
                    }}
                />

                <div className="max-w-7xl mx-auto px-4 md:px-8 relative">

                    {/* Header */}
                    <div className="mb-20">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-4 mb-6"
                        >
                            <div className="h-px w-12 bg-accent/40" />
                            <p className="text-xs font-semibold tracking-[0.3em] text-accent uppercase">
                                Production System
                            </p>
                        </motion.div>

                        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="text-6xl md:text-8xl font-serif text-foreground leading-none"
                            >
                                Enterprise <br />
                                <span className="text-accent italic">Voice AI</span>
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="text-muted text-lg max-w-sm md:text-right md:pb-2"
                            >
                                A full-stack agentic telephony platform running in production at *astTECS.
                            </motion.p>
                        </div>

                        {/* Animated rule */}
                        <div className="relative mt-10 h-[1px] bg-accent/10 overflow-hidden">
                            <motion.div
                                className="absolute left-0 top-0 h-full bg-accent"
                                style={{ width: lineWidth }}
                            />
                        </div>
                    </div>

                    {/* Main content grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                        {/* Left: dashboard screenshots + stack */}
                        <div className="space-y-6">
                            {dashboardImages.map((img, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: i === 0 ? 30 : 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <DashboardCard
                                        image={img}
                                        onClick={() => setLightboxImage(img)}
                                    />
                                </motion.div>
                            ))}

                            {/* Tech stack pills */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="flex flex-wrap gap-2"
                            >
                                {techStack.map((tech) => (
                                    <span
                                        key={tech}
                                        className="px-3 py-1.5 text-xs font-medium rounded-full border border-accent/20 text-accent/70 bg-accent/5 tracking-wide"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </motion.div>
                        </div>

                        {/* Right: description + capabilities */}
                        <div className="space-y-10">

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="space-y-5 text-muted text-lg leading-relaxed"
                            >
                                <p>
                                    Replaced a state-machine + Rasa-based PBX system with a fully agentic voice AI built on the LiveKit Agents framework. The agent runs on self-hosted LiveKit WebRTC with a SIP trunk, handling inbound calls, routing to extensions via SIP REFER, scheduling callbacks, and running live web searches.
                                </p>
                                <p>
                                    Every call is recorded via LiveKit Egress, transcribed turn-by-turn, and processed post-call by a single LLM inference that extracts sentiment, disposition, intent, and an AI summary. Authorized callers can query CDR reports by department or individual, with results sent over SMTP. The dashboard surfaces the full call log with per-entry WAV recordings and transcripts.
                                </p>
                                <p>
                                    STT runs on self-hosted NVIDIA Parakeet. TTS runs on self-hosted Svara. All traces go to self-hosted Langfuse with per-call spans covering every pipeline stage.
                                </p>
                            </motion.div>

                            {/* Real metrics */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="grid grid-cols-3 gap-4"
                            >
                                {metrics.map((m) => (
                                    <div
                                        key={m.label}
                                        className="bg-card/50 border border-accent/10 rounded-xl p-5 text-center"
                                    >
                                        <p className="text-3xl font-serif text-accent font-medium mb-1">
                                            {m.value}
                                        </p>
                                        <p className="text-xs text-muted/70 leading-tight">{m.label}</p>
                                    </div>
                                ))}
                            </motion.div>

                            {/* Dated disclaimer */}
                            <motion.p
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.15 }}
                                className="text-xs text-muted/40 -mt-6 leading-relaxed"
                            >
                                Metrics as of {METRICS_DATE} — 1 week into production.
                            </motion.p>

                            {/* Capability list */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.15 }}
                                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                            >
                                {capabilities.map((cap, i) => {
                                    const Icon = cap.icon;
                                    return (
                                        <motion.div
                                            key={cap.label}
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.06 }}
                                            className="flex items-start gap-4 p-4 rounded-xl bg-card/40 border border-accent/10 hover:border-accent/25 transition-colors duration-300 group"
                                        >
                                            <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                                                <Icon className="w-4 h-4 text-accent" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-foreground">
                                                    {cap.label}
                                                </p>
                                                <p className="text-xs text-muted/60 mt-0.5 leading-snug">
                                                    {cap.detail}
                                                </p>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </motion.div>

                            {/* External link */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                            >
                                <a
                                    href="https://timestech.in/asttecs-launches-next-gen-pa-speakers-with-mcp-server-for-agentic-ai-giving-ai-a-real-voice/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-accent text-sm font-medium hover:text-accent/70 transition-colors"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                    <span className="underline underline-offset-4">
                                        Featured in TimesTech — MCP + IP-PBX Integration
                                    </span>
                                </a>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

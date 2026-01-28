"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function ContactSection() {
    const [formState, setFormState] = useState({ name: "", email: "", message: "" });
    const [buttonText, setButtonText] = useState("Send Message");
    const [isSending, setIsSending] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formState.name || !formState.email || !formState.message) {
            alert("Please fill in all fields.");
            return;
        }

        setIsSending(true);
        setButtonText("Sending...");

        try {
            const response = await fetch("https://dry-brook-5856.sharanrajvk2003.workers.dev/send-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formState),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error("Worker Error details:", errorData);
                const errorMessage = errorData.details || errorData.error || "Failed to send email";
                throw new Error(errorMessage);
            }

            setButtonText("Sent!");
            setFormState({ name: "", email: "", message: "" });

            // Reset button text after 3 seconds
            setTimeout(() => {
                setButtonText("Send Message");
            }, 3000);
        } catch (error) {
            setButtonText("Failed - Try Again");
            console.error("Submission Error:", error);

            setTimeout(() => {
                setButtonText("Send Message");
            }, 3000);
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="px-[15%]">
            <section id="contact" className="relative z-10 w-full bg-card text-foreground overflow-hidden rounded-t-[4rem] rounded-b-[4rem]">
                {/* Premium gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-card via-card to-neutral-900 opacity-90" />

                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/10 blur-[150px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-[300px] h-[500px] bg-accent/5 blur-[120px] rounded-full" />

                <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-32">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-xs font-mono tracking-[0.3em] text-accent mb-6 uppercase"
                        >
                            Start a Conversation
                        </motion.p>

                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-6xl md:text-8xl lg:text-9xl font-serif font-light mb-6 leading-none"
                        >
                            Let's Build <br />
                            <span className="italic text-accent">Something Great</span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-lg text-foreground/60 max-w-2xl mx-auto"
                        >
                            Whether you need AI integration, custom ML models, or technical consultation. I'm here to help transform your ideas into reality.
                        </motion.p>
                    </div>

                    {/* Premium Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="max-w-3xl mx-auto"
                    >
                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Name & Email Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="group">
                                    <label className="block text-sm font-medium mb-3 text-foreground/50 group-focus-within:text-accent transition-colors">
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formState.name}
                                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                        className="w-full px-0 py-4 bg-transparent border-b-2 border-foreground/20 focus:border-accent focus:outline-none transition-colors text-foreground text-lg placeholder:text-foreground/30"
                                        placeholder="Tony Stark"
                                        required
                                    />
                                </div>
                                <div className="group">
                                    <label className="block text-sm font-medium mb-3 text-foreground/50 group-focus-within:text-accent transition-colors">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formState.email}
                                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                        className="w-full px-0 py-4 bg-transparent border-b-2 border-foreground/20 focus:border-accent focus:outline-none transition-colors text-foreground text-lg placeholder:text-foreground/30"
                                        placeholder="sharanraj@ai.com"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Message */}
                            <div className="group">
                                <label className="block text-sm font-medium mb-3 text-foreground/50 group-focus-within:text-accent transition-colors">
                                    Your Message
                                </label>
                                <textarea
                                    name="message"
                                    value={formState.message}
                                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                    rows={5}
                                    className="w-full px-0 py-4 bg-transparent border-b-2 border-foreground/20 focus:border-accent focus:outline-none transition-colors text-foreground text-lg placeholder:text-foreground/30 resize-none"
                                    placeholder="Tell me about your project, timeline, and goals..."
                                    required
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={isSending}
                                    className={`group relative px-12 py-5 bg-card text-foreground font-medium text-lg rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-foreground/20 ${isSending ? 'opacity-70 cursor-not-allowed' : ''}`}
                                >
                                    <span className="relative z-10">{buttonText}</span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-accent to-accent/80 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}

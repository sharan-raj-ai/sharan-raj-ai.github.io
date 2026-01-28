"use client";

import { useState, useEffect } from "react";

export default function Header() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const menuItems = [
        { label: "About", href: "#about" },
        { label: "Experience", href: "#experience" },
        { label: "Skills", href: "#skills" },
        { label: "Projects", href: "#projects" },
        { label: "Contact", href: "#contact" },
    ];

    return (
        <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90vw] md:w-auto flex justify-center">
            <nav
                className={`
                    backdrop-blur-2xl bg-card/30 
                    border border-accent/20 
                    rounded-full 
                    px-5 py-3 md:px-8 md:py-4
                    shadow-2xl shadow-accent/5
                    transition-all duration-500
                    ${scrolled ? 'bg-card/40 border-accent/30' : 'bg-card/20'}
                `}
                style={{
                    background: 'rgba(45, 36, 25, 0.3)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                }}
            >
                {/* Menu */}
                <ul className="flex items-center gap-4 md:gap-10">
                    {menuItems.map((item) => (
                        <li key={item.label}>
                            <a
                                href={item.href}
                                className="text-xs md:text-base font-medium text-foreground hover:text-accent transition-all duration-300 tracking-wide uppercase hover:scale-105 inline-block"
                            >
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}

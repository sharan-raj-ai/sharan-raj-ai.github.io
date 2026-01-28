'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'quote', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

export default function SectionNavigator() {
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0,
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    sections.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  const bubbleVariants = {
    initial: { opacity: 0, scale: 0.8, x: 10, visibility: 'hidden' as const },
    hover: { opacity: 1, scale: 1, x: 0, visibility: 'visible' as const },
  }

  return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
      <ul className="flex flex-col gap-2 items-end">
        {sections.map(({ id, label }, index) => {
          const isActive = activeSection === id
          const isLong = index % 2 !== 0
          
          return (
            <li key={id}>
              <motion.button
                initial="initial"
                whileHover="hover"
                animate={isActive ? "active" : "initial"}
                onClick={() => scrollToSection(id)}
                className="group relative flex items-center justify-end h-3 cursor-pointer"
                aria-label={`Navigate to ${label}`}
              >
                {/* Floating Bubble Label */}
                <motion.div
                  variants={bubbleVariants}
                  transition={{ duration: 0.2 }}
                  className="absolute right-full mr-4 pointer-events-none"
                >
                  <div className={`
                    px-2.5 py-1 rounded-full text-[9px] font-bold tracking-[0.15em] uppercase
                    backdrop-blur-md border border-accent/30 shadow-2xl shadow-accent/5
                    ${isActive ? 'bg-accent text-background' : 'bg-card/60 text-accent'}
                  `}>
                    {label}
                  </div>
                </motion.div>

                {/* The Line */}
                <div className="relative flex items-center h-full">
                  <motion.div
                    animate={{ 
                      width: isActive ? 28 : (isLong ? 25 : 15),
                      backgroundColor: isActive ? 'var(--accent)' : 'rgba(184, 168, 138, 0.2)',
                    }}
                    whileHover={{ 
                      width: 30,
                      backgroundColor: 'var(--accent)',
                    }}
                    className={`
                      h-[1.5px] rounded-full transition-shadow duration-500
                      ${isActive ? 'shadow-[0_0_12px_var(--accent)]' : 'group-hover:shadow-[0_0_8px_rgba(201,169,97,0.4)]'}
                    `}
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  />
                </div>
              </motion.button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

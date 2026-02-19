import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Navbar.css'

const links = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 40)
        window.addEventListener('scroll', fn)
        return () => window.removeEventListener('scroll', fn)
    }, [])

    return (
        <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="nav-inner container">
                {/* Logo */}
                <a href="#hero" className="nav-logo" data-hover>
                    <span className="logo-bracket">&lt;</span>
                    <span className="logo-name">Nayan</span>
                    <span className="logo-bracket"> /&gt;</span>
                </a>

                {/* Desktop links */}
                <nav className="nav-links" aria-label="Main navigation">
                    {links.map((l) => (
                        <a key={l.href} href={l.href} className="nav-link" data-hover>
                            {l.label}
                        </a>
                    ))}
                    <a href="/resume.pdf" className="btn btn-outline nav-cta" data-hover target="_blank" rel="noreferrer">
                        Resume ↗
                    </a>
                </nav>

                {/* Hamburger */}
                <button
                    className={`hamburger ${open ? 'open' : ''}`}
                    onClick={() => setOpen(!open)}
                    aria-label="Toggle menu"
                    data-hover
                >
                    <span /><span /><span />
                </button>
            </div>

            {/* Mobile drawer */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        className="mobile-drawer"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.25 }}
                    >
                        {links.map((l) => (
                            <a
                                key={l.href}
                                href={l.href}
                                className="mobile-link"
                                onClick={() => setOpen(false)}
                            >
                                {l.label}
                            </a>
                        ))}
                        <a href="/resume.pdf" className="btn btn-primary" target="_blank" rel="noreferrer">Resume ↗</a>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}

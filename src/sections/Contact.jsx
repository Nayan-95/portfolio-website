import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { FiSend, FiGithub, FiLinkedin, FiMail, FiMapPin, FiCode } from 'react-icons/fi'
import toast, { Toaster } from 'react-hot-toast'
import './Contact.css'

const socials = [
    { icon: <FiGithub />, href: 'https://github.com/Nayan-95', label: 'GitHub', handle: 'github.com/Nayan-95' },
    { icon: <FiLinkedin />, href: 'https://linkedin.com/in/manabodha-mahananda-842a40221', label: 'LinkedIn', handle: 'manabodha-mahananda' },
    { icon: <FiCode />, href: 'https://leetcode.com/nayan95', label: 'LeetCode', handle: 'leetcode.com/nayan95' },
    { icon: <FiMail />, href: 'mailto:manmahanand95@gmail.com', label: 'Email', handle: 'manmahanand95@gmail.com' },
]

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', message: '' })
    const [loading, setLoading] = useState(false)

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!form.name || !form.email || !form.message) {
            toast.error('Please fill in all fields.')
            return
        }
        setLoading(true)
        await new Promise(r => setTimeout(r, 1500))
        setLoading(false)
        setForm({ name: '', email: '', message: '' })
        toast.success('Message sent! I\'ll get back to you soon 🚀')
    }

    return (
        <section className="section contact-section" id="contact">
            <Toaster position="top-right" toastOptions={{ style: { background: '#13131f', color: '#e8e8f0', border: '1px solid rgba(255,255,255,0.08)' } }} />

            <div className="container">
                <div className="section-header">
                    <span className="section-tag">Get In Touch</span>
                    <h2 className="section-title">Let's <span>Connect</span></h2>
                    <p className="section-subtitle">
                        Have a project, role, or collaboration in mind? My inbox is always open!
                    </p>
                </div>

                <div className="contact-grid">
                    {/* Info */}
                    <div className="contact-info">
                        <div className="contact-availability glass">
                            <span className="avail-dot" />
                            <div>
                                <p className="avail-status">Open to Opportunities</p>
                                <p className="avail-sub">Available for full-time SWE roles &amp; backend consulting</p>
                            </div>
                        </div>

                        <p className="contact-bio">
                            I'm currently open to exciting backend engineering roles. Whether you want to
                            discuss distributed systems, MLOps, a collaboration, or just say hi — feel free to reach out!
                        </p>

                        <div className="contact-location">
                            <FiMapPin />
                            <span>Gandhinagar, Gujarat, India · Open to Remote</span>
                        </div>

                        <div className="socials-list">
                            {socials.map((s) => (
                                <a key={s.label} href={s.href} className="social-row glass" data-hover target="_blank" rel="noreferrer">
                                    <span className="social-icon">{s.icon}</span>
                                    <div>
                                        <span className="social-label">{s.label}</span>
                                        <span className="social-handle">{s.handle}</span>
                                    </div>
                                    <span className="social-arrow">↗</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Form */}
                    <motion.form
                        className="contact-form glass"
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                    >
                        <div className="form-group floating">
                            <input type="text" id="name" name="name" value={form.name} onChange={handleChange} placeholder=" " className="form-input" autoComplete="off" />
                            <label htmlFor="name" className="form-label">Your Name</label>
                        </div>

                        <div className="form-group floating">
                            <input type="email" id="email" name="email" value={form.email} onChange={handleChange} placeholder=" " className="form-input" autoComplete="off" />
                            <label htmlFor="email" className="form-label">Email Address</label>
                        </div>

                        <div className="form-group floating">
                            <textarea id="message" name="message" value={form.message} onChange={handleChange} placeholder=" " className="form-input" rows={5} />
                            <label htmlFor="message" className="form-label">Your Message</label>
                        </div>

                        <button type="submit" className="btn btn-primary send-btn" disabled={loading} data-hover>
                            {loading ? (<>Sending <span className="btn-spinner" /></>) : (<><FiSend /> Send Message</>)}
                        </button>
                    </motion.form>
                </div>
            </div>
        </section>
    )
}

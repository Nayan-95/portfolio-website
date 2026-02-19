import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Tilt } from 'react-tilt'
import './About.css'

gsap.registerPlugin(ScrollTrigger)

const stats = [
    { value: '1+', label: 'Years Experience' },
    { value: '17M+', label: 'API Requests / Week' },
    { value: '700+', label: 'DSA Problems Solved' },
    { value: '99.95%', label: 'LSTM Model Accuracy' },
]

export default function About() {
    const textRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.about-para',
                { opacity: 0, y: 40 },
                {
                    opacity: 1, y: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: '.about-text', start: 'top 75%' },
                }
            )
            gsap.fromTo('.stat-card',
                { opacity: 0, y: 30, scale: 0.95 },
                {
                    opacity: 1, y: 0, scale: 1,
                    duration: 0.6,
                    stagger: 0.12,
                    ease: 'back.out(1.4)',
                    scrollTrigger: { trigger: '.about-stats', start: 'top 80%' },
                }
            )
        }, textRef)
        return () => ctx.revert()
    }, [])

    return (
        <section className="section about-section" id="about" ref={textRef}>
            <div className="container">
                <div className="about-grid">
                    {/* Left - Profile Card */}
                    <div className="about-card-wrap">
                        <Tilt options={{ max: 15, scale: 1.02, speed: 400, glare: true, 'max-glare': 0.15 }}>
                            <div className="about-card glass">
                                <div className="profile-avatar">
                                    <div className="avatar-ring" />
                                    <div className="avatar-inner">
                                        <span className="avatar-emoji">👨‍💻</span>
                                    </div>
                                    <div className="avatar-status" title="Open to work">🟢</div>
                                </div>
                                <h3 className="profile-name">Manabodha Mahananda</h3>
                                <p className="profile-title">Software Engineer · Backend</p>
                                <div className="profile-badges">
                                    <span className="badge">Node.js</span>
                                    <span className="badge">AWS</span>
                                    <span className="badge">ICPC</span>
                                </div>
                                <div className="profile-location">
                                    <span>📍</span> Gandhinagar, Gujarat, India
                                </div>
                            </div>
                        </Tilt>

                        {/* Floating code snippet */}
                        <div className="code-snippet glass">
                            <pre><code>{`const nayan = {
  focus: "backend systems",
  leetcode: "700+ problems",
  coffee: Infinity,  ☕
}`}</code></pre>
                        </div>
                    </div>

                    {/* Right - Bio */}
                    <div className="about-text">
                        <span className="section-tag">About Me</span>
                        <h2 className="section-title">
                            Engineering at <span>Scale</span>
                        </h2>

                        <p className="about-para">
                            I'm a Backend-focused Software Engineer with hands-on experience designing and scaling
                            real-time distributed systems using Node.js, AWS, Microservices, RabbitMQ, WebSockets,
                            and PostgreSQL. Currently at Fintech Global Center, I architect systems that handle
                            <strong> 17M+ API requests per week</strong> with zero downtime.
                        </p>
                        <p className="about-para">
                            My work spans automated data ingestion pipelines for sports analytics, MLOps workflows
                            for scheduled model retraining, and cloud-native CI/CD on AWS. I also improved an LSTM
                            model's prediction accuracy from 96% to 99.95% — earning direct recognition from the CEO.
                        </p>
                        <p className="about-para">
                            Outside of work, I'm an ICPC Regionalist and competitive programmer who has solved 700+
                            algorithmic problems on LeetCode and Codeforces — and ranked in the <strong>top 8% globally</strong> in
                            Codeforces Round 794. I hold a B.Tech from NIT Rourkela.
                        </p>

                        <a href="#contact" className="btn btn-primary about-cta" data-hover>
                            Get In Touch ↗
                        </a>
                    </div>
                </div>

                {/* Stats */}
                <div className="about-stats">
                    {stats.map((s) => (
                        <div className="stat-card glass" key={s.label}>
                            <span className="stat-value gradient-text">{s.value}</span>
                            <span className="stat-label">{s.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Skills.css'

gsap.registerPlugin(ScrollTrigger)

const categories = ['All', 'Backend', 'Cloud', 'Databases', 'DevOps / ML', 'Frontend']

const skills = [
    // Backend
    { name: 'Node.js', icon: '🟢', cat: 'Backend', level: 92 },
    { name: 'Express.js', icon: '⚡', cat: 'Backend', level: 90 },
    { name: 'Microservices', icon: '🔗', cat: 'Backend', level: 88 },
    { name: 'REST APIs', icon: '🌐', cat: 'Backend', level: 92 },
    { name: 'WebSockets', icon: '📡', cat: 'Backend', level: 85 },
    { name: 'RabbitMQ', icon: '🐇', cat: 'Backend', level: 84 },
    { name: 'JWT / Auth', icon: '🔐', cat: 'Backend', level: 88 },
    { name: 'JavaScript', icon: '📦', cat: 'Backend', level: 93 },
    { name: 'Python', icon: '🐍', cat: 'Backend', level: 82 },
    { name: 'C++', icon: '⚙️', cat: 'Backend', level: 80 },
    // Cloud
    { name: 'AWS Lambda', icon: '☁️', cat: 'Cloud', level: 88 },
    { name: 'AWS EventBridge', icon: '⚡', cat: 'Cloud', level: 85 },
    { name: 'AWS RDS', icon: '🗄️', cat: 'Cloud', level: 84 },
    { name: 'DynamoDB', icon: '🔷', cat: 'Cloud', level: 80 },
    { name: 'S3 & CloudWatch', icon: '📊', cat: 'Cloud', level: 85 },
    { name: 'ECR / CodeBuild', icon: '🏗️', cat: 'Cloud', level: 80 },
    // Databases
    { name: 'PostgreSQL', icon: '🐘', cat: 'Databases', level: 86 },
    { name: 'MongoDB', icon: '🍃', cat: 'Databases', level: 80 },
    // DevOps / ML
    { name: 'Docker', icon: '🐳', cat: 'DevOps / ML', level: 82 },
    { name: 'CI/CD', icon: '🔄', cat: 'DevOps / ML', level: 84 },
    { name: 'LSTM / MLOps', icon: '🤖', cat: 'DevOps / ML', level: 78 },
    // Frontend
    { name: 'React', icon: '⚛️', cat: 'Frontend', level: 72 },
]

export default function Skills() {
    const [active, setActive] = useState('All')
    const ref = useRef(null)

    const filtered = active === 'All' ? skills : skills.filter(s => s.cat === active)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.skill-chip',
                { opacity: 0, y: 30, scale: 0.9 },
                {
                    opacity: 1, y: 0, scale: 1,
                    duration: 0.5,
                    stagger: 0.06,
                    ease: 'back.out(1.7)',
                    scrollTrigger: { trigger: '.skills-grid', start: 'top 80%' },
                }
            )
        }, ref)
        return () => ctx.revert()
    }, [active])

    return (
        <section className="section skills-section" id="skills" ref={ref}>
            <div className="container">
                <div className="section-header">
                    <span className="section-tag">What I Know</span>
                    <h2 className="section-title">My <span>Skills</span></h2>
                    <p className="section-subtitle">
                        Technologies I use daily to build and scale production systems.
                    </p>
                </div>

                {/* Filter tabs */}
                <div className="skills-filters">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            className={`filter-btn ${active === cat ? 'active' : ''}`}
                            onClick={() => setActive(cat)}
                            data-hover
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="skills-grid">
                    {filtered.map(skill => (
                        <div className="skill-chip glass" key={skill.name} data-hover>
                            <div className="skill-icon">{skill.icon}</div>
                            <div className="skill-info">
                                <span className="skill-name">{skill.name}</span>
                                <div className="skill-bar">
                                    <div
                                        className="skill-bar-fill"
                                        style={{ '--level': `${skill.level}%` }}
                                    />
                                </div>
                            </div>
                            <span className="skill-level">{skill.level}%</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

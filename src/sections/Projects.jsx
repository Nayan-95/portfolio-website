import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Tilt } from 'react-tilt'
import { FiGithub, FiExternalLink, FiX } from 'react-icons/fi'
import './Projects.css'

gsap.registerPlugin(ScrollTrigger)

const projects = [
    {
        id: 1,
        title: 'Sports Analytics Platform',
        desc: 'Real-time sports data platform handling 17M+ API requests/week across MLB, Soccer, Basketball & American Football using Node.js microservices.',
        longDesc: 'Led backend development of a real-time sports analytics platform at Fintech Global Center. Built Node.js microservice architecture with JWT authentication, RabbitMQ event bus, and WebSockets for live data streaming. Designed automated data ingestion pipelines for 4+ sports datasets processing millions of records into AWS RDS (PostgreSQL). Achieved 100% automated daily data refreshes via AWS Lambda and EventBridge.',
        tech: ['Node.js', 'RabbitMQ', 'WebSockets', 'AWS RDS', 'PostgreSQL', 'EventBridge'],
        github: 'https://github.com/Nayan-95',
        live: 'https://github.com/Nayan-95',
        gradient: 'linear-gradient(135deg, #00f5ff22, #b16cff22)',
        accent: '#00f5ff',
        emoji: '🏆',
        featured: true,
    },
    {
        id: 2,
        title: 'Crypto Price Predictor',
        desc: 'ML-powered crypto price prediction backend using LSTM neural networks with 99.95% accuracy — improved from 96%, recognized by CEO.',
        longDesc: 'Developed a microservice-based crypto price prediction system at Fintech Global Center (intern phase). Backend built with Node.js and Express, with inter-service communication over RabbitMQ. The LSTM model was retrained and fine-tuned to achieve 99.95% prediction accuracy (up from 96%). Deployed on AWS Lambda, EventBridge, DynamoDB, S3, and CloudWatch. Added React + Node.js internal dashboard with AWS SES email integration.',
        tech: ['Node.js', 'Express', 'LSTM', 'RabbitMQ', 'AWS Lambda', 'DynamoDB'],
        github: 'https://github.com/Nayan-95',
        live: 'https://github.com/Nayan-95',
        gradient: 'linear-gradient(135deg, #b16cff22, #ff6cdf22)',
        accent: '#b16cff',
        emoji: '📈',
        featured: true,
    },
    {
        id: 3,
        title: 'DoodleToDub',
        desc: 'Full-stack content idea marketplace connecting creators and idea-seekers, built on the MERN stack with JWT auth and RBAC.',
        longDesc: 'A marketplace platform built with MongoDB, Express, React, and Node.js (MERN). Implemented JWT-based authentication, role-based access control (RBAC), and secure backend services. Features include user profiles, idea listings, search/filter, and a messaging system. Designed with a clean RESTful API structure and a responsive React frontend.',
        tech: ['MongoDB', 'Express', 'React', 'Node.js', 'JWT', 'RBAC'],
        github: 'https://github.com/Nayan-95',
        live: 'https://github.com/Nayan-95',
        gradient: 'linear-gradient(135deg, #ff6cdf22, #00f5ff22)',
        accent: '#ff6cdf',
        emoji: '🎨',
        featured: false,
    },
    {
        id: 4,
        title: 'CI/CD Release Pipeline',
        desc: 'Cloud-native CI/CD pipeline using Docker, AWS CodeBuild, and Amazon ECR enabling near-zero downtime production deployments.',
        longDesc: 'Architected and implemented an end-to-end CI/CD pipeline at Fintech Global Center. Containerised all microservices with Docker, pushed images to Amazon ECR, and automated builds via AWS CodeBuild. Integrated health checks, rollback mechanisms, and environment-based deploy gates. Reduced deployment time significantly and achieved near-zero downtime releases across staging and production environments.',
        tech: ['Docker', 'AWS CodeBuild', 'Amazon ECR', 'CI/CD', 'Microservices'],
        github: 'https://github.com/Nayan-95',
        live: 'https://github.com/Nayan-95',
        gradient: 'linear-gradient(135deg, #00f5ff22, #0a0a0f22)',
        accent: '#00f5ff',
        emoji: '🚀',
        featured: false,
    },
    {
        id: 5,
        title: 'ServiceNow GenAI Integration',
        desc: 'Secure REST API integrations between ServiceNow and external Generative AI models, with automated vulnerability mitigation workflows.',
        longDesc: 'Built during Accenture internship. Developed secure REST API bridges between ServiceNow and external Gen AI models for automated security advisory. Automated vulnerability mitigation workflows using JavaScript scripting inside ServiceNow, reducing manual triage time significantly. Collaborated with security and infra teams to define integration contracts and data schemas.',
        tech: ['ServiceNow', 'REST APIs', 'JavaScript', 'GenAI', 'Security Automation'],
        github: 'https://github.com/Nayan-95',
        live: 'https://github.com/Nayan-95',
        gradient: 'linear-gradient(135deg, #b16cff22, #00f5ff22)',
        accent: '#b16cff',
        emoji: '🔒',
        featured: false,
    },
    {
        id: 6,
        title: 'MLOps Retraining Pipeline',
        desc: 'Automated MLOps pipeline for scheduled model retraining, versioning, and production deployment using AWS-native services.',
        longDesc: 'Designed and implemented an MLOps pipeline for the sports analytics platform at Fintech Global Center. The pipeline handles scheduled training runs triggered via AWS EventBridge, model versioning in S3, performance evaluation, and conditional promotion to production. Integrated CloudWatch alarm-based rollback and Swagger/OpenAPI documentation for all model serving endpoints.',
        tech: ['Python', 'AWS Lambda', 'EventBridge', 'S3', 'CloudWatch', 'MLOps'],
        github: 'https://github.com/Nayan-95',
        live: 'https://github.com/Nayan-95',
        gradient: 'linear-gradient(135deg, #ff6cdf22, #b16cff22)',
        accent: '#ff6cdf',
        emoji: '🤖',
        featured: false,
    },
]

export default function Projects() {
    const [selected, setSelected] = useState(null)
    const ref = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.project-card',
                { opacity: 0, y: 50 },
                {
                    opacity: 1, y: 0,
                    duration: 0.7,
                    stagger: 0.12,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: '.projects-grid', start: 'top 78%' },
                }
            )
        }, ref)
        return () => ctx.revert()
    }, [])

    return (
        <section className="section projects-section" id="projects" ref={ref}>
            <div className="container">
                <div className="section-header">
                    <span className="section-tag">What I've Built</span>
                    <h2 className="section-title">Featured <span>Projects</span></h2>
                    <p className="section-subtitle">Real-world systems built and shipped in production.</p>
                </div>

                <div className="projects-grid">
                    {projects.map((p) => (
                        <Tilt
                            key={p.id}
                            options={{ max: 10, scale: 1.02, speed: 500, glare: true, 'max-glare': 0.08 }}
                            className={`project-card glass ${p.featured ? 'featured' : ''}`}
                            onClick={() => setSelected(p)}
                        >
                            <div className="project-card-inner" style={{ background: p.gradient }}>
                                <div className="project-top">
                                    <span className="project-emoji">{p.emoji}</span>
                                    {p.featured && <span className="featured-badge">⭐ Featured</span>}
                                    <div className="project-links">
                                        <a href={p.github} className="icon-link" onClick={e => e.stopPropagation()} target="_blank" rel="noreferrer" aria-label="GitHub" data-hover>
                                            <FiGithub />
                                        </a>
                                        <a href={p.live} className="icon-link" onClick={e => e.stopPropagation()} target="_blank" rel="noreferrer" aria-label="Live" data-hover>
                                            <FiExternalLink />
                                        </a>
                                    </div>
                                </div>

                                <h3 className="project-title" style={{ '--accent': p.accent }}>{p.title}</h3>
                                <p className="project-desc">{p.desc}</p>

                                <div className="project-tags">
                                    {p.tech.map(t => (
                                        <span key={t} className="proj-tag" style={{ '--accent': p.accent }}>{t}</span>
                                    ))}
                                </div>

                                <button className="project-more" data-hover>View Details →</button>
                            </div>
                        </Tilt>
                    ))}
                </div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {selected && (
                    <motion.div
                        className="modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelected(null)}
                    >
                        <motion.div
                            className="modal-content glass"
                            initial={{ scale: 0.8, y: 40, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.8, y: 40, opacity: 0 }}
                            transition={{ type: 'spring', damping: 20, stiffness: 200 }}
                            onClick={e => e.stopPropagation()}
                        >
                            <button className="modal-close" onClick={() => setSelected(null)} data-hover>
                                <FiX />
                            </button>
                            <div className="modal-header" style={{ background: selected?.gradient }}>
                                <span className="modal-emoji">{selected?.emoji}</span>
                                <h2>{selected?.title}</h2>
                            </div>
                            <div className="modal-body">
                                <p>{selected?.longDesc}</p>
                                <div className="modal-tags">
                                    {selected?.tech.map(t => (
                                        <span key={t} className="proj-tag" style={{ '--accent': selected.accent }}>{t}</span>
                                    ))}
                                </div>
                                <div className="modal-actions">
                                    <a href={selected?.github} className="btn btn-outline" target="_blank" rel="noreferrer" data-hover>
                                        <FiGithub /> GitHub
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}

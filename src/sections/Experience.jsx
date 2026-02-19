import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Experience.css'

gsap.registerPlugin(ScrollTrigger)

const experiences = [
    {
        id: 1,
        role: 'Software Engineer',
        company: 'Fintech Global Center',
        duration: 'Jun 2025 – Present',
        location: 'Gandhinagar, India',
        desc: [
            'Leading backend development for real-time sports analytics platforms using Node.js microservices, JWT, RabbitMQ, and WebSockets — handling 17M+ API requests/week with zero downtime.',
            'Designed automated data ingestion pipelines for 4+ sports datasets (MLB, Soccer, American Football, Basketball), processing millions of records into AWS RDS (PostgreSQL).',
            'Built event-driven ingestion using AWS Lambda and EventBridge, achieving 100% automated daily data refreshes.',
            'Built MLOps pipelines for scheduled model retraining, versioning, and production deployment.',
            'Implemented CI/CD pipelines using Docker, AWS CodeBuild, and Amazon ECR for near-zero downtime releases.',
        ],
        tags: ['Node.js', 'RabbitMQ', 'WebSockets', 'AWS Lambda', 'PostgreSQL', 'Docker', 'MLOps'],
        color: '#00f5ff',
    },
    {
        id: 2,
        role: 'Software Engineer Intern',
        company: 'Fintech Global Center',
        duration: 'Dec 2024 – Jun 2025',
        location: 'Gandhinagar, India',
        desc: [
            'Developed a crypto price prediction backend using Node.js and Express with inter-service communication over RabbitMQ.',
            'Improved LSTM model prediction accuracy from 96% to 99.95% — earning direct recognition from the CEO.',
            'Deployed cloud-native services using AWS Lambda, EventBridge, DynamoDB, S3, and CloudWatch.',
            'Built a React and Node.js internal web application with AWS SES email integration.',
            'Authored Swagger and OpenAPI documentation, improving API clarity and cross-team collaboration.',
        ],
        tags: ['Node.js', 'LSTM', 'RabbitMQ', 'AWS Lambda', 'DynamoDB', 'React', 'Swagger'],
        color: '#b16cff',
    },
    {
        id: 3,
        role: 'Advanced Application Engineer Intern',
        company: 'Accenture',
        duration: 'May 2024 – Jul 2024',
        location: 'Bangalore, India',
        desc: [
            'Built secure REST API integrations between ServiceNow and external Generative AI models.',
            'Automated vulnerability mitigation workflows using JavaScript scripting within ServiceNow.',
        ],
        tags: ['ServiceNow', 'REST APIs', 'JavaScript', 'GenAI', 'Security Automation'],
        color: '#ff6cdf',
    },
]

const education = {
    institution: 'National Institute of Technology (NIT), Rourkela',
    degree: 'B.Tech in Chemical Engineering',
    duration: 'Nov 2021 – Apr 2025',
    cgpa: '7.44',
}

const achievements = [
    '🏅 ICPC Regionalist — Qualified and competed at ICPC regional contests.',
    '🌍 Ranked in the top 8% globally (1,958 out of 24,000+) in Codeforces Round 794 (Div. 2).',
    '💻 Solved 700+ algorithmic problems on LeetCode and Codeforces.',
]

export default function Experience() {
    const ref = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.timeline-line-fill',
                { scaleY: 0 },
                {
                    scaleY: 1,
                    transformOrigin: 'top',
                    duration: 1.5,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: '.timeline', start: 'top 70%', end: 'bottom 50%', scrub: true },
                }
            )
            gsap.fromTo('.exp-item',
                { opacity: 0, x: -40 },
                {
                    opacity: 1, x: 0,
                    duration: 0.7,
                    stagger: 0.2,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: '.timeline', start: 'top 75%' },
                }
            )
            gsap.fromTo('.edu-card, .achievement-card',
                { opacity: 0, y: 30 },
                {
                    opacity: 1, y: 0,
                    duration: 0.6,
                    stagger: 0.15,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: '.exp-extra', start: 'top 80%' },
                }
            )
        }, ref)
        return () => ctx.revert()
    }, [])

    return (
        <section className="section experience-section" id="experience" ref={ref}>
            <div className="container">
                <div className="section-header">
                    <span className="section-tag">Where I've Been</span>
                    <h2 className="section-title">Work <span>Experience</span></h2>
                    <p className="section-subtitle">My professional journey so far.</p>
                </div>

                <div className="timeline">
                    <div className="timeline-line">
                        <div className="timeline-line-fill" />
                    </div>

                    {experiences.map((exp) => (
                        <div className="exp-item" key={exp.id}>
                            <div className="exp-dot" style={{ background: exp.color, boxShadow: `0 0 16px ${exp.color}88` }} />
                            <div className="exp-card glass">
                                <div className="exp-header">
                                    <div>
                                        <h3 className="exp-role">{exp.role}</h3>
                                        <span className="exp-company" style={{ color: exp.color }}>{exp.company}</span>
                                    </div>
                                    <div className="exp-meta">
                                        <span className="exp-duration">📅 {exp.duration}</span>
                                        <span className="exp-location">📍 {exp.location}</span>
                                    </div>
                                </div>
                                <ul className="exp-desc">
                                    {exp.desc.map((d, i) => <li key={i}>{d}</li>)}
                                </ul>
                                <div className="exp-tags">
                                    {exp.tags.map(t => (
                                        <span key={t} className="exp-tag" style={{ color: exp.color, borderColor: `${exp.color}44`, background: `${exp.color}11` }}>
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Education + Achievements */}
                <div className="exp-extra">
                    {/* Education */}
                    <div className="edu-card glass">
                        <div className="edu-icon">🎓</div>
                        <div>
                            <h3 className="edu-inst">{education.institution}</h3>
                            <p className="edu-degree">{education.degree}</p>
                            <div className="edu-meta">
                                <span>📅 {education.duration}</span>
                                <span className="edu-cgpa gradient-text">CGPA: {education.cgpa}</span>
                            </div>
                        </div>
                    </div>

                    {/* Achievements */}
                    <div className="achievement-card glass">
                        <h3 className="ach-title">🏆 Achievements</h3>
                        <ul className="ach-list">
                            {achievements.map((a, i) => <li key={i}>{a}</li>)}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

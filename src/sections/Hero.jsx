import { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import { motion } from 'framer-motion'
import Typewriter from 'typewriter-effect'
import { FiGithub, FiLinkedin, FiMail, FiCode } from 'react-icons/fi'
import './Hero.css'

function FloatingGeometry() {
    const meshRef = useRef()
    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.15
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
        }
    })
    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
            <mesh ref={meshRef}>
                <icosahedronGeometry args={[1.4, 1]} />
                <MeshDistortMaterial
                    color="#00f5ff"
                    attach="material"
                    distort={0.4}
                    speed={2}
                    roughness={0.1}
                    metalness={0.8}
                    wireframe
                />
            </mesh>
        </Float>
    )
}

function GlowSphere({ position, color, scale }) {
    const ref = useRef()
    useFrame((state) => {
        if (ref.current) {
            ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8 + position[0]) * 0.3
        }
    })
    return (
        <mesh ref={ref} position={position} scale={scale}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} roughness={0.2} metalness={0.9} />
        </mesh>
    )
}

const socials = [
    { icon: <FiGithub />, href: 'https://github.com/Nayan-95', label: 'GitHub' },
    { icon: <FiLinkedin />, href: 'https://linkedin.com/in/manabodha-mahananda-842a40221', label: 'LinkedIn' },
    { icon: <FiCode />, href: 'https://leetcode.com/nayan95', label: 'LeetCode' },
    { icon: <FiMail />, href: 'mailto:manmahanand95@gmail.com', label: 'Email' },
]

export default function Hero() {
    return (
        <section className="hero" id="hero">
            {/* 3-D Canvas */}
            <div className="hero-canvas">
                <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
                    <ambientLight intensity={0.3} />
                    <pointLight position={[4, 4, 4]} intensity={2} color="#00f5ff" />
                    <pointLight position={[-4, -2, -4]} intensity={1.5} color="#b16cff" />
                    <FloatingGeometry />
                    <GlowSphere position={[-3.5, 1.5, -2]} color="#b16cff" scale={0.35} />
                    <GlowSphere position={[3.8, -1, -3]} color="#00f5ff" scale={0.25} />
                    <GlowSphere position={[-2, -2, -1]} color="#ff6cdf" scale={0.18} />
                </Canvas>
            </div>

            {/* Content */}
            <div className="hero-content container">
                <motion.div
                    className="hero-text"
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
                >
                    <span className="hero-greeting">👋 Hey there, I'm</span>
                    <h1 className="hero-name">
                        Nayan<span className="dot">.</span>
                    </h1>

                    <div className="hero-role">
                        <span className="role-prefix">I build </span>
                        <span className="role-typewriter">
                            <Typewriter
                                options={{
                                    strings: [
                                        'distributed systems.',
                                        'real-time backends.',
                                        'scalable microservices.',
                                        'cloud-native pipelines.',
                                        'MLOps workflows.',
                                    ],
                                    autoStart: true,
                                    loop: true,
                                    delay: 60,
                                    deleteSpeed: 30,
                                }}
                            />
                        </span>
                    </div>

                    <p className="hero-bio">
                        Backend Software Engineer specialising in Node.js, AWS, and distributed systems.
                        ICPC Regionalist with 700+ DSA problems solved.
                        Currently powering <strong>17M+ API requests/week</strong> at Fintech Global Center.
                    </p>

                    <div className="hero-actions">
                        <a href="#projects" className="btn btn-primary">View My Work</a>
                        <a href="#contact" className="btn btn-outline">Let's Talk</a>
                    </div>

                    <div className="hero-socials">
                        {socials.map((s) => (
                            <a key={s.label} href={s.href} className="social-link" aria-label={s.label} data-hover target="_blank" rel="noreferrer">
                                {s.icon}
                            </a>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="scroll-indicator"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.8 }}
            >
                <div className="scroll-line" />
                <span>scroll</span>
            </motion.div>

            {/* Radial glow blobs */}
            <div className="blob blob-1" />
            <div className="blob blob-2" />
        </section>
    )
}

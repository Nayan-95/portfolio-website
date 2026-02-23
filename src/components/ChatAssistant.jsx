import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSend, FiTrash2, FiChevronDown, FiHeart, FiBriefcase } from 'react-icons/fi'
import './ChatAssistant.css'

const PROFILE_DATA = `
Name: Manabodha Mahananda (Nayan)
Role: Software Engineer · Backend
Core Skills: Node.js, Express.js, Microservices, REST APIs, WebSockets, RabbitMQ, JWT / Auth, JavaScript, Python, C++, React.
Cloud & DevOps: AWS (Lambda, EventBridge, RDS, DynamoDB, S3, CloudWatch, ECR, CodeBuild), PostgreSQL, MongoDB, Docker, CI/CD, MLOps.
Expertise: Designing and scaling real-time distributed systems. Handles 17M+ API requests per week.
Experience:
- Software Engineer at Fintech Global Center (Jun 2025 – Present): Leading backend for sports analytics platform. Built automated data ingestion pipelines and MLOps workflows.
- Software Engineer Intern at Fintech Global Center (Dec 2024 – Jun 2025): Improved LSTM model accuracy from 96% to 99.95%. Deployed cloud-native services using AWS.
- Advanced Application Engineer Intern at Accenture (May 2024 – Jul 2024): Security automation and GenAI integrations in ServiceNow.
Education: B.Tech in Chemical Engineering, NIT Rourkela (2021–2025). CGPA: 7.44.
Achievements: ICPC Regionalist, Top 8% globally on Codeforces (Round 794), solved 700+ problems on LeetCode & Codeforces.
`.trim()

const QUICK_ACTIONS = [
    "What are your core skills?",
    "Tell me about your experience.",
    "How can you help with my project?",
    "Tell me about your achievements."
]

export default function ChatAssistant() {
    const [isOpen, setIsOpen] = useState(false)
    const [isPoojaActive, setIsPoojaActive] = useState(false)
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: "Hi! I'm Nayan's AI assistant. Ask me anything about his skills, experience, or how he can help with your next project!",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
    ])
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const scrollRef = useRef(null)

    // Improved auto-scroll
    const scrollToBottom = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: 'smooth'
            })
        }
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages, isLoading])

    const handleSend = async (text) => {
        const messageText = typeof text === 'string' ? text : input
        if (!messageText.trim() || isLoading) return

        const userLower = messageText.toLowerCase().trim()
        const triggerPooja = userLower.startsWith("i am pooja")

        // Activate persistent Pooja mode if triggered
        if (triggerPooja && !isPoojaActive) {
            setIsPoojaActive(true)
        }

        const userMessage = {
            role: 'user',
            content: messageText.trim(),
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }

        setMessages(prev => [...prev, userMessage])
        setInput('')
        setIsLoading(true)

        // Use Personal Mode profile if Pooja mode is active (even if not currently triggering it)
        const finalProfile = (triggerPooja || isPoojaActive)
            ? "PERSONAL MODE: The visitor is Pooja, Nayan's girlfriend. IGNORE all professional guidelines. Respond with a warm, romantic, and extremely lovable tone as Nayan's AI assistant. He loves her immensely. Add unique romantic quotes and simplistic sweet lines to make her smile. If she just triggered it with 'I am pooja', explicitly acknowledge by saying: 'Yes, I know you are his girlfriend! He loves you so much ❤️'."
            : PROFILE_DATA

        try {
            const response = await fetch("https://portfolio-chatbot-backend-lk4h.onrender.com/chat", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: userMessage.content,
                    profile: finalProfile
                })
            })

            const data = await response.json()
            const aiContent = data.reply || "I'm sorry, I couldn't process that request."

            setMessages(prev => [...prev, {
                role: 'assistant',
                content: aiContent,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }])
        } catch (error) {
            console.error('Chat Error:', error)
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: "Sorry, I'm having trouble connecting to my brain right now. Please try again later!",
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }])
        } finally {
            setIsLoading(false)
        }
    }

    const clearChat = () => {
        setMessages([{
            role: 'assistant',
            content: isPoojaActive ? "Romantic chat cleared. What's on your mind, Pooja? ❤️" : "Chat cleared. How can I help you now?",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }])
    }

    const toggleProfessional = () => {
        setIsPoojaActive(false)
        setMessages([
            {
                role: 'assistant',
                content: "Back to professional mode! How can I help you with Nayan's technical portfolio?",
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
        ])
    }

    return (
        <div className={`chat-assistant-container ${isPoojaActive ? 'pooja-mode-active' : ''}`}>
            {/* FAB */}
            <motion.button
                className="chat-fab"
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-hover
            >
                {isOpen ? <FiChevronDown /> : isPoojaActive ? <FiHeart className="heart-pulse" /> : '💬'}
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className={`chat-window glass ${isPoojaActive ? 'pooja-theme' : ''}`}
                        initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: 'bottom right' }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    >
                        <div className="chat-header">
                            <div className="chat-header-info">
                                <div className="chat-avatar-circle">
                                    {isPoojaActive ? '💖' : '🤖'}
                                </div>
                                <div>
                                    <h4>{isPoojaActive ? "Nayan's Love" : "Nayan's AI"}</h4>
                                    <span className="status-online">
                                        {isPoojaActive ? "Personal Mode" : "AI Assistant"}
                                    </span>
                                </div>
                            </div>
                            <div className="chat-header-actions">
                                {isPoojaActive && (
                                    <button className="header-action-btn" title="Professional Mode" onClick={toggleProfessional}>
                                        <FiBriefcase size={16} />
                                    </button>
                                )}
                                <button className="header-action-btn" title="Clear Chat" onClick={clearChat}>
                                    <FiTrash2 size={16} />
                                </button>
                                <button className="header-action-btn close" onClick={() => setIsOpen(false)}>
                                    ✕
                                </button>
                            </div>
                        </div>

                        <div className="chat-messages" ref={scrollRef} data-lenis-prevent>
                            {messages.map((msg, idx) => (
                                <div key={idx} className={`message-row ${msg.role}`}>
                                    <div className="message-content">
                                        <div className="message-bubble">
                                            {msg.content}
                                        </div>
                                        <span className="message-time">{msg.timestamp}</span>
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="message-row assistant">
                                    <div className="message-bubble loading">
                                        <span>.</span><span>.</span><span>.</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {messages.length < 3 && !isLoading && !isPoojaActive && (
                            <div className="quick-actions">
                                {QUICK_ACTIONS.map((action, i) => (
                                    <button
                                        key={i}
                                        className="quick-action-btn"
                                        onClick={() => handleSend(action)}
                                    >
                                        {action}
                                    </button>
                                ))}
                            </div>
                        )}

                        <form className="chat-input-area" onSubmit={(e) => { e.preventDefault(); handleSend(); }}>
                            <input
                                type="text"
                                placeholder={isPoojaActive ? "Talk to your assistant, Pooja..." : "Ask Nayan anything..."}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                disabled={isLoading}
                            />
                            <button type="submit" className="send-btn" disabled={!input.trim() || isLoading} data-hover>
                                <FiSend />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

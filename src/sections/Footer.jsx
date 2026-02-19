import './Footer.css'

export default function Footer() {
    const year = new Date().getFullYear()

    const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

    return (
        <footer className="footer">
            <div className="container footer-inner">
                {/* Logo */}
                <a href="#hero" className="footer-logo">
                    <span className="logo-br">&lt;</span>
                    <span style={{ color: '#b16cff' }}>Nayan</span>
                    <span className="logo-br"> /&gt;</span>
                </a>

                <p className="footer-copy">
                    © {year} Nayan. Designed & built with{' '}
                    <span className="heart">♥</span> and too much coffee.
                </p>

                <button className="back-to-top" onClick={scrollTop} data-hover aria-label="Back to top">
                    🚀
                </button>
            </div>
        </footer>
    )
}

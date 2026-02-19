import { useEffect, useRef } from 'react'
import './CustomCursor.css'

export default function CustomCursor() {
    const dotRef = useRef(null)
    const ringRef = useRef(null)

    useEffect(() => {
        const dot = dotRef.current
        const ring = ringRef.current
        let mx = 0, my = 0
        let rx = 0, ry = 0

        const onMove = (e) => {
            mx = e.clientX
            my = e.clientY
            dot.style.transform = `translate(${mx - 4}px, ${my - 4}px)`
        }

        const lerp = (a, b, t) => a + (b - a) * t
        let raf

        const animate = () => {
            rx = lerp(rx, mx, 0.12)
            ry = lerp(ry, my, 0.12)
            ring.style.transform = `translate(${rx - 20}px, ${ry - 20}px)`
            raf = requestAnimationFrame(animate)
        }

        const onEnter = () => { ring.classList.add('hovered'); dot.classList.add('hovered') }
        const onLeave = () => { ring.classList.remove('hovered'); dot.classList.remove('hovered') }

        document.addEventListener('mousemove', onMove)
        document.querySelectorAll('a, button, [data-hover]').forEach(el => {
            el.addEventListener('mouseenter', onEnter)
            el.addEventListener('mouseleave', onLeave)
        })

        raf = requestAnimationFrame(animate)

        return () => {
            document.removeEventListener('mousemove', onMove)
            cancelAnimationFrame(raf)
        }
    }, [])

    return (
        <>
            <div ref={dotRef} className="cursor-dot" />
            <div ref={ringRef} className="cursor-ring" />
        </>
    )
}

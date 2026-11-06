import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Cursor() {
  const dot = useRef(null), ring = useRef(null), label = useRef(null)
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    const xd = gsap.quickTo(dot.current, 'x', { duration: 0.1 }), yd = gsap.quickTo(dot.current, 'y', { duration: 0.1 })
    const xr = gsap.quickTo(ring.current, 'x', { duration: 0.5, ease: 'power3' }), yr = gsap.quickTo(ring.current, 'y', { duration: 0.5, ease: 'power3' })
    const move = (e) => { xd(e.clientX); yd(e.clientY); xr(e.clientX); yr(e.clientY) }
    const over = (e) => {
      const lab = e.target.closest('[data-cursor]')?.dataset.cursor
      ring.current.classList.toggle('hover', !lab && !!e.target.closest('a,button,[data-hover]'))
      ring.current.classList.toggle('label', !!lab)
      if (lab) label.current.textContent = lab
    }
    window.addEventListener('mousemove', move); window.addEventListener('mouseover', over)
    return () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseover', over) }
  }, [])
  return (<><div ref={dot} className="cursor-dot" /><div ref={ring} className="cursor-ring"><span ref={label} className="cursor-label" /></div></>)
}

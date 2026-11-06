import { useEffect, useId, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

// Shared scroll speed, written by Lenis in App.jsx and read by velocity-driven effects.
export const scrollFX = { velocity: 0 }

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const glyphs = {
  ring: <circle cx="50" cy="50" r="40" />,
  tri: <polygon points="50,8 92,88 8,88" />,
  square: <rect x="14" y="14" width="72" height="72" />,
  plus: <path d="M50 8V92M8 50H92" />,
  cross: <path d="M18 18L82 82M82 18L18 82" />,
  zig: <polyline points="2,60 18,40 34,60 50,40 66,60 82,40 98,60" />,
  half: <path className="fill" d="M8 60a42 42 0 0 1 84 0z" />,
  dots: <g className="fill">{[...Array(16)].map((_, i) => <circle key={i} cx={14 + (i % 4) * 24} cy={14 + Math.floor(i / 4) * 24} r="4" />)}</g>,
}

// Floating geometric shape layer: pops in, bobs and spins, drifts on scroll, optional mouse parallax.
// items: { t: glyph, x/y: % position, s: px size, c: colour, sp: scroll speed, d: mouse depth, spin: seconds }
export function Shapes({ items, mouse = false }) {
  const root = useRef(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const els = gsap.utils.toArray('.shape')
      gsap.from(els, {
        scale: 0, opacity: 0, duration: 1.2, stagger: 0.08, ease: 'back.out(2.2)',
        scrollTrigger: { trigger: root.current, start: 'top 85%' },
      })
      els.forEach((el) => {
        const sp = +el.dataset.sp
        gsap.to(el, {
          y: sp * -260, rotate: sp * 90, ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true },
        })
      })
    }, root)

    let off = () => {}
    if (mouse && window.matchMedia('(pointer: fine)').matches) {
      const ms = gsap.utils.toArray('.shape-m', root.current).map((el) => ({
        x: gsap.quickTo(el, 'x', { duration: 1.2, ease: 'power3' }),
        y: gsap.quickTo(el, 'y', { duration: 1.2, ease: 'power3' }),
        d: +el.dataset.d,
      }))
      const move = (e) => {
        const nx = e.clientX / window.innerWidth - 0.5, ny = e.clientY / window.innerHeight - 0.5
        ms.forEach((m) => { m.x(nx * m.d * 90); m.y(ny * m.d * 90) })
      }
      window.addEventListener('mousemove', move)
      off = () => window.removeEventListener('mousemove', move)
    }
    return () => { off(); ctx.revert() }
  }, [mouse])

  return (
    <div ref={root} className="shapes" aria-hidden="true">
      {items.map((it, i) => (
        <div key={i} className="shape" data-sp={it.sp ?? 1}
          style={{ left: `${it.x}%`, top: `${it.y}%`, width: it.s, height: it.s, color: it.c }}>
          <div className="shape-m" data-d={it.d ?? 1}>
            <svg viewBox="0 0 100 100" style={{ '--spin': `${it.spin ?? 18}s`, '--bob': `${4 + (i % 3)}s`, animationDelay: `${-i * 0.7}s` }}>
              {glyphs[it.t]}
            </svg>
          </div>
        </div>
      ))}
    </div>
  )
}

// Section transition: coloured bars sweep up in a wave as you scroll past, with a word punching through.
export function Shutter({ word, colors = ['#ff2e63', '#f9c74f', '#08d9d6', '#7b2ff7', '#ff2e63', '#f9c74f'] }) {
  const root = useRef(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: 1 } })
        .fromTo('.shutter-bar', { yPercent: 101 }, { yPercent: -101, stagger: 0.06, duration: 1, ease: 'power2.inOut' }, 0)
        .fromTo('.shutter-word', { scale: 0.4, opacity: 0, rotate: -8 }, { scale: 1, opacity: 1, rotate: 0, duration: 0.35, ease: 'back.out(2)' }, 0.25)
        .to('.shutter-word', { scale: 1.6, opacity: 0, duration: 0.3, ease: 'power2.in' }, 0.85)
    }, root)
    return () => ctx.revert()
  }, [])
  return (
    <div ref={root} className="shutter" aria-hidden="true">
      {colors.map((c, i) => <span key={i} className="shutter-bar" style={{ background: c }} />)}
      {word && <span className="shutter-word">{word}</span>}
    </div>
  )
}

// Circular text badge that spins, with an arrow in the middle.
export function SpinBadge({ text = 'SCROLL TO START • HEXCODE • ', className = '' }) {
  const id = useId().replace(/:/g, '')
  return (
    <div className={`spin-badge ${className}`} aria-hidden="true">
      <svg viewBox="0 0 100 100">
        <defs><path id={id} d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" /></defs>
        <text><textPath href={`#${id}`}>{text}</textPath></text>
      </svg>
      <span className="spin-arrow">↓</span>
    </div>
  )
}

// Morphing liquid blob (all paths share the same structure so they interpolate).
const blobs = [
  'M100,20 C150,18 182,58 180,100 C178,148 142,182 100,180 C52,178 18,146 20,100 C22,52 54,22 100,20 Z',
  'M100,32 C162,8 194,70 172,108 C152,152 138,190 92,172 C40,156 6,128 28,84 C46,44 64,44 100,32 Z',
  'M100,12 C136,30 168,40 176,92 C184,140 130,196 96,172 C60,150 16,160 22,106 C26,62 64,0 100,12 Z',
]
export function Blob({ className = '', color = 'var(--accent)', color2 = 'var(--cyan)' }) {
  const id = useId().replace(/:/g, '')
  return (
    <svg className={`blob ${className}`} viewBox="0 0 200 200" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: color }} /><stop offset="1" style={{ stopColor: color2 }} />
        </linearGradient>
      </defs>
      <motion.path fill={`url(#${id})`} d={blobs[0]}
        animate={{ d: [blobs[0], blobs[1], blobs[2], blobs[0]] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} />
    </svg>
  )
}

// A squiggle line that draws itself as you scroll through its parent.
export function DrawLine({ className = '', color = 'var(--accent)' }) {
  const ref = useRef(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current.querySelectorAll('path'), { strokeDashoffset: 1 }, {
        strokeDashoffset: 0, ease: 'none', stagger: 0.15,
        scrollTrigger: { trigger: ref.current, start: 'top 90%', end: 'bottom 40%', scrub: 1 },
      })
    }, ref)
    return () => ctx.revert()
  }, [])
  return (
    <svg ref={ref} className={`draw-line ${className}`} viewBox="0 0 1200 220" fill="none" aria-hidden="true">
      <path pathLength="1" style={{ stroke: color }} d="M0,150 C120,40 220,40 300,120 S480,210 560,110 S760,10 840,100 S1040,200 1200,60" />
      <path pathLength="1" style={{ stroke: 'var(--cyan)' }} d="M0,180 C140,120 240,200 360,150 S600,60 720,140 S960,220 1200,120" />
    </svg>
  )
}

// Marquee whose speed and skew react to how fast you scroll.
export function VelocityMarquee({ items, reverse }) {
  const track = useRef(null)
  useEffect(() => {
    if (reduced()) return
    const tween = reverse
      ? gsap.fromTo(track.current, { xPercent: -50 }, { xPercent: 0, duration: 22, ease: 'none', repeat: -1 })
      : gsap.to(track.current, { xPercent: -50, duration: 22, ease: 'none', repeat: -1 })
    const skew = gsap.quickSetter(track.current, 'skewX', 'deg')
    let s = 0, ts = 1
    const tick = () => {
      const v = scrollFX.velocity
      ts += (1 + Math.min(6, Math.abs(v) * 0.12) - ts) * 0.1
      tween.timeScale(ts)
      s += (gsap.utils.clamp(-14, 14, -v * 0.5) - s) * 0.12
      skew(s)
    }
    gsap.ticker.add(tick)
    return () => { gsap.ticker.remove(tick); tween.kill() }
  }, [reverse])
  const row = [...items, ...items]
  return (
    <div className={`marquee ${reverse ? 'rev' : ''}`}>
      <div ref={track} className="marquee-track gsap">{row.map((s, i) => <span key={i}>{s}<i>✦</i></span>)}</div>
    </div>
  )
}

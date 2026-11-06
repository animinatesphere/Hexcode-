import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import CityScene from './CityScene'
import { Shapes, SpinBadge } from './Motion'
import { profile } from '../data/profile'

gsap.registerPlugin(ScrollTrigger)

const Split = ({ text, className }) => (
  <span className={className} aria-label={text}>
    {text.split('').map((c, i) => <span key={i} className="char" aria-hidden="true">{c}</span>)}
  </span>
)

function Clock() {
  const [now, setNow] = useState(new Date())
  useEffect(() => { const id = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(id) }, [])
  return <span>{now.toLocaleTimeString('en-GB', { timeZone: 'Africa/Lagos', hour: '2-digit', minute: '2-digit', second: '2-digit' })} WAT</span>
}

const heroShapes = [
  { t: 'ring', x: 10, y: 26, s: 120, c: 'var(--cyan)', sp: 0.8, d: 1.3, spin: 30 },
  { t: 'tri', x: 76, y: 24, s: 84, c: 'var(--accent)', sp: 1.3, d: 0.9, spin: 14 },
  { t: 'plus', x: 52, y: 16, s: 42, c: 'var(--gold)', sp: 0.5, d: 1.8, spin: 8 },
  { t: 'dots', x: 88, y: 50, s: 90, c: '#ffffff', sp: 0.6, d: 0.5, spin: 60 },
  { t: 'zig', x: 30, y: 42, s: 130, c: 'var(--accent)', sp: 1, d: 1.1, spin: 40 },
  { t: 'square', x: 64, y: 40, s: 52, c: 'var(--cyan)', sp: 1.5, d: 1.5, spin: 12 },
  { t: 'half', x: 4, y: 58, s: 72, c: 'var(--gold)', sp: 0.7, d: 0.8, spin: 22 },
  { t: 'cross', x: 40, y: 10, s: 34, c: '#ffffff', sp: 1.2, d: 2, spin: 10 },
]

export default function Hero({ ready }) {
  const root = useRef(null)

  useEffect(() => {
    if (!ready) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
      tl.from('.hero-scene', { scale: 1.4, filter: 'brightness(0)', duration: 2.4, ease: 'power3.out' })
        .from('.hero-title .char', { yPercent: 120, rotate: 12, opacity: 0, stagger: 0.04, duration: 1.4 }, 0.3)
        .from('.hero-sub > *', { y: 40, opacity: 0, stagger: 0.1, duration: 1 }, 0.9)
        .from('.hud > *', { opacity: 0, y: -20, stagger: 0.08, duration: 0.8 }, 1.1)
        .from('.star', { scale: 0, rotate: -180, stagger: 0.08, duration: 0.6, ease: 'back.out(3)' }, 1.4)

      // cinematic scroll: zoom into the city while the title flies apart
      gsap.timeline({ scrollTrigger: { trigger: root.current, start: 'top top', end: '+=120%', scrub: 1, pin: true, refreshPriority: 10 } })
        .to('.hero-scene', { scale: 1.6, yPercent: 8 }, 0)
        .to('.hero-title .first', { xPercent: -60, opacity: 0 }, 0)
        .to('.hero-title .last', { xPercent: 60, opacity: 0 }, 0)
        .to('.hero-sub, .hud', { opacity: 0, y: -60 }, 0)
        .to('.hero-vignette', { opacity: 1 }, 0)
        .to('.hero-badge', { rotate: 360, scale: 0.4, opacity: 0 }, 0)
        .to('.hero-beam-wrap', { opacity: 0 }, 0)
        .to('.letterbox', { height: '11vh', ease: 'power2.out' }, 0)
      gsap.from('.hero-badge .spin-badge', { scale: 0, rotate: -180, duration: 1.4, delay: 1.6, ease: 'back.out(1.8)' })
      gsap.fromTo('.hero-beam', { xPercent: -150 }, { xPercent: 150, duration: 2.2, delay: 0.6, ease: 'power2.inOut' })
    }, root)
    return () => ctx.revert()
  }, [ready])

  return (
    <section ref={root} className="hero" id="home">
      <div className="hero-scene">
        <CityScene hue={330} />
        {/* Optional real footage: drop /public/videos/hero.mp4 and it plays over the scene */}
        <video className="hero-video" src="/videos/hero.mp4" autoPlay muted loop playsInline onError={(e) => e.currentTarget.remove()} />
      </div>
      <div className="hero-vignette" />
      <div className="letterbox top" /><div className="letterbox bottom" />
      <div className="hero-beam-wrap"><div className="hero-beam" /></div>
      {ready && <Shapes mouse items={heroShapes} />}
      <div className="hud">
        <div className="hud-left"><span className="blink">●</span> REC <Clock /></div>
        <div className="hud-right">
          <div className="stars" aria-label="Skill level 5 of 5">{[...Array(5)].map((_, i) => <span key={i} className="star">★</span>)}</div>
          <span className="hud-cash">$ SHIPPED_TO_PROD</span>
        </div>
      </div>
      <div className="hero-content">
        <h1 className="hero-title">
          <Split text={profile.first} className="first" />
          <Split text={profile.last} className="last outline" />
        </h1>
        <div className="hero-sub">
          <p className="mono accent">AKA {profile.name.toUpperCase()}</p>
          <p className="mono">{profile.role.toUpperCase()}</p>
          <p>{profile.stack}</p>
          <p className="mono dim">{profile.location}</p>
        </div>
      </div>
      <a href="#about" className="hero-badge" data-hover><SpinBadge /></a>
      <motion.div className="scroll-hint" animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
        SCROLL TO START ↓
      </motion.div>
    </section>
  )
}

import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Loader from './components/Loader'
import Cursor from './components/Cursor'
import Hero from './components/Hero'
import { About, Contact, Missions, Projects, Skills } from './components/Sections'
import { Shutter, VelocityMarquee as Marquee, scrollFX } from './components/Motion'
import Featured from './components/Featured'
import Game from './components/Game'
import { Backdrop, MaskZoom, MissionComplete, News, PhotoMode, PlayerStats, Process, Services, WantedStars } from './components/Extras'
import { featured, skills } from './data/profile'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [loading, setLoading] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40)
    on(); window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  const done = useCallback(() => setLoading(false), [])
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25 })

  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : ''
    if (loading) return
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true })
    lenis.on('scroll', (l) => { ScrollTrigger.update(); scrollFX.velocity = l.velocity })
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // blocks lean into the scroll direction, then settle back when you stop
    const skewers = reduce ? [] : [...document.querySelectorAll('[data-skew]')].map((el) => gsap.quickSetter(el, 'skewY', 'deg'))
    let skew = 0
    const tick = (t) => {
      lenis.raf(t * 1000)
      scrollFX.velocity *= 0.92
      skew += (gsap.utils.clamp(-4, 4, scrollFX.velocity * 0.12) - skew) * 0.1
      skewers.forEach((set) => set(skew))
    }
    // big headings: a colour bar wipes across, then the text is revealed
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }), { threshold: 0.4 })
    document.querySelectorAll('.big').forEach((el) => { el.classList.add('fx'); io.observe(el) })
    // section labels decode like a hacked terminal when they scroll in
    const glyph = '!<>-_/[]{}=+*^?#0123456789ABCDEF'
    const scramble = (el) => {
      const final = el.dataset.text || (el.dataset.text = el.textContent)
      let f = 0
      const id = setInterval(() => {
        f++
        el.textContent = [...final].map((c, i) => (c === ' ' || i < (f / 22) * final.length ? c : glyph[(Math.random() * glyph.length) | 0])).join('')
        if (f >= 22) { clearInterval(id); el.textContent = final }
      }, 32)
    }
    const io2 = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { scramble(e.target); io2.unobserve(e.target) } }), { threshold: 1 })
    if (!reduce) document.querySelectorAll('.eyebrow').forEach((el) => io2.observe(el))
    gsap.ticker.add(tick); gsap.ticker.lagSmoothing(0)
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]'); if (!a) return
      e.preventDefault(); lenis.scrollTo(a.getAttribute('href'), { offset: 0 })
    }
    document.addEventListener('click', onClick)
    const refresh = () => { ScrollTrigger.sort(); ScrollTrigger.refresh() }
    setTimeout(refresh, 300)
    window.addEventListener('load', refresh)
    return () => { io.disconnect(); io2.disconnect(); gsap.ticker.remove(tick); lenis.destroy(); document.removeEventListener('click', onClick); window.removeEventListener('load', refresh) }
  }, [loading])

  return (
    <>
      <AnimatePresence>{loading && <Loader key="loader" onDone={done} />}</AnimatePresence>
      <Backdrop />
      <Cursor />
      <div className="grain" /><div className="scanlines" />
      <motion.div className="progress" style={{ scaleX: progress }} />
      <motion.nav className={`nav ${scrolled ? 'scrolled' : ''}`} initial={{ y: -80 }} animate={{ y: loading ? -80 : 0 }} transition={{ delay: 1.2, duration: 0.8 }}>
        <a href="#home" className="logo">HEX<span className="accent">CODE</span></a>
        <div className="nav-links mono">
          <a href="#about">About</a><a href="#work">Missions</a><a href="#cleaniq">Cleaniq</a><a href="#iconnect">iConnect</a><a href="#projects">Work</a><a href="#skills">Skills</a><a href="#game">Play</a><a href="#contact">Contact</a>
        </div>
        <WantedStars />
      </motion.nav>
      <main>
        <Hero ready={!loading} />
        <Marquee items={['HEXCODE', 'REACT', 'NEXT.JS', 'NODE.JS', 'PYTHON', 'FASTAPI', 'REACT NATIVE', 'GSAP', 'FRAMER MOTION', 'POSTGRESQL', 'STRIPE']} />
        <About />
        <Services />
        <Shutter word="LEVEL UP" />
        <Missions />
        <News />
        <MaskZoom word="CASE FILES" hue={185} eyebrow="// CASE FILES — LIVE PRODUCTS" line="Two real products, built from the first line of code to launch." />
        {featured.map((p) => <Featured key={p.id} project={p} />)}
        <Shutter word="MORE WORK" colors={['#08d9d6', '#7b2ff7', '#ff2e63', '#f9c74f', '#08d9d6', '#7b2ff7']} />
        <Projects />
        <PhotoMode />
        <Process />
        <Marquee items={[...skills.Integrations, ...skills.Mobile]} reverse />
        <PlayerStats />
        <Skills />
        <Game />
        <Shutter word="LET'S TALK" colors={['#f9c74f', '#ff2e63', '#7b2ff7', '#08d9d6', '#f9c74f', '#ff2e63']} />
        <Contact />
      </main>
      <MissionComplete />
    </>
  )
}

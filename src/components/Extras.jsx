import { useEffect, useId, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import CityScene from './CityScene'
import { Shapes, glyphs } from './Motion'
import { headlines, playerStats, planSteps, posters, profile, services } from '../data/profile'

gsap.registerPlugin(ScrollTrigger)

const pad = (n) => String(n).padStart(2, '0')

/* ───────── Giant word cut out of a black screen; scroll zooms through the letters into the city ───────── */
export function MaskZoom({ word = 'CASE FILES', hue = 200, eyebrow, line }) {
  const root = useRef(null)
  const id = useId().replace(/:/g, '')
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ scrollTrigger: { trigger: root.current, start: 'top top', end: '+=170%', scrub: 1, pin: true } })
        .fromTo('.mz-mask', { scale: 1 }, { scale: 14, ease: 'power2.in', duration: 1 }, 0)
        .to('.mz-mask', { opacity: 0, duration: 0.3 }, 0.6)
        .fromTo('.mz-scene', { scale: 1.6, filter: 'saturate(0.3)' }, { scale: 1, filter: 'saturate(1)', ease: 'none', duration: 1 }, 0)
        .to('.mz-hint', { opacity: 0, duration: 0.1 }, 0)
        .fromTo('.mz-copy > *', { y: 70, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, duration: 0.3 }, 0.8)
    }, root)
    return () => ctx.revert()
  }, [])
  return (
    <section ref={root} className="maskzoom">
      <div className="mz-scene"><CityScene hue={hue} /></div>
      <svg className="mz-mask" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <mask id={id}>
            <rect width="1600" height="900" fill="white" />
            <text x="800" y="560" textAnchor="middle" fontFamily="Anton, Impact, sans-serif" fontSize="330" fill="black">{word}</text>
          </mask>
        </defs>
        <rect width="1600" height="900" fill="#07060b" mask={`url(#${id})`} />
        <text x="800" y="560" textAnchor="middle" fontFamily="Anton, Impact, sans-serif" fontSize="330" fill="none" stroke="#ff2e63" strokeWidth="2">{word}</text>
      </svg>
      <p className="mz-hint mono">KEEP SCROLLING TO ENTER ↓</p>
      <div className="mz-copy">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{line}</h2>
      </div>
    </section>
  )
}

/* ───────── Services: panels that expand on hover ───────── */
export function Services() {
  const [on, setOn] = useState(0)
  const root = useRef(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.svc', {
        clipPath: 'inset(100% 0 0 0)', yPercent: 20, stagger: 0.1, duration: 1.2, ease: 'expo.out',
        scrollTrigger: { trigger: '.svc-row', start: 'top 80%' },
      })
    }, root)
    return () => ctx.revert()
  }, [])
  return (
    <section ref={root} className="services section" id="services">
      <Shapes items={[
        { t: 'cross', x: 88, y: 8, s: 50, c: 'var(--accent)', sp: 1.3, spin: 10 },
        { t: 'ring', x: 2, y: 78, s: 110, c: 'var(--gold)', sp: 0.8, spin: 30 },
      ]} />
      <p className="eyebrow">// 02 — PICK YOUR JOB</p>
      <h2 className="big">WHAT I <span className="outline">DO</span></h2>
      <div className="svc-row">
        {services.map((s, i) => (
          <article key={s.title} className={`svc ${on === i ? 'on' : ''}`} style={{ '--c': s.color }}
            onMouseEnter={() => setOn(i)} onClick={() => setOn(i)} data-hover>
            <span className="svc-fill" />
            <div className="svc-head">
              <span className="svc-num mono">{pad(i + 1)}</span>
              <span className="svc-icon">{s.icon}</span>
            </div>
            <h3 className="svc-title">{s.title}</h3>
            <div className="svc-body">
              <p>{s.text}</p>
              <div className="svc-tags">{s.tags.map((t) => <span key={t} className="mono">{t}</span>)}</div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

/* ───────── Breaking news: flip-in headline cards + running ticker ───────── */
const times = ['JUST NOW', '2H AGO', 'YESTERDAY', 'LIVE']
export function News() {
  const root = useRef(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.news-card', {
        rotateX: -95, opacity: 0, transformOrigin: '50% 0%', stagger: 0.12, duration: 1.1, ease: 'back.out(1.4)',
        scrollTrigger: { trigger: '.news-grid', start: 'top 80%' },
      })
      gsap.from('.news-live', { scale: 0, rotate: -20, duration: 0.6, ease: 'back.out(3)', scrollTrigger: { trigger: root.current, start: 'top 70%' } })
    }, root)
    return () => ctx.revert()
  }, [])
  const ticker = [...headlines, ...headlines]
  return (
    <section ref={root} className="news section" id="news">
      <div className="news-head">
        <span className="news-live"><i /> LIVE</span>
        <p className="eyebrow">// 04 — BREAKING NEWS</p>
      </div>
      <h2 className="big">WORD ON <span className="outline">THE STREET</span></h2>
      <div className="news-grid">
        {headlines.map((h, i) => (
          <article key={h.title} className="news-card" data-hover>
            <div className="news-top mono">
              <span className="news-tag">{h.tag}</span>
              <span className="dim">{times[i % times.length]}</span>
            </div>
            <h3>{h.title}</h3>
            <p className="dim">{h.text}</p>
            <div className="news-eq" aria-hidden="true">{[...Array(6)].map((_, k) => <i key={k} style={{ animationDelay: `${-k * 0.17}s` }} />)}</div>
          </article>
        ))}
      </div>
      <div className="news-ticker" aria-hidden="true">
        <span className="news-ticker-label">BREAKING</span>
        <div className="news-ticker-window">
          <div className="news-ticker-track">{ticker.map((h, i) => <span key={i}>{h.title} <b>✦</b></span>)}</div>
        </div>
      </div>
    </section>
  )
}

/* ───────── Photo mode: poster wall, columns drift at different speeds ───────── */
export function PhotoMode() {
  const root = useRef(null)
  const cols = [0, 1, 2].map((c) => posters.map((p, i) => ({ ...p, i })).filter((_, i) => i % 3 === c))
  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(min-width: 760px)', () => {
      const speeds = [-18, 14, -30]
      gsap.utils.toArray('.pm-col', root.current).forEach((col, i) => {
        gsap.fromTo(col, { yPercent: -speeds[i] / 2 }, {
          yPercent: speeds[i], ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true },
        })
      })
    })
    const ctx = gsap.context(() => {
      gsap.from('.poster', {
        scale: 0.8, opacity: 0, rotate: () => gsap.utils.random(-8, 8), duration: 1.2, stagger: 0.08, ease: 'expo.out',
        scrollTrigger: { trigger: '.pm-grid', start: 'top 85%' },
      })
    }, root)
    return () => { mm.revert(); ctx.revert() }
  }, [])
  return (
    <section ref={root} className="photomode section" id="photo">
      <div className="pm-hud mono" aria-hidden="true">
        <span><span className="blink">●</span> PHOTO MODE</span><span>ISO 400</span><span>1/60</span><span>f 1.8</span>
      </div>
      <p className="eyebrow">// 06 — PHOTO MODE</p>
      <h2 className="big">POSTCARDS <span className="outline">FROM THE CITY</span></h2>
      <div className="pm-grid">
        {cols.map((col, ci) => (
          <div key={ci} className="pm-col">
            {col.map((p) => (
              <figure key={p.title} className="poster" style={{ '--h': p.hue }} data-cursor="SNAP">
                <div className="poster-art">
                  <span className="poster-sun" />
                  <svg viewBox="0 0 100 100" className="poster-glyph">{glyphs[p.glyph]}</svg>
                  <span className="poster-grid" />
                </div>
                <figcaption>
                  <span className="poster-no mono">No. {pad(p.i + 1)}</span>
                  <h3>{p.title}</h3>
                  <p className="mono">{p.sub}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}

/* ───────── The plan: route line draws as you scroll, steps light up ───────── */
export function Process() {
  const root = useRef(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = { trigger: '.plan-list', start: 'top 60%', end: 'bottom 60%', scrub: true }
      gsap.fromTo('.plan-fill', { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: st })
      gsap.fromTo('.plan-car', { top: '0%' }, { top: '100%', ease: 'none', scrollTrigger: { ...st } })
      gsap.utils.toArray('.plan-step').forEach((step, i) => {
        ScrollTrigger.create({
          trigger: step, start: 'top 60%',
          onEnter: () => step.classList.add('active'), onLeaveBack: () => step.classList.remove('active'),
        })
        gsap.from(step.querySelector('.plan-card'), {
          x: i % 2 ? 120 : -120, opacity: 0, rotate: i % 2 ? 4 : -4, duration: 1.1, ease: 'expo.out',
          scrollTrigger: { trigger: step, start: 'top 85%' },
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])
  return (
    <section ref={root} className="plan section" id="process">
      <p className="eyebrow">// 07 — THE PLAN</p>
      <h2 className="big">HOW THE JOB <span className="outline">GOES DOWN</span></h2>
      <div className="plan-list">
        <div className="plan-line"><span className="plan-fill" /><span className="plan-car" /></div>
        {planSteps.map((p, i) => (
          <div key={p.code} className={`plan-step ${i % 2 ? 'right' : 'left'}`}>
            <span className="plan-node" />
            <div className="plan-card" data-hover>
              <span className="plan-code">{p.code}</span>
              <p className="mono accent">STEP {pad(i + 1)}</p>
              <h3>{p.title}</h3>
              <p className="dim">{p.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ───────── Player stats: character card + segmented stat bars ───────── */
export function PlayerStats() {
  const root = useRef(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.pstat').forEach((row) => {
        const st = { trigger: row, start: 'top 88%' }
        gsap.from(row.querySelectorAll('.seg.on'), { scaleY: 0, opacity: 0, stagger: 0.035, duration: 0.3, ease: 'back.out(3)', scrollTrigger: st })
        const num = row.querySelector('.pstat-num')
        gsap.fromTo(num, { innerText: 0 }, { innerText: +num.dataset.v, snap: { innerText: 1 }, duration: 1.4, ease: 'power2.out', scrollTrigger: st })
      })
      gsap.from('.pcard', { rotateY: -70, opacity: 0, duration: 1.4, ease: 'expo.out', clearProps: 'transform', scrollTrigger: { trigger: '.pcard', start: 'top 80%' } })
    }, root)
    return () => ctx.revert()
  }, [])
  return (
    <section ref={root} className="pstats section" id="stats">
      <Shapes items={[
        { t: 'square', x: 90, y: 10, s: 60, c: 'var(--cyan)', sp: 1.2, spin: 14 },
        { t: 'zig', x: 40, y: 88, s: 140, c: 'var(--accent)', sp: 0.8 },
      ]} />
      <p className="eyebrow">// 08 — PLAYER STATS</p>
      <h2 className="big">CHARACTER <span className="outline">SHEET</span></h2>
      <div className="pstats-grid">
        <div className="pcard-wrap">
          <div className="pcard" data-hover>
            <div className="pcard-avatar">
              <svg viewBox="0 0 100 100" aria-hidden="true">
                <circle className="pc-ring a" cx="50" cy="50" r="47" />
                <circle className="pc-ring b" cx="50" cy="50" r="40" />
                <polygon className="pc-hex" points="50,16 80,33 80,67 50,84 20,67 20,33" />
              </svg>
              <span>AP</span>
            </div>
            <h3>{profile.alias}</h3>
            <p className="mono dim">{profile.name}</p>
            <div className="pcard-rows mono">
              <div><span className="dim">CLASS</span><span>{profile.role}</span></div>
              <div><span className="dim">LEVEL</span><span>3+ YRS</span></div>
              <div><span className="dim">BASE</span><span>IBADAN, NG</span></div>
              <div><span className="dim">STATUS</span><span className="pc-status">● AVAILABLE</span></div>
            </div>
            <span className="pcard-shine" aria-hidden="true" />
          </div>
        </div>
        <div className="pstat-list">
          {playerStats.map((s) => (
            <div key={s.label} className="pstat">
              <div className="pstat-top mono"><span>{s.label}</span><span><span className="pstat-num" data-v={s.value}>0</span>/100</span></div>
              <div className="pstat-bar">
                {[...Array(20)].map((_, k) => <i key={k} className={`seg ${k < Math.round(s.value / 5) ? 'on' : ''}`} />)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ───────── In-game style phone used in Contact ───────── */
function PhoneClock() {
  const [now, setNow] = useState(new Date())
  useEffect(() => { const id = setInterval(() => setNow(new Date()), 15000); return () => clearInterval(id) }, [])
  return <>{now.toLocaleTimeString('en-GB', { timeZone: 'Africa/Lagos', hour: '2-digit', minute: '2-digit' })}</>
}
export function Phone() {
  const root = useRef(null)
  const tel = profile.phone.replace(/\s/g, '')
  const apps = [
    { label: 'Mail', icon: '✉', bg: '#ff2e63', href: `mailto:${profile.email}` },
    { label: 'Call', icon: '☏', bg: '#7dff8a', href: `tel:${tel}` },
    { label: 'WhatsApp', icon: '◉', bg: '#25d366', href: `https://wa.me/${tel.replace('+', '')}`, ext: true },
    { label: 'GitHub', icon: '⌘', bg: '#24292f', href: profile.links.github, ext: true },
    { label: 'LinkedIn', icon: 'in', bg: '#0a66c2', href: profile.links.linkedin, ext: true },
    { label: 'Work', icon: '▣', bg: '#f9c74f', href: '#projects' },
    { label: 'Play', icon: '▶', bg: '#a06bff', href: '#game' },
    { label: 'Top', icon: '↑', bg: '#08d9d6', href: '#home' },
  ]
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(root.current, { yPercent: 50, rotate: 14, opacity: 0 }, {
        yPercent: 0, rotate: -5, opacity: 1, ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 105%', end: 'top 45%', scrub: 1 },
      })
      const st = { trigger: root.current, start: 'top 60%' }
      gsap.from('.app', { scale: 0, rotate: -45, stagger: 0.06, duration: 0.6, ease: 'back.out(2.5)', scrollTrigger: st })
      gsap.from('.phone-notif', { y: -90, opacity: 0, duration: 0.8, delay: 0.7, ease: 'back.out(1.6)', scrollTrigger: st })
    }, root)
    return () => ctx.revert()
  }, [])
  return (
    <div ref={root} className="phone">
      <div className="phone-screen">
        <div className="phone-status mono"><span><PhoneClock /></span><span className="phone-notch" /><span>▮▮▮ 5G</span></div>
        <div className="phone-notif">
          <span className="phone-notif-icon">✉</span>
          <div><b>{profile.alias}</b><p>Got a project? Tap an app and let's talk.</p></div>
        </div>
        <div className="phone-apps">
          {apps.map((a) => (
            <a key={a.label} className="app" href={a.href} {...(a.ext ? { target: '_blank', rel: 'noreferrer' } : {})} data-hover>
              <span className="app-icon" style={{ background: a.bg }}>{a.icon}</span>
              <span className="app-label">{a.label}</span>
            </a>
          ))}
        </div>
        <div className="phone-bar" />
      </div>
    </div>
  )
}

/* ───────── Wanted-level stars in the nav that fill as you scroll ───────── */
export function WantedStars() {
  const { scrollYProgress } = useScroll()
  const [n, setN] = useState(0)
  useMotionValueEvent(scrollYProgress, 'change', (v) => setN(Math.min(5, Math.floor(v * 5 + 0.12))))
  return (
    <div className={`wanted ${n === 5 ? 'max' : ''}`} aria-label={`Scroll level ${n} of 5`}>
      {[...Array(5)].map((_, i) => (
        <motion.span key={i} className={`wstar ${i < n ? 'on' : ''}`}
          animate={i < n ? { scale: [1, 1.8, 1], rotate: [0, -25, 0] } : { scale: 1, rotate: 0 }}
          transition={{ duration: 0.45 }}>★</motion.span>
      ))}
    </div>
  )
}

/* ───────── Banner when you reach the footer ───────── */
export function MissionComplete() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const el = document.querySelector('.footer'); if (!el) return
    let t
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect(); setShow(true); t = setTimeout(() => setShow(false), 3400)
    }, { threshold: 0.9 })
    io.observe(el)
    return () => { io.disconnect(); clearTimeout(t) }
  }, [])
  return (
    <AnimatePresence>
      {show && (
        <motion.div className="mc" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { delay: 0.3 } }}>
          <motion.div className="mc-band" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} exit={{ scaleY: 0 }} transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}>
            <motion.h3 initial={{ letterSpacing: '0.6em', opacity: 0, scale: 1.3 }} animate={{ letterSpacing: '0.06em', opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
              MISSION COMPLETE
            </motion.h3>
            <motion.p className="mono" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.8 }}>
              +100 REP · THANKS FOR SCROLLING ALL THE WAY
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ───────── Site-wide background: animated aurora glow + moving grid ───────── */
export function Backdrop() {
  return (
    <div className="backdrop" aria-hidden="true">
      <div className="aurora"><i /><i /><i /><i /></div>
      <div className="backdrop-grid" />
      <div className="backdrop-shade" />
    </div>
  )
}

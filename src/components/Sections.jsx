import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import CityScene from './CityScene'
import Magnetic from './Magnetic'
import { Blob, DrawLine, Shapes } from './Motion'
import { Phone } from './Extras'
import { profile, missions, projects, skills } from '../data/profile'

gsap.registerPlugin(ScrollTrigger)

export function Marquee({ items, reverse }) {
  const row = [...items, ...items]
  return (
    <div className={`marquee ${reverse ? 'rev' : ''}`}>
      <div className="marquee-track">{row.map((s, i) => <span key={i}>{s}<i>✦</i></span>)}</div>
    </div>
  )
}

export function About() {
  const root = useRef(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.about-text .w', {
        opacity: 1, color: '#fff', stagger: 0.05,
        scrollTrigger: { trigger: '.about-text', start: 'top 75%', end: 'bottom 40%', scrub: true },
      })
      gsap.utils.toArray('.stat-num').forEach((el) => {
        const end = +el.dataset.v
        gsap.fromTo(el, { innerText: 0 }, {
          innerText: end, duration: 2, snap: { innerText: 1 }, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        })
      })
      gsap.fromTo('.orbit-track', { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 2, stagger: 0.15, ease: 'power3.inOut', scrollTrigger: { trigger: '.stats', start: 'top 85%' } })
      gsap.from('.stat', { y: 80, opacity: 0, stagger: 0.12, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: '.stats', start: 'top 85%' } })
    }, root)
    return () => ctx.revert()
  }, [])
  return (
    <section ref={root} className="about section" id="about">
      <Shapes items={[
        { t: 'ring', x: 86, y: 6, s: 160, c: 'var(--accent)', sp: 1.2, spin: 40 },
        { t: 'dots', x: 3, y: 40, s: 100, c: 'var(--cyan)', sp: 0.6 },
        { t: 'plus', x: 70, y: 48, s: 46, c: 'var(--gold)', sp: 1.6, spin: 9 },
        { t: 'tri', x: 92, y: 70, s: 70, c: 'var(--cyan)', sp: 0.9, spin: 16 },
      ]} />
      <p className="eyebrow">// 01 — THE PROTAGONIST</p>
      <p className="about-text">{profile.summary.split(' ').map((w, i) => <span key={i} className="w">{w} </span>)}</p>
      <DrawLine />
      <div className="stats" data-skew>
        {profile.stats.map((s) => (
          <div className="stat" key={s.label}>
            <svg className="stat-orbit" viewBox="0 0 100 100" aria-hidden="true">
              <circle className="orbit-track" cx="50" cy="50" r="44" pathLength="1" />
              <g className="orbit-spin"><circle className="orbit-dot" cx="50" cy="6" r="4" /></g>
            </svg>
            <div className="stat-big"><span className="stat-num" data-v={s.value}>0</span>{s.suffix}</div>
            <div className="mono dim">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

export function Missions() {
  const root = useRef(null), track = useRef(null)
  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(min-width: 900px)', () => {
      const dist = () => track.current.scrollWidth - window.innerWidth
      const tween = gsap.to(track.current, {
        x: () => -dist(), ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: () => `+=${dist()}`, scrub: 1, pin: true, invalidateOnRefresh: true },
      })
      gsap.utils.toArray('.mission').forEach((card) => {
        gsap.from(card.querySelector('.badge'), {
          scale: 3.5, opacity: 0, rotate: -40, duration: 0.5, ease: 'back.out(1.6)',
          scrollTrigger: { trigger: card, containerAnimation: tween, start: 'left 60%', toggleActions: 'play none none reverse' },
        })
        gsap.from(card.querySelector('.mission-num'), {
          xPercent: 80, opacity: 0, ease: 'none',
          scrollTrigger: { trigger: card, containerAnimation: tween, start: 'left 100%', end: 'left 30%', scrub: true },
        })
        gsap.from(card.querySelectorAll('li'), {
          x: 80, opacity: 0, stagger: 0.1,
          scrollTrigger: { trigger: card, containerAnimation: tween, start: 'left 80%', end: 'left 40%', scrub: true },
        })
      })
    })
    mm.add('(max-width: 899px)', () => {
      gsap.utils.toArray('.mission').forEach((card) => {
        gsap.from(card.querySelector('.badge'), {
          scale: 3.5, opacity: 0, rotate: -40, duration: 0.5, ease: 'back.out(1.6)',
          scrollTrigger: { trigger: card, start: 'top 70%', toggleActions: 'play none none reverse' },
        })
      })
    })
    return () => mm.revert()
  }, [])
  return (
    <section ref={root} className="missions" id="work">
      <div ref={track} className="missions-track">
        <div className="missions-intro">
          <p className="eyebrow">// 03 — STORY MODE</p>
          <h2 className="big">MISSIONS<br /><span className="outline">COMPLETED</span></h2>
          <p className="mono dim">Scroll → to play through the career.</p>
        </div>
        {missions.map((m, i) => (
          <article className="mission" key={m.code} style={{ '--c': m.color }} data-hover>
            <div className="mission-top">
              <span className="mono">{m.code}</span>
              <span className="badge">PASSED</span>
            </div>
            <div className="mission-scan" aria-hidden="true" />
            <h3>{m.title}</h3>
            <p className="mission-role">{m.role} <span className="dim">· {m.place}</span></p>
            <ul>{m.points.map((p) => <li key={p}>{p}</li>)}</ul>
            <div className="mission-num">{String(i + 1).padStart(2, '0')}</div>
          </article>
        ))}
      </div>
    </section>
  )
}

function ProjectCard({ p, i }) {
  const mx = useMotionValue(0), my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 150, damping: 15 })
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), { stiffness: 150, damping: 15 })
  const glareX = useTransform(mx, [-0.5, 0.5], ['0%', '100%'])
  const move = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5); my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const Wrap = p.url ? 'a' : 'div'
  return (
    <motion.div
      className="project-wrap"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.2, delay: (i % 2) * 0.15, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div className="project" style={{ rotateX: rx, rotateY: ry }} onMouseMove={move} onMouseLeave={() => { mx.set(0); my.set(0) }} data-hover data-cursor={p.url ? 'OPEN' : 'VIEW'}>
        <Wrap className="project-media" {...(p.url ? { href: p.url, target: '_blank', rel: 'noreferrer' } : {})}>
          {p.video
            ? <video src={p.video} autoPlay muted loop playsInline />
            : <CityScene hue={p.hue} rain={i % 2 === 0} />}
          <motion.div className="glare" style={{ left: glareX }} />
          <motion.div className="wipe" initial={{ scaleY: 1 }} whileInView={{ scaleY: 0 }} viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.1, delay: 0.2 + (i % 2) * 0.15, ease: [0.76, 0, 0.24, 1] }} />
          <span className="project-index">{String(i + 1).padStart(2, '0')}</span>
        </Wrap>
        <div className="project-info">
          <p className="mono accent">{p.tag}</p>
          <h3>{p.title}</h3>
          <p className="dim">{p.desc}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function Projects() {
  return (
    <section className="projects section" id="projects">
      <Shapes items={[
        { t: 'zig', x: 70, y: 2, s: 160, c: 'var(--accent)', sp: 0.8 },
        { t: 'ring', x: 2, y: 30, s: 90, c: 'var(--gold)', sp: 1.4, spin: 25 },
        { t: 'square', x: 94, y: 55, s: 60, c: 'var(--cyan)', sp: 1, spin: 14 },
        { t: 'cross', x: 46, y: 82, s: 40, c: '#ffffff', sp: 1.8, spin: 8 },
      ]} />
      <p className="eyebrow">// 05 — MORE HEISTS</p>
      <h2 className="big">SELECTED <span className="outline">WORK</span></h2>
      <div className="project-grid" data-skew>{projects.map((p, i) => <ProjectCard key={p.title} p={p} i={i} />)}</div>
    </section>
  )
}

export function Skills() {
  return (
    <section className="skills section" id="skills">
      <Shapes items={[
        { t: 'half', x: 88, y: 4, s: 110, c: 'var(--cyan)', sp: 1, spin: 30 },
        { t: 'tri', x: 4, y: 60, s: 80, c: 'var(--accent)', sp: 1.3, spin: 18 },
        { t: 'dots', x: 80, y: 78, s: 90, c: 'var(--gold)', sp: 0.7 },
      ]} />
      <Blob className="skills-blob" color="#7b2ff7" color2="var(--cyan)" />
      <p className="eyebrow">// 09 — LOADOUT</p>
      <h2 className="big">THE <span className="outline">ARSENAL</span></h2>
      <div className="skill-groups" data-skew>
        {Object.entries(skills).map(([group, list], gi) => (
          <motion.div key={group} className="skill-group"
            initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.8, delay: gi * 0.08 }}>
            <h4 className="mono">{String(gi + 1).padStart(2, '0')} / {group}</h4>
            <div className="chips">
              {list.map((s, i) => (
                <motion.span key={s} className="chip" data-hover
                  initial={{ opacity: 0, scale: 0.6 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                  transition={{ delay: gi * 0.08 + i * 0.04, type: 'spring', stiffness: 300 }}
                  whileHover={{ y: -6, rotate: -3 }}>
                  {s}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export function Contact() {
  const root = useRef(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-title span', {
        yPercent: 100, stagger: 0.1, duration: 1.2, ease: 'expo.out',
        scrollTrigger: { trigger: root.current, start: 'top 70%' },
      })
      gsap.to('.contact-bg', { scale: 1.3, scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom bottom', scrub: true } })
    }, root)
    return () => ctx.revert()
  }, [])
  return (
    <section ref={root} className="contact" id="contact">
      <div className="contact-bg"><CityScene hue={200} traffic /></div>
      <Blob className="contact-blob" />
      <div className="contact-inner">
        <div className="contact-main">
          <p className="eyebrow">// 11 — NEXT MISSION</p>
          <h2 className="contact-title">
            <span className="line"><span>GOT A</span></span>
            <span className="line"><span className="outline">PROJECT?</span></span>
          </h2>
          <div className="cta-wrap">
            <span className="radar" /><span className="radar" /><span className="radar" />
            <Magnetic strength={0.4}>
              <a className="cta" href={`mailto:${profile.email}`}>START A MISSION →</a>
            </Magnetic>
          </div>
          <div className="contact-links mono">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <a href={`tel:${profile.phone.replace(/\s/g, '')}`}>{profile.phone}</a>
            <a href={profile.links.github} target="_blank" rel="noreferrer">GitHub ↗</a>
            <a href={profile.links.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
          </div>
        </div>
        <Phone />
      </div>
      <footer className="footer mono dim">© {new Date().getFullYear()} {profile.name} — built with React, GSAP & Framer Motion</footer>
    </section>
  )
}

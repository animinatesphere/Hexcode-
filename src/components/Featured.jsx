import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CityScene from './CityScene'
import Magnetic from './Magnetic'
import { screens } from './Mockups'

gsap.registerPlugin(ScrollTrigger)

const pad = (n) => String(n).padStart(2, '0')
const spot = (e) => {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
}

export default function Featured({ project: f }) {
  const root = useRef(null)
  const devices = useRef(null)
  const Web = screens[f.mockups?.web] || screens.dashboard
  const phones = (f.mockups?.phones || ['booking', 'jobs']).map((k) => screens[k])
  const host = f.url ? f.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '') : `${f.id}.app`

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── cinematic "screen opens up" intro (unchanged)
      const stage = { trigger: '.feat-stage', start: 'top top', end: '+=100%', scrub: 1 }
      gsap.fromTo('.feat-screen', { clipPath: 'inset(35% 30% 35% 30% round 24px)' }, { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none', scrollTrigger: { ...stage, pin: true } })
      gsap.fromTo('.feat-screen-title', { scale: 0.6, opacity: 0.3 }, { scale: 1, opacity: 1, ease: 'none', scrollTrigger: stage })
      gsap.fromTo('.feat-frame', { top: '35%', bottom: '35%', left: '30%', right: '30%' }, { top: '5%', bottom: '5%', left: '4%', right: '4%', ease: 'none', scrollTrigger: stage })
      gsap.to('.feat-reticle', { rotate: 180, scale: 2.2, opacity: 0, ease: 'none', scrollTrigger: stage })

      // ── dossier
      gsap.from('.cs-side > *', { y: 50, opacity: 0, stagger: 0.08, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: '.cs-dossier', start: 'top 75%' } })
      gsap.from('.cs-meta > div', { x: -40, opacity: 0, stagger: 0.08, duration: 0.8, ease: 'expo.out', scrollTrigger: { trigger: '.cs-meta', start: 'top 85%' } })
      gsap.to('.cs-overview .w', { opacity: 1, stagger: 0.05, scrollTrigger: { trigger: '.cs-overview', start: 'top 80%', end: 'bottom 55%', scrub: true } })
      gsap.from('.cs-fact', { y: 70, opacity: 0, stagger: 0.1, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: '.cs-facts', start: 'top 85%' } })
      gsap.utils.toArray('.cs-fact-num[data-v]').forEach((el) => {
        gsap.fromTo(el, { innerText: 0 }, { innerText: +el.dataset.v, snap: { innerText: 1 }, duration: 1.8, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 90%' } })
      })

      // ── device showcase: fly in, then drift apart at different speeds
      gsap.timeline({ scrollTrigger: { trigger: '.cs-showcase', start: 'top bottom', end: 'bottom top', scrub: 1 } })
        .fromTo('.cs-browser', { y: 220, rotateX: 28, scale: 0.85, opacity: 0 }, { y: 0, rotateX: 0, scale: 1, opacity: 1, ease: 'power2.out', duration: 1 }, 0)
        .fromTo('.cs-phone.p1', { x: -220, y: 260, rotate: -22, opacity: 0 }, { x: 0, y: 0, rotate: -6, opacity: 1, ease: 'power2.out', duration: 1 }, 0.1)
        .fromTo('.cs-phone.p2', { x: 220, y: 300, rotate: 22, opacity: 0 }, { x: 0, y: 0, rotate: 6, opacity: 1, ease: 'power2.out', duration: 1 }, 0.15)
        .to('.cs-browser', { y: -60, ease: 'none', duration: 1 }, 1.1)
        .to('.cs-phone.p1', { y: -160, ease: 'none', duration: 1 }, 1.1)
        .to('.cs-phone.p2', { y: -110, ease: 'none', duration: 1 }, 1.1)
      gsap.from('.cs-callout', { scale: 0, opacity: 0, stagger: 0.15, duration: 0.7, ease: 'back.out(2.4)', scrollTrigger: { trigger: '.cs-showcase', start: 'top 35%' } })

      // ── features + terminal + stack
      gsap.from('.cs-head > *', { y: 50, opacity: 0, stagger: 0.1, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: '.cs-head', start: 'top 85%' } })
      gsap.from('.cs-cell', { y: 80, opacity: 0, scale: 0.94, stagger: 0.06, duration: 1, ease: 'expo.out', clearProps: 'transform', scrollTrigger: { trigger: '.cs-bento', start: 'top 80%' } })
      gsap.from('.cs-term', { y: 80, opacity: 0, rotateX: 15, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: '.cs-hood', start: 'top 80%' } })
      gsap.fromTo('.cs-line', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.9, ease: 'steps(36)', stagger: 0.7, scrollTrigger: { trigger: '.cs-term', start: 'top 70%' } })
      gsap.from('.cs-pill', { scale: 0, opacity: 0, stagger: 0.04, duration: 0.5, ease: 'back.out(2.5)', scrollTrigger: { trigger: '.cs-pills', start: 'top 85%' } })
    }, root)

    // mouse tilt on the device group
    let off = () => {}
    if (window.matchMedia('(pointer: fine)').matches && devices.current) {
      const el = devices.current
      const rx = gsap.quickTo(el, 'rotateX', { duration: 0.8, ease: 'power3' })
      const ry = gsap.quickTo(el, 'rotateY', { duration: 0.8, ease: 'power3' })
      const move = (e) => { const r = el.getBoundingClientRect(); ry(((e.clientX - r.left) / r.width - 0.5) * 10); rx(((e.clientY - r.top) / r.height - 0.5) * -8) }
      const leave = () => { rx(0); ry(0) }
      const parent = el.parentElement
      parent.addEventListener('mousemove', move); parent.addEventListener('mouseleave', leave)
      off = () => { parent.removeEventListener('mousemove', move); parent.removeEventListener('mouseleave', leave) }
    }
    return () => { off(); ctx.revert() }
  }, [])

  return (
    <section ref={root} className="featured" id={f.id} style={{ '--fc': f.accent }}>
      {/* ── intro stage */}
      <div className="feat-stage">
        <div className="feat-screen">
          {f.video ? <video src={f.video} autoPlay muted loop playsInline /> : <CityScene hue={f.hue} />}
          <div className="feat-screen-shade" />
          <div className="feat-screen-title">
            <p className="eyebrow">// {f.label}</p>
            <h2>{f.title}</h2>
            <p className="feat-tagline">{f.tagline}</p>
          </div>
        </div>
        <div className="feat-frame" aria-hidden="true">
          <i /><i /><i /><i />
          <span className="mono feat-frame-label"><span className="blink">●</span> REC — {f.title}</span>
        </div>
        <svg className="feat-reticle" viewBox="0 0 100 100" aria-hidden="true">
          <circle cx="50" cy="50" r="46" strokeDasharray="6 8" />
          <circle cx="50" cy="50" r="30" />
          <path d="M50 0V20M50 80V100M0 50H20M80 50H100" />
        </svg>
      </div>

      {/* ── dossier: facts on the left, story on the right */}
      <div className="section cs-dossier">
        <aside className="cs-side">
          <p className="cs-kicker mono">Case study · {f.title}</p>
          <h3 className="cs-title">{f.title}<span>.</span></h3>
          <p className="cs-tagline">{f.tagline}</p>
          <dl className="cs-meta mono">
            <div><dt>Role</dt><dd>{f.role}</dd></div>
            {f.client && <div><dt>Client</dt><dd>{f.client}</dd></div>}
            <div><dt>Platforms</dt><dd>{f.platforms}</dd></div>
            <div><dt>Status</dt><dd><span className={`cs-status ${f.status === 'Live' ? 'live' : ''}`}><i />{f.status}</span></dd></div>
          </dl>
          <div className="cs-actions">
            {f.url && <Magnetic><a className="cs-btn" href={f.url} target="_blank" rel="noreferrer" data-cursor="VISIT"><span>Visit live site</span><b>↗</b></a></Magnetic>}
            {f.repo && <Magnetic><a className="cs-btn ghost" href={f.repo} target="_blank" rel="noreferrer"><span>GitHub</span><b>↗</b></a></Magnetic>}
          </div>
        </aside>
        <div className="cs-main">
          <p className="cs-label mono"><span>01</span> The story</p>
          <p className="cs-overview">{f.overview.split(' ').map((w, i) => <span key={i} className="w">{w} </span>)}</p>
          <div className="cs-facts">
            {f.facts?.map((x) => (
              <div key={x.label} className="cs-fact">
                <span className="cs-fact-num" {...(x.text ? {} : { 'data-v': x.value })}>{x.text ?? 0}</span>
                <span className="cs-fact-label mono">{x.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── device showcase */}
      <div className="cs-showcase">
        <div className="cs-glow" />
        <div ref={devices} className="cs-devices">
          <div className="cs-browser">
            <div className="cs-browser-bar"><i /><i /><i /><span className="cs-url mono">🔒 {host}</span></div>
            <div className="cs-browser-screen"><Web /></div>
            <span className="cs-device-label mono">{f.mockups?.webLabel}</span>
          </div>
          {phones.map((Screen, i) => (
            <div key={i} className={`cs-phone p${i + 1}`}>
              <div className="cs-phone-screen"><span className="cs-island" /><Screen /></div>
              <span className="cs-device-label mono">{f.mockups?.phoneLabels?.[i]}</span>
            </div>
          ))}
        </div>
        {f.callouts?.map((c, i) => <span key={c} className={`cs-callout k${i}`}><i />{c}</span>)}
      </div>

      {/* ── features: bento grid with mouse spotlight */}
      <div className="section cs-features">
        <div className="cs-head">
          <p className="cs-label mono"><span>02</span> What's inside</p>
          <h3 className="cs-h">{f.features.length} modules. <span className="outline">One system.</span></h3>
        </div>
        <div className="cs-bento">
          {f.features.map((x, i) => (
            <article key={x.title} className={`cs-cell c${i}`} onMouseMove={spot} data-hover>
              <div className="cs-cell-top">
                <span className="cs-cell-icon">{x.icon}</span>
                <span className="cs-cell-no mono">{pad(i + 1)}</span>
              </div>
              {i === 0 && <div className="cs-cell-art" aria-hidden="true"><i /><i /><i /></div>}
              <h4>{x.title}</h4>
              <p>{x.text}</p>
            </article>
          ))}
        </div>
      </div>

      {/* ── under the hood: terminal + stack */}
      <div className="section cs-hood">
        <div className="cs-hood-text">
          <p className="cs-label mono"><span>03</span> Under the hood</p>
          <h3 className="cs-h">How it's <span className="outline">built.</span></h3>
          <div className="cs-pills">{f.tech.map((t) => <span key={t} className="cs-pill mono"><i />{t}</span>)}</div>
        </div>
        <div className="cs-term">
          <div className="cs-term-bar"><i /><i /><i /><span className="mono">~/{f.id} — build.log</span></div>
          <div className="cs-term-body">
            <p className="cs-line cs-cmd"><b>$</b> npm run ship -- --project {f.id}</p>
            {f.highlights.map((h) => <p key={h} className="cs-line"><span className="cs-ok">✔</span> {h}</p>)}
            <p className="cs-line cs-done"><b>$</b> deployed <span className="cs-caret" /></p>
          </div>
        </div>
      </div>
    </section>
  )
}

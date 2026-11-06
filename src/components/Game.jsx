import { Shapes } from './Motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// HEXCODE: NIGHT RUN — dodge the bugs, collect the commits.
const LANES = 4
const store = {
  get: () => { try { return +localStorage.getItem('hex-best') || 0 } catch { return 0 } },
  set: (v) => { try { localStorage.setItem('hex-best', v) } catch { /* storage unavailable */ } },
}

export default function Game() {
  const canvasRef = useRef(null)
  const state = useRef(null)
  const [screen, setScreen] = useState('start') // start | play | over
  const [hud, setHud] = useState({ score: 0, lives: 3, best: store.get() })

  const steer = useCallback((dir) => {
    const s = state.current; if (!s || !s.alive) return
    s.lane = Math.max(0, Math.min(LANES - 1, s.lane + dir))
  }, [])

  const start = useCallback(() => {
    state.current = { lane: 1, x: null, items: [], speed: 5, dist: 0, score: 0, lives: 3, alive: true, spawn: 0, shake: 0, hit: 0, lines: 0, particles: [] }
    setHud((h) => ({ ...h, score: 0, lives: 3 }))
    setScreen('play')
  }, [])

  // keyboard
  useEffect(() => {
    if (screen !== 'play') return
    const key = (e) => {
      if (['ArrowLeft', 'a', 'A'].includes(e.key)) { e.preventDefault(); steer(-1) }
      if (['ArrowRight', 'd', 'D'].includes(e.key)) { e.preventDefault(); steer(1) }
    }
    window.addEventListener('keydown', key)
    return () => window.removeEventListener('keydown', key)
  }, [screen, steer])

  // game loop
  useEffect(() => {
    if (screen !== 'play') return
    const c = canvasRef.current, ctx = c.getContext('2d')
    let raf, last = performance.now()
    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2)
      c.width = c.clientWidth * dpr; c.height = c.clientHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize(); window.addEventListener('resize', resize)

    const car = (x, y, w, h, body, glow, enemy) => {
      ctx.save(); ctx.shadowColor = glow; ctx.shadowBlur = 25
      ctx.fillStyle = body
      ctx.beginPath(); ctx.roundRect(x - w / 2, y - h / 2, w, h, 10); ctx.fill()
      ctx.shadowBlur = 0
      ctx.fillStyle = 'rgba(10,10,20,.85)'
      ctx.fillRect(x - w / 2 + 6, y - h / 2 + (enemy ? h * 0.55 : 14), w - 12, h * 0.22)
      ctx.fillStyle = enemy ? '#ffe9a8' : '#ff3355'
      const ly = enemy ? y + h / 2 - 6 : y + h / 2 - 5
      ctx.fillRect(x - w / 2 + 4, ly, 9, 4); ctx.fillRect(x + w / 2 - 13, ly, 9, 4)
      if (enemy) { ctx.fillStyle = '#fff'; ctx.font = 'bold 11px Space Mono, monospace'; ctx.textAlign = 'center'; ctx.fillText('BUG', x, y - 4) }
      ctx.restore()
    }

    const loop = (now) => {
      const dt = Math.min(2.5, (now - last) / 16.67); last = now
      const s = state.current, W = c.clientWidth, H = c.clientHeight
      const roadW = Math.min(W * 0.9, 520), roadX = (W - roadW) / 2, laneW = roadW / LANES
      const laneX = (l) => roadX + laneW * (l + 0.5)
      const py = H - 90
      if (s.x === null) s.x = laneX(s.lane)
      s.x += (laneX(s.lane) - s.x) * Math.min(1, 0.25 * dt)

      s.speed = Math.min(16, 5 + s.dist / 2500)
      s.dist += s.speed * dt
      s.lines = (s.lines + s.speed * dt) % 60
      s.score += 0.05 * s.speed * dt

      // spawn
      s.spawn -= s.speed * dt
      if (s.spawn <= 0) {
        const lane = Math.floor(Math.random() * LANES)
        const coin = Math.random() < 0.35
        s.items.push({ lane, y: -80, coin, v: coin ? 0 : 1 + Math.random() * 1.5 })
        s.spawn = 120 + Math.random() * 160 - Math.min(80, s.dist / 400)
      }

      // update + collide
      s.items.forEach((it) => {
        it.y += (s.speed - (it.coin ? 0 : it.v)) * dt
        const dx = Math.abs(laneX(it.lane) - s.x), dy = Math.abs(it.y - py)
        if (!it.done && dx < laneW * 0.55 && dy < (it.coin ? 40 : 62)) {
          it.done = true
          if (it.coin) {
            s.score += 50
            for (let i = 0; i < 14; i++) s.particles.push({ x: laneX(it.lane), y: it.y, vx: (Math.random() - .5) * 8, vy: (Math.random() - .5) * 8, life: 1, col: '#7dff8a' })
          } else {
            s.lives -= 1; s.shake = 18; s.hit = 1
            for (let i = 0; i < 24; i++) s.particles.push({ x: s.x, y: py, vx: (Math.random() - .5) * 12, vy: (Math.random() - .5) * 12, life: 1, col: '#ff2e63' })
            if (s.lives <= 0) s.alive = false
          }
        }
      })
      s.items = s.items.filter((it) => it.y < H + 100 && !(it.coin && it.done))

      // draw
      ctx.save()
      if (s.shake > 0) { ctx.translate((Math.random() - .5) * s.shake, (Math.random() - .5) * s.shake); s.shake *= 0.85 }
      const bg = ctx.createLinearGradient(0, 0, 0, H)
      bg.addColorStop(0, '#120a24'); bg.addColorStop(1, '#05040a')
      ctx.fillStyle = bg; ctx.fillRect(-20, -20, W + 40, H + 40)
      // side buildings scrolling
      for (let side = 0; side < 2; side++) for (let i = -1; i < H / 70 + 2; i++) {
        const y = i * 70 + (s.dist % 70)
        const x = side ? roadX + roadW + 12 : 0
        const w = side ? W - x : roadX - 12
        ctx.fillStyle = (i + Math.floor(s.dist / 70)) % 2 ? '#150f22' : '#1b1430'
        ctx.fillRect(x, y, w, 60)
        ctx.fillStyle = 'rgba(249,199,79,.5)'
        for (let k = 8; k < w - 8; k += 18) if ((k * 7 + i * 13) % 5 > 1) ctx.fillRect(x + k, y + 20, 6, 8)
      }
      // road
      ctx.fillStyle = '#0d0c14'; ctx.fillRect(roadX, -20, roadW, H + 40)
      ctx.fillStyle = '#ff2e63'; ctx.fillRect(roadX - 4, -20, 4, H + 40); ctx.fillRect(roadX + roadW, -20, 4, H + 40)
      ctx.fillStyle = 'rgba(255,255,255,.35)'
      for (let l = 1; l < LANES; l++) for (let y = -60 + s.lines; y < H; y += 60) ctx.fillRect(roadX + laneW * l - 2, y, 4, 30)
      // items
      s.items.forEach((it) => {
        const x = laneX(it.lane)
        if (it.coin) {
          ctx.save(); ctx.shadowColor = '#7dff8a'; ctx.shadowBlur = 20
          ctx.fillStyle = '#7dff8a'; ctx.font = 'bold 26px Space Mono, monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
          ctx.fillText('{ }', x, it.y + Math.sin(it.y / 20) * 3); ctx.restore()
        } else car(x, it.y, laneW * 0.55, 100, it.done ? '#444' : '#8a1030', '#ff2e63', true)
      })
      // player
      ctx.globalAlpha = s.hit > 0 && Math.floor(now / 80) % 2 ? 0.35 : 1
      s.hit = Math.max(0, s.hit - 0.012 * dt)
      car(s.x, py, laneW * 0.55, 96, '#08d9d6', '#08d9d6', false)
      ctx.globalAlpha = 1
      // particles
      s.particles.forEach((p) => { p.x += p.vx * dt; p.y += p.vy * dt; p.life -= 0.03 * dt; ctx.fillStyle = p.col; ctx.globalAlpha = Math.max(0, p.life); ctx.fillRect(p.x, p.y, 4, 4) })
      ctx.globalAlpha = 1; s.particles = s.particles.filter((p) => p.life > 0)
      // speed lines
      if (s.speed > 10) { ctx.strokeStyle = 'rgba(255,255,255,.08)'; for (let i = 0; i < 12; i++) { const x = Math.random() * W; ctx.beginPath(); ctx.moveTo(x, Math.random() * H); ctx.lineTo(x, Math.random() * H); ctx.stroke() } }
      ctx.restore()

      setHud((h) => (Math.floor(s.score) !== h.score || s.lives !== h.lives ? { ...h, score: Math.floor(s.score), lives: s.lives } : h))

      if (!s.alive) {
        const final = Math.floor(s.score), best = Math.max(final, store.get())
        store.set(best); setHud({ score: final, lives: 0, best }); setScreen('over'); return
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [screen])

  // touch: tap left/right half, or swipe
  const touch = useRef(null)
  const onPointerDown = (e) => { touch.current = e.clientX }
  const onPointerUp = (e) => {
    if (screen !== 'play' || touch.current === null) return
    const dx = e.clientX - touch.current
    if (Math.abs(dx) > 30) steer(dx > 0 ? 1 : -1)
    else { const r = e.currentTarget.getBoundingClientRect(); steer(e.clientX - r.left > r.width / 2 ? 1 : -1) }
    touch.current = null
  }

  return (
    <section className="game section" id="game">
      <Shapes items={[
        { t: 'plus', x: 90, y: 4, s: 50, c: 'var(--gold)', sp: 1.4, spin: 10 },
        { t: 'ring', x: 62, y: 2, s: 110, c: 'var(--accent)', sp: 0.8, spin: 30 },
      ]} />
      <p className="eyebrow">// 10 — SIDE QUEST</p>
      <h2 className="big">NIGHT <span className="outline">RUN</span></h2>
      <p className="dim game-blurb">Take a break. Dodge the <b className="accent">BUGS</b>, grab the <b style={{ color: '#7dff8a' }}>{'{ commits }'}</b>. It gets faster the longer you survive.</p>

      <div className="game-frame" data-cursor="PLAY" data-hover onPointerDown={onPointerDown} onPointerUp={onPointerUp}>
        <canvas ref={canvasRef} className="game-canvas" />
        <div className="game-hud mono">
          <span>SCORE {String(hud.score).padStart(5, '0')}</span>
          <span className="game-lives">{[0, 1, 2].map((i) => <i key={i} className={i < hud.lives ? 'on' : ''}>★</i>)}</span>
          <span>BEST {String(hud.best).padStart(5, '0')}</span>
        </div>
        <AnimatePresence>
          {screen !== 'play' && (
            <motion.div className="game-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.1 }}>
              {screen === 'over' && <motion.p className="wasted" initial={{ scale: 2, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>CRASHED</motion.p>}
              {screen === 'over' && <p className="mono">SCORE {hud.score} · BEST {hud.best}</p>}
              {screen === 'start' && <p className="game-logo">HEXCODE<br /><span>NIGHT RUN</span></p>}
              <button className="cta small" onClick={start}>{screen === 'start' ? 'PRESS START' : 'RETRY'}</button>
              <p className="mono dim">← → / A D · tap or swipe on mobile</p>
            </motion.div>
          )}
        </AnimatePresence>
        {screen === 'play' && (
          <div className="game-pads" onPointerDown={(e) => e.stopPropagation()} onPointerUp={(e) => e.stopPropagation()}>
            <button aria-label="Steer left" onClick={() => steer(-1)}>◀</button>
            <button aria-label="Steer right" onClick={() => steer(1)}>▶</button>
          </div>
        )}
      </div>
    </section>
  )
}

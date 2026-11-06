import { useEffect, useRef } from 'react'

// Procedural "cinematic footage": a living neon city at dusk — parallax skyline,
// flickering windows, rain, traffic light-trails and a drifting sun. Runs on canvas.
export default function CityScene({ hue = 330, rain = true, traffic = true, className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    let w, h, dpr, raf, t = 0
    let mouse = { x: 0, y: 0, tx: 0, ty: 0 }
    let layers = [], drops = [], cars = []
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const rand = (a, b) => a + Math.random() * (b - a)

    const build = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth; h = canvas.clientHeight
      canvas.width = w * dpr; canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      layers = [0.35, 0.6, 1].map((depth, li) => {
        const blds = []; let x = -100
        while (x < w + 200) {
          const bw = rand(40, 110) * (0.6 + depth * 0.5)
          const bh = rand(h * 0.15, h * (0.35 + depth * 0.25))
          const wins = []
          for (let wy = 12; wy < bh - 10; wy += 14) for (let wx = 8; wx < bw - 8; wx += 12)
            if (Math.random() > 0.45) wins.push({ x: wx, y: wy, on: Math.random() > 0.3, f: Math.random() })
          blds.push({ x, bw, bh, wins, antenna: Math.random() > 0.8 })
          x += bw + rand(2, 14)
        }
        return { depth, blds, li }
      })
      drops = Array.from({ length: rain ? Math.floor(w / 6) : 0 }, () => ({ x: rand(0, w), y: rand(0, h), v: rand(8, 16), l: rand(10, 24) }))
      cars = Array.from({ length: traffic ? 14 : 0 }, () => ({ x: rand(-w, w), v: rand(1.5, 5) * (Math.random() > 0.5 ? 1 : -1), lane: Math.random() }))
    }

    const onMove = (e) => {
      mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2
    }

    const draw = () => {
      t += reduce ? 0 : 1
      mouse.x += (mouse.tx - mouse.x) * 0.05
      mouse.y += (mouse.ty - mouse.y) * 0.05

      // sky
      const g = ctx.createLinearGradient(0, 0, 0, h)
      g.addColorStop(0, `hsl(${hue + 20}, 70%, 6%)`)
      g.addColorStop(0.55, `hsl(${hue}, 80%, 22%)`)
      g.addColorStop(0.8, `hsl(${hue - 30}, 95%, 52%)`)
      g.addColorStop(1, `hsl(${hue - 50}, 100%, 62%)`)
      ctx.fillStyle = g; ctx.fillRect(0, 0, w, h)

      // sun
      const sx = w * 0.62 + mouse.x * -20, sy = h * 0.62 + Math.sin(t / 300) * 6
      const r = Math.min(w, h) * 0.22
      const sg = ctx.createRadialGradient(sx, sy, r * 0.2, sx, sy, r * 2.2)
      sg.addColorStop(0, `hsla(${hue - 40}, 100%, 75%, .9)`)
      sg.addColorStop(1, 'transparent')
      ctx.fillStyle = sg; ctx.fillRect(0, 0, w, h)
      ctx.save(); ctx.beginPath(); ctx.arc(sx, sy, r, 0, Math.PI * 2); ctx.clip()
      const sun = ctx.createLinearGradient(0, sy - r, 0, sy + r)
      sun.addColorStop(0, `hsl(${hue - 60}, 100%, 70%)`); sun.addColorStop(1, `hsl(${hue}, 100%, 55%)`)
      ctx.fillStyle = sun; ctx.fillRect(sx - r, sy - r, r * 2, r * 2)
      ctx.fillStyle = `hsl(${hue}, 80%, 22%)`
      for (let i = 0; i < 7; i++) {
        const yy = sy + r * 0.1 + i * r * 0.14 + ((t * 0.3) % (r * 0.14))
        ctx.fillRect(sx - r, yy, r * 2, 2 + i * 1.2)
      }
      ctx.restore()

      // skyline layers
      const ground = h * 0.86
      layers.forEach(({ depth, blds, li }) => {
        const ox = mouse.x * -40 * depth - ((t * 0.15 * depth) % (w + 300))
        const light = 4 + li * 3
        blds.forEach((b) => {
          let bx = b.x + ox; if (bx + b.bw < -150) bx += w + 300
          const by = ground - b.bh + mouse.y * 10 * depth
          ctx.fillStyle = `hsl(${hue + 30}, 50%, ${light}%)`
          ctx.fillRect(bx, by, b.bw, b.bh + 60)
          if (b.antenna) {
            ctx.fillRect(bx + b.bw / 2 - 1, by - 30, 2, 30)
            if (Math.floor(t / 30) % 2) { ctx.fillStyle = '#ff3355'; ctx.fillRect(bx + b.bw / 2 - 2, by - 32, 4, 4) }
          }
          if (depth > 0.4) b.wins.forEach((wn) => {
            const flick = wn.on && !(Math.sin(t / 40 + wn.f * 50) > 0.97)
            if (!flick) return
            ctx.fillStyle = wn.f > 0.8 ? `hsla(${hue - 150}, 100%, 70%, ${0.5 * depth})` : `hsla(45, 100%, 75%, ${0.55 * depth})`
            ctx.fillRect(bx + wn.x, by + wn.y, 5, 7)
          })
        })
      })

      // road + light trails
      ctx.fillStyle = `hsl(${hue + 30}, 40%, 3%)`; ctx.fillRect(0, ground, w, h - ground)
      cars.forEach((c) => {
        c.x += c.v; if (c.x > w + 100) c.x = -100; if (c.x < -100) c.x = w + 100
        const y = ground + 8 + c.lane * (h - ground - 16)
        const tail = ctx.createLinearGradient(c.x, 0, c.x - c.v * 30, 0)
        const col = c.v > 0 ? '255,40,70' : '255,240,200'
        tail.addColorStop(0, `rgba(${col},.95)`); tail.addColorStop(1, `rgba(${col},0)`)
        ctx.fillStyle = tail; ctx.fillRect(Math.min(c.x, c.x - c.v * 30), y, Math.abs(c.v * 30), 2)
      })

      // rain
      ctx.strokeStyle = 'rgba(200,220,255,.25)'; ctx.lineWidth = 1; ctx.beginPath()
      drops.forEach((d) => {
        d.y += d.v; d.x -= d.v * 0.25
        if (d.y > h) { d.y = -20; d.x = rand(0, w + 100) }
        ctx.moveTo(d.x, d.y); ctx.lineTo(d.x - d.l * 0.25, d.y + d.l)
      })
      ctx.stroke()

      raf = requestAnimationFrame(draw)
    }

    build(); draw()
    const ro = new ResizeObserver(build); ro.observe(canvas)
    window.addEventListener('mousemove', onMove)
    // pause when offscreen
    const io = new IntersectionObserver(([e]) => {
      cancelAnimationFrame(raf); if (e.isIntersecting) raf = requestAnimationFrame(draw)
    })
    io.observe(canvas)
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); window.removeEventListener('mousemove', onMove) }
  }, [hue, rain, traffic])

  return <canvas ref={ref} className={`city-scene ${className}`} />
}

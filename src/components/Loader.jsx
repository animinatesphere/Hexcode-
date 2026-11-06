import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const tips = ['LOADING ASSETS', 'COMPILING SHADERS', 'BOOTING NODE SERVER', 'SYNCING MOTION', 'READY']

export default function Loader({ onDone }) {
  const [p, setP] = useState(0)
  useEffect(() => {
    let v = 0
    const id = setInterval(() => {
      v = Math.min(100, v + Math.random() * 9 + 2)
      setP(Math.floor(v))
      if (v >= 100) { clearInterval(id); setTimeout(onDone, 600) }
    }, 70)
    return () => clearInterval(id)
  }, [onDone])

  return (
    <motion.div className="loader" exit={{ clipPath: 'inset(0 0 100% 0)' }} transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}>
      <div className="loader-inner">
        <motion.div className="loader-logo" initial={{ scale: 1.4, opacity: 0, filter: 'blur(20px)' }} animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }} transition={{ duration: 1.2 }}>
          <span>HEX</span><span className="accent">CODE</span>
        </motion.div>
        <div className="loader-bar"><motion.div style={{ width: `${p}%` }} /></div>
        <div className="loader-meta">
          <span>{tips[Math.min(tips.length - 1, Math.floor(p / 21))]}</span>
          <span>{String(p).padStart(3, '0')}%</span>
        </div>
      </div>
    </motion.div>
  )
}
